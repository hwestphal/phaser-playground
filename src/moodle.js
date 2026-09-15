"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.talk_to_moodle = void 0;
const baseURL = "http://localhost/moodle";
const token = '760ed1fbee1280b887e6628691cca74e'; // tom berend's token
const logdata = JSON.stringify(`[
                {
                    color: "red",
                    value: "#f00"
                },
                {
                    color: "green",
                    value: "#0f0"
                },
                {
                    color: "blue",
                    value: "#00f"
                },
                {
                    color: "cyan",
                    value: "#0ff"
                },
                {
                    color: "magenta",
                    value: "#f0f"
                },
                {
                    color: "yellow",
                    value: "#ff0"
                },
                {
                    color: "black",
                    value: "#000"
                }
            ]`);
// let functionname = 'mod_mathcode_view_page';
// let serverUrl = domainname + '/webservice/rest/server.php';
async function talk_to_moodle() {
    console.log('%c init moodle query', 'background-color:chartreuse');
    document.addEventListener("DOMContentLoaded", function () {
        var domainname = 'http://localhost/moodle';
        let functionname = 'mod_mathcode_write_log_record';
        let serverUrl = domainname + '/webservice/rest/server.php';
        let formData = new FormData(); // Currently empty
        formData.append('wstoken', token);
        formData.append('wsfunction', functionname);
        formData.append('moodlewsrestformat', 'json');
        formData.append('payload', logdata);
        function reqListener() {
            console.log('%c received moodle query', 'background-color:chartreuse', this.responseText);
        }
        var oReq = new XMLHttpRequest();
        oReq.addEventListener("load", reqListener);
        oReq.open("POST", serverUrl);
        oReq.send(formData);
        console.log('%c sent moodle query', 'background-color:chartreuse');
    });
}
exports.talk_to_moodle = talk_to_moodle;
//# sourceMappingURL=moodle.js.map