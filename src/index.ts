// to prepare the baby.d.ts.txt file, you must
//   - remove all the 'import' statements
//   - remove the word 'export' from 'export declare'
//   - you should also remove   /** @ignore */ and the line that follows


import { Editor } from "./editor";
import { OnClickSay } from "./onClickSay"
// import {TerminalJS } from './terminal'
// import *  as Prism from 'prismjs'
// import { asciiMath, testAsciiMath } from './ASCIIMathML'
import { Log } from './utilities'

import { DOM } from './DOM'
import { MForms } from './mforms'

// import { XMLHttpRequest } from 'xmlhttprequest-ts'
import * as monaco from "monaco-editor";





// not sure if this is useful
(self as any).MonacoEnvironment = {
    getWorkerUrl(moduleId: string, label: string) {
        if (label === "typescript" || label === "javascript") {
            return "./dist/ts.worker.js";
        }
        return "./dist/editor.worker.js";
    },
};


class Main {

    editorDiv: HTMLDivElement
    editor: Editor
    // game: GameLauncher
    download: HTMLButtonElement
    upload: HTMLButtonElement
    run: HTMLButtonElement
    stop: HTMLButtonElement
    pause: HTMLButtonElement
    command: HTMLButtonElement
    // fullscreen: HTMLButtonElement

    template = "console.log('Hello World')"

    static onClickSay: OnClickSay      // we'll put an instance here
    static someEditor: Editor



    /** Attaches the mathcode API to the window object so that you can discover it */
    static attachMathCode() {   // NB - STATIC !!!
        // let onClickSay: OnClickSay

        (window as any).MathcodeAPI = {
            version: '1.0',

            notifyObservers: (message: string) => {
                DOM.notifyObservers(message)
            },

            loader: () => {
                console.log('MathcodeAPI.loader successful, about to start editor')
                // var editor = monaco.editor.create(document.getElementById('editor'), {
                //     value: ['function x() {', '\tconsole.log("Hello new world!");', '}'].join('\n'),
                //     language: 'typescript'
                // })
                var model = monaco.editor.createModel(
					['function x() {', '\tconsole.log("Hello world!");', '}'].join('\n'),
					'javascript'
				);
				var editor1 = monaco.editor.create(document.getElementById('editor'), {
					model: model
				});
            },

            // MathcodeAPI.onClickSay("u00051",voice,"step","activity","topic")
            onClickSay: (utterID: string, voiceN: number, step: number, activity: number, topic: number) => {
                // console.log(`onClickSay: (utterID: ${utterID}, voiceN: ${voiceN}, step: ${step}, activity: ${activity}, topic: ${topic})`)

                let sayThis = document.getElementById(utterID)  // : HTMLElement or null
                if (!sayThis) {     // might be null
                    Log.write({ 'action': 'log', 'datacode': Log.Error, 'data01': `could not find HTML ID '${utterID}'`, 'step': step, 'activity': activity, 'topic': topic })
                } else {

                    Log.write({ 'action': 'log', 'datacode': Log.ClickSpeaker, 'data01': utterID, 'data02': sayThis.innerHTML.substring(0, 30), 'step': step, 'activity': activity, 'topic': topic })

                    if (!this.onClickSay)
                        this.onClickSay = new OnClickSay()

                    // this.onClickSay = new OnClickSay()
                    this.onClickSay.onClickSay(sayThis.innerHTML, voiceN)
                }
            },

            // student clicks into reflection, have they finished all challenges?
            readyToReflect: (step: number, activity: number, topic: number): boolean => {
                // console.log(`readyToReflect: (${step}:number,${activity}:number,${topic}:number)`)

                // this version is neutered
                let readyToReflect = true  // TODO:  look it up in the page

                if (!readyToReflect) {
                    // if NOT ready, then use 1001, data01 describes what is missing
                    Log.write({ 'action': 'readyToReflect', 'datacode': 1001, 'data01': 'code challenge', 'step': step, 'activity': activity, 'topic': topic })
                    // alert('checking whether you are reading to finish ' + step.toString())
                } else {
                    // if ready, then use 1002.  and set a flag so don't have to check again
                    Log.write({ 'action': 'readyToReflect', 'datacode': Log.ReadyToReflect, 'step': step, 'activity': activity, 'topic': topic })
                }
                return readyToReflect
            },


            // MathcodeAPI.completeStep("00051","step","activity","topic")
            completeStep: (id: string, step: number, activity: number, topic: number) => {
                // alert('complete step')
                Log.write({ 'action': 'completeStep', 'datacode': Log.CompleteStep, 'step': step, 'activity': activity, 'topic': topic })
                return (true)  // whetherh we can go ahead
            },


        }
    }



    constructor() {

        console.log('in Main.constructor() of math-player')

        /*
                let newNode = DOM.node('p', 'we have written new text', 'ID123')   // we'll need ID123
                console.log('newNode', newNode)
                DOM.appendChild('App', [newNode])

                // throw up a button
                DOM.appendChild('App', DOM.node('button', 'Primary', '', 'btn btn-primary'))

                ////////////////////////////////////////////////////

                // throw up a button that interacts with the DOM
                let simpleCallback = () => {   // first we need an action for the on-click
                    document.getElementById('ID123').textContent = 'we have changed the text';  // update the <p></p> node
                }
                DOM.addObserver('ID234', simpleCallback)  // we store it away for later
                let button = DOM.node('button', 'Info', '', 'btn btn-info', [['onclick', "MathcodeAPI.notifyObservers('ID234')"]])

                // add it into the page
                DOM.appendChild('App', button) // and now we add a button to the DOM

                ////////////////////////////////////////////////////

                // but it's much simpler with utility functions
                let infoButton = DOM.button('App', 'clickMe', 'info')
                let msg = DOM.paragraph('App', 'Now is the time')

                DOM.addObserver(infoButton.id, () => msg.textContent = 'that was the time')

                ////////////////////////////////////////////////////

                let row = MForms.rowOpen('App', 3)

                let col1 = MForms.rowNextCol(row, 3)
                DOM.paragraph(col1, 'first')
                let col2 = MForms.rowNextCol(row, 3)
                DOM.paragraph(col2, 'second')
                let col3 = MForms.rowNextCol(row, 3)
                DOM.paragraph(col3, 'third')
                let col4 = MForms.rowNextCol(row, 3)
                DOM.paragraph(col4, 'fourth')


                row = MForms.rowOpen('App', 3)
                col1 = MForms.rowNextCol(row, 3)
                DOM.paragraph(col1, 'first')
                col2 = MForms.rowNextCol(row, 3)
                DOM.paragraph(col2, 'second')
                col3 = MForms.rowNextCol(row, 3)
                DOM.paragraph(col3, 'third')

        */



        Main.onClickSay = new OnClickSay()
        this.expandCodestr()   // not static, so use 'this'


        /** Attaches the mathcode API to the window object so that you can discover it */
        Main.attachMathCode();

        // const State = {
        //     inputModel: null,
        //     outputModel: null,
        // };



        // monaco.editor.createModel(lib_baby, 'typescript', monaco.Uri.parse(babyUri));

        //tbtb
        // this.editorDiv = document.getElementById("editor")! as HTMLDivElement
        // this.editor = new Editor(this.editorDiv, this.template);


        // this.game = undefined //new GameLauncher(800, 600);
        this.download = document.getElementById("download") as HTMLButtonElement;
        this.upload = document.getElementById("upload") as HTMLButtonElement;
        this.run = document.getElementById("run") as HTMLButtonElement;
        this.stop = document.getElementById("stop") as HTMLButtonElement;
        this.pause = document.getElementById("pause") as HTMLButtonElement;
        this.command = document.getElementById("command") as HTMLButtonElement;
        // this.fullscreen = document.getElementById("fullscreen") as HTMLButtonElement;



        this.download.onclick = () => this.editor.download("game.ts");
        this.upload.onclick = () => this.editor.upload();

        this.run.onclick = async () => {
            console.log('clicked RUN')
            // this.run.disabled = false;  // was true
            // this.stop.disabled = false;
            // this.pause.disabled = false;
            // this.command.disabled = false;
            // this.fullscreen.disabled = false;
            try {
                // const fn = await this.editor.transpile(this.game.scope);
                //this.editorDiv.hidden = true;
                this.editor.transpile()
                // this.editor.runEditorCode()

            } catch (e) {   // transpile error.  show it in an alert
                // alert('transpile message coming')
                alert(e);
                this.resetButtons();
            }
        };
        // this.stop.onclick = () => {
        //     try {
        //         //TODO: implement stop
        //         // this.game.stop();
        //     } finally {
        //         this.editorDiv.hidden = false;
        //         this.resetButtons();
        //     }
        // };
        // this.pause.onclick = () => {
        //     // const paused = this.game.paused;
        //     // this.game.paused = !paused;
        //     // this.pause.innerText = paused ? "Pause" : "Continue";
        //     // this.fullscreen.disabled = !paused;
        // };

        this.command.onclick = () => {
            console.log('clicked command')
            // const paused = this.game.paused;
            // this.game.paused = !paused;
            // this.pause.innerText = paused ? "Pause" : "Continue";
            // this.fullscreen.disabled = !paused;
        };

        // this.fullscreen.onclick = () => this.game.fullScreen = true;

    }

    resetButtons() {
        this.download.disabled = false;
        this.upload.disabled = false;
        this.run.disabled = false;
        // this.stop.disabled = true;
        // this.pause.innerText = "Pause";
        // this.pause.disabled = true;
        // this.fullscreen.disabled = true;
    }

    expandCodestr() {
        console.log('about to expand CODESTR blocks')
        let elements = document.getElementsByClassName('codestr')
        for (let i = 0; i < elements.length; i++) {   // HTMLElements not iterable ?!?
            let codestrElement = elements[i] as HTMLElement
            let codestr = codestrElement.dataset.code
            console.log('before', codestrElement, codestr)

            if (codestr) {      // might be undefined


                // PHP specialcharacters() converts five elements, we must switch them back
                codestr = codestr.replaceAll(`&amp;`, `&`)
                codestr = codestr.replaceAll(`&quot;`, `&`)
                codestr = codestr.replaceAll(`&#039;`, `'`)
                codestr = codestr.replaceAll(`&lt;`, `<`)
                codestr = codestr.replaceAll(`&gt;`, `>`)

                console.log('after', codestr)

                // and write back into the page
                //TODO  use monaco instead of prism
                // elements[i].innerHTML = Prism.highlight(codestr, Prism.languages.javascript, 'javascript');
            }
        }
    }

}

let main = new Main()
// let JXGlocal = JXG.JSXGraph   // make sure it links in




//////////////////////////
///   some test data /////
//////////////////////////
function jString() {
    let ret =
        `{"version":"1.00","table":"topics","uniq":1,"courseuniq":null,"topicname":"Tools Competition Proposal","topicsummary":"This is fairly similar to the text of my Tools Competition Proposal, written in an early prototype of the tool itself.","topicsequence":1000,"topicexpectation":""}
    {"version":"1.00","table":"activities","uniq":1,"topicuniq":1,"activityname":"Summary and Introduction","act_desc":"","act_seq":"1000","act_type":0,"act_expect":"","act_prereq":"","act_introduction":"","competency1":"","competency2":"","content":null,"datelastedit":null}
    {"version":0,"table":"steps","uniq":1,"activityuniq":1,"steptype":"Text","title":"Introduction","intent":"Introduction and Overview","competency":"","curriculum":"","introduction":"I propose an authoring tool for writing next-generation interactive online STEM Textbooks.  I call them 'Textbook [2.0|2 dot 0]'.\\r\\n\\r\\nYou are looking at a prototype which I will mostly throw away as soon as I post it.  The next version will look far less clunky.\\r\\n\\r\\nThis is the only page you can view online, partly because you are not registered as a student, and partly because the Student Dashboard doesn't work properly yet.  This page is NOT the full proposal.","comments":"","jsondata":"","indexterms":"","glossaryterms":"","reflection":"","stepsequence":10,"percentdone":0,"wordcount":686,"patch":0,"patchfirst":0,"ab":"","lastupdated":1640131155}
    {"version":0,"table":"steps","uniq":2,"activityuniq":1,"steptype":"Text","title":"What is Out There Now?","intent":"Description of the landscape","competency":"","curriculum":"","introduction":"At this point, you are probably skeptical.  What does it mean to 'radically rethink' Textbooks?   \\r\\n\\r\\nAs a starter, this lesson will try to provide some context for Textbook-2.0. ","comments":"","jsondata":"","indexterms":"","glossaryterms":"","reflection":"","stepsequence":20,"percentdone":0,"wordcount":402,"patch":0,"patchfirst":0,"ab":"","lastupdated":1639704754}
    {"version":0,"table":"steps","uniq":3,"activityuniq":1,"steptype":"Text","title":"Introducing Textbook-2.0","intent":"What does Textbook-2.0 for Math look like?","competency":"","curriculum":"","introduction":"This lesson talks about the semantic structure of a Textbook-2.0 course, and how it can provide improved learning, teaching, and authoring.\\r\\n","comments":"","jsondata":"","indexterms":"","glossaryterms":"","reflection":"","stepsequence":30,"percentdone":0,"wordcount":898,"patch":0,"patchfirst":0,"ab":"","lastupdated":1639729658}
    {"version":0,"table":"steps","uniq":4,"activityuniq":1,"steptype":"Text","title":"Doesn","intent":"How is Textbook-2.0 different from an LMS?","competency":"","curriculum":"","introduction":"","comments":"","jsondata":"","indexterms":"","glossaryterms":"","reflection":"","stepsequence":40,"percentdone":0,"wordcount":328,"patch":0,"patchfirst":0,"ab":"","lastupdated":1639729711}
    {"version":0,"table":"steps","uniq":5,"activityuniq":1,"steptype":"Text","title":"The Author","intent":"What do Authoring Tools for Textbook-2.0 look like?","competency":"","curriculum":"","introduction":"","comments":"","jsondata":"","indexterms":"","glossaryterms":"","reflection":"","stepsequence":50,"percentdone":0,"wordcount":270,"patch":0,"patchfirst":0,"ab":"","lastupdated":1639729638}
    {"version":0,"table":"steps","uniq":6,"activityuniq":1,"steptype":"Text","title":"Housekeeping","intent":"These are the short sections from the Proposal template","competency":"","curriculum":"","introduction":"These are the short sections from the Proposal template.  \\r\\n\\r\\nThey are mostly forward looking, asking about strategies and timetables rather than the tool itself.","comments":"","jsondata":"","indexterms":"","glossaryterms":"","reflection":"","stepsequence":60,"percentdone":0,"wordcount":760,"patch":0,"patchfirst":0,"ab":"","lastupdated":1639708464}
    {"version":"1.00","table":"paragraphs","uniq":2,"stepuniq":1,"title":"","sequence":20,"competency":"","paragraph":"Textbook 2.0 is a radical rethinking.  It has a granular semantic understanding of the course, integrated with workflows, embedded with formative assessment, and networked for personalized, responsive education.  \\r\\n\\r\\nWriting a Textbook-2.0 is not possible with current tools.  This proposal is for an Authoring Tool.","assistant":"","image":"","code":"","hidden":"","youtube":"","popquiz":"","isclipboard":0,"datelastedit":""}
    {"version":"1.00","table":"paragraphs","uniq":5,"stepuniq":1,"title":"","sequence":100,"competency":"","paragraph":"Hi, I'm your Learning Coach.  \\r\\n\\r\\nAt the end of each Lesson, we are going to ask you to give us some feedback.  Your answers will help us improve the course. \\r\\n\\r\\nBut it is also a chance for you to pause and ask whether you fully understood this lesson.  That's a really great habit to get into, not just for this course but for everything you want to learn.  It's a quick self-assessment.\\r\\n\\r\\nHere it comes now.","assistant":"Mindset","image":"","code":"","hidden":"","youtube":"","popquiz":"","isclipboard":0,"datelastedit":""}
    {"version":"1.00","table":"paragraphs","uniq":6,"stepuniq":2,"title":"","sequence":10,"competency":"","paragraph":"##Description of the Tool##\\r\\nTextbooks have been the bedrock of Education for 200 years.  But there are good reasons to sunset them.  They are inaccessible to students with poor reading skills.  They are expensive.  They quickly fall out-of-date.  They are disconnected.  I\u2019m not sure students even use them anymore, except perhaps the night before an exam.  \\r\\n\\r\\nMore bad news for textbooks, the Internet is awash with free educational content.  Teachers are assembling their own courses from the Internet using their LMS.  These materials work well in regular classrooms, badly in flipped classrooms and Zoom school, and not at all for online courses. ","assistant":"","image":"","code":"","hidden":"","youtube":"","popquiz":"","isclipboard":0,"datelastedit":""}
    {"version":"1.00","table":"paragraphs","uniq":7,"stepuniq":2,"title":"","sequence":20,"competency":"","paragraph":"##Video isn\u2019t the Answer##\\r\\nThe majority of long-format online courses are video-based, following a traditional lecture format.  They are mostly engaging, easy to follow, and accessible to students with poor reading skills.  Often they interleave lectures, quizzes, and assignments, giving some insight into whether the student has achieved the learning objectives.\\r\\n\\r\\nBut video tends to be passive. The student has no control over pace, cannot pause and check his understanding, and has little opportunity to show proficiency or understanding.  Students with poor learning habits are unlikely to succeed.\\r\\n\\r\\n","assistant":"","image":"","code":"","hidden":"","youtube":"","popquiz":"","isclipboard":0,"datelastedit":""}
    {"version":"1.00","table":"paragraphs","uniq":8,"stepuniq":2,"title":"","sequence":30,"competency":"","paragraph":"Data collection in video courses tends to be sparse.  The LMS may report on whether a video was accessed or completed, but it is difficult to monitor engagement, viewing behavior, or learner comprehension.  \\r\\n\\r\\nThe mechanics of shooting a video discourage small iterative improvements. (This may change if live video is replaced with game-engine animation.)\\r\\n","assistant":"","image":"","code":"","hidden":"","youtube":"","popquiz":"","isclipboard":0,"datelastedit":""}
    {"version":"1.00","table":"paragraphs","uniq":9,"stepuniq":2,"title":"","sequence":40,"competency":"","paragraph":"##A Better Way##\\r\\nProgrammers have found a better way \u2013 text-with-widgets online courses, usually to acquire a specific skill. \\r\\n\\r\\nThese courses combine text content with coding environments.  Courses provide an efficient mix of instruction, model examples, contrast examples, and hands-on practice.  They appeal to motivated, strong learners with specific goals and extrinsic motivation. \\r\\n\\r\\nUnfortunately, this kind of course won\u2019t work for the bottom half of the high-school cohort with poor reading skills, passive learning habits, and little motivation.  It doesn\u2019t support learning as a social activity or invite active engagement or entertain.\\r\\n\\r\\n","assistant":"","image":"","code":"","hidden":"","youtube":"","popquiz":"","isclipboard":0,"datelastedit":""}
    {"version":"1.00","table":"paragraphs","uniq":10,"stepuniq":2,"title":"","sequence":45,"competency":"","paragraph":"POPQUIZ - what do you think so far??","assistant":"","image":"","code":"","hidden":"","youtube":"","popquiz":"{\"question\":\"What Do You Think So Far?\",\"preamble\":\"\",\"questiontype\":\"\",\"required\":\"\",\"answer1\":\"Meh.  Lots of people doing this.\",\"answer2\":\"Wow.  I","isclipboard":0,"datelastedit":""}
    {"version":"1.00","table":"paragraphs","uniq":11,"stepuniq":3,"title":"","sequence":10,"competency":"","paragraph":"##What does Textbook-2.0 for Math look like?##\\r\\nPISA\u2019s Math Assessment is my starting point. It describes skills and knowledge across the Math domain as a matrix of Competencies (Communication, Mathematising, Representation, etc) and Curriculum Strands (Linear Algebra, Geometry, etc).  \\r\\n\\r\\nThis model offers the semantic structure to build a Textbook-2.0 course, assigning intent to lessons at a granular level.   We tag every unit of text and every widget (lessons, quizzes, drills, exercises, challenges, assignments, curated content, and more) with this semantic mapping.\\r\\n\\r\\nThis is Evidence-Centered Design (ECD) assessment, deeply embedded.","assistant":"","image":"","code":"","hidden":"","youtube":"","popquiz":"","isclipboard":0,"datelastedit":""}
    {"version":"1.00","table":"paragraphs","uniq":12,"stepuniq":3,"title":"","sequence":20,"competency":"","paragraph":"##Textbook-2.0 Scenario##\\r\\nA student is working through a \u2018Step\u2019 (a unit of work, typically about 10 minutes of learning time).  The Step has a clear intent for the curriculum point, perhaps this one is \u2018Problems involving Pendulums\u2019. \\r\\n \\r\\nEach Step starts by stating its intent and offering to review prior materials.  Since the course has a structure, it can offer to review backward by Competency (prior lessons on Mathematizing, angular operations, etc), by Curriculum (prior lessons on pendulums, pivots, gravity forces, etc), or just chronologically. ","assistant":"","image":"","code":"","hidden":"","youtube":"","popquiz":"","isclipboard":0,"datelastedit":""}
    {"version":"1.00","table":"paragraphs","uniq":13,"stepuniq":3,"title":"","sequence":30,"competency":"","paragraph":"The Student works through a series of \u2018Paragraphs\u2019, each coded for PISA Competency. A \u2018Paragraph\u2019 is a unit of text, or widget, or both, it is the smallest unit in the Textbook database.  For example \u2018Mathematizing a Pendulum under Acceleration\u2019.     \\r\\n\\r\\nWidgets both teach and provide formative assessment.  Quiz widgets are obvious assessments.  Programming exercises might require submitting code to a testing routine.  Essays might get sent to human markers.  A interactive widget might track interactions.  A URL link might record whether it was clicked.  A curated Youtube video might be followed by a related quiz. ","assistant":"","image":"","code":"","hidden":"","youtube":"","popquiz":"","isclipboard":0,"datelastedit":""}
    {"version":"1.00","table":"paragraphs","uniq":14,"stepuniq":3,"title":"","sequence":40,"competency":"","paragraph":"Paragraphs also measure engagement, they have a read-aloud icon and track when the student has clicked to listen. Timestamps reveal whether he has been interrupted, his time-on-task, and his reading path (including reviews).  \\r\\n\\r\\nObviously, every data element collected is tagged by the PISA semantic structure.      \\r\\n","assistant":"","image":"","code":"","hidden":"","youtube":"","popquiz":"","isclipboard":0,"datelastedit":""}
    {"version":"1.00","table":"paragraphs","uniq":15,"stepuniq":3,"title":"","sequence":50,"competency":"","paragraph":"Perhaps Student gets stuck at the challenge.  He pushes a button, and a Tutor quickly connects to help him.   When they finish, the Tutor codes a form documenting the interaction.  This triggers a virtual visit the next day from Teacher, who checks on Student\u2019s understanding and may dynamically insert another challenge into Student\u2019s course. \\r\\n\\r\\nThere is a short assignment at the end of the Step.  When Student submits, it is queued to a Marker with the related rubric prepared by the Author.  Marker\u2019s feedback is sent back to Student and Teacher in a day or two, perhaps with links to prior lessons that Student should review.  This might become part of the summative assessment, sent to the gradebook.\\r\\n","assistant":"","image":"","code":"","hidden":"","youtube":"","popquiz":"","isclipboard":0,"datelastedit":""}
    {"version":"1.00","table":"paragraphs","uniq":16,"stepuniq":3,"title":"","sequence":60,"competency":"","paragraph":"Some of the widgets are compulsory \u2013 Student may not complete the Step until they are satisfied.  This is a form of Mastery Learning, if the student cannot answer a challenge then he does not know the material.\\r\\n\\r\\nAt the end of each Step, Student is asked to give feedback about the Step. This feedback is also a self assessment.   \\r\\n","assistant":"","image":"","code":"","hidden":"","youtube":"","popquiz":"","isclipboard":0,"datelastedit":""}
    {"version":"1.00","table":"paragraphs","uniq":18,"stepuniq":3,"title":"","sequence":70,"competency":"","paragraph":"Teacher\u2019s dashboard shows Student\u2019s progress and engagement (time on task).  Some simple aggregration exposes a model of Student\u2019s learning habits.  Alarms go off if Student misses a day, or is investing time but not making progress.\\r\\n\\r\\n","assistant":"","image":"","code":"","hidden":"","youtube":"","popquiz":"","isclipboard":0,"datelastedit":""}
    {"version":"1.00","table":"paragraphs","uniq":19,"stepuniq":3,"title":"","sequence":80,"competency":"","paragraph":"And here\u2019s the secret sauce.  All this data, at both aggregrate and anonomized individual detail, especially Student\u2019s feedback, feeds back to the Author\u2019s workstation.  If a Step needs improvement, it becomes apparent very quickly.  \\r\\n\\r\\nAuthor\u2019s improvements are delivered as \u2018patches\u2019 against branches of released courses, with logic to ensure that student should either see the new or old material, not a mix.  Patchs can easily be merged into the forward Textbook, or abandoned, which encourages experiments.  More than one Author can work on the text.  This facility is familiar to any programmer using GIT-based source control.\\r\\n\\r\\nFeedback and \u2018Continuous Improvement\u2019 loop is the heart of Textbook 2.0. \\r\\n\\r\\n","assistant":"","image":"","code":"","hidden":"","youtube":"","popquiz":"","isclipboard":0,"datelastedit":""}
    {"version":"1.00","table":"paragraphs","uniq":20,"stepuniq":3,"title":"","sequence":90,"competency":"","paragraph":"##But Doesn't The LMS Already Do This?##\\r\\nNo. The LMS knows who performs the roles, provides the databases, offers the network connectivity, and delivers the assets.   \\r\\n\\r\\nThe LMS doesn\u2019t know the fine structure of a course, or what Student is doing or should be doing.  It\u2019s the other way around, Textbook 2.0 has access upwards to networking, reporting, grading, roles, and community.\\r\\n  \\r\\n","assistant":"","image":"","code":"","hidden":"","youtube":"","popquiz":"","isclipboard":0,"datelastedit":""}
    {"version":"1.00","table":"paragraphs","uniq":21,"stepuniq":3,"title":"","sequence":110,"competency":"","paragraph":"SCORM and IMS packages live in a half-world, with detailed internal information but minimal interactions with the LMS.  They are shiny and portable, but unaware of their surroundings.  I investigated writing Textbook-2.0 as a SCORM package, it would have been much less work.  But it wasn\u2019t worth doing.\\r\\n","assistant":"","image":"","code":"","hidden":"","youtube":"","popquiz":"","isclipboard":0,"datelastedit":""}
    {"version":"1.00","table":"paragraphs","uniq":22,"stepuniq":3,"title":"","sequence":115,"competency":"","paragraph":"Textbook 2.0 is a frisky application with both internal logic and external engagement to the LMS.  It mixes personalized, responsive education with online scale.  That\u2019s a large part of its power.  \\r\\n\\r\\nI have picked Moodle as the platform for my prototype.   Moodle is open-source and free.  And it has a huge community, which will be important for the next phase of this project","assistant":"","image":"","code":"","hidden":"","youtube":"","popquiz":"","isclipboard":0,"datelastedit":""}
    {"version":"1.00","table":"paragraphs","uniq":24,"stepuniq":1,"title":"","sequence":30,"competency":"","paragraph":"You should click on the speakers and listen as you read, the speech will slow you down, reduce cognitive load, and improve your comprehension.  About half of students are poor readers, this keeps them in the game.\\r\\n\\r\\nAs well, the speakers are [subversive| all knowing], and sometimes [tell silly jokes | recite dirty limericks].\\r\\n","assistant":"Science","image":"","code":"","hidden":"","youtube":"","popquiz":"","isclipboard":0,"datelastedit":""}
    {"version":"1.00","table":"paragraphs","uniq":25,"stepuniq":1,"title":"","sequence":50,"competency":"","paragraph":"On the upper right is a programmer\u2019s editor with editing, type-hinting, linting, and completions.   On the lower right is an HTML canvas workspace, suitable for running an integrated WebGL game engine and other graphics libraries.  \\r\\n\\r\\nI\u2019ve provided some code samples.  Instructions to run them are in the online version.  They are interactive, and you can edit the code.  Try playing with them.  \\r\\n","assistant":"","image":"","code":"","hidden":"","youtube":"","popquiz":"","isclipboard":0,"datelastedit":""}
    {"version":"1.00","table":"paragraphs","uniq":26,"stepuniq":4,"title":"","sequence":60,"competency":"","paragraph":"","assistant":"","image":"","code":"","hidden":"","youtube":"","popquiz":"{\"question\":\"Is Textbook-2.0 Worth Doing?\",\"preamble\":\"\",\"questiontype\":\"\",\"required\":\"\",\"answer1\":\"No.  It will be too complicated for Authors.\",\"answer2\":\"No.  Educators aren","isclipboard":0,"datelastedit":""}
    {"version":"1.00","table":"paragraphs","uniq":27,"stepuniq":4,"title":"","sequence":10,"competency":"","paragraph":"##History of The Proposed Tool##\\r\\nI have an itch to write, specifically to write a Math-and-Physics textbook for emerging video game programmers.\\r\\nArcade-style computer graphics are an almost-pure expression of High School Geometry, Algebra, and Pre-Calculus.  Images are geometry projected in Cartesian space, moved with vectors, rotated with angles, and transformed with matrices.","assistant":"","image":"","code":"","hidden":"","youtube":"","popquiz":"","isclipboard":0,"datelastedit":""}
    {"version":"1.00","table":"paragraphs","uniq":28,"stepuniq":4,"title":"","sequence":20,"competency":"","paragraph":"Game programming always comes back to Math.  Rendering is Linear Algebra. Stepwise motion is Pre-Calculus. Collisions are Newtonian Physics.  Games of chance require Probability. Puzzle games require Logic.  Robots require Kinematics.  Colors require Discrete Math.  It is all simple high-school math.\\r\\n\\r\\nBy teaching game programming and applying it to writing simple game snippets, I create opportunities to practice, visualize, and reflect on math and physics in authentic situations.  And I can see student\u2019s thinking reflected in their coding.","assistant":"","image":"","code":"","hidden":"","youtube":"","popquiz":"","isclipboard":0,"datelastedit":""}
    {"version":"1.00","table":"paragraphs","uniq":29,"stepuniq":4,"title":"","sequence":30,"competency":"","paragraph":"So I want to write this course. Writing is fun, but the results have always disappointed me.  So far I have failed three times, using three different sets of ad-hoc tools.   I had given up.  There are no suitable tools.\\r\\n\\r\\nThen I came across the Tools Competiton.  It was a wake-up call.\\r\\n\\r\\nI had been thinking like an educator, thinking like a writer.  I can knock out simple apps, and I know my subject, surely that\u2019s enough.  But if I can\u2019t write this book, then likely no one can.   ","assistant":"","image":"","code":"","hidden":"","youtube":"","popquiz":"","isclipboard":0,"datelastedit":""}
    {"version":"1.00","table":"paragraphs","uniq":30,"stepuniq":4,"title":"","sequence":40,"competency":"","paragraph":"In my prior life, I built leading-edge enterprise systems.  We assumed existing tools weren\u2019t sufficient because we were building things that no one had ever built.  We allocated substantial time and budget to building our tools and frameworks.\\r\\n\\r\\nI decided to build the tool I wanted, taking as much time as necessary.  I wrote and re-wrote the Phase I proposal for this submission, until it crystalized into a doable project.  Then built a prototype, then wrote and re-wrote this proposal.\\r\\n\\r\\nTextbook-2.0 will be my fourth try.","assistant":"","image":"","code":"","hidden":"","youtube":"","popquiz":"","isclipboard":0,"datelastedit":""}
    {"version":"1.00","table":"paragraphs","uniq":31,"stepuniq":5,"title":"","sequence":10,"competency":"","paragraph":"Writers start with an outline, often in Excel.  Larger projects may use a corkboard.  But then the writing starts in a word processor, and the outline quickly loses currency.\\r\\n\\r\\nThere are tools such as Scrivener that can build on the outline, keeping track of the plot, characters, locations, and other elements.  I adopted that idea for this project, an interactive corkboard that can be sorted and filtered by it\u2019s PISA matrix. Or show a heatmap of lessons that need revision.","assistant":"","image":"","code":"","hidden":"","youtube":"","popquiz":"","isclipboard":0,"datelastedit":""}
    {"version":"1.00","table":"paragraphs","uniq":32,"stepuniq":5,"title":"","sequence":20,"competency":"","paragraph":"The tool pushes the author to chop skills into small steps focused on specific competencies.  It intentionally drives a stilted style of writing, focused on clarity and purpose.\\r\\n\\r\\nI modified a Markdown editor with extensions for voice annotation.  $1.50 should never be read as \u201cDollar One Period Fifty\u201d, but rather \u201cA Dollar Fifty\u201d or even \u201cA Buck And A Half\u201d.  Markdown also preserves the text for database search.\\r\\n","assistant":"","image":"","code":"","hidden":"","youtube":"","popquiz":"","isclipboard":0,"datelastedit":""}
    {"version":"1.00","table":"paragraphs","uniq":33,"stepuniq":5,"title":"","sequence":30,"competency":"","paragraph":"Cutting and pasting works well with text, but not with complex linked content.  The proposed tool\u2019s database layer handles cut and paste at the \u2018Paragraph\u2019 level .\\r\\n\\r\\nUsing a database solves the problem of keeping revisions linked to previous versions of the document, including published one.  Feedback about \u2018Page 106\u2019 doesn\u2019t mean anything after a few revisions, the Author needs to see the original text and any changes already made. \\r\\n","assistant":"","image":"","code":"","hidden":"","youtube":"","popquiz":"","isclipboard":0,"datelastedit":""}
    {"version":"1.00","table":"paragraphs","uniq":34,"stepuniq":5,"title":"","sequence":40,"competency":"","paragraph":"There are other features, too many to mention here.  For example, \u2018revision mode\u2019 allows a Reviewer to annotate corrections from a Student\u2019s view.  A\/B testing, of course.  Git-based source control for teams of writers.","assistant":"","image":"","code":"","hidden":"","youtube":"","popquiz":"","isclipboard":0,"datelastedit":""}
    {"version":"1.00","table":"paragraphs","uniq":35,"stepuniq":5,"title":"","sequence":45,"competency":"","paragraph":"","assistant":"","image":"","code":"","hidden":"","youtube":"","popquiz":"","isclipboard":0,"datelastedit":""}
    {"version":"1.00","table":"paragraphs","uniq":36,"stepuniq":6,"title":"","sequence":10,"competency":"","paragraph":"##Attention to Equity##\\r\\nMy work with extreme-deficit readers sensitizes me to the practical problems, poor motivation, and self-sabotaging behaviors of struggling readers (about half the student population), especially in the low-income areas where I volunteer.  I\u2019m building my course for them. \\r\\n\\r\\nThese students don\u2019t read even if they can, often their parents aren\u2019t readers and there are no books in the house.  They are not connected to stronger student peers.  They tune out from Zoom school and learn nothing. Supportive family structures are rare. \\r\\n","assistant":"","image":"","code":"","hidden":"","youtube":"","popquiz":"","isclipboard":0,"datelastedit":""}
    {"version":"1.00","table":"paragraphs","uniq":37,"stepuniq":6,"title":"","sequence":20,"competency":"","paragraph":"Learning is a social activity, we want to work in teams and show off our awesomeness.  That\u2019s harder in an online course, but Textbook-2.0 provides multiple touchpoints for feedback and sharing.  Responsive tools can catch struggling students early, connect them with tutors promptly, and follow up diligently.","assistant":"","image":"","code":"","hidden":"","youtube":"","popquiz":"","isclipboard":0,"datelastedit":""}
    {"version":"1.00","table":"paragraphs","uniq":38,"stepuniq":6,"title":"","sequence":30,"competency":"","paragraph":"##Plan for Growth##\\r\\nI plan to build Textbook 2.0 in three overlapping phases, roughly \u2018build the tool\u2019, \u2018write a Textbook-2.0\u2019, and \u2018trial with students\u2019.  \\r\\n\\r\\nSuccess will be measured by the extent I am able to systematically improve the Textbook through granular feedback on content, engagement, and processes.\\r\\n","assistant":"","image":"","code":"","hidden":"","youtube":"","popquiz":"","isclipboard":0,"datelastedit":""}
    {"version":"1.00","table":"paragraphs","uniq":39,"stepuniq":6,"title":"","sequence":40,"competency":"","paragraph":"If I am successful, then I will quickly launch a second project to build a larger community of users, and to recruit researchers for iterative investigations into responsive education and embedded behavioral interventions in authentic, context-rich situations. \\r\\n\\r\\nI situate my interest in \u2018Educational Design Research\u2019 which uses spiral steps of taking action and doing research, and holds that the social world can only be fully understood by trying to change it.  ","assistant":"","image":"","code":"","hidden":"","youtube":"","popquiz":"","isclipboard":0,"datelastedit":""}
    {"version":"1.00","table":"paragraphs","uniq":40,"stepuniq":6,"title":"","sequence":50,"competency":"","paragraph":"##Bringing a Course to Market##\\r\\nI hope every entrepreneur in this competition is familiar with \u201cCrossing the Chasm\u201d by Geoffrey Moore, it is the bible of bringing new technology to market.  ","assistant":"","image":"","code":"","hidden":"","youtube":"","popquiz":"","isclipboard":0,"datelastedit":""}
    {"version":"1.00","table":"paragraphs","uniq":41,"stepuniq":6,"title":"","sequence":60,"competency":"","paragraph":"This project will succeed by finding \u2018bowling alley\u2019 markets, related pools of teachers and parents willing to invest their student\u2019s time in taking this course, and that talk to each other, building word of mouth.\\r\\n\\r\\nRealistically, I will not get schools to use the course until I have compelling results.  And Moore\u2019s insight is critical here \u2013 results from homeschooling and academia are NOT compelling.  Schools want to see other schools using Textbook 2.0.  \\r\\n","assistant":"","image":"","code":"","hidden":"","youtube":"","popquiz":"","isclipboard":0,"datelastedit":""}
    {"version":"1.00","table":"paragraphs","uniq":42,"stepuniq":6,"title":"","sequence":70,"competency":"","paragraph":"I have a path to the early market \u2013 my Facebook posse, and their home-schooling friends.  I will round up volunteer programmers as tutors, and plan to launch an online  semester for \u2018Early-Adopter\u2019 home-schoolers in September 2024.\\r\\n\\r\\nThen I need to find bowling alleys.  Engaging Moodle\u2019s large community will be my first priority.  The Learning Engineering community is another conduit.  \\r\\n","assistant":"","image":"","code":"","hidden":"","youtube":"","popquiz":"","isclipboard":0,"datelastedit":""}
    {"version":"1.00","table":"paragraphs","uniq":43,"stepuniq":6,"title":"","sequence":80,"competency":"","paragraph":"Offering free licensing and following Moodle\u2019s strict security model will make it easy for an adventurous teacher to slip Textbook 2.0 into a less-regulated school (perhaps a private or charter school).   We will see.\\r\\n","assistant":"","image":"","code":"","hidden":"","youtube":"","popquiz":"","isclipboard":0,"datelastedit":""}
    {"version":"1.00","table":"paragraphs","uniq":44,"stepuniq":6,"title":"","sequence":90,"competency":"","paragraph":"##Budget##\\r\\nI have asked for &#36;100, and will likely use it to go out dancing with my wife.  A larger award would not affect my plans, but could be career-changing for a young grad student.  Give it to her.  \\r\\n\\r\\nI am already a winner from this competition.  The effort of writing and re-writing these proposals has sharpened my thinking and reshaped the project in many ways.  So, Thank You.\\r\\n","assistant":"","image":"","code":"","hidden":"","youtube":"","popquiz":"","isclipboard":0,"datelastedit":""}
    {"version":"1.00","table":"paragraphs","uniq":45,"stepuniq":6,"title":"","sequence":100,"competency":"","paragraph":"Still, winning this competition would have great value.  I will ask parents to trust their child\u2019s time to a project that won in a &#36;4 Million competition.  No one will ever ask me how much I received.","assistant":"","image":"","code":"","hidden":"","youtube":"","popquiz":"","isclipboard":0,"datelastedit":""}
    {"version":"1.00","table":"paragraphs","uniq":46,"stepuniq":6,"title":"","sequence":110,"competency":"","paragraph":"##Timeline for Execution##\\r\\nIf you are reading in the prototype, you have already noticed that it is clunky and unresponsive.  It is a throwaway, and I am just starting a rewrite of the student experience.\\r\\n","assistant":"","image":"","code":"","hidden":"","youtube":"","popquiz":"","isclipboard":0,"datelastedit":""}
    {"version":"1.00","table":"paragraphs","uniq":47,"stepuniq":6,"title":"","sequence":120,"competency":"","paragraph":"My first editor design was ineffective for writing this proposal, and I rewrote big chunks as I understood problems better.  Writing the proposal in the editing tool was a rich learning experience.","assistant":"","image":"","code":"","hidden":"","youtube":"","popquiz":"","isclipboard":0,"datelastedit":""}
    {"version":"1.00","table":"paragraphs","uniq":48,"stepuniq":6,"title":"","sequence":130,"competency":"","paragraph":"On my current schedule, I will transition from \u2018mostly building the tool\u2019 to \u2018mostly writing the course\u2019 in spring 2022.  Assuming I can create an hour\u2019s worth of material every two weeks, I will have enough material for a one-semester trial course by mid-2024.  \\r\\n\\r\\nI will then launch Phase II, recruiting teachers, parents, and students from my Facebook group, and researchers from the Learning Engineering community.","assistant":"","image":"","code":"","hidden":"","youtube":"","popquiz":"","isclipboard":0,"datelastedit":""}
    {"version":"1.00","table":"paragraphs","uniq":49,"stepuniq":6,"title":"","sequence":15,"competency":"","paragraph":"","assistant":"","image":"","code":"","hidden":"","youtube":"","popquiz":"","isclipboard":0,"datelastedit":""}
    {"version":"1.00","table":"paragraphs","uniq":50,"stepuniq":1,"title":"","sequence":10,"competency":"","paragraph":"##Proposal Summary##\\r\\nI propose an authoring tool for writing next-generation interactive online STEM Textbooks.  \\r\\nTextbooks are the bedrock of Education.  But Textbooks have not changed much since Gutenberg.  We no longer cut and paste with scissors and a pot of glue.  Typesetting is faster. We replaced paper with PDF.  That\u2019s about it.\\r\\n\\r\\nTextbooks with interactive widgets are emerging. They are definitely better than a traditional textbook, but only in the linear way text-with-pictures is better than text.\\r\\n","assistant":"","image":"","code":"","hidden":"","youtube":"","popquiz":"","isclipboard":0,"datelastedit":""}
    {"version":"1.00","table":"paragraphs","uniq":51,"stepuniq":1,"title":"","sequence":60,"competency":"","paragraph":"##Hello World##\\r\\nThere is a tradition that the first program you write in any new language is 'Hello World'.  This dates back to [Dennis Richie](https:\/\/www.economist.com\/babbage\/2011\/10\/20\/printfgoodbye-dennis) who designed the 'c' language.  \\r\\n\\r\\nLet's write that program here.  The following is JavaScript (actually TypeScript).  The first line brings in a library, and the second line uses that library to print on the Canvas.","assistant":"","image":"{\"imageName\":\"dennis.png\",\"imagealt\":\"\",\"imagetitle\":\"\",\"imagecaption\":\"\",\"ccOption\":\"\",\"ccVersion\":\"\",\"ccComment\":\"\",\"ccAuthor\":\"\",\"ccSource\":\"\",\"ccCaption\":\"\",\"dnloadDate\":\"\"}","code":"","hidden":"","youtube":"","popquiz":"","isclipboard":0,"datelastedit":""}
    {"version":"1.00","table":"paragraphs","uniq":54,"stepuniq":1,"title":"","sequence":40,"competency":"","paragraph":"##A Peek at the Prototype##\\r\\n\\r\\nYou are looking at the first page of a Textbook [2.0|2 dot 0], from the student's point of view.  It represents about 10 minutes of work, and a student will work through several pages like this each day.\\r\\n\\r\\nIt's not difficult to create a page like this.  But a two-semester course requires between 500 and 1000 pages, which is a very different matter.  \\r\\n\\r\\n\\r\\nThis is the only asset on a Moodle server, but you should imagine a whole school\u2019s worth of activities.  ","assistant":"","image":"","code":"","hidden":"","youtube":"","popquiz":"","isclipboard":0,"datelastedit":""}
    {"version":"1.00","table":"paragraphs","uniq":57,"stepuniq":1,"title":"","sequence":80,"competency":"","paragraph":"To move it into the editor, click on the 'COPY' icon on the left of the code.  Then you can edit and run it from the editor. \\r\\n\\r\\nTry playing with the code in the editor.  Maybe change \"Hello World\" to something else, being careful to keep the opening and closing quotes.   \\r\\n\\r\\nBelow is a slightly more complex program, using the [JsxGraph | j s x graph](https:\/\/jsxgraph.uni-bayreuth.de\/wp\/index.html) dynamic math library.  Code like that would normally be hidden.  Try it, and play with the sliders.  \\r\\n\\r\\nThere are other libraries built into this Textbook, including the [BabylonJS | Babylon J S](https:\/\/www.babylonjs.com\/) [3D|3 d] Game Engine.","assistant":"","image":"","code":"","hidden":"","youtube":"","popquiz":"","isclipboard":0,"datelastedit":""}
    {"version":"1.00","table":"paragraphs","uniq":60,"stepuniq":1,"title":"","sequence":90,"competency":"","paragraph":"","assistant":"","image":"","code":"{\"codeCopyable\":\"\",\"codeRunable\":\"\",\"codeMessage\":\"\",\"codeMustSolve\":\"\",\"codeHidden\":\"\",\"codePublic\":\"var brd1 = JXG.JSXGraph.initBoard(\\\"canvasdiv\\\", {axis:true, boundingbox: [-8, 4, 8, -4]});\\nvar s = brd1.create(\\\"slider\\\",[[1,3],[5,3],[1,10,50]],{name:\\\"n\\\",snapWidth:1});\\nvar a = brd1.create(\\\"slider\\\",[[1,2],[5,2],[-10,-3,0]],{name:\\\"start\\\"});\\nvar b = brd1.create(\\\"slider\\\",[[1,1],[5,1],[0,2*Math.PI,10]],{name:\\\"end\\\"});\\nvar f = function(x:number){ return Math.sin(x); };\\nvar plot = brd1.create(\\\"functiongraph\\\",[f,function(){return a.Value();}, function(){return b.Value();}]);\\n\\nvar os = brd1.create(\\\"riemannsum\\\",[f,\\n    function(){ return s.Value();}, function(){ return \\\"left\\\";},\\n    function(){return a.Value();},\\n    function(){return b.Value();}\\n    ],\\n    {fillColor:\\\"#ffff00\\\", fillOpacity:0.3});\\n\\nbrd1.create(\\\"text\\\",[-6,-3,function(){ return \\\"Sum=\\\"+(JXG.Math.Numerics.riemannsum(f,s.Value(),\\\"left\\\",a.Value(),b.Value())).toFixed(4); }]);\\n\",\"codeDeclarations\":\"\"}","hidden":"","youtube":"","popquiz":"","isclipboard":0,"datelastedit":""}
    {"version":"1.00","table":"paragraphs","uniq":61,"stepuniq":1,"title":"","sequence":70,"competency":"","paragraph":"","assistant":"","image":"","code":"{\"codeCopyable\":\"\",\"codeRunable\":\"\",\"codeMessage\":\"\",\"codeMustSolve\":\"\",\"codeHidden\":\"\",\"codePublic\":\"let v = Mathcode.VT52()\\nv.print(\\\"hello world\\\")\",\"codeDeclarations\":\"\"}","hidden":"","youtube":"","popquiz":"","isclipboard":0,"datelastedit":""}
    {"version":"1.00","table":"paragraphs","uniq":62,"stepuniq":1,"title":"","sequence":95,"competency":"","paragraph":"There is a blue button on the top line labeled 'CourseBuilder'.  Normally only the Author would see it.  If you click it, you will be in the Author's corkboard.   Look for a green button with a '1' and click that to see the source of this page.\\r\\n\\r\\nTutors and Proctors have their own buttons too.","assistant":"","image":"","code":"","hidden":"","youtube":"","popquiz":"","isclipboard":0,"datelastedit":""}
        `
    return (ret)

}
