// this is a static class, there should only be one instance of it



// an observer is just a key and callback
export type Observer = {
    trigger: string,        // usually the ID of an HTMLElement
    action: Function
}


const observers: Observer[] = []
let bakeryDispenser = 0



export class DOM {

    //////////////////////
    /// micro 'observable' for events

    static addObserver(trigger: string, callback: Function): Observer {
        let newObserver: Observer = { trigger: trigger, action: callback }
        observers.push(newObserver)
        return newObserver
    }

    static notifyObservers(trigger: string): void {
        observers.forEach(obs => { obs.trigger === trigger ? obs.action() : null })     // if message matches, call the action
    }

    // some triggers are just the id of a button, but
    // there is are triggers when the data changes



    //////////////////////
    /// add to DOM


    /** create a new HTMLElement (a 'node')
     *       node(newElement,   // a tag ike 'P'
     *            content,      // the innerHTML of the tag (may be another node())
     *            newId,        // tag id
     *            className     // class name
     *            attributes    // array of attributes  (name, value)
    */
    static node(newElement: string, content: string | HTMLElement, newId: string = '', className: string = '', attributes: [string, string][] = []): HTMLElement {
        let node: HTMLElement = document.createElement(newElement)
        if (className.length > 0) { node.className = className }
        if (typeof content === 'string' && content.length > 0) { node.innerHTML = content }
        if (newId.length > 0) { node.id = newId }
        // paste in any attributes...
        attributes.forEach((element) => {   // can be a string or an array
            // console.log('typeof element', typeof element)
            node.setAttribute(element[0], element[1])
        })
        return (node)
    }


    static tagToElement(pageID: string|HTMLElement):HTMLElement{

		let tag: HTMLElement

		if (typeof pageID == 'string') {
			tag = document.getElementById(pageID) as HTMLElement
			if (tag === null) {
				console.error(`No tag "${pageID}`)
                tag = document.getRootNode() as HTMLElement
			}
		} else {
			tag = pageID   // already an HTMLelement
		}
        return tag
    }

    /** append node to existing ID
     *     attach(lesson,      \\     attaching to <div id='lesson'>
     *             aNode       \\     fully formed content formed with node()
    */
    static appendChild(existingID: string | HTMLElement, aNode: HTMLElement | HTMLElement[]):HTMLElement {
        let tag = DOM.tagToElement(existingID)
        // now existingID is a tag (or we have logged an error)


        // either aNode is an array or a single HTMLElement, just easier syntax
        if (Array.isArray(aNode)) {
            aNode.forEach((element) => {   // can be a string or an array
                tag.appendChild(element)  // inside the <p></p>
            })
            return aNode.pop()!  // last element of array
        } else {
            tag.appendChild(aNode)  // just a single element
        }
        return(aNode)
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
    static divName(prefix: string, tkt: number) {
        return (prefix + ("000" + tkt).slice(-4))   // prefix + 4-digit tkt
    }

    /** dispenses a unique number (only unique for this browser document) */
    static bakeryTicket(): number {
        bakeryDispenser += 1
        return (bakeryDispenser)
    }

    /** quick button */
    static button(parent: string | HTMLElement,
        text: string,
        color: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' | 'link',
        solid: boolean = true,
        attributes: [string, string][] = []): HTMLElement {


        let uniqID = DOM.divName('btn', DOM.bakeryTicket())
        attributes.push(['onclick', `MathcodeAPI.notifyObservers("${uniqID}")`])
        let infoButton = DOM.node('button', text, uniqID, `btn btn-${color}`, attributes)
        DOM.appendChild(parent, infoButton)
        return infoButton
    }

    /** quick <p> */
    static paragraph(parent: string | HTMLElement,
        text: string,
        attributes: [string, string][] = []): HTMLElement {

        let uniqID = DOM.divName('para', DOM.bakeryTicket())
        let ptext = DOM.node('p', text, uniqID, '', attributes)
        DOM.appendChild(parent, ptext)
        return ptext
    }


}