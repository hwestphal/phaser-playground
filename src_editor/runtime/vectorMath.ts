
/*********************
 * see:  https://github.com/matthiasferch/tsm
 *
 * V2
 * v3
 * V4
 * M2
 * M3
 * M4
 * quat
 *
 */



/* This version of TSM was lightly modified by Tom Berend from the original of Matthias Ferch,
 * whose copyright notice follows below.
 *
 *  - The names of the functions were changed (eg: vec3 -> V3).
 *  - combined into a single file to eliminate Rollup circular dependencies
 *  - The code was converted to newer TypeScript
 *  - Several small errors were fixed (TypeScript found them)
 *  - A few small additions like 'Quat.zero'
 *
 * Permission is granted for this version of TSM, subject to compliance with the terms of
 * the original copyright below.
 *
 */



/*
 * Copyright (c) 2012, 2018 Matthias Ferch
 *
 * Project homepage: https://github.com/matthiasferch/tsm
 *
 * This software is provided 'as-is', without any express or implied
 * warranty. In no event will the authors be held liable for any damages
 * arising from the use of this software.
 *
 * Permission is granted to anyone to use this software for any purpose,
 * including commercial applications, and to alter it and redistribute it
 * freely, subject to the following restrictions:
 *
 *    1. The origin of this software must not be misrepresented; you must not
 *    claim that you wrote the original software. If you use this software
 *    in a product, an acknowledgment in the product documentation would be
 *    appreciated but is not required.
 *
 *    2. Altered source versions must be plainly marked as such, and must not
 *    be misrepresented as being the original software.
 *
 *    3. This notice may not be removed or altered from any source
 *    distribution.
 */

const epsilon = 0.00001

export class V2 {
    // a v2 is an array [x , y]

    get x(): number {
        return this.values[0]
    }

    get y(): number {
        return this.values[1]
    }

    get xy(): [number, number] {
        return [
            this.values[0],
            this.values[1],
        ]
    }

    set x(value: number) {
        this.values[0] = value
    }

    set y(value: number) {
        this.values[1] = value
    }

    set xy(values: [number, number]) {
        this.values[0] = values[0]
        this.values[1] = values[1]
    }

    public static readonly zero = new V2([0, 0])
    public static readonly one = new V2([1, 1])

    public static cross(vector: V2, vector2: V2, dest?: V3): V3 {
        if (!dest) { dest = new V3() }

        const x = vector.x
        const y = vector.y

        const x2 = vector2.x
        const y2 = vector2.y

        const z = x * y2 - y * x2

        dest.x = 0
        dest.y = 0
        dest.z = z

        return dest
    }

    public static dot(vector: V2, vector2: V2): number {
        return (vector.x * vector2.x + vector.y * vector2.y)
    }

    public static distance(vector: V2, vector2: V2): number {
        return Math.sqrt(this.squaredDistance(vector, vector2))
    }

    public static squaredDistance(vector: V2, vector2: V2): number {
        const x = vector2.x - vector.x
        const y = vector2.y - vector.y

        return (x * x + y * y)
    }

    public static direction(vector: V2, vector2: V2, dest?: V2): V2 {
        if (!dest) { dest = new V2() }

        const x = vector.x - vector2.x
        const y = vector.y - vector2.y

        let length = Math.sqrt(x * x + y * y)

        if (length === 0) {
            dest.x = 0
            dest.y = 0

            return dest
        }

        length = 1 / length

        dest.x = x * length
        dest.y = y * length

        return dest
    }

    public static mix(vector: V2, vector2: V2, time: number, dest?: V2): V2 {
        if (!dest) { dest = new V2() }

        const x = vector.x
        const y = vector.y

        const x2 = vector2.x
        const y2 = vector2.y

        dest.x = x + time * (x2 - x)
        dest.y = y + time * (y2 - y)

        return dest
    }

    public static sum(vector: V2, vector2: V2, dest?: V2): V2 {
        if (!dest) { dest = new V2() }

        dest.x = vector.x + vector2.x
        dest.y = vector.y + vector2.y

        return dest
    }

    public static difference(vector: V2, vector2: V2, dest?: V2): V2 {
        if (!dest) { dest = new V2() }

        dest.x = vector.x - vector2.x
        dest.y = vector.y - vector2.y

        return dest
    }

    public static product(vector: V2, vector2: V2, dest?: V2): V2 {
        if (!dest) { dest = new V2() }

        dest.x = vector.x * vector2.x
        dest.y = vector.y * vector2.y

        return dest
    }

    public static quotient(vector: V2, vector2: V2, dest?: V2): V2 {
        if (!dest) { dest = new V2() }

        dest.x = vector.x / vector2.x
        dest.y = vector.y / vector2.y

        return dest
    }

    private values = new Float32Array(2)

    constructor(values?: [number, number]) {
        if (values !== undefined) {
            this.xy = values
        }
    }

    public at(index: number): number {
        return this.values[index]
    }

    public reset(): void {
        this.x = 0
        this.y = 0
    }

    public copy(dest?: V2): V2 {
        if (!dest) { dest = new V2() }

        dest.x = this.x
        dest.y = this.y

        return dest
    }

    public negate(dest?: V2): V2 {
        if (!dest) { dest = this }

        dest.x = -this.x
        dest.y = -this.y

        return dest
    }

    public equals(vector: V2, threshold = epsilon): boolean {
        if (Math.abs(this.x - vector.x) > threshold) {
            return false
        }

        if (Math.abs(this.y - vector.y) > threshold) {
            return false
        }

        return true
    }

    public length(): number {
        return Math.sqrt(this.squaredLength())
    }

    public squaredLength(): number {
        const x = this.x
        const y = this.y

        return (x * x + y * y)
    }

    public add(vector: V2): V2 {
        this.x += vector.x
        this.y += vector.y

        return this
    }

    public subtract(vector: V2): V2 {
        this.x -= vector.x
        this.y -= vector.y

        return this
    }

    public multiply(vector: V2): V2 {
        this.x *= vector.x
        this.y *= vector.y

        return this
    }

    public divide(vector: V2): V2 {
        this.x /= vector.x
        this.y /= vector.y

        return this
    }

    public scale(value: number, dest?: V2): V2 {
        if (!dest) { dest = this }

        dest.x *= value
        dest.y *= value

        return dest
    }

    public normalize(dest?: V2): V2 {
        if (!dest) { dest = this }

        let length = this.length()

        if (length === 1) {
            return this
        }

        if (length === 0) {
            dest.x = 0
            dest.y = 0

            return dest
        }

        length = 1.0 / length

        dest.x *= length
        dest.y *= length

        return dest
    }

    public multiplyMat2(matrix: M2, dest?: V2): V2 {
        if (!dest) { dest = this }

        return matrix.multiplyVec2(this, dest)
    }

    public multiplyMat3(matrix: M3, dest?: V2): V2 {
        if (!dest) { dest = this }

        return matrix.multiplyVec2(this, dest)
    }

}

export class V3 {

    get x(): number {
        return this.values[0]
    }

    get y(): number {
        return this.values[1]
    }

    get z(): number {
        return this.values[2]
    }

    get xy(): [number, number] {
        return [
            this.values[0],
            this.values[1],
        ]
    }

    get xyz(): [number, number, number] {
        return [
            this.values[0],
            this.values[1],
            this.values[2],
        ]
    }

    set x(value: number) {
        this.values[0] = value
    }

    set y(value: number) {
        this.values[1] = value
    }

    set z(value: number) {
        this.values[2] = value
    }

    set xy(values: [number, number]) {
        this.values[0] = values[0]
        this.values[1] = values[1]
    }

    set xyz(values: [number, number, number]) {
        this.values[0] = values[0]
        this.values[1] = values[1]
        this.values[2] = values[2]
    }

    public static readonly zero = new V3([0, 0, 0])
    public static readonly one = new V3([1, 1, 1])

    public static readonly up = new V3([0, 1, 0])
    public static readonly right = new V3([1, 0, 0])
    public static readonly forward = new V3([0, 0, 1])

    public static cross(vector: V3, vector2: V3, dest?: V3): V3 {
        if (!dest) { dest = new V3() }

        const x = vector.x
        const y = vector.y
        const z = vector.z

        const x2 = vector2.x
        const y2 = vector2.y
        const z2 = vector2.z

        dest.x = y * z2 - z * y2
        dest.y = z * x2 - x * z2
        dest.z = x * y2 - y * x2

        return dest
    }

    public static dot(vector: V3, vector2: V3): number {
        const x = vector.x
        const y = vector.y
        const z = vector.z

        const x2 = vector2.x
        const y2 = vector2.y
        const z2 = vector2.z

        return (x * x2 + y * y2 + z * z2)
    }

    public static distance(vector: V3, vector2: V3): number {
        const x = vector2.x - vector.x
        const y = vector2.y - vector.y
        const z = vector2.z - vector.z

        return Math.sqrt(this.squaredDistance(vector, vector2))
    }

    public static squaredDistance(vector: V3, vector2: V3): number {
        const x = vector2.x - vector.x
        const y = vector2.y - vector.y
        const z = vector2.z - vector.z

        return (x * x + y * y + z * z)
    }

    public static direction(vector: V3, vector2: V3, dest?: V3): V3 {
        if (!dest) { dest = new V3() }

        const x = vector.x - vector2.x
        const y = vector.y - vector2.y
        const z = vector.z - vector2.z

        let length = Math.sqrt(x * x + y * y + z * z)

        if (length === 0) {
            dest.x = 0
            dest.y = 0
            dest.z = 0

            return dest
        }

        length = 1 / length

        dest.x = x * length
        dest.y = y * length
        dest.z = z * length

        return dest
    }

    public static mix(vector: V3, vector2: V3, time: number, dest?: V3): V3 {
        if (!dest) { dest = new V3() }

        dest.x = vector.x + time * (vector2.x - vector.x)
        dest.y = vector.y + time * (vector2.y - vector.y)
        dest.z = vector.z + time * (vector2.z - vector.z)

        return dest
    }

    public static sum(vector: V3, vector2: V3, dest?: V3): V3 {
        if (!dest) { dest = new V3() }

        dest.x = vector.x + vector2.x
        dest.y = vector.y + vector2.y
        dest.z = vector.z + vector2.z

        return dest
    }

    public static difference(vector: V3, vector2: V3, dest?: V3): V3 {
        if (!dest) { dest = new V3() }

        dest.x = vector.x - vector2.x
        dest.y = vector.y - vector2.y
        dest.z = vector.z - vector2.z

        return dest
    }

    public static product(vector: V3, vector2: V3, dest?: V3): V3 {
        if (!dest) { dest = new V3() }

        dest.x = vector.x * vector2.x
        dest.y = vector.y * vector2.y
        dest.z = vector.z * vector2.z

        return dest
    }

    public static quotient(vector: V3, vector2: V3, dest?: V3): V3 {
        if (!dest) { dest = new V3() }

        dest.x = vector.x / vector2.x
        dest.y = vector.y / vector2.y
        dest.z = vector.z / vector2.z

        return dest
    }

    private values = new Float32Array(3)

    constructor(values?: [number, number, number]) {
        if (values !== undefined) {
            this.xyz = values
        }
    }

    public at(index: number): number {
        return this.values[index]
    }

    public reset(): void {
        this.x = 0
        this.y = 0
        this.z = 0
    }

    public copy(dest?: V3): V3 {
        if (!dest) { dest = new V3() }

        dest.x = this.x
        dest.y = this.y
        dest.z = this.z

        return dest
    }

    public negate(dest?: V3): V3 {
        if (!dest) { dest = this }

        dest.x = -this.x
        dest.y = -this.y
        dest.z = -this.z

        return dest
    }

    public equals(vector: V3, threshold = epsilon): boolean {
        if (Math.abs(this.x - vector.x) > threshold) {
            return false
        }

        if (Math.abs(this.y - vector.y) > threshold) {
            return false
        }

        if (Math.abs(this.z - vector.z) > threshold) {
            return false
        }

        return true
    }

    public length(): number {
        return Math.sqrt(this.squaredLength())
    }

    public squaredLength(): number {
        const x = this.x
        const y = this.y
        const z = this.z

        return (x * x + y * y + z * z)
    }

    public add(vector: V3): V3 {
        this.x += vector.x
        this.y += vector.y
        this.z += vector.z

        return this
    }

    public subtract(vector: V3): V3 {
        this.x -= vector.x
        this.y -= vector.y
        this.z -= vector.z

        return this
    }

    public multiply(vector: V3): V3 {
        this.x *= vector.x
        this.y *= vector.y
        this.z *= vector.z

        return this
    }

    public divide(vector: V3): V3 {
        this.x /= vector.x
        this.y /= vector.y
        this.z /= vector.z

        return this
    }

    public scale(value: number, dest?: V3): V3 {
        if (!dest) { dest = this }

        dest.x *= value
        dest.y *= value
        dest.z *= value

        return dest
    }

    public normalize(dest?: V3): V3 {
        if (!dest) { dest = this }

        let length = this.length()

        if (length === 1) {
            return this
        }

        if (length === 0) {
            dest.x = 0
            dest.y = 0
            dest.z = 0

            return dest
        }

        length = 1.0 / length

        dest.x *= length
        dest.y *= length
        dest.z *= length

        return dest
    }

    public multiplyByMat3(matrix: M3, dest?: V3): V3 {
        if (!dest) { dest = this }

        return matrix.multiplyVec3(this, dest)
    }

    public multiplyByQuat(quaternion: Quat, dest?: V3): V3 {
        if (!dest) { dest = this }

        return quaternion.multiplyVec3(this, dest)
    }

    public toQuat(dest?: Quat): Quat {
        if (!dest) { dest = new Quat() }

        const c = new V3()
        const s = new V3()

        c.x = Math.cos(this.x * 0.5)
        s.x = Math.sin(this.x * 0.5)

        c.y = Math.cos(this.y * 0.5)
        s.y = Math.sin(this.y * 0.5)

        c.z = Math.cos(this.z * 0.5)
        s.z = Math.sin(this.z * 0.5)

        dest.x = s.x * c.y * c.z - c.x * s.y * s.z
        dest.y = c.x * s.y * c.z + s.x * c.y * s.z
        dest.z = c.x * c.y * s.z - s.x * s.y * c.z
        dest.w = c.x * c.y * c.z + s.x * s.y * s.z

        return dest
    }
}



export class V4 {

    get x(): number {
        return this.values[0]
    }

    get y(): number {
        return this.values[1]
    }

    get z(): number {
        return this.values[2]
    }

    get w(): number {
        return this.values[3]
    }

    get xy(): [number, number] {
        return [
            this.values[0],
            this.values[1],
        ]
    }

    get xyz(): [number, number, number] {
        return [
            this.values[0],
            this.values[1],
            this.values[2],
        ]
    }

    get xyzw(): [number, number, number, number] {
        return [
            this.values[0],
            this.values[1],
            this.values[2],
            this.values[3],
        ]
    }

    set x(value: number) {
        this.values[0] = value
    }

    set y(value: number) {
        this.values[1] = value
    }

    set z(value: number) {
        this.values[2] = value
    }

    set w(value: number) {
        this.values[3] = value
    }

    set xy(values: [number, number]) {
        this.values[0] = values[0]
        this.values[1] = values[1]
    }

    set xyz(values: [number, number, number]) {
        this.values[0] = values[0]
        this.values[1] = values[1]
        this.values[2] = values[2]
    }

    set xyzw(values: [number, number, number, number]) {
        this.values[0] = values[0]
        this.values[1] = values[1]
        this.values[2] = values[2]
        this.values[3] = values[3]
    }

    get r(): number {
        return this.values[0]
    }

    get g(): number {
        return this.values[1]
    }

    get b(): number {
        return this.values[2]
    }

    get a(): number {
        return this.values[3]
    }

    get rg(): [number, number] {
        return [
            this.values[0],
            this.values[1],
        ]
    }

    get rgb(): [number, number, number] {
        return [
            this.values[0],
            this.values[1],
            this.values[2],
        ]
    }

    get rgba(): [number, number, number, number] {
        return [
            this.values[0],
            this.values[1],
            this.values[2],
            this.values[3],
        ]
    }

    set r(value: number) {
        this.values[0] = value
    }

    set g(value: number) {
        this.values[1] = value
    }

    set b(value: number) {
        this.values[2] = value
    }

    set a(value: number) {
        this.values[3] = value
    }

    set rg(values: [number, number]) {
        this.values[0] = values[0]
        this.values[1] = values[1]
    }

    set rgb(values: [number, number, number]) {
        this.values[0] = values[0]
        this.values[1] = values[1]
        this.values[2] = values[2]
    }

    set rgba(values: [number, number, number, number]) {
        this.values[0] = values[0]
        this.values[1] = values[1]
        this.values[2] = values[2]
        this.values[3] = values[3]
    }

    public static readonly zero = new V4([0, 0, 0, 1])
    public static readonly one = new V4([1, 1, 1, 1])

    public static mix(vector: V4, vector2: V4, time: number, dest?: V4): V4 {
        if (!dest) { dest = new V4() }

        dest.x = vector.x + time * (vector2.x - vector.x)
        dest.y = vector.y + time * (vector2.y - vector.y)
        dest.z = vector.z + time * (vector2.z - vector.z)
        dest.w = vector.w + time * (vector2.w - vector.w)

        return dest
    }

    public static sum(vector: V4, vector2: V4, dest?: V4): V4 {
        if (!dest) { dest = new V4() }

        dest.x = vector.x + vector2.x
        dest.y = vector.y + vector2.y
        dest.z = vector.z + vector2.z
        dest.w = vector.w + vector2.w

        return dest
    }

    public static difference(vector: V4, vector2: V4, dest?: V4): V4 {
        if (!dest) { dest = new V4() }

        dest.x = vector.x - vector2.x
        dest.y = vector.y - vector2.y
        dest.z = vector.z - vector2.z
        dest.w = vector.w - vector2.w

        return dest
    }

    public static product(vector: V4, vector2: V4, dest?: V4): V4 {
        if (!dest) { dest = new V4() }

        dest.x = vector.x * vector2.x
        dest.y = vector.y * vector2.y
        dest.z = vector.z * vector2.z
        dest.w = vector.w * vector2.w

        return dest
    }

    public static quotient(vector: V4, vector2: V4, dest?: V4): V4 {
        if (!dest) { dest = new V4() }

        dest.x = vector.x / vector2.x
        dest.y = vector.y / vector2.y
        dest.z = vector.z / vector2.z
        dest.w = vector.w / vector2.w

        return dest
    }

    private values = new Float32Array(4)

    constructor(values?: [number, number, number, number]) {
        if (values !== undefined) {
            this.xyzw = values
        }
    }

    public at(index: number): number {
        return this.values[index]
    }

    public reset(): void {
        this.x = 0
        this.y = 0
        this.z = 0
        this.w = 0
    }

    public copy(dest?: V4): V4 {
        if (!dest) { dest = new V4() }

        dest.x = this.x
        dest.y = this.y
        dest.z = this.z
        dest.w = this.w

        return dest
    }

    public negate(dest?: V4): V4 {
        if (!dest) { dest = this }

        dest.x = -this.x
        dest.y = -this.y
        dest.z = -this.z
        dest.w = -this.w

        return dest
    }

    public equals(vector: V4, threshold = epsilon): boolean {
        if (Math.abs(this.x - vector.x) > threshold) {
            return false
        }

        if (Math.abs(this.y - vector.y) > threshold) {
            return false
        }

        if (Math.abs(this.z - vector.z) > threshold) {
            return false
        }

        if (Math.abs(this.w - vector.w) > threshold) {
            return false
        }

        return true
    }

    public length(): number {
        return Math.sqrt(this.squaredLength())
    }

    public squaredLength(): number {
        const x = this.x
        const y = this.y
        const z = this.z
        const w = this.w

        return (x * x + y * y + z * z + w * w)
    }

    public add(vector: V4): V4 {
        this.x += vector.x
        this.y += vector.y
        this.z += vector.z
        this.w += vector.w

        return this
    }

    public subtract(vector: V4): V4 {
        this.x -= vector.x
        this.y -= vector.y
        this.z -= vector.z
        this.w -= vector.w

        return this
    }

    public multiply(vector: V4): V4 {
        this.x *= vector.x
        this.y *= vector.y
        this.z *= vector.z
        this.w *= vector.w

        return this
    }

    public divide(vector: V4): V4 {
        this.x /= vector.x
        this.y /= vector.y
        this.z /= vector.z
        this.w /= vector.w

        return this
    }

    public scale(value: number, dest?: V4): V4 {
        if (!dest) { dest = this }

        dest.x *= value
        dest.y *= value
        dest.z *= value
        dest.w *= value

        return dest
    }

    public normalize(dest?: V4): V4 {
        if (!dest) { dest = this }

        let length = this.length()

        if (length === 1) {
            return this
        }

        if (length === 0) {
            dest.x *= 0
            dest.y *= 0
            dest.z *= 0
            dest.w *= 0

            return dest
        }

        length = 1.0 / length

        dest.x *= length
        dest.y *= length
        dest.z *= length
        dest.w *= length

        return dest
    }

    public multiplyMat4(matrix: M4, dest?: V4): V4 {
        if (!dest) { dest = this }

        return matrix.multiplyVec4(this, dest)
    }
}


export class M2 {

    public static readonly identity = new M2().setIdentity()

    public static product(m1: M2, m2: M2, result: M2): M2 {
        const a11 = m1.at(0)
        const a12 = m1.at(1)
        const a21 = m1.at(2)
        const a22 = m1.at(3)

        if (result) {
            result.init([
                a11 * m2.at(0) + a12 * m2.at(2),
                a11 * m2.at(1) + a12 * m2.at(3),
                a21 * m2.at(0) + a22 * m2.at(2),
                a21 * m2.at(1) + a22 * m2.at(3),
            ])

            return result
        } else {
            return new M2([
                a11 * m2.at(0) + a12 * m2.at(2),
                a11 * m2.at(1) + a12 * m2.at(3),
                a21 * m2.at(0) + a22 * m2.at(2),
                a21 * m2.at(1) + a22 * m2.at(3),
            ])
        }
    }

    private values = new Float32Array(4)

    constructor(values?: number[]) {

        if (values !== undefined) {
            this.init(values)
        }
    }

    public at(index: number): number {
        return this.values[index]
    }

    public init(values: number[]): M2 {
        for (let i = 0; i < 4; i++) {
            this.values[i] = values[i]
        }

        return this
    }

    public reset(): void {
        for (let i = 0; i < 4; i++) {
            this.values[i] = 0
        }
    }

    public copy(dest?: M2): M2 {
        if (!dest) { dest = new M2() }

        for (let i = 0; i < 4; i++) {
            dest.values[i] = this.values[i]
        }

        return dest
    }

    public all(): number[] {
        const data: number[] = []
        for (let i = 0; i < 4; i++) {
            data[i] = this.values[i]
        }

        return data
    }

    public row(index: number): number[] {
        return [
            this.values[index * 2 + 0],
            this.values[index * 2 + 1],
        ]
    }

    public col(index: number): number[] {
        return [
            this.values[index],
            this.values[index + 2],
        ]
    }

    public equals(matrix: M2, threshold = epsilon): boolean {
        for (let i = 0; i < 4; i++) {
            if (Math.abs(this.values[i] - matrix.at(i)) > threshold) {
                return false
            }
        }

        return true
    }

    public determinant(): number {
        return this.values[0] * this.values[3] - this.values[2] * this.values[1]
    }

    public setIdentity(): M2 {
        this.values[0] = 1
        this.values[1] = 0
        this.values[2] = 0
        this.values[3] = 1

        return this
    }

    public transpose(): M2 {
        const temp = this.values[1]

        this.values[1] = this.values[2]
        this.values[2] = temp

        return this
    }

    public inverse(): M2 {
        let det = this.determinant()

        det = 1.0 / det

        const a11 = this.values[0]

        this.values[0] = det * (this.values[3])
        this.values[1] = det * (-this.values[1])
        this.values[2] = det * (-this.values[2])
        this.values[3] = det * a11

        return this
    }

    public multiply(matrix: M2): M2 {
        const a11 = this.values[0]
        const a12 = this.values[1]
        const a21 = this.values[2]
        const a22 = this.values[3]

        this.values[0] = a11 * matrix.at(0) + a12 * matrix.at(2)
        this.values[1] = a11 * matrix.at(1) + a12 * matrix.at(3)
        this.values[2] = a21 * matrix.at(0) + a22 * matrix.at(2)
        this.values[3] = a21 * matrix.at(1) + a22 * matrix.at(3)

        return this
    }

    public rotate(angle: number): M2 {
        const a11 = this.values[0]
        const a12 = this.values[1]
        const a21 = this.values[2]
        const a22 = this.values[3]

        const sin = Math.sin(angle)
        const cos = Math.cos(angle)

        this.values[0] = a11 * cos + a12 * sin
        this.values[1] = a11 * -sin + a12 * cos
        this.values[2] = a21 * cos + a22 * sin
        this.values[3] = a21 * -sin + a22 * cos

        return this
    }

    public multiplyVec2(vector: V2, result: V2): V2 {
        const x = vector.x
        const y = vector.y

        if (result) {
            result.xy = [
                x * this.values[0] + y * this.values[1],
                x * this.values[2] + y * this.values[3],
            ]

            return result
        } else {
            return new V2([
                x * this.values[0] + y * this.values[1],
                x * this.values[2] + y * this.values[3],
            ])
        }
    }

    public scale(vector: V2): M2 {
        const a11 = this.values[0]
        const a12 = this.values[1]
        const a21 = this.values[2]
        const a22 = this.values[3]

        const x = vector.x
        const y = vector.y

        this.values[0] = a11 * x
        this.values[1] = a12 * y
        this.values[2] = a21 * x
        this.values[3] = a22 * y

        return this
    }

}


export class M3 {

    public static readonly identity = new M3().setIdentity()

    public static product(m1: M3, m2: M3, result: M3): M3 {
        const a00 = m1.at(0)
        const a01 = m1.at(1)
        const a02 = m1.at(2)
        const a10 = m1.at(3)
        const a11 = m1.at(4)
        const a12 = m1.at(5)
        const a20 = m1.at(6)
        const a21 = m1.at(7)
        const a22 = m1.at(8)

        const b00 = m2.at(0)
        const b01 = m2.at(1)
        const b02 = m2.at(2)
        const b10 = m2.at(3)
        const b11 = m2.at(4)
        const b12 = m2.at(5)
        const b20 = m2.at(6)
        const b21 = m2.at(7)
        const b22 = m2.at(8)

        if (result) {
            result.init([
                b00 * a00 + b01 * a10 + b02 * a20,
                b00 * a01 + b01 * a11 + b02 * a21,
                b00 * a02 + b01 * a12 + b02 * a22,

                b10 * a00 + b11 * a10 + b12 * a20,
                b10 * a01 + b11 * a11 + b12 * a21,
                b10 * a02 + b11 * a12 + b12 * a22,

                b20 * a00 + b21 * a10 + b22 * a20,
                b20 * a01 + b21 * a11 + b22 * a21,
                b20 * a02 + b21 * a12 + b22 * a22,
            ])

            return result
        } else {
            return new M3([
                b00 * a00 + b01 * a10 + b02 * a20,
                b00 * a01 + b01 * a11 + b02 * a21,
                b00 * a02 + b01 * a12 + b02 * a22,

                b10 * a00 + b11 * a10 + b12 * a20,
                b10 * a01 + b11 * a11 + b12 * a21,
                b10 * a02 + b11 * a12 + b12 * a22,

                b20 * a00 + b21 * a10 + b22 * a20,
                b20 * a01 + b21 * a11 + b22 * a21,
                b20 * a02 + b21 * a12 + b22 * a22,
            ])
        }
    }

    private values = new Float32Array(9)

    constructor(values?: number[]) {
        if (values !== undefined) {
            this.init(values)
        }
    }

    public at(index: number): number {
        return this.values[index]
    }

    public init(values: number[]): M3 {
        for (let i = 0; i < 9; i++) {
            this.values[i] = values[i]
        }

        return this
    }

    public reset(): void {
        for (let i = 0; i < 9; i++) {
            this.values[i] = 0
        }
    }

    public copy(dest?: M3): M3 {
        if (!dest) { dest = new M3() }

        for (let i = 0; i < 9; i++) {
            dest.values[i] = this.values[i]
        }

        return dest
    }

    public all(): number[] {
        const data: number[] = []
        for (let i = 0; i < 9; i++) {
            data[i] = this.values[i]
        }

        return data
    }

    public row(index: number): number[] {
        return [
            this.values[index * 3 + 0],
            this.values[index * 3 + 1],
            this.values[index * 3 + 2],
        ]
    }

    public col(index: number): number[] {
        return [
            this.values[index],
            this.values[index + 3],
            this.values[index + 6],
        ]
    }

    public equals(matrix: M3, threshold = epsilon): boolean {
        for (let i = 0; i < 9; i++) {
            if (Math.abs(this.values[i] - matrix.at(i)) > threshold) {
                return false
            }
        }

        return true
    }

    public determinant(): number {
        const a00 = this.values[0]
        const a01 = this.values[1]
        const a02 = this.values[2]
        const a10 = this.values[3]
        const a11 = this.values[4]
        const a12 = this.values[5]
        const a20 = this.values[6]
        const a21 = this.values[7]
        const a22 = this.values[8]

        const det01 = a22 * a11 - a12 * a21
        const det11 = -a22 * a10 + a12 * a20
        const det21 = a21 * a10 - a11 * a20

        return a00 * det01 + a01 * det11 + a02 * det21
    }

    public setIdentity(): M3 {
        this.values[0] = 1
        this.values[1] = 0
        this.values[2] = 0
        this.values[3] = 0
        this.values[4] = 1
        this.values[5] = 0
        this.values[6] = 0
        this.values[7] = 0
        this.values[8] = 1

        return this
    }

    public transpose(): M3 {
        const temp01 = this.values[1]
        const temp02 = this.values[2]
        const temp12 = this.values[5]

        this.values[1] = this.values[3]
        this.values[2] = this.values[6]
        this.values[3] = temp01
        this.values[5] = this.values[7]
        this.values[6] = temp02
        this.values[7] = temp12

        return this
    }

    public inverse(): M3 {
        const a00 = this.values[0]
        const a01 = this.values[1]
        const a02 = this.values[2]
        const a10 = this.values[3]
        const a11 = this.values[4]
        const a12 = this.values[5]
        const a20 = this.values[6]
        const a21 = this.values[7]
        const a22 = this.values[8]

        const det01 = a22 * a11 - a12 * a21
        const det11 = -a22 * a10 + a12 * a20
        const det21 = a21 * a10 - a11 * a20

        let det = a00 * det01 + a01 * det11 + a02 * det21

        det = 1.0 / det

        this.values[0] = det01 * det
        this.values[1] = (-a22 * a01 + a02 * a21) * det
        this.values[2] = (a12 * a01 - a02 * a11) * det
        this.values[3] = det11 * det
        this.values[4] = (a22 * a00 - a02 * a20) * det
        this.values[5] = (-a12 * a00 + a02 * a10) * det
        this.values[6] = det21 * det
        this.values[7] = (-a21 * a00 + a01 * a20) * det
        this.values[8] = (a11 * a00 - a01 * a10) * det

        return this
    }

    public multiply(matrix: M3): M3 {
        const a00 = this.values[0]
        const a01 = this.values[1]
        const a02 = this.values[2]
        const a10 = this.values[3]
        const a11 = this.values[4]
        const a12 = this.values[5]
        const a20 = this.values[6]
        const a21 = this.values[7]
        const a22 = this.values[8]

        const b00 = matrix.at(0)
        const b01 = matrix.at(1)
        const b02 = matrix.at(2)
        const b10 = matrix.at(3)
        const b11 = matrix.at(4)
        const b12 = matrix.at(5)
        const b20 = matrix.at(6)
        const b21 = matrix.at(7)
        const b22 = matrix.at(8)

        this.values[0] = b00 * a00 + b01 * a10 + b02 * a20
        this.values[1] = b00 * a01 + b01 * a11 + b02 * a21
        this.values[2] = b00 * a02 + b01 * a12 + b02 * a22

        this.values[3] = b10 * a00 + b11 * a10 + b12 * a20
        this.values[4] = b10 * a01 + b11 * a11 + b12 * a21
        this.values[5] = b10 * a02 + b11 * a12 + b12 * a22

        this.values[6] = b20 * a00 + b21 * a10 + b22 * a20
        this.values[7] = b20 * a01 + b21 * a11 + b22 * a21
        this.values[8] = b20 * a02 + b21 * a12 + b22 * a22

        return this
    }

    public multiplyVec2(vector: V2, result: V2): V2 {
        const x = vector.x
        const y = vector.y

        if (result) {
            result.xy = [
                x * this.values[0] + y * this.values[3] + this.values[6],
                x * this.values[1] + y * this.values[4] + this.values[7],
            ]

            return result
        } else {
            return new V2([
                x * this.values[0] + y * this.values[3] + this.values[6],
                x * this.values[1] + y * this.values[4] + this.values[7],
            ])
        }
    }

    public multiplyVec3(vector: V3, result: V3): V3 {
        const x = vector.x
        const y = vector.y
        const z = vector.z

        if (result) {
            result.xyz = [
                x * this.values[0] + y * this.values[3] + z * this.values[6],
                x * this.values[1] + y * this.values[4] + z * this.values[7],
                x * this.values[2] + y * this.values[5] + z * this.values[8],
            ]

            return result
        } else {
            return new V3([
                x * this.values[0] + y * this.values[3] + z * this.values[6],
                x * this.values[1] + y * this.values[4] + z * this.values[7],
                x * this.values[2] + y * this.values[5] + z * this.values[8],
            ])
        }
    }

    public toMat4(result: M4): M4 {
        if (result) {
            result.init([
                this.values[0],
                this.values[1],
                this.values[2],
                0,

                this.values[3],
                this.values[4],
                this.values[5],
                0,

                this.values[6],
                this.values[7],
                this.values[8],
                0,

                0,
                0,
                0,
                1,
            ])

            return result
        } else {
            return new M4([
                this.values[0],
                this.values[1],
                this.values[2],
                0,

                this.values[3],
                this.values[4],
                this.values[5],
                0,

                this.values[6],
                this.values[7],
                this.values[8],
                0,

                0,
                0,
                0,
                1,
            ])
        }
    }

    public toQuat(): Quat {
        const m00 = this.values[0]
        const m01 = this.values[1]
        const m02 = this.values[2]
        const m10 = this.values[3]
        const m11 = this.values[4]
        const m12 = this.values[5]
        const m20 = this.values[6]
        const m21 = this.values[7]
        const m22 = this.values[8]

        const fourXSquaredMinus1 = m00 - m11 - m22
        const fourYSquaredMinus1 = m11 - m00 - m22
        const fourZSquaredMinus1 = m22 - m00 - m11
        const fourWSquaredMinus1 = m00 + m11 + m22

        let biggestIndex = 0

        let fourBiggestSquaredMinus1 = fourWSquaredMinus1

        if (fourXSquaredMinus1 > fourBiggestSquaredMinus1) {
            fourBiggestSquaredMinus1 = fourXSquaredMinus1
            biggestIndex = 1
        }

        if (fourYSquaredMinus1 > fourBiggestSquaredMinus1) {
            fourBiggestSquaredMinus1 = fourYSquaredMinus1
            biggestIndex = 2
        }

        if (fourZSquaredMinus1 > fourBiggestSquaredMinus1) {
            fourBiggestSquaredMinus1 = fourZSquaredMinus1
            biggestIndex = 3
        }

        const biggestVal = Math.sqrt(fourBiggestSquaredMinus1 + 1) * 0.5
        const mult = 0.25 / biggestVal

        const result = new Quat()

        switch (biggestIndex) {
            case 0:

                result.w = biggestVal
                result.x = (m12 - m21) * mult
                result.y = (m20 - m02) * mult
                result.z = (m01 - m10) * mult

                break

            case 1:

                result.w = (m12 - m21) * mult
                result.x = biggestVal
                result.y = (m01 + m10) * mult
                result.z = (m20 + m02) * mult

                break

            case 2:

                result.w = (m20 - m02) * mult
                result.x = (m01 + m10) * mult
                result.y = biggestVal
                result.z = (m12 + m21) * mult

                break

            case 3:

                result.w = (m01 - m10) * mult
                result.x = (m20 + m02) * mult
                result.y = (m12 + m21) * mult
                result.z = biggestVal

                break
        }

        return result
    }

    public rotate(angle: number, axis: V3): M3 {
        let x = axis.x
        let y = axis.y
        let z = axis.z

        let length = Math.sqrt(x * x + y * y + z * z)

        if (length !== 1) {
            length = 1 / length
            x *= length
            y *= length
            z *= length
        }

        const s = Math.sin(angle)
        const c = Math.cos(angle)

        const t = 1.0 - c

        const a00 = this.values[0]
        const a01 = this.values[1]
        const a02 = this.values[2]
        const a10 = this.values[4]
        const a11 = this.values[5]
        const a12 = this.values[6]
        const a20 = this.values[8]
        const a21 = this.values[9]
        const a22 = this.values[10]

        const b00 = x * x * t + c
        const b01 = y * x * t + z * s
        const b02 = z * x * t - y * s
        const b10 = x * y * t - z * s
        const b11 = y * y * t + c
        const b12 = z * y * t + x * s
        const b20 = x * z * t + y * s
        const b21 = y * z * t - x * s
        const b22 = z * z * t + c

        this.values[0] = a00 * b00 + a10 * b01 + a20 * b02
        this.values[1] = a01 * b00 + a11 * b01 + a21 * b02
        this.values[2] = a02 * b00 + a12 * b01 + a22 * b02

        this.values[3] = a00 * b10 + a10 * b11 + a20 * b12
        this.values[4] = a01 * b10 + a11 * b11 + a21 * b12
        this.values[5] = a02 * b10 + a12 * b11 + a22 * b12

        this.values[6] = a00 * b20 + a10 * b21 + a20 * b22
        this.values[7] = a01 * b20 + a11 * b21 + a21 * b22
        this.values[8] = a02 * b20 + a12 * b21 + a22 * b22

        return this
    }

}



export class M4 {

    public static readonly identity = new M4().setIdentity()

    public static frustum(left: number, right: number, bottom: number, top: number, near: number, far: number): M4 {
        const rl = (right - left)
        const tb = (top - bottom)
        const fn = (far - near)

        return new M4([
            (near * 2) / rl,
            0,
            0,
            0,

            0,
            (near * 2) / tb,
            0,
            0,

            (right + left) / rl,
            (top + bottom) / tb,
            -(far + near) / fn,
            -1,

            0,
            0,
            -(far * near * 2) / fn,
            0,
        ])
    }

    public static perspective(fov: number, aspect: number, near: number, far: number): M4 {
        const top = near * Math.tan(fov * Math.PI / 360.0)
        const right = top * aspect

        return M4.frustum(-right, right, -top, top, near, far)
    }

    public static orthographic(left: number, right: number, bottom: number, top: number, near: number, far: number): M4 {
        const rl = (right - left)
        const tb = (top - bottom)
        const fn = (far - near)

        return new M4([
            2 / rl,
            0,
            0,
            0,

            0,
            2 / tb,
            0,
            0,

            0,
            0,
            -2 / fn,
            0,

            -(left + right) / rl,
            -(top + bottom) / tb,
            -(far + near) / fn,
            1,
        ])
    }

    public static lookAt(position: V3, target: V3, up: V3 = V3.up): M4 {
        if (position.equals(target)) {
            return this.identity
        }

        const z = V3.difference(position, target).normalize()

        const x = V3.cross(up, z).normalize()
        const y = V3.cross(z, x).normalize()

        return new M4([
            x.x,
            y.x,
            z.x,
            0,

            x.y,
            y.y,
            z.y,
            0,

            x.z,
            y.z,
            z.z,
            0,

            -V3.dot(x, position),
            -V3.dot(y, position),
            -V3.dot(z, position),
            1,
        ])
    }

    public static product(m1: M4, m2: M4, result: M4): M4 {
        const a00 = m1.at(0)
        const a01 = m1.at(1)
        const a02 = m1.at(2)
        const a03 = m1.at(3)
        const a10 = m1.at(4)
        const a11 = m1.at(5)
        const a12 = m1.at(6)
        const a13 = m1.at(7)
        const a20 = m1.at(8)
        const a21 = m1.at(9)
        const a22 = m1.at(10)
        const a23 = m1.at(11)
        const a30 = m1.at(12)
        const a31 = m1.at(13)
        const a32 = m1.at(14)
        const a33 = m1.at(15)

        const b00 = m2.at(0)
        const b01 = m2.at(1)
        const b02 = m2.at(2)
        const b03 = m2.at(3)
        const b10 = m2.at(4)
        const b11 = m2.at(5)
        const b12 = m2.at(6)
        const b13 = m2.at(7)
        const b20 = m2.at(8)
        const b21 = m2.at(9)
        const b22 = m2.at(10)
        const b23 = m2.at(11)
        const b30 = m2.at(12)
        const b31 = m2.at(13)
        const b32 = m2.at(14)
        const b33 = m2.at(15)

        if (result) {
            result.init([
                b00 * a00 + b01 * a10 + b02 * a20 + b03 * a30,
                b00 * a01 + b01 * a11 + b02 * a21 + b03 * a31,
                b00 * a02 + b01 * a12 + b02 * a22 + b03 * a32,
                b00 * a03 + b01 * a13 + b02 * a23 + b03 * a33,

                b10 * a00 + b11 * a10 + b12 * a20 + b13 * a30,
                b10 * a01 + b11 * a11 + b12 * a21 + b13 * a31,
                b10 * a02 + b11 * a12 + b12 * a22 + b13 * a32,
                b10 * a03 + b11 * a13 + b12 * a23 + b13 * a33,

                b20 * a00 + b21 * a10 + b22 * a20 + b23 * a30,
                b20 * a01 + b21 * a11 + b22 * a21 + b23 * a31,
                b20 * a02 + b21 * a12 + b22 * a22 + b23 * a32,
                b20 * a03 + b21 * a13 + b22 * a23 + b23 * a33,

                b30 * a00 + b31 * a10 + b32 * a20 + b33 * a30,
                b30 * a01 + b31 * a11 + b32 * a21 + b33 * a31,
                b30 * a02 + b31 * a12 + b32 * a22 + b33 * a32,
                b30 * a03 + b31 * a13 + b32 * a23 + b33 * a33,
            ])

            return result
        } else {
            return new M4([
                b00 * a00 + b01 * a10 + b02 * a20 + b03 * a30,
                b00 * a01 + b01 * a11 + b02 * a21 + b03 * a31,
                b00 * a02 + b01 * a12 + b02 * a22 + b03 * a32,
                b00 * a03 + b01 * a13 + b02 * a23 + b03 * a33,

                b10 * a00 + b11 * a10 + b12 * a20 + b13 * a30,
                b10 * a01 + b11 * a11 + b12 * a21 + b13 * a31,
                b10 * a02 + b11 * a12 + b12 * a22 + b13 * a32,
                b10 * a03 + b11 * a13 + b12 * a23 + b13 * a33,

                b20 * a00 + b21 * a10 + b22 * a20 + b23 * a30,
                b20 * a01 + b21 * a11 + b22 * a21 + b23 * a31,
                b20 * a02 + b21 * a12 + b22 * a22 + b23 * a32,
                b20 * a03 + b21 * a13 + b22 * a23 + b23 * a33,

                b30 * a00 + b31 * a10 + b32 * a20 + b33 * a30,
                b30 * a01 + b31 * a11 + b32 * a21 + b33 * a31,
                b30 * a02 + b31 * a12 + b32 * a22 + b33 * a32,
                b30 * a03 + b31 * a13 + b32 * a23 + b33 * a33,
            ])
        }
    }

    private values = new Float32Array(16)

    constructor(values?: number[]) {
        if (values !== undefined) {
            this.init(values)
        }
    }

    public at(index: number): number {
        return this.values[index]
    }

    public init(values: number[]): M4 {
        for (let i = 0; i < 16; i++) {
            this.values[i] = values[i]
        }

        return this
    }

    public reset(): void {
        for (let i = 0; i < 16; i++) {
            this.values[i] = 0
        }
    }

    public copy(dest?: M4): M4 {
        if (!dest) { dest = new M4() }

        for (let i = 0; i < 16; i++) {
            dest.values[i] = this.values[i]
        }

        return dest
    }

    public all(): number[] {
        const data: number[] = []
        for (let i = 0; i < 16; i++) {
            data[i] = this.values[i]
        }

        return data
    }

    public row(index: number): number[] {
        return [
            this.values[index * 4 + 0],
            this.values[index * 4 + 1],
            this.values[index * 4 + 2],
            this.values[index * 4 + 3],
        ]
    }

    public col(index: number): number[] {
        return [
            this.values[index],
            this.values[index + 4],
            this.values[index + 8],
            this.values[index + 12],
        ]
    }

    public equals(matrix: M4, threshold = epsilon): boolean {
        for (let i = 0; i < 16; i++) {
            if (Math.abs(this.values[i] - matrix.at(i)) > threshold) {
                return false
            }
        }

        return true
    }

    public determinant(): number {
        const a00 = this.values[0]
        const a01 = this.values[1]
        const a02 = this.values[2]
        const a03 = this.values[3]
        const a10 = this.values[4]
        const a11 = this.values[5]
        const a12 = this.values[6]
        const a13 = this.values[7]
        const a20 = this.values[8]
        const a21 = this.values[9]
        const a22 = this.values[10]
        const a23 = this.values[11]
        const a30 = this.values[12]
        const a31 = this.values[13]
        const a32 = this.values[14]
        const a33 = this.values[15]

        const det00 = a00 * a11 - a01 * a10
        const det01 = a00 * a12 - a02 * a10
        const det02 = a00 * a13 - a03 * a10
        const det03 = a01 * a12 - a02 * a11
        const det04 = a01 * a13 - a03 * a11
        const det05 = a02 * a13 - a03 * a12
        const det06 = a20 * a31 - a21 * a30
        const det07 = a20 * a32 - a22 * a30
        const det08 = a20 * a33 - a23 * a30
        const det09 = a21 * a32 - a22 * a31
        const det10 = a21 * a33 - a23 * a31
        const det11 = a22 * a33 - a23 * a32

        return (det00 * det11 - det01 * det10 + det02 * det09 + det03 * det08 - det04 * det07 + det05 * det06)
    }

    public setIdentity(): M4 {
        this.values[0] = 1
        this.values[1] = 0
        this.values[2] = 0
        this.values[3] = 0
        this.values[4] = 0
        this.values[5] = 1
        this.values[6] = 0
        this.values[7] = 0
        this.values[8] = 0
        this.values[9] = 0
        this.values[10] = 1
        this.values[11] = 0
        this.values[12] = 0
        this.values[13] = 0
        this.values[14] = 0
        this.values[15] = 1

        return this
    }

    public transpose(): M4 {
        const temp01 = this.values[1]
        const temp02 = this.values[2]
        const temp03 = this.values[3]
        const temp12 = this.values[6]
        const temp13 = this.values[7]
        const temp23 = this.values[11]

        this.values[1] = this.values[4]
        this.values[2] = this.values[8]
        this.values[3] = this.values[12]
        this.values[4] = temp01
        this.values[6] = this.values[9]
        this.values[7] = this.values[13]
        this.values[8] = temp02
        this.values[9] = temp12
        this.values[11] = this.values[14]
        this.values[12] = temp03
        this.values[13] = temp13
        this.values[14] = temp23

        return this
    }

    public inverse(): M4 {
        const a00 = this.values[0]
        const a01 = this.values[1]
        const a02 = this.values[2]
        const a03 = this.values[3]
        const a10 = this.values[4]
        const a11 = this.values[5]
        const a12 = this.values[6]
        const a13 = this.values[7]
        const a20 = this.values[8]
        const a21 = this.values[9]
        const a22 = this.values[10]
        const a23 = this.values[11]
        const a30 = this.values[12]
        const a31 = this.values[13]
        const a32 = this.values[14]
        const a33 = this.values[15]

        const det00 = a00 * a11 - a01 * a10
        const det01 = a00 * a12 - a02 * a10
        const det02 = a00 * a13 - a03 * a10
        const det03 = a01 * a12 - a02 * a11
        const det04 = a01 * a13 - a03 * a11
        const det05 = a02 * a13 - a03 * a12
        const det06 = a20 * a31 - a21 * a30
        const det07 = a20 * a32 - a22 * a30
        const det08 = a20 * a33 - a23 * a30
        const det09 = a21 * a32 - a22 * a31
        const det10 = a21 * a33 - a23 * a31
        const det11 = a22 * a33 - a23 * a32

        let det = (det00 * det11 - det01 * det10 + det02 * det09 + det03 * det08 - det04 * det07 + det05 * det06)

        det = 1.0 / det

        this.values[0] = (a11 * det11 - a12 * det10 + a13 * det09) * det
        this.values[1] = (-a01 * det11 + a02 * det10 - a03 * det09) * det
        this.values[2] = (a31 * det05 - a32 * det04 + a33 * det03) * det
        this.values[3] = (-a21 * det05 + a22 * det04 - a23 * det03) * det
        this.values[4] = (-a10 * det11 + a12 * det08 - a13 * det07) * det
        this.values[5] = (a00 * det11 - a02 * det08 + a03 * det07) * det
        this.values[6] = (-a30 * det05 + a32 * det02 - a33 * det01) * det
        this.values[7] = (a20 * det05 - a22 * det02 + a23 * det01) * det
        this.values[8] = (a10 * det10 - a11 * det08 + a13 * det06) * det
        this.values[9] = (-a00 * det10 + a01 * det08 - a03 * det06) * det
        this.values[10] = (a30 * det04 - a31 * det02 + a33 * det00) * det
        this.values[11] = (-a20 * det04 + a21 * det02 - a23 * det00) * det
        this.values[12] = (-a10 * det09 + a11 * det07 - a12 * det06) * det
        this.values[13] = (a00 * det09 - a01 * det07 + a02 * det06) * det
        this.values[14] = (-a30 * det03 + a31 * det01 - a32 * det00) * det
        this.values[15] = (a20 * det03 - a21 * det01 + a22 * det00) * det

        return this
    }

    public multiply(matrix: M4): M4 {
        const a00 = this.values[0]
        const a01 = this.values[1]
        const a02 = this.values[2]
        const a03 = this.values[3]
        const a10 = this.values[4]
        const a11 = this.values[5]
        const a12 = this.values[6]
        const a13 = this.values[7]
        const a20 = this.values[8]
        const a21 = this.values[9]
        const a22 = this.values[10]
        const a23 = this.values[11]
        const a30 = this.values[12]
        const a31 = this.values[13]
        const a32 = this.values[14]
        const a33 = this.values[15]

        let b0 = matrix.at(0)
        let b1 = matrix.at(1)
        let b2 = matrix.at(2)
        let b3 = matrix.at(3)

        this.values[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30
        this.values[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31
        this.values[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32
        this.values[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33

        b0 = matrix.at(4)
        b1 = matrix.at(5)
        b2 = matrix.at(6)
        b3 = matrix.at(7)

        this.values[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30
        this.values[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31
        this.values[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32
        this.values[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33

        b0 = matrix.at(8)
        b1 = matrix.at(9)
        b2 = matrix.at(10)
        b3 = matrix.at(11)

        this.values[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30
        this.values[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31
        this.values[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32
        this.values[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33

        b0 = matrix.at(12)
        b1 = matrix.at(13)
        b2 = matrix.at(14)
        b3 = matrix.at(15)

        this.values[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30
        this.values[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31
        this.values[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32
        this.values[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33

        return this
    }

    public multiplyVec3(vector: V3): V3 {
        const x = vector.x
        const y = vector.y
        const z = vector.z

        return new V3([
            this.values[0] * x + this.values[4] * y + this.values[8] * z + this.values[12],
            this.values[1] * x + this.values[5] * y + this.values[9] * z + this.values[13],
            this.values[2] * x + this.values[6] * y + this.values[10] * z + this.values[14],
        ])
    }

    public multiplyVec4(vector: V4, dest?: V4): V4 {
        if (!dest) { dest = new V4() }

        const x = vector.x
        const y = vector.y
        const z = vector.z
        const w = vector.w

        dest.x = this.values[0] * x + this.values[4] * y + this.values[8] * z + this.values[12] * w
        dest.y = this.values[1] * x + this.values[5] * y + this.values[9] * z + this.values[13] * w
        dest.z = this.values[2] * x + this.values[6] * y + this.values[10] * z + this.values[14] * w
        dest.w = this.values[3] * x + this.values[7] * y + this.values[11] * z + this.values[15] * w

        return dest
    }

    public toMat3(): M3 {
        return new M3([
            this.values[0],
            this.values[1],
            this.values[2],
            this.values[4],
            this.values[5],
            this.values[6],
            this.values[8],
            this.values[9],
            this.values[10],
        ])
    }

    public toInverseMat3(): M3 {
        const a00 = this.values[0]
        const a01 = this.values[1]
        const a02 = this.values[2]
        const a10 = this.values[4]
        const a11 = this.values[5]
        const a12 = this.values[6]
        const a20 = this.values[8]
        const a21 = this.values[9]
        const a22 = this.values[10]

        const det01 = a22 * a11 - a12 * a21
        const det11 = -a22 * a10 + a12 * a20
        const det21 = a21 * a10 - a11 * a20

        let det = a00 * det01 + a01 * det11 + a02 * det21

        det = 1.0 / det

        return new M3([
            det01 * det,
            (-a22 * a01 + a02 * a21) * det,
            (a12 * a01 - a02 * a11) * det,
            det11 * det,
            (a22 * a00 - a02 * a20) * det,
            (-a12 * a00 + a02 * a10) * det,
            det21 * det,
            (-a21 * a00 + a01 * a20) * det,
            (a11 * a00 - a01 * a10) * det,
        ])
    }

    public translate(vector: V3): M4 {
        const x = vector.x
        const y = vector.y
        const z = vector.z

        this.values[12] += this.values[0] * x + this.values[4] * y + this.values[8] * z
        this.values[13] += this.values[1] * x + this.values[5] * y + this.values[9] * z
        this.values[14] += this.values[2] * x + this.values[6] * y + this.values[10] * z
        this.values[15] += this.values[3] * x + this.values[7] * y + this.values[11] * z

        return this
    }

    public scale(vector: V3): M4 {
        const x = vector.x
        const y = vector.y
        const z = vector.z

        this.values[0] *= x
        this.values[1] *= x
        this.values[2] *= x
        this.values[3] *= x

        this.values[4] *= y
        this.values[5] *= y
        this.values[6] *= y
        this.values[7] *= y

        this.values[8] *= z
        this.values[9] *= z
        this.values[10] *= z
        this.values[11] *= z

        return this
    }

    public rotate(angle: number, axis: V3): M4 {
        let x = axis.x
        let y = axis.y
        let z = axis.z

        let length = Math.sqrt(x * x + y * y + z * z)

        if (length !== 1) {
            length = 1 / length
            x *= length
            y *= length
            z *= length
        }

        const s = Math.sin(angle)
        const c = Math.cos(angle)

        const t = 1.0 - c

        const a00 = this.values[0]
        const a01 = this.values[1]
        const a02 = this.values[2]
        const a03 = this.values[3]

        const a10 = this.values[4]
        const a11 = this.values[5]
        const a12 = this.values[6]
        const a13 = this.values[7]

        const a20 = this.values[8]
        const a21 = this.values[9]
        const a22 = this.values[10]
        const a23 = this.values[11]

        const b00 = x * x * t + c
        const b01 = y * x * t + z * s
        const b02 = z * x * t - y * s

        const b10 = x * y * t - z * s
        const b11 = y * y * t + c
        const b12 = z * y * t + x * s

        const b20 = x * z * t + y * s
        const b21 = y * z * t - x * s
        const b22 = z * z * t + c

        this.values[0] = a00 * b00 + a10 * b01 + a20 * b02
        this.values[1] = a01 * b00 + a11 * b01 + a21 * b02
        this.values[2] = a02 * b00 + a12 * b01 + a22 * b02
        this.values[3] = a03 * b00 + a13 * b01 + a23 * b02

        this.values[4] = a00 * b10 + a10 * b11 + a20 * b12
        this.values[5] = a01 * b10 + a11 * b11 + a21 * b12
        this.values[6] = a02 * b10 + a12 * b11 + a22 * b12
        this.values[7] = a03 * b10 + a13 * b11 + a23 * b12

        this.values[8] = a00 * b20 + a10 * b21 + a20 * b22
        this.values[9] = a01 * b20 + a11 * b21 + a21 * b22
        this.values[10] = a02 * b20 + a12 * b21 + a22 * b22
        this.values[11] = a03 * b20 + a13 * b21 + a23 * b22

        return this
    }

}



export class Quat {

    get x(): number {
        return this.values[0]
    }

    get y(): number {
        return this.values[1]
    }

    get z(): number {
        return this.values[2]
    }

    get w(): number {
        return this.values[3]
    }

    get xy(): [number, number] {
        return [
            this.values[0],
            this.values[1],
        ]
    }

    get xyz(): [number, number, number] {
        return [
            this.values[0],
            this.values[1],
            this.values[2],
        ]
    }

    get xyzw(): [number, number, number, number] {
        return [
            this.values[0],
            this.values[1],
            this.values[2],
            this.values[3],
        ]
    }

    set x(value: number) {
        this.values[0] = value
    }

    set y(value: number) {
        this.values[1] = value
    }

    set z(value: number) {
        this.values[2] = value
    }

    set w(value: number) {
        this.values[3] = value
    }

    set xy(values: [number, number]) {
        this.values[0] = values[0]
        this.values[1] = values[1]
    }

    set xyz(values: [number, number, number]) {
        this.values[0] = values[0]
        this.values[1] = values[1]
        this.values[2] = values[2]
    }

    set xyzw(values: [number, number, number, number]) {
        this.values[0] = values[0]
        this.values[1] = values[1]
        this.values[2] = values[2]
        this.values[3] = values[3]
    }

    public static readonly identity = new Quat().setIdentity()

    public static readonly zero = new Quat([0, 0, 0, 1])

    public static dot(q1: Quat, q2: Quat): number {
        return q1.x * q2.x + q1.y * q2.y + q1.z * q2.z + q1.w * q2.w
    }

    public static sum(q1: Quat, q2: Quat, dest?: Quat): Quat {
        if (!dest) { dest = new Quat() }

        dest.x = q1.x + q2.x
        dest.y = q1.y + q2.y
        dest.z = q1.z + q2.z
        dest.w = q1.w + q2.w

        return dest
    }

    public static product(q1: Quat, q2: Quat, dest?: Quat): Quat {
        if (!dest) { dest = new Quat() }

        const q1x = q1.x
        const q1y = q1.y
        const q1z = q1.z
        const q1w = q1.w

        const q2x = q2.x
        const q2y = q2.y
        const q2z = q2.z
        const q2w = q2.w

        dest.x = q1x * q2w + q1w * q2x + q1y * q2z - q1z * q2y
        dest.y = q1y * q2w + q1w * q2y + q1z * q2x - q1x * q2z
        dest.z = q1z * q2w + q1w * q2z + q1x * q2y - q1y * q2x
        dest.w = q1w * q2w - q1x * q2x - q1y * q2y - q1z * q2z

        return dest
    }

    public static cross(q1: Quat, q2: Quat, dest?: Quat): Quat {
        if (!dest) { dest = new Quat() }

        const q1x = q1.x
        const q1y = q1.y
        const q1z = q1.z
        const q1w = q1.w

        const q2x = q2.x
        const q2y = q2.y
        const q2z = q2.z
        const q2w = q2.w

        dest.x = q1w * q2z + q1z * q2w + q1x * q2y - q1y * q2x
        dest.y = q1w * q2w - q1x * q2x - q1y * q2y - q1z * q2z
        dest.z = q1w * q2x + q1x * q2w + q1y * q2z - q1z * q2y
        dest.w = q1w * q2y + q1y * q2w + q1z * q2x - q1x * q2z

        return dest
    }

    public static shortMix(q1: Quat, q2: Quat, time: number, dest?: Quat): Quat {
        if (!dest) { dest = new Quat() }

        if (time <= 0.0) {
            dest.xyzw = q1.xyzw

            return dest
        } else if (time >= 1.0) {
            dest.xyzw = q2.xyzw

            return dest
        }

        let cos = Quat.dot(q1, q2)
        const q2a = q2.copy()

        if (cos < 0.0) {
            q2a.inverse()
            cos = -cos
        }

        let k0: number
        let k1: number

        if (cos > 0.9999) {
            k0 = 1 - time
            k1 = 0 + time
        } else {
            const sin: number = Math.sqrt(1 - cos * cos)
            const angle: number = Math.atan2(sin, cos)

            const oneOverSin: number = 1 / sin

            k0 = Math.sin((1 - time) * angle) * oneOverSin
            k1 = Math.sin((0 + time) * angle) * oneOverSin
        }

        dest.x = k0 * q1.x + k1 * q2a.x
        dest.y = k0 * q1.y + k1 * q2a.y
        dest.z = k0 * q1.z + k1 * q2a.z
        dest.w = k0 * q1.w + k1 * q2a.w

        return dest
    }

    public static mix(q1: Quat, q2: Quat, time: number, dest?: Quat): Quat {
        if (!dest) { dest = new Quat() }

        const cosHalfTheta = q1.x * q2.x + q1.y * q2.y + q1.z * q2.z + q1.w * q2.w

        if (Math.abs(cosHalfTheta) >= 1.0) {
            dest.xyzw = q1.xyzw

            return dest
        }

        const halfTheta = Math.acos(cosHalfTheta)
        const sinHalfTheta = Math.sqrt(1.0 - cosHalfTheta * cosHalfTheta)

        if (Math.abs(sinHalfTheta) < 0.001) {
            dest.x = q1.x * 0.5 + q2.x * 0.5
            dest.y = q1.y * 0.5 + q2.y * 0.5
            dest.z = q1.z * 0.5 + q2.z * 0.5
            dest.w = q1.w * 0.5 + q2.w * 0.5

            return dest
        }

        const ratioA = Math.sin((1 - time) * halfTheta) / sinHalfTheta
        const ratioB = Math.sin(time * halfTheta) / sinHalfTheta

        dest.x = q1.x * ratioA + q2.x * ratioB
        dest.y = q1.y * ratioA + q2.y * ratioB
        dest.z = q1.z * ratioA + q2.z * ratioB
        dest.w = q1.w * ratioA + q2.w * ratioB

        return dest
    }

    public static fromAxisAngle(axis: V3, angle: number, dest?: Quat): Quat {
        if (!dest) { dest = new Quat() }

        angle *= 0.5
        const sin = Math.sin(angle)

        dest.x = axis.x * sin
        dest.y = axis.y * sin
        dest.z = axis.z * sin
        dest.w = Math.cos(angle)

        return dest
    }

    private values = new Float32Array(4)

    constructor(values?: [number, number, number, number]) {
        if (values !== undefined) {
            this.xyzw = values
        }
    }

    public at(index: number): number {
        return this.values[index]
    }

    public reset(): void {
        for (let i = 0; i < 4; i++) {
            this.values[i] = 0
        }
    }

    public copy(dest?: Quat): Quat {
        if (!dest) { dest = new Quat() }

        for (let i = 0; i < 4; i++) {
            dest.values[i] = this.values[i]
        }

        return dest
    }

    public roll(): number {
        const x = this.x
        const y = this.y
        const z = this.z
        const w = this.w

        return Math.atan2(2.0 * (x * y + w * z), w * w + x * x - y * y - z * z)
    }

    public pitch(): number {
        const x = this.x
        const y = this.y
        const z = this.z
        const w = this.w

        return Math.atan2(2.0 * (y * z + w * x), w * w - x * x - y * y + z * z)
    }

    public yaw(): number {
        return Math.asin(2.0 * (this.x * this.z - this.w * this.y))
    }

    public equals(vector: Quat, threshold = epsilon): boolean {
        for (let i = 0; i < 4; i++) {
            if (Math.abs(this.values[i] - vector.at(i)) > threshold) {
                return false
            }
        }

        return true
    }

    public setIdentity(): Quat {
        this.x = 0
        this.y = 0
        this.z = 0
        this.w = 1

        return this
    }

    public calculateW(): Quat {
        const x = this.x
        const y = this.y
        const z = this.z

        this.w = -(Math.sqrt(Math.abs(1.0 - x * x - y * y - z * z)))

        return this
    }

    public inverse(): Quat {
        const dot = Quat.dot(this, this)

        if (!dot) {
            this.xyzw = [0, 0, 0, 0]

            return this
        }

        const invDot = dot ? 1.0 / dot : 0

        this.x *= -invDot
        this.y *= -invDot
        this.z *= -invDot
        this.w *= invDot

        return this
    }

    public conjugate(): Quat {
        this.values[0] *= -1
        this.values[1] *= -1
        this.values[2] *= -1

        return this
    }

    public length(): number {
        const x = this.x
        const y = this.y
        const z = this.z
        const w = this.w

        return Math.sqrt(x * x + y * y + z * z + w * w)
    }

    public normalize(dest?: Quat): Quat {
        if (!dest) { dest = this }

        const x = this.x
        const y = this.y
        const z = this.z
        const w = this.w

        let length = Math.sqrt(x * x + y * y + z * z + w * w)

        if (!length) {
            dest.x = 0
            dest.y = 0
            dest.z = 0
            dest.w = 0

            return dest
        }

        length = 1 / length

        dest.x = x * length
        dest.y = y * length
        dest.z = z * length
        dest.w = w * length

        return dest
    }

    public add(other: Quat): Quat {
        for (let i = 0; i < 4; i++) {
            this.values[i] += other.at(i)
        }

        return this
    }

    public multiply(other: Quat): Quat {
        const q1x = this.values[0]
        const q1y = this.values[1]
        const q1z = this.values[2]
        const q1w = this.values[3]

        const q2x = other.x
        const q2y = other.y
        const q2z = other.z
        const q2w = other.w

        this.x = q1x * q2w + q1w * q2x + q1y * q2z - q1z * q2y
        this.y = q1y * q2w + q1w * q2y + q1z * q2x - q1x * q2z
        this.z = q1z * q2w + q1w * q2z + q1x * q2y - q1y * q2x
        this.w = q1w * q2w - q1x * q2x - q1y * q2y - q1z * q2z

        return this
    }

    public multiplyVec3(vector: V3, dest?: V3): V3 {
        if (!dest) { dest = new V3() }

        const x = vector.x
        const y = vector.y
        const z = vector.z

        const qx = this.x
        const qy = this.y
        const qz = this.z
        const qw = this.w

        const ix = qw * x + qy * z - qz * y
        const iy = qw * y + qz * x - qx * z
        const iz = qw * z + qx * y - qy * x
        const iw = -qx * x - qy * y - qz * z

        dest.x = ix * qw + iw * -qx + iy * -qz - iz * -qy
        dest.y = iy * qw + iw * -qy + iz * -qx - ix * -qz
        dest.z = iz * qw + iw * -qz + ix * -qy - iy * -qx

        return dest
    }

    public toMat3(dest?: M3): M3 {
        if (!dest) { dest = new M3() }

        const x = this.x
        const y = this.y
        const z = this.z
        const w = this.w

        const x2 = x + x
        const y2 = y + y
        const z2 = z + z

        const xx = x * x2
        const xy = x * y2
        const xz = x * z2
        const yy = y * y2
        const yz = y * z2
        const zz = z * z2
        const wx = w * x2
        const wy = w * y2
        const wz = w * z2

        dest.init([
            1 - (yy + zz),
            xy + wz,
            xz - wy,

            xy - wz,
            1 - (xx + zz),
            yz + wx,

            xz + wy,
            yz - wx,
            1 - (xx + yy),
        ])

        return dest
    }

    public toMat4(dest?: M4): M4 {
        if (!dest) { dest = new M4() }

        const x = this.x
        const y = this.y
        const z = this.z
        const w = this.w

        const x2 = x + x
        const y2 = y + y
        const z2 = z + z

        const xx = x * x2
        const xy = x * y2
        const xz = x * z2
        const yy = y * y2
        const yz = y * z2
        const zz = z * z2
        const wx = w * x2
        const wy = w * y2
        const wz = w * z2

        dest.init([
            1 - (yy + zz),
            xy + wz,
            xz - wy,
            0,

            xy - wz,
            1 - (xx + zz),
            yz + wx,
            0,

            xz + wy,
            yz - wx,
            1 - (xx + yy),
            0,

            0,
            0,
            0,
            1,
        ])

        return dest
    }

}
