
import { serverFileSystem } from './runtime'
import { Scorm } from './SCORM_LOCAL'
import { Runtime } from './runtime'


// TODO remove this when ES2021 becomes available
interface String {
    /**
     * Replace all instances of a substring in a string, using a regular expression or search string.
     * @param searchValue A string to search for.
     * @param replaceValue A string containing the text to replace for every successful match of searchValue in this string.
     */
    replaceAll(searchValue: string | RegExp, replaceValue: string): string;

    /**
     * Replace all instances of a substring in a string, using a regular expression or search string.
     * @param searchValue A string to search for.
     * @param replacer A function that returns the replacement text.
     */
    replaceAll(searchValue: string | RegExp, replacer: (substring: string, ...args: any[]) => string): string;
}



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




