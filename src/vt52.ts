// import { Canvas } from "./canvas"
// import { Observable } from "./paon"

import { ThinEngine } from "babylonjs/Engines/thinEngine"

// // this implements the different playgrounds for the student



// /**
//  * The Product interface declares the operations that all concrete products must
//  * implement.
//  */
// // interface IWorld {
// //     operation(): string
// // }

// /** This is the factory, use the concrete classes below (like VT52) */
// // export abstract class World {   // exports as a type, always use a concrete class like 'VT52'
// //     height: number = 1024  // height and width in pixels
// //     width: number = 1280
// //     canvas: Canvas

// //     constructor(tag: string) {
// //         this.canvas = new Canvas(tag)
// //     }
// // }

// const pixelX = 7
// const pixelY = 10
// const rows = 24
// const cols = 40
// const vOffset = 10  // correct for characters (not for squares)


// export class VT52 extends Canvas {
//     public buffer: number[]
//     public cursorX: number = 0
//     public cursorY: number = 0


//     constructor(canvasTag: string = 'canvas') {
//         super(canvasTag)

//         // width should always be 640.  640 / 80 is 8 pixels across, which defines the character size
//         console.assert(this.width >= 640, 'expect VT52 canvas to be 640 px wide')
//         console.assert(this.height >= 480, 'expect VT52 canvas to be 480 px high')

//         this.buffer = Array(rows * cols).fill(0)

//         // hook the keyboard events for this canvas
//         this.kybdObservable.addObserver('keypress', this.kybdKey, this)
//         this.testVT52()
//     }

//     testVT52() {
//         this.drawScreen()
//         this.printString('now is the time for all good men to come to the aid of the party.')
//         this.printString('\nnow is the time for all good men to come to the aid of the party.\n\nWalla Walla Washington.')
//         this.drawScreen()

//         for (let i = 0; i < 20; i++) {
//             this.printString(`\ncounting ${i}`)
//         }
//         this.drawScreen()
//         // // subscript to mouse and keyboard events
//         // this.mouseObservable.addObserver('mousedown', this.mouseSoftKey, this)
//         // this.animationObservable.addObserver('tick', this.animate, this)
//         // // and publish when we have a new key (mouse or kybd)
//         // this.answerReceived = new Observable()

//     }
//     kybdKey(event: KeyboardEvent) {
//         console.log('kybdKey', event.key)
//         this.printChar(event.charCode)
//         this.drawScreen()
//     }

//     // full refresh of screen.
//     drawScreen() {  // 640 / 40 = 16 bits across    480/24 = 20 bits down
//         this.ctx.font = "12px Courier"
//         this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

//         for (let j = 0; j < rows; j++) {
//             for (let i = 0; i < cols; i++) {

//                 let charCode = this.buffer[j * cols + i]
//                 if (charCode === 0) {
//                     this.ctx.fillStyle = 'blue'
//                     this.ctx.fillRect(i * pixelX + 4, j * pixelY + 6, 2, 2)
//                 } else {
//                     // console.log('charCode', j, i, charCode)
//                     let charString: string = String.fromCharCode(charCode)
//                     this.ctx.fillStyle = "black"
//                     this.ctx.fillText(charString, i * pixelX, j * pixelY + vOffset)
//                 }
//             }
//         }
//     }

//     printString(chars: string) {
//         chars.split('').forEach((char) => this.printChar(char.charCodeAt(0)))
//     }


//     printChar(charCode: number) {
//         console.assert(this.cursorX < cols, `cursorX should always be less than ${cols}`)
//         if (charCode === 10) {  // force CRLF
//             this.print()
//         } else {
//             this.buffer[cols * this.cursorY + this.cursorX] = charCode
//             this.cursorX += 1   // horizontal cursor position
//             if (this.cursorX >= cols) {
//                 this.print()
//             }
//         }
//     }

//     print() {
//         console.log(`printCRLF at ${this.cursorX},${this.cursorY}`)
//         if (this.cursorY === (rows - 1)) {
//             // we are on the bottom line, so scroll up
//             for (let i = cols; i < this.buffer.length; i++) {
//                 this.buffer[i - cols] = this.buffer[i]
//                 this.buffer[i] = 0
//             }
//             this.cursorX = 0   // cursorY remains the bottom row
//         } else {
//             // just drop the cursor to the next line
//             this.cursorY += 1
//             this.cursorX = 0
//         }
//     }
// }






// some defines for the VT52
export const dynamicX = 1048     // the slightly unusual 1048 resolution enables the VT52 mode  (1024 plus one more)
export const dynamicY = 1048

const VT52pixelX = 13
const VT52pixelY = 31

const VT52rows = 34    // not 24 like the old terminal
const VT52cols = 80

const VT52vOffset = 20  // correct for characters (not for squares)
const VT52font = "20px Courier"

const scalingX = 12     // this gives a roughly square look
const scalingY = 16

type printable = {
    char: number,
    color: string
}

export class VT52 {

    ctx: CanvasRenderingContext2D
    printBuffer: printable[] = []

    displayCharBuffer: number[]
    displayColorBuffer: string[]
    cursorX: number = 0
    cursorY: number = 0

    vt52print: Function = () => { return } // used to store a print() resolve()
    vt52input: Function = (s: string) => { return s }
    // used to store an input() resolve

    inputBuffer: string = ''

    cursorSuppress = false      // suppress flashingcursor (for graphics?)
    halfSeconds = 0
    cursorOn = true // used for state of flashing cursor

    intervalID: any  // ID of background timer
    constructor(canvasID: string = 'canvas') {


        let container = document.getElementById(canvasID) as HTMLCanvasElement
        if (!container) {
            throw `Could not find HTML ID '${canvasID}'`;
        } else {
            this.ctx = container.getContext('2d')!
            if (!this.ctx) {
                throw `Could not find attach canvas context to HTML ID '${canvasID}'`;
            } else {
                this.ctx.moveTo(0, 0);
                this.ctx.lineTo(200, 100);
                this.ctx.stroke();
            }
        }
        this.displayCharBuffer = Array(VT52rows * VT52cols).fill(32)        // space chars
        this.displayColorBuffer = Array(VT52rows * VT52cols).fill('green')
        this.drawScreen()

        // finally, add a 'tick' observer to keep this vt52 running in the background
        this.intervalID = setInterval(() => {
            this.printDaemon();
            this.cursorDaemon();
        }, 32)   // 30 frames a second?



        // BabyEngine.addObserver('keydown', (data: KeyboardEvent) => {
        //     this.input(data)
        // })

    }

    setCursor(x: number, y: number) {
        this.cursorX = x
        this.cursorY = y
    }


    cursorDaemon() {
        if (this.cursorSuppress)        // maybe we don't want cursor at all
            return

        let halfSeconds = Math.floor(new Date().getTime() / 500)  // half-seconds since Jan 1, 1970
        if (halfSeconds !== this.halfSeconds) {
            // time to twiddle the cursor
            // if (this.cursorOn){
            //     this.drawScreen()  // this will erase it
            // } else {
            let charString: string = '_'
            this.ctx.fillStyle = this.cursorOn ? 'white' : 'black'
            this.ctx.fillText(charString, this.cursorX * VT52pixelX, this.cursorY * VT52pixelY + VT52vOffset)
            // }


            // set up for next cycle
            this.cursorOn = !this.cursorOn
            this.halfSeconds = halfSeconds // don't want to hear from you for a while
        }
    }

    printDaemon() {
        if (this.printBuffer.length > 0) {
            let p = this.printBuffer.shift()!
            this.printChar(p.char, p.color)

            // refresh the VT52 screen buffer
            this.drawScreen()

        } else {
            // there may be a Promise waiting for this to finish
            // if resolve() is not undefined, then fire it and set it undefined
            this.vt52print()
        }
    }

    print(text: string, color: string) {
        // process the string into the printBuffer queue, that's all
        text.split('').forEach((char) => this.printBuffer.push({ char: char.charCodeAt(0), color: color }))
        
    }

    // full refresh of VT52 screen.
    drawScreen() {

        this.ctx.font = VT52font
        this.ctx.clearRect(0, 0, dynamicX, dynamicY)   // transparent black
        this.ctx.beginPath()    // reset after clear

        for (let j = 0; j < VT52rows; j++) {
            for (let i = 0; i < VT52cols; i++) {

                let charCode = this.displayCharBuffer[j * VT52cols + i]
                let charColor = this.displayColorBuffer[j * VT52cols + i]

                // if (charCode === 0) {
                // // a null shows as a small blue rectangle
                // this.ctx.fillStyle = 'blue'
                // this.ctx.fillRect(i * VT52pixelX + 4, j * VT52pixelY + 6, 2, 2)
                // } else {
                // // console.log('charCode', j, i, charCode)
                let charString: string = String.fromCharCode(charCode)
                this.ctx.fillStyle = charColor
                this.ctx.fillText(charString, i * VT52pixelX, j * VT52pixelY + VT52vOffset)
                // }
            }
        }
    }


    printChar(charCode: number, charColor: string) {
        console.assert(this.cursorX < VT52cols, `cursorX should always be less than ${VT52cols}`)
        if (charCode === 10) {  // force CRLF
            this.printCRLF()
        } else {
            this.displayCharBuffer[VT52cols * this.cursorY + this.cursorX] = charCode
            this.displayColorBuffer[VT52cols * this.cursorY + this.cursorX] = charColor
            this.cursorX += 1   // horizontal cursor position
            if (this.cursorX >= VT52cols) {
                this.printCRLF()
                this.cursorX = 0
            }
        }
    }

    printCRLF() {
        // console.log(`printCRLF at ${this.cursorX},${this.cursorY}`)
        if (this.cursorY === (VT52rows - 1)) {
            // we are on the bottom line, so scroll up
            for (let i = VT52cols; i < this.displayCharBuffer.length; i++) {    // starting at 80 (second line)
                this.displayCharBuffer[i - VT52cols] = this.displayCharBuffer[i]
                this.displayColorBuffer[i - VT52cols] = this.displayColorBuffer[i]
                // this.displayCharBuffer[i] = 32
                // this.displayColorBuffer[i] = 'green'
            }
            this.cursorX = 0   // cursorY remains the bottom row

            // clear the bottom line
            let firstCol = ((VT52rows - 1) * VT52cols) - 1
            for (let i = 0; i < VT52cols; i++) {
                // console.log ('clearing VT52',i+firstCol)
                this.displayCharBuffer[i + firstCol] = 32 // space char
                this.displayColorBuffer[i + firstCol] = 'green'
            }
        } else {
            // just drop the cursor to the next line
            this.cursorY += 1
            this.cursorX = 0
        }
    }


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




