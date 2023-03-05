/////////////////////////////////////////////////////////////////////////////////////
////////////////////// speech support ///////////////////////////////////////////////

export class OnClickSay {
    synth = window.speechSynthesis
    synthRunning = false // don't want two instances
    synthCancelled = false // if cancelled then don't restart
    voices: any[]
    englishVoices: any[]

    constructor() {
        this.voices = []
        this.englishVoices = []
        this.loadVoicesWhenAvailable()

    }

    // we need to load the voices before we can use them
    loadVoicesWhenAvailable() {
        console.log('loadVoicesWhenAvailable() ')
        this.voices = this.synth.getVoices()
        if (this.voices.length !== 0) {
            // console.log('voices already loaded')
            // console.log('voices', voices)
        } else {
            // console.log('loading voices')
            setTimeout(() => {
                this.loadVoicesWhenAvailable()
            }, 10)
        }
    }

    onClickSay(utterance: string, voiceN: number = 0) {
        // console.log('arrived in onClickSay', utterance)
        if (this.voices === undefined) {
            alert('Speech not ready yet, still loading voices.')
            return
        }

        this.voices = this.synth.getVoices()
        this.voices.forEach(voice => {
            // console.log(voice.voiceURI)
            if (voice.voiceURI.toLowerCase().indexOf('english') > 0) {
                // console.log(voice)
                this.englishVoices.push(voice)
            }
        })

        // if (this.synthRunning) {     // someone clicked, likelywants to STOP the playback
        //     this.synthCancelled = true
        //     return
        // }
        this.synthCancelled = false
        this.speakResponse(utterance, voiceN)
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

    sayit(selectedVoice: number = 0) {

        // console.log(`sayit(${selectedVoice})`)

        if (!this.synthRunning) {
            this.synthCancelled = true
            speechSynthesis.cancel() // if it errors, this clears out the error.
        }
        let msg = new SpeechSynthesisUtterance()

        // 0:  US english
        // 1:  UK english male
        // 2:  UK english female

        msg.voice = this.englishVoices[selectedVoice] // Note: some voices don't support altering params
        msg.lang = this.englishVoices[selectedVoice].lang  // usually en-US or en-GB
        msg.volume = 1 // 0 to 1
        msg.rate = 1 // 0.1 to 1.0
        msg.pitch = .9 // 0 to 2
        msg.onstart = (event) => {
            this.synthRunning = true
            // console.log(`'Speech Starts ${event}`)
        }
        msg.onend = (event) => {
            this.synthRunning = false
            // console.log(`Speech Ends ${event}`)
        }
        msg.onerror = (event) => {
            this.synthRunning = false
            // console.assert(false, `Errored ${event}`)
        }
        msg.onpause = (event) => {
            this.synthRunning = false
            // console.assert(false, `paused ${event}`)
        }
        msg.onboundary = (event) => {
            // console.assert(false, `onboundary ${event}`)
        }
        return msg
    }

    // hard coded
    //  voiceN 0 : US English
    //         1 : UK English Male
    //         2 : UK English Female

    speakResponse(text: string, voiceN: number) {
        let wasRunning = this.synthRunning
        speechSynthesis.cancel() // if it errors, this clears out the error.
        // not running now

        if (!wasRunning) {
            this.synthRunning = true // try to prevent a second speaker from starting
            // split the line on colon, exclaim, question, dash, rejoin on period, and finally split on period
            // BUT NOT COMMA, it makes the text disjointed
            let sentences = text.split(':').join('.').split('!').join('.').split('?').join('.').split(' - ').join('.').split('.')
            // i think i could have split with regex, but
            for (let i = 0; i < sentences.length; i++) {

                // very rare special case for a long sentence with no punctuation, break it into two on a spac
                if (sentences[i].length > 250) {  // a long sentence
                    let toSay1 = this.sayit(voiceN)
                    toSay1.text = this.splitLongSentence(sentences[i], 0)
                    speechSynthesis.speak(toSay1)
                    let toSay2 = this.sayit(voiceN)
                    toSay2.text = this.splitLongSentence(sentences[i], 1)
                    speechSynthesis.speak(toSay2)
                } else {
                    // sentence broken on punctuations seems short enough
                    let toSay = this.sayit(voiceN)  // also sets voice as a side effect, bleech
                    toSay.text = sentences[i]
                    speechSynthesis.speak(toSay)
                }
            }
            this.synthRunning = false
        }
    }

    splitLongSentence(s: string, n: number) {


        let middle = Math.floor(s.length / 2);
        let before = s.lastIndexOf(' ', middle);  // look for space near middle
        let after = s.indexOf(' ', middle + 1);

        if (middle - before < after - middle) {
            middle = before;
        } else {
            middle = after;
        }

        // return either the first part or the second part
        // console.log('splitLong',s,n,s.slice(0, middle),s.slice(middle + 1))
        return (n == 0) ? s.slice(0, middle) : s.slice(middle + 1);
    }

}
