// to prepare the baby.d.ts.txt file, you must
//   - remove all the 'import' statements
//   - remove the word 'export' from 'export declare'
//   - you should also remove   /** @ignore */ and the line that follows


import { Editor } from "./editor";
import { OnClickSay } from "./onClickSay"
import *  as Prism from 'prismjs'
// import { asciiMath, testAsciiMath } from './ASCIIMathML'
import { Log } from './utilities'

import { VT52 } from './vt52'
import { PlanetCute } from "./planetcute";


import { testTree, treeviewComponent } from "./components/treeview";
import { DOMclass } from "./DOM";
import { talk_to_moodle } from './moodle'

import { LogRecord, logRecord } from './logrecords'
import {tsFS} from './tsFS'

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

        (window as any).Mathcode = {

            VT52: (): VT52 => {
                return new VT52()
            },
            PlanetCute: (): PlanetCute => {
                return new PlanetCute()
            }
        },




            (window as any).MathcodeAPI = {
                version: '1.0',

                DOM: new DOMclass(),   // exposes the DOM utilities

                loader: (courseInfo: string) => {
                    console.log('%cMathcodeAPI.loader successful', 'background-color:red;color:white;')
                    console.log('courseInfo(raw): ', courseInfo)
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
                    let codeString = Buffer.from(code, 'base64').toString('binary');
                    Log.write({ 'action': 'copyToEditor', 'datacode': Log.CopyToEditor, 'step': paragraph, 'activity': 0, 'topic': 0, data01: code })
                    Main.editor.editor.setValue(codeString)
                },

                runInCanvas(paragraph: number, code: string) {
                    let codeString = Buffer.from(code, 'base64').toString('binary');
                    Log.write({ 'action': 'copyToEditor', 'datacode': Log.CopyToEditor, 'step': paragraph, 'activity': 0, 'topic': 0, data01: code })
                    Main.editor.runEditorCode(codeString)
                },
            }
    }



    constructor() {

        console.log('in Main.constructor()')

        let fs = new tsFS()

        fs.writeFile(0, 'books.xlsx', 'The Big Lebowski')

        console.log('localstorage 0', JSON.parse(localStorage.getItem('FileSystem_0')))
        console.log('localstorage 1', JSON.parse(localStorage.getItem('FileSystem_1')))
        console.log('localstorage 2', JSON.parse(localStorage.getItem('FileSystem_2')))
        console.log('localstorage 3', JSON.parse(localStorage.getItem('FileSystem_3')))

        fs.writeFile(0, 'books.xlsx', 'The Big Second Lebowski')

        console.log('localstorage 0', JSON.parse(localStorage.getItem('FileSystem_0')))
        console.log('localstorage 1', JSON.parse(localStorage.getItem('FileSystem_1')))
        console.log('localstorage 2', JSON.parse(localStorage.getItem('FileSystem_2')))
        console.log('localstorage 3', JSON.parse(localStorage.getItem('FileSystem_3')))



        LogRecord.readAndClear()  // initialize
        LogRecord.add(1, 2, 3, 'zerodata')
        LogRecord.add(11, 12, 13, 'onedata')


        test_talk_to_moodle() // this is an async function

        testTree()
        // let treeview = new treeviewComponent('Tree','root label')
        // treeview.renderTree()


        Main.onClickSay = new OnClickSay()
        this.expandCodestr()   // not static, so use 'this'


        /** Attaches the mathcode API to the window object so that you can discover it */
        Main.attachMathCodeAPI();

        // const State = {
        //     inputModel: null,
        //     outputModel: null,
        // };



        // monaco.editor.createModel(lib_baby, 'typescript', monaco.Uri.parse(babyUri));

        this.editorDiv = document.getElementById("editor") as HTMLDivElement
        if (this.editorDiv) {  // if page has an editor div
            Main.editor = new Editor(this.editorDiv, this.template);  // static !!

            // this.game = undefined //new GameLauncher(800, 600);
            this.download = document.getElementById("download") as HTMLButtonElement;
            this.upload = document.getElementById("upload") as HTMLButtonElement;
            this.run = document.getElementById("run") as HTMLButtonElement;
            this.stop = document.getElementById("stop") as HTMLButtonElement;
            this.pause = document.getElementById("pause") as HTMLButtonElement;
            this.command = document.getElementById("command") as HTMLButtonElement;
            // this.fullscreen = document.getElementById("fullscreen") as HTMLButtonElement;



            this.download.onclick = () => Main.editor.download("game.ts");
            this.upload.onclick = () => Main.editor.upload();

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



            this.command.onclick = () => {
                console.log('clicked command')
                // const paused = this.game.paused;
                // this.game.paused = !paused;
                // this.pause.innerText = paused ? "Pause" : "Continue";
                // this.fullscreen.disabled = !paused;
            };
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

    expandCodestr() {
        console.log('about to expand CODESTR blocks')
        let elements = document.getElementsByClassName('codestr')
        for (let i = 0; i < elements.length; i++) {   // HTMLElements not iterable ?!?
            let codestrElement = elements[i] as HTMLElement
            let codestr = codestrElement.dataset.code
            console.log('before', codestrElement, codestr)

            if (codestr) {      // might be undefined


                // PHP specialcharacters() converts five elements, we must switch them back
                codestr = codestr.replaceAll(`&amp;`, `&`)
                codestr = codestr.replaceAll(`&quot;`, `&`)
                codestr = codestr.replaceAll(`&#039;`, `'`)
                codestr = codestr.replaceAll(`&lt;`, `<`)
                codestr = codestr.replaceAll(`&gt;`, `>`)

                console.log('after', codestr)

                // and write back into the page
                elements[i].innerHTML = Prism.highlight(codestr, Prism.languages.javascript, 'javascript');
            }
        }
    }

}

let main = new Main()

// let JXGlocal = JXG.JSXGraph   // make sure it links in






