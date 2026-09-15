import * as monaco from "monaco-editor";
export declare class Editor {
    editor: monaco.editor.IStandaloneCodeEditor;
    initFile: string;
    el: HTMLElement;
    storageKey: string;
    safeDelay: number;
    hiddenCode: string;
    hiddenDecl: string;
    visibleCode: string;
    editorCode: string;
    constructor(el: HTMLElement, initFile: string, hiddenCode?: string, hiddenDecl?: string, visibleCode?: string);
    upload(): void;
    copyToEditor(code: string, hidden: string, decls: string): void;
    command(fileName: string): void;
    transpileLog(hiddenCode: string): void;
    transpile(hiddenCode: string, popup: boolean): Promise<string>;
    createWebPage(hiddenCode: string): Promise<void>;
    runEditorCode(tsCode64: string, popup: boolean, tabIndex0?: boolean, jsDelivr?: boolean): void;
    generateWebPage(): void;
    /** create <script></script>  */
    generateSourceCode(editorCode: string, tabIndex0?: boolean, jsDelivr?: boolean): string;
}
