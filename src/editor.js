"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function(mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Editor = void 0;
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
const version_1 = require("./version");
const buffer_1 = require("buffer");
const monaco = __importStar(require("monaco-editor"));
const lib_es5_d_ts_txt_1 = __importDefault(require("./extraLibs/lib.es5.d.ts.txt"));
const lib_es6_d_ts_txt_1 = __importDefault(require("./extraLibs/lib.es6.d.ts.txt")); // not sure why i need both but parseInt() fails without es5
// import lib_baby from "./extraLibs/baby.d.ts.txt";
const lib_dom_mini_d_ts_txt_1 = __importDefault(require("./extraLibs/lib.dom_mini.d.ts.txt"));
// import lib_dom from "./extraLibs/lib.dom.d.ts.txt";
const dom_iterable_d_ts_txt_1 = __importDefault(require("./extraLibs/dom.iterable.d.ts.txt"));
const lib_es2015_collection_d_ts_txt_1 = __importDefault(require("./extraLibs/lib.es2015.collection.d.ts.txt"));
const lib_es2015_core_d_ts_txt_1 = __importDefault(require("./extraLibs/lib.es2015.core.d.ts.txt"));
const lib_es2015_promise_d_ts_txt_1 = __importDefault(require("./extraLibs/lib.es2015.promise.d.ts.txt"));
const lib_es2015_iterable_d_ts_txt_1 = __importDefault(require("./extraLibs/lib.es2015.iterable.d.ts.txt"));
const lib_es2015_symbol_wellknown_d_ts_txt_1 = __importDefault(require("./extraLibs/lib.es2015.symbol.wellknown.d.ts.txt"));
const lib_es2016_array_include_d_ts_txt_1 = __importDefault(require("./extraLibs/lib.es2016.array.include.d.ts.txt"));
const lib_es2017_string_d_ts_txt_1 = __importDefault(require("./extraLibs/lib.es2017.string.d.ts.txt"));
const lib_es2017_object_d_ts_txt_1 = __importDefault(require("./extraLibs/lib.es2017.object.d.ts.txt"));
const lib_es2017_typedarrays_d_ts_txt_1 = __importDefault(require("./extraLibs/lib.es2017.typedarrays.d.ts.txt"));
const lib_es2018_asynciterable_d_ts_txt_1 = __importDefault(require("./extraLibs/lib.es2018.asynciterable.d.ts.txt"));
const lib_es2019_string_d_ts_txt_1 = __importDefault(require("./extraLibs/lib.es2019.string.d.ts.txt"));
const lib_es2020_bigint_d_ts_txt_1 = __importDefault(require("./extraLibs/lib.es2020.bigint.d.ts.txt"));
const lib_es2021_string_d_ts_txt_1 = __importDefault(require("./extraLibs/lib.es2021.string.d.ts.txt"));
const lib_es2022_array_d_ts_txt_1 = __importDefault(require("./extraLibs/lib.es2022.array.d.ts.txt"));
const lib_es2023_array_d_ts_txt_1 = __importDefault(require("./extraLibs/lib.es2023.array.d.ts.txt"));
// import babylonjs from "./extraLibs/babylonjs.d.ts.txt"
const lib_es2099_d_ts_txt_1 = __importDefault(require("./extraLibs/lib.es2099.d.ts.txt"));
// import lib_jsx_tiny from "./extraLibs/jsx_tiny.d.ts.txt"
const tsxgraph_d_ts_txt_1 = __importDefault(require("./extraLibs/tsxgraph.d.ts.txt"));
const mathcode_d_ts_txt_1 = __importDefault(require("./extraLibs/mathcode.d.ts.txt"));
// import matter from "./extraLibs/matter.d.ts.txt"
// import { RuntimeAnimation } from "babylonjs/Animations/runtimeAnimation";
// import { Observable } from "./observer";
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
class Editor {
    editor;
    initFile = "";
    el;
    storageKey;
    safeDelay;
    hiddenCode;
    hiddenDecl;
    visibleCode;
    // prefixDecl = ''     // hidden decl for TS for THIS instance of the editor
    // prefixCode = ''     // hidden code for THIS instance of the editor
    editorCode = '';
    constructor(el, initFile, hiddenCode = '', hiddenDecl = '', visibleCode = '') {
        // return;
        this.el = el;
        this.initFile = initFile;
        this.storageKey = '';
        this.safeDelay = 5000;
        this.hiddenCode = hiddenCode;
        this.hiddenDecl = hiddenDecl;
        this.visibleCode = visibleCode;
        // monaco.languages.typescript.typescriptDefaults.addExtraLib(`import { TXG } from './dist.${LIB_VERSION}/tsxgraph.js'; let TSX = TXG.TXGraph.initBoard('jxgbox');`)
        monaco.languages.typescript.typescriptDefaults.addExtraLib(`TSX.initBoard('jxgbox');`);
        monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
            allowNonTsExtensions: true,
            inlineSourceMap: true,
            inlineSources: true,
            experimentalDecorators: true,
            noLib: true,
            lib: ["es5, es6, es2015.core, es2015.iterable, dom.iterable"],
            sourceMap: true,
            strict: false,
            alwaysStrict: false,
            noImplicitAny: false,
            noUnusedParameters: false,
            noUnusedLocals: true,
            allowUnreachableCode: true,
            allowUnusedLabels: true,
            noImplicitThis: false,
            strictFunctionTypes: true,
            strictNullChecks: true,
            target: monaco.languages.typescript.ScriptTarget.Latest
            // noImplicitReturns: true,
            // allowJs:true,   // very bad!! defaults to JS files, gives 'type annotations not allowed' errors
        });
        monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
            noSemanticValidation: true,
            noSyntaxValidation: true,
            allowNonTsExtensions: true,
            target: monaco.languages.typescript.ScriptTarget.ES2015,
            noLib: true,
            strictNullChecks: false,
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
        // monaco.languages.typescript.typescriptDefaults.addExtraLib(matter)
        // monaco.languages.typescript.typescriptDefaults.addExtraLib(lib_baby_plus, "lib.baby.d.ts");
        monaco.languages.typescript.typescriptDefaults.addExtraLib(lib_es5_d_ts_txt_1.default, "lib.es5.d.ts");
        monaco.languages.typescript.typescriptDefaults.addExtraLib(lib_es6_d_ts_txt_1.default, "lib.es6.d.ts");
        monaco.languages.typescript.typescriptDefaults.addExtraLib(lib_dom_mini_d_ts_txt_1.default, "lib.dom_mini.d.ts");
        // monaco.languages.typescript.typescriptDefaults.addExtraLib(lib_dom, "lib.dom.d.ts");
        monaco.languages.typescript.typescriptDefaults.addExtraLib(dom_iterable_d_ts_txt_1.default, "lib.dom.iterable.d.ts");
        // monaco.languages.typescript.typescriptDefaults.addExtraLib(lib_promise, "lib.es2015.promise.d.ts");
        monaco.languages.typescript.typescriptDefaults.addExtraLib(lib_es2015_collection_d_ts_txt_1.default);
        monaco.languages.typescript.typescriptDefaults.addExtraLib(lib_es2015_core_d_ts_txt_1.default);
        monaco.languages.typescript.typescriptDefaults.addExtraLib(lib_es2015_promise_d_ts_txt_1.default);
        monaco.languages.typescript.typescriptDefaults.addExtraLib(lib_es2015_iterable_d_ts_txt_1.default);
        monaco.languages.typescript.typescriptDefaults.addExtraLib(lib_es2015_symbol_wellknown_d_ts_txt_1.default);
        monaco.languages.typescript.typescriptDefaults.addExtraLib(lib_es2016_array_include_d_ts_txt_1.default);
        monaco.languages.typescript.typescriptDefaults.addExtraLib(lib_es2017_object_d_ts_txt_1.default);
        monaco.languages.typescript.typescriptDefaults.addExtraLib(lib_es2017_string_d_ts_txt_1.default);
        monaco.languages.typescript.typescriptDefaults.addExtraLib(lib_es2017_typedarrays_d_ts_txt_1.default);
        monaco.languages.typescript.typescriptDefaults.addExtraLib(lib_es2018_asynciterable_d_ts_txt_1.default);
        monaco.languages.typescript.typescriptDefaults.addExtraLib(lib_es2019_string_d_ts_txt_1.default);
        monaco.languages.typescript.typescriptDefaults.addExtraLib(lib_es2020_bigint_d_ts_txt_1.default);
        monaco.languages.typescript.typescriptDefaults.addExtraLib(lib_es2021_string_d_ts_txt_1.default);
        monaco.languages.typescript.typescriptDefaults.addExtraLib(lib_es2022_array_d_ts_txt_1.default);
        monaco.languages.typescript.typescriptDefaults.addExtraLib(lib_es2023_array_d_ts_txt_1.default);
        // monaco.languages.typescript.typescriptDefaults.addExtraLib(babylonjs)
        monaco.languages.typescript.typescriptDefaults.addExtraLib(lib_es2099_d_ts_txt_1.default); // stuff that Typescript hasn't provided
        // monaco.languages.typescript.typescriptDefaults.addExtraLib(lib_jsx_tiny)    // my simply remix of the upper level call
        monaco.languages.typescript.typescriptDefaults.addExtraLib(tsxgraph_d_ts_txt_1.default); // wrapper version
        monaco.languages.typescript.typescriptDefaults.addExtraLib(mathcode_d_ts_txt_1.default); // my simple remix of the upper level call
        // this stuff has to go into the EVAL, since it doesn't see otherwise
        // let TSX = XGraph.freeBoard(undefined)  // just to make sure webpack keeps it
        monaco.languages.typescript.typescriptDefaults.addExtraLib(this.hiddenDecl);
        // console.log('value of this.visibleCode:', this.visibleCode)
        this.editor = monaco.editor.create(this.el, {
            automaticLayout: true,
            language: "typescript",
            // language: "javascript",
            scrollBeyondLastLine: true,
            value: (this.visibleCode == '')
                ? window.localStorage.getItem(this.storageKey) || this.initFile
                : this.visibleCode,
            minimap: {
                enabled: false
            }
        });
        let safeTimeout;
        this.editor.onDidChangeModelContent(() => {
            if (safeTimeout) {
                clearTimeout(safeTimeout);
            }
            safeTimeout = window.setTimeout(() => {
                window.localStorage.setItem(this.storageKey, this.editor.getValue()),
                    this.safeDelay;
            });
        });
    }
    upload() {
        // console.log('clicked on upload')
        const input = document.createElement("input");
        input.type = "file";
        input.onchange = () => {
            const fileReader = new FileReader();
            fileReader.onload = () => this.editor.setValue(fileReader.result);
            fileReader.readAsText(input.files[0]);
        };
        input.click();
    }
    copyToEditor(code, hidden, decls) {
        // console.log('%ccopyToEditor', 'color:red;', 'hiddencode:', hidden, 'hiddendecl', decls)
        this.hiddenCode = hidden;
        this.hiddenDecl = decls;
        console.log('copyToEditor:', hidden, decls);
        this.editor.setValue(code);
    }
    command(fileName) {
        // console.log('clicked on command')
    }
    transpileLog(hiddenCode) {
        // console.log('transpile()\n', hiddenCode)
    }
    async transpile(hiddenCode, popup: boolean, gameboy: boolean) {
        console.log(`transpile(popup: ${popup})\n`);
        // const args = names.map((key) => scope[key]);
        const model = this.editor.getModel();
        let source64;
        // console.log('model from editor is', model)
        if (model !== null) { // typescript needs a typeguard to be happy
            const resource = model.uri; // returns an ITextModel
            const errors = monaco.editor.getModelMarkers({ resource });
            // console.log('errors', errors);
            let errorString = '';
            errors.forEach(m => {
                switch (m.code) {
                    case '6133': // ignore 'unused local' errors
                    case '7044': // ignore parameter not typed errors
                        break;
                    default:
                        errorString += `Line ${m.startLineNumber}: ${m.message} (${m.code})\n`;
                }
            });
            if (errorString.length > 0) {
                // alert('errors coming')
                alert(errorString); //
                console.log(errors);
                return '';
            }
            const worker = await monaco.languages.typescript.getTypeScriptWorker();
            const client = await worker(resource);
            const output = await client.getEmitOutput(resource.toString());
            const sourceCode = await client.getScriptText(resource.toString());
            // const line = this.editor.getPosition()!.lineNumber
            // const col = this.editor.getPosition()!.column;
            this.editorCode = output.outputFiles[0].text;
            source64 = buffer_1.Buffer.from(sourceCode, 'utf8').toString('base64');
            // TODO, get correct ID and textbook
            // writeMoodleLog({'datacode': 'LOG_EditorRun', id:0, textbook:'', data05: sourceCode})
            this.runEditorCode(this.editorCode, popup); // and run the whole mess
        }
        return;
    }


    async createWebPage(hiddenCode) {
        // const args = names.map((key) => scope[key]);
        const model = this.editor.getModel();
        let source64;
        if (model !== null) { // typescript needs a typeguard to be happy
            const resource = model.uri; // returns an ITextModel
            const worker = await monaco.languages.typescript.getTypeScriptWorker();
            const client = await worker(resource);
            const output = await client.getEmitOutput(resource.toString());
            const sourceCode = await client.getScriptText(resource.toString());
            this.editorCode = output.outputFiles[0].text;
            let html = this.generateSourceCode(this.editorCode, false, true); // html web version    // ALWAYS jsDelivr
            //source64 = Buffer.from(html, 'utf8').toString('base64');
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
    runEditorCode(tsCode64, popup, tabIndex0 = true, jsDelivr = true) {
        console.log(`runeditorcode(popup:${popup})`);
        // console.log('code', code)
        let pop = popup ? 'popup=true,' : '';
        let target = pop ? '_blank' : 'jxgframe';
        let plotWindow = window.open(target, target, `${pop}left=100,top=100,width=320,height=320`);
        if (!plotWindow) {
            // The window wasn't allowed to open
            // This is likely caused by built-in popup blockers.
            // …
        }
        if (true) { // old way to generate the popup window
            let html = this.generateSourceCode(tsCode64, true);
            plotWindow.document.open(); // creates a page with <html><head><body>, but nothing else
            plotWindow.document.write(html);
            plotWindow.document.close();
        }
    }
    generateWebPage() {
        const data = new Blob([this.editor.getValue()], { type: "text/plain" });
    }
    /** create <script></script>  */
    generateSourceCode(editorCode, tabIndex0 = false, jsDelivr = true) {
        console.warn(`%c generateSourceCode  (jsDelivr:${jsDelivr}, hiddencode:`,'color:pink;', this.hiddenCode, this.hiddenDecl)
        // let code = ''
        // code += "\r\n" + this.hiddenCode + "\r\n"
        // code += "\r\n" + editorCode + "\r\n"
        let hostname = location.hostname;
        console.log('hostname', hostname);
        jsDelivr = hostname !== 'localhost';
        let html = '<!DOCTYPE html>';
        html += '<head>';
        if (jsDelivr) { // for downloading a working web page - everything from jsdelivr
            // html += `\n<script type="text/javascript" charset="UTF-8" src="dist.${LIB_VERSION}/bootstrap/bootstrap-5.3.3.min.js"></script>`
            // html += `\n<link rel="stylesheet" type="text/css" href="dist.${LIB_VERSION}/bootstrap/bootstrap-5.3.3.min.css" />`;
            html += `\n<script type="text/javascript" charset="UTF-8" src="https://cdn.jsdelivr.net/npm/jsxgraph/distrib/jsxgraphcore.js"></script>`;
            html += `\n<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/jsxgraph/distrib/jsxgraph.css" />`;
            html += `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.21/dist/katex.min.css" integrity="sha384-zh0CIslj+VczCZtlzBcjt5ppRcsAmDnRem7ESsYwWwg3m/OaJ2l4x7YBZl9Kxxib" crossorigin="anonymous">`;
            html += `<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.21/dist/katex.min.js" integrity="sha384-Rma6DA2IPUwhNxmrB/7S3Tno0YY7sFu9WSYMCuulLhIqYSGZ2gKCJWIqhBWqMQfh" crossorigin="anonymous"></script>`;
        }
        else {
            // html += `\n<script type="text/javascript" charset="UTF-8" src="dist.${LIB_VERSION}/bootstrap/bootstrap-5.3.3.min.js"></script>`
            // html += `\n<link rel="stylesheet" type="text/css" href="dist.${LIB_VERSION}/bootstrap/bootstrap-5.3.3.min.css" />`;
            html += `\n<script type="text/javascript" charset="UTF-8" src="dist.${version_1.LIB_VERSION}/jsxgraphcore.js"></script>`;
            html += `\n<link rel="stylesheet" type="text/css" href="dist.${version_1.LIB_VERSION}/jsxgraph.css" />`;
            html += `<link rel="stylesheet" href="dist.${version_1.LIB_VERSION}/katex.min.css">`;
            html += `<script defer src="dist.${version_1.LIB_VERSION}/katex.min.js"`;
        }
        html += '</head>';
        html += '<body>';
        html += `<script>
        window.WebFontConfig = {
            custom: {
                families: ['KaTeX_AMS', 'KaTeX_Caligraphic:n4,n7', 'KaTeX_Fraktur:n4,n7',
                    'KaTeX_Main:n4,n7,i4,i7', 'KaTeX_Math:i4,i7', 'KaTeX_Script',
                    'KaTeX_SansSerif:n4,n7,i4', 'KaTeX_Size1', 'KaTeX_Size2', 'KaTeX_Size3',
                    'KaTeX_Size4', 'KaTeX_Typewriter'],
            },
        };
        </script>`;
        if (jsDelivr) { // for downloading a working web page - everything from jsdelivr
            html += "<script src='https://cdn.jsdelivr.net/npm/webfontloader@1.6.28/webfontloader.min.js'></script>";
        }
        else {
            html += `<script defer src='dist.${version_1.LIB_VERSION}/webfontloader.min.js'></script>`;
        }
        let tabIndex = tabIndex0 ? `tabindex='0'` : ``;
        html += `<div id="jxgbox" class="jxgbox" style="width:850px; height:850px;" ${tabIndex}></div>`;
        html += '<script type="module" defer>';
        if (jsDelivr) { // web version load tsxgraph.js from jsdelivr
            html += "\r\n" + `import { TSX } from 'https://cdn.jsdelivr.net/gh/tom-berend/jsxgraph-wrapper-typescript@${version_1.LIB_VERSION}.0/lib/tsxgraph.js';`;
        }
        else {
            html += "\r\n" + `import { TSX } from "./dist.${version_1.LIB_VERSION}/tsxgraph.js";`;
        }
        html += "\r\n" + this.hiddenCode; // before try/catch
        // html += "\r\n" + `TSX.initBoard('jxgbox',{ showScreenshot:true});`
        html += "\r\n try {";
        html += "\r\n" + editorCode;
        html += "\r\n }";
        html += "\r\n catch(error) {";
        html += "\r\n console.log(error);";
        html += "\r\n alert(error);";
        html += "\r\n }";
        html += '</script>';
        html += '</body>';
        html += '</head>';
        return html;
    }
}
exports.Editor = Editor;
// new Function(src) is a safer form of eval().
// code = `app.floor(30,30,5);let cube = app.cube().color('blue').move('up',1)`
// var app = new Baby(code)
// return () => new Function(src).call(window, args);
// // } else {
//     return () => { alert("no source"); };  // have to return something if typeguard fails
//# sourceMappingURL=editor.js.map