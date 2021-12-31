import { DOM, DOMAttribute } from '../src/DOM'
import { JSDOM } from 'jsdom'


let result = false;


describe("test observable functions", () => {
    it("tries an observable that doesn't exist", function() {
        DOM.notifyObservers('test')
        expect(result).toBe(false)
    });

    it("sets an observable, and tries again", function() {
        DOM.addObserver('test',()=>{result=true})
        DOM.notifyObservers('test')
        expect(result).toBe(true)
    });

})


describe("attributes of stuff like buttons", () => {
    let a = DOM.defaultAttribute([],{'key':'style','value':'color:blue;'})
    it("adds default attributes", function() {
        expect(a.length).toEqual(1)
        expect(a[0].key).toEqual('style')
        expect(a[0].value).toEqual('color:blue;')
    });
    it("adds a different attributes", function() {
        DOM.defaultAttribute(a,{'key':'id','value':'123'})
        expect(a.length).toEqual(2)
        expect(a[1].key).toEqual('id')
        expect(a[1].value).toEqual('123')
    });
    it("appends a style object", function() {
        DOM.defaultAttribute(a,{'key':'style','value':'font:comicMS;'})
        expect(a.length).toEqual(2)
        expect(a[0].key).toEqual('style')
        expect(a[0].value).toEqual('color:blue;font:comicMS;')
    });


})



// test(‘should throw an error if called without an arg’, () => {
//     expect(calculateSquare).toThrow(‘You must provide a number’);
//   }

