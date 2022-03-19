import { ThinEngine } from "babylonjs/Engines/thinEngine"



export class V3 {
    v: [number, number, number]

    constructor(x: number, y: number, z: number) {
        this.v = [x, y, z]
    }

    add(other: V3): V3 {
        return new V3(this.v[0] + other.v[0], this.v[1] + other.v[1], this.v[2] + other.v[2])
    }

    subtract(other: V3): V3 {
        return new V3(this.v[0] - other.v[0], this.v[1] - other.v[1], this.v[2] - other.v[2])
    }

    dot(other: V3): number {
        return this.v[0] * other.v[0] + this.v[1] * other.v[1] + this.v[2] * other.v[2]
    }

    normalize(): V3 {
        let len = Math.sqrt(this.v[0] * this.v[0] + this.v[1] * this.v[1] + this.v[2] * this.v[2])
        return new V3(this.v[0] / len, this.v[1] / len, this.v[2] / len)
    }

    scale(b: number): V3 {
        return new V3(this.v[0] * b, this.v[1] * b, this.v[2] * b)
    }

    cross(other: V3): V3 {
        return new V3(
            this.v[1] * other.v[2] - this.v[2] * other.v[1],
            this.v[2] * other.v[0] - this.v[0] * other.v[2],
            this.v[0] * other.v[1] - this.v[1] * other.v[0]
        );
    }

}


export class Draw {

    framebuffer: any
    width: number
    height: number
    _canvas: HTMLCanvasElement
    Canvas: CanvasRenderingContext2D
    pointer: number

    constructor(width: number = 1000, height: number = 500) {

        this._canvas = document.getElementById("canvas") as HTMLCanvasElement
        this.Canvas = this._canvas.getContext("2d")

        // this.Canvas.imageSmoothingEnabled = true;

        this.framebuffer = []
        this.width = width
        this.height = height

        this._canvas.width = width
        this._canvas.height = height

        this.pointer = 0        // for writeColor()

        this.framebuffer = [];
        for (let i = 0; i < height; i++) {
            for (let j = 0; j < width; j++) {
                this.framebuffer[i * width + j] = [1, 1, 1];  //white
            }
        }
    }

    writeColor(x: number, y: number, z: number) {
        this.framebuffer[this.pointer++] = [x, y, z]
    }

    putImage() {
        let imageData = this.Canvas.getImageData(0, 0, this.width, this.height);
        let buf = new ArrayBuffer(imageData.data.length);
        let buf8 = new Uint8ClampedArray(buf);
        let data = new Uint32Array(buf);


        for (var y = 0; y < this.height; ++y) {
            let row = y * this.width
            for (var x = 0; x < this.width; ++x) {
                let element= row+x
                data[element] =
                    (255 << 24) |    // alpha
                    ((Math.min(1, this.framebuffer[element][2]) * 255) << 16) |    // blue
                    ((Math.min(1, this.framebuffer[element][1]) * 255) << 8) |    // green
                    (Math.min(1, this.framebuffer[element][0]) * 255);            // red
            }
        }
        imageData.data.set(buf8);

        this.Canvas.putImageData(imageData, 0, 0);
        this.pointer = 0        // reset writeColor() pointer
    }





}

/*
// sample
let d = Mathcode.Draw()

let draw = [[0xff, 0x00, 0x00], [0x00, 0xff, 0x00], [0x00, 0x00, 0xff], [0xff,0xff,0x00], [0xff,0xff,0xff], [0x00,0x00,0x00]]

let cube = 40 // side of cube
draw.forEach((value: number[], index: number) => {

    for (let k = 0; k < cube; k++) {
        for (let j = 0; j < cube; j++) {
            d.framebuffer[(index * cube) + k][j] = value
        }
    }
})

d.putImage()

*/