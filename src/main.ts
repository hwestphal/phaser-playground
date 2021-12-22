// to prepare the baby.d.ts.txt file, you must
//   - remove all the 'import' statements
//   - remove the word 'export' from 'export declare'
//   - you should also remove   /** @ignore */ and the line that follows


import { Editor } from "./editor";
import { OnClickSay } from "./onClickSay"
// import {TerminalJS } from './terminal'
import *  as Prism from 'prismjs'
import { asciiMath, testAsciiMath } from './ASCIIMathML'
import { Log } from './utilities'

// import { XMLHttpRequest } from 'xmlhttprequest-ts'




import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory, RouterLink,RouterView } from 'vue-router'
import naive from 'naive-ui'

const a = RouterView
const b = RouterLink
console.log(a,b)

// import router from './router' // <---
import Home from './views/Home.vue'
import About from './views/About.vue'


// for development with vue-cli, keep /router/index.js in synch

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/about",
        name: "About",
        component: About,
    },
];

export const router = createRouter({
    history: createWebHistory(),
    routes,
});



// not sure if this is useful
(self as any).MonacoEnvironment = {
    getWorkerUrl(moduleId: string, label: string) {
        if (label === "typescript" || label === "javascript") {
            return "./dist/ts.worker.js";
        }
        return "./dist/editor.worker.js";
    },
};


class Main {

    editorDiv: HTMLDivElement
    editor: Editor
    // game: GameLauncher
    download: HTMLButtonElement
    upload: HTMLButtonElement
    run: HTMLButtonElement
    stop: HTMLButtonElement
    pause: HTMLButtonElement
    command: HTMLButtonElement
    // fullscreen: HTMLButtonElement

    template = "console.log('Hello World')"

    static onClickSay: OnClickSay      // we'll put an instance here




    /** Attaches the mathcode API to the window object so that you can discover it */
    static attachMathCode() {   // NB - STATIC !!!
        // let onClickSay: OnClickSay

        (window as any).MathcodeAPI = {
            version: '1.0',

            loader: () => {
                console.log('MathcodeAPI.loader()')
                console.log('MathcodeAPI.loader successful')
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


        }
    }



    constructor() {

        console.log('in Main.constructor()')

        createApp(App).use(router).use(naive).mount('#app')

        // createApp(App).mount("#app");


        // createApp(App)
        //     .component('vue-router', vueRoute)
        //     .use(routes)
        //     .mount('#app');    // this semicolon is important for some reason


        Main.onClickSay = new OnClickSay()
        this.expandCodestr()   // not static, so use 'this'


        /** Attaches the mathcode API to the window object so that you can discover it */
        Main.attachMathCode();

        const State = {
            inputModel: null,
            outputModel: null,
        };



        // monaco.editor.createModel(lib_baby, 'typescript', monaco.Uri.parse(babyUri));

        this.editorDiv = document.getElementById("editor")! as HTMLDivElement
        this.editor = new Editor(this.editorDiv, this.template);


        // this.game = undefined //new GameLauncher(800, 600);
        this.download = document.getElementById("download") as HTMLButtonElement;
        this.upload = document.getElementById("upload") as HTMLButtonElement;
        this.run = document.getElementById("run") as HTMLButtonElement;
        this.stop = document.getElementById("stop") as HTMLButtonElement;
        this.pause = document.getElementById("pause") as HTMLButtonElement;
        this.command = document.getElementById("command") as HTMLButtonElement;
        // this.fullscreen = document.getElementById("fullscreen") as HTMLButtonElement;



        this.download.onclick = () => this.editor.download("game.ts");
        this.upload.onclick = () => this.editor.upload();

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
                this.editor.transpile()
                // this.editor.runEditorCode()

            } catch (e) {   // transpile error.  show it in an alert
                alert(e);
                this.resetButtons();
            }
        };
        // this.stop.onclick = () => {
        //     try {
        //         //TODO: implement stop
        //         // this.game.stop();
        //     } finally {
        //         this.editorDiv.hidden = false;
        //         this.resetButtons();
        //     }
        // };
        // this.pause.onclick = () => {
        //     // const paused = this.game.paused;
        //     // this.game.paused = !paused;
        //     // this.pause.innerText = paused ? "Pause" : "Continue";
        //     // this.fullscreen.disabled = !paused;
        // };

        this.command.onclick = () => {
            console.log('clicked command')
            // const paused = this.game.paused;
            // this.game.paused = !paused;
            // this.pause.innerText = paused ? "Pause" : "Continue";
            // this.fullscreen.disabled = !paused;
        };

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






