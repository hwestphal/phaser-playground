//const monaco = window.monaco
import { ITag } from './T'

// import *  as ts from 'typescript'
// import { drillByName } from './canvas'
import { OnClickSay } from './onClickSay'
// import { EditorInstance } from './editorInstance'
// import { LessonFactory, drillMathDispatch } from './drillMath'
import *  as Prism from 'prismjs'
import { config } from './T'

import { asciiMath, testAsciiMath } from './ASCIIMathML'





type utterance = {
    id: string,   // 'utter015' or similar
    text: string,
}
let utterances: utterance[] = []

type codeString = {
    copyID: string   // 'copy019' or similar
    runID: string    // 'run019' or similar
    code: string
}
let codeStrings: codeString[] = []



export type moduleInfo = {
    module: string,     // name of the module we are working on
    lesson: string,
    shortDesc: string
}
let moduleInfo: moduleInfo = { module: '', lesson: '', shortDesc: '' }



export class LessonPage {

    onClickSay: OnClickSay


    constructor() {
        // console.log('In LessonPage')

        testAsciiMath()
        // initialize the voices
        this.onClickSay = new OnClickSay()

    }

    onClickCopy(link: string) { alert('copy to editor...   ' + link) }
    onClickRun(link: string) { alert('run in canvas...   ' + link) }



    /** clear out any existing stuff in the document */
    clear() {
        // clear the existing lesson space
        let existing = document.getElementById('lesson')
        if (existing !== null)
            existing.innerHTML = ''

        utterances = []
        codeStrings = []

    }
    load(sections: ITag[], debug = false) {

        this.clear() // start by erasing


        let previousWasP = false        // we need to accumulate <p>'s together

        console.assert(sections.length > 0, "Didn't get any sections")
        let s = new SectionP(sections[0])




        // cycle through the ITags, creating a section for each one
        sections.forEach((section) => {

            if ('h1' in section.params || 'h2' in section.params || 'h3' in section.params) {
                // console.log('FFOUND', section.tag)
                if (previousWasP) {
                    // console.log('PPROCESSED')
                    s.finalAttachToDiv()
                    previousWasP = false

                }

            }




            if (debug) {
                new SectionDebug(section)   // don't save in 's
            }

            // close off multiple linked <p> if necessary
            if (section.tag !== 'p' && previousWasP) {
                s.finalAttachToDiv()
                previousWasP = false
            }


            switch (section.tag) {

                case 'key':         // we don't process these, they are meta for the table of contents
                    break


                case 'p':
                    // this is a bit trickier than the others
                    // <p> get grouped together in a single <DIV>.  so we offer 
                    // a method that adds a single <P> paragraph and another that closes the <DIV>

                    if (!previousWasP) {    // previous was something else, so opening a new block of <p>
                        s = new SectionP(section)
                    }
                    s.addSingleParagraph(section)
                    previousWasP = true     // next time through this will be true
                    break

                case 'code':
                    new SectionCode(section)
                    break
                case 'module':
                    new SectionModule(section)
                    break
                case 'lesson':
                    new SectionLesson(section)
                    break
                case 'shortdesc':
                    new SectionShortDesc(section)
                    break

                case 'youtube':
                    new SectionYouTube(section)
                    break

                case 'run':
                    break

                case 'title':
                case 'subtitle':
                case 'section':
                    new SectionTitle(section)
                    break

                case 'break':       // or in case we want to do something later
                    break

                case 'asciimath':
                    new SectionAsciiMath(section)
                    break

                case 'youtube':
                    new SectionYouTube(section)
                    break


                case 'drill':
                    new SectionDrill(section)
                    break

                default:
                    new SectionMystery(section)
                    break

                // console.error(section.tag)
            }
        })

        if (previousWasP && s !== null)        // may need to close off the last <p>
            s.finalAttachToDiv()


        // generate the 'on click' events we need    
        this.createLinks()


        // scroll up to the top of the page - only do this in production
        // window.scrollTo({ top: 0 })
    }


    createLinks() {

        // all sections loaded.  now clean up and attach the on-click events
        // to utterances and code editors


        // clean up some of the utterances
        // substitution list to improve voices
        let subs = [
            // { from: 'JavaScript', to: '[Javascript|JavvaScript]' },
            { from: '\`console.log()\`', to: '[\`console.log()\`|console dot log]' },
        ]

        utterances.forEach(utterance => {
            for (let sub of subs) {     // anything in the substitution list
                while (true) {
                    let n = utterance.text.indexOf(sub.from)
                    if (n === -1) { break }  // might have multiples (this may be several paragraphs)
                    utterance.text = utterance.text.slice(0, n) + sub.to + utterance.text.slice(n + sub.from.length)
                }
            }
            let element = document.getElementById(utterance.id)
            // console.log('attaching to ', utterance.id,utterance.text)
            if (element !== null)
                element.onclick = () => { this.onClickSay.onClickSay(utterance.text) }
        })

        codeStrings.forEach(codeStr => {
            // first the copy element
            let copyElement = document.getElementById(codeStr.copyID)
            if (copyElement === null) {
                console.error(`No tag "${codeStr.copyID}`)

            } else {
                copyElement.onclick = () => { this.onClickCopy(codeStr.copyID) }
            }

            // then the run element
            let runElement = document.getElementById(codeStr.runID)
            if (runElement === null) {
                console.error(`No tag "${codeStr.runID}`)

            } else {
                runElement.onclick = () => { this.onClickCopy(codeStr.copyID) }
            }
        })

    }


    moduleInfo(): moduleInfo {        //  function: type returns object 
        return moduleInfo
    }
}


///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////

let halfMonacoWidth = 800   // always.  if you change, then also change the css file (.halfMonaco)
let bakeryTicket: number = 0

interface IAttribute { name: string, value: string }



/** abstract class for adding lesson sections.  use concrete class like sectionVT52 */
abstract class LessonSections {
    public tkt: number  // bakery ticket for this section
    public sectionName: string // 'sect004' or similar
    public editor: any // used by monaco editor

    constructor(tag: ITag) {
        this.tkt = bakeryTicket++       // unique bakery ticket
        this.sectionName = this.divName('sect', this.tkt)
    }

    /** format a class or id into something like 'sect005' */
    divName(prefix: string, tkt: number) {
        return (prefix + ("00" + tkt).slice(-3))   // prefix + 3-digit tkt
    }

    /** create a new node  */
    node(newElement: string, content: string | HTMLElement, newId: string = '', className: string = '', attributes: IAttribute[] = []): HTMLElement {
        let node: HTMLElement = document.createElement(newElement)
        if (className.length > 0) { node.className = className }
        if (typeof content === 'string' && content.length > 0) { node.innerHTML = content }
        if (newId.length > 0) { node.id = newId }
        // paste in any attributes...
        attributes.forEach((element) => {   // can be a string or an array
            // console.log('typeof element', typeof element)
            node.setAttribute(element.name, element.value)
        })
        // console.log('node', node)
        return (node)
    }

    /** attach node to existing ID */
    attach(existingId: string, pContent: string, pId: string, pClassName: string, aNode: HTMLElement[]) {
        let tag = document.getElementById(existingId)
        if (tag === null) {
            console.error(`No tag "${existingId}`)
        } else {
            // always wrap the new elements in a <div></div>
            let pElement = document.createElement('DIV')
            if (pClassName.length > 0) { pElement.className = pClassName }
            if (pContent.length > 0) { pElement.innerHTML = pContent }
            if (pId.length > 0) { pElement.id = pId }
            let pTag = tag.appendChild(pElement)

            // now if there are any elements to put below (perhaps div's)
            aNode.forEach((element) => {   // can be a string or an array
                // console.log('typeof element', typeof element)
                pTag.appendChild(element)  // inside the <p></p>
            })
        }
    }


    /** set up basic parent/left/right divs, with specific class */
    basicLeftRight(thisSectionID: string, parentClassName: string, leftClassName: string, rightClassName: string) {

        let section = this.divName("sect", this.tkt)
        let left = this.divName("left", this.tkt)
        let right = this.divName("right", this.tkt)

        this.attach('lesson', '', parentClassName, section, [
            this.node('DIV', '', left, leftClassName),
            this.node('DIV', '', right, rightClassName),
        ])

    }

}

class SectionModule extends LessonSections {     // paints the menubar at the top

    constructor(section: ITag) {
        super(section)

        // retrieve the information about the user
        let userID = sessionStorage.getItem('id')
        let userName = sessionStorage.getItem('name')
        let userUserName = sessionStorage.getItem('username')
        let userLevel = sessionStorage.getItem('level')
        let userRole = sessionStorage.getItem('role')
        let userTeacherID = sessionStorage.getItem('teacherID')
        let userSchoolID = sessionStorage.getItem('schoolID')


        let user3d = sessionStorage.getItem('3d')
        let user3dDist = sessionStorage.getItem('3dDist')
        let userJoomla = sessionStorage.getItem('Joomla')
        let userCodePath = sessionStorage.getItem('3dCodePath')

        moduleInfo.module = section.textvalue  // save

        // temporary until we link to Joomla
        user3d = 'http://localhost/3d'

        let HTML = ''

        // put up our logo    
        HTML += `<div class='header'><b>GameCode&nbsp;&nbsp;</b><br><img style="height:70px;" src = "${config.assetURI}/images/logo.png"> </a></div>`


        // always have a home button
        HTML += `<div class='header'>
                <a href="${user3d}"> <img height="20px" width = "20px" src = "${config.assetURI}/images/home.png" data - toggle="tooltip" title = "Home" ></a> 
                <br>
                <a href="${user3d}"><img height=\"20px\" width=\"20px\" src=\"${config.assetURI}/images/shutdown.png\" data-toggle=\"tooltip\" title=\"Logout\" ></a>
                <br>
                <a href="${user3d}"><img height=\"20px\" width=\"20px\" src=\"${config.assetURI}/images/about.png\" data-toggle=\"tooltip\" title=\"About\" ></a>
                </div>`


        // show the current lesson
        HTML += `<div class='header'>

                <button class="greenbutton" > ${section.textvalue} </button>
                <br>
                <form class = "greenbutton" action="/action_page.php">
                        <select name="cars" id="cars">
                            <option value="volvo">Introducion</option>
                            <option value="opel">Basic Javascript</option>
                            <option value="saab">Multiply Game</option>
                        </select>
                </form>
        
            </div>`


        // add a link to SLACK or DISCORD        
        HTML += `<div class='header'><b>.. for help</b><br>`
        if (config.helpline == 'Slack') {
            HTML += `<a href = "https://communityreading.slack.com" target = "_blank" >
                        <img style="height:30px" src = "${config.assetURI}/images/slack.png"> </a>`
        } else {    // Discord
            HTML += `<a href = "https://communityreading.discord.com" target = "_blank" >
                    <img style="height:30px;" src = "${config.assetURI}/images/discord.png"> </a>`
        }

        HTML += `<br><a href="https://communityreading.org/babydocs/"><b><span style="font-variant: small-caps;">baby api</span></b> </a>`
        HTML += `</div>`



        //section.textvalue


        // create the textvalue for the entire header, and pop it into the page

        this.attach('lesson', '', '', '', [
            this.node('div', HTML, '', 'modbar'),
        ])


        // // the 'home' button runs you back to Joomla's home page
        // // the 'logoff' button similarly.  if you are in a lesson, then ALWAYS logged in
        // $currentLesson = '01 - Learn Javascript';
        // $HTML.= << <EOT



        //                         < !--    < br />
        //                         <a href="https://join.slack.com/t/communityreading/shared_invite/enQtMzY2MTU4NzczODcyLTJhODFlMDU3OGQ4YzQ3MjYyNGNjN2FhNTU3YzcyNDhlMTM1MmZjNzE1OTA3ZTMwM2RmNTgxNTk5YzcwMWMxODY" > Join Slack < /a>
        // -->

        //     </td>
        //     < /tr></table >


    }
}


class SectionLesson extends LessonSections {
    constructor(section: ITag) {
        super(section)
        moduleInfo.lesson = section.textvalue      // just same the lesson name
    }
}


class SectionShortDesc extends LessonSections {
    constructor(section: ITag) {
        super(section)
        moduleInfo.shortDesc = section.textvalue      // just same the lesson name

        this.attach('lesson', '', '', '', [
            this.node('P', `SUMMARY - ${section.textvalue}`,
                '', '', [{ name: 'style', value: 'background-color:lightsalmon' }]),
        ])

    }
}




class SectionMystery extends LessonSections {   // we don't know what this section is - certainly an error

    constructor(section: ITag) {
        super(section)

        this.attach('lesson', '', '', '', [

            this.node('P', `Unknown tag - ${section.tag} with rawvalue ${section.rawvalue} </span>`,
                '', '', [{ name: 'style', value: 'background-color:pink' }]),
        ])
    }
}


class SectionCode extends LessonSections {
    constructor(section: ITag) {
        super(section)
        // console.log('config lines', section.params['lines'])

        //TODO: <code
        //    (lines=6) // only show n lines (indicate there are more)
        //    (noShow)  // just a copy or run button
        //    (noRun)   // not runnable code, no copy or run buttons


        // this.basicLeftRight(this.divName('code', this.tkt),
        //     this.sectionName, this.divName("monaco", this.tkt), this.divName("world", this.tkt))  // specifies the DIV styles (not the IDs)


        // if option 'noedit', then just display code
        // if ('noedit' in section.params) {
        //     let text = section.rawvalue.replace(/(?:\r\n|\r|\n)/g, '<br>')
        //     if (text.startsWith('<br>')) { text = text.slice(4) }  // strip leading <br>

        //     this.attach(this.sectionName, '', this.divName('nocode', this.tkt), '', [
        //         this.node('P', `<t3d_codeblock>${text}</t3d_codeblock>`, '', ''),
        //     ])
        // } else {

        // create a monaco editor on the left side
        let initialCode = section.rawvalue.trimRight()


        initialCode = initialCode.replace(/“/g, `"`)   // replace web quotes with proper double-quotes
        initialCode = initialCode.replace(/”/g, `"`)   // replace web quotes with proper double-quotes
        initialCode = initialCode.replace(/‘/g, `'`)   // replace web quotes with proper single-quotes
        initialCode = initialCode.replace(/’/g, `'`)   // replace web quotes with proper single-quotes


        let tag = document.getElementById(this.divName('left', this.tkt))
        let nLines = parseFloat(section.params['lines'])  // we know it's a string, but typescript doesn't

        if (initialCode.charCodeAt(0) == 10) {   // leading LF?
            initialCode = initialCode.substr(1)
        }



        // console.log('initialco', initialCode, initialCode.charCodeAt(0))
        // console.log('about to create the editor')
        // this.editor = new EditorInstance(initialCode, tag, halfMonacoWidth, nLines)

        // if we want line numbers, we just add them ourselves
        initialCode = initialCode
            .split('\n')
            .map((line, num) => `${(num + 1).toString().padStart(3, ' ')}    ${line}`)  // 
            .join('\n');


        const html = Prism.highlight(initialCode, Prism.languages.javascript, 'javascript');
        let copyID = this.divName('copy', this.tkt)  // code019 or similar
        let runID = this.divName('run', this.tkt)  // code019 or similar

        // and save the speech in the utterances array
        codeStrings.push({ copyID: copyID, runID: runID, code: initialCode })
        // console.log('push codeStrings', copyID, runID, initialCode)


        let expandHtml: string = ''

        if (!('norun' in section.params)) {     // sometimes we don't want to run
            expandHtml += // start with the copy a nd run icons
                `<div style='float:left;'>
                    <img id='${copyID}' style='height:24px;position:absolute;' src='../assets/images/copy.png' title='Copy to Editor' />
                    <img id='${runID}' style='height:24px;position:absolute;top: 32px;left:-2px;' src='../assets/images/run.png' title='Run in Canvas' />
                </div>`
        }

        expandHtml +=    // add in the code itself
            `<div class='editleft'><code>${html}</code></div>`

        this.attach('lesson', '', this.divName('code', this.tkt), 'code', [
            this.node('P', expandHtml, '', ''),
        ])


        // ///////////////////////////////////////////////////////////////////
        // // turn on validation (probably on by default)
        // monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
        //     noSemanticValidation: false,
        //     noSyntaxValidation: false,
        // })




        // ///////////////////////////////////////////////////////////////////
        // // add extra libraries
        // monaco.languages.typescript.typescriptDefaults.addExtraLib([
        //     'declare class Facts {',
        //     '    /**',
        //     '     * Returns the next fact',
        //     '     */',
        //     '    static next():string',
        //     '}',
        // ].join('\n'), 'filename/facts.d.ts');


        // monaco.languages.typescript.typescriptDefaults.setCompilerOptions(defaultCompilerOptions)



        // }
    }
    onDestroy() { }

}


class SectionP extends LessonSections {   // <p> with speaker and
    public utter: string = ''

    nodes: any[] = []          // build up the parts of the div that we need
    originalSection: ITag
    utterId: string

    //TODO:  p(run)  // immediately run the code part of the section on clicking the utterance

    constructor(section: ITag) {
        super(section)

        // the utterId is constant across multiple <p>s
        this.utterId = this.divName('utter', this.tkt)

        let text = section.textvalue

        this.originalSection = section // we will need it 
        // this.addSingleParagraph(section)
        // this.finalAttachToDiv()
    }

    // <p> get grouped together in a single <DIV>.  so we offer 
    // a method that adds a single <P> paragraph and another that closes the <DIV>

    addSingleParagraph(currentSection: ITag) {


        // speech icon
        if ('SpeechIcon' in currentSection.params) {    // first or continuation?
            // nodes.push(this.node('DIV', '', '', 'prespeaker'))
            this.nodes.push(this.node('IMG', '', this.utterId, 'speaker', [
                { name: 'src', value: "../assets/images/speaker.png" }
                // ,
                // { name: 'onclick', value: `console.log(globalThis);onClickSay("this is a test")` },
            ]))

            // and save the speech in the utterances array
            utterances.push({ id: this.utterId, text: currentSection.speechvalue + " ." })

        } else {
            // just add the voice text to the previous utterance
            let previousUtterance = utterances.pop()
            if (previousUtterance !== undefined) {
                previousUtterance.text += '. ' + currentSection.speechvalue
                utterances.push(previousUtterance)
            }
        }



        // right side image
        if ('img' in currentSection.params) {
            this.nodes.push(this.node('IMG', '', '', 'pimage', [
                { name: 'src', value: currentSection.url },
            ]))
        }
        // right side video
        if ('video' in currentSection.params) {
            this.nodes.push(this.node('video', '', '', 'vimage', [
                { name: 'src', value: currentSection.url },
                { name: 'width', value: "320" },
                { name: 'height', value: "240" },
                { name: 'type', value: "video/webm" },
                // { name: 'controls', value: "" },
                { name: 'loop', value: "" },
                { name: 'autoplay', value: "" },
            ]))
        }

        // do we need to add background betty?  
        if ('science' in currentSection.params && 'SpeechIcon' in currentSection.params) {
            this.nodes.push(this.node('IMG', '', 'science', 'background', [
                { name: 'src', value: "../assets/images/madscience.png" },
            ]))
        }

        // do we need to add realworld?
        if ('history' in currentSection.params && 'SpeechIcon' in currentSection.params) {
            this.nodes.push(this.node('IMG', '', '', 'background', [  // same css as background
                { name: 'src', value: "../assets/images/history.png" },
            ]))
        }

        // do we need to add mindset?
        if ('mindset' in currentSection.params && 'SpeechIcon' in currentSection.params) {
            this.nodes.push(this.node('IMG', '', '', 'background', [  // same css as background
                { name: 'src', value: "../assets/images/anime3.png" },
            ]))
        }





        // finally the text  // <p(h1)> is equivalent to <title>, but gets a speech button

        // is this a bullet or a regular paragraph?
        if ('bullet' in currentSection.params) {
            this.nodes.push(this.node('P', currentSection.textvalue, '', 'bullet'))
        } else {
            let tag = 'p'
            if ('h1' in currentSection.params) tag = 'h1'
            if ('h2' in currentSection.params) tag = 'h2'
            if ('h3' in currentSection.params) tag = 'h3'
            this.nodes.push(this.node(tag, currentSection.textvalue, '', ''))
        }
    }


    finalAttachToDiv() {
        // finally attach, either for background-betty or for normal
        if ('science' in this.originalSection.params) {
            this.attach('lesson', '', this.sectionName, 'science', this.nodes)
        } else if ('history' in this.originalSection.params) {
            this.attach('lesson', '', this.sectionName, 'history', this.nodes)
        } else if ('mindset' in this.originalSection.params) {
            this.attach('lesson', '', this.sectionName, 'mindset', this.nodes)
        } else {
            this.attach('lesson', '', this.sectionName, '', this.nodes)
        }

    }


    onDestroy() { }
}


class SectionTitle extends LessonSections {   // handles titles and subtitles

    constructor(section: ITag) {
        super(section)

        let tag = 'h1'
        if (section.tag === 'subtitle') {
            tag = 'h2'
        }
        if (section.tag === 'section') {
            tag = 'h3'
        }


        this.attach('lesson', '', '', '', [
            this.node(tag, section.textvalue),
        ])
    }
}



class SectionAsciiMath extends LessonSections {   // converts to MathML (only for Firefox)

    constructor(section: ITag) {
        super(section)


        let mathId = this.divName('math', this.tkt)
        this.attach('lesson', '', mathId, '', [])  // create a <div> for the math

        let pTag = document.getElementById(mathId)  // and then attach to that div
        if (pTag !== null)
            pTag.appendChild(asciiMath(section.textvalue))

    }
}




class SectionDrill extends LessonSections {   // handles math drills

    constructor(section: ITag) {
        super(section)

        // a drill is just a canvas area, the drill software figures how to fill it

        let nodes: any[] = []

        let drillId = this.divName('drill', this.tkt)

        // <div id="drill???s" width="1000" height="300"></canvas>
        this.attach('lesson', '', this.sectionName, '', [
            this.node('canvas', '', drillId, 'drill', [{ name: 'width', value: "1000" }, { name: 'height', value: "300" }],
            )])

        // let drill = drillByName('singleMultiply', drillId, 6)



        // // eventually ask for history, decide what to do next
        // // for now, drill 6x6 simplemultiply
        // let model = LessonFactory([6, 6])
        // let drill = drillMathDispatch(drillId, model, 'SimpleMultiply')

        // // test function
        // let i = 0
        // while (i++ < 1) {
        //     let question = drill.generator(false).next
        //     drill.renderQuestion(question)
        // }
    }
}

class SectionYouTube extends LessonSections {

    nodes = []

    constructor(section: ITag) {
        super(section)

        // Use the EMBED version of the URL (from the <> EMBED), NOT the share URL !!

        console.assert(section.textvalue.includes('embed'), "USE THE EMBED <> VERSION OF THE YOUTUBE URL")

        let youId = this.divName('youtube', this.tkt)

        this.attach('lesson', '', youId, '', [
            this.node('embed', '', '', '', [
                { name: "width", value: "640px" },
                { name: "height", value: "400px" },
                { name: "src", value: section.textvalue.trimRight() },
                { name: "allowfullscreen", value: "true" }
            ])
        ])

    }

}


class SectionDebug extends LessonSections {
    constructor(section: ITag) {
        super(section)

        let tag = 'p'

        this.attach('lesson', '', '', '', [
            this.node(tag, JSON.stringify(section), '', '', [{ name: 'style', value: 'font-size:10px;' }])
        ])
    }

}

