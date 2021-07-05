

// interface ILesson {     // the actual meaning of values and strings
//     values: number[],   // depends on the specific lesson
//     texts: string[]
// }

// // function LessonFactory(values: number[], texts: string[]): ILesson {  return ({ values, texts })}




// // interface ILessonBlock {
// //     title: string
// //     prerequisite: ILessonBlock | null

// //     conceptual: ILesson | null // comprehension of mathematical concepts, operations, and relations
// //     procedural: ILesson | null // skill in carrying out procedures flexibly, accurately, efficiently, and appropriately
// //     strategic: ILesson | null // ability to formulate, represent, and solve mathematical problems
// //     adaptive: ILesson | null // capacity for logical thought, reflection, explanation, and justification
// //     productive: ILesson | null // habitual inclination to see math as sensible, useful, and worthwhile, + belief in diligence and one’s own efficacy.
// // }



// // // utility function for creating ILessonBlocks
// // export function LessonBlockFactory(lessonTitle: string): ILessonBlock {  // returns an ILessonBlock
// //     let ILB = {
// //         title: lessonTitle,
// //         prerequisite: null,
// //         conceptual: null,
// //         procedural: null,
// //         strategic: null,
// //         adaptive: null,
// //         productive: null,
// //     }
// //     return (ILB)
// // }



// // utility function for creating ILessonss
// export function LessonFactory(pvalues: number[], ptexts: string[] = []): ILesson {
//     let IL = {
//         values: pvalues,
//         texts: ptexts,
//     }
//     return (IL)
// }

// export function drillMathDispatch(canvasId: string, lesson: ILesson, drillName: string) {

//     let s: any
//     switch (drillName) {
//         case 'SimpleMultiply':
//             s = new SimpleMultiply(canvasId, lesson); break
//         default:
//             console.error(`could not find drill ${drillName}, did you misspell?`)
//     }
//     return (s)  // returns the concrete instance we want

// }

// abstract class DrillMath {
//     public canvasId: string
//     public model: ILesson

//     constructor(canvasId: string, lesson: ILesson) {
//         this.canvasId = canvasId
//     }

//     randomInt(min: number, max: number) {
//         console.assert(max > min, "max should be greater than min")
//         if (max > min) {
//             return (min + Math.round(Math.random() * (max - min)))
//         }
//     }
// }

// export class SimpleMultiply extends DrillMath {

//     constructor(canvasId: string, lesson: ILesson) {
//         super(canvasId, lesson)
//     }


//     // if not cumulative, then only drill number
//     * generator(cumulative) {
//         let v1 = this.model[0]   // eg 6 x
//         let v2 = this.randomInt(0, v1)
//         if (cumulative) { v1 = this.randomInt(v1, v2) }
//         console.log('multiply', v1, v2)
//         yield LessonFactory([v1, v2])

//     }

//     renderQuestion(quiz: ILesson) {
//         console.log('renderQuestion', quiz)

//         // Make an instance of two and place it on the page.
//         // var elem = document.getElementById('draw-shapes');
//         // var params = { width: 285, height: 200 };
//         // var two = new Two(params).appendTo(elem);

//         let canvas = document.getElementById(this.canvasId)
//         let cWidth = 1000  // TODO define somewhere
//         let cHeight = 200

//         let two = new Two({
//             fullscreen: false,
//             autostart: true,
//             width: cWidth,    // define somewhere
//             height: cHeight,
//         }).appendTo(canvas)


//     }

// }


// function Two(params:Object){console.error('where is Two?')}        // need to add this

// function getRandomColor() {
//     return 'rgb('
//         + Math.floor(Math.random() * 255) + ','
//         + Math.floor(Math.random() * 255) + ','
//         + Math.floor(Math.random() * 255) + ')'
// }
