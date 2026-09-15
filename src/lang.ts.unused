// this is just a wrapper for work I need to do later
// if I want to support multi-lang, Moodle has most of the
// translations I need
//
// the moodle call used in JS is something like this:
//
//            str.get_string('loginfo', 'tool_analytics').then(function(langString) {
//
// I don't want to go to the server every time

export class LangString {

    testGetString() {
        let payload = JSON.stringify(['legacyfilesactive', 'page'])
        this.AJAXcall('translate', payload)

    }

    async get_string(text: string, component: string) {   // returns a Promise
        return new Promise(resolve => {
            setTimeout(() => {
                resolve('resolved');
            }, 2000);
        });
    }


    // get_string('legacyfilesactive', 'mathcode')


    AJAXcall(action: string, payload: string) {

        console.log('in AJAXcall', action, payload)

        let JsonData = JSON.stringify(payload)
        // console.log('JsonData:', JsonData)

        let xhr = new XMLHttpRequest();
        // let formData = new FormData(); // Currently empty

        xhr.open("POST", "ajax.php");
        //Send the proper header information along with the request
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        // xhr.setRequestHeader("Content-type", "application/json");
        xhr.onload = function() {
            console.log(`%c received from AJAX `, `background-color:red;color:white;`, this.responseText)
        }
        xhr.send(`action=${action}&payload=${payload}`);
        // xhr.send(JsonData);
    }

}