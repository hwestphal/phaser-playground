// adapted from https://github.com/anon767/rayjs
// check this out:  https://www.scratchapixel.com/lessons/3d-basic-rendering/minimal-ray-tracer-rendering-simple-shapes/ray-sphere-intersection

// info about webgl2:  https://webgl2fundamentals.org/webgl/lessons/webgl-fundamentals.html


import { V2, V3, V4, plus, minus, dot, cross, scalarmult, normalize, normLength } from './math'


// var width = 1024;
// var height = 768;

let width = 320;
let height = 200;


var c = document.getElementById("canvas") as HTMLCanvasElement
c.width = width
c.height = height

var ctx = c.getContext("2d")
ctx.imageSmoothingEnabled = true;



// let framebuffer: V3[] = Array(width * height).fill([0, 0, 0])  // initialize to black
let framebuffer: any = []

class Material {
    diffuseColor: V3
    albedo: V3
    specularExponent: number

    constructor(albedo: V3, color: V3, spec: number) {
        this.diffuseColor = color; //Vec3d
        this.albedo = albedo; //Vec3d
        this.specularExponent = spec; //float
    }
}


class Light {
    position: V3
    intensity: number
    constructor(position: V3, intensity: number) {
        this.position = position;
        this.intensity = intensity;
    }
}
class Obj {
    material: Material
    constructor(material: Material) {
        this.material = material;
    }
}

class Triangle extends Obj {
    center: V3
    v1: V3
    v2: V3
    v3: V3
    constructor(v1: V3, v2: V3, v3: V3, material: Material) {
        super(material);
        this.center = v2;
        this.v1 = v1;
        this.v2 = v2;
        this.v3 = v3;
    }
    rayIntersect(orig: V3, dir: V3) {
        let e1 = minus(this.v2, this.v1);
        let e2 = minus(this.v3, this.v1);
        let h = cross(dir, e2)
        let a = dot(e1, h);
        if (a > -0.00001 && a < 0.00001) return [false, null];
        let f = 1 / a;
        let s = minus(orig, this.v1);
        let u = f * dot(s, h);
        if (u < 0.0 || u > 1.0) return [false, null];
        let q = cross(s, e1);
        let v = f * dot(dir, q);
        if (v < 0.0 || u + v > 1.0) return [false, null];
        let t = f * dot(e2, q);
        if (t > 0.0001) return ([true, t]);
        else
            return [false, null];
    }
}
class Sphere extends Obj {
    center: V3
    radius: number
    // material: Material;

    constructor(center: V3, radius: number, material: Material) {
        super(material);
        this.center = center;
        this.radius = radius;
    }

    rayIntersect(orig: V3, dir: V3):[boolean,number] {
        let L = minus(this.center, orig); //center-orig
        let tca = dot(L, dir); //L*dir
        let d2 = dot(L, L) - tca * tca; // L*L - tca*tca
        if (d2 > this.radius * this.radius) return [false, null];
        let thc = Math.sqrt(this.radius * this.radius - d2);
        let t0 = tca - thc;
        let t1 = tca + thc;
        if (t0 < 0) t0 = t1;
        if (t0 < 0) return [false, null];
        return [true, t0];
    }
}
function reflect(I: V3, N: V3): V3 {
    return minus(I, scalarmult(scalarmult(N, 2), dot(I, N)));
}

function sceneIntersect(orig: V3, dir: V3, spheres: Sphere[]): [boolean, V3, V3, Material] {
    let N: V3, hit: V3, material: Material, spheres_dist = 1000;
    for (let i = 0; i < spheres.length; ++i) {
        let [intersects, dist_i] = spheres[i].rayIntersect(orig, dir);
        if (intersects && dist_i <= 0+spheres_dist) {
            spheres_dist = Number(dist_i);   // it might have been boolean
            hit = plus(orig, scalarmult(dir, Number(dist_i)));
            N = normalize(minus(hit, spheres[i].center));
            material = spheres[i].material;
        }
    }
    return [spheres_dist < 1000, hit, N, material];
}


function castRay(orig: V3, dir: V3, spheres: Sphere[], lights: Light[], depth = 0): V3 {
    let [intersects, point, N, material] = sceneIntersect(orig, dir, spheres);
    if (!intersects && depth==0)  // pointing at infinite space
        return background;

    if (depth > maxrecur || !intersects)
        return [0, 0, 0]   //  this won't interfere with other colors


    let reflect_dir = normalize(reflect(dir, N))
    let reflect_orig = (dot(reflect_dir, N) < 0) ? minus(point, scalarmult(N, 0.001)) : plus(point, scalarmult(N, 0.001));
    let reflect_color = castRay(reflect_orig, reflect_dir, spheres, lights, depth + 1);   //recursive

    let diffuse_light_intensity = 0
    let specular_light_intensity = 0;

    for (let i = 0; i < lights.length; ++i) {
        let light_dir = normalize(minus(lights[i].position, point))
        let light_distance = normLength(minus(lights[i].position, point))
        let shadow_orig = dot(light_dir, N) < 0 ? minus(point, scalarmult(N, 0.001)) : plus(point, scalarmult(N, 0.001));
        let [shadow_intersects, shadow_point, shadow_N, shadow_material] = sceneIntersect(shadow_orig, light_dir, spheres);
        if (shadow_intersects && normLength(minus(shadow_point, shadow_orig)) < light_distance)
            continue;
        diffuse_light_intensity += Math.max(0, dot(light_dir, N)) * lights[i].intensity;
        specular_light_intensity += Math.pow(Math.max(0, -dot(reflect(minus([0, 0, 0], light_dir), N), dir)), material.specularExponent) * lights[i].intensity;
    }

    // add up the different contributions
    let finalColor = plus(scalarmult(material.diffuseColor, diffuse_light_intensity * material.albedo[0]),
        plus(
            scalarmult([1, 1, 1], specular_light_intensity * material.albedo[1]),
            scalarmult(reflect_color, material.albedo[2])
        )
    );
    return finalColor
}

function draw() {
    console.time("drawing");

    var imageData = ctx.getImageData(0, 0, width, height);
    var buf = new ArrayBuffer(imageData.data.length);
    var buf8 = new Uint8ClampedArray(buf);
    var data = new Uint32Array(buf);

    for (var y = 0; y < height; ++y) {
        for (var x = 0; x < width; ++x) {
            data[y * width + x] =
                (255 << 24) |    // alpha
                ((Math.min(1, framebuffer[x][y][2]) * 255) << 16) |    // blue
                ((Math.min(1, framebuffer[x][y][1]) * 255) << 8) |    // green
                (Math.min(1, framebuffer[x][y][0]) * 255);            // red
        }
    }
    imageData.data.set(buf8);

    ctx.putImageData(imageData, 0, 0);

    console.timeEnd("drawing");
}
function render(spheres: Sphere[], lights: Light[]) {
    console.time("rendering")
    for (let i = 0; i < width; ++i) {
        for (let j = 0; j < height; ++j) {
            let ptr = i * width + j

            let x = (2 * (i + 0.5) / width - 1) * Math.tan(fov / 2.) * width / height;
            let y = -(2 * (j + 0.5) / height - 1) * Math.tan(fov / 2.);
            // framebuffer[ptr] = normalize(castRay(camera, [x, y, -1], spheres, lights))
            framebuffer[i][j] = castRay(camera, normalize([x, y, -1]), spheres, lights)

        }
    }
    console.timeEnd("rendering");
}



var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;
function demo() {
    document.addEventListener('keydown', keyDownHandler, false);
    document.addEventListener('keyup', keyUpHandler, false);
    window.requestAnimationFrame(step);
}
function keyDownHandler(event: any) {
    // console.log(event)
    if (event.keyCode == 39) {
        rightPressed = true;
    }
    else if (event.keyCode == 37) {
        leftPressed = true;
    }
    if (event.keyCode == 40) {
        downPressed = true;
    }
    else if (event.keyCode == 38) {
        upPressed = true;
    }
}
function step() {
    if (rightPressed) camera[0] += 5;
    else if (leftPressed) camera[0] -= 5;
    else if (upPressed) camera[2] -= 5;
    else if (downPressed) camera[2] += 5;
    else {
        window.requestAnimationFrame(step);
        return;
    }
    render(spheres, lights);
    draw();
    window.requestAnimationFrame(step);
}
function keyUpHandler(event: any) {
    if (event.keyCode == 39) {
        rightPressed = false;
    }
    else if (event.keyCode == 37) {
        leftPressed = false;
    }
    if (event.keyCode == 40) {
        downPressed = false;
    }
    else if (event.keyCode == 38) {
        upPressed = false;
    }
}



// spheres.push(new Triangle([1, -0.5, -12], [3, 4.5, -12],[6, -0.5, -12], red_rubber))



function init() {
    for (let i = 0; i < width; i++) {
        framebuffer[i] = [];
        for (let j = 0; j < height; j++) {
            framebuffer[i][j] = [0, 0, 0];
        }
    }
}


const fov = Math.PI / 3.;
const maxrecur = 4;
var camera: V3 = [0, 0, 0]

let background: V3 = [.4, .2, .2]

let ivory = new Material([0.6, 0.3, 0.1], [0.4, 0.4, 0.3], 50.);
let red_rubber = new Material([0.9, 0.1, 0], [0.3, 0.1, 0.1], 10.);
let mirror = new Material([0., 10, 0.8], [1, 1, 1], 1425.);
let lights: Light[] = []
let spheres: Sphere[] = []
lights.push(new Light([-20, 20, 20], 1.5));
lights.push(new Light([30, 50, -25], 1.8));
lights.push(new Light([30, 20, 30], 1.7));

spheres.push(new Sphere([1.5, -0.5, -18], 3, red_rubber));
spheres.push(new Sphere([-1.0, -1.5, -12], 2, mirror));
spheres.push(new Sphere([-3, 0, -16], 2, ivory));
spheres.push(new Sphere([7, 5, -18], 4, mirror));

// spheres.push(new Triangle([ 1, -0.5, -12],[ 3, 4.5, -12],[ 6, -0.5, -12), red_rubber))



export function Raytracer() {
    init()
    render(spheres, lights);
    draw();
    demo()
}


