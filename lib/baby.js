System.register("frontend/utilities", ["babylonjs"], function (exports_1, context_1) {
    "use strict";
    var babylonjs_1, colors, Uuid;
    var __moduleName = context_1 && context_1.id;
    function HTMLColor(colorName) {
        console.assert(colors.has('white'));
        const x = colors.get('white');
        console.assert(x == '#ffffff', `White got '${x}'`);
        // case insensitive by converting colorName to lowercase
        const lcColorName = colorName.toLowerCase();
        console.assert(colors.has(lcColorName), `could not find any color called '${colorName}'`);
        let c = babylonjs_1.Color3.FromHexString('#FFFF00'); // default is Yellow
        if (colors.has(lcColorName)) {
            c = babylonjs_1.Color3.FromHexString(colors.get(lcColorName));
        }
        return c;
    }
    exports_1("HTMLColor", HTMLColor);
    function randomColorName() {
        let aColors = Array.from(colors); // convert to an array
        let cPair = aColors[Math.floor(Math.random() * aColors.length)];
        return (cPair[0]); // the first element is the name
    }
    exports_1("randomColorName", randomColorName);
    // from https://stackoverflow.com/questions/118241/calculate-text-width-with-javascript
    /** estimate the number of pixels in a string */
    function measureText(str, fontSize = 18) {
        const widths = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.2796875, 0.2765625, 0.3546875, 0.5546875, 0.5546875, 0.8890625, 0.665625, 0.190625, 0.3328125, 0.3328125, 0.3890625, 0.5828125, 0.2765625, 0.3328125, 0.2765625, 0.3015625, 0.5546875, 0.5546875, 0.5546875, 0.5546875, 0.5546875, 0.5546875, 0.5546875, 0.5546875, 0.5546875, 0.5546875, 0.2765625, 0.2765625, 0.584375, 0.5828125, 0.584375, 0.5546875, 1.0140625, 0.665625, 0.665625, 0.721875, 0.721875, 0.665625, 0.609375, 0.7765625, 0.721875, 0.2765625, 0.5, 0.665625, 0.5546875, 0.8328125, 0.721875, 0.7765625, 0.665625, 0.7765625, 0.721875, 0.665625, 0.609375, 0.721875, 0.665625, 0.94375, 0.665625, 0.665625, 0.609375, 0.2765625, 0.3546875, 0.2765625, 0.4765625, 0.5546875, 0.3328125, 0.5546875, 0.5546875, 0.5, 0.5546875, 0.5546875, 0.2765625, 0.5546875, 0.5546875, 0.221875, 0.240625, 0.5, 0.221875, 0.8328125, 0.5546875, 0.5546875, 0.5546875, 0.5546875, 0.3328125, 0.5, 0.2765625, 0.5546875, 0.5, 0.721875, 0.5, 0.5, 0.5, 0.3546875, 0.259375, 0.353125, 0.5890625];
        const avg = 0.5279276315789471;
        return str
            .split('')
            .map(c => c.charCodeAt(0) < widths.length ? widths[c.charCodeAt(0)] : avg)
            .reduce((cur, acc) => acc + cur) * fontSize;
    }
    exports_1("measureText", measureText);
    return {
        setters: [
            function (babylonjs_1_1) {
                babylonjs_1 = babylonjs_1_1;
            }
        ],
        execute: function () {
            colors = new Map([
                ['aliceblue', '#f0f8ff'],
                ['antiquewhite', '#faebd7'],
                ['aqua', '#00ffff'],
                ['aquamarine', '#7fffd4'],
                ['azure', '#f0ffff'],
                ['beige', '#f5f5dc'],
                ['bisque', '#ffe4c4'],
                ['black', '#000000'],
                ['blanchedalmond', '#ffebcd'],
                ['blue', '#0000ff'],
                ['blueviolet', '#8a2be2'],
                ['brown', '#a52a2a'],
                ['burlywood', '#deb887'],
                ['cadetblue', '#5f9ea0'],
                ['chartreuse', '#7fff00'],
                ['chocolate', '#d2691e'],
                ['coral', '#ff7f50'],
                ['cornflowerblue', '#6495ed'],
                ['cornsilk', '#fff8dc'],
                ['crimson', '#dc143c'],
                ['cyan', '#00ffff'],
                ['darkblue', '#00008b'],
                ['darkcyan', '#008b8b'],
                ['darkgoldenrod', '#b8860b'],
                ['darkgray', '#a9a9a9'],
                ['darkgrey', '#a9a9a9'],
                ['darkgreen', '#006400'],
                ['darkkhaki', '#bdb76b'],
                ['darkmagenta', '#8b008b'],
                ['darkolivegreen', '#556b2f'],
                ['darkorange', '#ff8c00'],
                ['darkorchid', '#9932cc'],
                ['darkred', '#8b0000'],
                ['darksalmon', '#e9967a'],
                ['darkseagreen', '#8fbc8f'],
                ['darkslateblue', '#483d8b'],
                ['darkslategray', '#2f4f4f'],
                ['darkslategrey', '#2f4f4f'],
                ['darkturquoise', '#00ced1'],
                ['darkviolet', '#9400d3'],
                ['deeppink', '#ff1493'],
                ['deepskyblue', '#00bfff'],
                ['dimgray', '#696969'],
                ['dimgrey', '#696969'],
                ['dodgerblue', '#1e90ff'],
                ['firebrick', '#b22222'],
                ['floralwhite', '#fffaf0'],
                ['forestgreen', '#228b22'],
                ['fuchsia', '#ff00ff'],
                ['gainsboro', '#dcdcdc'],
                ['ghostwhite', '#f8f8ff'],
                ['gold', '#ffd700'],
                ['goldenrod', '#daa520'],
                ['gray', '#808080'],
                ['grey', '#808080'],
                ['green', '#008000'],
                ['greenyellow', '#adff2f'],
                ['honeydew', '#f0fff0'],
                ['hotpink', '#ff69b4'],
                ['indianred', '#cd5c5c'],
                ['indigo', '#4b0082'],
                ['ivory', '#fffff0'],
                ['khaki', '#f0e68c'],
                ['lavender', '#e6e6fa'],
                ['lavenderblush', '#fff0f5'],
                ['lawngreen', '#7cfc00'],
                ['lemonchiffon', '#fffacd'],
                ['lightblue', '#add8e6'],
                ['lightcoral', '#f08080'],
                ['lightcyan', '#e0ffff'],
                ['lightgoldenrodyellow', '#fafad2'],
                ['lightgray', '#d3d3d3'],
                ['lightgrey', '#d3d3d3'],
                ['lightgreen', '#90ee90'],
                ['lightpink', '#ffb6c1'],
                ['lightsalmon', '#ffa07a'],
                ['lightseagreen', '#20b2aa'],
                ['lightskyblue', '#87cefa'],
                ['lightslategray', '#778899'],
                ['lightslategrey', '#778899'],
                ['lightsteelblue', '#b0c4de'],
                ['lightyellow', '#ffffe0'],
                ['lime', '#00ff00'],
                ['limegreen', '#32cd32'],
                ['linen', '#faf0e6'],
                ['magenta', '#ff00ff'],
                ['maroon', '#800000'],
                ['mediumaquamarine', '#66cdaa'],
                ['mediumblue', '#0000cd'],
                ['mediumorchid', '#ba55d3'],
                ['mediumpurple', '#9370d8'],
                ['mediumseagreen', '#3cb371'],
                ['mediumslateblue', '#7b68ee'],
                ['mediumspringgreen', '#00fa9a'],
                ['mediumturquoise', '#48d1cc'],
                ['mediumvioletred', '#c71585'],
                ['midnightblue', '#191970'],
                ['mintcream', '#f5fffa'],
                ['mistyrose', '#ffe4e1'],
                ['moccasin', '#ffe4b5'],
                ['navajowhite', '#ffdead'],
                ['navy', '#000080'],
                ['oldlace', '#fdf5e6'],
                ['olive', '#808000'],
                ['olivedrab', '#6b8e23'],
                ['orange', '#ffa500'],
                ['orangered', '#ff4500'],
                ['orchid', '#da70d6'],
                ['palegoldenrod', '#eee8aa'],
                ['palegreen', '#98fb98'],
                ['paleturquoise', '#afeeee'],
                ['palevioletred', '#d87093'],
                ['papayawhip', '#ffefd5'],
                ['peachpuff', '#ffdab9'],
                ['peru', '#cd853f'],
                ['pink', '#ffc0cb'],
                ['plum', '#dda0dd'],
                ['powderblue', '#b0e0e6'],
                ['purple', '#800080'],
                ['red', '#ff0000'],
                ['rosybrown', '#bc8f8f'],
                ['royalblue', '#4169e1'],
                ['saddlebrown', '#8b4513'],
                ['salmon', '#fa8072'],
                ['sandybrown', '#f4a460'],
                ['seagreen', '#2e8b57'],
                ['seashell', '#fff5ee'],
                ['sienna', '#a0522d'],
                ['silver', '#c0c0c0'],
                ['skyblue', '#87ceeb'],
                ['slateblue', '#6a5acd'],
                ['slategray', '#708090'],
                ['slategrey', '#708090'],
                ['snow', '#fffafa'],
                ['springgreen', '#00ff7f'],
                ['steelblue', '#4682b4'],
                ['tan', '#d2b48c'],
                ['teal', '#008080'],
                ['thistle', '#d8bfd8'],
                ['tomato', '#ff6347'],
                ['turquoise', '#40e0d0'],
                ['violet', '#ee82ee'],
                ['wheat', '#f5deb3'],
                ['white', '#ffffff'],
                ['whitesmoke', '#f5f5f5'],
                ['yellow', '#ffff00'],
                ['yellowgreen', '#9acd32']
            ]);
            /** simple class to return a unique number */
            Uuid = class Uuid {
                constructor() {
                    Uuid.count++;
                }
            };
            exports_1("Uuid", Uuid);
            Uuid.count = 0;
        }
    };
});
// adapted from DEV article by Nick Scialli.
System.register("frontend/redux", [], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    function createStore(reducer, initialState) {
        // real Redux has a third parameter, 'enhancer'
        let state = initialState;
        const listeners = [];
        function getState() {
            return state;
        }
        function dispatch(action) {
            state = reducer(state, action); // pass in state + action, get back new state
            listeners.forEach((listener) => listener(state));
        }
        function subscribe(fn) {
            listeners.push(fn);
            return () => listeners.splice(listeners.indexOf(fn), 1);
        }
        return { getState, dispatch, subscribe };
    }
    exports_2("createStore", createStore);
    /// //////////////////////////////////
    function testReducer(state, action) {
        switch (action.type) {
            case 'SET_USER_NAME':
                return Object.assign(Object.assign({}, state), { userName: action.payload // overwrite with provided payload
                 });
            case 'SET_DISPLAY_MODE':
                return Object.assign(Object.assign({}, state), { displayMode: action.payload });
            default:
                return state; // not a payload we know?  just return state unmodified
        }
    }
    function testRedux() {
        // create a new store !!  using the testReducer function above.
        // most reducers will be much more complicated, and the objects
        // they store will be more complicated too
        const initialState = { userName: 'Guest', displayMode: 'light' };
        const store = createStore(testReducer, initialState);
        // change our user's name to 'Frankie'
        store.dispatch({ type: 'SET_USER_NAME', payload: 'Frankie' });
        // console.log(store.getState()) // {userName: "Frankie", displayMode: "light"}
        store.dispatch({ type: 'SET_DISPLAY_MODE', payload: 'dark' });
        // console.log(store.getState())  // {userName: "Frankie", displayMode: "dark"}
        console.assert(store.getState().displayMode == 'dark', store.getState());
    }
    exports_2("testRedux", testRedux);
    return {
        setters: [],
        execute: function () {// adapted from DEV article by Nick Scialli.
        }
    };
});
/* eslint-disable @typescript-eslint/ban-types */ // allow 'Function' as a type
System.register("middle/tween", ["babylonjs"], function (exports_3, context_3) {
    "use strict";
    var babylonjs_2, consoleGold, consoleRed, consoleYellow, consoleBlue, EasingLibrary, Tween, NullTween, MiscTween, V3Tween, ScalarTween, ColorTween;
    var __moduleName = context_3 && context_3.id;
    return {
        setters: [
            function (babylonjs_2_1) {
                babylonjs_2 = babylonjs_2_1;
            }
        ],
        execute: function () {/* eslint-disable @typescript-eslint/ban-types */ // allow 'Function' as a type
            // import { HTMLColor } from './htmlcolor'
            // code for testing
            // let a = app.shape('cube').addToPosition([-8, 4, 0]).setColor('red')
            // let b = app.shape('cube').addToPosition([-8, 2, 0]).setColor('green')
            // let c = app.shape('cube').addToPosition([-8, 0, 0]).setColor('black')
            // let d = app.shape('cube').addToPosition([-8, -2, 0])
            // let e = app.shape('cube').addToPosition([-8, -4, 0])
            // let ta = new Tween(-8, 16, 10 , "Begin And End Fast",(value)=>{a.setPosition([value, 4, 0])})
            // let tb = new Tween(-8, 16, 10 , "Begin And End Normally",(value)=>{b.setPosition([value, 2, 0])})
            // let tc = new Tween(-8, 16, 10 , "Begin And End Slow",(value)=>{c.setPosition([value, 0, 0])})
            // let td = new Tween(-8, 16, 10 , "Begin Fast, End Slow",(value)=>{d.setPosition([value, -2, 0])})
            // let te = new Tween(-8, 16, 10 , "Begin Slow, End Fast",(value)=>{e.setPosition([value, -4, 0])})
            // app.update = function () {
            //     ta.doTween()
            //     tb.doTween()
            //     tc.doTween()
            //     td.doTween()
            //     te.doTween()
            // }
            //
            consoleGold = 'background-color:gold:color:white;';
            consoleRed = 'background-color:red;color:white;';
            consoleYellow = 'background-color:yellow;color:black;';
            consoleBlue = 'background-color:blue;color:white;';
            /**
             * Supports easing for the following commands you can demo at
             * http://ashblue.github.com/canvas-tween-demo/ 'linear', 'quadIn', 'quadOut',
             * 'quadInOut', 'cubeIn', 'cubeOut', 'cubeInOut', 'quartIn', 'quartOut', 'quartInOut',
             * 'quintIn', 'quintOut', 'quintInOut', 'sineIn', 'sineOut', 'sineInOut', 'expoIn',
             * 'expoOut', 'expoInOut', 'circIn', 'circOut', 'circInOut'. Adopted from
             * http://gizma.com/easing/
             * @link http://ashblue.github.com/canvas-tween-demo/
             */
            EasingLibrary = class EasingLibrary {
                /**
                   * @param {number} t Current time in millseconds
                   * @param {number} b Start value
                   * @param {number} c Distance traveled relative to the start value
                   * @param {number} d Duration in milliseconds
                   */
                static linear(t, b, c, d) {
                    // console.log(`linear easing t=${t},b=${b},c=${c},d=${d}`)
                    t /= d;
                    return c * t + b;
                }
                static quadIn(t, b, c, d) {
                    t /= d;
                    return c * t * t + b;
                }
                static quadOut(t, b, c, d) {
                    t /= d;
                    return -c * t * (t - 2) + b;
                }
                static quadInOut(t, b, c, d) {
                    t /= d / 2;
                    if (t < 1) {
                        return c / 2 * t * t + b;
                    }
                    t--;
                    return -c / 2 * (t * (t - 2) - 1) + b;
                }
                // static quadOutIn(t, b, c, d) {   // new, for Baby  fast in, slow middle fast out, slow in middle
                //     t /= d / 2;
                //     if (t < 1) {
                //         return c / 2 * t * t + b;
                //     }
                //     t--;
                //     return -c / 2 * (t * (t - 2) - 1) + b;
                // }
                // t is (currentTime - startTime) = how long we have been running, say 3 seconds
                // d is how long we should run, say 10 seconds
                //  so d/2 is the halfway time and t /= d/2 is either less than or greater than 1
                // b is the start value,
                // c is the add travel
                static quadOutIn(t, b, c, d) {
                    t /= d / 2;
                    if (t < 1) {
                        // in the first half we want to slow down
                        return (-c / 2) * (t * (t - 2)) + b;
                    }
                    // in the second half we want to speed up
                    t--;
                    return (c / 2) + (c / 2 * t * t) + b;
                }
                static cubeIn(t, b, c, d) {
                    t /= d;
                    return c * t * t * t + b;
                }
                static cubeOut(t, b, c, d) {
                    t /= d;
                    t--;
                    return c * (t * t * t + 1) + b;
                }
                static cubeInOut(t, b, c, d) {
                    t /= d / 2;
                    if (t < 1) {
                        return c / 2 * t * t * t + b;
                    }
                    t -= 2;
                    return c / 2 * (t * t * t + 2) + b;
                }
                static quartIn(t, b, c, d) {
                    t /= d;
                    return c * t * t * t * t + b;
                }
                static quartOut(t, b, c, d) {
                    t /= d;
                    t--;
                    return -c * (t * t * t * t - 1) + b;
                }
                static quartInOut(t, b, c, d) {
                    t /= d / 2;
                    if (t < 1) {
                        return c / 2 * t * t * t * t + b;
                    }
                    t -= 2;
                    return -c / 2 * (t * t * t * t - 2) + b;
                }
                static quintIn(t, b, c, d) {
                    t /= d;
                    return c * t * t * t * t * t + b;
                }
                static quintOut(t, b, c, d) {
                    t /= d;
                    t--;
                    return c * (t * t * t * t * t + 1) + b;
                }
                static quintInOut(t, b, c, d) {
                    t /= d / 2;
                    if (t < 1) {
                        return c / 2 * t * t * t * t * t + b;
                    }
                    t -= 2;
                    return c / 2 * (t * t * t * t * t + 2) + b;
                }
                static sineIn(t, b, c, d) {
                    return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
                }
                static sineOut(t, b, c, d) {
                    return c * Math.sin(t / d * (Math.PI / 2)) + b;
                }
                static sineInOut(t, b, c, d) {
                    return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
                }
                static expoIn(t, b, c, d) {
                    return c * Math.pow(2, 10 * (t / d - 1)) + b;
                }
                static expoOut(t, b, c, d) {
                    return c * (-Math.pow(2, -10 * t / d) + 1) + b;
                }
                static expoInOut(t, b, c, d) {
                    t /= d / 2;
                    if (t < 1) {
                        return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
                    }
                    t--;
                    return c / 2 * (-Math.pow(2, -10 * t) + 2) + b;
                }
                static circIn(t, b, c, d) {
                    t /= d;
                    return -c * (Math.sqrt(1 - t * t) - 1) + b;
                }
                static circOut(t, b, c, d) {
                    t /= d;
                    t--;
                    return c * Math.sqrt(1 - t * t) + b;
                }
                static circInOut(t, b, c, d) {
                    t /= d / 2;
                    if (t < 1) {
                        return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
                    }
                    t -= 2;
                    return c / 2 * (Math.sqrt(1 - t * t) + 1) + b;
                }
            };
            // a tween is really a promise, maybe should just subclass 'Promise' ?
            /**
             * Constructor for the tween
             * @param {number} startValue What value does the tween start at
             * @param {number} distance How far does the tween's value advance from the startValue?
             * @param {number} durationMS Amount of time in milliseconds the tween runs for
             * @param {Function} animate What easing function should be used from the easing library?
             * See EasingLibrary for a list of potential easing equations.
             * @param {string} loop Can be left blank, set to loop, or repeat. Loop repeats repeats the animation
             * in reverse every time. Repeat will run the original tween from the beginning
             * @returns {self}
             */
            Tween = class Tween {
                constructor(name = '') {
                    this.isCancelled = false;
                    this.tweenType = null; // need to know for some operations
                    /**
                     * Has the tween expired yet?
                     * @returns {boolean} True if the tween has expired
                     */
                    this.expired = () => { return true; }; // we override this method, so code it to look like a property
                    this.name = name; // just for debugging
                    this.promise = new Promise((resolve) => {
                        this.promiseResolve = resolve;
                    });
                }
                commonStart(timeStamp, seconds, animate, updateFunction) {
                    this.startTime = Date.now();
                    this.timeStamp = timeStamp;
                    this.durationMS = seconds * 1000; // internally we use ms
                    this.updateFunction = updateFunction;
                    this.expired = () => { return this.startTime + this.durationMS < Date.now(); };
                    // console.log(animate)
                    switch (animate) {
                        case '1-Begin And End Normally':
                            this.animationFunction = (t, b, c, d) => (EasingLibrary.linear(t, b, c, d));
                            break;
                        case '2-Begin Slow, End Fast':
                            this.animationFunction = (t, b, c, d) => (EasingLibrary.quadIn(t, b, c, d));
                            break;
                        case '3-Begin Fast, End Slow':
                            this.animationFunction = (t, b, c, d) => (EasingLibrary.quadOut(t, b, c, d));
                            break;
                        case '4-Begin And End Fast':
                            this.animationFunction = (t, b, c, d) => (EasingLibrary.quadOutIn(t, b, c, d));
                            break;
                        case '5-Begin And End Slow':
                            this.animationFunction = (t, b, c, d) => (EasingLibrary.quadInOut(t, b, c, d));
                            break;
                    }
                    return this;
                }
                /**
                 * Rounds the passed number to two decimal places. Prevents large float
                 * numbers from being multiplied
                 * @param {number} num number you want to round
                 * @returns {number} Rounded number
                 */
                round(num) {
                    // TODO use 'this.minimum' as the round factor
                    return Math.round(num * 1000) / 1000;
                }
                // /**
                //  * Get the current value of the tween
                //  * @param {number} dateNow is 'Date.now' from the caller (more accurate)
                //  * @returns {number} Current value of the tween
                //  */
                // getValue(dateNow: number): number {
                //     // Run normally
                //     let total: number
                //     if (!this.expired()) {
                //         total = this.animationFunction(dateNow - this.startTime, this.startValue, this.distance, this.duration);
                //     } else {            // Ended and no repeat is present   --- expired
                //         total = this.startValue + this.distance;
                //     }
                //     return this.round(total);
                // };
                /**
                 * Retrieves the start time relative to the time passed from the previous start time
                 * @returns {number} Start time of the tween relative to time passed
                 */
                getStartTime() {
                    return Date.now() - this.startTime - this.durationMS + Date.now();
                }
                /**
                 * Resets the tween and runs it relative to the current time
                 * @returns {self}
                 */
                reset() {
                    this.startTime = Date.now();
                    return this;
                }
            };
            exports_3("Tween", Tween);
            // some things like shape creation doesn't need a tween
            NullTween = class NullTween extends Tween {
                constructor(name) { super(name); }
                doTween() { return (this); }
            };
            exports_3("NullTween", NullTween);
            ////////////////////////////////////////////
            // here are the actual tweens we support ///
            //  V3Tween()      // process a Vector3
            //  ScalarTween()  // process a scalar value
            //  MiscTween()    // just a promise that resolves when the shape has no other tweens
            ////////////////////////////////////////////
            /** a promise that resolves true when the update function returns true */
            MiscTween = class MiscTween extends Tween {
                constructor(name) {
                    super(name);
                }
                start(updateFunction) {
                    this.tweenType = 'misc';
                    this.startTime = Date.now();
                    this.updateFunction = updateFunction;
                    this.expired = () => { return this.updateFunction(); };
                    return this;
                }
                doTween() {
                    return this;
                }
            };
            exports_3("MiscTween", MiscTween);
            V3Tween = class V3Tween extends Tween {
                constructor(name) {
                    super(name);
                }
                start(tweenType, startValue, endValue, timeStamp, seconds, animate, updateFunction) {
                    // console.log('%cV3 tween.start',consoleBlue, startValue,endValue)
                    console.assert(typeof startValue !== 'undefined', 'missing startValue');
                    console.assert(typeof startValue.x !== 'undefined', 'startValue not a Vector3');
                    console.assert(typeof endValue !== 'undefined', 'missing endValue');
                    console.assert(typeof endValue.x !== 'undefined', 'endValue not a Vector3 ');
                    // some things are the same for every type of tween
                    this.commonStart(timeStamp, seconds, animate, updateFunction);
                    this.startValue = startValue;
                    this.endValue = endValue;
                    this.moveValue = this.endValue.subtract(this.startValue);
                    this.tweenType = tweenType;
                    this.minimum = 0.001; // the smallest move we will make
                    this.lastDistance = startValue.clone(); // where we think the mesh is relative to start
                    return this;
                }
                /**
              * Run the tween computation and update whatever it is supposed to
              * @param {number} dateNow is 'Date.now' from the caller (more accurate)
              * @returns {number} Current value of the tween
              */
                doTween() {
                    // we have start(V3) and distance(V3).  but we can't just move between them, there might be two tweens
                    // we send out a stream of delta-positions ( move +.023, move +.041...)
                    // and we keep track of the last position we think the mesh is at
                    //
                    // further, we use a MINIMUM, if the minimum is .01 then we don't issue any moves less than that.
                    // and we round down to that value.  might be a tiny bit jerky, but much less overhead
                    //
                    // for colors, the minimum is 1, because colors don't have fractions.
                    // console.log('%cV3 tween.doTween',consoleBlue, this.startValue,this.endValue)
                    console.assert(typeof this.startValue !== 'undefined', 'missing startValue');
                    console.assert(typeof this.startValue.x !== 'undefined', 'startValue not a Vector3');
                    console.assert(typeof this.endValue !== 'undefined', 'missing endValue');
                    console.assert(typeof this.endValue.x !== 'undefined', 'endValue not a Vector3 ');
                    let newDistance;
                    const timeNow = Date.now() - this.startTime;
                    // console.log(`Tweening '${this.name}'`)
                    // we only want to move if the tween is still alive
                    if (!this.isCancelled) {
                        if (!this.expired()) { // still active, so delta movement
                            // console.log(`timenow is`, timeNow, `startTime is `,this.startTime)
                            // these three look complicated, but they are simply a call to the easing function
                            const d0 = this.round(this.animationFunction(timeNow, this.startValue.x, this.moveValue.x, this.durationMS));
                            const d1 = this.round(this.animationFunction(timeNow, this.startValue.y, this.moveValue.y, this.durationMS));
                            const d2 = this.round(this.animationFunction(timeNow, this.startValue.z, this.moveValue.z, this.durationMS));
                            newDistance = new babylonjs_2.Vector3(d0, d1, d2);
                            // console.log(this.name,this.startValue,newDistance,'in getValue at time ',timeNow,this.durationMS)
                        }
                        else { // Ended and no repeat is present   --- expired
                            newDistance = this.endValue.clone();
                        }
                        const newDelta = newDistance.subtract(this.lastDistance);
                        this.lastDistance = newDistance;
                        this.updateFunction(newDelta); // might move or turn, whatever
                    }
                    return this;
                }
            };
            exports_3("V3Tween", V3Tween);
            ScalarTween = class ScalarTween extends Tween {
                constructor(name) {
                    super(name);
                }
                start(tweenType, startValue, endValue, timeStamp, seconds, animate, updateFunction) {
                    // some things are the same for every type of tween
                    this.commonStart(timeStamp, seconds, animate, updateFunction);
                    this.startValue = startValue;
                    this.endValue = endValue;
                    this.moveValue = this.endValue - this.startValue;
                    this.tweenType = tweenType;
                    this.minimum = 0.01; // the smallest move we will make
                    this.lastDistance = startValue; // where we think the mesh is relative to start
                    // console.log(this.name, 'startvalue', this.startValue)
                    // console.log('endValue', this.endValue)
                    return this;
                }
                /**
              * Run the tween computation and update whatever it is supposed to
              * @param {number} dateNow is 'Date.now' from the caller (more accurate)
              * @returns {number} Current value of the tween
              */
                doTween() {
                    // we are in scalarTween
                    // for colors, the minimum is 1, because colors don't have fractions.
                    let newDistance;
                    const timeNow = Date.now() - this.startTime;
                    // console.log(`Tweening '${this.name}'`)
                    if (!this.expired()) {
                        // console.log(`timenow is`, timeNow, `startTime is `,this.startTime)
                        // these three look complicated, but they are simply a call to the easing function
                        newDistance = this.round(this.animationFunction(timeNow, this.startValue, this.moveValue, this.durationMS));
                        if (newDistance < this.minimum) // may be a bit jerky, but reduces accumulated error
                         {
                            newDistance = 0;
                        }
                        // console.log(this.startValue,this.moveValue,'in getValue at time ',timeNow,this.durationMS)
                    }
                    else { // Ended and no repeat is present   --- expired
                        newDistance = this.endValue;
                        // newDistance = this.startValue.clone().add(this.endValue)
                    }
                    const newDelta = newDistance - this.lastDistance;
                    // console.log('--')
                    // console.log('start', this.startValue)
                    // console.log('moveValue',this.moveValue)
                    // console.log('newDistance', newDistance)
                    // console.log('newDelta', newDelta)
                    this.lastDistance = newDistance;
                    // console.log('delta',this.lastDistance,newDistance, newDelta.subtract(this.startValue))
                    // console.log(`${this.name} V3Tween new delta ${newDelta.x},${newDelta.y},${newDelta.z}`)
                    this.updateFunction(newDelta); // might move or turn, whatever
                    return this;
                }
            };
            exports_3("ScalarTween", ScalarTween);
            ColorTween = class ColorTween extends Tween {
                constructor(name) {
                    super(name);
                }
                start(tweenType, startValue, distance, timeStamp, seconds, animate, updateFunction) {
                    // some things are the same for every type of tween
                    this.commonStart(timeStamp, seconds, animate, updateFunction);
                    this.startValue = startValue;
                    this.distance = distance;
                    this.minimum = 1; // the smallest move we will make
                    this.lastDistance = startValue; // where we think the mesh is
                    this.tweenType = tweenType;
                    return this;
                }
                /** Run the tween computation and update whatever it is supposed to */
                doTween() {
                    // console.log('chocolate is ', HTMLColor('chocolate'))
                    let newDistance;
                    const timeNow = Date.now() - this.startTime;
                    // console.log(`Tweening '${this.name}'`)
                    if (!this.expired()) {
                        // console.log(`timenow is`, timeNow, `startTime is `,this.startTime)
                        // these three look complicated, but they are simply a call to the easing function
                        const d0 = this.round(this.animationFunction(timeNow, this.startValue.r, this.distance.r, this.durationMS));
                        const d1 = this.round(this.animationFunction(timeNow, this.startValue.g, this.distance.g, this.durationMS));
                        const d2 = this.round(this.animationFunction(timeNow, this.startValue.b, this.distance.b, this.durationMS));
                        newDistance = new babylonjs_2.Color3(d0, d1, d2);
                        // console.log(this.startValue, this.distance, 'in getValue at time ', timeNow, this.durationMS)
                    }
                    else { // Ended and no repeat is present   --- expired
                        newDistance = this.startValue.add(this.distance);
                    }
                    const newDelta = new babylonjs_2.Color3(newDistance.r - this.lastDistance.r, newDistance.g - this.lastDistance.g, newDistance.b - this.lastDistance.b);
                    // console.log('start and new and delta' ,this.startValue,newDistance,newDelta)
                    this.lastDistance = newDistance;
                    // console.log('delta',this.lastDistance,newDistance, newDelta.subtract(this.startValue))
                    // console.log(`${this.name} V3Tween new delta ${newDelta.x},${newDelta.y},${newDelta.z}`)
                    this.updateFunction(newDelta); // might move or turn, whatever
                    return this;
                }
            };
            exports_3("ColorTween", ColorTween);
            // constructor(start: Vector3, end: Vector3, startTime:number,duration: number,
            //     animate: "Begin And End Normally" | "Begin Slow, End Fast" | "Begin Fast, End Slow" | "Begin And End Fast" | "Begin And End Slow",
            //         ) {
            //     let dDistance = tNode.position.subtract(handle.babylonMesh.position)
            //     let ta = new MoveTween(start, cmd.distance, cmd.duration, cmd.animate, (value) => { cmd.tweenCmd([value]) })
            //     // TODO:       this.tweenArray.push(ta)
            //     return this.newTweens
        }
    };
});
// buttons are GUI items.   
System.register("frontend/babyGUI", ["frontend/babything", "middle/babyengine"], function (exports_4, context_4) {
    "use strict";
    var babything_1, babyengine_1, BabyGUI;
    var __moduleName = context_4 && context_4.id;
    return {
        setters: [
            function (babything_1_1) {
                babything_1 = babything_1_1;
            },
            function (babyengine_1_1) {
                babyengine_1 = babyengine_1_1;
            }
        ],
        execute: function () {// buttons are GUI items.   
            // you position them FIRST in (N, NE, E SE... corners)  // default is CENTER
            // then you can move them up/down or left/right
            // we follow BOOTSTRAP's naming and color scheme...
            // https://getbootstrap.com/docs/4.0/components/buttons/   
            BabyGUI = class BabyGUI extends babything_1.BabyThing {
                constructor(model, baby, babyEngine) {
                    super(model, babyEngine);
                }
                /** role sets the color, eg Primary is blue, Danger is red.  This follows Bootstrap's model. */
                role(role) {
                    switch (role) {
                        case 'Primary':
                            this.color = '#fff';
                            this.background = '#007bff';
                            this.border = '#007bff';
                            break;
                        case 'Secondary':
                            this.color = '#fff';
                            this.background = '#6c757d';
                            this.border = '#6c757d';
                            break;
                        case 'Success':
                            this.color = '#fff';
                            this.background = '#28a745';
                            this.border = '#28a745';
                            break;
                        case 'Danger':
                            this.color = '#fff';
                            this.background = '#dc3545';
                            this.border = '#dc3545';
                            break;
                        case 'Warning':
                            this.color = '#212529';
                            this.background = '#ffc107';
                            this.border = '#ffc107';
                            break;
                        case 'Info':
                            this.color = '#fff';
                            this.background = '#17a2b8';
                            this.border = '#17a2b8';
                            break;
                        case 'Light':
                            this.color = '#212529';
                            this.background = '#f8f9fa';
                            this.border = '#17a2b8';
                            break;
                        case 'Dark':
                            this.color = '#fff';
                            this.background = '#343a40';
                            this.border = '#343a40';
                            break;
                        default:
                            console.error(`did not expect '${role}' as a button role`);
                    }
                    const gameCmd = {
                        action: 'colorGUI',
                        uuid: this.uuid,
                        color: this.color,
                        background: this.background,
                    };
                    babyengine_1.BabyEngine.broadcastToPlayers(gameCmd);
                    return this;
                }
                /** position is one of the eight side/corner positions or 'Center'. eg: 'TopLeft' */
                position(position) {
                    switch (position) {
                        case 'Top':
                            this.leftRight = 0;
                            this.topBottom = 1;
                            break;
                        case 'TopRight':
                            this.leftRight = 1;
                            this.topBottom = 1;
                            break;
                        case 'TopLeft':
                            this.leftRight = -1;
                            this.topBottom = 1;
                            break;
                        case 'Right':
                            this.leftRight = 1;
                            this.topBottom = 0;
                            break;
                        case 'Left':
                            this.leftRight = -1;
                            this.topBottom = 0;
                            break;
                        case 'Bottom':
                            this.leftRight = 0;
                            this.topBottom = -1;
                            break;
                        case 'BottomRight':
                            this.leftRight = 1;
                            this.topBottom = -1;
                            break;
                        case 'BottomLeft':
                            this.leftRight = -1;
                            this.topBottom = -1;
                            break;
                        case 'Center':
                            this.leftRight = 0;
                            this.topBottom = 0;
                            break;
                        default:
                            console.error(`did not expect '${position}' as a button position`);
                    }
                    const gameCmd = {
                        action: 'positionGUI',
                        uuid: this.uuid,
                        leftRight: this.leftRight,
                        topBottom: this.topBottom,
                    };
                    babyengine_1.BabyEngine.broadcastToPlayers(gameCmd);
                    return this;
                }
                /** the message to display */
                text(text, resize = true) {
                    const gameCmd = {
                        action: 'textGUI',
                        uuid: this.uuid,
                        text: text,
                        resize: true,
                    };
                    babyengine_1.BabyEngine.broadcastToPlayers(gameCmd);
                    return this;
                }
                onClick(func) {
                    this.onPressDown = func;
                    return this;
                }
            };
            exports_4("BabyGUI", BabyGUI);
        }
    };
});
System.register("backend/things", ["middle/babyengine", "frontend/babything", "babylonjs", "babylonjs-materials"], function (exports_5, context_5) {
    "use strict";
    var babyengine_2, babything_2, babylonjs_3, babylonjs_4, babylonjs_materials_1, consoleRed, consoleYellow, consoleBlue, ThingCommon, Cube, Sphere, Cylinder, Cone, Torus, Point, Capsule, CameraThing, Floor;
    var __moduleName = context_5 && context_5.id;
    return {
        setters: [
            function (babyengine_2_1) {
                babyengine_2 = babyengine_2_1;
            },
            function (babything_2_1) {
                babything_2 = babything_2_1;
            },
            function (babylonjs_3_1) {
                babylonjs_3 = babylonjs_3_1;
                babylonjs_4 = babylonjs_3_1;
            },
            function (babylonjs_materials_1_1) {
                babylonjs_materials_1 = babylonjs_materials_1_1;
            }
        ],
        execute: function () {
            consoleRed = 'background-color:red;color:white;';
            consoleYellow = 'background-color:yellow;color:black;';
            consoleBlue = 'background-color:blue;color:white;';
            // need to export this, because it is the 'type' for Ball, Box, etc
            ThingCommon = class ThingCommon {
                constructor(cmd, handle, scene) {
                    this.params = {};
                    this.scene = scene;
                    this.handle = handle;
                }
                standardMeshSetup() {
                    if (this.handle.babylonMesh instanceof babylonjs_3.Mesh) { // typeguard
                        const material = new babylonjs_3.StandardMaterial('', this.scene);
                        this.handle.type = 'mesh';
                        this.handle.babylonMesh.scaling = new babylonjs_3.Vector3(.99, .99, .99); // just a fraction less
                        this.handle.babylonMesh.material = material;
                        this.handle.material = material; // because we can't always get to handle.babylonMesh.material.diffuseColor...
                        this.handle.mass = 0; // a ghost unless we find out otherwise
                        this.handle.restitution = .9;
                    }
                    else
                        console.error('MeshSetup only for mesh');
                }
                /** if Ammo tells us a collision happened, this cleans up and notifies the parties */
                onCollisionHelper(a, b) {
                    if (a === b) { // sometimes we seem to collide with ourselves ?!?
                        // console.log('%cA and B are === - we collided with ourself',consoleRed)
                        return;
                    }
                    // lookup the uuid for a and b, and send BOTH a message
                    let aMesh = null;
                    let aMeshHandle = null;
                    let bMesh = null;
                    let bMeshHandle = null;
                    if (aMeshHandle.babylonMesh instanceof babylonjs_3.Mesh &&
                        bMeshHandle.babylonMesh instanceof babylonjs_3.Mesh) { // typeguard
                        babyengine_2.BabyEngine.shapeMap.forEach((mesh) => {
                            if (mesh.babylonMesh instanceof babylonjs_3.Mesh) { // typeguard
                                // we only allow a shape to collide once every 100ms
                                // console.log(mesh.babylonMesh.physicsImpostor)
                                if (mesh.babyShape instanceof babything_2.BabyShape) { // not a  BabyButton 
                                    if (typeof mesh.babylonMesh.physicsImpostor === 'object' &&
                                        mesh.lastCollisionTime < (Date.now() - 10)) {
                                        if (mesh.babylonMesh.physicsImpostor === a) {
                                            aMesh = mesh.babyShape; // get the babyShape for this mesh
                                            aMeshHandle = mesh;
                                        }
                                        if (mesh.babylonMesh.physicsImpostor === b) {
                                            bMesh = mesh.babyShape;
                                            bMeshHandle = mesh;
                                        }
                                    }
                                }
                            }
                        });
                    }
                    // ok, did we get TWO shapes?  (many reasons we might not)
                    if (aMesh !== null && bMesh !== null) {
                        // signal both that they hit each other... likely only one is listening
                        babyengine_2.BabyEngine.notifyObservers(`collide.${aMesh.uuid}`, bMesh);
                        babyengine_2.BabyEngine.notifyObservers(`collide.${bMesh.uuid}`, aMesh);
                        // this is a small debounce.  neither will hit for 100th of a second
                        aMeshHandle.lastCollisionTime = Date.now();
                        bMeshHandle.lastCollisionTime = Date.now();
                    }
                }
                /** setup collider for a shape */
                setupCollider() {
                    // TODO:  something wrong here, not sure what.  come back to it, comment out for now
                    // console.log('%csetupCollider',consoleRed,this.handle)
                    if (this.handle.babylonMesh instanceof babylonjs_3.Mesh) { // typeguard
                        // set up collider
                        // this.handle.babylonMesh.physicsImpostor = new PhysicsImpostor(this.handle.babylonMesh, PhysicsImpostor[this.impostorString], { mass: this.handle.mass, restitution: this.handle.restitution }, this.scene)
                        // BabyEngine.impostors.push(this.handle.babylonMesh.physicsImpostor)
                    }
                }
                /** dispose of a mesh (and its physics impostor) */
                dispose() {
                    this.handle.tweenArray = [];
                    if (this.handle.babylonMesh instanceof babylonjs_3.Mesh) { // typeguard
                        this.handle.babylonMesh.material.dispose(); // do I have to check it exists?
                        // yank the impostor out of our list of impostors, if it is there
                        this.disposeImpostor();
                        // and finally dispose of the mesh itself
                        this.handle.babylonMesh.dispose();
                    }
                    // TODO: get rid of the collide and click observables
                }
                /** create physics impostor for this shape */
                createPhysicsImpostor() {
                    if (this.handle.babylonMesh instanceof babylonjs_3.Mesh) { // typeguard
                        console.log('checking...', 
                        // this.handle.babylonMesh,
                        babylonjs_4.PhysicsImpostor[this.impostorString]);
                        this.handle.babylonMesh.physicsImpostor =
                            new babylonjs_4.PhysicsImpostor(this.handle.babylonMesh, babylonjs_4.PhysicsImpostor[this.impostorString], { mass: this.handle.mass, restitution: this.handle.restitution }, this.scene);
                        babyengine_2.BabyEngine.impostors.push(this.handle.babylonMesh.physicsImpostor);
                    }
                }
                /** dispose of the physics impostor belonging to a mesh */
                disposeImpostor() {
                    if (this.handle.babylonMesh instanceof babylonjs_3.Mesh) { // typeguard
                        // yank the impostor out of our list of impostors, if it is there
                        const temp = babyengine_2.BabyEngine.impostors.length; // assert that we will remove one element
                        babyengine_2.BabyEngine.impostors.splice(babyengine_2.BabyEngine.impostors.findIndex(e => {
                            if (this.handle.babylonMesh instanceof babylonjs_3.Mesh) { // typeguard
                                e === this.handle.babylonMesh.physicsImpostor;
                            }
                        }), 1);
                        this.handle.babylonMesh.physicsImpostor.dispose(); // do I have to check?
                        this.handle.babylonMesh.physicsImpostor = null; // make sure
                        console.assert(temp == babyengine_2.BabyEngine.impostors.length + 1, `started with ${temp} impostors, removed one, now have ${babyengine_2.BabyEngine.impostors.length} ?!?`);
                    }
                    else
                        console.error('Physics Impostor only on Mesh');
                }
                /** can't resize an impostor, so drop it and recreate  */
                recreatePhysicsImpostor() {
                    if (this.handle.babylonMesh instanceof babylonjs_3.Mesh) { // typeguard
                        // first step - remove the old impostor from the global list of impostors, and dispose of it
                        this.disposeImpostor();
                        // second step - recreate it with the new dimensions
                        // TODO decide whether box or ball...
                        switch (this.handle.model) {
                            case 'cube':
                                this.handle.babylonMesh.physicsImpostor = new babylonjs_4.PhysicsImpostor(this.handle.babylonMesh, babylonjs_4.PhysicsImpostor.BoxImpostor, { mass: this.handle.mass, restitution: this.handle.restitution }, this.scene);
                                if (this.scene.debugLayer.isVisible()) {
                                    babyengine_2.BabyEngine.physicsViewer.showImpostor(this.handle.babylonMesh.physicsImpostor);
                                }
                                break;
                            default:
                                console.error('should not get here, do not have a handler for ' + this.handle.model);
                        }
                        // has to work for meshs, cameras, and lights, but only shapes has scaling
                        // push the new resized impostor back on the global list of impostors
                        babyengine_2.BabyEngine.impostors.push(this.handle.babylonMesh.physicsImpostor);
                        this.handle.babylonMesh.physicsImpostor.registerOnPhysicsCollide(babyengine_2.BabyEngine.impostors, (a, b) => {
                            this.onCollisionHelper(a, b);
                        });
                    }
                    else
                        console.error('Physics Impostor only on Mesh');
                }
                showDebugImpostor() {
                }
                setShapeMass() {
                }
            };
            exports_5("ThingCommon", ThingCommon);
            Cube = class Cube extends ThingCommon {
                constructor(cmd, handle, scene) {
                    super(cmd, handle, scene);
                    this.handle.babylonMesh = babylonjs_3.MeshBuilder.CreateBox(this.handle.uniqueName, this.params, this.scene);
                    this.standardMeshSetup();
                    this.handle.mass = 1;
                    this.impostorString = 'BoxImpostor';
                    this.createPhysicsImpostor();
                }
            };
            exports_5("Cube", Cube);
            Sphere = class Sphere extends ThingCommon {
                constructor(cmd, handle, scene) {
                    super(cmd, handle, scene);
                    this.handle.babylonMesh = babylonjs_3.MeshBuilder.CreateSphere(handle.uniqueName, this.params, this.scene);
                    this.standardMeshSetup();
                    this.handle.mass = (4 / 3) * Math.PI; // times R^3, which is just 1
                    this.impostorString = 'SphereImpostor';
                    this.createPhysicsImpostor();
                }
            };
            exports_5("Sphere", Sphere);
            // a can and a cone are really the same thing - a cylinder
            Cylinder = class Cylinder extends ThingCommon {
                constructor(cmd, handle, scene) {
                    super(cmd, handle, scene);
                    this.handle.babylonMesh = babylonjs_3.MeshBuilder.CreateCylinder(handle.uniqueName, this.params, this.scene);
                    this.standardMeshSetup();
                    this.handle.mass = (4 / 3) * Math.PI; // times R^3, which is just 1
                    this.impostorString = 'SphereImpostor';
                    this.createPhysicsImpostor();
                }
            };
            exports_5("Cylinder", Cylinder);
            Cone = class Cone extends ThingCommon {
                constructor(cmd, handle, scene) {
                    super(cmd, handle, scene);
                    this.params = { diameterTop: 0 };
                    this.handle.babylonMesh = babylonjs_3.MeshBuilder.CreateCylinder(handle.uniqueName, this.params, this.scene);
                    this.standardMeshSetup();
                    this.handle.mass = (4 / 3) * Math.PI; // times R^3, which is just 1
                    this.impostorString = 'SphereImpostor';
                    this.createPhysicsImpostor();
                }
            };
            exports_5("Cone", Cone);
            Torus = class Torus extends ThingCommon {
                constructor(cmd, handle, scene) {
                    super(cmd, handle, scene);
                    this.handle.babylonMesh = babylonjs_3.MeshBuilder.CreateTorus(handle.uniqueName, this.params, this.scene);
                    this.standardMeshSetup();
                    this.handle.mass = (4 / 3) * Math.PI; // times R^3, which is just 1
                    this.impostorString = 'SphereImpostor';
                    this.createPhysicsImpostor();
                }
            };
            exports_5("Torus", Torus);
            Point = class Point extends ThingCommon {
                constructor(cmd, handle, scene) {
                    super(cmd, handle, scene);
                    this.handle.babylonMesh = babylonjs_3.MeshBuilder.CreateSphere(handle.uniqueName, this.params, this.scene);
                    this.standardMeshSetup();
                    this.handle.mass = (4 / 3) * Math.PI; // times R^3, which is just 1
                    this.impostorString = 'SphereImpostor';
                    this.createPhysicsImpostor();
                }
            };
            exports_5("Point", Point);
            // // we create TWO disks, and glue them together (otherwise only opaque one side)
            // export class Disc extends ThingCommon implements Thing {
            //     constructor(cmd: gameCmd, handle: MeshHandle, scene: Scene) {
            //         super(cmd, handle, scene)
            //         let params = {radius: 0.5, tessellation: 64}
            //         this.handle.babylonMesh = MeshBuilder.CreateDisc(handle.uniqueName, this.params, this.scene)
            //         this.standardMeshSetup()
            //         let temp = MeshBuilder.CreateDisc(handle.uniqueName, this.params, this.scene)
            //         temp.rotate(new Vector3(1,0,0),Math.PI)
            //         temp.parent = this.handle.babylonMesh
            //         this.handle.mass = (4 / 3) * Math.PI // times R^3, which is just 1
            //         this.impostorString = 'SphereImpostor'
            //     }
            // }
            Capsule = class Capsule extends ThingCommon {
                constructor(cmd, handle, scene) {
                    super(cmd, handle, scene);
                    // bug in BabylonJS?  defaults not defined?
                    let params = { subdivisions: 2, tessellation: 16, height: 1, radius: 0.25, capSubdivisions: 6 };
                    this.handle.babylonMesh = babylonjs_3.MeshBuilder.CreateCapsule(handle.uniqueName, params, this.scene);
                    this.standardMeshSetup();
                    this.handle.mass = (4 / 3) * Math.PI; // times R^3, which is just 1
                    this.impostorString = 'SphereImpostor';
                    this.createPhysicsImpostor();
                }
            };
            exports_5("Capsule", Capsule);
            CameraThing = class CameraThing extends ThingCommon {
                constructor(cmd, handle, scene) {
                    super(cmd, handle, scene);
                    console.assert(handle.babylonMesh !== undefined);
                    let c = new babylonjs_3.ArcRotateCamera(handle.uniqueName, 0, 0, 15, new babylonjs_3.Vector3(0, -5, 0), this.scene);
                    handle.babylonMesh = c;
                    c.setPosition(new babylonjs_3.Vector3(5, 20, -20));
                    handle.type = 'camera';
                    // // This attaches the camera to the canvas
                    c.attachControl('', false);
                    if (cmd.cameraType == 'follow') {
                        const targetMeshHandle = babyengine_2.BabyEngine.shapeMap.get(cmd.otherUuid);
                        c.lockedTarget = targetMeshHandle.babylonMesh;
                    }
                    scene.setActiveCameraByName(handle.uniqueName);
                    console.assert(handle.babylonMesh !== undefined);
                }
            };
            exports_5("CameraThing", CameraThing);
            Floor = class Floor extends ThingCommon {
                // a floor is actually a thin box
                constructor(cmd, handle, scene) {
                    super(cmd, handle, scene);
                    this.handle.babylonMesh = babylonjs_3.MeshBuilder.CreateBox(handle.uniqueName, this.params, this.scene);
                    this.standardMeshSetup();
                    this.handle.babylonMesh.scaling = new babylonjs_3.Vector3(cmd.x, cmd.y, 0.1);
                    this.handle.babylonMesh.rotate(new babylonjs_3.Vector3(1, 0, 0), Math.PI / 2);
                    this.handle.babylonMesh.position.y -= 0.5; // move to match cube footprint
                    // floor has mass 0, always passive (set up Impostor, no callback)
                    this.handle.mass = 0;
                    this.impostorString = 'BoxImpostor';
                    this.createPhysicsImpostor();
                    this.handle.babylonMesh.material.dispose(); // get rid of the standard material
                    let gridMaterial = new babylonjs_materials_1.GridMaterial('grid', this.scene);
                    gridMaterial.gridRatio = 1 / cmd.x;
                    gridMaterial.majorUnitFrequency = cmd.major;
                    if (handle.babylonMesh instanceof babylonjs_3.Mesh) { // typeguard
                        handle.babylonMesh.material = gridMaterial;
                    }
                    else
                        console.error('should be Mesh');
                    // this.setupCollider()
                }
            };
            exports_5("Floor", Floor);
        }
    };
});
//  BABYLON.SceneLoader.Append("https://rawgit.com/KhronosGroup/glTF-Sample-Models/master/2.0/Duck/glTF-Draco/", "Duck.gltf", scene, function (scene) {
System.register("backend/babylon", ["babylonjs", "frontend/utilities", "babylonjs-materials", "babylonjs-gui", "middle/tween", "middle/babyengine", "frontend/babything", "backend/things"], function (exports_6, context_6) {
    "use strict";
    var babylonjs_5, utilities_1, babylonjs_6, babylonjs_7, babylonjs_8, babylonjs_materials_2, babylonjs_gui_1, tween_1, babyengine_3, babything_3, things_1, babylonjs_9, consoleRed, consoleYellow, consoleBlue, Babylon;
    var __moduleName = context_6 && context_6.id;
    return {
        setters: [
            function (babylonjs_5_1) {
                babylonjs_5 = babylonjs_5_1;
                babylonjs_6 = babylonjs_5_1;
                babylonjs_7 = babylonjs_5_1;
                babylonjs_8 = babylonjs_5_1;
                babylonjs_9 = babylonjs_5_1;
            },
            function (utilities_1_1) {
                utilities_1 = utilities_1_1;
            },
            function (babylonjs_materials_2_1) {
                babylonjs_materials_2 = babylonjs_materials_2_1;
            },
            function (babylonjs_gui_1_1) {
                babylonjs_gui_1 = babylonjs_gui_1_1;
            },
            function (tween_1_1) {
                tween_1 = tween_1_1;
            },
            function (babyengine_3_1) {
                babyengine_3 = babyengine_3_1;
            },
            function (babything_3_1) {
                babything_3 = babything_3_1;
            },
            function (things_1_1) {
                things_1 = things_1_1;
            }
        ],
        execute: function () {//  BABYLON.SceneLoader.Append("https://rawgit.com/KhronosGroup/glTF-Sample-Models/master/2.0/Duck/glTF-Draco/", "Duck.gltf", scene, function (scene) {
            consoleRed = 'background-color:red;color:white;';
            consoleYellow = 'background-color:yellow;color:black;';
            consoleBlue = 'background-color:blue;color:white;';
            Babylon = class Babylon {
                constructor(babyEngine) {
                    this.isCameraSet = false; // if the user doesn't set a camera, then we have to
                    this.playerNumber = 0; // eventually multiplayer
                    // light2: HemisphericLight
                    this.gravityVector = new babylonjs_5.Vector3(0, -9.81, 0);
                    this.canvas = document.getElementById('renderCanvas');
                    this.engine = new babylonjs_5.Engine(this.canvas, true);
                    this.scene = new babylonjs_5.Scene(this.engine);
                    this.scene.ambientColor = new babylonjs_5.Color3(0.3, 0.3, 0.3);
                    // this.camera() //'arcRotate', this.origin, 20, 10, 20)   // default camera
                    // this.camera = new ArcRotateCamera('Camera', 0, 0, 15, new Vector3(0, -5, 0), this.scene)
                    // this.camera.setPosition(new Vector3(5, 20, -20))
                    // this.camera.attachControl(this.canvas, true)       // attach the camera to the canvas
                    this.babyEngine = babyEngine;
                    const light = new babylonjs_7.DirectionalLight('DirLight', new babylonjs_5.Vector3(0, -0.5, -1.0), this.scene);
                    light.position = new babylonjs_5.Vector3(20, 150, 70);
                    light.position = new babylonjs_5.Vector3(2, 15, 70);
                    // var light2 = new DirectionalLight("dir02", new Vector3(-1, 0.5, 0), this.scene);
                    // light2.position = new Vector3(0, -70, -70)
                    // light2.setDirectionToTarget(Vector3.Zero())
                    new babylonjs_7.HemisphericLight('HemiLight', new babylonjs_5.Vector3(0, 1, 0), this.scene);
                    this.scene.ambientColor = new babylonjs_5.Color3(0.3, 0.3, 0.3);
                    this.advancedTexture = babylonjs_gui_1.AdvancedDynamicTexture.CreateFullscreenUI('UI');
                    this.enableAmmo();
                    babyengine_3.BabyEngine.physicsViewer = new babylonjs_8.PhysicsViewer(this.scene);
                    babyengine_3.BabyEngine.physicsHelper = new babylonjs_8.PhysicsHelper(this.scene);
                    // this.physicsPlugin.setTimeStep(1)
                    // this.physicsPlugin.setFixedTimeStep(1)
                    // this.scene.enablePhysics(null, new BABYLON.AmmoJSPlugin());
                    // var physicsEngine = scene.getPhysicsEngine();
                    // physicsEngine.setSubTimeStep(100);
                    this.scene.onKeyboardObservable.add((kbInfo) => {
                        switch (kbInfo.type) {
                            case BABYLON.KeyboardEventTypes.KEYDOWN:
                                console.log("KEY DOWN: ", kbInfo.event.key);
                                break;
                            case BABYLON.KeyboardEventTypes.KEYUP:
                                console.log("KEY UP: ", kbInfo.event.keyCode);
                                break;
                        }
                    });
                    // this.scene.onPointerDown = function castRay() {
                    //     var ray = this.scene.createPickingRay(this.scene.pointerX, this.scene.pointerY, Matrix.Identity(), this.camera);
                    //     var hit = this.scene.pickWithRay(ray);
                    //     console.log('HIT', hit.pickedMesh.name)
                    // }
                    // babylon pointer events
                    this.scene.onPointerObservable.add((pointerInfo) => {
                        switch (pointerInfo.type) {
                            case BABYLON.PointerEventTypes.POINTERDOWN:
                                console.log("POINTER DOWN");
                                var ray = this.scene.createPickingRay(this.scene.pointerX, this.scene.pointerY, babylonjs_5.Matrix.Identity(), this.camera);
                                var hit = this.scene.pickWithRay(ray);
                                if (hit.pickedMesh !== null) { // did we hit a mesh?
                                    babyengine_3.BabyEngine.shapeMap.forEach(shape => {
                                        if (hit.pickedMesh === shape.babylonMesh) {
                                            babyengine_3.BabyEngine.notifyObservers(`click.${shape.uuid}`);
                                            console.log('notifying observer', `click.${shape.uuid}`);
                                        }
                                    });
                                }
                                break;
                            case BABYLON.PointerEventTypes.POINTERUP:
                                console.log("POINTER UP");
                                break;
                            case BABYLON.PointerEventTypes.POINTERMOVE:
                                console.log("POINTER MOVE");
                                break;
                            case BABYLON.PointerEventTypes.POINTERWHEEL:
                                console.log("POINTER WHEEL");
                                break;
                            case BABYLON.PointerEventTypes.POINTERPICK:
                                console.log("POINTER PICK");
                                break;
                            case BABYLON.PointerEventTypes.POINTERTAP:
                                console.log("POINTER TAP");
                                break;
                            case BABYLON.PointerEventTypes.POINTERDOUBLETAP:
                                console.log("POINTER DOUBLE-TAP");
                                break;
                        }
                    });
                    // get the render engine running...
                    this.runRenderStep();
                }
                async enableAmmo() {
                    // await Ammo()
                    this.physicsPlugin = new babylonjs_8.AmmoJSPlugin();
                    this.scene.enablePhysics(this.gravityVector, this.physicsPlugin);
                }
                createBabylonMesh(cmd, handle) {
                    // babylon's inspector likes to have a unique name for each mesh
                    // use default size, position, and orientation
                    // physics types...
                    //    PhysicsImpostor.SphereImpostor;
                    //    PhysicsImpostor.BoxImpostor;
                    //    PhysicsImpostor.PlaneImpostor;
                    //    PhysicsImpostor.MeshImpostor;
                    //    PhysicsImpostor.CylinderImpostor;
                    //    PhysicsImpostor.ParticleImpostor;
                    //    PhysicsImpostor.HeightmapImpostor;
                    //    PhysicsImpostor.ConvexHullImpostor;
                    // physics parameters...
                    // export interface PhysicsImpostorParameters {
                    //     mass: number;    // zero is good for floors
                    //     friction?: number;
                    //     restitution?: number;
                    //     nativeOptions?: any;
                    //     ignoreParent?: boolean;
                    //     disableBidirectionalTransformation?: boolean;
                    // }
                    // let x = ammo // just making sure it gets imported
                    // let y = AmmoJSPlugin
                    // let f = fs.Stats //      "
                    // eslint-disable-next-line @typescript-eslint/ban-types
                    let gridMaterial; // because can't declare it in a switch
                    let thing;
                    switch (cmd.model) {
                        case 'cube':
                            thing = new things_1.Cube(cmd, handle, this.scene);
                            break;
                        case 'sphere':
                            thing = new things_1.Sphere(cmd, handle, this.scene);
                            break;
                        case 'cylinder':
                            thing = new things_1.Cylinder(cmd, handle, this.scene);
                            break;
                        case 'cone':
                            thing = new things_1.Cone(cmd, handle, this.scene);
                            break;
                        case 'capsule':
                            thing = new things_1.Capsule(cmd, handle, this.scene);
                            break;
                        case 'torus':
                            thing = new things_1.Torus(cmd, handle, this.scene);
                            break;
                        case 'point': // really a VERY SMALL sphere, but colliders, etc still work
                            thing = new things_1.Point(cmd, handle, this.scene);
                            break;
                            // bottom = new TransformNode('tn.000', this.scene)
                            // top = new TransformNode('tn.001', this.scene)
                            // bottom.position = handle.babylonMesh.position
                            // handle.babylonMesh.setParent(bottom)
                            // top.position = handle.babylonMesh.position
                            // handle.babylonMesh.setParent(top)
                            break;
                        case 'floor':
                            thing = new things_1.Floor(cmd, handle, this.scene);
                            break;
                        default:
                            console.assert(false, `Did not expect model '${cmd.model}'`);
                            throw ('stop');
                    }
                    // default values for a new entity
                    // this.material.specularColor = new Color3(0.5, 0.6, 0.87)
                    // this.material.emissiveColor = new Color3(1, 1, 1)
                    // this.material.ambientColor = new Color3(0.23, 0.98, 0.53)
                    // this.material.alpha = 0.5
                    // console.log('%ccreating box', consoleYellow)
                    if (thing.handle.babylonMesh instanceof babylonjs_5.Mesh) { // typeguard
                        // otherwise mass is zero
                        if (cmd.collider !== 'ghost') {
                            let visible = this.scene.debugLayer.isVisible();
                            thing.setupCollider();
                            // only ACTIVE shapes get callbacks.  of course we could collide with another active shape
                            if (cmd.collider == 'active') {
                                thing.handle.babylonMesh.physicsImpostor
                                    .registerOnPhysicsCollide(babyengine_3.BabyEngine.impostors, (a, b) => {
                                    this.onCollisionHelper(a, b);
                                });
                            }
                        }
                    }
                }
                setCamera(cmd, handle) {
                    // let position = new Vector3(5, cmd.heightOffset, -cmd.heightOffset)
                    // let position = new Vector3(5, cmd.distance, -cmd.heightOffset)
                    const position = new babylonjs_5.Vector3(5, 20, -20);
                    // do we already have a camera
                    if (this.isCameraSet) {
                        this.scene.detachControl();
                    }
                    this.isCameraSet = true; // 
                    console.log('cmd', cmd);
                    switch (cmd.model) {
                        // case 'orthocamera':
                        //     // this.camera = new FreeCamera("camera1", new Vector3(0, 100, 0), this.scene);
                        //     this.camera = new ArcRotateCamera('Camera', 0, 0, 15, new Vector3(0, -5, 0), this.scene)
                        //     this.camera.setTarget(Vector3.Zero());
                        //     // this.camera.attachControl();    //Not needed unless debuging in camera or for some other reason.            
                        //     this.camera.mode = BABYLON.Camera.ORTHOGRAPHIC_CAMERA;
                        //     this.camera.setPosition(new Vector3(0, 20, 0))
                        //     break
                        case 'fly':
                        case 'follow':
                        case 'universal':
                        case 'arcRotate':
                            // if (this.camera instanceof ArcRotateCamera) {  // typeguard
                            // handle.babylonMesh = new ArcRotateCamera('Camera', 0, 0, 15, new Vector3(0, -5, 0), this.scene)
                            // this.camera.setPosition(new Vector3(5, 20, -20))
                            // handle.babylonMesh = this.camera
                            let thing = new things_1.CameraThing(cmd, handle, this.scene);
                            break;
                            // // default camera
                            // const camera = new ArcRotateCamera('Camera', 0, 0, 15, new Vector3(-0, -5, 0), this.scene)
                            // camera.setPosition(new Vector3(5, 20, -20))
                            // camera.minZ = 5.0
                            // camera.attachControl(this.canvas, true)
                            // case 'follow':
                            //     this.camera = new FollowCamera("FollowCam", position, this.scene);
                            //     this.camera.radius = cmd.distance
                            //     this.camera.heightOffset = cmd.heightOffset
                            //     // The goal rotation of camera around local origin (centre) of target in x y plane
                            //     this.camera.rotationOffset = cmd.rotation  // in degrees?
                            //     // Acceleration of camera in moving from current to goal position
                            //     this.camera.cameraAcceleration = 0.05
                            //     // The speed at which acceleration is halted
                            //     this.camera.maxCameraSpeed = 10
                            //     break
                            break;
                        default:
                            console.error('%cdid not expect camera of type ' + cmd.cameraType, consoleRed);
                    }
                    // handle.babylonMesh = this.camera
                    handle.type = 'camera';
                }
                setOrthographic(cmd, handle) {
                    if (handle.babylonMesh instanceof babylonjs_6.Camera) { // typeguard
                        handle.babylonMesh.mode = BABYLON.Camera.ORTHOGRAPHIC_CAMERA;
                        handle.babylonMesh.orthoTop = cmd.size;
                        handle.babylonMesh.orthoBottom = -cmd.size;
                        handle.babylonMesh.orthoLeft = -cmd.size;
                        handle.babylonMesh.orthoRight = cmd.size;
                    }
                    else {
                        console.log('should be camera', handle);
                        console.error('should be Camera');
                    }
                }
                impostorLookup(a) {
                    let result = null; // but we expect we will find it
                    babyengine_3.BabyEngine.shapeMap.forEach((handle) => {
                        if (handle.babylonMesh instanceof babylonjs_5.Mesh) { // typeguard
                            if (handle.babylonMesh.physicsImpostor === a)
                                result = handle;
                        }
                    });
                    console.assert(result !== null, "how can we NOT find this impostor?");
                    return result;
                }
                /** if Ammo tells us a collision happened, this cleans up and notifies the parties */
                onCollisionHelper(a, b) {
                    if (a === b) { // sometimes we seem to collide with ourselves ?!?
                        // console.log('%cA and B are === - we collided with ourself',consoleRed)
                        return;
                    }
                    // lookup the uuid for a and b, and send BOTH a message
                    let aMesh = null;
                    let aMeshHandle = null;
                    let bMesh = null;
                    let bMeshHandle = null;
                    babyengine_3.BabyEngine.shapeMap.forEach((mesh) => {
                        if (mesh.babyShape instanceof babylonjs_5.Mesh) { // typeguard
                            if (mesh.model == 'camera')
                                return; // no camera collisions yet
                            if (mesh.model == 'button')
                                return; // no camera collisions yet
                            // we only allow a shape to collide once every 100ms
                            // console.log(mesh.babylonMesh.physicsImpostor)
                            if (mesh.babylonMesh instanceof babylonjs_5.Mesh) { // typeguard
                                if (typeof mesh.babylonMesh.physicsImpostor === 'object' &&
                                    mesh.lastCollisionTime < (Date.now() - 10)) {
                                    if (mesh.babylonMesh.physicsImpostor === a) {
                                        aMesh = mesh.babyShape; // get the babyShape for this mesh
                                        aMeshHandle = mesh;
                                    }
                                    if (mesh.babylonMesh.physicsImpostor === b) {
                                        bMesh = mesh.babyShape;
                                        bMeshHandle = mesh;
                                    }
                                }
                            }
                        }
                    });
                    // ok, did we get TWO shapes?  (many reasons we might not)
                    if (aMesh !== null && bMesh !== null) {
                        // signal both that they hit each other... likely only one is listening
                        babyengine_3.BabyEngine.notifyObservers(`collide.${aMesh.uuid}`, bMesh);
                        babyengine_3.BabyEngine.notifyObservers(`collide.${bMesh.uuid}`, aMesh);
                        // this is a small debounce.  neither will hit for 100th of a second
                        aMeshHandle.lastCollisionTime = Date.now();
                        bMeshHandle.lastCollisionTime = Date.now();
                        // aMesh.collideCallback(bMesh) // set by .onCollide()
                        // bMesh.collideCallback(aMesh)
                    }
                }
                importShape(cmd, handle) {
                    console.log('in importShape');
                    throw ('in importShape');
                    let babylonMesh;
                    // The first parameter can be used to specify which mesh to import. Here we import all meshes
                    babylonjs_5.SceneLoader.ImportMesh('', 'assets/', 'TinkerCraft.glb', this.scene, (newMeshes) => {
                        console.log(newMeshes);
                        babylonMesh = newMeshes[0];
                    });
                }
                dispose(cmd, handle) {
                    console.assert(typeof handle === 'object', "trying to dispose of something, but can't find it.  already gone?");
                    handle.cleanBeforeDispose();
                    handle.babylonMesh.dispose(); // gets rid of all the contents
                    // but still have the handle around 
                    // console.log('disposing of ', handle)
                    babyengine_3.BabyEngine.shapeMap.delete(handle.uuid);
                }
                addSkeleton(cmd, handle) {
                    console.log('addSkeleton');
                }
                attachTo(cmd, handle) {
                    console.log('arrived in attache to');
                    const otherHandle = babyengine_3.BabyEngine.shapeMap.get(cmd.otherUuid);
                }
                addAxes(cmd, handle) {
                    const size = 2;
                    const shade = 0;
                    const pilot_local_axisX = babylonjs_5.Mesh.CreateLines('pilot_local_axisX', [
                        babylonjs_5.Vector3.Zero(), new babylonjs_5.Vector3(size, 0, 0), new babylonjs_5.Vector3(size * 0.95, 0.05 * size, 0),
                        new babylonjs_5.Vector3(size, 0, 0), new babylonjs_5.Vector3(size * 0.95, -0.05 * size, 0)
                    ]);
                    pilot_local_axisX.color = new babylonjs_5.Color3(1, shade, shade);
                    const pilot_local_axisY = babylonjs_5.Mesh.CreateLines('pilot_local_axisY', [
                        babylonjs_5.Vector3.Zero(), new babylonjs_5.Vector3(0, size, 0), new babylonjs_5.Vector3(-0.05 * size, size * 0.95, 0),
                        new babylonjs_5.Vector3(0, size, 0), new babylonjs_5.Vector3(0.05 * size, size * 0.95, 0)
                    ]);
                    pilot_local_axisY.color = new babylonjs_5.Color3(shade, 1, shade);
                    const pilot_local_axisZ = babylonjs_5.Mesh.CreateLines('pilot_local_axisZ', [
                        babylonjs_5.Vector3.Zero(), new babylonjs_5.Vector3(0, 0, size), new babylonjs_5.Vector3(0, -0.05 * size, size * 0.95),
                        new babylonjs_5.Vector3(0, 0, size), new babylonjs_5.Vector3(0, 0.05 * size, size * 0.95)
                    ]);
                    pilot_local_axisZ.color = new babylonjs_5.Color3(shade, shade, 1);
                    // var local_origin = MeshBuilder.CreateBox("local_origin", {size:1});
                    // local_origin.isVisible = false;
                    pilot_local_axisX.parent = handle.babylonMesh;
                    pilot_local_axisY.parent = handle.babylonMesh;
                    pilot_local_axisZ.parent = handle.babylonMesh;
                    // return local_origin;
                }
                collide(cmd, handle) {
                    // in every case, if there are already impostors then remove them
                    if (handle.babylonMesh instanceof babylonjs_5.Mesh) { // typeguard, only shapes, not cameras or points
                        if (handle.babylonMesh.physicsImpostor !== undefined) {
                            // first step - remove the old impostor from the global list of impostors, and dispose of it
                            babyengine_3.BabyEngine.impostors.splice(babyengine_3.BabyEngine.impostors.findIndex(e => {
                                if (handle.babylonMesh instanceof babylonjs_5.Mesh) { // typeguard
                                    e === handle.babylonMesh.physicsImpostor;
                                }
                            }), 1);
                            handle.babylonMesh.physicsImpostor.dispose();
                        }
                        if (handle.babylonMesh instanceof babylonjs_5.Mesh) { // typeguard
                            switch (cmd.collider) {
                                case 'none':
                                    handle.babylonMesh.physicsImpostor = null; // doesn't really do anything
                                    break;
                                case 'solid':
                                case 'active':
                                    // TODO decide whether box or ball...
                                    // TODO that's why we need a shape obect - abstractShapes.ts
                                    handle.babylonMesh.physicsImpostor = new babylonjs_9.PhysicsImpostor(handle.babylonMesh, babylonjs_9.PhysicsImpostor.BoxImpostor, { mass: handle.mass, restitution: handle.restitution }, this.scene);
                                    if (this.scene.debugLayer.isVisible()) {
                                        babyengine_3.BabyEngine.physicsViewer.showImpostor(handle.babylonMesh.physicsImpostor);
                                    }
                                    // and push the new resized back on the global list of impostors
                                    babyengine_3.BabyEngine.impostors.push(handle.babylonMesh.physicsImpostor);
                                    // finally, register any hits against this shape
                                    handle.babylonMesh.physicsImpostor.registerOnPhysicsCollide(babyengine_3.BabyEngine.impostors, (a, b) => {
                                        this.onCollisionHelper(a, b);
                                    });
                                    break;
                                case 'active':
                                    break;
                            }
                        }
                        else
                            console.error('collisions only for Mesh');
                    }
                }
                setColor(cmd, handle) {
                    // console.log(`setting ${handle.uuid} to ${cString}  ${color.toHexString()}`)
                    // handle.material.dispose()   // let go of the old material
                    // handle.material = new StandardMaterial('', this.scene)
                    if (cmd.colorD !== '' && 'diffuseColor' in handle.material) { // not all colors have diffuseColor
                        handle.material.diffuseColor = utilities_1.HTMLColor(cmd.colorD);
                        handle.diffuseColor = utilities_1.HTMLColor(cmd.colorD); // for lines and stuff
                    }
                    if (cmd.colorA !== '' && 'ambientColor' in handle.material) { // not all colors have diffuseColor
                        handle.material.ambientColor = utilities_1.HTMLColor(cmd.colorA);
                    }
                    if (cmd.colorE !== '' && 'emissiveColor' in handle.material) { // not all colors have diffuseColor
                        handle.material.emissiveColor = utilities_1.HTMLColor(cmd.colorE);
                    }
                    if (cmd.colorS !== '' && 'specularColor' in handle.material) { // not all colors have diffuseColor
                        handle.material.specularColor = utilities_1.HTMLColor(cmd.colorE);
                    }
                    // this.material.alpha = 0.5  // do we care?
                    // handle.babylonMesh.material = handle.material
                }
                setTexture() {
                    //     var myMaterial = new BABYLON.StandardMaterial("myMaterial", scene);
                    // myMaterial.diffuseTexture = new BABYLON.Texture("PATH TO IMAGE", scene);
                    // myMaterial.specularTexture = new BABYLON.Texture("PATH TO IMAGE", scene);
                    // myMaterial.emissiveTexture = new BABYLON.Texture("PATH TO IMAGE", scene);
                    // myMaterial.ambientTexture = new BABYLON.Texture("PATH TO IMAGE", scene);
                    // mesh.material = myMaterial;
                }
                /// ///////////////////////////////////////////////////////
                // if you want to do old-school getPosition / setPosition, here it is
                /// ///////////////////////////////////////////////////////
                setPosition(cmd, handle) {
                    handle.babylonMesh.position = new babylonjs_5.Vector3(cmd.x, cmd.y, cmd.z);
                }
                addToPosition(cmd, handle) {
                    handle.babylonMesh.position = handle.babylonMesh.position.addInPlace(new babylonjs_5.Vector3(cmd.x, cmd.y, cmd.z));
                }
                setRotation(cmd, handle) {
                    console.log('setRotation()', cmd);
                    if (handle.babylonMesh instanceof babylonjs_5.Mesh) { // typeguard
                        handle.babylonMesh.setDirection(new babylonjs_5.Vector3(cmd.x, cmd.y, cmd.z));
                    }
                    else {
                        //TODO rotation for camera
                        console.error('missing rotation for camera');
                    }
                }
                addToRotation(cmd, handle) {
                    if (handle.babylonMesh instanceof babylonjs_5.Mesh) { // typeguard
                        handle.babylonMesh.rotation.x += cmd.x;
                        handle.babylonMesh.rotation.y += cmd.y;
                        handle.babylonMesh.rotation.z += cmd.z;
                    }
                    else {
                        //TODO rotation for camera
                        console.error('missing rotation for camera');
                    }
                }
                /// ///////////////////////////////////////////////////////
                setScale(cmd, handle) {
                    if (handle.babylonMesh instanceof babylonjs_5.Mesh) { // typeguard
                        handle.babylonMesh.scaling = new babylonjs_5.Vector3(cmd.x, cmd.y, cmd.z);
                    }
                    else {
                        console.error('setScale only for Mesh');
                    }
                }
                // setGrid(gridRatio: number = 0.1, majorUnitFrequency: number = 2, lineColor: string = "White"): Entity {
                setGrid(cmd, handle) {
                    const grid = new babylonjs_materials_2.GridMaterial('grid', this.scene);
                    grid.gridRatio = cmd.gridRatio;
                    grid.majorUnitFrequency = cmd.major;
                    grid.mainColor = utilities_1.HTMLColor(cmd.colorD); // in case we set color before material
                    grid.lineColor = utilities_1.HTMLColor(cmd.lineColor);
                    handle.material.dispose(); // let go of the old material
                    handle.material = grid;
                }
                /// ////////////////////////////////
                ///  Alice Functions
                /// ////////////////////////////////
                // use ROTATION, not QUATERNION, then move in
                // forward / backward direction like so....
                // box.locallyTranslate(new BABYLON.Vector3(5,0 , 0));
                // box.locallyTranslate(new BABYLON.Vector3(-5,0 , 0));
                // to move in circle around a point, see https://doc.babylonjs.com/how_to/transformnode
                move(cmd, tween, handle) {
                    console.assert(cmd !== undefined, 'cmd missing');
                    console.assert(tween !== undefined, 'tween missing');
                    console.assert(handle !== undefined, 'handle missing');
                    // direction: 'forward' | 'backward' | 'left' | 'right' | 'up' | 'down',
                    // distance: number,
                    // duration = 1,
                    // animate: "Begin And End Normally" | "Begin Slow, End Fast" | "Begin Fast, End Slow" | "Begin And End Fast" | "Begin And End Slow" = "Begin And End Normally") {
                    // console.log('move()', handle.babylonMesh.position)
                    const v = new babylonjs_5.Vector3(0, 0, 0);
                    switch (cmd.direction) {
                        case 'forward':
                            v.z = cmd.distance;
                            break;
                        case 'backward':
                            v.z = -cmd.distance;
                            break;
                        case 'left':
                            v.x = -cmd.distance;
                            break;
                        case 'right':
                            v.x = cmd.distance;
                            break;
                        case 'down':
                            v.y = -cmd.distance;
                            break;
                        case 'up':
                            v.y = cmd.distance;
                            break;
                        default:
                            console.assert(false, `did not expect '${cmd.direction}'`);
                    }
                    // i could have created vNormal as v.divide(cmd.distance)
                    // figure out where we would be by using a transform node
                    // set it to the same position and orientation as the mesh
                    // tNode.position = handle.babylonMesh.position.clone()
                    // handle.babylonMesh.parent = tNode
                    // tNode.setDirection(handle.babylonMesh.getDirection(Vector3.Zero()))
                    // tNode.locallyTranslate(v)
                    const tNode = new babylonjs_8.TransformNode('', this.scene, false); // don't add to scene
                    let endPosition;
                    let vNormal;
                    let babylonThing;
                    babylonThing = handle.babylonMesh;
                    if (handle.babylonMesh instanceof babylonjs_5.Mesh) { // typeguard
                        tNode.position = handle.babylonMesh.position.clone();
                        tNode.setDirection(handle.babylonMesh.getDirection(babylonjs_5.Vector3.Zero()));
                        tNode.locallyTranslate(v);
                        endPosition = tNode.position;
                        vNormal = tNode.position.clone().subtract(babylonThing.position).normalize();
                        // v already has +/- distance on the axis, so axis should just be positive
                        vNormal.x = Math.abs(vNormal.x) * (1 / handle.babylonMesh.scaling.x);
                        vNormal.y = Math.abs(vNormal.y) * (1 / handle.babylonMesh.scaling.y);
                        vNormal.z = Math.abs(vNormal.z) * (1 / handle.babylonMesh.scaling.z);
                    }
                    else {
                        endPosition = babylonThing.position.clone().add(v); // can't use tNode for camera
                    }
                    // move() has to work for meshs, cameras, and lights, but only shapes has scaling
                    // console.log('moving from ', babylonThing.position, ' to ', tNode.position)
                    console.assert(babylonThing.position instanceof babylonjs_5.Vector3, 'Expecting a Vector3 at Move()');
                    // console.log(`%c tween.start ${handle.type}`, consoleRed, handle.babylonMesh.position, endPosition,handle)
                    tween.start('move', babylonThing.position.clone(), // start
                    endPosition, // end
                    cmd.timestamp, cmd.duration, cmd.animate, (value) => {
                        // in 'local space', distances depend on your scaling
                        // we translate them back to world-relative distances
                        if (handle.babylonMesh instanceof babylonjs_5.Mesh) { // typeguard
                            value.x *= (1 / handle.babylonMesh.scaling.x);
                            value.y *= (1 / handle.babylonMesh.scaling.y);
                            value.z *= (1 / handle.babylonMesh.scaling.z);
                            // console.log(handle.uuid,'value',value,'vNormal',vNormal)
                            handle.babylonMesh.translate(vNormal, value.x, babylonjs_5.Space.LOCAL);
                            handle.babylonMesh.translate(vNormal, value.y, babylonjs_5.Space.LOCAL);
                            handle.babylonMesh.translate(vNormal, value.z, babylonjs_5.Space.LOCAL);
                            handle.maybeAddLineSegment(); // if penDown, then need a line
                        }
                        else {
                            // there's something horrible going on with typescript's type system
                            let newPosition = handle.babylonMesh.position.clone().add(value);
                            let c = handle.babylonMesh;
                            c.setPosition(newPosition);
                            // console.log('%cMoving Camera, now at', consoleBlue, handle.babylonMesh.position)
                        }
                    });
                    tNode.dispose();
                }
                moveToward(cmd, tween, handle) {
                    // otherUuid: number
                    // distance: number,
                    // duration = 1,
                    // animate: "Begin And End Normally" | "Begin Slow, End Fast" | "Begin Fast, End Slow" | "Begin And End Fast" | "Begin And End Slow" = "Begin And End Normally") {
                    // get direction towards babylonjs entity that we are moving toward
                    const otherHandle = babyengine_3.BabyEngine.shapeMap.get(cmd.otherUuid);
                    const axis = otherHandle.babylonMesh.position.clone().subtract(handle.babylonMesh.position);
                    // now calculate our endpoint
                    const tNode = new babylonjs_8.TransformNode('', this.scene, false); // don't add to scene
                    tNode.position = otherHandle.babylonMesh.position.clone();
                    tNode.translate(axis.normalize(), cmd.distance, babylonjs_5.Space.WORLD);
                    tween.start('move', handle.babylonMesh.position.clone(), // start
                    otherHandle.babylonMesh.position.clone(), //tNode.position.clone(), // end
                    cmd.timestamp, cmd.duration, cmd.animate, (value) => {
                        handle.babylonMesh.position.x += value.x;
                        handle.babylonMesh.position.y += value.y;
                        handle.babylonMesh.position.z += value.z;
                    });
                    tNode.dispose();
                }
                moveToZero(cmd, tween, handle) {
                    let start = handle.babylonMesh.position.clone();
                    tween.start('move', start, // start
                    new babylonjs_5.Vector3(0, 0, 0), // end
                    cmd.timestamp, cmd.duration, cmd.animate, (value) => {
                        if (handle.babylonMesh instanceof babylonjs_5.Mesh) { // typeguard
                            handle.babylonMesh.position.x += value.x;
                            handle.babylonMesh.position.y += value.y;
                            handle.babylonMesh.position.z += value.z;
                        }
                        else {
                            handle.babylonMesh.position.addInPlace(value);
                            // handle.babylonCamera.position.x += value.x
                            // handle.babylonCamera.position.y += value.y
                            // handle.babylonCamera.position.z += value.z
                        }
                    });
                }
                // standard setup tween handler for all the 'move' commands
                moveSetupTween(cmd, tween, handle, start, end) {
                    // console.log(`moveSetupTween()`, start, end)
                    tween.start('move', start, end, cmd.timestamp, cmd.duration, cmd.animate, (value) => {
                        // handle.babylonMesh.translate(new Vector3(1, 0, 0), value.x, Space.WORLD)
                        // handle.babylonMesh.translate(new Vector3(0, 1, 0), value.y, Space.WORLD)
                        // handle.babylonMesh.translate(new Vector3(0, 0, 1), value.z, Space.WORLD)
                        handle.babylonMesh.position.x += value.x;
                        handle.babylonMesh.position.y += value.y;
                        handle.babylonMesh.position.z += value.z;
                        // console.log('delta ',handle.uuid,value)
                    });
                }
                turn(cmd, tween, handle) {
                    // towards: 'forward' | 'backward' | 'left' | 'right' | 'tiltLeft' | 'tiltRight'
                    // angle: number // 1 is full turn (360 degrees / 2PI radians)
                    // duration: duration,
                    // animate: animate
                    let alpha = 0; // amount to turn
                    let beta = 0;
                    let gamma = 0;
                    let axis;
                    const angle = cmd.angle * Math.PI * 2; // angle of 1 is a full rotation
                    switch (cmd.towards) {
                        case 'right':
                            axis = babylonjs_5.Vector3.Right();
                            beta = angle;
                            break;
                        case 'left':
                            axis = babylonjs_5.Vector3.Right();
                            beta = -angle;
                            break;
                        case 'backward':
                            axis = babylonjs_5.Vector3.Up();
                            alpha = -angle;
                            break;
                        case 'forward':
                            axis = babylonjs_5.Vector3.Up();
                            alpha = angle;
                            break;
                        case 'tiltRight':
                            axis = babylonjs_5.Vector3.Forward();
                            gamma = -angle;
                            break;
                        case 'tiltLeft':
                            axis = babylonjs_5.Vector3.Forward();
                            gamma = angle;
                            break;
                        default:
                            console.assert(false, `did not expect turn direction '${cmd.direction}'`);
                    }
                    let current;
                    if (handle.babylonMesh instanceof babylonjs_5.Mesh) { // typeguard
                        current = handle.babylonMesh.rotation.clone(); // clone() is VERY important
                    }
                    else {
                        current = babylonjs_5.Vector3.Zero();
                    }
                    tween.start('turn', current, // start
                    new babylonjs_5.Vector3(current.x + alpha, current.y + beta, current.z + gamma), // end
                    cmd.timestamp, cmd.duration, cmd.animate, (value) => {
                        if (handle.babylonMesh instanceof babylonjs_5.Mesh) { // typeguard
                            handle.babylonMesh.addRotation(value.x, 0, 0).addRotation(0, value.y, 0).addRotation(0, 0, value.z);
                        }
                        else {
                            //TODO trn for camera
                            console.error('Missing turn for camera');
                        }
                    });
                }
                moveAndTurn(cmd, tween, handle) {
                    // direction: 'forward' | 'backward' | 'left' | 'right' | 'up' | 'down',
                    // distance: number,
                    // towards: 'forward' | 'backward' | 'left' | 'right' | 'tiltLeft' | 'tiltRight'
                    // angle: number // 1 is full turn (360 degrees / 2PI radians)
                    // duration: duration,
                    // animate: animate
                    // we create TWO tweens, but they are exactly the same length so
                    // the turn one doesn't need a promise.  it's like:
                    //  turn(somethiing).move(something)  [.done()]
                    // the move part....
                    const v = new babylonjs_5.Vector3(0, 0, 0);
                    switch (cmd.direction) {
                        case 'forward':
                            v.z = cmd.distance;
                            break;
                        case 'backward':
                            v.z = -cmd.distance;
                            break;
                        case 'left':
                            v.x = -cmd.distance;
                            break;
                        case 'right':
                            v.x = cmd.distance;
                            break;
                        case 'down':
                            v.y = -cmd.distance;
                            break;
                        case 'up':
                            v.y = cmd.distance;
                            break;
                        default:
                            console.assert(false, `did not expect '${cmd.direction}'`);
                    }
                    // figure out where we would be by using a transform node
                    const tNode = new babylonjs_8.TransformNode('', this.scene, false); // don't add to scene
                    // set it to the same position and orientation as the mesh
                    console.log('babylon mesh', handle.babylonMesh.position.clone());
                    tNode.position = handle.babylonMesh.position.clone();
                    tNode.locallyTranslate(v);
                    tween.start('move', handle.babylonMesh.position.clone(), // start
                    tNode.position.clone(), // end
                    cmd.timestamp, cmd.duration, cmd.animate, (value) => {
                        if (handle.babylonMesh instanceof babylonjs_5.Mesh) { // typeguard
                            handle.babylonMesh.translate(new babylonjs_5.Vector3(1, 0, 0), value.x, babylonjs_5.Space.WORLD);
                            handle.babylonMesh.translate(new babylonjs_5.Vector3(0, 1, 0), value.y, babylonjs_5.Space.WORLD);
                            handle.babylonMesh.translate(new babylonjs_5.Vector3(0, 0, 1), value.z, babylonjs_5.Space.WORLD);
                        }
                        else {
                            console.error('missing move for camera');
                        }
                    });
                    tNode.dispose();
                    /// /////////////////////////
                    // the turn part
                    let alpha, beta, gamma;
                    let axis;
                    const angle = cmd.angle * Math.PI * 2;
                    switch (cmd.towards) {
                        case 'right':
                            axis = babylonjs_5.Vector3.Right();
                            beta = angle;
                            break;
                        case 'left':
                            axis = babylonjs_5.Vector3.Right();
                            beta = -angle;
                            break;
                        case 'backward':
                            axis = babylonjs_5.Vector3.Up();
                            alpha = -angle;
                            break;
                        case 'forward':
                            axis = babylonjs_5.Vector3.Up();
                            alpha = angle;
                            break;
                        case 'tiltRight':
                            axis = babylonjs_5.Vector3.Forward();
                            gamma = -angle;
                            break;
                        case 'tiltLeft':
                            axis = babylonjs_5.Vector3.Forward();
                            gamma = angle;
                            break;
                        default:
                            console.assert(false, `did not expect '${cmd.direction}'`);
                    }
                    const turnTween = new tween_1.V3Tween('');
                    let myRotation;
                    if (handle.babylonMesh instanceof babylonjs_5.Mesh) { // typeguard
                        myRotation = handle.babylonMesh.rotation;
                    }
                    else {
                        myRotation = babylonjs_5.Vector3.Zero();
                    }
                    turnTween.start('turn', myRotation, // start
                    new babylonjs_5.Vector3(alpha, beta, gamma), // end
                    cmd.timestamp, cmd.duration, cmd.animate, (value) => {
                        if (handle.babylonMesh instanceof babylonjs_5.Mesh) { // typeguard
                            handle.babylonMesh.addRotation(value.x, 0, 0).addRotation(0, value.y, 0).addRotation(0, 0, value.z);
                        }
                        else {
                            // TODO: move and turn for camera
                        }
                    });
                }
                // turnToZero(cmd: gameCmd, tween: V3Tween, handle: MeshHandle) {
                //     const start = handle.babylonMesh.rotation // .getDirection(Vector3.Zero())  //new Vector3(0, 0, 0)
                //     // let start2 = handle.babylonMesh.getDirectionToRef()
                //     // let start3 = handle.babylonMesh.getDirectionToRef(Vector3.Zero())
                //     const end = Vector3.Zero()
                //     console.log('turnToZero', start, end)
                //     // let tNode = new TransformNode('', this.scene, false)  // don't add to scene
                //     // // // set it to the same position and orientation as the mesh
                //     // tNode.rotate(axis, angle, Space.LOCAL);
                //     this.turnSetupV3Tween(cmd, tween, handle, start, end)
                // }
                // // standard setup tween handler for all the 'turn' commands
                // turnSetupScalarTween(cmd: gameCmd, tween: ScalarTween, handle: MeshHandle, axis: Vector3, angle: number) {
                //     console.log('in turnSetupScalar', handle.babylonMesh.position, axis, angle)
                //     tween.start(
                //         'turn',
                //         0 /* start */,
                //         angle /* end */,
                //         cmd.timestamp,
                //         cmd.duration,
                //         cmd.animate,
                //         (value: number) => {
                //             handle.babylonMesh.rotate(axis, value, Space.LOCAL)
                //             const current = handle.babylonMesh.rotation
                //             const start1 = new Vector3(1, 0, 0)
                //             let start2: Vector3
                //             console.log('in turnSetupScalarStart()', handle.babylonMesh.position)
                //             // if(typeof handle.babylonMesh.position.x !== 'number')throw('stop!')
                //             // TODO: handle.babylonMesh.getDirectionToRef(start1, start2)
                //         })
                // }
                // standard setup tween handler for moveToZero,all the 'turn' commands
                turnSetupV3Tween(cmd, tween, handle, start, end) {
                    tween.start('move', start /* start */, end /* end */, cmd.timestamp, cmd.duration, cmd.animate, (value) => {
                        if (handle.babylonMesh instanceof babylonjs_5.Mesh) { // typeguard
                            handle.babylonMesh.addRotation(value.x, 0, 0).addRotation(0, value.y, 0).addRotation(0, 0, value.z);
                        }
                        else {
                            // TODO: Rotation for camera?
                        }
                    });
                }
                size(cmd, tween, handle) {
                    // x:scale3[0],
                    // y:scale3[1],
                    // z:scale3[2],
                    // duration = 1,
                    // animate: "Begin And End Normally" | "Begin Slow, End Fast" | "Begin Fast, End Slow" | "Begin And End Fast" | "Begin And End Slow" = "Begin And End Normally") {
                    // we need to change the size AND move the mesh UP so feet stay in place
                    if (handle.babylonMesh instanceof babylonjs_5.Mesh) { // typeguard
                        const currentSize = handle.babylonMesh.scaling.clone();
                        const futureSize = new babylonjs_5.Vector3(cmd.x, cmd.y, cmd.z);
                        tween.start('size', currentSize /* start */, futureSize, /* end */ cmd.timestamp, cmd.duration, cmd.animate, (value) => {
                            // console.log("size setting from", handle.babylonMesh.scaling, ' to ', value, ' with position ', handle.babylonMesh.position)
                            if (handle.babylonMesh instanceof babylonjs_5.Mesh) { // typeguard
                                handle.babylonMesh.scaling.x += /* future.x - */ value.x;
                                handle.babylonMesh.scaling.y += /* future.y - */ value.y;
                                handle.babylonMesh.scaling.z += /* future.z - */ value.z;
                            }
                            else
                                console.error('Scaling only for mesh');
                        });
                        // // now start the move
                        // const moveCmd = Object.assign(cmd) // CLONE  // move uses the same timestamp, duration, animation, etc
                        // moveCmd.action = 'move'
                        // moveCmd.direction = 'up'
                        // moveCmd.distance = (futureSize.y - currentSize.y) / 2 // get fancier later
                        // this.processGameCmd(moveCmd)
                    }
                    else
                        console.error('scaling only for mesh');
                }
                color(cmd, tween, handle) {
                    // some materials don't accept color, but they are filtered out in processGameCmd()
                    console.assert(cmd !== undefined, 'cmd missing');
                    console.assert(tween !== undefined, 'tween missing');
                    console.assert(handle !== undefined, 'handle missing');
                    console.assert(handle.babylonMesh !== undefined, 'handle.babylonMesh missing');
                    if (handle.babylonMesh instanceof babylonjs_5.Mesh) { // typeguard
                        // use the V3Tween(x,y,z), just convert back and forth from Color3(r,g,b)
                        // maybe changing the color?  update the name of this mesh with the new color
                        handle.uniqueName = handle.babylonMesh.name = handle.model + '_' + handle.uuid + '_' + cmd.colorD;
                        const currentColor = new babylonjs_5.Vector3(handle.babylonMesh.material['diffuseColor'].r, handle.babylonMesh.material['diffuseColor'].g, handle.babylonMesh.material['diffuseColor'].b);
                        handle.diffuseColor = handle.babylonMesh.material['diffuseColor']; // for lines and stuff
                        const colorD = utilities_1.HTMLColor(cmd.colorD); // 3 values between 0 and 1
                        const futureColor = new babylonjs_5.Vector3(colorD.r, colorD.g, colorD.b);
                        // console.log('%ccolor: current:', consoleRed, currentColor, ' future: ', futureColor)
                        tween.start('color', currentColor.clone(), // start
                        futureColor.clone(), // end
                        cmd.timestamp, cmd.duration, cmd.animate, (value) => {
                            if (handle.babylonMesh instanceof babylonjs_5.Mesh) { // typeguard
                                const myMaterial = handle.babylonMesh.material;
                                myMaterial.diffuseColor = new babylonjs_5.Color3(Math.abs(myMaterial.diffuseColor.r) + value.x, Math.abs(myMaterial.diffuseColor.g) + value.y, Math.abs(myMaterial.diffuseColor.b) + value.z);
                                handle.diffuseColor = handle.babylonMesh.material['diffuseColor']; // for lines and stuff
                            }
                        });
                    }
                    else
                        console.error('color only for mesh');
                }
                opacity(cmd, tween, handle) {
                    console.assert(handle.babylonMesh instanceof babylonjs_5.Mesh);
                    if (handle.babylonMesh instanceof babylonjs_5.Mesh) { // typeguard
                        tween.start('opacity', handle.babylonMesh.material.alpha, // start
                        cmd.opacity, // end
                        cmd.timestamp, cmd.duration, cmd.animate, (value) => {
                            if (handle.babylonMesh instanceof babylonjs_5.Mesh) { // typeguard
                                const myMaterial = handle.babylonMesh.material;
                                myMaterial.alpha = Math.abs(myMaterial.alpha) + value;
                                handle.opacity = myMaterial.alpha; // in case we have a line or similar
                            }
                        });
                    }
                    else
                        console.error('Opacity only on mesh');
                }
                animatedGif(cmd, tween, handle) {
                    // don't care whether this is a mesh or not
                    tween.start('misc', 0, // start
                    1, // start and end don't mean anything here
                    cmd.timestamp, cmd.duration, cmd.animate, (value) => {
                        babylonjs_9.Tools.CreateScreenshot(this.engine, this.camera, cmd.resolution);
                    });
                }
                break(cmd, handle) {
                    // step 1 - reset times, so tween is 'expired'
                    handle.tweenArray.forEach((tween) => {
                        // TODO: should only delete 'moves'.  or use cmd.?? to specify which
                        tween.isCancelled = true;
                    });
                    // step 2 - resolve expired tweens and delete
                    handle.tweenArray.forEach((tween, index, tweenArray) => {
                        if (tween.isCancelled) { // don't use 'expired' because it moves the shape
                            // might not be a promise, if no 'await' / done()
                            console.assert(typeof tween.promiseResolve === 'function');
                            // console.log("%cResolving a promise", consoleRed)
                            tween.promiseResolve(); // complete the promise
                            tweenArray.splice(index, 1); // and delete the tween
                        }
                    });
                }
                createGUI(cmd, handle) {
                    console.log('createGUI', handle.uuid);
                    handle.babylonRectangle = babylonjs_gui_1.Button.CreateSimpleButton('', 'uninitialized button');
                    // defaults...
                    handle.babylonRectangle.width = '100px';
                    handle.babylonRectangle.height = "40px";
                    handle.babylonRectangle.cornerRadius = 5;
                    handle.babylonRectangle.color = "#fff";
                    handle.babylonRectangle.thickness = 1;
                    handle.babylonRectangle.background = '#007bff';
                    handle.fontsize = 18; // for calculations
                    handle.babylonRectangle.fontSize = "18px";
                    handle.babylonRectangle.onPointerDownObservable.add(() => {
                        handle.babyShape.onPressDown(this.playerNumber);
                    });
                    this.advancedTexture.addControl(handle.babylonRectangle);
                }
                textGUI(cmd, handle) {
                    const textBlock = new babylonjs_gui_1.TextBlock('', cmd.text);
                    handle.babylonRectangle.clearControls();
                    handle.babylonRectangle.addControl(textBlock);
                    if (cmd.resize) {
                        const textsize = utilities_1.measureText(cmd.text, cmd.fontsize) + 30;
                        handle.babylonRectangle.width = `${textsize}px`;
                    }
                }
                colorGUI(cmd, handle) {
                    handle.babylonRectangle.color = cmd.color;
                    handle.babylonRectangle.background = cmd.background;
                    handle.babylonRectangle.thickness = 1;
                }
                positionGUI(cmd, handle) {
                    if (cmd.leftRight == 1)
                        handle.babylonRectangle.horizontalAlignment = babylonjs_gui_1.Control.HORIZONTAL_ALIGNMENT_RIGHT;
                    if (cmd.leftRight == -1)
                        handle.babylonRectangle.horizontalAlignment = babylonjs_gui_1.Control.HORIZONTAL_ALIGNMENT_LEFT;
                    if (cmd.topBottom == 1)
                        handle.babylonRectangle.verticalAlignment = babylonjs_gui_1.Control.VERTICAL_ALIGNMENT_TOP;
                    if (cmd.topBottom == -1)
                        handle.babylonRectangle.verticalAlignment = babylonjs_gui_1.Control.VERTICAL_ALIGNMENT_BOTTOM;
                }
                resizeGUI(cmd, handle) {
                    handle.babylonRectangle.width = '100px';
                    handle.babylonRectangle.height = "40px";
                    handle.babylonRectangle.cornerRadius = 5;
                    handle.babylonRectangle.color = cmd.color;
                    handle.babylonRectangle.thickness = 1;
                    handle.babylonRectangle.background = cmd.background;
                }
                // other things we can do...
                // a.alpha = .5
                // // a.top = 20  // move it DOWN 20 px
                /** can't resize an impostor, so drop it and recreate  */
                recreatePhysicsImpostor(handle) {
                    // obvously only for meshes, but Typescript needs a typeguard
                    if (handle.babylonMesh instanceof babylonjs_5.Mesh) {
                    }
                }
                // turn the inspector on or off
                inspector(cmd) {
                    if (!this.scene.debugLayer.isVisible()) {
                        this.scene.debugLayer.show();
                    }
                    if (cmd.stringParm == 'record') {
                        if (babylonjs_9.VideoRecorder.IsSupported(this.engine)) {
                            var recorder = new babylonjs_9.VideoRecorder(this.engine);
                            recorder.startRecording();
                        }
                    }
                }
                ////////////// we create lines with penUp, penDown, and lineErase
                penUp(cmd, handle) {
                    handle.isPenDown = false;
                    handle.lastPosition = null;
                }
                penDown(cmd, handle) {
                    handle.isPenDown = true;
                    handle.radius = cmd.radius;
                    handle.lastPosition = handle.getPosition();
                }
                lineErase(cmd, handle) {
                    handle.isPenDown = false;
                    handle.lineArray.forEach(element => { element.dispose(); });
                    handle.lastPosition = null;
                }
                runRenderStep() {
                    // run all the tweens (delete some that have expired)
                    babyengine_3.BabyEngine.processTweens();
                    // and run the physics engine too
                    this.runPhysicsStep();
                    // if the game doesn't define a camera, we need to do it ourselves
                    // (of course, the game might not have gotten that far)
                    // worst case, this camera will hang around unused.
                    if (!this.isCameraSet) {
                        // console.log('%c adding a arcRotate, because programmer did not', consoleRed)
                        const newE = new babything_3.BabyCamera('camera', this.babyEngine); // creates the game-writer's object
                        const handle = babyengine_3.BabyEngine.shapeMap.get(newE.uuid);
                        // just call it directly, other players will do the same
                        let t = new things_1.CameraThing({ uuid: handle.uuid, action: 'setCamera', model: 'arcRotate' }, handle, this.scene);
                        this.isCameraSet = true;
                    }
                    for (;;) { // infinite loop, maybe an exit one day??
                        this.scene.render(); // finally, render the scene, and loop around
                        requestAnimationFrame(this.runRenderStep.bind(this));
                        return (this);
                    }
                }
                runPhysicsStep() {
                    console.assert(Array.isArray(babyengine_3.BabyEngine.impostors), 'probably started babylon before initializing BabyEngine');
                    // two steps of 120th is more accurate than one step of 60th
                    this.physicsPlugin.executeStep(1 / 120, babyengine_3.BabyEngine.impostors);
                    this.physicsPlugin.executeStep(1 / 120, babyengine_3.BabyEngine.impostors);
                }
            };
            exports_6("Babylon", Babylon);
        }
    };
});
System.register("middle/remote", ["ably"], function (exports_7, context_7) {
    "use strict";
    var Ably, Remote;
    var __moduleName = context_7 && context_7.id;
    return {
        setters: [
            function (Ably_1) {
                Ably = Ably_1;
            }
        ],
        execute: function () {
            Remote = class Remote {
                // // get the Ably key
                // BabyEngine.getEnv()  // this doesn't happen right away 
                // two channels - 
                // gameroom               // server
                // gameroomRemote         // remote players  
                constructor(playerRole) {
                    this.ablyKey = 'Ui15tQ.PluWTw:1AblFCqygSLQAPwl';
                    this.playerUuidList = []; // only use this if we are the server
                    this.playerRole = playerRole;
                    this.playerUuid = window.performance.now();
                    if (this.playerRole == 'singlePlayer') {
                        // nothing to do
                    }
                    if (this.playerRole == 'server') {
                        // set up a connection to Ably, good for the rest of the game
                        this.connectAbly(this.ablyKey);
                        // we need to host the gameroom and provide tokens
                        // just in case we are playing too, we add ourselves as the first player
                        this.playerUuidList.push(this.playerUuid);
                        this.playerNumber = this.playerUuidList.length; // should be 1 cuz we are first
                        console.log(`We are PLAYER${this.playerNumber}`);
                        // set up a subscriber to catch any 'let me play' requests (gameRoomHost)
                        let ablyChannel = this.ably.channels.get('gameroom');
                        ablyChannel.subscribe((received) => this.gameRoomHost(this, received));
                        console.log('setting up the gameroom host');
                    }
                    if (this.playerRole == 'playerN') {
                        // set up a connection to Ably, good for the rest of the game
                        this.connectAbly(this.ablyKey);
                        // we need to introduce ourself and ask for a game token
                        // set up a subscriber to catch the answer
                        let ablyChannel = this.ably.channels.get('gameroom');
                        ablyChannel.subscribe((received) => this.remotePlayer(this, received));
                        console.log('setting up the remote player host');
                        // and sent out a request for a game token
                        this.publishAbly('gameroom', 'G01&' + this.playerUuid.toString());
                        console.log('requesting a game token');
                    }
                }
                //////////////////////////
                /// don't know if it's a bug in Ably, but can't access 'this'.
                /// so we send the Remote object as the first param for each listener
                /// use remote.thing  instead of   this.thing
                //////////////////////////
                gameRoomHost(remote, received) {
                    console.log('in Remote.gameRoomHost(), got message', received.data);
                    let data = JSON.parse(received.data).split('&');
                    console.log(data);
                    switch (data[0]) {
                        case 'G01': // introduction, sent us a microtime uuid
                            console.log('in G01');
                            remote.playerUuidList.push(data[1]);
                            console.log('have pushed');
                            remote.playerNumber = remote.playerUuidList.length; // should be 1 cuz we are first
                            console.log(`just set player ${remote.playerNumber}`);
                            remote.publishAbly('gameroom', 'G02&' + remote.playerUuidList[remote.playerUuidList.length - 1].toString() + '&' + remote.playerNumber.toString());
                            console.log(`have added Player${remote.playerNumber}`);
                            break;
                        default: // everything else can be ignored
                    }
                }
                remotePlayer(remote, received) {
                    console.log('in Remote.remotePlayer, got raw message', received.data);
                    let data = JSON.parse(received.data).split('&');
                    console.log('in Remote.remotePlayer, got message', data);
                    switch (data[0]) {
                        case 'G02': // we are given our player number
                            console.log('playerUuid', remote.playerUuid.toString());
                            if (data[1] == remote.playerUuid.toString()) { // if this message is for us
                                remote.playerNumber = data[2];
                                console.log(`We are PLAYER${remote.playerNumber}`);
                            }
                            else {
                                console.log('message not for us', data[1], remote.playerUuid.toString);
                            }
                            break;
                        default: // everything else can be ignored
                    }
                }
                connectAbly(secretKey) {
                    this.ably = new Ably.Realtime(secretKey);
                    this.ably.connection.on('connected', function () {
                        console.log("That was simple, you're now connected to Ably in realtime");
                    });
                }
                subscribeAbly(channel) {
                    var ablyChannel = this.ably.channels.get(channel);
                    ablyChannel.subscribe(channel, function (recieved) {
                        let message = JSON.parse(recieved.data); // it's always a string anyhow
                        console.log("Received a greeting message in realtime: " + message.data);
                    });
                }
                publishAbly(channel, message) {
                    var ablyChannel = this.ably.channels.get(channel);
                    console.log('sending a message to Ably');
                    ablyChannel.publish(channel, JSON.stringify(message));
                }
            };
            exports_7("Remote", Remote);
        }
    };
});
// there are TWO classes here:
//  MeshHandle - represents a single BabyMesh, and usually a single BabylonMesh
//  MeshEngine - contains the collection of MeshHandles
System.register("middle/babyengine", ["babylonjs", "middle/tween", "backend/babylon", "middle/remote"], function (exports_8, context_8) {
    "use strict";
    var babylonjs_10, tween_2, babylon_1, remote_1, consoleRed, consoleYellow, consoleBlue, BabyEngine, MeshHandle;
    var __moduleName = context_8 && context_8.id;
    return {
        setters: [
            function (babylonjs_10_1) {
                babylonjs_10 = babylonjs_10_1;
            },
            function (tween_2_1) {
                tween_2 = tween_2_1;
            },
            function (babylon_1_1) {
                babylon_1 = babylon_1_1;
            },
            function (remote_1_1) {
                remote_1 = remote_1_1;
            }
        ],
        execute: function () {
            // there are TWO classes here:
            //  MeshHandle - represents a single BabyMesh, and usually a single BabylonMesh
            //  MeshEngine - contains the collection of MeshHandles
            consoleRed = 'background-color:red;color:white;';
            consoleYellow = 'background-color:yellow;color:black;';
            consoleBlue = 'background-color:blue;color:white;';
            BabyEngine = class BabyEngine {
                constructor() {
                    BabyEngine.shapeMap = new Map();
                    BabyEngine.observers = {};
                    BabyEngine.impostors = [];
                    BabyEngine.babylonShapes = new babylon_1.Babylon(this); // can find a specific Babylon mesh by uuid too
                    BabyEngine.frozen = false; // default.  freezes all tweens.
                    // see if we are playerN or a spectator...
                    this.url = new URL(window.location.href);
                    console.log('URL', this.url);
                    console.log('URL Search', this.url.search);
                    let search = this.url.search.toLowerCase().trim(); // trim and lowercase
                    switch (search) {
                        // default (empty) is player0
                        case '?s': // server only  
                            BabyEngine.remote = new remote_1.Remote('server'); // also gets player0
                            break;
                        case '?p': // player 1-N
                        case '?w': // watch / spectator   
                            BabyEngine.remote = new remote_1.Remote('playerN');
                            break;
                        default:
                            if (search !== '') {
                                console.error(`Did not expect URL + '${search}', valid values are <empty>, ?s (server) ?p (player), ?w (watcher`);
                            }
                            else { // standalone game
                                BabyEngine.remote = new remote_1.Remote('singlePlayer');
                            }
                    }
                    // // come back to Ably later
                    // if (true) {
                    //     let ablyChannel = 'quickstart'
                    //     BabyEngine.connectAbly(BabyEngine.ablyKey)
                    //     BabyEngine.subscribeAbly(ablyChannel)
                    //     BabyEngine.publishAbly(ablyChannel, 'hello')
                    // }
                    document.addEventListener('keydown', event => {
                        // console.log('key event fires', event)
                        const data = {
                            code: event.code,
                            shiftKey: event.shiftKey,
                            altKey: event.altKey,
                            ctrlKey: event.ctrlKey,
                            type: event.type,
                            repeat: event.repeat,
                            player: 0 // new !!
                        };
                        BabyEngine.notifyObservers('keydown', data);
                    });
                    document.addEventListener('keypress', event => {
                        const data = {
                            code: event.code,
                            shiftKey: event.shiftKey,
                            altKey: event.altKey,
                            ctrlKey: event.ctrlKey,
                            type: event.type,
                            repeat: event.repeat,
                            player: 0 // new !!
                        };
                        BabyEngine.notifyObservers('keypress', data);
                    });
                    document.addEventListener('keyup', event => {
                        const data = {
                            code: event.code,
                            shiftKey: event.shiftKey,
                            altKey: event.altKey,
                            ctrlKey: event.ctrlKey,
                            type: event.type,
                            repeat: event.repeat,
                            player: 0 // new !!
                        };
                        BabyEngine.notifyObservers('keyup', data);
                    });
                }
                // the 'gameroom' channel is used to set up the game
                // all players and spectators subscribe to 'updates', except p0 processes locally
                // p0 subscribes to 'keystrokesP1' 'mouseclicksP1, ,p2,p3 for keystrokes and mouseclicks
                // Shape commands sent to all players
                static broadcastToPlayers(cmd) {
                    // console.log('broadcast ', cmd)
                    cmd.timestamp = Date.now();
                    if (cmd.duration < 0)
                        cmd.duration = 0;
                    // first, send it to any WebRTC clients
                    // TODO:
                    // then send it to the local babylonMesh class, which drives BabylonJS
                    return this.processGameCmd(cmd);
                }
                static processGameCmd(cmd) {
                    // console.log(`processGameCmd('${cmd.action}')`, cmd)
                    // some commands, like 'inspector', can be handled immediately and safely return null
                    switch (cmd.action) {
                        case 'inspector':
                            this.babylonShapes.inspector(cmd);
                            return null; // but nothing else to do here
                            break;
                    }
                    // everything we do from now on requires a mesh object. let's find it
                    const handle = BabyEngine.shapeMap.get(cmd.uuid);
                    console.assert(handle !== undefined, "Handle should not be undefined in ProcessGameCmd()" + JSON.stringify(cmd));
                    // some commands, like 'createMesh' or 'setPosition' or 'getPosition 
                    // can be handled immediately and do not need a tween
                    switch (cmd.action) {
                        case 'setCamera': // no tween necessary
                        case 'setOrthographic':
                        case 'setActive':
                        case 'createBabylonMesh': // no tween necessary
                        case 'button':
                        case 'createGUI':
                        case 'colorGUI':
                        case 'positionGUI':
                        case 'resizeGUI':
                        case 'textGUI':
                        case 'onPressedGUI':
                        case 'dispose': // no tween necessary
                        case 'addAxes':
                        case 'addSkeleton': // currently unused
                        case 'attachTo':
                        case 'break':
                        case 'collide':
                        case 'penUp':
                        case 'penDown':
                        case 'lineErase':
                        case 'setPosition':
                        case 'addToPosition':
                        case 'setRotation':
                        case 'addToRotation':
                            // console.log('babyengine', cmd)
                            this.babylonShapes[cmd.action](cmd, handle); // eg: this.dispose(cmd)
                            return null; // quick return
                            break;
                    }
                    // ok, we have a handle (although it might be empty and might not be in the shapemap yet).
                    // let's process it.
                    let tween;
                    const description = JSON.stringify(cmd);
                    //////////////// special cases /////////////
                    if (cmd.action == 'color' && !handle.hasDiffuseColor()) {
                        console.error(`Cannot COLOR() this material`, description);
                        return null;
                    }
                    /* eslint-disable no-fallthrough */
                    switch (cmd.action) {
                        case 'importShape':
                            // TODO: add a promise for this
                            tween = new tween_2.NullTween(description);
                            this.babylonShapes.importShape(cmd, handle);
                            break;
                        case 'animatedGif':
                        case 'move': // these use a V3Tween
                        case 'moveToZero':
                        case 'moveAndTurn':
                        case 'moveToward':
                        case 'turn':
                        case 'moveToInitialPosition':
                        case 'turnToZero':
                        case 'turnToSame':
                        case 'size':
                        case 'color':
                            // console.log('dispatching ', cmd.action)
                            handle.description = description; // for debugging
                            tween = new tween_2.V3Tween(JSON.stringify(cmd));
                            // create a promise and store it away to be resolved someday
                            tween.promise = new Promise(() => {
                                this.babylonShapes[cmd.action](cmd, tween, handle);
                            });
                            handle.tweenArray.push(tween);
                            break;
                        case 'opacity': // these use a scaler tween
                            tween = new tween_2.ScalarTween(JSON.stringify(cmd));
                            tween.promise = new Promise(() => {
                                this.babylonShapes[cmd.action](cmd, tween, handle);
                            });
                            handle.tweenArray.push(tween);
                            break;
                        default:
                            console.error(`Did not expect '${cmd.action}`);
                    }
                    /* eslint-enable no-fallthrough */
                    return tween;
                }
                // our observer class is adapted from the elegant Paon library
                //
                //  @author yahiko <yahiko.ninja@gmail.com>
                //  @link https://github.com/yahiko00/Paon
                static addObserver(type, observer, t = {}) {
                    if (!(type in this.observers)) {
                        this.observers[type] = [];
                    }
                    this.observers[type].push(observer.bind(t));
                }
                static notifyObservers(type, msg) {
                    if (type in this.observers) {
                        for (const obs of this.observers[type]) {
                            obs(msg);
                        }
                    }
                }
                static removeObserver(type, observer) {
                    // TODO: test this !!
                    if (this.observers[type]) {
                        for (let i = 0; i < this.observers[type].length; i++) {
                            if (observer === this.observers[type][i]) {
                                this.observers[type].splice(i, 1);
                                return;
                            }
                        }
                    }
                }
                static processTweens() {
                    if (BabyEngine.frozen) // if the sceen is 'frozen', everything keeps running
                        return; // except the tweens
                    // for each entity in shapeMap    
                    BabyEngine.shapeMap.forEach((handle) => {
                        // run all the tweens for this entity
                        handle.tweenArray.forEach((tween) => {
                            tween.doTween();
                        });
                        // delete any expired tweens (remember to resolve promise)
                        handle.tweenArray.forEach((tween, index) => {
                            if (tween.expired()) {
                                // has to work for meshs, cameras, and lights, but only shapes has scaling
                                if (handle.babylonMesh instanceof babylonjs_10.Mesh) {
                                    // different things for different types of tweens
                                    if (tween.tweenType == 'size') {
                                        // can't resize the physics impostor.  delete and recreate
                                        // console.log('%cRECREATING PHYSICS IMPOSTOR',consoleYellow)
                                        if (handle.babylonMesh.physicsImpostor !== null) {
                                            this.babylonShapes.recreatePhysicsImpostor(handle);
                                        }
                                    }
                                }
                                // might not be a promise, if no 'await' / done()
                                console.assert(typeof tween.promiseResolve === 'function');
                                // console.log("%cResolving a promise", consoleRed)
                                tween.promiseResolve(); // complete the promise
                                handle.tweenArray.splice(index, 1); // and delete the tween
                            }
                        });
                    });
                }
                static async getEnv() {
                    await fetch('http://localhost:8080/dev.env')
                        .then((response) => {
                        if (response.status !== 200) {
                            console.log('Looks like there was a problem. Status Code: ' +
                                response.status);
                            return;
                        }
                        // Examine the text in the response
                        response.json().then(function (data) {
                            BabyEngine.ENV_FILE = new String(data);
                            console.log('response', data);
                        });
                    })
                        .catch((err) => {
                        console.log('Fetch Error :-S', err);
                    });
                }
            };
            exports_8("BabyEngine", BabyEngine);
            // not sure when I should use an interface or a class.   I'm guessing a class
            MeshHandle = class MeshHandle {
                constructor(model, uuid) {
                    const bottom = null;
                    const top = null;
                    this.uuid = uuid;
                    this.model = model;
                    this.babylonMesh = null; // babylonMesh
                    this.babylonRectangle = null;
                    this.babyShape = null;
                    this.material = null;
                    this.bottom = bottom;
                    this.top = top;
                    this.material = null;
                    this.size = new babylonjs_10.Vector3(1, 1, 1);
                    this.diffuseColor = new babylonjs_10.Color3;
                    this.opacity = 1;
                    this.tweenArray = [];
                    this.collider = 'none';
                    this.lastCollisionTime = 0;
                    this.mass = 0;
                    this.restitution = 0;
                    this.uniqueName = model + '_' + uuid.toString();
                    this.description = '';
                    // for GUI elements
                    this.fontsize = 18;
                    // for lines 
                    this.isPenDown = false;
                    this.lastPosition = null;
                    this.lineArray = [];
                    this.radius = .2;
                }
                cleanBeforeDispose() {
                    // a few cleanups, because Dispose doesn't know everything
                    // if there is a line, dispose of each segment
                    this.lineArray.forEach(element => { element.dispose(); });
                }
                maybeAddLineSegment() {
                    if (this.isPenDown) {
                        if (this.lastPosition !== null) {
                            // we need to add a line segment
                            let path = [this.lastPosition, this.babylonMesh.position];
                            let options = { path: path, radius: this.radius };
                            let tubeSegment = babylonjs_10.MeshBuilder.CreateTube('', options);
                            const material = new babylonjs_10.StandardMaterial('', tubeSegment._scene); // just use the tubebuilder's scene
                            material.diffuseColor = this.diffuseColor;
                            material.alpha = this.opacity;
                            tubeSegment.material = material;
                            this.lineArray.push(tubeSegment);
                        }
                        // for sure, we will create a tube next time
                        this.lastPosition = this.babylonMesh.position.clone();
                    }
                }
                getPosition() {
                    return this.babylonMesh.position;
                }
                /** not all materials have a diffuseColor (eg: GridMaterial does not) */
                hasDiffuseColor() {
                    let hasDiffuse = false;
                    // has to work for meshs, cameras, and lights, but only shapes has scaling
                    if (this.babylonMesh instanceof babylonjs_10.Mesh) {
                        console.assert(this.babylonMesh.material !== null, 'no material ???'); // just checking....
                        hasDiffuse = (typeof this.babylonMesh.material['diffuseColor'] !== 'undefined');
                    }
                    return (hasDiffuse);
                }
            };
            exports_8("MeshHandle", MeshHandle);
        }
    };
});
// this provides the methods for 'BabyShape' objects.  It doesn't actually do
// anything, simply dispaches methods to BabyEngine.
System.register("frontend/babything", ["middle/tween", "middle/babyengine", "babylonjs", "frontend/utilities"], function (exports_9, context_9) {
    "use strict";
    var tween_3, babyengine_4, babylonjs_11, utilities_2, consoleRed, consoleYellow, consoleBlue, BabyThing, BabyShape, BabyCamera;
    var __moduleName = context_9 && context_9.id;
    return {
        setters: [
            function (tween_3_1) {
                tween_3 = tween_3_1;
            },
            function (babyengine_4_1) {
                babyengine_4 = babyengine_4_1;
            },
            function (babylonjs_11_1) {
                babylonjs_11 = babylonjs_11_1;
            },
            function (utilities_2_1) {
                utilities_2 = utilities_2_1;
            }
        ],
        execute: function () {// this provides the methods for 'BabyShape' objects.  It doesn't actually do
            // anything, simply dispaches methods to BabyEngine.
            consoleRed = 'background-color:red;color:white;';
            consoleYellow = 'background-color:yellow;color:black;';
            consoleBlue = 'background-color:blue;color:white;';
            /** superclass for BabyShape, BabyCamera and BabyButton */
            BabyThing = class BabyThing {
                constructor(model, babyEngine) {
                    this.model = model;
                    // this.baby = baby
                    this.babyEngine = babyEngine;
                    let temp = new utilities_2.Uuid(); // increments 
                    this.uuid = utilities_2.Uuid.count; // our unique id - VERY IMPORTANT
                    this.collideCallback = (otherBabyMesh) => { return this; }; // empty function unless overridden
                    this.clickCallback = () => { return this; }; // empty function unless overridden
                    this.onPressDown = (playerN) => {
                        console.log('press down for player ', playerN);
                        return this;
                    }; // empty function unless overridden
                    // the handle is still empty, but register it anyway
                    const handle = new babyengine_4.MeshHandle(model, this.uuid);
                    babyengine_4.BabyEngine.shapeMap.set(this.uuid, handle); // register this shape object into the meshHandle
                    handle.babyShape = this; // add a pointer back to ourself
                }
                // some functions work on all kinds of things. so they are here in the 'parent'
                //TODO: figure why this doesn't work
                animatedGif(resultion = 200) {
                    var _a;
                    const gameCmd = {
                        action: 'animatedGIF',
                        uuid: this.uuid
                    };
                    this.lastTween = (_a = babyengine_4.BabyEngine.broadcastToPlayers(gameCmd)) !== null && _a !== void 0 ? _a : this.lastTween;
                    return this;
                }
                /** Returns a promise that resolves when the LAST issued tween is completed.  Use it as  `await thing.move(...).done()` */
                async done() {
                    // console.log('in done, tween is ',this.lastTween)
                    return new Promise(resolve => {
                        // we are looking for a specific tween (because an object may have many tweens running)
                        // but sometimes we can't figure out which one it is.   Just alert the programmer.
                        if (typeof (this.lastTween) == 'undefined')
                            console.error(`We don't know which tween (if any) you are waiting for. Did you mean to use shape.isIdle()?`);
                        // we store it away, run it when the tween ends
                        this.lastTween.promiseResolve = resolve;
                    });
                }
                /** Returns a promise that resolves when no tweens remain active.  Use it as  `await thing.isIdle()` */
                async isIdle() {
                    return new Promise(resolve => {
                        // we are looking for a specific tween (because an object may have many tweens running)
                        // but sometimes we can't figure out which one it is.   Just alert the programmer.
                        let tween = new tween_3.MiscTween('misc');
                        let handle = babyengine_4.BabyEngine.shapeMap.get(this.uuid);
                        tween.promise = new Promise(() => {
                            tween.start(() => { return (handle.tweenArray.length <= 1); }); // 1 because THIS tween is still there
                        });
                        handle.tweenArray.push(tween);
                        // we store it away with current context, run it when the tween ends
                        tween.promiseResolve = resolve;
                    });
                }
            };
            exports_9("BabyThing", BabyThing);
            // general shape of Babylon meshbuilder is
            // var shape = MeshBuilder.CreateShape(name, options, scene)
            BabyShape = class BabyShape extends BabyThing {
                constructor(model, babyEngine) {
                    super(model, babyEngine);
                }
                /** a callback when an ACTIVE shape collides with an ACTIVE or PASSIVE shape
                 * note: if two ACTIVE shapes collide, they BOTH get a callback notification
                 * eg:  myBall.onCollide((other)=>{      // other is a BabyMesh object
                 *               if(other == hisBall){  doSomething()  }
                 *         })
                 */
                onCollide(callback) {
                    // store the callback function.
                    // then simply subscribe to an observer event called "collide.nnn" where
                    // nnn is our uuid.  when the event happens, trigger the callback
                    // yes, it would be simplier to tie the callback to the physics engine,
                    // but we are trying to isolate the baby side from the babylon side
                    this.collideCallback = callback;
                    babyengine_4.BabyEngine.addObserver(`collide.${this.uuid}`, (data) => {
                        // console.log(`onCollide() heard collide.${this.uuid}`, data)
                        this.collideCallback(data);
                    });
                    return this;
                }
                /** a callback when the mouse clicks this shape.
                 * eg:  myBall.onClick(()=>console.log("I was clicked"))
                 */
                onClick(callback) {
                    // store the callback function.
                    // then simply subscribe to an observer event called "collide.nnn" where
                    // nnn is our uuid.  when the event happens, trigger the callback
                    // yes, it would be simplier to tie the callback to the physics engine,
                    // but we are trying to isolate the baby side from the babylon side
                    this.clickCallback = callback;
                    console.log('adding observer', `click.${this.uuid}`);
                    babyengine_4.BabyEngine.addObserver(`click.${this.uuid}`, () => {
                        this.clickCallback(); // usually an empty function
                    });
                    return this;
                }
                /*
                    setPosition(v: number[]): BabyMesh {
                        console.assert(v.length == 3, `expected a vector of 3 numbers in addToPosition()`)
            
                        let gameCmd: gameCmd = {
                            action: 'setPosition',
                            uuid: this.uuid,
                            x: v[0],
                            y: v[1],
                            z: v[2]
                        }
                        BabyEngine.broadcastToPlayers(gameCmd)
                        return (this)
                    }
            
                    addToPosition(v: number[]): BabyMesh {
                        console.assert(v.length == 3, `expected a vector of 3 numbers in addToPosition()`)
            
                        let gameCmd: gameCmd = {
                            action: 'addToPosition',
                            uuid: this.uuid,
                            x: v[0],
                            y: v[1],
                            z: v[2]
                        }
                        BabyEngine.broadcastToPlayers(gameCmd)
                        return (this)
                    }
            
            
                    // the game writer does not have access to this
                    private getBabylonPosition(): [number, number, number] {
                        let bMesh = this.babylonMeshs.entityMap.get(this.uuid).babylonMesh
                        console.assert(typeof bMesh !== undefined)  // timing?
                        return [bMesh.position.x, bMesh.position.y, bMesh.position.z]
                    }
            
                    // setScale(v: number[]): BabyMesh {
                    //     console.assert(v.length == 3, `expected a vector of 3 numbers in setScale()`)
            
                    //     this.scaling = new Vector3(v[0], v[1], v[2])
            
                    //     this.babylonEntity.scaling = this.scaling  // no need to recreate
                    //     return (this)
                    // }
            
                    // // TODO: only player0 can use this, need another mechanism
                    // getScale(): number[] {  // don't use Vector3 in userland
                    //     return [this.scaling.x, this.scaling.y, this.scaling.z]
                    // }
            
                    // setRotation(p: number[]): BabyMesh {
                    //     console.assert(p.length == 3, `setRotation expects an array of 3 values [x,y,z]`)
            
                    //     this.rotation = new Vector3(p[0], p[1], p[2])
            
                    //     this.babylonEntity.rotation = this.rotation  // no need to recreate
                    //     return (this)
                    // }
            
                    // getRotation(): number[] {  // don't use Vector3 in userland
                    //     return [this.rotation.x, this.rotation.y, this.rotation.z]
                    // }
            
                    // setGrid(gridRatio: number = 0.1, majorUnitFrequency: number = 2, lineColor: string = "White"): BabyMesh {
            
                    //     let gameCmd: gameCmd = {
                    //         action: 'setColor',
                    //         uuid: this.uuid,
                    //         gridRatio: gridRatio,
                    //         major: majorUnitFrequency,
                    //         colorD: lineColor
                    //     }
                    //     BabyEngine.broadcastToPlayers(gameCmd)
                    //     return (this)
                    // }
            
                //  **
                //  * Sets diffuse color (the essential color under white light)
                //  * ambient color (the color when in shadow)
                //  * emmissive color (the self-illumination color)
                //  * specular color (the shiny-reflections color)
                //  * use the empty string ('') to skip a color
                //  * @param {diffuse} string of the 140 HTML cololr names
                //  * @param {ambient} (optional) any of the 140 HTML color names
                //  * @param {emmisive} (optional) any of the 140 HTML color names
                //  * @param {specular} (optional) any of the 140 HTML color names
                //  *
                    setColor(diffuse: string, ambient: string = '', emmisive: string = '', specular: string = ''): BabyMesh {
            
                        let gameCmd: gameCmd = {
                            action: 'setColor',
                            uuid: this.uuid,
                            colorD: diffuse,
                            colorA: ambient,
                            colorE: emmisive,
                            colorS: specular,
                        }
                        BabyEngine.broadcastToPlayers(gameCmd)
                        return (this)
                    }
            
                */
                /* add axes to a shape for debugging purposes. Blue is forward, red is right, green is up. */
                addAxes() {
                    const gameCmd = {
                        action: 'addAxes',
                        uuid: this.uuid
                    };
                    babyengine_4.BabyEngine.broadcastToPlayers(gameCmd);
                    return (this);
                }
                /// ////////////////////////////////
                ///  Alice Functions
                /// ////////////////////////////////
                dispose() {
                    const gameCmd = {
                        action: 'dispose',
                        uuid: this.uuid
                    };
                    /*this.lastTween = */ babyengine_4.BabyEngine.broadcastToPlayers(gameCmd);
                    return (this);
                }
                /** turn collisions on or off.  'active' will turn on gravity and mass. */
                collide(collider = 'none') {
                    const gameCmd = {
                        action: 'collide',
                        uuid: this.uuid,
                        collider: collider
                    };
                    // don't need a tween, so don't overwrite 'lastTween'
                    console.assert(this.lastTween !== null, "Don't 'await' setting a collide, it happens instantly.");
                    /*this.lastTween = */ babyengine_4.BabyEngine.broadcastToPlayers(gameCmd);
                    return (this);
                }
                /**  Move an entity  */
                move(direction, distance, duration = 1, animate = '1-Begin And End Normally') {
                    var _a;
                    const gameCmd = {
                        action: 'move',
                        uuid: this.uuid,
                        duration: duration,
                        animate: animate,
                        direction: direction,
                        distance: distance
                    };
                    // update lastTween if we get a new tween.  sometimes we only get a null
                    this.lastTween = (_a = babyengine_4.BabyEngine.broadcastToPlayers(gameCmd)) !== null && _a !== void 0 ? _a : this.lastTween;
                    return (this);
                }
                /**  MoveAndTurn - moves in an arc (the turn affects the move)  */
                moveAndTurn(moveDirection, distance, turnTowards, angle, duration = 1, animate = '1-Begin And End Normally') {
                    var _a;
                    const gameCmd = {
                        action: 'moveAndTurn',
                        uuid: this.uuid,
                        duration: duration,
                        animate: animate,
                        direction: moveDirection,
                        distance: distance,
                        towards: turnTowards,
                        angle: angle
                    };
                    // update lastTween if we get a new tween.  sometimes we only get a null
                    this.lastTween = (_a = babyengine_4.BabyEngine.broadcastToPlayers(gameCmd)) !== null && _a !== void 0 ? _a : this.lastTween;
                    return (this);
                }
                /**  MoveToward- moves towards another shape.  Often getDistanceTo(other) is useful.  */
                moveToward(other, distance, duration = 1, animate = '1-Begin And End Normally') {
                    var _a;
                    const gameCmd = {
                        action: 'moveToward',
                        uuid: this.uuid,
                        duration: duration,
                        animate: animate,
                        otherUuid: other.uuid,
                        distance: distance
                    };
                    // update lastTween if we get a new tween.  sometimes we only get a null
                    this.lastTween = (_a = babyengine_4.BabyEngine.broadcastToPlayers(gameCmd)) !== null && _a !== void 0 ? _a : this.lastTween;
                    return (this);
                }
                moveToZero(duration = 1, animate = '1-Begin And End Normally') {
                    var _a;
                    const gameCmd = {
                        action: 'moveToZero',
                        uuid: this.uuid,
                        animate: animate,
                        duration: duration
                    };
                    // update lastTween if we get a new tween.  sometimes we only get a null
                    this.lastTween = (_a = babyengine_4.BabyEngine.broadcastToPlayers(gameCmd)) !== null && _a !== void 0 ? _a : this.lastTween;
                    return (this);
                }
                /**  Turn an entity  (1 is a full turn)
                 *
                 * @remarks
                 * You get different results from the two cases below, because in the second case
                 * the box waits to finish the first turn before starting the second.  Even if you
                 * do the turns in zero-time, you cannot be sure which will be performed first unless
                 * you wait. Consider using the 'legacy' function `setRotation()`.
                 *
                 *
                 * ```
                 * box.turn('forward',.25)
                 * box.turn('left',.25)
                 * ```
                 * and
                 * ```
                 * await box.turn('forward',.25).done()
                 * box.turn('left',.25)
                 * ```
                */
                turn(towards, angle, duration = 1, animate = '1-Begin And End Normally') {
                    var _a;
                    const gameCmd = {
                        action: 'turn',
                        uuid: this.uuid,
                        towards: towards,
                        angle: angle,
                        duration: duration,
                        animate: animate
                    };
                    // update lastTween if we get a new tween.  sometimes we only get a null
                    this.lastTween = (_a = babyengine_4.BabyEngine.broadcastToPlayers(gameCmd)) !== null && _a !== void 0 ? _a : this.lastTween;
                    return (this);
                }
                turnToSame(other, duration = 1, animate = '1-Begin And End Normally') {
                    var _a;
                    const gameCmd = {
                        action: 'turnToSame',
                        uuid: this.uuid,
                        otherUuid: other.uuid
                    };
                    // update lastTween if we get a new tween.  sometimes we only get a null
                    this.lastTween = (_a = babyengine_4.BabyEngine.broadcastToPlayers(gameCmd)) !== null && _a !== void 0 ? _a : this.lastTween;
                    return (this);
                }
                turnToZero(duration = 1, animate = '1-Begin And End Normally') {
                    var _a;
                    const gameCmd = {
                        action: 'turnToZero',
                        uuid: this.uuid,
                        animate: animate,
                        duration: duration
                    };
                    // update lastTween if we get a new tween.  sometimes we only get a null
                    this.lastTween = (_a = babyengine_4.BabyEngine.broadcastToPlayers(gameCmd)) !== null && _a !== void 0 ? _a : this.lastTween;
                    return (this);
                }
                /**
                 * Size or resize an entity  (same as Babylon 'scale' for simple shapes)
                 */
                size(size, duration = 1, animate = '1-Begin And End Normally') {
                    var _a;
                    let size3;
                    if (typeof size === 'number') {
                        size3 = [size, size, size];
                    }
                    else {
                        size3 = size;
                    }
                    const gameCmd = {
                        action: 'size',
                        uuid: this.uuid,
                        x: size3[0],
                        y: size3[1],
                        z: size3[2],
                        duration: duration,
                        animate: animate
                    };
                    // update lastTween if we get a new tween.  sometimes we only get a null
                    this.lastTween = (_a = babyengine_4.BabyEngine.broadcastToPlayers(gameCmd)) !== null && _a !== void 0 ? _a : this.lastTween;
                    return (this);
                }
                /**
                * Sets diffuse color (the essential color under white light).  For controls
                * on ambient, emmisive, or specular color, use 'setColor()'
                * @param {diffuseColor} string is one of 140 HTML color names eg: 'mediumvioletred'
                */
                color(diffuseColor, duration = 1, animate = '1-Begin And End Normally') {
                    var _a;
                    const gameCmd = {
                        action: 'color',
                        uuid: this.uuid,
                        colorD: diffuseColor,
                        duration: duration,
                        animate: animate
                    };
                    // update lastTween if we get a new tween.  sometimes we only get a null
                    this.lastTween = (_a = babyengine_4.BabyEngine.broadcastToPlayers(gameCmd)) !== null && _a !== void 0 ? _a : this.lastTween;
                    return (this);
                }
                /** Sets opacity between 0 (transparent) and 1 (solid) */
                opacity(opacity, duration = 1, animate = '1-Begin And End Normally') {
                    var _a;
                    console.assert(opacity >= 0 && opacity <= 1, "Opacity must be between 0 and 1");
                    const gameCmd = {
                        action: 'opacity',
                        uuid: this.uuid,
                        opacity: opacity,
                        duration: duration,
                        animate: animate
                    };
                    this.lastTween = (_a = babyengine_4.BabyEngine.broadcastToPlayers(gameCmd)) !== null && _a !== void 0 ? _a : this.lastTween;
                    return (this);
                }
                /** Creates a skeleton frame on a shape */
                addSkeleton() {
                    var _a;
                    const gameCmd = {
                        action: 'addSkeleton',
                        uuid: this.uuid
                    };
                    // update lastTween if we get a new tween.  sometimes we only get a null
                    this.lastTween = (_a = babyengine_4.BabyEngine.broadcastToPlayers(gameCmd)) !== null && _a !== void 0 ? _a : this.lastTween;
                    return (this);
                }
                /** Adds to a shape that has a skeleton */
                attachTo(other) {
                    var _a;
                    const gameCmd = {
                        action: 'attachTo',
                        uuid: this.uuid,
                        otherUuid: other.uuid
                    };
                    // update lastTween if we get a new tween.  sometimes we only get a null
                    this.lastTween = (_a = babyengine_4.BabyEngine.broadcastToPlayers(gameCmd)) !== null && _a !== void 0 ? _a : this.lastTween;
                    return (this);
                }
                /** Kill any in-progress moves (usually because of a collision).  Turns are not affected. 'Await' will fire if anyone is waiting. */
                break() {
                    var _a;
                    const gameCmd = {
                        action: 'break',
                        uuid: this.uuid
                    };
                    // update lastTween if we get a new tween.  sometimes we only get a null
                    this.lastTween = (_a = babyengine_4.BabyEngine.broadcastToPlayers(gameCmd)) !== null && _a !== void 0 ? _a : this.lastTween;
                    return (this);
                }
                /** Set positon of this shape immediately.  This is the Babylon way of moving shapes.  It is
                 * particularly useful for setting an initial position
                */
                setPosition(leftRight, upDown, frontBack) {
                    const gameCmd = {
                        action: 'setPosition',
                        uuid: this.uuid,
                        x: leftRight,
                        y: upDown,
                        z: frontBack
                    };
                    babyengine_4.BabyEngine.broadcastToPlayers(gameCmd);
                    return this;
                }
                /** modify positon of this shape immediately.  This is the Babylon way of moving shapes.  */
                addToPosition(leftRight, upDown, frontBack) {
                    const gameCmd = {
                        action: 'setPosition',
                        uuid: this.uuid,
                        x: leftRight,
                        y: upDown,
                        z: frontBack
                    };
                    babyengine_4.BabyEngine.broadcastToPlayers(gameCmd);
                    return this;
                }
                /** set direction of this shape immediately.  This is the Babylon way of rotating shapes.
                * The absolute values of the numbers aren't important.  (0,1,0) is the same as (0,100,0).
                * Rotations are performed around the x, y, z axis in order.
                * */
                setRotation(leftRight, upDown, frontBack) {
                    const gameCmd = {
                        action: 'setRotation',
                        uuid: this.uuid,
                        x: leftRight,
                        y: upDown,
                        z: frontBack
                    };
                    babyengine_4.BabyEngine.broadcastToPlayers(gameCmd);
                    return this;
                }
                /** modify rotation of this shape immediately.  This is the Babylon way of rotating shapes. A quarter-rotation is .25, as usual */
                addToRotation(leftRight, upDown, frontBack) {
                    const gameCmd = {
                        action: 'addToRotation',
                        uuid: this.uuid,
                        x: leftRight,
                        y: upDown,
                        z: frontBack
                    };
                    babyengine_4.BabyEngine.broadcastToPlayers(gameCmd);
                    return this;
                }
                ////// to create a line, we use penDown(), penUp(), lineErase()
                ////// we inherit the color and opacity from the shape using the pen
                /** drop a pen, and start creating a 3d line in space */
                penDown(radius = 0.1) {
                    const gameCmd = {
                        action: 'penDown',
                        uuid: this.uuid,
                        radius: radius
                    };
                    babyengine_4.BabyEngine.broadcastToPlayers(gameCmd);
                    return this;
                }
                /** raise the pen, stop drawing a 3d line */
                penUp() {
                    const gameCmd = {
                        action: 'penUp',
                        uuid: this.uuid
                    };
                    babyengine_4.BabyEngine.broadcastToPlayers(gameCmd);
                    return this;
                }
                /** erase a line created with `penDown` and `penUp` */
                lineErase() {
                    const gameCmd = {
                        action: 'lineErase',
                        uuid: this.uuid
                    };
                    babyengine_4.BabyEngine.broadcastToPlayers(gameCmd);
                    return this;
                }
                ////////////////////////////////////////////////
                //////// functions (only on player0) ///////////
                ////////////////////////////////////////////////
                // GET and IS functions query the state of the game on the local machine, 
                // and return immediately, they are NOT passed to other machines.
                // where possible, we use Babylon V3 functions
                // these next calls are legacy Babylon, and we call BabylonJS directly
                // only Player0 would be interested in the position of something, so no need to
                // route this call through the multiplayer layer.
                /** position of this thing at this instance */
                getPosition() {
                    let handle = babyengine_4.BabyEngine.shapeMap.get(this.uuid);
                    if (handle.babylonMesh instanceof babylonjs_11.Mesh) { // typeguard
                        return handle.babylonMesh.position;
                    }
                    else {
                        console.error('getPosition()) should only use mesh');
                        return babylonjs_11.Vector3.Zero();
                    }
                }
                /** direction of this thing at this instance */
                getRotation() {
                    let handle = babyengine_4.BabyEngine.shapeMap.get(this.uuid);
                    if (handle.babylonMesh instanceof babylonjs_11.Mesh) { // typeguard
                        return handle.babylonMesh.rotation;
                    }
                    else {
                        console.error('getScale() should only use mesh');
                        return babylonjs_11.Vector3.Zero();
                    }
                }
                /** scale of this thing at this instance */
                getScale() {
                    let handle = babyengine_4.BabyEngine.shapeMap.get(this.uuid);
                    if (handle.babylonMesh instanceof babylonjs_11.Mesh) { // typeguard
                        return handle.babylonMesh.scaling;
                    }
                    else {
                        console.error('getScale() should only use mesh');
                        return babylonjs_11.Vector3.Zero();
                    }
                }
                /** distance to another shape (center-to-center, so watch out if you have resized one of them) */
                getDistanceTo(otherShape) {
                    const thisPosition = babyengine_4.BabyEngine.shapeMap.get(this.uuid).babylonMesh.position;
                    const otherPosition = babyengine_4.BabyEngine.shapeMap.get(otherShape.uuid).babylonMesh.position;
                    return babylonjs_11.Vector3.Distance(thisPosition, otherPosition);
                }
            };
            exports_9("BabyShape", BabyShape);
            BabyCamera = class BabyCamera extends BabyThing {
                constructor(model, babyEngine) {
                    super(model, babyEngine);
                }
                // move is IDENTICAL to move() for BabyShape
                // except that it returns a BabyCamera
                // I simply don't know how to do this properly in Typescript
                /**  Move an entity  */
                move(direction, distance, duration = 1, animate = '1-Begin And End Normally') {
                    var _a;
                    const gameCmd = {
                        action: 'move',
                        uuid: this.uuid,
                        duration: duration,
                        animate: animate,
                        direction: direction,
                        distance: distance
                    };
                    // update lastTween if we get a new tween.  sometimes we only get a null
                    this.lastTween = (_a = babyengine_4.BabyEngine.broadcastToPlayers(gameCmd)) !== null && _a !== void 0 ? _a : this.lastTween;
                    return (this);
                }
                /**  MoveToward- moves towards another shape.  Often getDistanceTo(other) is useful.  */
                moveToward(other, distance, duration = 1, animate = '1-Begin And End Normally') {
                    var _a;
                    const gameCmd = {
                        action: 'moveToward',
                        uuid: this.uuid,
                        duration: duration,
                        animate: animate,
                        otherUuid: other.uuid,
                        distance: distance
                    };
                    // update lastTween if we get a new tween.  sometimes we only get a null
                    this.lastTween = (_a = babyengine_4.BabyEngine.broadcastToPlayers(gameCmd)) !== null && _a !== void 0 ? _a : this.lastTween;
                    return (this);
                }
                moveToZero(duration = 1, animate = '1-Begin And End Normally') {
                    var _a;
                    const gameCmd = {
                        action: 'moveToZero',
                        uuid: this.uuid,
                        animate: animate,
                        duration: duration
                    };
                    // update lastTween if we get a new tween.  sometimes we only get a null
                    this.lastTween = (_a = babyengine_4.BabyEngine.broadcastToPlayers(gameCmd)) !== null && _a !== void 0 ? _a : this.lastTween;
                    return (this);
                }
                /** set camera mode to Orthographic (ie: not Perspective) */
                setOrthographic(orthoSize = 12) {
                    const gameCmd = {
                        action: 'setOrthographic',
                        uuid: this.uuid,
                        size: orthoSize
                    };
                    babyengine_4.BabyEngine.broadcastToPlayers(gameCmd);
                    return (this);
                }
                /** set camera mode to Orthographic (ie: not Perspective) */
                setActive(player = 0) {
                    const gameCmd = {
                        action: 'setActive',
                        uuid: this.uuid,
                        player: player
                    };
                    babyengine_4.BabyEngine.broadcastToPlayers(gameCmd);
                    return (this);
                }
            };
            exports_9("BabyCamera", BabyCamera);
        }
    };
});
System.register("frontend/unittest", ["frontend/utilities"], function (exports_10, context_10) {
    "use strict";
    var utilities_3, consoleRed, consoleYellow, consoleBlue, consoleAqua, Unittests;
    var __moduleName = context_10 && context_10.id;
    // lots of rounding errors creep in, we sometimes need to check 'almost right'
    function almostEqual(a, b) {
        let maxDiff = Math.max(Math.abs(a), Math.abs(b), 0.5) / 100; // 1% of the bigger value (plus guard for div-by-zero)
        return (Math.abs(a) - Math.abs(b) < Math.abs(maxDiff)); // error is less than 1% of bigger value 
    }
    /////////////////////////////////////////
    /////////////////////////////////////////
    /////////////////////////////////////////
    async function testMove_Turn_Move(app) {
        console.log(app);
        const aTest = app.shape('cube').color('blue').addAxes();
        for (let i = 1; i < 5; i++) {
            await aTest.move('forward', 1).done();
            await aTest.turn('left', 0.25).done();
        }
    }
    function testCollide(app) {
        const b1 = app.shape('sphere');
        const b2 = app.shape('sphere').onCollide((who) => {
            if (who == b1) {
                // b1 and b2 collided
            }
        });
    }
    async function testPlace(app) {
        const duration = 3; // set longer if you want to see this test
        const aTest = app.shape('cube').addAxes();
        await aTest.color('green', duration).done();
        await aTest.color('pink', duration).done();
        await aTest.color('red', duration).done();
        await aTest.color('blue', duration).done();
        await aTest.color('green', duration).done();
        await aTest.color('pink', duration).done();
    }
    // async function testMove (app:Baby) {
    //   const duration = 1 // set longer if you want to see this test
    //   // console.log('testMove')
    //   const aTest = app.shape('cube')
    //   // move it up 5, see what happens
    //   const position1 = aTest.baby.babylonMeshs.shapeMap.get(aTest.uuid).babylonMesh.position.clone()
    //   // console.log('position1',position1)
    //   await aTest.move('up', 5, duration).done()
    //   const position2 = aTest.baby.babylonMeshs.shapeMap.get(aTest.uuid).babylonMesh.position.clone()
    //   // console.log('position2',position2)
    //   console.assert(Math.abs(position2.y - position1.y - 5) < 0.1, `2: abs(${position2.y} - ${position1.y} - 5) should be close to 0`)
    //   // move it right, see what happens
    //   await aTest.move('right', 5, duration).done()
    //   const position3 = aTest.baby.babylonMeshs.shapeMap.get(aTest.uuid).babylonMesh.position.clone()
    //   // console.log('position3',position3)
    //   console.assert(Math.abs(position3.x - position1.x - 5) < 0.1, `3: abs(${position3.x} - ${position1.x} - 5) should be close to 0`)
    //   // move it down, see what happens
    //   await aTest.move('down', 5, duration).done()
    //   const position4 = aTest.baby.babylonMeshs.shapeMap.get(aTest.uuid).babylonMesh.position.clone()
    //   // console.log('position4',position4)
    //   console.assert(Math.abs(position4.y - position1.y) < 0.1, `4: abs(${position4.x} - ${position1.x}) should be close to 0`)
    //   // move it backward, see what happens
    //   await aTest.move('backward', 5, duration).done()
    //   const position5 = aTest.baby.babylonMeshs.shapeMap.get(aTest.uuid).babylonMesh.position.clone()
    //   console.assert(Math.abs(position5.z - position1.z - 5) < 0.1, `5: abs(${position5.x} - ${position1.x} -5) should be close to 5`)
    //   // two moves, diagonal back to home
    //   aTest.move('left', 5, duration) // in parallel with next
    //   await aTest.move('forward', 5, duration).done()
    //   const position6 = aTest.baby.babylonMeshs.shapeMap.get(aTest.uuid).babylonMesh.position.clone()
    //   console.assert(Math.abs(position6.x - position1.x) < 0.1, `6: abs(${position6.x} - ${position1.x} ) should be close to 5`)
    //   aTest.dispose()
    // }
    // async function testTurn (app:Baby) {
    //   const duration = 1 // set longer if you want to see this test
    //   const angle = 0.5
    //   const aTest = app.shape('cube').addAxes()
    //   await aTest.turn('left', angle, duration).done()
    //   await aTest.turn('forward', angle, duration).done()
    //   await aTest.turn('tiltLeft', angle, duration).done()
    //   await aTest.turn('right', angle, duration).done()
    //   await aTest.turn('backward', angle, duration).done()
    //   await aTest.turn('tiltRight', angle, duration).done()
    //   const rotation = aTest.baby.babylonMeshs.shapeMap.get(aTest.uuid).babylonMesh.rotation
    //   console.assert(Math.abs(rotation.x) + Math.abs(rotation.y) + Math.abs(rotation.z) < 0.1, 'rotation should be close to 05')
    //   aTest.dispose()
    // }
    async function testMoveTurn(app) {
        const duration = 3; // set longer if you want to see this test
        const aTest = app.shape('cube').addAxes();
        // await aTest.move('forward',0,3).done()
        // await aTest.move('forward',10,duration).turn('left',1,duration).done()
        await aTest.moveAndTurn('forward', 10, 'left', 0.33, duration).done();
        await aTest.moveAndTurn('forward', 10, 'left', 0.33, duration).done();
        await aTest.moveAndTurn('forward', 10, 'left', 0.33, duration).done();
        await aTest.moveAndTurn('forward', 25, 'backward', 1, duration).done();
        await aTest.moveAndTurn('right', 25, 'tiltLeft', 1, duration).done();
        // aTest.dispose()
    }
    async function testMoveToward(app) {
        const duration = 3; // set longer if you want to see this test
        const aTest = app.shape('cube').addAxes();
        const bTest = app.shape('sphere').addAxes();
        for (let i = 0; i < 10; i++) {
            aTest.color('blue', duration);
            await aTest.moveAndTurn('forward', 5, 'left', 0.25, duration).done();
            aTest.color('red', duration);
            await bTest.moveToward(aTest, 5, duration).done();
        }
    }
    function getAllMethodNames(obj) {
        let methods = [];
        while (obj = Reflect.getPrototypeOf(obj)) {
            let keys = Reflect.ownKeys(obj);
            keys.forEach((k) => {
                let sK = k.toString(); // keys are not always strings
                if (!sK.includes('_')) // take out the ones like __getter
                    methods.push(sK);
            });
        }
        return methods;
    }
    return {
        setters: [
            function (utilities_3_1) {
                utilities_3 = utilities_3_1;
            }
        ],
        execute: function () {
            /// /////////////////////////////////////////////
            /// //// unit test this class
            consoleRed = 'background-color:red;color:white;';
            consoleYellow = 'background-color:yellow;color:black;';
            consoleBlue = 'background-color:blue;color:white;';
            consoleAqua = 'background-color:aqua;color:red;';
            // this module is removed from PRODUCTION by the tree-shaker.  
            // it is only available in DEVELOPMENT
            Unittests = class Unittests {
                constructor(app) {
                    this.app = app;
                }
                async unittestAll() {
                    console.log('%cStarting Unittests ' + this.app.version(), consoleAqua);
                    this.allBabyMethodsTestor(this.app);
                    // some non-visual tests
                    this.testHTMLColor();
                    // lets see the basic shapes, just a visual test
                    let a = this.arrayOfThings(this.app);
                    // let promise1 = new Promise((resolve, reject) => {
                    //     this.move(a)
                    // })
                    // let promise2 = new Promise((resolve, reject) => {
                    //     this.spin(a)
                    // })
                    this.spiral();
                    this.move(a);
                    await a[0].isIdle();
                    this.spin(a);
                    await a[0].isIdle();
                    this.scale(a);
                    await a[0].isIdle();
                    this.dispose(a);
                    // // now test some of the math
                    // await this.getPosition(app)
                    // await this.testPhysics(app)
                    console.log('%cEnding Unittests', consoleAqua);
                }
                async allBabyMethodsTestor(app) {
                    // test ALL Baby methods
                    let methods = getAllMethodNames(app); // Baby
                    // TODO: test for these, and for camera methods too
                    // test ALL BabyThings methods
                    let bt = app.shape('cube'); // create a BabyShape
                    let btMethods = getAllMethodNames(bt); // get its methods (some may be BabyThings)
                    // no test cases yet
                    bt.dispose(); // don't need it anymore
                    // console.log('btMethods', btMethods)
                    for (let i = 0; i < btMethods.length; i++) { // use for() because can't async in codeblock  
                        this.babyShapeTester(app, btMethods[i]); // and fire off each one
                    }
                }
                async spiral() {
                    let cube = this.app.cube();
                    for (let i = 0; i < 5; i++) {
                        let colors1 = ['red', 'yellow', 'green', 'blue', 'gold'];
                        let colors2 = ['cyan', 'aqua', 'skyblue', 'purple', 'teal'];
                        // await cube.penDown().color(colors[i]).moveAndTurn('left',5,'left',1).move('up',1).done()
                        await cube.penDown().color(colors1[i]).move('left', 5).move('up', .5).done();
                        await cube.penDown().color(colors2[i]).move('right', 5).move('up', .5).opacity(((4 - i) / 4)).done();
                    }
                    await cube.isIdle();
                    cube.dispose();
                }
                /** a simple test against every method in BabyShape */
                async babyShapeTester(app, method) {
                    switch (method) {
                        case "constructor":
                        case "onCollide":
                        case "onClick":
                        case "collide":
                        case "addAxes":
                        case "done":
                        case "isIdle":
                        case "dispose":
                            break; // no test yet
                        case "move":
                            let btMove = app.shape('cube'); // start each test with a new box
                            await btMove.move('forward', 5).move('left', 5).move('up', 5).done();
                            let pMove = btMove.getPosition();
                            console.assert(almostEqual(pMove.x, 5) && almostEqual(pMove.y, 5) && almostEqual(pMove.z, 5), `BabyShape.move [${pMove.z},${pMove.y},${pMove.z}]`);
                            btMove.dispose(); // and get rid of it
                            break;
                        case "turn":
                            let btTurn = app.shape('cube').addAxes(); // start each test with a new box
                            await btTurn.turn('left', .25).done();
                            await btTurn.turn('tiltLeft', .25).done();
                            await btTurn.turn('forward', .25).done();
                            await btTurn.turn('tiltRight', .25).done(); // should be back where we started
                            let pTurn = btTurn.getRotation();
                            console.assert(almostEqual(pTurn.x, 0) && almostEqual(pTurn.y, 0) && almostEqual(pTurn.z, 0), `BabyShape.turn [${pTurn.z},${pTurn.y},${pTurn.z}]`);
                            btTurn.dispose(); // and get rid of it
                            break;
                        case "moveAndTurn":
                        case "moveToward":
                        case "moveToZero":
                        case "turnToSame":
                        case "turnToZero":
                        case "size":
                        case "color":
                        case "opacity":
                        case "addSkeleton":
                        case "attachTo":
                        case "break":
                        case "setPosition":
                        case "addToPosition":
                        case "setRotation":
                        case "addToRotation":
                        case "getDistanceTo":
                        case "constructor":
                        case "getPosition":
                        case "getRotation":
                        case "getScale":
                        case "hasOwnProperty":
                        case "isPrototypeOf":
                        case "propertyIsEnumerable":
                        case "toString":
                        case "valueOf":
                        case "toLocaleString":
                            break;
                        default:
                            console.assert(false, `No test provided for BabyShape.${method}`);
                    }
                }
                async testAllBaby(app) {
                    for (var member in app) { // For each member of the dictionary
                        console.log('found a member ', member, typeof app[member]);
                        if (typeof app[member] == "function") { // Is it a function?
                            if (app.hasOwnProperty(member)) { // Not inherited
                                console.log('found member ', member); // do something...
                            }
                        }
                    }
                    // verifyAllFunctionsHandled(app1)
                    // let app2 = app1.shape('cube')
                    // verifyAllFunctionsHandled(app2)
                    // // verify that all functions accounted for
                    // function verifyAllFunctionsHandled(app) {
                    // }
                }
                /** creates an array of things to test */
                arrayOfThings(app) {
                    let ret = [];
                    let x = -6;
                    let y = 3; // up in the air
                    let z = 5; // and a little back
                    ret.push(app.shape('cube').setPosition(x += 2, y, z).addAxes().color('brown'));
                    ret.push(app.shape('sphere').setPosition(x += 2, y, z).addAxes().color('cyan'));
                    ret.push(app.shape('cylinder').setPosition(x += 2, y, z).addAxes().color('yellow'));
                    ret.push(app.shape('cone').setPosition(x += 2, y, z).addAxes().color('blue'));
                    ret.push(app.shape('capsule').setPosition(x += 2, y, z).addAxes().color('yellow'));
                    ret.push(app.shape('torus').setPosition(x += 2, y, z).addAxes().color('blue'));
                    return ret; // return one of each...
                }
                /** spin the collection of things we were passed */
                async spin(a) {
                    a.forEach(async (i) => {
                        await i.turn('left', .25).done();
                        await i.turn('tiltLeft', .25).done();
                        await i.turn('forward', .25).done();
                        await i.turn('tiltRight', .25).done(); // should be back where we started
                    });
                }
                /** just a jump to the left, and then a move to the right... */
                async move(a) {
                    a.forEach(async (i) => {
                        await i.move('left', 2).done();
                        await i.move('forward', 2).done();
                        await i.move('right', 2).done();
                        await i.move('backward', 2).done();
                    });
                }
                /** just a jump to the left, and then a move to the right... */
                async scale(a) {
                    a.forEach(async (i) => {
                        await i.size(2).done();
                        await i.size(.2).done();
                        await i.size(1).done();
                    });
                }
                /** dispose of an array of shapes */
                async dispose(a) {
                    a.forEach(async (i) => {
                        i.dispose();
                    });
                }
                // gentle test of getPosition(), move(), getDistanceTo(), moveToward()
                async getPosition(app) {
                    const aTest = app.shape('cube').color('blue').addAxes();
                    await aTest.move('left', 3).move('backward', 4).done();
                    let position = aTest.getPosition();
                    console.assert(almostEqual(position.x, -3), `${position.x} should be -3`);
                    // by pythagoras , the third side should be size '5'
                    console.assert(almostEqual(aTest.getPosition().length(), 5), ` ${aTest.getPosition().length()}should be 5`);
                    const bTest = app.shape('cube').color('blue').addAxes();
                    let distance = bTest.getDistanceTo(aTest);
                    console.assert(almostEqual(distance, 5), ` ${distance}should be 5`);
                    await bTest.moveToward(aTest, distance).done();
                    let distance2 = bTest.getDistanceTo(aTest);
                    console.assert(almostEqual(distance2, 0), ` ${distance2}should be 0`);
                    aTest.dispose();
                    bTest.dispose();
                }
                async testPhysics(app) {
                    const balls = [];
                    balls.push(app.shape('sphere').collide('active').move('left', 0.2, 0.1).move('forward', 0.2, 0.1));
                    for (let i = 0; i < 30; i++) {
                        balls.push(app.shape('sphere').collide('active').move('up', 2 + 1.1 * i, 0));
                    }
                }
                testHTMLColor() {
                    const c = utilities_3.HTMLColor('blue'); // color3 values are between 0 and 1
                    console.assert(c.r == 0, c.toString());
                    console.assert(c.g == 0, c.toString());
                    console.assert(c.b == 1, c.toString());
                    let t = utilities_3.HTMLColor('Yellow').toHexString();
                    console.assert(t == '#FFFF00', `Yellow isn't '${t}'`);
                    t = utilities_3.HTMLColor('White').toHexString();
                    console.assert(t == '#FFFFFF', `White isn't '${t}'`);
                    // test lowercase 'aliceblue
                    t = utilities_3.HTMLColor('AliceBlue').toHexString();
                    console.assert(t == '#F0F8FF', `aliceblue isn't '${t}'`);
                }
            };
            exports_10("Unittests", Unittests);
        }
    };
});
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-inferrable-types */
System.register("frontend/baby", ["frontend/unittest", "frontend/babything", "frontend/babyGUI", "middle/babyengine"], function (exports_11, context_11) {
    "use strict";
    var unittest_1, babything_4, babyGUI_1, babything_5, babyengine_5, Baby;
    var __moduleName = context_11 && context_11.id;
    return {
        setters: [
            function (unittest_1_1) {
                unittest_1 = unittest_1_1;
            },
            function (babything_4_1) {
                babything_4 = babything_4_1;
                babything_5 = babything_4_1;
            },
            function (babyGUI_1_1) {
                babyGUI_1 = babyGUI_1_1;
            },
            function (babyengine_5_1) {
                babyengine_5 = babyengine_5_1;
            }
        ],
        execute: function () {/* eslint-disable @typescript-eslint/no-unused-vars */
            /* eslint-disable @typescript-eslint/ban-types */
            /* eslint-disable @typescript-eslint/no-inferrable-types */
            /** For many games, `Baby()` is the only class you need to import.
             *
             * ```ts
             * import { Baby } from 'Baby'
             * app = new Baby()    // create an instance of Baby<br><br>
             * ```
             * @remarks
             *
             *
             * Then create the objects and events you need with methods like:
             *
             *  ```ts
             * floor = app.floor(20,20)               // lay down a floor
             * cube = app.shape('cube').color('red')  // add a red cube
             *
             * // hook the keyboard, and move the cube on each keypress
             * app.keydown((data)=>{ cube.move('right',1) })
             * ```
             *
             * <br><br>That's a pretty simple game, but it runs just fine.  We
             * explain it in the 'Getting  Started' tutorial.
             */
            Baby = class Baby {
                /** Start here.  `Baby()` is the only class you need to import.
                 *
                 * ```ts
                 * import { Baby } from 'wherever'
                 * app = new Baby()    // create an instance of the Baby engine.
                 * ```
                 */
                constructor() {
                    /** @ignore */
                    this.runUnittests = true;
                    /** @ignore */
                    this.uuidValue = 0;
                    this.babyEngine = new babyengine_5.BabyEngine(); // BabyEngine, before anything else
                    // this.camera() //'arcRotate', this.origin, 20, 10, 20)   // default camera
                    // can find the home position, eg:  pointAt(app.origin)
                    const origin = this.shape('cube').opacity(0, 0); // create in zero time
                    // csgDemo(this.scene, this.canvas)
                    /*
            
                              // // create a label card
                              // let sign = new SignBoard(5, 3, new Vector3(-5, 5, 1), this.scene);
                              // sign.drawText('Hinge', 2, 40, "Bold 40px monospace", "green");
                              // sign.drawText('hello world', 4, 70, "20px Arial", "blue");
            
                              // // add some axis lines (great for development)
                              // let axis = new AxisLines()
                              // axis.globalAxis(5, Vector3.Zero(), this.scene);
                              // axis.globalAxis(5, new Vector3(3, 3, 3), this.scene);
            
                              // // fire up a simple hinge
                              // let hinges = new Hinges();
                              // let myHinge = hinges.hinge(Vector3.Zero(), this.scene);
                      */
                    /// ///////////////////////////////////////////////////////
                    // calling unittest this way runs the test every time we run (good when working on a function)
                    // this runs every unittest when we click the 'unittest' button
                    // #!if unittest!==true
                    if (!this.runUnittests) {
                        // nothing here, this is what happens if no preprocessor
                    }
                    else {
                        // #!endif
                        let test = new unittest_1.Unittests(this);
                        // test.babyShapeTester(this, 'turn')
                        // test.spiral()
                        test.testPhysics(this);
                        // the unittest module will be removed by the tree-shaker in production. 
                        this.GUI('button')
                            .position('BottomRight')
                            .text('Unittests')
                            .onClick((playerN) => new unittest_1.Unittests(this).unittestAll()); // leave them right in the code for now
                        // #!if unittest!==true
                    }
                    // #!endif
                    /// ///////////////////////////////////////////////////////
                    return (this);
                }
                // async loader() {
                //     // The first parameter can be used to specify which mesh to import. Here we import all meshes
                //     let a = new GLTFFileLoader()
                //     await a.importMeshAsync('', this.scene, 'TinkerCraft.glb', "assets/",)
                //     //    Parameters
                //     //    meshesNames: any
                //     //    An array of mesh names, a single mesh name, or empty string for all meshes that filter what meshes are imported
                //     //    scene: Scene
                //     //    The scene to import into
                //     //    data: any
                //     //    The data to import
                //     //    rootUrl: string
                //     //    The root url for scene and resources
                // }
                version() {
                    return 'unknown';
                }
                /** freezes the scene while keeping the engine running; expecially useful with the inspector.
                * @remarks
                * ```
                * Add a button to freeze your sceen:
                *    let frozen = false
                *    app.GUI('button')
                *        .position('BottomLeft')
                *        .text('Freeze')
                *        .onClick(() => {
                *            app.freeze(!frozen)
                *            frozen = !frozen;
                *        })
                * ```
                */
                freeze(onOff = true) {
                    babyengine_5.BabyEngine.frozen = onOff;
                    return this;
                }
                /** trap keydown, look at the data object for ctrl-, alt-, etc */
                keydown(keyFunction) {
                    babyengine_5.BabyEngine.addObserver('keydown', (data) => {
                        keyFunction(data);
                    });
                    return this;
                }
                /** trap keypress, look at the data object for ctrl-, alt-, etc */
                keypress(keyFunction) {
                    babyengine_5.BabyEngine.addObserver('keypress', (data) => {
                        keyFunction(data);
                    });
                    return this;
                }
                /** trap keyup, look at the data object for ctrl-, alt-, etc */
                keyup(keyFunction) {
                    babyengine_5.BabyEngine.addObserver('keyup', (data) => {
                        keyFunction(data);
                    });
                    return this;
                }
                multiPlayer() {
                    return this;
                }
                /////////////////////////////////////////////////
                //  these are the creation methods for 'basic'
                // shapes, floors, loaders, csgs, etc.  
                /////////////////////////////////////////////////
                /** Create an 'Shape', which is a single graphic element.  `Baby.Shape('Cube') is the same as calling `Baby.Cube()`,
                 * but not all shapes have direct calls and you can add new shapes.
                 * The standard shapes are cube, sphere, cylinder, cone, torus, capsule, point, and floor. */
                shape(model) {
                    const newE = new babything_4.BabyShape(model, this.babyEngine); // creates the game-writer's object
                    const gameCmd = {
                        action: 'createBabylonMesh',
                        uuid: newE.uuid,
                        model: model,
                    };
                    babyengine_5.BabyEngine.broadcastToPlayers(gameCmd); // eventually creates the babylonjs object
                    return (newE);
                }
                /** Create a Cube (which you can resize into a cuboid) */
                cube() { return (this.shape('cube')); }
                /** Create a Sphere (which you can resize into an spheroid */
                sphere() { return (this.shape('sphere')); }
                /** Create a Cylinder */
                cylinder() { return (this.shape('cylinder')); }
                /** Create a Cone (strictly speaking, an cone is a cylinder) */
                cone() { return (this.shape('cone')); }
                /** Create a Capsule */
                capsule() { return (this.shape('capsule')); }
                /** Create a Torus */
                torus() { return (this.shape('torus')); }
                /** Create a Point (think of a sphere that is too small to see) */
                point() { return (this.shape('point')); }
                importShape(directory, filename) {
                    const model = 'import';
                    const newE = new babything_4.BabyShape(model, this.babyEngine); // creates the game-writer's object
                    const gameCmd = {
                        action: 'importShape',
                        uuid: newE.uuid,
                        directory: directory,
                        filename: filename,
                    };
                    babyengine_5.BabyEngine.broadcastToPlayers(gameCmd); // eventually creates the babylonjs object
                    return (newE);
                }
                /** Add a floor object with  a default grid. Use .collide('solid') if you want to bounce off it. */
                floor(xSize, ySize, major = 1) {
                    const newE = new babything_4.BabyShape('floor', this.babyEngine); // creates the game-writer's object
                    const gameCmd = {
                        action: 'createBabylonMesh',
                        uuid: newE.uuid,
                        model: 'floor',
                        x: xSize,
                        y: ySize,
                        major: major
                    };
                    babyengine_5.BabyEngine.broadcastToPlayers(gameCmd); // eventually creates the babylonjs object
                    return (newE);
                }
                //    // default camera
                //    const camera = new ArcRotateCamera('Camera', 0, 0, 15, new Vector3(-0, -5, 0), this.scene)
                //    camera.setPosition(new Vector3(5, 20, -20))
                //    camera.minZ = 5.0
                //    camera.attachControl(this.canvas, true)
                // for follow, see https://www.babylonjs-playground.com/#0JK6VN#31
                /** A 'camera' defines the player, a multi-player game may have multiple cameras.
                 * This is the default 3D camera, look at `OrthoCamera` for 2D
                */
                camera() {
                    // TODO: Lots more work required here
                    const newE = new babything_5.BabyCamera('camera', this.babyEngine); // creates the game-writer's object
                    // console.log ("camera handle ", newE.uuid)
                    const gameCmd = {
                        action: 'setCamera',
                        uuid: newE.uuid,
                        model: 'arcRotate',
                    };
                    babyengine_5.BabyEngine.broadcastToPlayers(gameCmd); // eventually creates the babylonjs object
                    return (newE);
                }
                // orthoCamera(){
                //     const newE = new BabyCamera('camera', this.babyEngine) // creates the game-writer's object
                //     console.log ("OrthoCamera handle ", newE.uuid)
                //     const gameCmd: gameCmd = {
                //         action: 'setCamera',
                //         uuid: newE.uuid,
                //         model: 'orthocamera',
                //     }
                //     BabyEngine.broadcastToPlayers(gameCmd) // eventually creates the babylonjs object
                //     return (newE)
                // }
                /** Turn on the BabylonJS Inspector.  Only for player0.
                 * only valid parameter at this point is 'record', which captures the first 7 seconds of your game in video
                */
                inspector(stringParm = '') {
                    // TODO: is this player0 ??
                    // this.scene.debugLayer.show()
                    const gameCmd = {
                        action: 'inspector',
                        uuid: -1,
                        stringParm: stringParm
                    };
                    babyengine_5.BabyEngine.broadcastToPlayers(gameCmd); // eventually creates the babylonjs object
                    return (this);
                }
                /// ///////////
                /// some utilities
                /// //////////
                // TODO
                /** random integer between min (includes) and max (excludes).  so randomIntBetween(2,5) might return 2,3, or 4, but not 5. */
                randomIntBetween(min, max) {
                    min = Math.ceil(min);
                    max = Math.floor(max);
                    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
                }
                ////////////////////////////// buttons  ////////////////
                /** Create a 'Button'.  */
                GUI(model) {
                    // role: 'Primary' | 'Secondary' | 'Success' | 'Danger' | 'Warning' | 'Info' | 'Light' | 'Dark' = 'Primary',
                    // position: 'Top' | 'TopLeft' | 'TopRight' | 'Left' | 'Right' | 'Bottom' | 'BotRight' | 'BotLeft' | 'Center' = 'Center'): BabyGUI {
                    const newE = new babyGUI_1.BabyGUI(model, this, this.babyEngine); // creates the game-writer's object
                    const gameCmd = {
                        action: 'createGUI',
                        uuid: newE.uuid,
                        model: model,
                    };
                    babyengine_5.BabyEngine.broadcastToPlayers(gameCmd); // eventually creates the babylonjs object
                    return (newE);
                }
            };
            exports_11("Baby", Baby);
        }
    };
});
System.register("index", ["frontend/baby"], function (exports_12, context_12) {
    "use strict";
    var __moduleName = context_12 && context_12.id;
    return {
        setters: [
            function (baby_1_1) {
                exports_12({
                    "Baby": baby_1_1["Baby"]
                });
            }
        ],
        execute: function () {
        }
    };
});
System.register("frontend/csg", ["babylonjs"], function (exports_13, context_13) {
    "use strict";
    var babylonjs_12;
    var __moduleName = context_13 && context_13.id;
    function csgDemo(scene, canvas) {
        const sourceMat = new babylonjs_12.StandardMaterial('sourceMat', scene);
        sourceMat.wireframe = true;
        sourceMat.backFaceCulling = false;
        const a = babylonjs_12.Mesh.CreateSphere('sphere', 16, 4, scene);
        const b = babylonjs_12.Mesh.CreateBox('cube', 4, scene);
        const c = babylonjs_12.Mesh.CreateBox('cube', 4, scene);
        a.material = sourceMat;
        b.material = sourceMat;
        c.material = sourceMat;
        a.position.y += 5;
        b.position.y += 2.5;
        c.position.y += 3.5;
        c.rotation.y += Math.PI / 8.0;
        const aCSG = babylonjs_12.CSG.FromMesh(a);
        const bCSG = babylonjs_12.CSG.FromMesh(b);
        const cCSG = babylonjs_12.CSG.FromMesh(c);
        // Set up a MultiMaterial
        const mat0 = new babylonjs_12.StandardMaterial('mat0', scene);
        const mat1 = new babylonjs_12.StandardMaterial('mat1', scene);
        mat0.diffuseColor.copyFromFloats(0.8, 0.2, 0.2);
        mat0.backFaceCulling = false;
        mat1.diffuseColor.copyFromFloats(0.2, 0.8, 0.2);
        mat1.backFaceCulling = false;
        let subCSG = bCSG.subtract(aCSG);
        let newMesh = subCSG.toMesh('csg', mat0, scene);
        newMesh.position = new babylonjs_12.Vector3(-10, 0, 0);
        subCSG = aCSG.subtract(bCSG);
        newMesh = subCSG.toMesh('csg2', mat0, scene);
        newMesh.position = new babylonjs_12.Vector3(10, 0, 0);
        subCSG = aCSG.intersect(bCSG);
        newMesh = subCSG.toMesh('csg3', mat0, scene);
        newMesh.position = new babylonjs_12.Vector3(0, 0, 10);
        // Submeshes are built in order : mat0 will be for the first cube, and mat1 for the second
        const multiMat = new babylonjs_12.MultiMaterial('multiMat', scene);
        multiMat.subMaterials.push(mat0, mat1);
        // Last parameter to true means you want to build 1 subMesh for each mesh involved
        subCSG = bCSG.subtract(cCSG);
        newMesh = subCSG.toMesh('csg4', multiMat, scene, true);
        newMesh.position = new babylonjs_12.Vector3(0, 0, -10);
        return scene;
    }
    exports_13("csgDemo", csgDemo);
    return {
        setters: [
            function (babylonjs_12_1) {
                babylonjs_12 = babylonjs_12_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("games/snake", ["frontend/baby"], function (exports_14, context_14) {
    "use strict";
    var baby_2, xMax, yMax, app, snakeHead, snake, snakeMoves, camera, floor, apple, duration, top, bottom, left, right, direction;
    var __moduleName = context_14 && context_14.id;
    async function snakeGame(app) {
        // set up 'teleport' bumpers at the edges of the board
        // should be in zero time, but default to 1 second for tutorial purposes
        top.move('backward', yMax / 2 + 0.5).size([xMax, 1, 1]).opacity(.1).collide('solid');
        bottom.move('forward', yMax / 2 + 0.5).size([xMax, 1, 1]).opacity(.1).collide('solid');
        left.move('left', xMax / 2 + 0.5).size([1, 1, yMax]).opacity(.1).collide('solid');
        right.move('right', xMax / 2 + 0.5).size([1, 1, yMax]).opacity(.1).collide('solid');
        await top.done(); // could use ANY bumper, they all set up at the same speed
        apple.collide('solid').onCollide((other) => {
            if (other == snakeHead) {
                // because the snake hit us, add a new element to the front of the snake at the
                // position of the apple
                let newElement = newSnakeElement();
                newElement.moveToward(apple, newElement.getDistanceTo(apple), 0);
                snake.unshift(newElement); // add a new element at the FRONT of the snake 
                snakeHead = newElement; // in JS, this is just a pointer
                snakeHead.move(direction, 1, duration); // move and wait
                snakeHead.color('red');
                // move it forward/backward and left/right by some random amount, in zero time
                apple.moveToZero(0);
                apple.move('forward', app.randomIntBetween(-yMax / 2 + 1, yMax / 2), 0);
                apple.move('left', app.randomIntBetween(-xMax / 2 + 1, xMax / 2), 0);
            }
        });
        // add the first element to the snake array
        snakeHead = newSnakeElement();
        snake.push(snakeHead);
        snakeMoves.push('forward');
        // start the action.  from here, it's all driven by collisions and keystrokes
        for (;;) { // while (true) {
            for (let i = 1; i < snake.length; i++)
                snake[i].move(snakeMoves[i], 1, duration);
            // console.log(snakeMoves)
            await snakeHead.move(direction, 1, duration).done(); // move and wait
            snakeMoves.unshift(direction); // add direction to the top of the move queue
            if (snakeMoves.length > snake.length)
                snakeMoves.pop(); // don't need these at the end
        }
    }
    function newSnakeElement() {
        // define a snake element with a collision function.
        let snakeElement = app.shape('cube');
        snakeElement.color('red', 0); // take a second to color to red
        // add a collision event to 'teleport' if we hit a bumper
        snakeElement.collide('solid').onCollide((other) => {
            switch (other) {
                case top:
                    snakeElement.move('forward', yMax - 1, 0);
                    break;
                case bottom:
                    snakeElement.move('backward', yMax - 1, 0);
                    break;
                case left:
                    snakeElement.move('right', xMax - 1, 0);
                    break;
                case right:
                    snakeElement.move('left', xMax - 1, 0);
                    break;
                default:
                // throw ('did not expect to collide with something else')
            }
        });
        snakeMoves.unshift(direction); // add direction to the top of the move queue for this cube
        return (snakeElement);
    }
    // ask for keyboard notifications
    function snakeKeyDown(data) {
        console.log('in snakekeyDown');
        switch (data['code']) {
            case 'KeyA':
                direction = 'left';
                break;
            case 'KeyW':
                direction = 'forward';
                break;
            case 'KeyD':
                direction = 'right';
                break;
            case 'KeyS':
                direction = 'backward';
                break;
            default:
        }
    }
    return {
        setters: [
            function (baby_2_1) {
                baby_2 = baby_2_1;
            }
        ],
        execute: function () {
            // define the size of the board
            xMax = 20; // best with even numbers, or half-squares at sides of floor
            yMax = 20;
            // initialize the game engine.
            app = new baby_2.Baby().keydown(snakeKeyDown); //.inspector()
            snake = []; // array of snake segments
            snakeMoves = []; // the Nth segment should move in the Nth direction of this array
            camera = app.camera().moveToZero(5); //.move('backward',20,0)
            floor = app.floor(xMax, yMax, 5); //  majorgrid lines every 5
            apple = app.shape('sphere').color('green').move('left', 3, 0); // an apple that we place randomly
            duration = 0.2;
            // these are the bumpers
            top = app.shape('cube');
            bottom = app.shape('cube');
            left = app.shape('cube');
            right = app.shape('cube');
            direction = 'forward';
            app.GUI('button').position("Top").text('Ready Player One');
            app.GUI('button').position("TopLeft").text('Use the WASD keys').role('Danger');
            // we want the game in an ASYNC function.  
            snakeGame(app); // and run the game in an async function
        }
    };
});
//  ABLY Private API Key  prefix:  Ui15tQ
// Ui15tQ.PluWTw:1AblFCqygSLQAPwl    // default
// import { config, parse } from "dotenv";
// const env = config();
// const dbUrl: string | null =
//   env.error || !env.parsed ? null : env.parsed["BASIC"];
// config({
//   path: ".env-example",
//   encoding: "utf8",
//   debug: true
// });
// const parsed = parse("NODE_ENV=production\nDB_HOST=a.b.c");
// const dbHost: string = parsed["DB_HOST"];
// const parsedFromBuffer = parse(new Buffer("JUSTICE=league\n"), {
//   debug: true
// });
// const justice: string = parsedFromBuffer["JUSTICE"];
// // publish
// var ably = new Ably.Realtime('Ui15tQ.PluWTw:1AblFCqygSLQAPwl');
// var channel = ably.channels.get('test');
// // Publish a message to the test channel
// channel.publish('greeting', 'hello');
// // subscribe
// // Subscribe to messages on channel
// channel.subscribe('greeting', function(message) {
//     alert(message.data);
//   });
// // simple API example
// var ably = new Ably.Realtime('xVLyHw.3LvcMg:oIRcU7-R4gwTqTfD');
// var channel = ably.channels.get('psychology');
// $('input#publish').on('click', function() {
//   channel.publish('greeting', 'Hello from the browser2');
// });
// channel.subscribe(function(message) {
//   show('⬅ Received: ' + message.data);
// });
// function show(status) {
//   $('#channel-status').append($('<li>').text(status).css('color', 'green'));
// }
//# sourceMappingURL=baby.js.map