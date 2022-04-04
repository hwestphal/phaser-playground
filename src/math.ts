
export type V2 = [number, number]
export type V3 = [number, number, number]
export type V4 = [number, number, number, number]



export function dot(a: V2, b: V2): number;
export function dot(a: V3, b: V3): number;
export function dot(a: V4, b: V4): number;

export function dot(a: any, b: any): any {
    // map() creates a new array with multiplied results of each index,
    // then reduce() sums the values
    return a.map((x: number, i: number) => a[i] * b[i])
        .reduce((m: number, n: number) => m + n);
}



export function normLength(a:V3): number {
    return Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2]);
    // return Math.sqrt(reduce((m:number,n:number) => m+(n*n)))
}



export function normalize(a: V2  ): V2;
export function normalize(a: V3): V3;
export function normalize(a: V4): V4;

export function normalize (a: any): any {
    let len =  normLength(a)
    return a.map((x: number) => x / len)

    // return new Vector(this.x/(Math.sqrt(this.x * this.x + this.y * this.y)), this.y/(Math.sqrt(this.x * this.x + this.y * this.y)));
}

// function overloads
export function scalarmult(a: V2, b: number): V2;
export function scalarmult(a: V3, b: number): V3;
export function scalarmult(a: V4, b: number): V4;

export function scalarmult(a: any, b: any) {
    return a.map((x: number) => x * b)
}


export function cross(lhs: V3, rhs: V3): V3 {
    return [
        lhs[1] * rhs[2] - lhs[2] * rhs[1],
        lhs[2] * rhs[0] - lhs[0] * rhs[2],
        lhs[0] * rhs[1] - lhs[1] * rhs[0]
    ];
}


// function overloads
export function plus(a: V2, b: V2): V2;
export function plus(a: V3, b: V3): V3;
export function plus(a: V4, b: V4): V4;

export function plus(a: any, b: any) {
    return a.map((x: number, i: number) => a[i] + b[i])   // could be x+b.vec[i]
}

// function overloads
export function minus(a: V2, b: V2): V2;
export function minus(a: V3, b: V3): V3;
export function minus(a: V4, b: V4): V4;

export function minus(a: any, b: any): any {
    return a.map((x: number, i: number) => a[i] - b[i])
}   // could be x-b.vec[i] of course



// function scalarminus(lhs: number, rhs: Vec3d): Vec3d {
//     return minus(new Vec3d(lhs, lhs, lhs), rhs)
// }