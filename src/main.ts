// to prepare the baby.d.ts.txt file, you must
//   - remove all the 'import' statements
//   - remove the word 'export' from 'export declare'
//   - you should also remove   /** @ignore */ and the line that follows

import ts from 'typescript';

import { Editor } from "./editor";
import { OnClickSay } from "./onClickSay"
import { asciiMath, testAsciiMath } from './ASCIIMathML'
import { Log } from './utilities'

import { VT52 } from './vt52'
import { Draw, V3, Ray } from './draw'
import { PlanetCute } from "./planetcute";


import { testTree, treeviewComponent } from "./components/treeview";
import { DOMclass } from "./DOM";
import { talk_to_moodle } from './moodle'

import { LogRecord, logRecord } from './logrecords'
import { tsFS } from './tsFS'
import { LangString } from './lang'
import { dragElement } from './split'
import { Raytracer } from './raytracer'
import { Observable } from './observer';
import { mindmap, testMindMap } from './mindmap';

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




export class Main {

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

    template = "let app = new Baby()"

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

                loader: (courseInfo: string) => {
                    console.log('%cMathcodeAPI.loader successful', 'background-color:red;color:white;')
                    console.log('courseInfo(raw): ', courseInfo)

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
                },


                logAnswerToQuestion: (paragraphUniq:string,bakery0:string)=>{
                    console.log('in logAnswerToQuestion()');
                },

                // MathcodeAPI.onClickSay("u00051",voice,"step","activity","topic")
                onClickSay: (utterID: string, voiceN: number, step: number, activity: number, topic: number) => {
                    // console.log(`onClickSay: (utterID: ${utterID}, voiceN: ${voiceN}, step: ${step}, activity: ${activity}, topic: ${topic})`)

                    let sayThis = document.getElementById(utterID)  // : HTMLElement or null
                    if (!sayThis) {     // might be null
                        Log.write({ 'action': 'log', 'datacode': Log.Error, 'data01': `could not find HTML ID '${utterID}'`, 'step': step, 'activity': activity, 'topic': topic })
                    } else {

                        Log.write({ 'action': 'log', 'datacode': Log.ClickSpeaker, 'data01': utterID, 'data02': sayThis.innerHTML.substring(0, 30), 'step': step, 'activity': activity, 'topic': topic })

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
                readyToReflect: (step: number, activity: number, topic: number): boolean => {
                    // console.log(`readyToReflect: (${step}:number,${activity}:number,${topic}:number)`)

                    // this version is neutered
                    let readyToReflect = true  // TODO:  look it up in the page

                    if (!readyToReflect) {
                        // if NOT ready, then use 1001, data01 describes what is missing
                        Log.write({ 'action': 'readyToReflect', 'datacode': 1001, 'data01': 'code challenge', 'step': step, 'activity': activity, 'topic': topic })
                        alert('checking whether you are reading to finish ' + step.toString())
                    } else {
                        // if ready, then use 1002.  and set a flag so don't have to check again
                        Log.write({ 'action': 'readyToReflect', 'datacode': Log.ReadyToReflect, 'step': step, 'activity': activity, 'topic': topic })
                    }
                    return readyToReflect
                },


                // MathcodeAPI.completeStep("00051","step","activity","topic")
                completeStep: (id: string, step: number, activity: number, topic: number) => {
                    // alert('complete step')
                    Log.write({ 'action': 'completeStep', 'datacode': Log.CompleteStep, 'step': step, 'activity': activity, 'topic': topic })
                    return (true)  // whetherh we can go ahead
                },

                copyToEditor(paragraph: number, code: string) {
                    let codeString = window.atob(code)
                    Log.write({ 'action': 'copyToEditor', 'datacode': Log.CopyToEditor, 'step': paragraph, 'activity': 0, 'topic': 0, data01: code })
                    Main.editor.editor.setValue(codeString)
                },

                runInCanvas(paragraph: number, code: string) {   // convert from TS to JS first !!
                    let tsCode = window.atob(code)
                    Log.write({ 'action': 'runInCanvas', 'datacode': Log.RunInCanvas, 'step': paragraph, 'activity': 0, 'topic': 0, data01: tsCode })
                    let jsCode = ts.transpile(tsCode);
                    Main.editor.runEditorCode(jsCode)
                },

                //// these are the buttons on the Editor
                runEditor() {
                    console.log('clicked RUN')
                    this.eraseFileExplorer()    // in case it is open (also resets '2D')
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
                    console.log('clicked RUN')
                    // this.run.disabled = false;  // was true
                    // this.stop.disabled = false;
                    // this.pause.disabled = false;
                    // this.command.disabled = false;
                    // this.fullscreen.disabled = false;
                    try {
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

}

let main = new Main()

// let JXGlocal = JXG.JSXGraph   // make sure it links in






