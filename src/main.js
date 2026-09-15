"use strict";
// to prepare the baby.d.ts.txt file, you must
//   - remove all the 'import' statements
//   - remove the word 'export' from 'export declare'
//   - you should also remove   /** @ignore */ and the line that follows
Object.defineProperty(exports, "__esModule", { value: true });
exports.Main = void 0;
const version_1 = require("./version");
const editor_1 = require("./editor");
const onClickSay_1 = require("./onClickSay");
const tsxgraph_1 = require("./tsxgraph");
const moodle_1 = require("./moodle");
// const split_1 = require("./split");
// import { asciiMath, testAsciiMath } from './ASCIIMathML'
// import { VT52 } from './vt52'
// import { Draw, V3, Ray } from './draw'
// import { PlanetCute } from "./planetcute";
// import { testTree, treeviewComponent } from "./components/treeview";
// import { DOMclass } from "./DOM";
// import { tsFS } from './tsFS'
// import { LangString } from './lang'
// import { Raytracer } from './raytracer'
// import { Observable } from './observer';
// import { mindmap, testMindMap } from './mindmap';
const buffer_1 = require("buffer");
// import { XMLHttpRequest } from 'xmlhttprequest-ts'
// not sure if this is useful
self.MonacoEnvironment = {
    getWorkerUrl(moduleId, label) {
        if (label === "typescript" || label === "javascript") {
            return `./dist.${version_1.LIB_VERSION}/ts.worker.js`;
        }
        return `./dist.${version_1.LIB_VERSION}/editor.worker.js`;
    },
};
// test moodle async
async function test_talk_to_moodle() {
    await (0, moodle_1.talk_to_moodle)();
}
class Main {
    moodleID; // might be several textbooks, but only one moodle person
    prevUniq = ''; // best guess, in case we don't have one for a log record
    hiddenCode = ''; // prefix to code from the editor
    hiddenDecl = ''; // TS decl for hidden code
    initVisibleCode = ''; // initial code
    editorDiv;
    static editor;
    // game: GameLauncher
    download;
    upload;
    files;
    run;
    stop;
    pause;
    command;
    // fullscreen: HTMLButtonElement
    template = "TSX.point([0,4],{name:'A'})         // try running this... ";
    static onClickSay; // we'll put an instance here
    /** Attaches the mathcode API to the window object so that you can discover it */
    static attachMathCodeAPI() {
        // let onClickSay: OnClickSay
        // remember to add these to NAMESPACE in mathcoode.d.ts.txt
        window.Mathcode = {
        // VT52: (): VT52 => {
        //     return new VT52()
        // },
        // addObserver: (type: string, handler: Function) => {
        //     Observable.addObserver('user', type, handler)
        // },
        // Draw: (width: number = 800): Draw => {
        //     console.log('in mathcode')
        //     return new Draw(width)
        // },
        // V3: (x: number, y: number, z: number): V3 => {
        //     return new V3(x, y, z)
        // },
        // // Point3 and Color are just aliases for V3
        // Point3: (x: number, y: number, z: number): V3 => {
        //     return new V3(x, y, z)
        // },
        // Color: (x: number, y: number, z: number): V3 => {
        //     return new V3(x, y, z)
        // },
        // Ray: (origin: V3, direction: V3): Ray => {
        //     return new Ray(origin, direction)
        // },
        // PlanetCute: (): PlanetCute => {
        //     return new PlanetCute()
        // }
        },
            window.MathcodeAPI = {
                version: '1.1',
                // DOM: new DOMclass(),   // exposes the DOM utilities
                loader: (courseInfo, moodleID) => {
                    console.log('%cMathcodeAPI.loader successful', 'background-color:red;color:white;');
                    // console.log('courseInfo(raw): ', courseInfo, 'moodleID', moodleID)
                    main.moodleID = moodleID;
                    // attach the dragger
                    let h = document.getElementById("hsplitbar");
                    if (h) {
                        (0, split_1.dragElement)(h, "V");
                    }
                    let v = document.getElementById("vsplitbar");
                    if (v) {
                        (0, split_1.dragElement)(v, "H");
                    }
                    // start loading the voices
                    this.onClickSay = new onClickSay_1.OnClickSay();
                    this.onClickSay.onClickSay(' .', 0); // empty utter, but makes sure we are ready
                },
                // call MathcodeAPI.TSXGraph() to get a TSXGraph context,  eg:
                TSXGraph: (canvas) => {
                    // console.log('mathcodeAPI initBoard', canvas);
                    return tsxgraph_1.TSX.initBoard(canvas, { keepAspectRatio: true });
                },
                logAnswerToQuestion: (paragraphUniq, textbook, bakery0, questionType, question) => {
                    let answer;
                    if (questionType == 'SingleLongAnswer')
                        answer = document.getElementById(bakery0).value; // : HTMLElement or null
                    else
                        answer = document.getElementById(bakery0).innerText;
                    writeMoodleLog({ 'datacode': 'LOG_Answer', 'id': main.moodleID, 'textbook': textbook, 'paragraph': paragraphUniq, 'data01': answer, 'data02': question });
                },
                submitChallenge: (stepUniq, textbook) => {
                    // console.log(`submitEditor: (${stepUniq}: string, ${textbook}: string)`)
                    // need a callback, this is an async function
                    let blob = new Blob([Main.editor.editor.getValue()], { type: "text/plain" });
                    let reader = new FileReader();
                    reader.readAsText(blob);
                    reader.onloadend = function () {
                        let result = reader.result;
                        if (typeof result == 'string') { // because might be ArrayBuffer
                            let base64 = buffer_1.Buffer.from(result, 'utf8').toString('base64');
                            writeMoodleLog({ 'datacode': 'LOG_Challenge', 'id': main.moodleID, 'textbook': textbook, 'data01': stepUniq, 'data02': base64 });
                        }
                    };
                },
                // MathcodeAPI.onClickSay("u00051",voice,"step","activity","topic")
                onClickSay: (utterID, voiceN, paragraph, textbook) => {
                    // console.log(`onClickSay: (utterID: ${utterID}, voiceN: ${voiceN}, step: ${step}, activity: ${activity}, topic: ${topic})`)
                    let sayThis = document.getElementById(utterID); // : HTMLElement or null
                    if (!sayThis) { // might be null
                        writeMoodleLog({ 'datacode': 'LOG_Error', 'id': main.moodleID, 'textbook': textbook, 'paragraph': paragraph, 'data01': `could not find HTML ID '${utterID}' for paragraph '${paragraph}'` });
                    }
                    else {
                        writeMoodleLog({ 'datacode': 'LOG_ClickSay', 'id': main.moodleID, 'textbook': textbook, 'paragraph': paragraph, 'data01': sayThis.innerHTML.substring(0, 40) });
                        if (!this.onClickSay)
                            this.onClickSay = new onClickSay_1.OnClickSay();
                        // this.onClickSay = new OnClickSay()
                        this.onClickSay.onClickSay(sayThis.innerHTML, voiceN);
                    }
                },
                // utility to copy contents of a ID to the clipboard
                copyToClipboard: (inputID) => {
                    let txt = document.getElementById(inputID);
                    txt.select(); // won't work on tablet
                    navigator.clipboard.writeText(txt.value);
                    // console.log(`%ccopied '${txt.value}' to clipboard`, 'background-color:#ffE0E0;')
                },
                // utility to copy contents of a ID to the clipboard
                popquizSubmit: (inputID) => {
                    // pick up the popquiz value and update the form before submit
                    let id = 'a' + inputID + 1;
                    let txt = document.getElementById(id);
                    if (txt !== null) {
                        // console.log(`%cpopquiz '${txt.value}'`, 'background-color:#ffE0E0;')
                    }
                    else {
                        // console.log(`%cpopquiz - could not find ${id} '`, 'background-color:#ffE0E0;')
                    }
                },
                findFileExplorer: () => {
                    this.editor.upload();
                },
                // saveFileExplorer: (s) => {
                //     this.editor.createWebPage(main.hiddenCode); // asnyc
                // },
                // //////// these functions are for the file explorer
                // refreshFileExplorer: (n: number) => {
                //     let fs = new tsFS()
                //     fs.eraseFileExplorer()
                //     fs.fileExplorer(n)
                // },
                // eraseFileExplorer: () => {    // erases the canvas
                //     let fs = new tsFS()
                //     fs.eraseFileExplorer()
                // },
                // findFileExplorer: (s: string) => {
                //     let fs = new tsFS()
                //     fs.findFileExplorer(s)
                // },
                // saveFileExplorer: (s: string) => {f
                //     let fs = new tsFS()
                //     fs.saveFileExplorer(s)
                // },
                // trashfileFileExplorer: (s: string) => {
                //     let fs = new tsFS()
                //     fs.trashfileFileExplorer(parseInt(s))
                // },
                // trashdirFileExplorer: (s: string) => {
                //     let fs = new tsFS()
                //     fs.trashfileFileExplorer(parseInt(s))
                // mindmap: (content: string, canvas: string) => {
                //     // console.log('drawing mindmap', content, canvas)
                //     // let pm = new mindmap(content, canvas)
                //     // pm.drawMindMap()
                //     // testMindMap()
                // },
                // // expose the Split library...
                // Split:(a:any,b:any)=>{
                //     console.log(window,a,b);
                //     const Split = window.Split
                //     Split(a,b);
                // },
                // student clicks into reflection, have they finished all challenges?
                readyToReflect: (step, textbook) => {
                    // console.log(`readyToReflect: (${step}:number,${activity}:number,${topic}:number)`)
                    // this version is neutered
                    let readyToReflect = true; // TODO:  look it up in the page
                    if (!readyToReflect) {
                        // if NOT ready, then use 1001, data01 describes what is missing
                        writeMoodleLog({ 'datacode': 'LOG_NotReadyToReflect', 'id': main.moodleID, 'textbook': textbook, 'data01': 'code challenge', 'step': step });
                        alert('checking whether you are reading to finish ' + step.toString());
                    }
                    else {
                        // if ready, then use 1002.  and set a flag so don't have to check again
                        writeMoodleLog({ 'datacode': 'Log_ReadyToReflect', 'id': main.moodleID, 'textbook': textbook, 'step': step });
                    }
                    return readyToReflect;
                },
                // MathcodeAPI.completeStep("00051","step","activity","topic")
                completeStep: (id, paragraph, textbook) => {
                    // alert('complete step')
                    writeMoodleLog({ 'datacode': 'Log_CompleteStep', 'id': main.moodleID, 'textbook': textbook, 'paragraph': paragraph, });
                    return (true); // whetherh we can go ahead
                },
                hiddencode: (hidden64, decl64) => {
                    let b = buffer_1.Buffer.from(hidden64, 'base64');
                    main.hiddenCode = b.toString();
                    b = buffer_1.Buffer.from(decl64, 'base64');
                    main.hiddenDecl = b.toString();
                    main.setupMonacoEditor(main.hiddenCode, main.hiddenDecl, false); // not popup
                    // console.log('hidden code', main.hiddenCode)
                    // console.log('hidden decl', main.hiddenDecl)
                },
                // this combines 'hiddencode' and 'copyToEditor' for the playground
                setupEditorWithCode: (hidden64, decl64, visible64) => {
                    let b = buffer_1.Buffer.from(visible64, 'base64');
                    main.initVisibleCode = b.toString();
                    b = buffer_1.Buffer.from(hidden64, 'base64');
                    main.hiddenCode = b.toString();
                    b = buffer_1.Buffer.from(decl64, 'base64');
                    main.hiddenDecl = b.toString();
                    main.setupMonacoEditor(main.hiddenCode, main.hiddenDecl, true, main.initVisibleCode); // popup true for playground
                    // Main.editor.editor.setValue(main.initVisibleCode)
                    //TODO:  write the hidden and visible code AFTER initialization
                    // Main.editor.editor.onDidChangeModelContent((editor) => {
                    // }, '');
                    // console.log('hidden code', main.hiddenCode)
                    // console.log('hidden decl', main.hiddenDecl)
                    // console.log('visible code', main.initVisibleCode)
                },
                copyToEditor(paragraph, textbook, code) {
                    // console.log('copytoEditor code:', code);
                    let codeString = window.atob(code);
                    writeMoodleLog({ 'datacode': 'Log_CopyToEditor', 'id': main.moodleID, 'textbook': textbook, 'paragraph': paragraph, data01: code });
                    // // refresh the editor before we copy, clearing any old hidden stuff
                    Main.editor.editor.setValue(codeString);
                    // console.log('copyToEditor', codeString)
                },
                share(paragraph, textbook, shareKey) {
                    console.log('in new share');
                    // write log with a callback, this is an async function
                    let blob = new Blob([Main.editor.editor.getValue()], { type: "text/plain" });
                    let reader = new FileReader();
                    reader.readAsText(blob);
                    let codebase64;
                    reader.onloadend = function () {
                        let result = reader.result;
                        if (typeof result == 'string') { // because might be ArrayBuffer
                            codebase64 = buffer_1.Buffer.from(result, 'utf8').toString('base64');
                        }
                        else { // Monaco entarrayBuffer
                            let enc = new TextDecoder("utf-8"); // use a text decoder
                            let code = enc.decode(result);
                            codebase64 = buffer_1.Buffer.from(code, 'utf8').toString('base64');
                        }
                        let hiddendeclbase64 = buffer_1.Buffer.from(Main.editor.hiddenDecl, 'utf8').toString('base64');
                        let hiddencodebase64 = buffer_1.Buffer.from(Main.editor.hiddenCode, 'utf8').toString('base64');
                        writeMoodleLog({ 'datacode': 'LOG_ShareCode', 'id': main.moodleID, 'textbook': textbook, 'data01': '', 'data02': shareKey, 'data05': codebase64, 'data06': hiddencodebase64, 'data07': hiddendeclbase64 });
                    };
                },
                //// these are the buttons on the Editor
                runEditor(stepUniq, textbook, shareKey = '') {
                    console.log(`runEditor(${stepUniq},${textbook})`);
                    // write log with a callback, this is an async function
                    let blob = new Blob([Main.editor.editor.getValue()], { type: "text/plain" });
                    let reader = new FileReader();
                    reader.readAsText(blob);
                    reader.onloadend = function () {
                        let result = reader.result;
                        if (typeof result == 'string') { // because might be ArrayBuffer
                            let codebase64 = buffer_1.Buffer.from(result, 'utf8').toString('base64');
                            let hiddencodebase64 = buffer_1.Buffer.from(Main.editor.hiddenCode, 'utf8').toString('base64');
                            let hiddendeclbase64 = buffer_1.Buffer.from(Main.editor.hiddenDecl, 'utf8').toString('base64');
                            writeMoodleLog({ 'datacode': 'LOG_RunCode', 'id': main.moodleID, 'textbook': textbook, 'data01': stepUniq, 'data02': shareKey, 'data05': codebase64, 'data06': hiddencodebase64, 'data07': hiddendeclbase64 });
                        }
                    };
                    try {
                        // Main.editor.transpileLog(main.hiddenCode)  // also runs
                        Main.editor.transpile(main.hiddenCode, false);
                        // writeMoodleLog({ 'datacode': 'SHARE', 'id': main.moodleID, 'textbook': textbook, 'paragraph': '0', 'data05': main.hiddenCode })
                    }
                    catch (e) { // transpile error.  show it in an alert
                        alert(e);
                    }
                },
                // almost the same as runEditor but code is sent
                runInCanvas(paragraph, textbook, code) {
                    // console.log(`runInCanvas(${paragraph})`);
                    let tsCode = window.atob(code);
                    // console.log('runInCanvas', tsCode)
                    writeMoodleLog({ 'datacode': 'Log_RunIcon', 'id': main.moodleID, 'textbook': textbook, 'paragraph': paragraph, data01: tsCode });
                    // Main.editor.transpile(tsCode);
                    Main.editor.runEditorCode(tsCode, false); // and run the whole mess - NOT A POPUP
                },
                //// these are the buttons on the Editor
                stopEditor() {
                    try {
                        // console.log('clicked STOP')
                        this.eraseFileExplorer(); // in case it is open (also resets '2D')
                        // Observable.resetUserObservers()
                        throw 'stop';
                    }
                    catch (e) { } // we intentionally throwed, no error msg required
                },
                snapQuestion(paragraphUniq, textbook, bakery, question, answer) {
                    // expose the answer and write it to the log
                    console.log('snapQuestion()', paragraphUniq, textbook, bakery, question, answer);
                    // id  Annn is input text
                    //     Bnnn is answer (hidden, make visibility:visible)
                    //     Cnnn is verify button (visible, make visiblility:hidden)
                    let A = document.getElementById('A' + bakery);
                    let B = document.getElementById('B' + bakery);
                    let C = document.getElementById('C' + bakery);
                    let myAnswer = A.value;
                    B.style.display = 'block';
                    C.style.display = 'none';
                    writeMoodleLog({ 'datacode': 'LOG_SnapQuestion', 'id': main.moodleID, 'textbook': textbook, 'paragraph': paragraphUniq, 'data01': question, 'data02': answer, 'data03': myAnswer });
                },
                // sometimes the host wants to write without a refresh
                writeLog(payload64) {
                    let b = buffer_1.Buffer.from(payload64, 'base64');
                    const msg = JSON.parse(b.toString());
                    writeMoodleLog(msg);
                },
                // this function called when a tab is clicked
                tabButton(thisTab, nTabs, tabPrefix) {
                    let tabName;
                    // clear ALL tabs
                    for (var i = 1; i <= nTabs; i++) {
                        tabName = tabPrefix + i.toString();
                        // console.log('clearing ID', tabName)
                        document.getElementById(tabName).style.display = 'none';
                    }
                    // now set the one we want
                    tabName = tabPrefix + thisTab.toString();
                    // console.log('setting ID ', tabName)
                    document.getElementById(tabName).style.display = 'block';
                },
            };
    }
    constructor() {
        // console.log('in Main.constructor()')
        console.log("Your screen resolution is: " + screen.width + "x" + screen.height);
        /** Attaches the mathcode API to the window object so that you can discover it */
        Main.attachMathCodeAPI();
        /** attaches the kybd and mouse events */
        // addEventListener('keydown', (e) => Observable.notifyObservers('keydown', e))
        // addEventListener('keypress', (e) => Observable.notifyObservers('keypress', e))
        // addEventListener('mousedown', (e) => Observable.notifyObservers('mousedown', e))
        // addEventListener('click', (e) => Observable.notifyObservers('click', e))
        // let str = new LangString()
        // str.testGetString()
        // let fs = new tsFS()
        // fs.crud()
        // Raytracer()
        // LogRecord.readAndClear()  // initialize
        // LogRecord.add(1, 2, 3, 'zerodata')
        // LogRecord.add(11, 12, 13, 'onedata')
        // test_talk_to_moodle() // this is an async function
        // testTree()
        // let treeview = new treeviewComponent('Tree','root label')
        // treeview.renderTree()
        Main.onClickSay = new onClickSay_1.OnClickSay();
        // this.expandCodestr()   // not static, so use 'this'
        // const State = {
        //     inputModel: null,
        //     outputModel: null,
        // };
    }
    resetButtons() {
        this.download.disabled = false;
        this.upload.disabled = false;
        this.run.disabled = false;
        // this.stop.disabled = true;
        // this.pause.innerText = "Pause";
        // this.pause.disabled = true;
        // this.fullscreen.disabled = true;
    }
    // expandCodestr() {
    //     console.log('about to expand CODESTR blocks')
    //     let elements = document.getElementsByClassName('codestr')
    //     for (let i = 0; i < elements.length; i++) {   // HTMLElements not iterable ?!?
    //         let codestrElement = elements[i] as HTMLElement
    //         let codestr = codestrElement.dataset.code
    //         console.log('before', codestrElement, codestr)
    //         if (codestr) {      // might be undefined
    //             // PHP specialcharacters() converts five elements, we must switch them back
    //             codestr = codestr.replaceAll(`&amp;`, `&`)
    //             codestr = codestr.replaceAll(`&quot;`, `&`)
    //             codestr = codestr.replaceAll(`&#039;`, `'`)
    //             codestr = codestr.replaceAll(`&lt;`, `<`)
    //             codestr = codestr.replaceAll(`&gt;`, `>`)
    //             console.log('after', codestr)
    //         }
    //     }
    // }
    setupMonacoEditor(hiddenCode, hiddenDecl, popup, visibleCode = '') {
        // monaco.editor.createModel(lib_baby, 'typescript', monaco.Uri.parse(babyUri));
        this.editorDiv = document.getElementById("editor");
        // console.log('%clooking for editor div element', 'background-color:blue;color:white;')
        if (this.editorDiv) { // if page has an editor div
            // console.log('%cSTARTING EDITOR', 'background-color:blue;color:white;')
            Main.editor = new editor_1.Editor(this.editorDiv, this.template, hiddenCode, hiddenDecl, visibleCode); // static !!
            // console.log('%cSTARTING EDITOR', 'background-color:blue;color:white;', 'editorDiv', this.editorDiv, 'template', this.template, 'hiddenCode', hiddenCode, 'hiddenDecl', hiddenDecl)
            // this.game = undefined //new GameLauncher(800, 600);
            this.download = document.getElementById("download");
            this.upload = document.getElementById("upload");
            this.files = document.getElementById("files");
            this.run = document.getElementById("run");
            this.stop = document.getElementById("stop");
            this.pause = document.getElementById("pause");
            this.command = document.getElementById("command");
            // this.fullscreen = document.getElementById("fullscreen") as HTMLButtonElement;
            if (this.download)
                this.download.onclick = () => Main.editor.createWebPage(main.hiddenCode); // asnyc
            // / Main.editor.download("game.ts");
            if (this.upload)
                this.upload.onclick = () => Main.editor.upload();
            if (this.files)
                this.files.onclick = () => window.MathcodeAPI.refreshFileExplorer(1);
            if (this.run) {
                this.run.onclick = async () => {
                    // console.log('clicked RUN #2')
                    // this.run.disabled = false;  // was true
                    // this.stop.disabled = false;
                    // this.pause.disabled = false;
                    // this.command.disabled = false;
                    let jxgDiv = document.getElementById('jxgbox');
                    // console.log('removing with method 1')
                    while (jxgDiv.lastElementChild) {
                        // console.log('removing', jxgDiv.lastElementChild)
                        jxgDiv.removeChild(jxgDiv.lastElementChild);
                    }
                    // this.fullscreen.disabled = false;
                    try {
                        // before we do anything else, we WIPE OUT any previous
                        // content of <div id='jxgbox'>
                        // if someone wants a canvas, they add their own
                        // const fn = await this.editor.transpile(this.game.scope);
                        //this.editorDiv.hidden = true;
                        Main.editor.transpile(main.hiddenCode, popup); // also runs
                    }
                    catch (e) { // transpile error.  show it in an alert
                        alert(e);
                        this.resetButtons();
                    }
                };
            }
            // this.command.onclick = () => {
            //     console.log('clicked command')
            //     // const paused = this.game.paused;
            //     // this.game.paused = !paused;
            //     // this.pause.innerText = paused ? "Pause" : "Continue";
            //     // this.fullscreen.disabled = !paused;
            // };
        }
        else {
            console.log('%cdid not find editor div element', 'background-color:blue;color:white;');
        }
        // this.fullscreen.onclick = () => this.game.fullScreen = true;
    }
}
exports.Main = Main;
let main = new Main();
// let JXGlocal = JXG.JSXGraph   // make sure it links in
let prevUniq = '';
function writeMoodleLog(payload) {
    // console.log('in writeMoodleLog', payload)
    // a bit of a hack.  sometimes we don't know the UNIQ who called us
    // (for example, working in the editor and running code)
    // but we want to be able to query the log for all records
    // so we simply use the PREVIOUS UNIQ (usually that got us here)
    if (payload.paragraph == undefined)
        payload.paragraph = prevUniq ?? '';
    else
        prevUniq = payload.paragraph;
    let JsonData = JSON.stringify(payload);
    // console.log('JsonData:', JsonData)
    /*
    let xhr = new XMLHttpRequest();
    // let formData = new FormData(); // Currently empty

    xhr.open("POST", "ajax.php?payload="+JsonData, true);
    //Send the proper header information along with the request
    // xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader("Content-type", "application/json");

    xhr.send();  // should be JsonData
*/
    /////////////////////
    // same using Beacon API   https://developer.mozilla.org/en-US/docs/Web/API/Beacon_API
    // The Beacon API is used to send an asynchronous and non-blocking request to a web server.
    // The request does not expect a response. The browser guarantees to initiate beacon requests
    // before the page is unloaded and to run them to completion.
    // The main use case for the Beacon API is to send analytics such as client-side events or session data to the server.
    let base64 = buffer_1.Buffer.from(JsonData, 'utf8').toString('base64');
    // console.log('base64', base64)
    let formData = new FormData();
    formData.set('payload', base64);
    navigator.sendBeacon("ajax.php", formData);
}
//# sourceMappingURL=main.js.map