
import { serverFileSystem } from './runtime'
import { Scorm } from './SCORM_LOCAL'
import { Runtime } from './runtime'



// TODO: change URI addresses to be configurations
const lessonURI = 'http://localhost/baby/baby-scorm/lessons/'
const assetsURI = 'http://localhost/baby/baby-scorm/assets/'

const studentID = '00001'
const firstName = 'Tom '
const lastName = 'Berend'

export const config = {
    helpline: 'Discord',
    assetURI: 'http://localhost/baby/baby-scorm/assets/'

} 


export interface ITag {
    tag: string,   // always lowercase
    params: {[key: string]: any},
    rawvalue: string,
    textvalue: string,
    speechvalue: string,
    url: string,
    innerTags: string[]  // array of internal tags <span>, <ml>, and some others
}



///////////////////////////////////////////////////////
/////////// load up the (static) lessons //////////////
///////////////////////////////////////////////////////

//TODO: needs to be driven from manifest




console.log('Starting runtime in T.ts')
let t = new Runtime()




