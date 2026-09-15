"use strict";
/////////////////////////////////////////////////////////////////////////////////////
////////////////////// speech support ///////////////////////////////////////////////
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnClickSay = void 0;
class OnClickSay {
    synth = window.speechSynthesis;
    synthRunning = false; // don't want two instances
    synthCancelled = false; // if cancelled then don't restart
    voices;
    englishVoices;
    constructor() {
        this.voices = [];
        this.englishVoices = [];
        this.loadVoicesWhenAvailable();
    }
    // we need to load the voices before we can use them
    loadVoicesWhenAvailable() {
        // console.log('loadVoicesWhenAvailable() ')
        this.voices = this.synth.getVoices();
        if (this.voices.length !== 0) {
            // console.log('voices already loaded')
            // console.log('voices', this.voices)
            this.voices.forEach(voice => {
                // console.log(voice.voiceURI)
                if (voice.voiceURI.toLowerCase().indexOf('english') > 0) {
                    // console.log(voice.voiceURI)
                    this.englishVoices.push(voice);
                }
            });
        }
        else {
            // console.log('loading voices')
            setTimeout(() => {
                this.loadVoicesWhenAvailable();
            }, 10);
        }
    }
    onClickSay(utterance, voiceN = 0) {
        // console.log('arrived in onClickSay', utterance)
        if (this.voices === undefined) {
            alert('Speech not ready yet, still loading voices.');
            return;
        }
        // if (this.synthRunning) {     // someone clicked, likelywants to STOP the playback
        //     this.synthCancelled = true
        //     return
        // }
        this.synthCancelled = false;
        this.speakResponse(utterance, voiceN);
        //
        // if (synth.speaking) { /* stop narration */
        //      /* for safari */
        //   synthRunning = false
        //   synth.cancel()
        // }
        //
        // if (!synthRunning) {
        //   synthRunning = true
        //   let utterance = new SpeechSynthesisUtterance(document.getElementById(id).innerHTML)
        //   console.log(utterance)
        //   utterance.voice = synth.getVoices()[3]
        //   utterance.voiceURI = 'native';
        //
        //   utterance.onend = function () {
        //     synthRunning = false
        //   }
        //   synth.speak(utterance)
        // }
    }
    // problem with longer speech chunks, here's a workaround
    // https://stackoverflow.com/questions/21947730/chrome-speech-synthesis-with-longer-texts
    sayit(selectedVoice = 0) {
        // console.log(`sayit(${selectedVoice})`)
        if (!this.synthRunning) {
            this.synthCancelled = true;
            speechSynthesis.cancel(); // if it errors, this clears out the error.
        }
        let msg = new SpeechSynthesisUtterance();
        // 0:  US english
        // 1:  UK english male
        // 2:  UK english female
        if (this.englishVoices.length == 0) {
            console.error('Voice annotation requires internet connection');
        }
        else {
            msg.voice = this.englishVoices[selectedVoice]; // Note: some voices don't support altering params
            msg.lang = this.englishVoices[selectedVoice].lang; // usually en-US or en-GB
            msg.volume = 1; // 0 to 1
            msg.rate = 1; // 0.1 to 1.0
            msg.pitch = .9; // 0 to 2
            msg.onstart = (event) => {
                this.synthRunning = true;
                // console.log(`'Speech Starts ${event}`)
            };
        }
        msg.onend = (event) => {
            this.synthRunning = false;
            // console.log(`Speech Ends ${event}`)
        };
        msg.onerror = (event) => {
            this.synthRunning = false;
            // console.assert(false, `Errored ${event}`)
        };
        msg.onpause = (event) => {
            this.synthRunning = false;
            // console.assert(false, `paused ${event}`)
        };
        msg.onboundary = (event) => {
            // console.assert(false, `onboundary ${event}`)
        };
        return msg;
    }
    // hard coded
    //  voiceN 0 : US English
    //         1 : UK English Male
    //         2 : UK English Female
    speakResponse(text, voiceN) {
        let wasRunning = this.synthRunning;
        speechSynthesis.cancel(); // if it errors, this clears out the error.
        // not running now
        if (!wasRunning) {
            this.synthRunning = true; // try to prevent a second speaker from starting
            // split the line on colon, exclaim, question, dash, rejoin on period, and finally split on period
            // BUT NOT COMMA, it makes the text disjointed
            let sentences = text.split(':').join('.').split('!').join('.').split('?').join('.').split(' - ').join('\n').split('.');
            // i think i could have split with regex, but
            for (let i = 0; i < sentences.length; i++) {
                // sentence broken on punctuations frequently short enough
                let toSay = this.sayit(voiceN); // also sets voice as a side effect, bleech
                toSay.text = sentences[i];
                speechSynthesis.speak(toSay);
                // longer sentences fail.
                // a known bug. The workaround is to issue a resume every 14 seconds.
                // https://stackoverflow.com/questions/57667357/speech-synthesis-problem-with-long-texts-pause-mid-speaking
                let r = setInterval(() => {
                    console.log('speech keep-alive', speechSynthesis.speaking);
                    if (!speechSynthesis.speaking) {
                        clearInterval(r);
                    }
                    else {
                        speechSynthesis.pause();
                        speechSynthesis.resume();
                    }
                }, 14000);
            }
            this.synthRunning = false;
        }
    }
}
exports.OnClickSay = OnClickSay;
//# sourceMappingURL=onClickSay.js.map