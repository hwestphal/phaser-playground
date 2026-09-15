export declare type Observer = {
    trigger: string;
    action: Function;
};
export declare type DOMAttribute = {
    key: string;
    value: string;
};
export declare var bakeryDispenser: number;
export declare const unicodeHeavyPlus = "\u2795";
export declare class DOMclass {
    debug: boolean;
    addObserver(trigger: string, callback: Function): Observer;
    notifyObservers(trigger: string): void;
    removeObserver(trigger: string): void;
    /** convert a nodeID to definitely an HTMLElement, assume always exists or error */
    tagToElement(nodeID: string | HTMLElement): HTMLElement;
    /** create a new HTMLElement (a 'node')
     *       node(newElement,   // a tag ike 'P'
     *            content,      // the innerHTML of the tag (may be another node())
     *            newId,        // tag id
     *            className     // class name
     *            attributes    // array of attributes  (name, value)
    */
    node(newElement: string, content: string | HTMLElement, newId?: string, className?: string, attributes?: DOMAttribute[]): HTMLElement;
    /** append node to existing ID
     *     attach(lesson,      \\     attaching to <div id='lesson'>
     *             aNode       \\     fully formed content formed with node()
    */
    appendChild(existingID: string | HTMLElement, aNode: HTMLElement | HTMLElement[]): HTMLElement;
    removeAllChildNodes(existingID: string | HTMLElement): void;
    /** format a class or id into something like 'sect0005x' */
    divName(prefix: string, tkt: number): string;
    /** dispenses a unique number (only unique for this browser document) */
    bakeryTicket(): number;
    defaultAttribute(attributes: DOMAttribute[], newAttribute: DOMAttribute): DOMAttribute[];
    /** quick button, returns button's ID,  Button is appended to parent */
    button(parent: string | HTMLElement, text: string, color: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' | 'link', callback?: Function, // default empty
    attributes?: DOMAttribute[], solid?: boolean, aria?: string): string;
    /** quick toggle (like a button, but smarter) */
    toggle(parent: string | HTMLElement, text: string, color: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' | 'link', callbackOnSet?: Function, // default empty
    callbackOnUnset?: Function, // default empty
    attributes?: DOMAttribute[], initialSet?: boolean, aria?: string): HTMLElement;
    /** quick <p> */
    paragraph(parent: string | HTMLElement, text: string, attributes?: DOMAttribute[]): HTMLElement;
    /** quick <span> */
    span(parent: string | HTMLElement, text: string, attributes?: DOMAttribute[]): HTMLElement;
}
export declare const DOM: DOMclass;
