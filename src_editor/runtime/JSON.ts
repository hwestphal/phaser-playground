// Typescript is (a superset of) javascript, so you just use JSON.parse as you would in javascript:
//
// let obj = JSON.parse(jsonString);
//
// but you need an interface to cast it to a TS type
//
// interface MyObj {
//     myString: string;
//     myNumber: number;
// }
//
// let obj: MyObj = JSON.parse('{ "myString": "string", "myNumber": 4 }');
//

// There are several interaces to compose a lesson
//
//  TableOfContents   - built from the lessons, used for
//
//  Lesson
//
