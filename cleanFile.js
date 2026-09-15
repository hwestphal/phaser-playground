// tsxgraph.d.ts.txt should NOT have any 'export' statements, confuses Monaco

const fs = require('fs');
const readline = require('readline');

let output = ''

const inFilePath = 'src/extraLibs/tsxgraph.d.ts'
const outFilePath = 'src/extraLibs/tsxgraph.d.ts.txt'

let lineNo = 0

// read the input
const allFileContents = fs.readFileSync(inFilePath, 'utf-8');
allFileContents.split(/\r?\n/).forEach(line => {


    if (line.includes('export ')){    // remove exports
        line = line.replace('export','')
    }

    output += line + "\r\n"
});




// Remove the old file
fs.unlink(outFilePath, (err) => {
    if (err) {
        console.error(`Error removing file: ${err}`);
        return;
    }
})


// all done, write it out
fs.writeFile(outFilePath, output, err => {
    if (err) {
        console.error(err);
    } else {
        // file written successfully
    }
});