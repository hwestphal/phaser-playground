import { JSDOM } from 'jsdom'
import {LogRecord, logRecord} from '../src/logrecords'

let result = false;

// warning, this wipes out the current log record

describe("create a logrecord and try to save and restore it", () => {
    it("start with an empty store", function() {
        LogRecord.readAndClear()
        let empty =LogRecord.read()

        expect(empty ).toEqual("{\"r\":[]}")   // really ('{r:[]}')
        expect(typeof empty).toEqual('string')

        let parseempty = JSON.parse(empty)
        expect(typeof parseempty).toEqual('object')


        // ok, let's add a record
        LogRecord.add(2,3,4,'zerodata')

        let temp = LogRecord.read()
        // looks something like [
        // '[{"paragraph":2,"step":3,"datacode":4,"data01":"","data02":"","data03":"","data04":"","data05":"","data06":"","data07":""}]'

        let parse = JSON.parse(temp)
        // console.log(parse)
        // console.log(parse)
        // console.log(parse.r)
        // console.log(parse.r[0])

        // the st
        expect(typeof parse).toEqual('object')
        expect(typeof parse.r).toEqual('object')  // should be an array !?!
        expect(typeof parse.r[0]).toEqual('string')  // this is a JSON-within-JSON

        let rec = JSON.parse(parse.r[0])
        expect(rec.paragraph).toEqual(2)  // one record

        LogRecord.add(12,13,14)
        temp = LogRecord.read()   // refresh

        parse = JSON.parse(temp)
        expect(parse.r.length).toEqual(2)

        rec = JSON.parse(parse.r[0])
        expect(rec.paragraph).toEqual(2)  // first record
        rec = JSON.parse(parse.r[1])
        expect(rec.paragraph).toEqual(12)  // second record


        temp = LogRecord.readAndClear()   // all sorts of stuff comes back
        empty = LogRecord.read()
        expect(empty ).toEqual("{\"r\":[]}")   // really ('{r:[]}')
    })
})

