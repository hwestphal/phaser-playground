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
            let root = tree.getRootNode()
            expect(root.label).toEqual("Topic One")
            expect(root.children.length).toEqual(0)
        })

        it("add a node and try to get it back", function() {
            let root = tree.getRootNode()
            // mockSomething is a codeblock that could be 'render activity 123' or whatever
            let mockSomething = (str: string) => { return str }
            let newNode = tree.addTreeChild(root, 'first child', 'info', (str: string) => { mockSomething('42') })

            expect(root.children.length).toEqual(1)
            expect(root.children[0].label).toEqual('first child')
            expect(typeof root.children[0].callback == 'function')
            // expect(root.children[0].callback()).toEqual(42)

            // and just make sure the ID is right
            let newNodeID = newNode.buttonID
            expect(root.children[0].buttonID).toEqual(newNodeID)
        })

        it("tests whether we can find an open node", function() {

            let tree = new treeviewComponent('Tree', 'Root of Tree', 'primary')

            let child1 = tree.addTreeChild(tree.root, 'first child', 'info')
            let grandchild1 = tree.addTreeChild(child1, 'first grandchild', 'danger')
            let grandchild2 =tree.addTreeChild(child1, 'second grandchild', 'danger')

            let child2 = tree.addTreeChild(tree.root, 'second child', 'primary')
            let grandchild3 = tree.addTreeChild(child2, 'third grandchild of second child', 'secondary')
            let greatgrandchild3 = tree.addTreeChild(grandchild3, 'great grandchild of second child', 'secondary')

            expect(tree.containsOpenNode(tree.root)).toBe(false)
            expect(tree.containsOpenNode(child1)).toBe(false)
            expect(tree.containsOpenNode(grandchild1)).toBe(false)

            tree.openNode = tree.root  // root is true, leafs are false
            expect(tree.containsOpenNode(tree.root)).toBe(true)
            expect(tree.containsOpenNode(child1)).toBe(false)
            expect(tree.containsOpenNode(grandchild1)).toBe(false)

            tree.openNode = child1  // root is true, child1 is true
            expect(tree.containsOpenNode(tree.root)).toBe(true)
            expect(tree.containsOpenNode(child1)).toBe(true)
            expect(tree.containsOpenNode(grandchild1)).toBe(false)

            tree.openNode = grandchild1  // root is true, child1 is true
            expect(tree.containsOpenNode(tree.root)).toBe(true)
            expect(tree.containsOpenNode(child1)).toBe(true)
            expect(tree.containsOpenNode(grandchild1)).toBe(true)

            tree.openNode = grandchild2  // root is true, child1 is true
            expect(tree.containsOpenNode(tree.root)).toBe(true)
            expect(tree.containsOpenNode(child1)).toBe(true)
            expect(tree.containsOpenNode(grandchild1)).toBe(false)

            tree.openNode = grandchild3  // root is true, child1 is false
            expect(tree.containsOpenNode(tree.root)).toBe(true)
            expect(tree.containsOpenNode(child1)).toBe(false)
            expect(tree.containsOpenNode(grandchild1)).toBe(false)
            expect(tree.containsOpenNode(greatgrandchild3)).toBe(false)

            tree.openNode = greatgrandchild3  // root is true, child1 is false
            expect(tree.containsOpenNode(tree.root)).toBe(true)
            expect(tree.containsOpenNode(child1)).toBe(false)
            expect(tree.containsOpenNode(child2)).toBe(true)
            expect(tree.containsOpenNode(grandchild1)).toBe(false)
            expect(tree.containsOpenNode(grandchild2)).toBe(false)
            expect(tree.containsOpenNode(grandchild3)).toBe(true)

            ///// lets test getTreenodeByID with this data
            // looks goofy, but testing whether we can find a treenode by its buttonID
            expect(tree.getTreenodeByID(tree.root.buttonID).buttonID).toEqual(tree.root.buttonID)
            expect(tree.getTreenodeByID(child1.buttonID).buttonID).toEqual(child1.buttonID)
            expect(tree.getTreenodeByID(grandchild1.buttonID).buttonID).toEqual(grandchild1.buttonID)



        })


    })
