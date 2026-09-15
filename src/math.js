"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.minus = exports.plus = exports.cross = exports.scalarmult = exports.normalize = exports.normLength = exports.dot = void 0;
function dot(a, b) {
    // map() creates a new array with multiplied results of each index,
    // then reduce() sums the values
    return a.map((x, i) => a[i] * b[i])
        .reduce((m, n) => m + n);
}
exports.dot = dot;
function normLength(a) {
    return Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2]);
    // return Math.sqrt(reduce((m:number,n:number) => m+(n*n)))
}
exports.normLength = normLength;
function normalize(a) {
    let len = normLength(a);
    return a.map((x) => x / len);
    // return new Vector(this.x/(Math.sqrt(this.x * this.x + this.y * this.y)), this.y/(Math.sqrt(this.x * this.x + this.y * this.y)));
}
exports.normalize = normalize;
function scalarmult(a, b) {
    return a.map((x) => x * b);
}
exports.scalarmult = scalarmult;
function cross(lhs, rhs) {
    return [
        lhs[1] * rhs[2] - lhs[2] * rhs[1],
        lhs[2] * rhs[0] - lhs[0] * rhs[2],
        lhs[0] * rhs[1] - lhs[1] * rhs[0]
    ];
}
exports.cross = cross;
function plus(a, b) {
    return a.map((x, i) => a[i] + b[i]); // could be x+b.vec[i]
}
exports.plus = plus;
function minus(a, b) {
    return a.map((x, i) => a[i] - b[i]);
} // could be x-b.vec[i] of course
exports.minus = minus;
// function scalarminus(lhs: number, rhs: Vec3d): Vec3d {
//     return minus(new Vec3d(lhs, lhs, lhs), rhs)
// }
//# sourceMappingURL=math.js.map