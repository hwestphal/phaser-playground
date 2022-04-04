// if you add a class here, add it to Mathcode in main.ts
//      plus add it to mathode.d.ts.txt


export class V3 {
    x: number
    y: number
    z: number

    constructor(x: number, y: number, z: number) {
        this.x = x
        this.y = y
        this.z = z

    }

    add(other: V3): V3 {
        return new V3(this.x + other.x, this.y + other.y, this.z + other.z)
    }

    subtract(other: V3): V3 {
        return new V3(this.x - other.x, this.y - other.y, this.z - other.z)
    }

    scale(b: number): V3 {
        return new V3(this.x * b, this.y * b, this.z * b)
    }

    dot(other: V3): number {
        return (this.x * other.x + this.y * other.y + this.z * other.z)
    }

    length():number{
        return (Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z))
    }

    normalize(): V3 {
        const len = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z)
        return new V3(this.x / len, this.y / len, this.z / len)
    }

    cross(other: V3): V3 {
        return new V3(
            this.y * other.z - this.z * other.y,
            this.z * other.x - this.x * other.z,
            this.x * other.y - this.y * other.x
        );
    }

    lengthSquared(): number {     // equivalent to a vector dotted with itself
        return (this.x * this.x + this.y * this.y + this.z * this.z)
    }

    toString():string{
        return(`[x: ${this.x}, y: ${this.y}, z: ${this.z}]`)
    }
}

// alias
export class Point3 extends V3 { }
export class Color extends V3 { }


export class Ray {
    origin: V3
    direction: V3

    constructor(origin: V3, direction: V3) {
        this.origin = origin
        this.direction = direction.normalize()
    }

    at(t: number): V3 {
        return this.origin.add(this.direction.scale(t))  // A + tB
    }
}



export class Draw {

    framebuffer: any
    width: number
    height: number
    _canvas: HTMLCanvasElement
    Canvas: CanvasRenderingContext2D
    pointer: number

    aspectRatio = 16.0 / 9.0

    constructor(width?: number) {

        const height = (width / this.aspectRatio) | 0   // | 0 forces to an int

        this.width = width || 800
        
        this._canvas = document.getElementById("canvas") as HTMLCanvasElement
        this.Canvas = this._canvas.getContext("2d")

        // this.Canvas.imageSmoothingEnabled = true;

        this.framebuffer = []
        this.width = width
        this.height = height

        this._canvas.width = width
        this._canvas.height = height

        this.pointer = 0        // for writeColor()

        // initialize framebuffer to white
        this.framebuffer = [];
        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
                this.framebuffer[i * this.width + j] = [1, 1, 1];  //white
            }
        }
    }

    writeColor(color: V3) {
        this.framebuffer[this.pointer++] = [color.x, color.y, color.z]
    }

    putImage() {
        let imageData = this.Canvas.getImageData(0, 0, this.width, this.height);
        let buf = new ArrayBuffer(imageData.data.length);
        let buf8 = new Uint8ClampedArray(buf);
        let data = new Uint32Array(buf);


        for (var y = 0; y < this.height; ++y) {
            let row = y * this.width
            for (var x = 0; x < this.width; ++x) {
                let element = row + x
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




    render(rayColor: (r: Ray, world: any) => V3, world: any = null) {
        console.log('%cin rayColor', 'background-color:lightblue;')

        // Camera
        let viewport_height = 2.0
        let viewport_width = this.aspectRatio * viewport_height
        let focal_length = 1.0
        let origin = new V3(0, 0, 0)

        let horizontal = new V3(viewport_width, 0, 0)
        let vertical = new V3(0, viewport_height, 0)
        let lower_left_corner = origin.subtract(horizontal.scale(.5))
            .subtract(vertical.scale(.5))
            .subtract(new V3(0, 0, focal_length))

        // Render
        for (let j = this.height - 1; j >= 0; --j) {
            for (let i = 0; i < this.width; ++i) {
                let u = i / (this.width - 1)
                let v = j / (this.height - 1)
                let r = new Ray(origin, lower_left_corner.add(horizontal.scale(u)).add(vertical.scale(v)))

                let pixelColor = rayColor(r, world)  // calculate the color at that ray
                this.writeColor(pixelColor)
            }
        }

        this.putImage()
    }

    test() {   // a dummy that lets me test the class
        // World
        let world = new hittable_list()
        world.add(new Sphere(/*point3*/new V3(0, 0, -1), 0.5));
        // world.add(new Sphere(/*point3*/new V3(0, -100.5, -1), 100));

        this.render(ray_color, world)

    }

}


///////////////////
///////////////////
///////////////////


type hit_record = {
    isHit: boolean
    p?: V3
    normal?: V3
    t: number
    front_face?: boolean
}

function newHitRecord(): hit_record {      // a factory method to create empty records
    return { isHit: false, t: Infinity }   // rest are only set if isHit true
}


abstract class hittable {

    abstract hit(r: Ray, t_min: number, t_max: number): hit_record

 }


class Sphere extends hittable {
    center: V3
    radius: number

    constructor(center: V3, radius: number) {
        super()
        this.center = center
        this.radius = radius
    }

    hit(r: Ray, t_min: number, t_max: number): hit_record {

        let oc = r.origin.subtract(this.center)   // line from camera to center
        let a = r.direction.dot(r.direction)
        let half_b = oc.dot(r.direction)
        let c = oc.lengthSquared() - this.radius * this.radius
        let discriminant = half_b * half_b - a * c

        let rec = newHitRecord()

        if (discriminant < 0) return rec // re.isHit is false
        let sqrtd = Math.sqrt(discriminant)


        // Find the nearest root that lies in the acceptable range.
        let root = (-half_b - sqrtd) / a;
        if (root < t_min || t_max < root) {  // if not in range
            root = (-half_b + sqrtd) / a;
            if (root < t_min || t_max < root)  // if not in range
                return rec  // rec.isHit is false
        }

        // we have a hit, package it up and return it
        rec.isHit = true
        rec.t = root
        rec.p = r.at(rec.t)
        rec.normal = (rec.p.subtract(this.center)).scale(1.0 / this.radius)
        rec.front_face = r.direction.dot(rec.normal) < 0;

        return rec
    }
}

// hittable stores a list of spheres, and provides a hit method to run through them
// it returns a HIT_RECORD to ray_color

class hittable_list {

    hittableObjectList: hittable[] = []

    clear() { this.hittableObjectList = [] }

    add(hittableObject: hittable) { this.hittableObjectList.push(hittableObject) }

    hit(r: Ray, t_min: number, t_max: number): hit_record {
        let closest_so_far = newHitRecord()   // false, Infinity, etc
        closest_so_far.t = t_max

        this.hittableObjectList.forEach((hittable) => {
            let rec = hittable.hit(r, t_min, closest_so_far.t)
            if (rec.isHit && rec.t < closest_so_far.t) {
                closest_so_far = rec
            }
        })
        return closest_so_far
    }
}


function ray_color(r: Ray, world: hittable_list) {

    let rec = world.hit(r, 0, Infinity)
    if (rec.isHit) {
        return rec.normal.add( /*color*/ new V3(1, 1, 1)).scale(.5)
    }

    // otherwise background color pattern
    let unit_direction = r.direction.normalize()
    let t = 0.5 * (unit_direction.y + 1.0);

    return   /*color*/ new V3(1.0, 1.0, 1.0).scale(1.0 - t).add(   /*color*/ new V3(0.5, 0.7, 1.0).scale(t))
}


