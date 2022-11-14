export function testMindMap() {
    let sourceCode =
`- Test MindMap
  - Test2 Start with Programming
   - Hello World, Three Ways
   - JavaScript and TypeScript
   - Variables, Strings, Comments
   - Numbers and Arithmetic
   - Booleans and Conditions
   - Loops and Blocks
  - Pong with VT52 Graphics
   - Quick Review of JS
   - Bouncing
   - Functions
   - Animation
   - Moving the Pong Paddle
   - Keeping Score
   - Adding Sounds
   - Pong !
  - Flappy Birds
   - Scrolling
   - Random Numbers
   - Finish the Game Yourself
  - Finding Prime Numbers
   - Array Basics
   - Breakout
   - The Sieve of Eratosthenes
   - Mutability
   - Arrays of Arrays
   - Sorting an Array
   - Factors, Prime Factors, LCM
  - Space Invaders
   - Object Basics
   - Different Invaders, Same Code
   - Looping Down the Screen
   - Adding a Cannon
   - Sounds and Scoreboard
   - Review, What Comes Next
  - Scratchpad for old Steps
   - Scratchpad for old Paragraphs
  - Snake Game
   - Write a Snake Game
  - Towers of Hanoi
 - `;

    // let items = parseList(sourceCode)
    console.log('%cTESTING mindmap', 'background-color:yellow;', sourceCode, 'canvas')

    let pm = new mindmap(sourceCode, 'canvas')
    pm.drawMindMap()
}





let fontFamily = "Open Sans";

let labelPaddingBottom = 8;
let labelPaddingRight = 10;

let DEBUG = false;

let textFilter = { label: 'Text Filter (regex)', type: 'text', val: "." }
let fontSize = { label: "Font size", model: "fontSize", min: 5, max: 50, val: 16 }
let connectorWidth = { label: 'Connector width', model: "connectorWidth", min: 20, max: 100, val: 80 }
let connectorSteepness = { label: 'Connector steepness', min: 0.1, max: 1, step: 0.01, val: 0.7 }
let connectorLineWidth = { label: 'Line width', min: 0.5, max: 10, step: 0.25, val: 2.0 }
let nodeMarginTop = { label: ' Top margin', min: 0, max: 50, val: 0 }
let nodeMarginBottom = { label: ' Bottom margin', min: 0, max: 50, val: 0 }
let useGrayscale = { label: 'Use grayscale', type: 'boolean', val: false }


let canvas: HTMLCanvasElement
let ctx: CanvasRenderingContext2D


type item = {
    'label': string,
    'children': item[],
    'parent': item | null,
    'depth': number,
}


class TreeNode {

    label: string
    labelLines: string[]
    isRoot: boolean
    parent: TreeNode | null
    children: TreeNode[]
    depth: number
    labelWidth: number
    anchorPoint: [x: number, y: number]

    // these are local to this TreeNode
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D


    constructor(label: string, isRoot = false, depth = 0) {
        this.label = label;
        this.labelLines = this.label.split("\n");
        this.isRoot = isRoot;
        this.parent = null;
        this.children = [];
        this.depth = depth
        this.labelWidth = 100
        this.anchorPoint = [0, 0]

        this.canvas = document.createElement("canvas")
        this.ctx = this.canvas.getContext("2d")!

    }

    get isLeaf() {
        return this.children.length == 0;
    }

    addChild(child: TreeNode) {
        child.parent = new TreeNode(this.label) //itemFactory(this.label,this.parent,this.children,0);  //TODO: not 0, but what?
        this.children.push(child);
        // console.log('addChild', child)
    }

    addChildren(...children: TreeNode[]) {
        for (let child of children) {
            this.addChild(child);
        }
    }

    draw(currentBranchColor: string = 'blue') {


        // The width of the label will be the width of the widest line
        this.ctx.font = fontSize.val + "px " + fontFamily;

        // The height of the lines of text (only)
        let textHeight = fontSize.val * (this.labelLines.length);

        // The height of the text + the separation from the line + the line height + the label margin
        let composedHeight = textHeight + labelPaddingBottom + connectorLineWidth.val;

        // The composed height plus the margin
        let paddedHeight = composedHeight + nodeMarginTop.val;

        let labelHeight =
            nodeMarginTop.val +                           // top margin
            fontSize.val * (this.labelLines.length + 1) + // text lines' height
            nodeMarginBottom.val                          // bottom margin
            ;

        let labelWidth = Math.ceil(Math.max(...this.labelLines.map(c => this.ctx.measureText(c).width)));

        // The anchorPoint defines where the line should start

        if (this.isLeaf) {
            // Resize the canvas
            this.canvas.width = labelWidth + labelPaddingRight * 2;
            this.canvas.height = labelHeight;

            // Set the font
            this.ctx.font = fontSize.val + "px " + fontFamily;

            // Draw the text lines
            for (let i = 0; i < this.labelLines.length; i++) {
                this.ctx.fillText(this.labelLines[i], 0, fontSize.val * (i + 1) + nodeMarginTop.val);
            }

            // The anchorPoint defines where the line should start
            this.anchorPoint = [0, (this.labelLines.length * fontSize.val) + labelPaddingBottom + nodeMarginTop.val]
        }

        else {

            let canvases: HTMLCanvasElement[]
            let branchColors: string[] = []


            // If this is the root, we need to generate a random color for each branch
            if (this.isRoot) {
                branchColors = this.children.map(c => generateRandomColor(useGrayscale.val));
                canvases = this.children.map((c, i) => c.draw(branchColors[i]));
            }

            // Otherwise, use the received branchColor
            else {
                canvases = this.children.map((c, i) => c.draw(currentBranchColor));
            }

            // Get the vertical positions for the children
            let childrenVerticalPositions = [0];

            // Each position is the sum of the acumulated heights of the previous elements
            for (let i = 0; i < canvases.length; i++) {
                childrenVerticalPositions[i + 1] = childrenVerticalPositions[i] + canvases[i].height;
            }

            let childrenHeight = childrenVerticalPositions[canvases.length];

            this.anchorPoint = [this.isRoot ? 10 : 0, 0];

            /*
             If the height of the children is smaller than the height of the node, take the height of the node and
             don't center it vertically.
             Otherwise, take the max between 2*height of the node and the children height, and center it vertically.
             */

            if (childrenHeight < composedHeight + nodeMarginTop.val * 2) {
                this.canvas.height = composedHeight + nodeMarginTop.val * 2;
                this.anchorPoint[1] = this.canvas.height / 2 + composedHeight / 2;
            }
            else {
                this.canvas.height = Math.max(childrenVerticalPositions[canvases.length], composedHeight * 2);
                this.anchorPoint[1] = this.canvas.height / 2;
            }

            // console.log(this.label, canvas.height, childrenVerticalPositions[canvases.length]);

            // Compute left margin (label width + separation)
            let leftMargin = 10 + labelWidth + connectorWidth.val;

            // Set the width to the leftMargin plus the width of the widest child branch
            this.canvas.width = leftMargin + Math.max(...canvases.map(c => c.width));
            this.ctx.font = fontSize.val + "px " + fontFamily;


            // Draw each child
            for (let i = 0; i < canvases.length; i++) {
                if (this.isRoot) {
                    currentBranchColor = branchColors[i]
                }

                this.ctx.drawImage(canvases[i], leftMargin, childrenVerticalPositions[i]);

                let connector_a = {
                    x: this.anchorPoint[0] + this.labelWidth + labelPaddingRight,
                    y: this.anchorPoint[1]
                };

                let connector_b = {
                    x: leftMargin,
                    y: childrenVerticalPositions[i] + this.children[i].anchorPoint[1]
                };

                this.ctx.beginPath();
                this.ctx.moveTo(connector_a.x, connector_a.y);

                this.ctx.bezierCurveTo(
                    connector_a.x + connectorSteepness.val * connectorWidth.val, connector_a.y,
                    connector_b.x - connectorSteepness.val * connectorWidth.val, connector_b.y,
                    connector_b.x, connector_b.y
                );

                this.ctx.lineTo(
                    connector_b.x + this.children[i].labelWidth + labelPaddingRight,
                    connector_b.y
                );
                this.ctx.lineWidth = connectorLineWidth.val;
                this.ctx.lineCap = "round";
                this.ctx.strokeStyle = currentBranchColor;
                this.ctx.stroke();
            }


            // For the root node, print a containing rectangle and always center the text
            if (this.isRoot) {
                this.ctx.fillStyle = "#ffffff";
                this.ctx.lineWidth = 3;
                roundRect(this.ctx,
                    2, this.canvas.height / 2 - (this.labelLines.length) * fontSize.val,
                    this.labelWidth + 18, fontSize.val * (this.labelLines.length + 1.5),
                    5, true, true);

                this.ctx.fillStyle = "#000000";

                for (let i = 0; i < this.labelLines.length; i++) {
                    this.ctx.fillText(
                        this.labelLines[i],
                        10,                                             // Fixed margin from the left
                        this.canvas.height / 2                          // Vertical center
                        + fontSize.val / 2                                  // Middle of the line height
                        - fontSize.val * (this.labelLines.length - i - 1)   // Correctly account for multilines
                    );
                }
            }

            else {
                this.ctx.fillStyle = "#000000";

                for (let i = 0; i < this.labelLines.length; i++) {
                    this.ctx.fillText(
                        this.labelLines[i],
                        10,                                             // Fixed margin from the left
                        this.anchorPoint[1]     // From the anchor point
                        - labelPaddingBottom   // Move up the padding
                        - fontSize.val * (this.labelLines.length - i - 1)
                    );
                }
            }
        }


        return this.canvas;
    }
}



export class mindmap {

    sourceCode: string
    canvasID: string

    constructor(sourceCode: string, canvasID: string = 'canvas') {
        this.sourceCode = sourceCode
        this.canvasID = canvasID
    }

    drawMindMap() {
        let parsed: item[]

        try {
            parsed = parseList(this.sourceCode);
        } catch (err) {
            console.log("Woops! Error parsing");

            return;
        }

        if (parsed.length == 0) return;
        let parsedRoot = parsed[0];

        let currentTree = this.parseObjectBranch(parsed[0], true);
        currentTree = currentTree.children[0]
        currentTree.isRoot = true;
        // console.log('currentTree', currentTree)
        this.regenerateDiagram(currentTree);
    }



    parseObjectBranch(branch: item, isRoot = false) {
        var node = new TreeNode(branch.label, isRoot);

        for (var child of branch.children) {
            // if (textFilter.test(child.label)) {
            node.addChild(this.parseObjectBranch(child, false));
            // }
        }

        return node;
    }

    regenerateDiagram(currentTree: TreeNode) {
        let canvas = document.getElementById(this.canvasID) as HTMLCanvasElement
        if (canvas) {
            let ctx = canvas.getContext("2d");
            if (ctx == undefined || ctx == null) {
                console.error('no CTX for ' + this.canvasID)
            } else {

                // Draw the map
                let beautifulDrawing = currentTree.draw();

                // Resize canvas to the size of the map plus some margin
                canvas.width = 2000 //beautifulDrawing.width + 25;
                canvas.height = beautifulDrawing.height + 25;

                console.log("Canvas", canvas.width, canvas.height);

                // Draw the map onto the existing canvas
                ctx.drawImage(beautifulDrawing, 25, 25);

            }
        }
        else
            console.error('no Canvas: ' + this.canvasID)
    }
}





function parseList(text: string): item[] {

    // set up the items list with a root
    let items: TreeNode[] = []

    items.push(new TreeNode('ROOT', true, -1))

    let currentParent = items[0] // | null = items[0];
    let currentParentDepth = -1;
    let currentItemLabel = "";
    let currentItemDepth = 0;

    let lines = text.split("\n");
    lines = lines.filter(c => !c.match(/^\s*$/)); // Remove blank lines

    // console.log('lines',lines)

    for (let line of lines) {
        let itemMatch = line.match(/^( *)-\s*(.*)$/);

        // console.log('itemMatch',itemMatch)

        // New item
        if (itemMatch) {
            // Store previous item (if any)
            // console.log('currentItemLabel',currentItemLabel)
            if (currentItemLabel != "") {

                // Build the node for the previously read node
                let node = new TreeNode(currentItemLabel, true, currentItemDepth)
                node.parent = currentParent

                // Store the node within its parent
                currentParent.children.push(node);

                // console.log('currentParent after push',currentParent)

                // Set the new "parent" to the previous item
                currentParent = node;
                currentParentDepth = node.depth
            }

            // Fetch the data from the newly-read item
            currentItemDepth = itemMatch[1].length;
            currentItemLabel = itemMatch[2];

            // If the parent is deeper than the new item, switch the parent
            // to one with lower depth than current item
            while (currentItemDepth <= currentParentDepth) {

                currentParent = currentParent.parent || currentParent  // up as high as we can
                currentParentDepth = currentParent.depth
            }

        }
        // Continued string from previous item
        else {
            currentItemLabel += "\n" + line;
        }
    }

    // Force insert last item
    if (currentItemLabel) {

        let newNode = new TreeNode(currentItemLabel, false, currentParentDepth + 1)
        newNode.parent = currentParent

        currentParent['children'].push(newNode)

    }

    console.log('parseList', items)
    return items;
}




////////////////////////////////////////////////
/// some utilities

/**
 * Draws a rounded rectangle using the current state of the canvas.
 * If you omit the last three params, it will draw a rectangle
 * outline with a 5 pixel border radius
 * @param {CanvasRenderingContext2D} ctx
 * @param {Number} x The top left x coordinate
 * @param {Number} y The top left y coordinate
 * @param {Number} width The width of the rectangle
 * @param {Number} height The height of the rectangle
 * @param {Number} [radius = 5] The corner radius; It can also be an object
 *                 to specify different radii for corners
 * @param {Number} [radius.tl = 0] Top left
 * @param {Number} [radius.tr = 0] Top right
 * @param {Number} [radius.br = 0] Bottom right
 * @param {Number} [radius.bl = 0] Bottom left
 * @param {Boolean} [fill = false] Whether to fill the rectangle.
 * @param {Boolean} [stroke = true] Whether to stroke the rectangle.
 */
function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radiusX: number = .5, fill: boolean = true, stroke: boolean = true) {
    let radius = { tl: radiusX, tr: radiusX, br: radiusX, bl: radiusX };

    var defaultRadius = { tl: 0, tr: 0, br: 0, bl: 0 }

    radius.tl = radius.tl || defaultRadius.tl
    radius.tr = radius.tr || defaultRadius.tr
    radius.bl = radius.bl || defaultRadius.bl
    radius.br = radius.br || defaultRadius.br


    ctx.beginPath();
    ctx.moveTo(x + radius.tl, y);
    ctx.lineTo(x + width - radius.tr, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
    ctx.lineTo(x + width, y + height - radius.br);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
    ctx.lineTo(x + radius.bl, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
    ctx.lineTo(x, y + radius.tl);
    ctx.quadraticCurveTo(x, y, x + radius.tl, y);
    ctx.closePath();
    if (fill) {
        ctx.fill();
    }
    if (stroke) {
        ctx.stroke();
    }
}

function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + min;
}


function componentToHex(c: number) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r: number, g: number, b: number) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function generateRandomColor(useGrayscale: boolean) {

    var baseColor = [256, 256, 256];
    var red = getRandomInt(0, 256);
    var green = getRandomInt(0, 256);
    var blue = getRandomInt(0, 256);

    // mix the color

    var mixture = 0.7;

    red = Math.round(red * mixture + baseColor[0] * (1 - mixture));
    green = Math.round(green * mixture + baseColor[1] * (1 - mixture));
    blue = Math.round(blue * mixture + baseColor[2] * (1 - mixture));

    if (useGrayscale) {
        return rgbToHex(red, red, red);
    }
    else {
        return rgbToHex(red, green, blue);
    }
}

function getLoremIpsum(numWords = 5) {
    var baseText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus gravida eu leo vitae imperdiet. Nam pulvinar luctus arcu, vel semper ligula efficitur in. Mauris non semper ante. Nullam scelerisque hendrerit urna, lacinia egestas enim laoreet vitae. Aliquam erat volutpat. Duis posuere magna libero, vel rhoncus nisl ullamcorper eu. Etiam ac libero consectetur, congue nisi quis, vulputate erat.";
    var sentences = baseText.split(".");
    var sentences_words = sentences.map(s => s.split(/[\s\.,]/));

    var chosenSentenceNumber = getRandomInt(0, sentences.length - 1);
    var chosenWords = sentences_words[chosenSentenceNumber].slice(0, numWords).join(" ");

    return chosenWords;
}
