// we save up log records in Window.localStorage, and bundle them back to the
// server when the activity is completed.   data is persistent.

import { talk_to_moodle } from "./moodle";

// storage is an JSON object with an array of strings.  each string is a
// JSON object (this way they can all be the 'same' as required for an array)

// i now regret having done JSON-inside-JSON, my expectation was to put more than one kind of thing in


export type  logRecord = {
    timestamp: string,

    paragraph: string,
    step: string,     // sometimes we only know the step

    datacode: number,

    data01: string,
    data02: string,
    data03: string,
    data04: string,
    data05: string,
    data06: string,
    data07: string,
}


// The keys and the values stored with localStorage are always in
// the UTF-16 DOMString format, which uses two bytes per character.
// As with objects, integer keys are automatically converted to strings.

// localStorage.setItem('myCat', 'Tom');
// const cat = localStorage.getItem('myCat');
// localStorage.removeItem('myCat');
// localStorage.clear();

// structure of logstorage is {logRecord[]}

const logObject = 'LogRecordStorage'

export class LogRecord {

    static storage = window.localStorage;

    // use this when writing to the host
    static readAndClear():string{
        let temp = LogRecord.read()
        // this.storage.clear()   /// never clear !!!
        return temp             // return whatever was in there
    }

    // non-destructive read as string, mostly for testing
    static read():string{

        let temp = localStorage.getItem(logObject);
        if(temp === null)  // might be null, convert to empty array
            temp = JSON.stringify({r:[]})   // this is our empty JSON
        return temp
    }


    // 'add' is also the factory for logRecord
    static add(
        paragraph: number,
        step: number,
        datacode: number,
        data01: string='',
        data02: string='',
        data03: string='',
        data04: string='',
        data05: string='',
        data06: string='',
        data07: string='',
    ) {

        let obj = {
            paragraph: paragraph,
            step: step,
            datacode: datacode,
            data01: data01,
            data02: data02,
            data03: data03,
            data04: data04,
            data05: data05,
            data06: data06,
            data07: data07,

        }
        let timestamp = Date.now()  // stamp now, might not get written to db for some time

        // we stringify the logRecord so we don't need to fuss with it
        let tempString = JSON.stringify(obj)

        let storage = LogRecord.read()
        let sObj:any = JSON.parse(storage)

        sObj['r'].push(tempString)  // add the object

        storage = JSON.stringify(sObj)
        localStorage.setItem(logObject,storage)

    }
}