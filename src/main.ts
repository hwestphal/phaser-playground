// to prepare the baby.d.ts.txt file, you must
//   - remove all the 'import' statements
//   - remove the word 'export' from 'export declare'
//   - you should also remove   /** @ignore */ and the line that follows


import { Editor } from "./editor";


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
    fullscreen: HTMLButtonElement

    template = "let app = new Baby()"


    constructor() {

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
        this.fullscreen = document.getElementById("fullscreen") as HTMLButtonElement;


        // // new Function(src) is a safer form of eval().  
        // let code = `app.floor(30,30,5);let cube = app.cube().color('blue').move('up',1)`
        // let app = new Baby(code)

        this.download.onclick = () => this.editor.download("game.ts");
        this.upload.onclick = () => this.editor.upload();

        this.run.onclick = async () => {
            console.log('clicked RUN')
            this.download.disabled = true;
            this.upload.disabled = true;
            this.run.disabled = false;  // was true
            this.stop.disabled = false;
            this.pause.disabled = false;
            this.fullscreen.disabled = false;
            try {
                // const fn = await this.editor.transpile(this.game.scope);
                //this.editorDiv.hidden = true;
                let f = this.editor.transpile()

                // this.game.run(fn);
            } catch (e) {   // transpile error.  show it in an alert
                alert(e);
                this.resetButtons();
            }
        };
        this.stop.onclick = () => {
            try {
                //TODO: implement stop
                // this.game.stop();
            } finally {
                this.editorDiv.hidden = false;
                this.resetButtons();
            }
        };
        this.pause.onclick = () => {
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
        this.stop.disabled = true;
        this.pause.innerText = "Pause";
        this.pause.disabled = true;
        this.fullscreen.disabled = true;
    }
}


let main = new Main()

