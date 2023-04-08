export module JXG{



type attributes = {
    // point
    name?: string
    size?: number
    face?: 'o' | '[]' | 'x' | '+' | '^' | 'v' | '>' | '<' | '<>'
    fixed?: boolean    // cannot be dragged  (also for lines)

    // line
    firstArrow?: boolean | object   // eg: {type:4 size:8}
    lastArrow?: boolean | object
    straightFirst?: boolean  // extend past first point
    straightLast?: boolean   // extend past last point
    strokeColor?: string
    strokeWidth?: number
    strokeColorOpacity?: number   // between 0 and 1
    dash?: number            // 0:solid, 1:dotted, 2-5: short,medium,long dashes
    highlightStrokeColor?: string  // for mouse-over
    traced?: boolean

    // polygon
    fillColor?: string

    // board
    boundingbox?: number[]
    axis?: boolean,
    showCopyright?: boolean   // LGPL and MIT, but still copyright
    showNavigation?: boolean
    showClearTraces?: boolean

    // arrow
    label?: object    // eg: {position:top}
    withLabel?: boolean

    // intersection
    trace?: boolean
    color?: string

    // slider
    snapWidth?: number

}



export type JSXElement = {
    X: () => number | number
    Y: () => number | number
    Value: () => number | number
    moveTo: (location: any, mSec?: number) => void
    L: () => number   // length
}

export type Board = {      // JSG.Board - manages properties of a board
    create(elementType: 'angle' | 'arc' | 'arrow' | 'axis' | 'bisector' |
    'button' | 'cardinalspline' | 'chart' | 'checkbox' | 'circle' |
    'circumcircle' | 'circumcirclearc' | 'circumcirclesector' | 'conic' |
    'curve' | 'curveddifference' | 'curveintersection' | 'curveunion' |
    'ellipse' | 'functiongraph' | 'glider' | 'grid' | 'group' |
    'hatch' | 'hyperbola' | 'image' | 'input' | 'integral' | 'intersection' |
    'line' | 'metapostspline' | 'midpoint' | 'mirrorelement' | 'normal' |
    'perpendicular' | 'plot' | 'point' | 'polygon' | 'polygonalchain' |
    'regularpolygon' | 'reflection' | 'riemannsum' | 'sector' | 'segment' | 'semicircle' |
    'slider' | 'slopetriangle' | 'stepfunction' | 'tangent' |
    'tapemeasure' | 'text' | 'ticks' | 'tracecurve' | 'transform' |
    'turtle',

        coordinates: any[], attributes?: attributes): JSXElement
    defaultAxes: any
}


declare namespace JXG {
    export class JSXGraph {
        static initBoard(HTML_ID: string, attributes: attributes): Board;
    }
    export class Options {
        static label: any
        static text: any
        static line: any
    }
    function addEvent(a:any,eventType:string,c:()=>void,d:any):any
}

////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////// everything up to here is just declarations /////////////////////////////////

// let board = JXG.JSXGraph.initBoard('box', { boundingbox: [-10, 10, 10, -10], axis: true })
// let p = board.create('point', [-3, 1]);
// let p2 = board.create('point', [3, 1], { name: 'X', size: 5 });

// // two points, A is draggable,  B.X is bound to A
// let a = board.create('point',[0,0], {name:'A', size:3})
// let b = board.create('point',[()=>a.X()/2, 1], {name:'B', face:'[]', size:3})
// let c = board.create('point',[3,3], {name:'C'})

// // note: a line through A and B can use either JSX names OR the variable names
// let l1 = board.create('line',["A","B"], {strokeColor:'#00ff00',strokeWidth:2})
// let l2 = board.create('line',[b,c], {straightFirst:true, straightLast:false, strokeWidth:2, dash:2});

// // a line from a to b, without defining points
// let l3 = board.create('line',[[-1,1],[2,-1]], {straightFirst:false, straightLast:false, strokeWidth:2,fixed:true})



// // function along x axis   [function, {startX, endX}]
// board.create('functiongraph', [(x:number)=> Math.sin(x),-Math.PI,4*Math.PI])

// // a dynamic graph using p.X to scale
// let p = board.create('point',[1,1],{size:4,name:'A'});
// board.create('functiongraph', [(x:number)=> p.X()*Math.sin(x)],{dash:1});



// let p1 = board.create('point',[0,0], {name:'A',size: 4, face: 'o'});
// let p2 = board.create('point',[2,-1], {name:'B',size: 4, face: 'o'});
// let p3 = board.create('point',[2,1], {name:'C',size: 4, face: 'o'});
// let line = board.create('line',[p1,p3])

// // a circle through "A" and "B"
// let c1 = board.create('circle',[p1,p2], {strokeColor:'#00ff00',strokeWidth:2});
// // a circle at "B" of radius 5
// let c2 = board.create('circle',[p2,5], {strokeColor:'#00ff00',strokeWidth:2});
// // a point and a line  (the first point of the line is the center, second defines radius)
// let c3 = board.create('circle',[p1,line], {strokeColor:'#00ff00',strokeWidth:2});




// JXG.Options.label.autoPosition = true;
// // JXG.Options.text.useMathJax = true;
// JXG.Options.text.fontSize = 20;

// let mathml: string = `<math display="block">
// <mrow>
//   <mi>x</mi>
//   <mo>+</mo>
//   <msup>
//     <mi>y</mi>
//     <mfrac>
//       <mn>2</mn>
//       <mrow>
//         <mi>k</mi>
//         <mo>+</mo>
//         <mn>1</mn>
//       </mrow>
//     </mfrac>
//   </msup>
// </mrow>
// </math>`


// var board = JXG.JSXGraph.initBoard("box", { boundingbox: [-5, 5, 5, -5], axis: true, showNavigation: false, showCopyright: false });

// var p = board.create('point', [-3,-3], {name:'p'});
// var q = board.create('point', [0, 2], {name:'q'});
// var r = board.create('point', [3, -3], {name:'r'});

// var pq = board.create('arrow', [p, q], {withLabel: true, name:mathml, label:{position: 'top', parse: false}, lastArrow: {type: 4, size: 8}});
// var qr = board.create('arrow', [q, r], {withLabel: true, name:'\\(\\vec{qr}\\)', label:{position: 'top'}, lastArrow: {type: 4, size: 8}});
// var pr = board.create('arrow', [p, r], {withLabel: true, name:'Fred', label:{position: 'top'}, lastArrow: {type: 4, size: 8}});






// // Orthogonal axis affinity


// JXG.Options.label.autoPosition = true;
// JXG.Options.text.fontSize = 16;
// JXG.Options.line.strokeWidth = 0.8;

// var board = JXG.JSXGraph.initBoard('box', { boundingbox: [-5, 5, 5, -5], axis: true, showClearTraces: true});

// var O = board.create('point', [0,0], {name: 'O', fixed: true});
// var k0 = board.create('circle', [O, 4], {fixed: true, strokeWidth: 0.8});
// var k1 = board.create('circle', [O, 2], {fixed: true, strokeWidth: 0.8});

// var B = board.create('glider', [2.65, 3, k0], {name: 'B'});
// var li = board.create('line', [O, B], {straightFirst: false});
// var g = board.create('parallel', [B, board.defaultAxes.x]);

// var P = board.create('intersection', [li, k1, 0], {name: 'P',  trace: true});
// var gs = board.create('parallel', [P, board.defaultAxes.y]);
// var X = board.create('intersection', [gs, board.defaultAxes.x, 0], {name: 'X'});
// var Ps = board.create('intersection', [gs, g, 0], {name: "P'", trace: true, color: 'blue'});

// var pol = board.create('polygon', [O, X, P, Ps, B], {fillColor: 'yellow'});

// JXG.Options.label.autoPosition = true;
// JXG.Options.text.fontSize = 16;
// JXG.Options.line.strokeWidth = 0.8;

// var board = JXG.JSXGraph.initBoard('box2', { boundingbox: [-5, 5, 5, -5], axis: false, showClearTraces: true});

// var g = board.create('line', [-4, -2, 4]);
// var q1 = board.create('glider', [-2, 2, g], {name: 'q_1'});
// var q2 = board.create('glider', [0, 1.5, g], {name: 'q_2'});
// var q3 = board.create('glider', [1, 2, g], {name: 'q_3'});
// var q4 = board.create('glider', [3, 2, g], {name: 'q_4'});
// var p = board.create('point', [2, 0], {name: 'p'});
// board.create('segment', [p, q1]);
// board.create('segment', [p, q2]);
// board.create('segment', [p, q3], {strokeColor: 'red'});
// board.create('segment', [p, q4]);



// // slider
// // start   //end   //values [start, initial, end]
// let s = board.create('slider', [[-4, 4], [0, 4], [0, 5, 15]], { name: 'S', snapWidth: 1 });
// // if we want the value, it's just s.Value()
// board.create('text', [-4, 3, () => 'n=' + s.Value()]);



// // Create a button element at position [1,2].
// let p = board.create('point', [0.5, 0.5]);
// let button1 = board.create('button', [1, 2, 'Change Y', function () {
//     p.moveTo([p.X(), p.Y() + 0.5], 500);
// }], {});




// // Create an arc (semicircle) out of three free points
// var p1 = board.create('point', [4.5, 2.0]);
// var p2 = board.create('point', [1.0, 0.5]);

// var a = board.create('semicircle', [p1, p2]);




// // Create a segment providing two points.
// var p1 = board.create('point', [4.0, 1.0]);
// var p2 = board.create('point', [1.0, 1.0]);
// var l1 = board.create('segment', [p1, p2]);
// var p3 = board.create('point', [4.0, 4.0]);
// var p4 = board.create('point', [1.0, 4.0]);
// var l2 = board.create('segment', [p3, p4, function(){ return l1.L();} ]);




// // Create a checkbox element at position [0,3].
// var checkbox = board.create('checkbox', [0, 3, 'Change Y'], {});
// var p = board.create('point', [
//     function(){ return 0.5;}, // X-coordinate
//     function() {
//         let y = 0.5;
//         if (checkbox.Value()) {
//             y += 0.5;
//         }
//         return y;
//     }]);

}