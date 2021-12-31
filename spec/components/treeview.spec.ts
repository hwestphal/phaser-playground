import { treeviewComponent } from '../../src/components/treeview'
import { JSDOM } from 'jsdom'
import { DOM } from '../../src/DOM'



describe("Create a tree and try some simple manipulations",
    function() {

        let htmlString = `<html><body><div id="Tree"></div></body></html>`
        const dom = new JSDOM();
        document.body.innerHTML = htmlString

        let someTicket = DOM.bakeryTicket()  // don't know what it is
        let tree: treeviewComponent

        it("create a root and retrieve it", function() {
            tree = new treeviewComponent('Tree', 'Topic One')
            expect(window.document.getElementById("Tree").textContent).toEqual("")

            let root = tree.getRootNode()
            expect(root.label).toEqual("Topic One")
            expect(root.buttonID).toEqual(someTicket + 1)  // whatever it was, plus 1
            expect(root.children.length).toEqual(0)
        }),

            it("add a node and try to get it back", function() {
                let root = tree.getRootNode()
                // mockSomething is a codeblock that could be 'render activity 123' or whatever
                let mockSomething = (str:string) => {return str }
                let newNode = tree.addChild(root, 'first child', 'mockPayload', 'info', (str:string)=>{mockSomething('42')})

                expect(root.children.length).toEqual(1)
                expect(root.children[0].label).toEqual('first child')
                expect(typeof root.children[0].callback == 'function')
                // expect(root.children[0].callback()).toEqual(42)

                // and just make sure the ID is right
                let newNodeID = newNode.buttonID
                expect(root.children[0].buttonID).toEqual(newNodeID)


            })


    })
