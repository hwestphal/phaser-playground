// import { AsciiMath } from '../src/ASCIIMathML'
 import { JSDOM } from 'jsdom'




describe("test whether JSDOM is working", () => {
    it("create a document and read a part back", function() {
        const dom = new JSDOM(`<!DOCTYPE html><body><p id="main">My First JSDOM!</p></body>`);
        expect(dom.window.document.getElementById("main").textContent).toEqual("My First JSDOM!")
    });

    it('create a div element', () => {
        const element = document.createElement('div');
        expect(element).not.toBeNull();
    });

})


// let aMath = new AsciiMath()

// describe("low-level AsciiMath functions", function() {
//     it("do nothing", function() {
//         let a = aMath.parseMath('[a]', false)
//         // console.log(a)
//         expect(true).toBe(true)
//     });
// })

// describe("setStylesheet", function() {
//     it("checks whether AMMLcustomeStyleSheet is set", function() {
//         let a = aMath.setStylesheet("#test \{font-size:4.0\}")
//         // console.log(a)
//         expect(true).toBe(true)
//     });
// })
