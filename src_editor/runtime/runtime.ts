import { ITag } from './T'
import { LessonToITags } from '../../src_builder/lessonToITags'
import { LessonPage } from '../runtime/lessonpage'
// import {mathcodeEditor} from './T'      // or webpack will ignore it



// Basic Run-Time Calls
// This example builds on the Simple Single SCO to demonstrate the proper use of the basic SCORM run-time data model elements. In this example:

// A JavaScript controller is added to handle navigation within the SCO.
// The controller bookmarks the learner’s current location. (cmi.location)
// The controller reports completion as the user progresses through the content. (cmi.completion_status)
// The controller reports success status and score based on the learner’s quiz results 
//     (cmi.success_status, cmi.score.scaled, cmi.score.raw, cmi.score, max and cmi.score.min).
// The controller will record the total time the learner spent in the training (cmi.session_time).
// The controller demonstrates options for exiting the course (cmi.exit and adl.nav.request)
// The manifest includes some basic sequencing information to override some counter-intuitive default values.




interface courseInfo {
    lessons: string[]
    lessonFiles: string[]
    version: string
    copyright: string
    contact: string
    licencedTo: string
    title: string
    launchPage: string
    discordInvite: string
    created: string
}


export class Runtime {

    // scormHost: object
    public lessonPage: LessonPage | null = null     // link to the lessonPage builder


    public courseInfo: courseInfo | undefined     // have to fetch it
    public lessons = new Map<string, ITag[]>()

    public editor: Editor    // setup the writer's editor


    constructor() {
        console.log('in class Runtime')
        this.courseInfo = undefined // until we load it

        // let t = new mathcodeEditor()   // just so webpack doesn't lose it
        // t.findme()

        let editorDiv = document.getElementById('tomseditor')! as HTMLTextAreaElement
        this.editor = new Editor(editorDiv)

        // this.paintWelcome()

    }


    async httpfetch<T>(fileURI: RequestInfo): Promise<T> {
        const response = await fetch(fileURI);
        const body = await response.json();
        return body;
    }




    async loadAllFiles() {
        console.log('in loadAllFiles')

        // first step - load the course info
        this.courseInfo = await this.httpfetch<courseInfo>("courseinfo.JSON");

        console.log('new lessoninfo', this.courseInfo)

        // now load ALL the course ITag files
        let lesson: ITag[]
        for (let i = 0; i < this.courseInfo.lessonFiles.length; i++) {
            let name = this.courseInfo.lessonFiles[i]
            console.log('fetching lesson ', name)
            const lessonInfo = await this.httpfetch<ITag[]>(name);
            this.lessons.set(name, lessonInfo)
            console.log(this.lessons.get(name))
        }

        // arrgggg..  spent a day trying to make this work, 
        // but all promises fire at the same time and I can't figure
        // how to use Promise.All ...

        // this.courseInfo.lessonFiles.forEach(async (name) => {
        //     const lessonInfo = await this.httpfetch<ITag[]>(name);
        // })
    }



    // async paintWelcome() {
    //     await this.loadAllFiles()

    //     console.log('all ITag files loaded')

    //     let firstLesson: ITag[] = this.lessons.values().next().value   // first lesson
    //      this.lessonPage = new LessonPage(firstLesson)
    // }




}









export async function serverFileSystem(serverURL: string, sendData: object): Promise<any> {

    try {
        console.log('posting in postData', JSON.stringify(sendData))

        // Default options are marked with *
        const response = await fetch(serverURL, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
            },
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // no-referrer, *client
            body: JSON.stringify(sendData), // body data type must match "Content-Type" header
        })
        return await response.json() // parses JSON response into native JavaScript objects

    } catch (error) {
        console.error('error in serverFileSystem')
    }

}





// a simple textarea editor, Grammerly does all the work
class Editor {

    initFile: string = ''   // the file we are editing
    isDebug: boolean = false
    tagCount = 0
    suggestName = ''

    // editorDiv: HTMLDivElement
    // editor: Editor
    save: HTMLButtonElement
    load: HTMLButtonElement
    run: HTMLButtonElement
    debug: HTMLButtonElement

    editorTag: HTMLTextAreaElement

    lessonPage: LessonPage

    constructor(editorTag: HTMLTextAreaElement) {
        this.editorTag = editorTag

        this.save = document.getElementById('save') as HTMLButtonElement
        this.load = document.getElementById('load') as HTMLButtonElement
        this.run = document.getElementById('run') as HTMLButtonElement
        this.debug = document.getElementById('debug') as HTMLButtonElement

        this.save.onclick = () => this.doSave();
        this.load.onclick = () => this.doLoad();
        this.run.onclick = () => {AJAXuploadContent(); this.doRun()};
        this.debug.onclick = () => this.doDebug();

        this.lessonPage = new LessonPage()

    }





    doSave() {

        console.log('in doSave ')
        let area = document.getElementById('tomseditor') as HTMLTextAreaElement
        let text = area.value
        let data = new Blob([text], { type: 'text/plain' });

        // If we are replacing a previously generated file we need to
        // manually revoke the object URL to avoid memory leaks.
        if (this.initFile) {
            window.URL.revokeObjectURL(this.initFile);
        }

        this.initFile = window.URL.createObjectURL(data);
        const a = document.createElement("a")
        a.download = this.suggestName  // can only suggest the LAST segment
        a.href = this.initFile
        a.dispatchEvent(new MouseEvent("click"));
    }


    // use the fileReader to grab a lesson and load it into the textarea
    doLoad() {
        const input = document.createElement("input");
        input.type = "file";
        input.onchange = () => {
            const fileReader = new FileReader();
            fileReader.onload = () => {
                let txt = fileReader.result as string
                let area = document.getElementById('tomseditor') as HTMLTextAreaElement
                area.value = txt
                document.getElementById('tomseditor')!.focus()  // make it the editing focus
                this.isDebug = false
                this.doRun()
            }
            fileReader.readAsText(input.files![0]);
        };
        input.click();
    }

    doRun() {
        let area = document.getElementById('tomseditor') as HTMLTextAreaElement
        console.log('doRun',area, area.value)

        // I can't see AJAXuploadContent from TS, but I can call it...
        eval('AJAXuploadContent();')

        let iTags = new LessonToITags().parse('../assets', area.value)
        // console.log('about to run iTags', iTags)
        this.lessonPage.load(iTags, this.isDebug)

        let moduleInfo = this.lessonPage.moduleInfo()
        // console.log('moduleInfo', moduleInfo)
        this.suggestName =
            moduleInfo.module.substr(0, 3) +
            moduleInfo.lesson.substr(0, 3) +
            moduleInfo.module.substr(3) + '.txt'
        let suggestName = document.getElementById('suggestName')
        if (suggestName !== null)
            suggestName.innerHTML = this.suggestName

    }

    doDebug() {
        this.isDebug = !this.isDebug
        this.doRun()
    }


    extractItagInfo(iTags: ITag[]) {
        this.tagCount = iTags.length
        let tagCount = document.getElementById('tagcount')
        if (tagCount !== null)
            tagCount.innerHTML = this.tagCount.toString()

        // suggest a name
        let moduleInfo = this.lessonPage.moduleInfo
        this.suggestName = moduleInfo().module.substr(0, 3) +
            moduleInfo().lesson.substr(0, 3) +
            moduleInfo().module.substr(4)
        let suggest = document.getElementById('suggestName')
        if (suggest !== null)
            suggest.innerHTML = this.suggestName

        this.extractItagInfo(iTags)



        let suggestedName = document.getElementById('suggestName')
        if (suggestedName !== null)
            suggestedName.innerHTML = 'SuggestedName'
    }

}








// interface Storage {
//   readonly attribute unsigned long length;
//   DOMString? key(unsigned long index);
//   getter DOMString? getItem(DOMString key);
//   setter void setItem(DOMString key, DOMString value);
//   deleter void removeItem(DOMString key);
//   void clear();
// };

// The getItem(key) method must return the current value associated with the given
// key. If the given key does not exist in the list associated with the object then
// this method must return null.
//
// The setItem(key, value) method must first check if a key/value pair with the
// given key already exists in the list associated with the object.
//
// The removeItem(key) method must cause the key/value pair with the given key to
// be removed from the list associated with the object, if it exists. If no item
// with that key exists, the method must do nothing.
//
// The setItem() and removeItem() methods must be atomic with respect to failure.
// In the case of failure, the method does nothing. That is, changes to the data
// storage area must either be successful, or the data storage area must not be
// changed at all.
//
// The clear() method must atomically cause the list associated with the object to
// be emptied of all key/value pairs, if there are any. If there are none, then the
// method must do nothing.

// class DataServer {
//     public cmd: string
//     public data: string
//     public callback: CallableFunction

//     constructor(cmd: string, data: string, callback: CallableFunction) {
//         this.cmd = cmd
//         this.data = data
//         this.callback = callback
//         $.ajax({
//             method: 'POST',
//             url: 'AJAX.php',
//             data: this.data,
//             success: (data) => {
//                 console.log('in DataServer success(', JSON.parse(data))
//                 this.result = data
//                 this.callback(this.result)
//             }
//         })
//     }
// }




////////////////// fetch api  ///////////////////

