// this is a static class, there should only be one instance of it

// import { isEmptyObject } from "jquery"
import { isConditionalExpression } from "typescript"



// an observer is just a key and callback
export type Observer = {
    trigger: string,        // usually the ID of an HTMLElement
    action: Function,
}

export type DOMAttribute = {
    key: string,             // for example style='color:blue;'
    value: string,
}

// for some reason, observers needs to be a 'let', not a 'const'.
// otherwise gets optimized by TS and Webpack, and doesn't work reliably.
// that was a wasted afternoon.
var observers: Observer[] = []

export var bakeryDispenser = 0  // initial value



export const unicodeHeavyPlus = '➕'

export class DOMclass {

    debug = false

    //////////////////////
    /// micro 'observable' for events

    addObserver(trigger: string, callback: Function): Observer {
        let newObserver: Observer = { trigger: trigger, action: callback }
        observers.push(newObserver)
        // if (this.debug) console.log(`%caddObserver('${trigger})'`, 'background-color:yellow;')
        return newObserver
    }

    notifyObservers(trigger: string): void {
        // may trigger several actions
        if (this.debug) console.log(`%cnotifyObservers('${trigger})'`, 'background-color:yellow;')
        observers.forEach(obs => { obs.trigger === trigger ? obs.action() : null })     // if message matches, call the action
    }

    removeObserver(trigger: string): void {
        if (this.debug) console.log(`%cremoveObserver('${trigger})'`, 'background-color:yellow;')
        observers = observers.filter(obs => obs.trigger !== trigger);
    }

    // some triggers are just the id of a button, but
    // there is are triggers when the data changes



    //////////////////////
    /// add to DOM

    /** convert a nodeID to definitely an HTMLElement, assume always exists or error */
    tagToElement(nodeID: string | HTMLElement): HTMLElement {
        let tag: HTMLElement

        if (typeof nodeID == 'string') {
            tag = document.getElementById(nodeID)
            if (tag === null) {
                throw (`'${nodeID}' not found in DOM`)
            }
        } else {
            tag = nodeID   // already an HTMLelement
        }
        return tag
    }

    /** create a new HTMLElement (a 'node')
     *       node(newElement,   // a tag ike 'P'
     *            content,      // the innerHTML of the tag (may be another node())
     *            newId,        // tag id
     *            className     // class name
     *            attributes    // array of attributes  (name, value)
    */
    node(
        newElement: string,
        content: string | HTMLElement,
        newId: string = '',
        className: string = '',
        attributes: DOMAttribute[] = []): HTMLElement {

        let node: HTMLElement = document.createElement(newElement)
        if (className.length > 0) { node.className = className }
        if (typeof content === 'string' && content.length > 0) { node.innerHTML = content }
        if (newId.length > 0) { node.id = newId }
        // paste in any attributes...
        attributes.forEach((element) => {   // can be a string or an array
            node.setAttribute(element.key, element.value)
        })
        return (node)
    }


    /** append node to existing ID
     *     attach(lesson,      \\     attaching to <div id='lesson'>
     *             aNode       \\     fully formed content formed with node()
    */
    appendChild(existingID: string | HTMLElement, aNode: HTMLElement | HTMLElement[]): HTMLElement {
        let tag = DOM.tagToElement(existingID)
        // now existingID is a tag (or we have logged an error)


        // either aNode is an array or a single HTMLElement, just easier syntax
        if (Array.isArray(aNode)) {
            aNode.forEach((element) => {   // can be a string or an array
                tag.appendChild(element)  // inside the <p></p>
            })
            return aNode.pop()  // last element of array
        } else {
            tag.appendChild(aNode)  // just a single element
        }
        return (aNode)
    }


    removeAllChildNodes(existingID: string | HTMLElement) {
        // console.log('removeAllChildNodes', existingID)
        if (existingID) {
            let tag = DOM.tagToElement(existingID)  // convert to HTMLElement

            if (tag.hasChildNodes()) {
                let children = tag.childNodes;
                for (let i = children.length - 1; i >= 0; i--) {
                    if (tag.children[i] instanceof HTMLElement) {
                        // console.log('removing ', tag, ' firstchild ', tag.firstChild)
                        this.removeObserver(tag.children[i].id)
                        this.removeAllChildNodes(tag.children[i].id)  // recursive call
                        tag.children[i].remove() //removeChild(tag.firstChild);
                    }
                }
            }
        }
    }





    // // simple examples
    // let newNode = DOM.node('p', 'we have written new text', 'ID123')   // we'll need ID123
    // console.log('newNode', newNode)
    // DOM.attach('App', [newNode])

    // // throw up a button
    // DOM.attach('App',  DOM.node('button', 'Primary', '', 'btn btn-primary'))


    // // throw up a button that interacts with the DOM
    // let simpleCallback = () => {   // first we need an action for the on-click
    //     document.getElementById('ID123').textContent = 'we have changed the text';  // update the <p></p> node
    // }
    // DOM.addObserver('ID234', simpleCallback)  // we store it away for later


    // DOM.attach('App',  // and now we add a button to the DOM
    //     DOM.node('button', 'Info', '', 'btn btn-info', [['onclick', "MathcodeAPI.notifyObservers('ID234')"]])
    // )



    // ////////////////////////////////////////////////////

    // // but it's much simpler with utility functions
    // let infoButton = DOM.button('App','clickMe', 'info')
    // let msg = DOM.paragraph('App','Now is the time')

    // DOM.addObserver(infoButton.id,()=>msg.textContent = 'that was the time')



    //////////////////////
    /// compound utilities for Buttons, etc


    /** format a class or id into something like 'sect0005x' */
    divName(prefix: string, tkt: number) {
        return (prefix + ("000" + tkt).slice(-4))   // prefix + 4-digit tkt
    }

    /** dispenses a unique number (only unique for this browser document) */
    bakeryTicket(): number {
        bakeryDispenser += 1
        return (bakeryDispenser)
    }

    // adds an attribute to an existing array of attributes IF not already set
    defaultAttribute(
        attributes: DOMAttribute[] = [],
        newAttribute: DOMAttribute): DOMAttribute[] {

        // naive start, we just look to see whether it is already set
        let found = attributes.findIndex(element => element.key == newAttribute.key)
        if (found == -1) // not found
        {
            // this is the easy case - not found,
            attributes.push(newAttribute)
        } else {
            // found, nothing to do - but there is a special case for style
            if (newAttribute.key == 'style') {
                attributes[found].value += newAttribute.value
            }
        }
        return attributes
    }




    /** quick button, returns button's ID,  Button is appended to parent */
    button(parent: string | HTMLElement,
        text: string,
        color: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' | 'link',
        // rest is optional
        callback: Function = () => { },  // default empty
        attributes: DOMAttribute[] = [],
        solid: boolean = true,
        aria: string = '',        // defaults to text, add if using a glyph
    ): string {

        let tag = DOM.tagToElement(parent)  // convert to HTMLElement

        let uniqID = DOM.divName('btn', DOM.bakeryTicket())
        let btnSet = `btn-${color} `
        let btnNotSet = `btn-outline-${color} `

        let btnClass = `btn ` + (solid ? btnSet : btnNotSet)

        DOM.defaultAttribute(attributes, { key: 'id', value: uniqID })    // basic for ARIA
        DOM.defaultAttribute(attributes, { key: 'type', value: 'button' })    // basic for ARIA

        attributes.push({ key: 'onclick', value: `MathcodeAPI.DOM.notifyObservers("${uniqID}")` })
        attributes.push({ key: 'aria-label', value: aria ? aria : text })
        let infoButton = DOM.node('button', text, uniqID, btnClass, attributes)
        DOM.appendChild(tag, infoButton)

        // now add the callback
        DOM.addObserver(uniqID, callback)  // when the button is clicked...

        // console.log('have added button')
        return uniqID
    }



    /** quick toggle (like a button, but smarter) */
    toggle(parent: string | HTMLElement,
        text: string,
        color: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' | 'link',
        // rest is optional
        callbackOnSet: Function = () => { },  // default empty
        callbackOnUnset: Function = () => { },  // default empty
        attributes: DOMAttribute[] = [],
        initialSet: boolean = true,
        aria: string = '',        // defaults to text, add if using a glyph
    ): HTMLElement {

        throw ('toggle is unfinished')

        let uniqID = DOM.divName('btn', DOM.bakeryTicket())
        let btnSet = `btn - ${color} `
        let btnNotSet = `btn - outline - ${color} `

        DOM.defaultAttribute(attributes, { key: 'id', value: uniqID })    // basic for ARIA
        DOM.defaultAttribute(attributes, { key: 'type', value: 'button' })    // basic for ARIA

        // let aria know that it is a toggle
        DOM.defaultAttribute(attributes, { key: 'aria-pressed', value: initialSet ? "true" : "false" })    // basics for ARIA
        // this is just the toggle, there will be another observable for the action
        DOM.addObserver(uniqID, () => {
            let me = document.getElementById(uniqID)!;
            if (me.classList.replace(btnSet, btnNotSet)) {  // true if was able to replace
                me.ariaPressed = "false"
                console.log('setting aria to false')
            } else {
                me.classList.replace(btnNotSet, btnSet)
                me.ariaPressed = "true"
                console.log('setting aria to true')
            }
        })
        attributes.push({ key: 'onclick', value: `MathcodeAPI.DOM.notifyObservers("${uniqID}")` })
        attributes.push({ key: 'class', value: `btn ` + (initialSet ? btnSet : btnNotSet) })
        attributes.push({ key: 'aria-label', value: aria ? aria : text })
        let infoButton = DOM.node('button', text, uniqID, `btn btn - ${color} `, attributes)
        DOM.appendChild(parent, infoButton)

        // we have OUR OWN callback that decides whether we were set or not...
        // and IT calls one or the other of the toggle callbacks

        // TODO  unfinished toggle ***********/

        // now add the callback
        //    DOM.addObserver(uniqID, callback)  // when the button is clicked...

        return infoButton
    }

    /** quick <p> */
    paragraph(parent: string | HTMLElement,
        text: string,
        attributes: DOMAttribute[] = []): HTMLElement {

        let uniqID = DOM.divName('para', DOM.bakeryTicket())  // ALWAYS gets an ID
        // bold the text, looks better in bootstrap
        let ptext = DOM.node('p', `< b > ${text} </b>`, uniqID, '', attributes)
        DOM.appendChild(parent, ptext)
        return ptext
    }

    /** quick <span> */
    span(parent: string | HTMLElement,
        text: string,
        attributes: DOMAttribute[] = []): HTMLElement {

        let ptext = DOM.node('span', text, '', '', attributes)
        DOM.appendChild(parent, ptext)
        return ptext
    }

}
export const DOM = new DOMclass    // expose DOMclass
