import * as monaco from "monaco-editor";

export class Editor {
    private editor: monaco.editor.IStandaloneCodeEditor;
    private textFile: string | undefined;

    constructor(el: HTMLElement, initFile: string, storageKey: string, safeDelay: number = 5000) {
        this.editor = monaco.editor.create(el, {
            automaticLayout: true,
            language: "typescript",
            scrollBeyondLastLine: false,
            value: window.localStorage.getItem(storageKey) || initFile,
        });
        let safeTimeout: number;
        this.editor.onDidChangeModelContent(() => {
            if (safeTimeout) {
                clearTimeout(safeTimeout);
            }
            safeTimeout = window.setTimeout(
                () => window.localStorage.setItem(storageKey, this.editor.getValue()),
                safeDelay);
        });
    }

    download(fileName: string) {
        const data = new Blob([this.editor.getValue()], { type: "text/plain" });
        if (this.textFile) {
            window.URL.revokeObjectURL(this.textFile);
        }
        this.textFile = window.URL.createObjectURL(data);
        const link = document.createElement("a");
        link.download = fileName;
        link.href = this.textFile;
        link.dispatchEvent(new MouseEvent("click"));
    }

    upload() {
        const input = document.createElement("input");
        input.type = "file";
        input.onchange = () => {
            const fileReader = new FileReader();
            fileReader.onload = () => this.editor.setValue(fileReader.result as string);
            fileReader.readAsText(input.files![0]);
        };
        input.click();
    }

    async transpile(scope: any = {}) {
        const names = Object.keys(scope);
        const args = names.map((key) => scope[key]);
        const model = this.editor.getModel();   // typescript needs a typeguard to be happy
        if (model !== null) {
            const resource = model.uri;
            const errors = monaco.editor.getModelMarkers({ resource })
                .map((m) => `Line ${m.startLineNumber}: ${m.message}`)
                .join("\n");
            if (errors.length > 0) {
                throw errors;
            }
            const worker = await monaco.languages.typescript.getTypeScriptWorker();
            const client = await worker(resource);
            const output = await client.getEmitOutput(resource.toString());
            const code = output.outputFiles[0].text as string;
            const src = `"use strict";(function(${names.join()}){eval(${JSON.stringify(code)})}).apply(this, arguments[0])`;
            return () => new Function(src).call(window, args);
        } else {
            return () => { alert("no uri, so no source"); };  // have to return something if typeguard fails
        }
    }
}
