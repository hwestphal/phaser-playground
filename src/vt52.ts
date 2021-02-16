import { Canvas } from "./canvas"
import { Observable } from "./paon"

// this implements the different playgrounds for the student



/**
 * The Product interface declares the operations that all concrete products must
 * implement.
 */
interface IWorld {
    operation(): string
}

/** This is the factory, use the concrete classes below (like VT52) */
export abstract class World {   // exports as a type, always use a concrete class like 'VT52'
    height: number = 1024  // height and width in pixels
    width: number = 1280
    canvas: Canvas

    constructor(tag: string) {
        this.canvas = new Canvas(tag)
    }
}

const pixelX = 7
const pixelY = 10
const rows = 24
const cols = 40
const vOffset = 10  // correct for characters (not for squares)

export class VT52 extends Canvas {
    public buffer: number[]
    public cursorX: number = 0
    public cursorY: number = 0


    constructor(tag: string) {
        super(tag)

        // width should always be 640.  640 / 80 is 8 pixels across, which defines the character size
        console.assert(this.width >= 640, 'expect VT52 canvas to be 640 px wide')
        console.assert(this.height >= 480, 'expect VT52 canvas to be 480 px high')

        this.buffer = Array(rows * cols).fill(0)

        // hook the keyboard events for this canvas
        this.kybdObservable.addObserver('keypress', this.kybdKey, this)
        this.testVT52()
    }

    testVT52() {
        this.drawScreen()
        this.printString('now is the time for all good men to come to the aid of the party.')
        this.printString('\nnow is the time for all good men to come to the aid of the party.\n\nWalla Walla Washington.')
        this.drawScreen()

        for (let i = 0; i < 20; i++) {
            this.printString(`\ncounting ${i}`)
        }
        this.drawScreen()
        // // subscript to mouse and keyboard events
        // this.mouseObservable.addObserver('mousedown', this.mouseSoftKey, this)
        // this.animationObservable.addObserver('tick', this.animate, this)
        // // and publish when we have a new key (mouse or kybd)
        // this.answerReceived = new Observable()

    }
    kybdKey(event: KeyboardEvent) {
        console.log('kybdKey', event.key)
        this.printChar(event.charCode)
        this.drawScreen()
    }

    // full refresh of screen.
    drawScreen() {  // 640 / 40 = 16 bits across    480/24 = 20 bits down
        this.ctx.font = "12px Courier"
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

        for (let j = 0; j < rows; j++) {
            for (let i = 0; i < cols; i++) {

                let charCode = this.buffer[j * cols + i]
                if (charCode === 0) {
                    this.ctx.fillStyle = 'blue'
                    this.ctx.fillRect(i * pixelX + 4, j * pixelY + 6, 2, 2)
                } else {
                    // console.log('charCode', j, i, charCode)
                    let charString: string = String.fromCharCode(charCode)
                    this.ctx.fillStyle = "black"
                    this.ctx.fillText(charString, i * pixelX, j * pixelY + vOffset)
                }
            }
        }
    }

    printString(chars: string) {
        chars.split('').forEach((char) => this.printChar(char.charCodeAt(0)))
    }


    printChar(charCode: number) {
        console.assert(this.cursorX < cols, `cursorX should always be less than ${cols}`)
        if (charCode === 10) {  // force CRLF
            this.printCRLF()
        } else {
            this.buffer[cols * this.cursorY + this.cursorX] = charCode
            this.cursorX += 1   // horizontal cursor position
            if (this.cursorX >= cols) {
                this.printCRLF()
            }
        }
    }

    printCRLF() {
        console.log(`printCRLF at ${this.cursorX},${this.cursorY}`)
        if (this.cursorY === (rows - 1)) {
            // we are on the bottom line, so scroll up
            for (let i = cols; i < this.buffer.length; i++) {
                this.buffer[i - cols] = this.buffer[i]
                this.buffer[i] = 0
            }
            this.cursorX = 0   // cursorY remains the bottom row
        } else {
            // just drop the cursor to the next line
            this.cursorY += 1
            this.cursorX = 0
        }
    }
}