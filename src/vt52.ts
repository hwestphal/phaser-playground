import { hasOnlyExpressionInitializer } from 'typescript'
import { Observable } from './observer'
import { JXG } from './jxg'

// TODO: add sounds
// https://www.buildbox.com/13-places-to-find-free-game-sound-effects/


// some defines for the VT52
export const dynamicX = 1048     // the slightly unusual 1048 resolution enables the VT52 mode  (1024 plus one more)
export const dynamicY = 1048

// PROMPT_TYPE
const PROMPT_INPUT = 1
const PROMPT_PASSWORD = 2
const PROMPT_CONFIRM = 3

const VT52pixelX = 13
const VT52pixelY = 31

const VT52rows = 24    // not 24 like the old terminal
const VT52cols = 80    // these MUST be even numbers

const VT52vOffset = 20  // correct for characters (not for squares)
const VT52font = "20px Courier"

const scalingX = 12     // this gives a roughly square look
const scalingY = 16

type printable = {
    char: number,
    color: string
}

export class VT52 {

    observables: Observable

    ctx: CanvasRenderingContext2D

    // we use statics because the student might restart and restart his program
    // we don't want a new buffer each time, we want to clear and reuse the old one

    static printBuffer: printable[] = []   // even if multiple versions of VT52
    static intervalID: any  // ID of background timer

    static displayCharBuffer: number[]
    static displayColorBuffer: string[]

    initialized = false
    canvasID = ''

    cursorX: number = 0
    cursorY: number = 0

    vt52print: Function = () => { return } // used to store a print() resolve()
    vt52input: Function = (s: string) => { return s }
    // used to store an input() resolve

    inputBuffer: string = ''

    cursorSuppress = false      // suppress flashingcursor (for graphics?)
    halfSeconds = 0  // force cursor right away
    cursorOn = true // used for state of flashing cursor

    board: any   // used for JXG graphing
    boundingBox: number[]  //[x1,y1,x2,y2]

    constructor(canvasID: string = 'jxgbox') {
        this.initialized = false
        this.canvasID = canvasID
        // we DO NOT initialize right away, because that interferes with Babylon

    }

    initialize() {
        let canvas = document.getElementById(this.canvasID) as HTMLCanvasElement
        if (!canvas) {
            throw `Could not find HTML ID '${this.canvasID}'`;
        } else {
            this.ctx = canvas.getContext('2d')!
            if (!this.ctx) {
                throw `Could not find attach canvas context to HTML ID '${this.canvasID}'`;
            }
            var scale = 1;
            canvas.width = 1048 * scale;
            canvas.height = 740 * scale;

        }
        VT52.displayCharBuffer = Array(VT52rows * VT52cols).fill(32)        // space chars
        VT52.displayColorBuffer = Array(VT52rows * VT52cols).fill('green')
        VT52.printBuffer = []   // clear anything left over
        this.drawScreen()

        // finally, add a 'tick' observer to keep this vt52 running in the background
        clearInterval(VT52.intervalID)
        VT52.intervalID = setInterval(() => {
            this.printDaemon();
            this.cursorDaemon();
        }, 32)   // 30 frames a second?

        this.initialized = true

        // this.observables = new Observable()

        // BabyEngine.addObserver('keydown', (data: KeyboardEvent) => {
        //     this.input(data)
        // })

    }



    cursorDaemon() {
        if (this.cursorSuppress)        // maybe we don't want cursor at all
            return

        let halfSeconds = new Date().getTime()  // microseconds since Jan 1, 1970

        // time to twiddle the cursor.  it is NOT in the display buffer
        let charString = '_'
        this.ctx.fillStyle = (this.cursorOn || VT52.printBuffer.length > 0) ? 'white' : 'black'
        this.ctx.fillText(charString, this.cursorX * VT52pixelX, this.cursorY * VT52pixelY + VT52vOffset)
        // a call to drawScreen() will erase the cursor, but it reappears quickly

        // set up for next cycle
        if (halfSeconds > this.halfSeconds) {
            this.cursorOn = !this.cursorOn
            this.halfSeconds = halfSeconds + 500 // don't want to hear from you for a while
        }
    }

    printDaemon() {

        let oldCursorSuppress = this.cursorSuppress
        this.cursorSuppress = true;     // don't want cursors while printing

        // erase the cursor, just to be sure
        let charString = '_'
        this.ctx.fillStyle = 'white'
        this.ctx.fillText(charString, this.cursorX * VT52pixelX, this.cursorY * VT52pixelY + VT52vOffset)


        if (VT52.printBuffer.length > 0) {

            // try several chars per clock tick (but 30 frames, so it can still be slow)
            for (let i = 0; i < 10; i++) {
                let p = VT52.printBuffer.shift()
                if (p !== undefined)
                    this.printChar(p.char, p.color)
            }
        }
        // refresh the VT52 screen buffer
        this.drawScreen()
        this.cursorSuppress = oldCursorSuppress

    }


    ///////////////////////////////////////
    /////// public methods ////////////////
    ///////////////////////////////////////

    textToString(text: string | number | boolean): string {
        let stringText: string
        if (typeof text == 'string')
            stringText = text
        if (typeof text == 'number')
            stringText = text.toString()
        if (typeof text == 'boolean')
            stringText = text ? 'true' : 'false'
        return stringText
    }

    print(text: string | number | boolean = '', color: string = 'black') {

        let stringText = this.textToString(text)
        this.printString(stringText, color)  // use printString to load the queue
        VT52.printBuffer.push({ char: 10, color: color })  // and add a newline
    }

    /** print, leave the cursor at the end of the text */
    printString(text: string = '', color: string = 'green') {
        if (!this.initialized)
            this.initialize()


        let stringText = this.textToString(text)
        // process the string into the printBuffer queue, that's all
        stringText.split('').forEach((char) => VT52.printBuffer.push({ char: char.charCodeAt(0), color: color }))

        // sanity check - if over 200,000 chars in buffer then we are in an infinite loop
        if (VT52.printBuffer.length > 200000) {
            throw ('I think we are in an infinite loop')
        }
    }

    sound(url?: string) {
        let pixUrl = "pix/" + url
        let sound = new Audio(pixUrl)
        sound.play()
    }


    /** position the cursor on the screen */
    setCursor(row: number, col: number) {

        col = Math.floor(col)   // convert to integer
        row = Math.floor(row)

        this.cursorX = row
        this.cursorY = col
    }

    colorPoint(col: number, row: number, color: string) {

        col = Math.floor(col)   // convert to integer
        row = Math.floor(row)

        this.ctx.fillStyle = color
        this.ctx.fillRect(row * VT52pixelX, col * VT52pixelY, VT52pixelX, VT52pixelY);
    }

    colorXY(x: number, y: number, color: string = 'blue') {

        x += VT52cols / 2   // remember floor of -5.1 is -6 !!
        y += VT52rows / 2

        this.ctx.fillStyle = color
        this.ctx.fillRect(x * VT52pixelX, y * VT52pixelY, VT52pixelX, VT52pixelY);
    }

    drawAxisLines(boundingBox: number[] = [-3, 3, 3, -3]) {
        if (!this.initialized)
            this.initialize()

        // just sets up JSXGraph with some reasonable defaults
        this.boundingBox = boundingBox  // keep for later    [x1,y1,x2,y2]
        this.board = (window as any).JXG.JSXGraph.initBoard('jxgbox', { boundingbox: boundingBox, axis: true })
    }

    graph(func: Function, color: string = 'blue') {
        if (!this.initialized)
            this.initialize()
        // run graph from boundingbox x1 to x2
        this.board.create('functiongraph', [func, this.boundingBox[0], this.boundingBox[2]], { axis: true, strokeColor: color })
    }


    // full refresh of VT52 screen.
    drawScreen() {

        this.ctx.font = VT52font
        // this.ctx.clearRect(0, 0, dynamicX, dynamicY)   // transparent black
        this.ctx.beginPath()    // reset after clear

        for (let j = 0; j < VT52rows; j++) {
            let jXcols = j * VT52cols  // i hate to multiply so often
            for (let i = 0; i < VT52cols; i++) {

                let charCode = VT52.displayCharBuffer[jXcols + i]
                let charColor = VT52.displayColorBuffer[jXcols + i]

                if (charCode !== 0) { // don't draw white on white
                    let charString: string = String.fromCharCode(charCode)
                    this.ctx.fillStyle = charColor
                    this.ctx.fillText(charString, i * VT52pixelX, j * VT52pixelY + VT52vOffset)
                }
            }
        }
    }


    printChar(charCode: number, charColor: string) {
        if (!this.initialized)
            this.initialize()
        console.assert(this.cursorX < VT52cols, `cursorX should always be less than ${VT52cols}`)

        if (charCode === 10) {  // force CRLF
            this.printCRLF()
        } else {
            VT52.displayCharBuffer[VT52cols * this.cursorY + this.cursorX] = charCode
            VT52.displayColorBuffer[VT52cols * this.cursorY + this.cursorX] = charColor
            this.cursorX += 1   // horizontal cursor position
            if (this.cursorX >= VT52cols) {
                this.printCRLF()
                this.cursorX = 0
            }
        }
    }

    printCRLF() {   // basic print+CRLF, NOT EXPOSED TO USER
        // console.log(`printCRLF at ${this.cursorX},${this.cursorY}`)
        if (!this.initialized)
            this.initialize()
        if (this.cursorY === (VT52rows - 1)) {
            // we are on the bottom line, so scroll up

            // first, clear the screen
            this.ctx.clearRect(0, 0, dynamicX, dynamicY)   // transparent black
            for (let i = VT52cols; i < VT52.displayCharBuffer.length; i++) {    // starting at 80 (second line)
                VT52.displayCharBuffer[i - VT52cols] = VT52.displayCharBuffer[i]
                VT52.displayColorBuffer[i - VT52cols] = VT52.displayColorBuffer[i]
            }
            this.cursorX = 0   // cursorY remains the bottom row

            // clear the bottom line
            let firstCol = ((VT52rows - 1) * VT52cols) - 1
            for (let i = 0; i < VT52cols; i++) {
                VT52.displayCharBuffer[i + firstCol] = 32 // space char
                VT52.displayColorBuffer[i + firstCol] = 'green'
            }
        } else {
            // just drop the cursor to the next line
            this.cursorY += 1
            this.cursorX = 0
        }
    }

    clear() {        // ugly, but visually easy to understand
        for (let i = 0; i < 30; i++) {
            this.print("\n")
        }
    }


    ///////////////////////////////////////////////////////////
    /////////////// tools for JSXGraph ////////////////////////
    ///////////////////////////////////////////////////////////


    // the keyboard draws above the zeroline, from zero to width, from zero to height
    drawKeyboard(jsxBoard: JXG.Board, width: number, height: number, handler: string) {
        let buttonWidth = width / 3   // button has 3px on all sides
        let buttonHeight = height / 4

        let keys = [['1', '2', '3'], ['4', '5', '6'], ['7', '8', '9'], ['-', '.', '0']]

        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 3; j++) {

                jsxBoard.create('text', [j * buttonWidth + .2, i * buttonHeight + .2,
                `<button \
             style='font-size:40px; \
                width:${550 / 3 - 5}px; \
                text-align:center; \
                padding-top:10px; \
                box-shadow:3px 7px grey; \
                padding-bottom:10px; \
                border-radius:15px; \
                border:solid 5px blue; \
                background-color:#f4fff4' \
             onClick='${handler}(\"${keys[3 - i][j]}\")';> \
             ${keys[3 - i][j]} \
             </button>`])
            }
        }

    }

    // onClick='${handler}(\"${keys[3 - i][j]}\")';> \


    // const handleKeys = {
    //     'KeyW': () => console.log('Up'),
    //     'KeyA': () => console.log('Left'),
    //     'KeyS': () => console.log('Down'),
    //     'KeyD': () => console.log('Right'),
    //     'default':() => console.log('default'),
    // };


    // addEventListener(type:string,handler:object){
    //     console.log('got here')

    //     let thisObserver = handler as Observer;  // nothing-burger, just make TS happy
    //     Observable.addObserver(type,thisObserver,handler)
    // }





    // input(data: object) {

    //     let code: number = data['keyCode']

    //     console.log('in VT52.input()', code, data)

    //     // before anything, erase the cursor
    //     let charString: string = '_'
    //     this.ctx.fillStyle = 'black'
    //     this.ctx.fillText(charString, this.cursorX * VT52pixelX, this.cursorY * VT52pixelY + VT52vOffset)

    //     // seem to get codes up to 256  (eg: '?' is 191)
    //     if (code > 128) code -= 128

    //     // now print a character if possible
    //     if ((code % 128) >= 32 && code <= 126) {     // the printables
    //         this.inputBuffer += data['key'] //String.fromCharCode(code)
    //         this.printChar(data['key'].toString().charCodeAt(0), 'white')
    //     }
    //     else {

    //         switch (code) {
    //             case 13:   // Enter
    //                 // if resolve() is not undefined, then fire it and set it undefined
    //                 this.vt52input(this.inputBuffer)                    // fire it off with our buffer
    //                 this.inputBuffer = ''
    //                 this.printCRLF()
    //                 break;
    //             case 8:   // BackSpace
    //                 // if any of the stuff on the screen is being collected
    //                 if (this.inputBuffer.length > 0) {
    //                     this.inputBuffer = this.inputBuffer.substr(0, this.inputBuffer.length - 1)
    //                     // if we are not at the start of a line (otherwise too bad)
    //                     if (this.cursorX > 0) {
    //                         this.cursorX -= 1
    //                         // update the buffer, char will disappear at next drawScreen()
    //                         this.displayCharBuffer[VT52cols * this.cursorY + this.cursorX] = 32 // a space
    //                         // color doesn't matter, it's a space
    //                     }
    //                 }
    //                 break;
    //         }
    //     }
    //     this.drawScreen()
    //     return

    // }

}




