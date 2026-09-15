import { Editor } from "./editor";
import { OnClickSay } from "./onClickSay";
export declare class Main {
    moodleID: number;
    prevUniq: string;
    hiddenCode: string;
    hiddenDecl: string;
    initVisibleCode: string;
    editorDiv: HTMLDivElement;
    static editor: Editor;
    download: HTMLButtonElement;
    upload: HTMLButtonElement;
    files: HTMLButtonElement;
    run: HTMLButtonElement;
    stop: HTMLButtonElement;
    pause: HTMLButtonElement;
    command: HTMLButtonElement;
    template: string;
    static onClickSay: OnClickSay;
    /** Attaches the mathcode API to the window object so that you can discover it */
    static attachMathCodeAPI(): void;
    constructor();
    resetButtons(): void;
    setupMonacoEditor(hiddenCode: string, hiddenDecl: string, popup: boolean, visibleCode?: string): void;
}
