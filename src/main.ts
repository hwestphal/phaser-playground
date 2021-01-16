import * as monaco from "monaco-editor";
import { Editor } from "./editor";
import lib_es5 from "./extraLibs/lib.es5.d.ts.txt";
import lib_p2 from "./extraLibs/p2.d.ts.txt";
import lib_phaser from "./extraLibs/phaser.comments.d.ts.txt";
import lib_pixi from "./extraLibs/pixi.comments.d.ts.txt";
import lib_runtime from "./extraLibs/runtime.d.ts.txt";
import { GameLauncher } from "./game";
import template from "./template.ts.txt";

(self as any).MonacoEnvironment = {
    getWorkerUrl(moduleId: string, label: string) {
        if (label === "typescript" || label === "javascript") {
            return "./dist/ts.worker.js";
        }
        return "./dist/editor.worker.js";
    },
};

monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
    allowNonTsExtensions: true,
    inlineSourceMap: true,
    inlineSources: true,
    noLib: true,
    sourceMap: true,
    strict: true,
    target: monaco.languages.typescript.ScriptTarget.ES5,
});
monaco.languages.typescript.typescriptDefaults.addExtraLib(lib_es5, "lib.es5.d.ts");
monaco.languages.typescript.typescriptDefaults.addExtraLib(lib_p2, "p2.d.ts");
monaco.languages.typescript.typescriptDefaults.addExtraLib(lib_pixi, "pixi.comments.d.ts");
monaco.languages.typescript.typescriptDefaults.addExtraLib(lib_phaser, "phaser.comments.d.ts");
monaco.languages.typescript.typescriptDefaults.addExtraLib(lib_runtime, "runtime.d.ts");

const editorDiv = document.getElementById("editor")!;
const editor = new Editor(editorDiv, template, "phaser/source");
const game = new GameLauncher(800, 600);

const download = document.getElementById("download") as HTMLButtonElement;
const upload = document.getElementById("upload") as HTMLButtonElement;
const run = document.getElementById("run") as HTMLButtonElement;
const stop = document.getElementById("stop") as HTMLButtonElement;
const pause = document.getElementById("pause") as HTMLButtonElement;
const fullscreen = document.getElementById("fullscreen") as HTMLButtonElement;

download.onclick = () => editor.download("game.ts");
upload.onclick = () => editor.upload();
run.onclick = async () => {
    download.disabled = true;
    upload.disabled = true;
    run.disabled = true;
    stop.disabled = false;
    pause.disabled = false;
    fullscreen.disabled = false;
    try {
        const fn = await editor.transpile(game.scope);
        editorDiv.hidden = true;
        game.run(fn);
    } catch (e) {
        alert(e);
        resetButtons();
    }
};
stop.onclick = () => {
    try {
        game.stop();
    } finally {
        editorDiv.hidden = false;
        resetButtons();
    }
};
pause.onclick = () => {
    const paused = game.paused;
    game.paused = !paused;
    pause.innerText = paused ? "Pause" : "Continue";
    fullscreen.disabled = !paused;
};
fullscreen.onclick = () => game.fullScreen = true;

function resetButtons() {
    download.disabled = false;
    upload.disabled = false;
    run.disabled = false;
    stop.disabled = true;
    pause.innerText = "Pause";
    pause.disabled = true;
    fullscreen.disabled = true;
}
