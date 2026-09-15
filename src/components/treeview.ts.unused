import { bakeryDispenser, DOM, unicodeHeavyPlus } from '../DOM'
import { MForms } from '../mforms'

// this tree is fairly specialized.
// - It ONLY shows the buttons that are on the current display path
// - there is a callback for every button (root might display x, level 1 might show y, or every button might be different)





export type treeNode = {
    uniqID: number        // fingerprint (like Symbol(), but easier to debug)
    buttonID: string,     // the buttonID that we get when we click
    label: string,
    callback: Function,
    children: treeNode[],
    color: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' | 'link',
    // addChild: Function,  // so we have a nice syntax
}

// there is no 'click' on the root (maybe the whole course?)

export class treeviewComponent /*implements viewComponent*/ {


    divElement: HTMLElement  // parent of the tree
    rootLabel: string
    root: treeNode
    openNode: treeNode | null // only one node can be open at a time
    rootBtnElement: HTMLElement  // delete this to clean the tree and redraw

    constructor(
        divID: string | HTMLElement, rootLabel: string,
        color: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' | 'link' = 'primary',
        callback: Function = () => { },
    ) {

        let row = MForms.rowOpen('Tree', 12)   // take all the space we are given

        this.divElement = DOM.tagToElement(row)
        this.root = this.treeNodeFactory(rootLabel, color, callback)  	// use the treeNodeFactory to create the root node

        this.openNode = null  // initially the entire tree is closed

        // immediately draw the root button

        // this.addButton(divID, this.root)
        // this.openNode = this.root
        this.renderTree()
        // console.log('rootbtnelement',this.rootBtnElement)
    }


    treeNodeFactory(
        label: string,
        color: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' | 'link',
        callback: Function,
    ): treeNode {


        let uniq = DOM.divName('tree', DOM.bakeryTicket())
        return {
            uniqID: DOM.bakeryTicket(),
            buttonID: uniq,   //
            callback: callback,
            label: label,
            children: [],  // none yet
            color: color,
        }
    }

    // adds a child to the tree (not yet to the DOM)
    addTreeChild(
        treeParent: treeNode,
        label: string,
        color: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' | 'link',
        codeblock: Function = (str: string) => { },
    ): treeNode {

        let newNode = this.treeNodeFactory(label, color, codeblock)  // new TREE node, not visible yet

        treeParent.children.push(newNode)  // add me to my parent's family
        return newNode
    }

    getRootNode(): treeNode {
        return this.root
    }

    // recursion is hard.   make it easier with a 'flatten()'
    flatten(node: treeNode, result: treeNode[] = []): treeNode[] {
        result.push(node)
        node.children.forEach(child => { this.flatten(child, result) })
        return result;
    }



    // this is trivially easy with flatten, it looked like hell when I first wrote it
    getTreenodeByID(buttonID: string): treeNode {
        let temp = this.flatten(this.root)
        return (temp.find(child => child.buttonID == buttonID))
    }



    nodeIsClicked(buttonID: string) {
        console.log('node is clicked:  buttonID', buttonID, `root is ${this.root.buttonID}`)

        if (!this.openNode) {    // if the tree isn't open, but you MUST have clicked on the root
            this.openNode = this.root
        } else
            // if you click on the root then we close the tree
            if (buttonID == this.root.buttonID) {  // click on root to close
                console.log(`%csetting OpenNode to null`, 'background-color:silver;')
                this.openNode = null
            } else {
                console.log(`%csetting OpenNode to ${buttonID}`, 'background-color:silver;')
                this.openNode = this.getTreenodeByID(buttonID)
            }
        this.renderTree()

    }

    // is the childnode we are looking for a child of THIS node?
    isChildOf(node: treeNode, childNode: treeNode): boolean {
        node.children.forEach(recursiveNode => {
            if (recursiveNode.buttonID == childNode.buttonID) {
                return (true)
            } else {
                return (this.isChildOf(recursiveNode, childNode))
            }
        });
        return false
    }

    renderTree(): void {   // always the whole thing
        // console.log('%crenderTree', 'background-color:silver;', this.openNode, this.root)

        DOM.removeAllChildNodes('Tree')  // erase any children (innerHTML and rest of tree)
        let indent = 0
        this.renderTreeHelper(this.root)
    }

    renderTreeHelper(node: treeNode): void {
        // console.log(`%crenderTreeHelper(${node.label})`, 'background-color:silver;')
        // if this is the opennode then list ALL children
        if (this.openNode && this.openNode.buttonID == node.buttonID) {   // if the root is expanded
            this.addButton('Tree', node)  // add a new button with all the fixings
            node.children.forEach(child => this.addButton('Tree', child))
        } else {
            if (this.containsOpenNode(node)) {   // if the root is expanded
                this.addButton('Tree', node)  // add a new button with all the fixings
                node.children.forEach(child => {
                    this.renderTreeHelper(child)
                })
            }
        }

    }
    containsOpenNode(node: treeNode): boolean {
        // console.log(`testing ${node.label}`)

        if (node.buttonID == this.root.buttonID) return true   // always the root
        if (this.openNode === null) return false   // no one is open
        if (this.openNode.buttonID === node.buttonID) return true  // it is WE that is open

        // // i tried to do this recursively with 'some', but it didn't work
        // // i think i have to create an array of results, and then some() of the array
        // return node.children.some(child => { this.containsOpenNode(child) })  // recursive check

        let ret = false  // just use ret as an accumulator at each level
        node.children.forEach(child => {
            ret = ret || this.containsOpenNode(child)
        })
        // console.log(`containsOpenNode for ${node.buttonID} is ${ret ? 'true' : 'false'}`)
        return ret
    }



    addButton(parent: string | HTMLElement, child: treeNode) {
        child.buttonID = DOM.button(parent, child.label + ' ' + (bakeryDispenser + 1).toString(), child.color)

        // add the events we want for this button
        DOM.addObserver(child.buttonID, () => this.nodeIsClicked(child.buttonID))
        DOM.addObserver(child.buttonID, () => console.log('clicked on ', child.buttonID))
        DOM.addObserver(child.buttonID, () => child.callback)
        // console.log('should be lots of observers for ', child.buttonID)

    }

}

export function someMockFunction(payload: string) {
    console.log('payload', payload)
}

// leaving this here so that we can run a test tree easily
export function testTree(): void {

    let tree = new treeviewComponent('lesson', 'Root of Tree', 'primary')

    let child1 = tree.addTreeChild(tree.root, 'first child', 'info')
    tree.addTreeChild(child1, 'first grandchild', 'danger')
    tree.addTreeChild(child1, 'second grandchild', 'danger')

    let child2 = tree.addTreeChild(tree.root, 'second child', 'primary')
    let grandchild2 = tree.addTreeChild(child2, 'second child of second child', 'secondary')
    tree.addTreeChild(grandchild2, 'great grandchild', 'secondary')

    tree.renderTree()
}

