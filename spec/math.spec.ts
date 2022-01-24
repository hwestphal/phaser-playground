import { V2, V3, dot, plus, minus, cross,scalarmult,normalize,normLength } from '../src/math'

describe("dot, plus, minus", () => {
    it("dot examples", function() {

        let a = [3, 4] as V2
        let b = [5, 6] as V2
        // 3*5 + 4*6 = 15+24 = 39
        expect(dot(a, b)).toEqual(39)

        let c = [3, 4, 1] as V3
        let d = [5, 6, 2] as V3
        // 3*5 + 4*6 + 1*2 = 15+24 +2 = 41
        expect(dot(c, d)).toEqual(41)

    })

    it("plus and minus examples", function() {
        let a = [3, 4] as V2
        let b = [5, 6] as V2
        expect(plus(a, b)).toEqual([8, 10])
        expect(minus(a, b)).toEqual([-2, -2])

        let c = [5, 6, 2] as V3
        let d = [3, 4, 1] as V3
        expect(plus(c, d)).toEqual([8, 10, 3])
        expect(minus(c, d)).toEqual([2, 2, 1])

    })

    it("cross product", function() {
        let a = [2, 3, 4] as V3
        let b = [5, 6, 7] as V3
        // cx = aybz − azby = 3×7 − 4×6 = −3
        // cy = azbx − axbz = 4×5 − 2×7 = 6
        // cz = axby − aybx = 2×6 − 3×5 = −3
        expect(cross(a, b)).toEqual([-3, 6, -3])

    })

    it("scalar multiply", function() {
        let a = [2, 3] as V2
        let b = [5, 6, 7] as V3
        expect(scalarmult(a, 2)).toEqual([4, 6])
        expect(scalarmult(b, 2)).toEqual([10, 12,14])

    })

    it("normlength", function() {
        let b = [4, 5, 6] as V3
        expect(normLength(b)).toEqual(Math.sqrt(16+25+36))
    })


    it("normalize", function() {
        let a = [4, 5, 6] as V3
        let len = normLength(a)
        // console.log(a,len,normalize(a))

        let b = normalize(a)
        expect(b[0]).toBeCloseTo(a[0]/len)
        expect(b[1]).toBeCloseTo(a[1]/len)
        expect(b[2]).toBeCloseTo(a[2]/len)
    })


})