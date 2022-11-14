type MouseDown = {
    e: any,
    offsetLeft: number,
    offsetTop: number,
    lessonWidth: number,
    editorWidth: number,
    canvasWidth: number,
    editorHeight: number,
    canvasHeight: number,
};




// A function is used for dragging and moving
export let mouseDown: MouseDown; // remember mouse down info

export function dragElement(element: HTMLElement, direction: 'H' | 'V') {
    console.log('dragElement', element, direction)


    element.onmousedown = (e: any) => {
        console.log("split: mouse down: " + e.clientX);
        let lesson = document.getElementById("lesson");
        let editor = document.getElementById("editor");
        let canvas = document.getElementById("canvas") as HTMLCanvasElement
        console.log('lesson, editor, canvas', lesson, editor, canvas)

        mouseDown = {
            e: e,
            offsetLeft: element.offsetLeft,
            offsetTop: element.offsetTop,
            lessonWidth: lesson.offsetWidth,
            editorWidth: editor.offsetWidth,
            canvasWidth: canvas.offsetWidth,
            editorHeight: editor.offsetHeight,
            canvasHeight: canvas.offsetHeight,
        };

        console.log('mouseDown', mouseDown)

        document.onmousemove = onMouseMove
        document.onmouseup = () => {
            console.log("mouse up")
            document.onmousemove = document.onmouseup = null;
        }
    }


    function onMouseMove(e: any) {
        // console.log("split: mouse move: " + e.clientX, direction);

        let delta = {
            x: e.clientX - mouseDown.e.clientX,
            y: e.clientY - mouseDown.e.clientY
        };

        // console.log('delta',delta)

        let lesson = document.getElementById("lesson");
        let editor = document.getElementById("editor");
        let canvas = document.getElementById("canvas") as HTMLCanvasElement

        if (direction === "H") // Horizontal
        {
            // Prevent negative-sized elements
            // console.log('MAX', delta.x, -mouseDown.lessonWidth, mouseDown.editorWidth)
            // delta.x = Math.min(Math.max(delta.x, -mouseDown.lessonWidth),
            //     mouseDown.editorWidth);

            // delta.x = Math.min(delta.x,mouseDown.editorWidth);

            // element.style.left = (mouseDown.offsetLeft + delta.x) + "px";
            lesson.style.width = (mouseDown.lessonWidth + delta.x) + "px";
            // editor.style.width = (mouseDown.editorWidth - delta.x) + "px";  // don't change
            canvas.style.width = (mouseDown.canvasWidth - delta.x) + "px";
        }
        if (direction === "V") // Vertical (between editor and canvas)
        {
            // Prevent negative-sized elements
            // delta.y = Math.min(Math.max(delta.y, -mouseDown.editorHeight),
            //     mouseDown.canvasHeight);

            element.style.left = mouseDown.offsetLeft + delta.y + "px";
            editor.style.height = (mouseDown.editorHeight + delta.y) + "px";
            canvas.style.height = (mouseDown.canvasHeight - delta.y) + "px";
        }

    }
}



