import * as monaco from "monaco-editor";
import lib_es5 from "./extraLibs/lib.es5.d.ts.txt";
// import lib_baby from "./extraLibs/baby.d.ts.txt";
// import lib_dom from "./extraLibs/lib.dom_mini.d.ts.txt";
import lib_dom from "./extraLibs/lib.dom.d.ts.txt";
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

import lib_es2099 from "./extraLibs/lib.es2099.d.ts.txt"


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


    constructor(el: HTMLElement, initFile: string) {

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

            noImplicitAny: false,

            noUnusedParameters:false,       // easier for beginners
            noUnusedLocals:false,

            strictFunctionTypes: true,
            strictNullChecks:true,
             
            allowUnreachableCode: true,
            allowUnusedLabels: true,
            noImplicitThis: true,
            noImplicitReturns: true,
            target: monaco.languages.typescript.ScriptTarget.ES2020,
        });

        // monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
        //     target: monaco.languages.typescript.ScriptTarget.ES2020,
        //     allowNonTsExtensions: true,
        //     noUnusedLocals:false,
        //     noLib: true,                        // don't bring in everything
        // });


        var console: Console;
        
   
        // monaco.languages.typescript.typescriptDefaults.addExtraLib(lib_baby_plus, "lib.baby.d.ts");
        monaco.languages.typescript.typescriptDefaults.addExtraLib(lib_es5, "lib.es5.d.ts");
        // monaco.languages.typescript.typescriptDefaults.addExtraLib(lib_dom, "lib.dom_mini.d.ts");
        monaco.languages.typescript.typescriptDefaults.addExtraLib(lib_dom, "lib.dom.d.ts");
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

        monaco.languages.typescript.typescriptDefaults.addExtraLib(lib_es2099)      // stuff that Typescript hasn't provided


        this.editor = monaco.editor.create(this.el, {
            automaticLayout: true,
            language: "typescript",
            scrollBeyondLastLine: false,
            value: window.localStorage.getItem(this.storageKey) || this.initFile,
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
        const input = document.createElement("input");
        input.type = "file";
        input.onchange = () => {
            const fileReader = new FileReader();
            fileReader.onload = () => this.editor.setValue(fileReader.result as string);
            fileReader.readAsText(input.files![0]);
        };
        input.click();
    }


    async transpile(scope: any = {}) {
        // console.log('in transpile()', scope)
        const names = Object.keys(scope);
        const args = names.map((key) => scope[key]);
        const model = this.editor.getModel();   // typescript needs a typeguard to be happy
        // console.log('model from editor is', model)

        if (model !== null) {
            const resource = model.uri;
            const errors = monaco.editor.getModelMarkers({ resource })
                .map((m) => `Line ${m.startLineNumber}: ${m.message}`)
                .join("\n");
            if (errors.length > 0) {
                alert(errors)    // 
                return
            }
            const worker = await monaco.languages.typescript.getTypeScriptWorker();
            const client = await worker(resource);
            const output = await client.getEmitOutput(resource.toString());
            const code = output.outputFiles[0].text as string;
            // console.log('code from editor is ', code)

            // let string = "let vt = new vt52(); vt.print('hello world')npm nkkj; console.log('hello world')"
            // console.log('code from editor is ', string)
            eval(code)


            // new Function(src) is a safer form of eval().  
            // code = `app.floor(30,30,5);let cube = app.cube().color('blue').move('up',1)`
            // var app = new Baby(code)


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
            return () => { alert("no source"); };  // have to return something if typeguard fails
        }
    }

}



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