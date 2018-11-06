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
            return "./ts.worker.js";
        }
        return "./editor.worker.js";
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

document.getElementById("download")!.onclick = () => editor.download("game.ts");
document.getElementById("upload")!.onclick = () => editor.upload();
document.getElementById("run")!.onclick = async () => {
    try {
        const fn = await editor.transpile(game.scope);
        editorDiv.hidden = true;
        game.run(fn);
    } catch (e) {
        alert(e);
    }
};
document.getElementById("stop")!.onclick = () => {
    try {
        game.stop();
    } finally {
        editorDiv.hidden = false;
    }
};
document.getElementById("pause")!.onclick = () => game.pause();
document.getElementById("fullscreen")!.onclick = () => game.fullScreen = true;
