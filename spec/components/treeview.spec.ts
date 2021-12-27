import {treeviewComponent} from '../../src/components/treeview'
import { JSDOM } from 'jsdom'


describe("Create a tree and try to get it back",
    function() {
        it("create a root and retrieve it", function() {
            let htmlString=`<!DOCTYPE html><body><div id="Tree"></div></body></html>`
            window.document.body.innerHTML =htmlString
            const dom = new JSDOM();
            expect(window.document.getElementById("Tree").textContent).toEqual("")

            let tree = new treeviewComponent('Tree','Topic One',1)
            let getTree = tree.getNodeByID(1)

            expect(getTree.label).toEqual('Topic One')
        });
    })
