// to prepare the baby.d.ts.txt file, you must
//   - remove all the 'import' statements
//   - remove the word 'export' from 'export declare'
//   - you should also remove   /** @ignore */ and the line that follows

import ts from 'typescript';

import { Editor } from "./editor";
import { OnClickSay } from "./onClickSay"
import { asciiMath, testAsciiMath } from './ASCIIMathML'

import { VT52 } from './vt52'
import { Draw, V3, Ray } from './draw'
import { PlanetCute } from "./planetcute";


import { testTree, treeviewComponent } from "./components/treeview";
import { DOMclass } from "./DOM";
import { talk_to_moodle } from './moodle'

import { tsFS } from './tsFS'
import { LangString } from './lang'
import { dragElement } from './split'
import { Raytracer } from './raytracer'
import { Observable } from './observer';
import { mindmap, testMindMap } from './mindmap';
import { Buffer } from "buffer";

// import { XMLHttpRequest } from 'xmlhttprequest-ts'

// not sure if this is useful
(self as any).MonacoEnvironment = {
    getWorkerUrl(moduleId: string, label: string) {
        if (label === "typescript" || label === "javascript") {
            return "./dist/ts.worker.js";
        }
        return "./dist/editor.worker.js";
    },
};


// test moodle async
async function test_talk_to_moodle() {
    await talk_to_moodle()
}

// a HostMsg is really just a log entry
export interface HostMsg {
    datacode: string;
    id: number;              // moodleID
    textbook: string;       // one day will have multiple textbooks running
    data01?: string;
    data02?: string;
    data03?: string;
    data04?: string;
    data05?: string;
    data06?: string;

    uniq?: string;
}





export class Main {

    static moodleID: number     // might be several textbooks, but only one moodle person
    static prevUniq = ''        // best guess, in case we don't have one for a log record



    editorDiv: HTMLDivElement
    static editor: Editor
    // game: GameLauncher
    download: HTMLButtonElement
    upload: HTMLButtonElement
    files: HTMLButtonElement
    run: HTMLButtonElement
    stop: HTMLButtonElement
    pause: HTMLButtonElement
    command: HTMLButtonElement
    // fullscreen: HTMLButtonElement

    template = "// for information about this editor visit https://microsoft.github.io/monaco-editor/"  // the code that appears first time

    static onClickSay: OnClickSay      // we'll put an instance here



    // static attachMathCode() {
    //     (window as any).Mathcode = {
    //         version: '1.0',

    //         VT52: () => {
    //             console.log('Mathcode.loader()')
    //             console.log('Mathcode.loader successful')
    //             return new VT52()
    //         },
    //     }
    // }


    /** Attaches the mathcode API to the window object so that you can discover it */
    static attachMathCodeAPI() {   // NB - STATIC !!!
        // let onClickSay: OnClickSay

        // remember to add these to NAMESPACE in mathcoode.d.ts.txt
        (window as any).Mathcode = {

            VT52: (): VT52 => {
                return new VT52()
            },

            addObserver: (type: string, handler: Function) => {
                Observable.addObserver('user', type, handler)
            },


            Draw: (width: number = 800): Draw => {
                console.log('in mathcode')
                return new Draw(width)
            },
            V3: (x: number, y: number, z: number): V3 => {
                return new V3(x, y, z)
            },
            // Point3 and Color are just aliases for V3
            Point3: (x: number, y: number, z: number): V3 => {
                return new V3(x, y, z)
            },
            Color: (x: number, y: number, z: number): V3 => {
                return new V3(x, y, z)
            },

            Ray: (origin: V3, direction: V3): Ray => {
                return new Ray(origin, direction)
            },
            PlanetCute: (): PlanetCute => {
                return new PlanetCute()
            }
        },




            (window as any).MathcodeAPI = {
                version: '1.1',

                DOM: new DOMclass(),   // exposes the DOM utilities

                loader: (courseInfo: string, moodleID: number) => {
                    console.log('%cMathcodeAPI.loader successful', 'background-color:red;color:white;')
                    console.log('courseInfo(raw): ', courseInfo, 'moodleID', moodleID)

                    this.moodleID = moodleID

                    // testAsciiMath()  // needs element 'testmath'
                    // testMindMap()  // needs element 'canvas'

                    // attach the dragger
                    let h = document.getElementById("hsplitbar")

                    if (h) {
                        dragElement(h, "V");
                    }

                    let v = document.getElementById("vsplitbar")
                    if (v) {
                        dragElement(v, "H");
                    }


                    // start loading the voices
                    this.onClickSay = new OnClickSay()
                    this.onClickSay.onClickSay(' .', 0)       // empty utter, but makes sure we are ready

                },


                logAnswerToQuestion: (paragraphUniq: string, bakery0: string) => {
                    console.log('in logAnswerToQuestion()');
                },

                // MathcodeAPI.onClickSay("u00051",voice,"step","activity","topic")
                onClickSay: (utterID: string, voiceN: number, paragraph: string, textbook: string) => {
                    // console.log(`onClickSay: (utterID: ${utterID}, voiceN: ${voiceN}, step: ${step}, activity: ${activity}, topic: ${topic})`)

                    let sayThis = document.getElementById(utterID)  // : HTMLElement or null
                    if (!sayThis) {     // might be null
                        writeMoodleLog({ 'datacode': 'LOG_Error', 'id': this.moodleID, 'textbook': textbook, 'data01': `could not find HTML ID '${utterID}' for paragraph '${paragraph}'` })
                    } else {

                        writeMoodleLog({ 'datacode': 'LOG_ClickSay', 'id': this.moodleID, 'textbook': textbook, 'data01': sayThis.innerHTML.substring(0, 40), 'uniq': paragraph })

                        if (!this.onClickSay)
                            this.onClickSay = new OnClickSay()

                        // this.onClickSay = new OnClickSay()
                        this.onClickSay.onClickSay(sayThis.innerHTML, voiceN)
                    }
                },

                // utility to copy contents of a ID to the clipboard
                copyToClipboard: (inputID: string) => {
                    let txt = document.getElementById(inputID) as HTMLFormElement
                    txt.select()  // won't work on tablet
                    navigator.clipboard.writeText(txt.value)
                    console.log(`%ccopied '${txt.value}' to clipboard`, 'background-color:#ffE0E0;')
                },


                // utility to copy contents of a ID to the clipboard
                popquizSubmit: (inputID: string) => {
                    // pick up the popquiz value and update the form before submit
                    let id = 'a' + inputID + 1
                    let txt = document.getElementById(id) as HTMLFormElement
                    if (txt !== null) {
                        console.log(`%cpopquiz '${txt.value}'`, 'background-color:#ffE0E0;')
                    } else {
                        console.log(`%cpopquiz - could not find ${id} '`, 'background-color:#ffE0E0;')

                    }
                },


                //////// these functions are for the file explorer
                refreshFileExplorer: (n: number) => {
                    let fs = new tsFS()
                    fs.eraseFileExplorer()
                    fs.fileExplorer(n)
                },
                eraseFileExplorer: () => {    // erases the canvas
                    let fs = new tsFS()
                    fs.eraseFileExplorer()
                },
                findFileExplorer: (s: string) => {
                    let fs = new tsFS()
                    fs.findFileExplorer(s)
                },
                saveFileExplorer: (s: string) => {
                    let fs = new tsFS()
                    fs.saveFileExplorer(s)
                },

                trashfileFileExplorer: (s: string) => {
                    let fs = new tsFS()
                    fs.trashfileFileExplorer(parseInt(s))
                },
                trashdirFileExplorer: (s: string) => {
                    let fs = new tsFS()
                    fs.trashfileFileExplorer(parseInt(s))
                },

                mindmap: (content: string, canvas: string) => {
                    console.log('drawing mindmap', content, canvas)
                    let pm = new mindmap(content, canvas)
                    pm.drawMindMap()
                    // testMindMap()
                },


                // // expose the Split library...
                // Split:(a:any,b:any)=>{
                //     console.log(window,a,b);
                //     const Split = window.Split

                //     Split(a,b);
                // },

                // student clicks into reflection, have they finished all challenges?
                readyToReflect: (step: string, textbook: string): boolean => {
                    // console.log(`readyToReflect: (${step}:number,${activity}:number,${topic}:number)`)

                    // this version is neutered
                    let readyToReflect = true  // TODO:  look it up in the page

                    if (!readyToReflect) {
                        // if NOT ready, then use 1001, data01 describes what is missing
                        writeMoodleLog({ 'datacode': 'LOG_NotReadyToReflect', 'id': this.moodleID, 'textbook': textbook, 'data01': 'code challenge', 'uniq': step })
                        alert('checking whether you are reading to finish ' + step.toString())
                    } else {
                        // if ready, then use 1002.  and set a flag so don't have to check again
                        writeMoodleLog({ 'datacode': 'Log_ReadyToReflect', 'id': this.moodleID, 'textbook': textbook, 'uniq': step })
                    }
                    return readyToReflect
                },


                // MathcodeAPI.completeStep("00051","step","activity","topic")
                completeStep: (id: string, uniq: string, textbook: string) => {
                    // alert('complete step')
                    writeMoodleLog({ 'datacode': 'Log_CompleteStep', 'id': this.moodleID, 'textbook': textbook, 'uniq': uniq, })
                    return (true)  // whetherh we can go ahead
                },

                copyToEditor(paragraph: string, code: string, textbook: string) {
                    let codeString = window.atob(code)
                    writeMoodleLog({ 'datacode': 'Log_CopyToEditor', 'id': this.moodleID, 'textbook': textbook, 'uniq': paragraph, data01: code })
                    Main.editor.editor.setValue(codeString)
                },

                runInCanvas(paragraph: string, code: string, textbook: string) {   // convert from TS to JS first !!
                    let tsCode = window.atob(code)
                    writeMoodleLog({ 'datacode': 'Log_RunInCanvas', 'id': this.moodleID, 'textbook': textbook, 'uniq': paragraph, data01: tsCode })
                    let jsCode = ts.transpile(tsCode);

                    // before we do anything else, we WIPE OUT any previous
                    // content of <div id='jxgbox'>
                    // then add back a simple canvas
                    let jxgDiv = document.getElementById('jxgbox')
                    // console.log('removing with method 2')
                    while (jxgDiv.firstChild) {
                        jxgDiv.firstChild.remove()
                    }
                    let canv = document.createElement("canvas")
                    canv.id = 'canvas'
                    jxgDiv.appendChild(canv)



                    Main.editor.runEditorCode(jsCode)
                },

                //// these are the buttons on the Editor
                runEditor() {
                    // console.log('clicked RUN #1')
                    this.eraseFileExplorer()    // in case it is open (also resets '2D')

                    let jxgDiv = document.getElementById('jxgbox')
                    // console.log('removing with method 1')
                    while (jxgDiv.lastElementChild) {
                        // console.log('removing', jxgDiv.lastElementChild)
                        jxgDiv.removeChild(jxgDiv.lastElementChild);
                    }
                    let canv = document.createElement("canvas")
                    canv.id = 'canvas'
                    jxgDiv.appendChild(canv)

                    try {
                        Main.editor.transpile()  // also runs
                    } catch (e) {   // transpile error.  show it in an alert
                        alert(e);
                    }
                },
                //// these are the buttons on the Editor
                stopEditor() {
                    try {
                        console.log('clicked STOP')
                        this.eraseFileExplorer()    // in case it is open (also resets '2D')
                        Observable.resetUserObservers()
                        throw 'stop'
                    } catch (e) { }  // we intentionally throwed, no error msg required
                },
                submitEditor(s: string) {
                    console.log('arrived in Submit')
                },

                snapQuestion(uniq: string, textbook: string, bakery: number, question: string, answer: string) {
                    // expose the answer and write it to the log
                    console.log('snapQuestion()', uniq, textbook, bakery, question, answer)
                    // id  Annn is input text
                    //     Bnnn is answer (hidden, make visibility:visible)
                    //     Cnnn is verify button (visible, make visiblility:hidden)
                    let A = document.getElementById('A' + bakery) as HTMLInputElement
                    let B = document.getElementById('B' + bakery)
                    let C = document.getElementById('C' + bakery)

                    let myAnswer = A.value
                    B.style.display = 'block'
                    C.style.display = 'none'

                    writeMoodleLog({ 'datacode': 'LOG_SnapQuestion', 'id': this.moodleID, 'textbook': textbook, 'data01': question, 'data02': answer, 'data03': myAnswer, 'uniq': uniq })
                },

                // sometimes the host wants to write without a refresh
                writeLog(payload64: string) {
                    let b = Buffer.from(payload64, 'base64')
                    const msg: HostMsg = JSON.parse(b.toString())

                    writeMoodleLog(msg);
                },


                // this function called when a tab is clicked
                tabButton(thisTab: number, nTabs: number, tabPrefix: string) {
                    let tabName;

                    // clear ALL tabs
                    for (var i = 1; i <= nTabs; i++) {
                        tabName = tabPrefix + i.toString();
                        console.log('clearing ID', tabName)
                        document.getElementById(tabName).style.display = 'none';
                    }

                    // now set the one we want
                    tabName = tabPrefix + thisTab.toString();
                    console.log('setting ID ', tabName)
                    document.getElementById(tabName).style.display = 'block';
                },

                wSpinnerPrefix: '',
                wSpinnerVowel: '',
                wSpinnerSuffix: '',

                wordSpinner: function(pvs: string, letters: string) {
                    console.log('wordspinner', pvs, letters)
                    // shift all the existing words down
                    document.getElementById('spin3').innerHTML = document.getElementById('spin2').innerHTML;
                    document.getElementById('spin2').innerHTML = document.getElementById('spin1').innerHTML;
                    document.getElementById('spin1').innerHTML = document.getElementById('spin0').innerHTML;

                    if (pvs == 'p') { this.wSpinnerPrefix = letters; }
                    else {
                        if (pvs == 'v') { this.wSpinnerVowel = letters; }
                        else { this.wSpinnerSuffix = letters; }
                    }

                    console.log('pre',this.wSpinnerPrefix,'vow',this.wSpinnerVowel,'suf',this.wSpinnerSuffix)
                    document.getElementById('spin0').innerHTML = this.wSpinnerPrefix + this.wSpinnerVowel + this.wSpinnerSuffix;
                },


                wordSpinnerPlusE: function(pvs: string, letters: string) {

                    // shift all the existing words down
                    document.getElementById('spin3').innerHTML = document.getElementById('spin2').innerHTML;
                    document.getElementById('spin2').innerHTML = document.getElementById('spin1').innerHTML;
                    document.getElementById('spin1').innerHTML = document.getElementById('spin0').innerHTML;

                    if (pvs == 'p') { this.wSpinnerPrefix = letters; }
                    else {
                        if (pvs == 'v') { this.wSpinnerVowel = letters; }
                        else { this.wSpinnerSuffix = letters; }
                    }

                    document.getElementById('spin0').innerHTML = this.wSpinnerPrefix + this.wSpinnerVowel + this.wSpinnerSuffix + 'e';
                }




            }

    }

    constructor() {

        console.log('in Main.constructor()')
        console.log("Your screen resolution is: " + screen.width + "x" + screen.height);


        /** Attaches the mathcode API to the window object so that you can discover it */
        Main.attachMathCodeAPI();

        /** attaches the kybd and mouse events */
        // Observable.setupObservables()
        addEventListener('keydown', (e) => Observable.notifyObservers('keydown', e))
        addEventListener('keypress', (e) => Observable.notifyObservers('keypress', e))
        addEventListener('mousedown', (e) => Observable.notifyObservers('mousedown', e))
        addEventListener('click', (e) => Observable.notifyObservers('click', e))

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


        Main.onClickSay = new OnClickSay()
        // this.expandCodestr()   // not static, so use 'this'



        // const State = {
        //     inputModel: null,
        //     outputModel: null,
        // };



        // monaco.editor.createModel(lib_baby, 'typescript', monaco.Uri.parse(babyUri));

        this.editorDiv = document.getElementById("editor") as HTMLDivElement
        console.log('%clooking for editor div element', 'background-color:blue;color:white;')
        if (this.editorDiv) {  // if page has an editor div
            console.log('%cSTARTING EDITOR', 'background-color:blue;color:white;')

            Main.editor = new Editor(this.editorDiv, this.template);  // static !!
            console.log('%c seems to have started', 'background-color:blue;color:white;')

            // this.game = undefined //new GameLauncher(800, 600);
            this.download = document.getElementById("download") as HTMLButtonElement;
            this.upload = document.getElementById("upload") as HTMLButtonElement;
            this.files = document.getElementById("files") as HTMLButtonElement;
            this.run = document.getElementById("run") as HTMLButtonElement;
            this.stop = document.getElementById("stop") as HTMLButtonElement;
            this.pause = document.getElementById("pause") as HTMLButtonElement;
            this.command = document.getElementById("command") as HTMLButtonElement;
            // this.fullscreen = document.getElementById("fullscreen") as HTMLButtonElement;


            if (this.download)
                this.download.onclick = () => Main.editor.download("game.ts");
            if (this.upload)
                this.upload.onclick = () => Main.editor.upload();
            if (this.files)
                this.files.onclick = () => (window as any).MathcodeAPI.refreshFileExplorer(1);

            if (this.run) {
                this.run.onclick = async () => {
                    console.log('clicked RUN #2')
                    // this.run.disabled = false;  // was true
                    // this.stop.disabled = false;
                    // this.pause.disabled = false;
                    // this.command.disabled = false;
                    let jxgDiv = document.getElementById('jxgbox')
                    console.log('removing with method 1')
                    while (jxgDiv.lastElementChild) {
                        console.log('removing', jxgDiv.lastElementChild)
                        jxgDiv.removeChild(jxgDiv.lastElementChild);
                    }

                    // this.fullscreen.disabled = false;

                    try {

                        // before we do anything else, we WIPE OUT any previous
                        // content of <div id='jxgbox'>
                        // if someone wants a canvas, they add their own

                        // const fn = await this.editor.transpile(this.game.scope);
                        //this.editorDiv.hidden = true;
                        Main.editor.transpile()  // also runs
                        // this.editor.runEditorCode()

                    } catch (e) {   // transpile error.  show it in an alert
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
        } else {
            console.log('%cdid not find editor div element', 'background-color:blue;color:white;')
        }
        // this.fullscreen.onclick = () => this.game.fullScreen = true;




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


    static writeMoodleLog(payload: HostMsg) {

        console.log('in writeMoodleLog', payload)

        // a bit of a hack.  sometimes we don't know the UNIQ who called us
        // (for example, working in the editor and running code)
        // but we want to be able to query the log for all records
        // so we simply use the PREVIOUS UNIQ (usually that got us here)

        if (payload.uniq == undefined)
            payload.uniq = this.prevUniq
        else
            this.prevUniq = payload.uniq



        let JsonData = JSON.stringify(payload)
        console.log('JsonData:', JsonData)

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

        let base64 = Buffer.from(JsonData, 'utf8').toString('base64');
        console.log('base64', base64)
        navigator.sendBeacon("ajax.php?payload=" + base64);
    }

}



let main = new Main()

// let JXGlocal = JXG.JSXGraph   // make sure it links in





let prevUniq = '';
function writeMoodleLog(payload: HostMsg) {

    console.log('in writeMoodleLog', payload)

    // a bit of a hack.  sometimes we don't know the UNIQ who called us
    // (for example, working in the editor and running code)
    // but we want to be able to query the log for all records
    // so we simply use the PREVIOUS UNIQ (usually that got us here)

    if (payload.uniq == undefined)
        payload.uniq = prevUniq
    else
        prevUniq = payload.uniq



    let JsonData = JSON.stringify(payload)
    console.log('JsonData:', JsonData)

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

    let base64 = Buffer.from(JsonData, 'utf8').toString('base64');
    console.log('base64', base64)
    navigator.sendBeacon("ajax.php?payload=" + base64);
}



