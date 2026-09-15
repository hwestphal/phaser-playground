import { HostMsg, writeMoodleLog } from './writeMoodleLog';


import { LIB_VERSION } from './version';
import { Buffer } from "buffer";
import { DOM } from "./DOM"

import * as monaco from "monaco-editor";
import JSMonacoLinter from 'monaco-js-linter';

// import lib_baby from "./extraLibs/baby.d.ts.txt";
import lib_dom_mini from "./extraLibs/lib.dom_mini.d.ts.txt";
// import lib_dom from "./extraLibs/lib.dom.d.ts.txt";
// import lib_dom_iterable from "./extraLibs/dom.iterable.generated.d.ts.txt";    // why not just dom.iterable?
import lib_dom_iterable from "./extraLibs/dom.iterable.d.ts.txt";    // why not just dom.iterable?

import lib_es5 from "./extraLibs/lib.es5.d.ts.txt";
import lib_es2015_core from "./extraLibs/lib.es2015.core.d.ts.txt"
import lib_es2015_collection from "./extraLibs/lib.es2015.collection.d.ts.txt"
import lib_es2015_iterable from "./extraLibs/lib.es2015.iterable.d.ts.txt"
import lib_es2015_generator from "./extraLibs/lib.es2015.generator.d.ts.txt"
import lib_es2015_promise from "./extraLibs/lib.es2015.promise.d.ts.txt"
import lib_es2015_proxy from "./extraLibs/lib.es2015.proxy.d.ts.txt"
import lib_es2015_reflect from "./extraLibs/lib.es2015.reflect.d.ts.txt"
import lib_es2015_symbol from "./extraLibs/lib.es2015.symbol.d.ts.txt"
import lib_es2015_symbol_wellknown from "./extraLibs/lib.es2015.symbol.wellknown.d.ts.txt"

import lib_es6 from "./extraLibs/lib.es6.d.ts.txt";  // not sure why i need both but parseInt() fails without es5
import lib_es2016_array_include from "./extraLibs/lib.es2016.array.include.d.ts.txt"

import lib_es2017_string from "./extraLibs/lib.es2017.string.d.ts.txt"
import lib_es2017_object from "./extraLibs/lib.es2017.object.d.ts.txt"
import lib_es2017_typedarrays from "./extraLibs/lib.es2017.typedarrays.d.ts.txt"

import lib_es2018_asynciterable from "./extraLibs/lib.es2018.asynciterable.d.ts.txt"
import lib_es2019_string from "./extraLibs/lib.es2019.string.d.ts.txt"
import lib_es2020_bigint from "./extraLibs/lib.es2020.bigint.d.ts.txt"
import lib_es2021_string from "./extraLibs/lib.es2021.string.d.ts.txt"
import lib_es2022_object from "./extraLibs/lib.es2022.object.d.ts.txt"
import lib_es2022_array from "./extraLibs/lib.es2022.array.d.ts.txt"
import lib_es2023_array from "./extraLibs/lib.es2023.array.d.ts.txt"
import lib_es2099 from "./extraLibs/lib.es2099.d.ts.txt"
import lib_temporal from "./extraLibs/lib.esnext.temporal.d.ts.txt"

// import lib_jsx_tiny from "./extraLibs/jsx_tiny.d.ts.txt"
import lib_tsxgraph from "./extraLibs/tsxgraph.d.ts.txt"

import mathcode from "./extraLibs/mathcode.d.ts.txt"


// import matter from "./extraLibs/matter.d.ts.txt"

// import { Observable } from "./observer";

// let x = JXG         // just to make sure webpack loads them




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

    editor: monaco.editor.IStandaloneCodeEditor | null = null
    initFile: string = "";
    el: HTMLElement
    storageKey: string
    safeDelay: number
    hiddenCode: string
    hiddenDecl: string
    visibleCode: string

    plotWindow: Window | null = null;       // the window we run the code in.  keep it around.


    // prefixDecl = ''     // hidden decl for TS for THIS instance of the editor
    // prefixCode = ''     // hidden code for THIS instance of the editor

    editorCode = ''

    constructor(el: HTMLElement, hiddenCode: string = '', hiddenDecl: string = '', visibleCode = '') {
        // console.warn('arrived in editor hiddenCode:', hiddenCode)
        // console.warn('arrived in editor hiddenDecl:', hiddenDecl)

        // return;
        this.el = el
        // this.initFile = initFile
        this.storageKey = ''
        this.safeDelay = 5000
        this.hiddenCode = hiddenCode
        this.hiddenDecl = hiddenDecl
        this.visibleCode = visibleCode

        // console.log(`import { TSXBoard } from './dist.${LIB_VERSION}/tsxgraph.js';`);


        monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
            module: 99,        // ESNext  

            esModuleInterop: true,

            allowNonTsExtensions: true,
            inlineSourceMap: true,
            inlineSources: true,
            experimentalDecorators: true,
            moduleResolution: 2, // NodeJs,    https://microsoft.github.io/monaco-editor/typedoc/enums/languages.typescript.ModuleResolutionKind.html

            noLib: true,    // brings in variables like 'origin'.  what damage does this do?


            target: 99, //monaco.languages.typescript.ScriptTarget.Latest
            lib: ['es2022', 'dom', 'dom.iterable'],   // for some reason, dom.iterable is required for destructuring    [x,y] = [1,2]
            // lib: ["es5, es6, es2020, es2022, dom.iterable"],    // for some reason, dom.iterable is required for destructuring    [x,y] = [1,2]

            sourceMap: true,
            strict: true,

            noImplicitAny: true,
            noImplicitReturns: true,

            noUnusedParameters: false,       // easier for beginners
            noUnusedLocals: true,            // i filter those errors out from the alert
            allowUnreachableCode: true,
            allowUnusedLabels: true,
            noImplicitThis: false,

            strictFunctionTypes: true,       // show the error, it will run anyhow
            strictNullChecks: true,

            // noImplicitReturns: true,

            // allowJs:true,   // very bad!! defaults to JS files, gives 'type annotations not allowed' errors

        });

        // monaco.languages.typescript.javascriptDefaults.getDiagnosticsOptions({
        //     SemicolonPreference:
        // });


        monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
            noSemanticValidation: false,
            noSyntaxValidation: false,
            // allowNonTsExtensions: true,
            // target: monaco.languages.typescript.ScriptTarget.ES2015,
            // // noLib: true,                        // don't bring DOM into intellisense
            // strictNullChecks: false,
        });

        monaco.editor.defineTheme('myTheme', {
            base: 'vs',
            inherit: true,
            rules: [],
            colors: {
                'editorInlayHint.background': '#00FF00',
                'editorInlayHint.foreground': '#FF00FF',
            }
        });

        // ignore 1375 errors, they catch await because monaco doesn't know yet
        monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
            diagnosticCodesToIgnore: [1375]
        });

        // monaco.languages.typescript.typescriptDefaults.addExtraLib(matter)

        // monaco.languages.typescript.typescriptDefaults.addExtraLib(lib_baby_plus, "lib.baby.d.ts");
        monaco.languages.typescript.typescriptDefaults.addExtraLib(lib_es5, "lib.es5.d.ts");
        monaco.languages.typescript.typescriptDefaults.addExtraLib(lib_es6, "lib.es6.d.ts");
        monaco.languages.typescript.typescriptDefaults.addExtraLib(lib_dom_mini, "lib.dom_mini.d.ts");
        // monaco.languages.typescript.typescriptDefaults.addExtraLib(lib_dom, "lib.dom.d.ts");
        monaco.languages.typescript.typescriptDefaults.addExtraLib(lib_dom_iterable, "lib.dom.iterable.d.ts");

        // monaco.languages.typescript.typescriptDefaults.addExtraLib(lib_promise, "lib.es2015.promise.d.ts");

        monaco.languages.typescript.typescriptDefaults.addExtraLib(lib_es2015_core)
        monaco.languages.typescript.typescriptDefaults.addExtraLib(lib_es2015_collection)
        monaco.languages.typescript.typescriptDefaults.addExtraLib(lib_es2015_iterable)
        monaco.languages.typescript.typescriptDefaults.addExtraLib(lib_es2015_generator)
        monaco.languages.typescript.typescriptDefaults.addExtraLib(lib_es2015_promise)
        monaco.languages.typescript.typescriptDefaults.addExtraLib(lib_es2015_proxy)
        monaco.languages.typescript.typescriptDefaults.addExtraLib(lib_es2015_reflect)
        monaco.languages.typescript.typescriptDefaults.addExtraLib(lib_es2015_symbol)
        monaco.languages.typescript.typescriptDefaults.addExtraLib(lib_es2015_symbol_wellknown)

        monaco.languages.typescript.typescriptDefaults.addExtraLib(lib_es2016_array_include)
        monaco.languages.typescript.typescriptDefaults.addExtraLib(lib_es2017_object)
        monaco.languages.typescript.typescriptDefaults.addExtraLib(lib_es2017_string)
        monaco.languages.typescript.typescriptDefaults.addExtraLib(lib_es2017_typedarrays)
        monaco.languages.typescript.typescriptDefaults.addExtraLib(lib_es2018_asynciterable)
        monaco.languages.typescript.typescriptDefaults.addExtraLib(lib_es2019_string)
        monaco.languages.typescript.typescriptDefaults.addExtraLib(lib_es2020_bigint)
        monaco.languages.typescript.typescriptDefaults.addExtraLib(lib_es2021_string)
        monaco.languages.typescript.typescriptDefaults.addExtraLib(lib_es2022_array)
        monaco.languages.typescript.typescriptDefaults.addExtraLib(lib_es2022_object)
        monaco.languages.typescript.typescriptDefaults.addExtraLib(lib_es2023_array)

        // monaco.languages.typescript.typescriptDefaults.addExtraLib(babylonjs)

        monaco.languages.typescript.typescriptDefaults.addExtraLib(lib_es2099)      // stuff that Typescript hasn't provided
        monaco.languages.typescript.typescriptDefaults.addExtraLib(lib_temporal)

        // monaco.languages.typescript.typescriptDefaults.addExtraLib(lib_jsx_tiny)    // my simply remix of the upper level call

        monaco.languages.typescript.typescriptDefaults.addExtraLib(lib_tsxgraph)    // wrapper version
        monaco.languages.typescript.typescriptDefaults.addExtraLib(mathcode)    // my simple remix of the upper level call

        // this stuff has to go into the EVAL, since it doesn't see otherwise

        // let TSX = XGraph.freeBoard(undefined)  // just to make sure webpack keeps it

        monaco.languages.typescript.typescriptDefaults.addExtraLib(`let TSX:TSXBoard;`)
        // monaco.languages.typescript.typescriptDefaults.addExtraLib(`import { TSXBoard } from './dist.${LIB_VERSION}/tsxgraph.js'; let TSX:TSXBoard;`)
        // monaco.languages.typescript.typescriptDefaults.addExtraLib(`import { TSXBoard } from './dist.${LIB_VERSION}/tsxgraph.js'; let TSX = new TSXBoard('jxgbox');`)
        // monaco.languages.typescript.typescriptDefaults.addExtraLib(`let TSX = new TSXBoard('jxgbox');`)


        monaco.languages.typescript.typescriptDefaults.addExtraLib(this.hiddenDecl)


        // // Define a function to validate code for semicolons
        // function validateSemicolons(model:monaco.editor.ITextModel) {
        //     const code = model.getValue();
        //     const lines:string[] = code.split('\n');
        //     const markers:monaco.editor.IMarkerData[] = [];

        //     lines.forEach((line, index) => {
        //         let trimmed = line.trimEnd();
        //         console.log('trim test',trimmed, trimmed.indexOf('//'))
        //         if(trimmed.indexOf('//') > -1){
        //             console.log('trimmed before',trimmed)
        //             trimmed = trimmed.slice(0,trimmed.indexOf('//')).trimEnd()
        //             console.log('trimmed after',trimmed)
        //         } 
        //         // Simple example check: lines ending with characters that usually require a semicolon
        //         if (trimmed.length > 0 && trimmed.endsWith(')')){

        //             markers.push({
        //                 severity: monaco.MarkerSeverity.Error, // Renders a red error squiggly
        //                 message: 'Possible missing semicolon.',
        //                 startLineNumber: index + 1,
        //                 startColumn: trimmed.length + 1,
        //                 endLineNumber: index + 1,
        //                 endColumn: trimmed.length + 2
        //             });
        //         }
        //     });

        //     // Apply the markers to the specific model
        //     monaco.editor.setModelMarkers(model, "semicolon_enforcer", markers);
        // }


        /////////////////

        if (this.editor) {
            this.editor.dispose(); // Clean up the old instance and remove attributes
        }

        // initialize the editor
        this.editor = monaco.editor.create(this.el, {
            automaticLayout: true,
            language: "typescript",
            // language: "javascript",
            scrollBeyondLastLine: true,
            formatOnType: true,
            formatOnPaste: true,

            value: (this.visibleCode == '')
                ? window.localStorage.getItem(this.storageKey) || this.initFile
                : this.visibleCode,

            minimap: {
                enabled: false
            }
        });
        let safeTimeout: number;


        this.editor.onDidChangeModelContent(() => {
            if (safeTimeout) {
                clearTimeout(safeTimeout);
            }

            // validateSemicolons(this.editor!.getModel()!);    // enforce semicolons

            safeTimeout = window.setTimeout(
                () => {
                    window.localStorage.setItem(this.storageKey, this.editor!.getValue()),
                        this.safeDelay
                })

        });
    }


    upload() {
        // console.log('clicked on upload')
        const input = document.createElement("input");
        input.type = "file";
        input.onchange = () => {
            const fileReader = new FileReader();
            fileReader.onload = () => this.editor.setValue(fileReader.result as string);
            fileReader.readAsText(input.files![0]);
        };
        input.click();
    }

    copyToEditor(code: string, hidden: string, decls: string) {
        // console.log('%ccopyToEditor', 'color:red;', 'hiddencode:', hidden, 'hiddendecl', decls)
        this.hiddenCode = hidden
        this.hiddenDecl = decls
        // console.log('copyToEditor:', hidden, decls)
        this.editor.setValue(code)
    }


    command(fileName: string) {
        // console.log('clicked on command')
    }



    /** returns valid JS code or throws error */
    async transpile(hiddenCode: string, jsDelivr: boolean, popup: boolean, gameboy: boolean): Promise<string> {

        // console.log(`transpile(popup: ${popup},jsDelivr: ${jsDelivr}) \n`)


        // const args = names.map((key) => scope[key]);
        const model = this.editor!.getModel();
        let source64: string;
        // console.log('model from editor is', model)

        if (model !== null) {    // typescript needs a typeguard to be happy
            const resource = model.uri;  // returns an ITextModel

            const errors = monaco.editor.getModelMarkers({ resource })
            // console.log('errors', errors);

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
                // alert('errors coming')
                alert(errorString)    //npm
                console.log(errors);
                return '';
            }


            const worker = await monaco.languages.typescript.getTypeScriptWorker();
            const client = await worker(resource);
            const output = await client.getEmitOutput(resource.toString());
            const sourceCode = await client.getScriptText(resource.toString())

            // const line = this.editor.getPosition()!.lineNumber
            // const col = this.editor.getPosition()!.column;


            this.editorCode = output.outputFiles[0].text as string;
            source64 = Buffer.from(sourceCode!, 'utf8').toString('base64');

            return this.editorCode

        }
        throw new Error('invalid typescript');
        return '';
    }


    /** this creates a TEXT webpage for download. */
    async createWebPage(hiddenCode: string, gameboy: boolean, pathToDist: string) {

        // const args = names.map((key) => scope[key]);
        const model = this.editor.getModel();
        let source64: string;

        if (model !== null) {    // typescript needs a typeguard to be happy
            const resource = model.uri;  // returns an ITextModel

            const worker = await monaco.languages.typescript.getTypeScriptWorker();
            const client = await worker(resource);
            const output = await client.getEmitOutput(resource.toString());
            const sourceCode = await client.getScriptText(resource.toString())

            this.editorCode = output.outputFiles[0].text as string;

            let html = this.generateSourceCode(hiddenCode, this.editorCode, true, gameboy) // html web version    // ALWAYS jsDelivr

            const downloadSource = new Blob([html], { type: "text/plain" });

            if (this.initFile) {
                window.URL.revokeObjectURL(this.initFile);
            }
            this.initFile = window.URL.createObjectURL(downloadSource);
            const link = document.createElement("a");
            link.download = 'jsxgraph.html';
            link.href = this.initFile;
            link.dispatchEvent(new MouseEvent("click"));
        }


    }




    /** the 'RUN' button in th playground.  Create  */
    runEditorCode(tsCode64: string, popup: boolean, tabIndex0: boolean = true, jsDelivr: boolean = true, gameboy: boolean = false) {

        // this is a mess

        popup = false;
        // console.log(`runeditorcode(popup:${popup},gameboy:${gameboy})`)
        // console.log('code', code)

        let pop = popup ? 'popup=true,' : ''
        pop += ', noopener'     // for security

        let target = pop ? '_blank' : 'jxgframe'

        // if the window is open, we must first close (Chrome's new security)
        // TODO: if window is open, substitute the innerHTML.  \
        if (popup && this.plotWindow !== null && !this.plotWindow.closed) {
            // console.log('plotwindow exists, closing');
            // console.log('popup && plotwindow exists, injecting');
            // console.log('injectableScript', this.injectableScript(this.hiddenCode, this.editorCode, false))

            let script = this.injectableScript(this.hiddenCode, this.editorCode, false);
            console.log(script)
            this.injectScript(target, script, '')   // TODO 'pathToDist should not be empty

        } else {
            console.error('something went wrong')
        }
    }


    /** pull together the source code for a TEXt webpage for download  It is used in the
     * playground to download a page.
    */
    generateSourceCode(hiddenCode: string, editorCode: string, jsDelivr: boolean, gameboy: boolean, pathToDist: string = ''): string {

        let hostname = location.hostname;
        // console.log('hostname', hostname)

        let html = ''

        html += this.HTMLBoilerPlate(jsDelivr, gameboy, pathToDist);  // leaves an injectable script open
        html += '\n<script type="module">'

        if (gameboy) {
            html += this.gameBoyScript();  // leaves an injectable script open
        }
        html += this.injectableScript(hiddenCode, editorCode, jsDelivr, pathToDist)

        html += '\n</script>';

        html += '\n</body>';
        html += '\n</html>';

        // console.log('generateSourceCode', html)
        return html
    }



    HTMLBoilerPlate(jsDelivr: boolean, gameBoy: boolean, pathToDist: string): string {

        // console.log(`HTMLBoilerPlate(jsDelivr:${jsDelivr},gameboy:${gameBoy})`)

        let html = '<!DOCTYPE html>';
        html += '<head>';

        // jsDelivr = false;   // TBTB


        if (jsDelivr) {  // for downloading a working web page - everything from jsdelivr
            // html += `\n<script type="text/javascript" charset="UTF-8" src="dist.${LIB_VERSION}/bootstrap/bootstrap-5.3.3.min.js"></script>`
            // html += `\n<link rel="stylesheet" type="text/css" href="dist.${LIB_VERSION}/bootstrap/bootstrap-5.3.3.min.css" />`;

            html += `\n<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/jsxgraph/distrib/jsxgraphcore.js"></script>`
            html += `\n<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/jsxgraph/distrib/jsxgraph.css" />`;

            html += `\n<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.21/dist/katex.min.css" integrity="sha384-zh0CIslj+VczCZtlzBcjt5ppRcsAmDnRem7ESsYwWwg3m/OaJ2l4x7YBZl9Kxxib" crossorigin="anonymous">`;
            html += `\n<script src="https://cdn.jsdelivr.net/npm/katex@0.16.21/dist/katex.min.js" integrity="sha384-Rma6DA2IPUwhNxmrB/7S3Tno0YY7sFu9WSYMCuulLhIqYSGZ2gKCJWIqhBWqMQfh" crossorigin="anonymous"></script>`;

        } else {
            // html += `\n<script type="text/javascript" charset="UTF-8" src="dist.${LIB_VERSION}/bootstrap/bootstrap-5.3.3.min.js"></script>`
            // html += `\n<link rel="stylesheet" type="text/css" href="dist.${LIB_VERSION}/bootstrap/bootstrap-5.3.3.min.css" />`;

            html += `\n<script type="text/javascript" src="${pathToDist}/jsxgraphcore.js"></script>`;
            html += `\n<link rel="stylesheet" type="text/css" href="${pathToDist}/jsxgraph.css" />`;

            html += `\n<link rel="stylesheet" href="${pathToDist}/katex.min.css">`;
            html += `\n<script src="${pathToDist}/katex.min.js"></script>`;

        }

        html += '</head>';
        html += '<body>';

        if (gameBoy)
            html +=
                `<style type='text/css'>
                .wrapper {
                    float:left;
                    min-width: 150px;
                }

                .button {
                    background: rgb(242, 96, 43);
                    color: white;
                    font-size: 32px;
                    font-weight: bold;
                    border-radius: 5px;
                }
            </style>`;



        html += `\n<script>
            window.WebFontConfig = {
                custom: {
                    families: ['KaTeX_AMS', 'KaTeX_Caligraphic:n4,n7', 'KaTeX_Fraktur:n4,n7',
                    'KaTeX_Main:n4,n7,i4,i7', 'KaTeX_Math:i4,i7', 'KaTeX_Script',
                    'KaTeX_SansSerif:n4,n7,i4', 'KaTeX_Size1', 'KaTeX_Size2', 'KaTeX_Size3',
                    'KaTeX_Size4', 'KaTeX_Typewriter'],
                    },
                    };
                    \n</script>`;

        // if (jsDelivr) {  // for downloading a working web page - everything from jsdelivr
        //     html += "<script src='https://cdn.jsdelivr.net/npm/webfontloader@1.6.28/webfontloader.min.js'></script>";
        // } else {
        //     html += `<script defer src='/TSXGraph/playground/dist.${LIB_VERSION}/webfontloader.min.js'></script>`;
        // }

        if (gameBoy)  // opens two divs
            html +=
                `\n<div style='width:1000px;max-width:100%;height:1170px;max-height:100%'>
                 \n<div style='border:solid 2px black; border-radius: 10px;padding:10px;background-color: rgb(178, 214, 246);width:100%;height:100%;'>`;

        html += `\n<div id="jxgframe" class="jxgbox" style="aspect-ratio: 1; width: 100%; max-width:1000px; max-height: calc(100vh - 20px);" tabindex= '0'></div>`;

        if (gameBoy)  // closes the two divs
            html +=
                `\n<div>
               <div class="wrapper">
                    <table style="padding-left:100px;padding-top:20px;">
                        <tr>
                            <td></td>
                            <td><input type="button" class='button' id="btn_Up" value="&#x2B06;"></input>
                            <td></td>
                        </tr>
                        <tr>
                            <td><input type="button" class='button' id="btn_Lf" value="&#x2B05;"></input>
                            <td></td>
                            <td><input type="button" class='button' id="btn_Rt" value="&#x27A1;"></input>
                        </tr>
                        <tr>
                            <td></td>
                            <td><input type="button" class='button' id="btn_Dn" value="&#x2B07;"></input>
                            <td>
                        </tr>
                    </table>
                </div> <!-- end of first wrapper-->
                \n<div class="wrapper"><p>&nbsp;</p></div>  <!--spacer-->
                \n<div class="wrapper" style="padding-top:30px;">
                    \n<input type="button" class='button' style="margin-right:50px;" id="btn_A" value="A"></input>
                    \n<input type="button" class='button' style="margin-right:50px;" id="btn_B" value="B"></input>
                    \n<input type="button" class='button' style="margin-right:50px;" id="btn_C" value="C"></input>
                    \n<input type="button" class='button' id="btn_D" value="D"></input>
                \n</div><!-- end of second wrapper-->
            \n</div>
         \n</div>

        \n<script>\n`;

        return html;
    }

    gameBoyScript(): string {

        let html = '';


        html +=

            `let btn_A = (e) => dispatchEvent(new KeyboardEvent("keydown", {
                key: "A",
                keyCode: 65,
                code: "KeyA"
            }))
            let btn_B = (e) => dispatchEvent(new KeyboardEvent("keydown", {
                key: "B",
                keyCode: 66,
                code: "KeyB"
            }))
            let btn_C = (e) => dispatchEvent(new KeyboardEvent("keydown", {
                key: "C",
                keyCode: 67,
                code: "KeyC"
            }))
            let btn_D = (e) => dispatchEvent(new KeyboardEvent("keydown", {
                key: "D",
                keyCode: 68,
                code: "KeyD"
            }))
            let btn_Up = (e) => dispatchEvent(new KeyboardEvent("keydown", {
                key: "",
                keyCode: 38,
                code: "ArrowUp"
            }))
            let btn_Dn = (e) => dispatchEvent(new KeyboardEvent("keydown", {
                key: "",
                keyCode: 38,
                code: "ArrowDown"
            }))
            let btn_Lf = (e) => dispatchEvent(new KeyboardEvent("keydown", {
                key: "",
                keyCode: 37,
                code: "ArrowLeft"
            }))
            let btn_Rt = (e) => dispatchEvent(new KeyboardEvent("keydown", {
                key: "",
                keyCode: 39,
                code: "ArrowRight"
            }))


            document.getElementById('btn_A').addEventListener("click", btn_A);
            document.getElementById('btn_B').addEventListener("click", btn_B);
            document.getElementById('btn_C').addEventListener("click", btn_C);
            document.getElementById('btn_D').addEventListener("click", btn_D);

            document.getElementById('btn_Up').addEventListener("click", btn_Up);
            document.getElementById('btn_Dn').addEventListener("click", btn_Dn);
            document.getElementById('btn_Lf').addEventListener("click", btn_Lf);
            document.getElementById('btn_Rt').addEventListener("click", btn_Rt);

        `;

        return html;
    }


    injectableScript(hiddenCode: string, editorCode: string, jsDelivr: boolean, pathToDist: string = '') {
        console.assert(jsDelivr || pathToDist.length > 0, "If not jsDelivr then pathToString must be provided");
        // console.warn(`injectableScript jsDelivr:${jsDelivr} ${pathToDist}`)
        // console.warn('injectibleScript:', hiddenCode, editorCode)

        let html = '';

        // jsDelivr = false // only for testing


        if (jsDelivr) {
            // console.warn('importing from JSDelivr')
            html += "import {TSXBoard } from 'https://cdn.jsdelivr.net/npm/jsxgraph-wrapper-typescript@2.1.1/lib/tsxgraph.js';"
        } else {
            // console.warn('importing from dist directory')
            html += `import {TSXBoard } from '${pathToDist}/tsxgraph.js';`  
        }
        html += "\nprivateAsyncFunction();  // create top-level async function"

        html += "\nasync function privateAsyncFunction(){   // so await possible"
        html += "\nlet TSX = new TSXBoard('jxgframe',{keepAspectRatio:true});"
        html += "\n" + this.hiddenCode   // before try/catch
        html += "\r\n try {"
        html += "\r\n" + editorCode
        html += "\n }"
        html += "\n catch(error) {"
        html += "\n    alert(error);"
        html += "\n    console.log(error)"
        html += "\n }"
        html += "\n }"

        // console.log('injectable', html);
        return html;
    }

    iframeRef(frameRef: HTMLIFrameElement) {
        return frameRef.contentWindow ?? frameRef.contentWindow.document ?? frameRef.contentDocument
    }




    // https://stackoverflow.com/questions/10418644/how-do-i-create-an-iframe-element-and-set-the-html-of-it-dynamically


    /** inject a prepared script into a <script>.  script already has module load, error trap, etc */
    injectScript(divID: string, injectable: string, pathToDist: string) {

        // console.log(`injectScript(divID: ${divID}, injectable: ${injectable}, pathToDist: ${pathToDist})`)

        // const html = `\n<html>
        //                     \n<body>
        //                         \n<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/jsxgraph/distrib/jsxgraphcore.js"></script>
        //                         <!--script type="text/javascript" src="/dist.${LIB_VERSION}/jsxgraphcore.js"></script-->
        //                         \n<div id='jxgbox' style="width:600px;height:600px;"> </div>
        //                         \n<script type='module'>
        //                             // import {TSXBoard } from 'https://cdn.jsdelivr.net/npm/jsxgraph-wrapper-typescript@2.0.8/lib/tsxgraph.js'
        //                             ${injectable}
        //                         \n</script>

        //                     \n</body>
        //                 \n</html>`;

        const html = `<!DOCTYPE html>
                      \n<html>
                        \n<body>
                            \n<script type="text/javascript" src="${pathToDist}/jsxgraphcore.js"></script>
                            \n<div id='jxgframe' style="width:600px;height:600px;"> </div>
                            \n<!--  script type='module' -->
                            \n<script type='module'>
                                // import {TSXBoard } from '${pathToDist}/tsxgraph.js'
                                ${injectable}
                            \n</script>

                        \n</body>
                    \n</html>`;

        // console.warn(html);
        return html

    }


    /** inject a prepared script into a <script>.  script already has module load, error trap, etc */
    injectScript2026(divID: string, injectable: string, pathToDist: string) {

        // console.log(`injectScript2026(divID: ${divID}, injectable: ${injectable}, pathToDist: ${pathToDist})`)

        const html = injectable;
        // console.log(html);


        let divElement = document.getElementById(divID)
        console.assert(divElement !== null, `did not find element with ID: '${divID}' `)

        if (divElement !== null) {
            // delete all children of the div
            while (divElement.firstChild !== null) {
                // console.log('removing', divElement.lastChild)
                divElement.removeChild(divElement.lastChild!);  // if there is a firstChild, then it is the minimal lastChild
            }


            const script = document.createElement("script");
            script.textContent = html;
            script.type = 'module'
            // console.log('about to append',script)
            divElement.appendChild(script);

        }

    }


}

