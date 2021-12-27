import { DOM } from '../src/DOM'
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
