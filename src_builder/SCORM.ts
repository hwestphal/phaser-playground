import fs from 'fs'
import path from 'path';
import colors from 'colors'
import { ITag } from '../../src_editor/runtime/T'

import {LessonToITags} from './lessonToITags'


/** this is the starting point to CREATE a SCORM package from our lessons 
 *     (it is instantiated at the bottom of this file)
*/
class CreateSCORM {

    courseIdentification = 'Writing Computer Games'
    organization = 'CommunityReading_Org'
    contact = 'tom@CommunityReading.org'
    title = 'Writing Computer Games'

    launchPage = 'dist/launchpage.html'     // 'dist' is hardcoded, and should be server 'root'

    mathLessons = [             // these are the lessons * IN ORDER *
        "Getting Started",
        "Vectors and Triangles"
    ]

    version = '1.0'
    courseInfo = 'courseinfo.JSON'
    copyright = "&copy; Community Reading, Toronto, Canada"
    licencedTo = ''


    SCORMDirectory: string
    SCOLessons: string[] = []

    lessonToItags: LessonToITags

    constructor() {

        this.lessonToItags = new LessonToITags()   // only need to instance it once

        // we build a directory called SCORM
        this.SCORMDirectory = path.join(__dirname, '../../SCORM')

        // remove the old directory if it exists
        this.rmdir(this.SCORMDirectory)

        // create a new SCORM directory
        fs.mkdir(this.SCORMDirectory, (error) => { })

        // generate each lesson within the SCO
        this.processLessons(path.join(__dirname, '../../lessons'))

        // don't need this anymore, we are building in dist
        // copy the runtime files 
        // this.copyRunTime()

        // generate the SCORM XML, which also lets us navigate between the lessons
        this.generateManifest()

        // copy the four .xsd files into it  (they are already in the manifest header)
        this.copyXsd(path.join(__dirname, 'xsdFiles'))

        // finally, add the courseinfo.JSON file
        this.createCourseInfo()

    }


    /** remove the old directory recursively, if it exists */
    rmdir(dir: string) {
        if (fs.existsSync(dir)) {       // if the folder exists
            let list = fs.readdirSync(dir);        // read the directory 
            for (var i = 0; i < list.length; i++) {
                var filename = path.join(dir, list[i]);
                var stat = fs.statSync(filename);

                if (filename == "." || filename == "..") {
                    // pass these files
                } else if (stat.isDirectory()) {
                    // rmdir recursively
                    this.rmdir(filename);
                } else {
                    // rm fiilename
                    fs.unlinkSync(filename);
                }
            }
            fs.rmdirSync(dir);
        }
    }

    /** copy the four standard xsd files into the new SCORM directory */
    copyXsd(xsdDirectory: string) {
        let list = fs.readdirSync(xsdDirectory);        // read the directory 
        for (var i = 0; i < list.length; i++) {
            var src = path.join(xsdDirectory, list[i]);
            fs.copyFileSync(src, path.join(this.SCORMDirectory, list[i]))
        }
    }

    /** process each lesson with the SCO */
    processLessons(lessonDirectory: string) {
        if (fs.existsSync(lessonDirectory)) {       // if the folder exists
            let list = fs.readdirSync(lessonDirectory);        // read the directory 

            // should be the same length as our planned lessons
            console.assert(this.mathLessons.length == list.length, colors.bold.bgRed.yellow('The planned lessons (this.mathLessons) does not match the /lessons directory'))

            for (var i = 0; i < list.length; i++) {
                console.log(colors.bold.blue(`DIRECTORY ${lessonDirectory}\\${list[i]}`))    // show that we are processing this lesson

                // make sure this lesson is in our manifest (starting at 4th char, so 01-xxx becomes xxx)
                let list_ = list[i].substring(3).replace(/_/g, " ") // replace '_' with ' '
                console.assert(this.mathLessons.includes(list_), colors.bold.bgRed.yellow(`'${list[i]} is not in our list of planned lessons (this.mathlessons)'`))

                // this isn't right yet, it's just a copy instead of exploding

                // make a directory for each lesson
                let cleanDirName = list[i].split(" ").join("_")
                this.SCOLessons.push(cleanDirName)   // our list of lessons, but with underscores
                let scormSubDirectory = path.join(this.SCORMDirectory, cleanDirName)
                fs.mkdir(scormSubDirectory, (error) => { })

                console.log('processing ', cleanDirName)

                this.processSingleLesson(path.join(lessonDirectory, list[i]), scormSubDirectory)
            }

            
        } else {
            console.error(colors.bold.bgRed.yellow(`could not find lesson directory '${lessonDirectory}'`))
        }
    }

    // don't need this anymore, we are building in dist

    // /** copy the runtime files from /dist into /SCORM */
    // copyRunTime() {

    //     let fromDir = path.join(this.SCORMDirectory, '../dist')
    //     let toDir = path.join(this.SCORMDirectory, 'dist')

    //     fs.mkdir(toDir, (error) => { })        // create a new dist in the SCORM directory
    //     let list = fs.readdirSync(fromDir);        // read the old dist directory 

    //     list.forEach((fromFile, i) => {
    //         let src = path.join(fromDir, fromFile);
    //         let dest = path.join(toDir, fromFile)
    //         console.log('about to copy ',src,dest)
    //         fs.copyFileSync(src, dest)
    //     })
    // }

    /** find every lesson in each folder, and copy it into the SCORM package */
    processSingleLesson(fromDir: string, toDir: string) {
            let list = fs.readdirSync(fromDir);        // read the directory 
            list.forEach((fromFile, i) => {
                let src = path.join(fromDir, fromFile);
                let dest = path.join(toDir, fromFile.replace('.txt','.JSON'))

                // but we don't COPY the lesson txt, we copy it as an array of ITags in a JSON file, 
                //  fs.copyFileSync(src, dest)

                console.log(colors.bold.blue(`LESSON ${src}`))    // show that we are processing this lesson

                let lessonTxt = fs.readFileSync(src,'utf8')//, (err) => {if (err) console.error(colors.bold.bgRed.yellow(`Error reading lesson file  ${err}`))})
                let lessonTags: ITag[]  = this.lessonToItags.parse(path.join(this.SCORMDirectory,'..\assets'),lessonTxt)
                fs.writeFile(dest, JSON.stringify(lessonTags), (error) => { if (error) console.error(colors.bold.bgRed.yellow(`error writing ${this.courseInfo} '${error}'`)) });

            })
        }


    /** generate the ims manifest */
    generateManifest() {
            let xml =
            `<!--  this package targets SCORM 1.2.    Big thanks to Rustici Software - http://www.scorm.com -->
    <manifest xmlns="http://www.imsproject.org/xsd/imscp_rootv1p1p2" 
            xmlns:adlcp="http://www.adlnet.org/xsd/adlcp_rootv1p2" 
            xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
            identifier="${this.courseIdentification}" 
            version="1" 
            xsi:schemaLocation="http://www.imsproject.org/xsd/imscp_rootv1p1p2 
                imscp_rootv1p1p2.xsd http://www.imsglobal.org/xsd/imsmd_rootv1p2p1 
                imsmd_rootv1p2p1.xsd http://www.adlnet.org/xsd/adlcp_rootv1p2 
                adlcp_rootv1p2.xsd">
    
        <metadata>
            <schema>ADL SCORM</schema>
            <schemaversion>1.2</schemaversion>
        </metadata>
    
        <organizations default="${this.organization}">
            <organization identifier="${this.organization}">
                <title>${this.title}</title>
                <item identifier="item_1" identifierref="resource_1">
                    <title>${this.title}</title>
                </item>
            </organization>
        </organizations>
    
        <resources>
            <resource identifier="resource_1" type="webcontent" adlcp:scormtype="sco" href="${this.launchPage}">
            `

        // we have one hard-coded file in the root
        xml += `<file href="${this.courseInfo}" />\n`      // add to our xml file

        //TODO need to build list of files in dist instead
        // // copy over the dist directory (our runtime)   ('dist' is hardcoded)
        // let list = fs.readdirSync(path.join(this.SCORMDirectory, 'dist'))
        // list.forEach((runtimeFile) => {
        //         xml += `<file href="dist/${runtimeFile}" />\n`      // add to our xml file

        // now add all the files in the other baskets
        this.SCOLessons.forEach(lesson => {
                let list = fs.readdirSync(path.join(this.SCORMDirectory, lesson))        // read each generated directory
                list.forEach((lessonFile) => {
                    xml += `<file href="${lesson}/${lessonFile}" />\n`      // add to our xml file
                })

            })

        // now add every file

        // <file href="Etiquette/Course.html"/>
        // <file href="Etiquette/course.jpg"/>
        // <file href="Etiquette/Distracting.html"/>
        //             :

        xml += `
            </resource>
        </resources>
    </manifest>
    `
        fs.writeFile(path.join(this.SCORMDirectory, 'manifest.xml'), xml, (error) => { if (error) console.error(colors.bold.bgRed.yellow(`error writing manifest.xml '${error}'`)) });
    }


    /** create the courseInfo file */
    createCourseInfo() {
        let ci = {
            lessons: this.mathLessons,
            lessonFiles: ['Getting_Started/01_00_hello_world.JSON'],   //TODO, not hardcode
            version: this.version,
            copyright: this.copyright,
            contact: this.contact,
            licencedTo: this.licencedTo,
            title: 'Writing Computer Games',
            launchPage: 'shared/launchpage.html',
            discordInvite: 'https://discord.gg/66gd2AdZkc',         // expires afteer 100 uses
            created: new Date().toDateString()
        }
        fs.writeFile(path.join(this.SCORMDirectory, this.courseInfo), JSON.stringify(ci), (error) => { if (error) console.error(colors.bold.bgRed.yellow(`error writing ${this.courseInfo} '${error}'`)) });

    }

}
// and fire it up
new CreateSCORM()