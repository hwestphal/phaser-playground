/****  I had to add this to node_modules/babylonjs/babylon.module.d.ts
 * issue is latest version of typescript vs latest version of babylon
 *
 *
interface OffscreenCanvas extends HTMLCanvasElement{}
interface MouseWheelEvent extends PointerEvent{}
interface OffscreenCanvasRenderingContext2D extends CanvasRenderingContext2D{}
type NavigatorUserMediaSuccessCallback = any
type NavigatorUserMediaErrorCallback = any
type MSGesture = any
interface WebGLObject {}
declare var WebGLObject: {
    prototype: WebGLObject;
    new(): WebGLObject;
};

*/



import * as monaco from "monaco-editor";
import * as BABYLON from 'babylonjs';
import * as PlanetCute from './planetcute'


import lib_es5 from "./extraLibs/lib.es5.d.ts.txt";
// import lib_baby from "./extraLibs/baby.d.ts.txt";
import lib_dom_mini from "./extraLibs/lib.dom_mini.d.ts.txt";
// import lib_dom from "./extraLibs/lib.dom.d.ts.txt";
import lib_promise from "./extraLibs/lib.es2015.promise.d.ts.txt";

import lib_es2015_collection from "./extraLibs/lib.es2015.collection.d.ts.txt"
import lib_es2015_core from "./extraLibs/lib.es2015.core.d.ts.txt"
import lib_es2015_promise from "./extraLibs/lib.es2015.promise.d.ts.txt"
import lib_es2016_array_include from "./extraLibs/lib.es2016.array.include.d.ts.txt"
import lib_es2017_string from "./extraLibs/lib.es2017.string.d.ts.txt"
import lib_es2017_typedarrays from "./extraLibs/lib.es2017.typedarrays.d.ts.txt"
import lib_es2018_asynciterable from "./extraLibs/lib.es2018.asynciterable.d.ts.txt"
import lib_es2019_string from "./extraLibs/lib.es2019.string.d.ts.txt"
import lib_es2020_bigint from "./extraLibs/lib.es2020.bigint.d.ts.txt"
import lib_es2021_string from "./extraLibs/lib.es2021.string.d.ts.txt"

import babylonjs from "./extraLibs/babylonjs.d.ts.txt"

import lib_es2099 from "./extraLibs/lib.es2099.d.ts.txt"

// import lib_jsx_tiny from "./extraLibs/jsx_tiny.d.ts.txt"
// import lib_jsxgraph from "./extraLibs/jsxgraph.d.ts.txt"

import mathcode from "./extraLibs/mathcode.d.ts.txt"
import matter from "./extraLibs/matter.d.ts.txt"
import TSX from "./extraLibs/jsxgraph.d.ts.txt"

import { RuntimeAnimation } from "babylonjs/Animations/runtimeAnimation";
import { Observable } from "./observer";

// let x = JXG         // just to make sure webpack loads them
// let y = BABYLON




// let known = [2]

// let foo = (n: number) => (n + 1)
// for (let i = 0; i < 10; i++) {
//     foo(i)
// }

// // using reduce()
// let t:number
// // reducer simply adds up ALL the remainders.
// let reducer = (accumulator:number,currentV:number) => accumulator + (t % currentV==0?0:1 )
// for (t = 3; t < 150; t++)
//     if (known.reduce(reducer)>0)
//         known.push(t)

// console.log(known)

// // using filter()
// known=[]
// for (let t = 3; t < 150; t++)
//     if (known.filter((n) => t % n == 0).length == 0)
//         known.push(t)

// console.log(known)


// // using find()
// known=[]
// for (let t = 3; t < 150; t++)
//     if (known.find((n) => t % n == 0)==undefined)
//         known.push(t)

// console.log(known)









// import { Baby } from 'baby'

// the Editor is also responsible for RUNNING the game.  if you want to
// run a snippet without user input, then you STILL give it to the editor to run.



export class Editor {

    editor: monaco.editor.IStandaloneCodeEditor
    initFile: string = ''
    el: HTMLElement
    storageKey: string
    safeDelay: number

    systemDeclTS = ''     // hidden stuff that goes into all editors
    systemDeclJS = ''   // same hidden stuff in JS

    prefixDecl = ''     // hidden decl for TS for THIS instance of the editor
    prefixCode = ''     // hidden code for THIS instance of the editor

    editorCode = ''
    commandCode = ''

    constructor(el: HTMLElement, initFile: string) {
        // console.log('%cSTARTING EDITOR','background-color:blue;color:white;')
        // return;
        this.el = el
        this.initFile = initFile
        this.storageKey = ''
        this.safeDelay = 5000


        monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
            allowNonTsExtensions: true,
            inlineSourceMap: true,
            inlineSources: true,
            noLib: true,
            sourceMap: false,
            strict: false,
            alwaysStrict: false,

            noImplicitAny: false,

            noUnusedParameters: false,       // easier for beginners
            noUnusedLocals: true,            // i filter those errors out from the alert

            strictFunctionTypes: true,       // show the error, it will run anyhow
            strictNullChecks: true,

            allowUnreachableCode: true,
            allowUnusedLabels: true,
            noImplicitThis: true,
            noImplicitReturns: true,
            target: monaco.languages.typescript.ScriptTarget.ES2020,
        });

        monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
            noSemanticValidation: true,
            noSyntaxValidation: true
        });

        monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
            target: monaco.languages.typescript.ScriptTarget.ES2020,
            noLib: true,                        // don't bring in everything
        });

        monaco.editor.defineTheme('myTheme', {
            base: 'vs',
            inherit: true,
            rules: [],
            colors: {
                'editorInlayHint.foreground': '#00FF00',
                'editorInlayHint.background': '#FF00FF',
            }
        });


        var console: Console;


        // monaco.languages.typescript.typescriptDefaults.addExtraLib(lib_baby_plus, "lib.baby.d.ts");
        monaco.languages.typescript.typescriptDefaults.addExtraLib(lib_es5, "lib.es5.d.ts");
        monaco.languages.typescript.typescriptDefaults.addExtraLib(lib_dom_mini, "lib.dom_mini.d.ts");
        // monaco.languages.typescript.typescriptDefaults.addExtraLib(lib_dom, "lib.dom.d.ts");
        monaco.languages.typescript.typescriptDefaults.addExtraLib(lib_promise, "lib.es2015.promise.d.ts");

        monaco.languages.typescript.typescriptDefaults.addExtraLib(lib_es2015_collection)
        monaco.languages.typescript.typescriptDefaults.addExtraLib(lib_es2015_core)
        monaco.languages.typescript.typescriptDefaults.addExtraLib(lib_es2016_array_include)
        monaco.languages.typescript.typescriptDefaults.addExtraLib(lib_es2017_string)
        monaco.languages.typescript.typescriptDefaults.addExtraLib(lib_es2017_typedarrays)
        monaco.languages.typescript.typescriptDefaults.addExtraLib(lib_es2018_asynciterable)
        monaco.languages.typescript.typescriptDefaults.addExtraLib(lib_es2019_string)
        monaco.languages.typescript.typescriptDefaults.addExtraLib(lib_es2020_bigint)
        monaco.languages.typescript.typescriptDefaults.addExtraLib(lib_es2021_string)

        monaco.languages.typescript.typescriptDefaults.addExtraLib(babylonjs)

        monaco.languages.typescript.typescriptDefaults.addExtraLib(lib_es2099)      // stuff that Typescript hasn't provided

        // monaco.languages.typescript.typescriptDefaults.addExtraLib(lib_jsx_tiny)    // my simply remix of the upper level call

        monaco.languages.typescript.typescriptDefaults.addExtraLib(TSX)    // wrapper version
        monaco.languages.typescript.typescriptDefaults.addExtraLib(mathcode)    // my simply remix of the upper level call
        monaco.languages.typescript.typescriptDefaults.addExtraLib(matter)    // my simply remix of the upper level call

        // this stuff has to go into the EVAL, since it doesn't see otherwise

        // TYPESCRIPT preloaded into editor
        this.systemDeclTS =
            `
            // const doc = document
            const Mathcode:Mathcode = window.Mathcode
            // const JSXGraph.JSXGraph = window.JSXGraph
            // const Mathcode = window.Mathcode
            // const JXG = window.JXG   // (window as any).JXG
            const BABYLON = window.BABYLON
            const Matter = window.Matter
            const document = window.document
            // let _canvas = document.getElementById("canvas") as HTMLCanvasElement
            // let canvas = document.getElementById("canvas") as HTMLCanvasElement
            let jxgbox = document.getElementById("jxgbox")
            // let canvas2D = document.getElementById("canvas2D") as HTMLCanvasElement
            // let canvas3D = document.getElementById("canvas3D") as HTMLCanvasElement
            // var ctx = canvas.getContext("2d")!   // this causes WebGL to fail
            // const window.PlanetCute = new PlanetCute()
            // const PlanetCute = window.PlanetCute
            // const engine = new BABYLON.Engine(canvas, true);
            let VT = Mathcode.VT52()
            const JSXGraph = new TSX.JSXGraph()
            `


        // must be JAVASCRIPT, not TYPESCRIPT
        this.systemDeclJS =
            `
            // const doc = document
            // const JXG = window.JXG   // (window as any).JXG
            const Mathcode = window.Mathcode
            // const JSXGraph = window.TSX
            const BABYLON = window.BABYLON
            const Matter = window.Matter
            const document = window.document
            // let _canvas = document.getElementById("canvas")
            // let canvas = document.getElementById("canvas")
            let jxgbox = document.getElementById("jxgbox")

            // let canvas2D = document.getElementById("canvas2D")
            // let canvas3D = document.getElementById("canvas3D")
            // let ctx =  canvas.getContext("2d")  // this causes WebGL to fail
            // const window.PlanetCute = new PlanetCute()
            // const PlanetCute = window.PlanetCute
            // const engine = new BABYLON.Engine(canvas, true);
            let VT = Mathcode.VT52()
            const JSXGraph = window.TSX.JSXGraph()
//
            let currentParagraph = "jxgbox"
`

        this.prefixDecl =
            `declare function answer(myAnswer:string|number|number[]):bool;`



        this.prefixCode =
            `function answer(myAnswer){
                return (myAnswer == '42')
            }`


        monaco.languages.typescript.typescriptDefaults.addExtraLib(this.systemDeclTS)
        monaco.languages.typescript.typescriptDefaults.addExtraLib(this.prefixDecl)

        this.editor = monaco.editor.create(this.el, {
            automaticLayout: true,
            language: "typescript",
            // language: "javascript",
            scrollBeyondLastLine: true,

            value: window.localStorage.getItem(this.storageKey) || this.initFile,
            minimap: {
                enabled: false
            }
        });
        let safeTimeout: number;
        this.editor.onDidChangeModelContent(() => {
            if (safeTimeout) {
                clearTimeout(safeTimeout);
            }
            safeTimeout = window.setTimeout(
                () => {
                    window.localStorage.setItem(this.storageKey, this.editor.getValue()),
                        this.safeDelay
                })

        });
    }

    download(fileName: string) {
        console.log('clicked on upload')
        const data = new Blob([this.editor.getValue()], { type: "text/plain" });
        if (this.initFile) {
            window.URL.revokeObjectURL(this.initFile);
        }
        this.initFile = window.URL.createObjectURL(data);
        const link = document.createElement("a");
        link.download = fileName;
        link.href = this.initFile;
        link.dispatchEvent(new MouseEvent("click"));
    }

    upload() {
        console.log('clicked on upload')
        const input = document.createElement("input");
        input.type = "file";
        input.onchange = () => {
            const fileReader = new FileReader();
            fileReader.onload = () => this.editor.setValue(fileReader.result as string);
            fileReader.readAsText(input.files![0]);
        };
        input.click();
    }

    copyToEditor(code: string) {
        this.editor.setValue(code)
    }


    command(fileName: string) {
        console.log('clicked on command')
    }



    async transpile(scope: any = {}) {
        // return;
        console.log('in transpile()', scope)
        const names = Object.keys(scope);
        const args = names.map((key) => scope[key]);
        const model = this.editor.getModel();   // typescript needs a typeguard to be happy
        // console.log('model from editor is', model)

        if (model !== null) {
            const resource = model.uri;

            const crud = monaco.editor.getModelMarkers({ resource })
            console.log('crud', crud);

            const errors = monaco.editor.getModelMarkers({ resource })
            let errorString = ''
            errors.forEach(m => {
                switch (m.code) {
                    case '6133':        // ignore 'unused local' errors
                    case '7044':        // ignore parameter not typed errors
                        break;
                    default:
                        errorString += `Line ${m.startLineNumber}: ${m.message} (${m.code})\n`;
                }
            });
            if (errorString.length > 0) {
                // alert('errors coming')    //
                alert(errorString)    //
                return
            }


            const worker = await monaco.languages.typescript.getTypeScriptWorker();
            const client = await worker(resource);
            const output = await client.getEmitOutput(resource.toString());
            const sourceCode = await client.getScriptText(resource.toString())

            const line = this.editor.getPosition()!.lineNumber
            const col = this.editor.getPosition()!.column;

            // console.log(sourceCode)
            // Log.writeMoodleLog({'datacode': 'LOG_EditorRun', data01: sourceCode, data02: line.toString(), data03: col.toString() })

            this.editorCode = output.outputFiles[0].text as string;
            this.runEditorCode(this.editorCode)      // and run the whole mess
        }

        // if model is null, do nothing
    }


    runEditorCode(editorCode: string) {


        let code = ''
        code += this.systemDeclJS + "\r\n"
        code += this.prefixCode + "\r\n"
        code += editorCode + "\r\n"
        code += this.commandCode + "\r\n"

        // console.log(code)

        // wipe any observables from the last run
        Observable.resetUserObservers()

        // eval() is crazy dangerous because it runs in the local context
        // Function() is a bit safer, but not much

        let f = new Function(code)
        f()
    }


}





// new Function(src) is a safer form of eval().
// code = `app.floor(30,30,5);let cube = app.cube().color('blue').move('up',1)`
// var app = new Baby(code)

// return () => new Function(src).call(window, args);
// // } else {
//     return () => { alert("no source"); };  // have to return something if typeguard fails








            // new Function(src) is a safer form of eval().
            // let code = `app.floor(30,30,5);let cube = app.cube().color('blue').move('up',1)`

            // let app = new Baby(code)        // passes code into Baby to be run
            // new Function(src) is a safer form of eval().

            // let vt = this.vt52()
            // vt.print('HELLO WORLD')
            // await vt.print('done')
            // console.log('done')


            // let src = "use strict";(function(${names.join()}) {eval(${JSON.stringify(code)})}).apply(this, arguments[0]);


            // new Function(src) is a safer form of eval().

            // let f = new Function(src)
            // f.call(app)
            //     return () => new Function(src).call(window, args);
            // } else {



//    https://microsoft.github.io/monaco-editor/playground.html#extending-language-services-configure-javascript-defaults

// // Add additonal d.ts files to the JavaScript language service and change.
// // Also change the default compilation options.
// // The sample below shows how a class Facts is declared and introduced
// // to the system and how the compiler is told to use ES6 (target=2).

// // validation settings
// monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
// 	noSemanticValidation: true,
// 	noSyntaxValidation: false
// });

// // compiler options
// monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
// 	target: monaco.languages.typescript.ScriptTarget.Latest,
//     allowNonTsExtensions: true,
//     noLib: true,                        // don't bring in everything
// });

// // extra libraries
// var libSource = [
// 	'declare class Facts {',
// 	'    /**',
// 	'     * Returns the next fact',
// 	'     */',
// 	'    static next():string',
// 	'}',
// ].join('\n');
// var libUri = 'ts:filename/facts.d.ts';
// monaco.languages.typescript.javascriptDefaults.addExtraLib(libSource, libUri);
// // When resolving definitions and references, the editor will try to use created models.
// // Creating a model for the library allows "peek definition/references" commands to work with the library.
// monaco.editor.createModel(libSource, 'typescript', monaco.Uri.parse(libUri));

// var jsCode = [
// 	'"use strict";',
// 	'',
// 	'class Chuck {',
// 	'    greet() {',
// 	'        return Facts.next();',
// 	'    }',
// 	'}'
// ].join('\n');

// monaco.editor.create(document.getElementById('container'), {
// 	value: jsCode,
// 	language: 'javascript'
// });
//