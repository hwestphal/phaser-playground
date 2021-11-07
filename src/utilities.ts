/////////////// global utility ////////////////////


// a HostMsg is usually a log entry, but could be anything
export interface HostMsg {
    action: string;     // usually 'log'
    datacode: number;
    data01?: string;
    data02?: string;
    data03?: string;
    data04?: string;
    data05?: string;
    data06?: string;

    step?: number;
    activity?: number;
    topic?: number
}


export class Log {
    
    static prevStep = 0
    static prevActivity = 0
    static prevTopic = 0
    
    
    //////////  numerics for 'datacode'
    static Error = -1
    static ClickSpeaker = 1000
    
    static NotReadyToReflect = 1001
    static ReadyToReflect = 1002
    static CompleteStep = 1005

    static EditorRun = 1020
    
    
    static write(payload: HostMsg) {
        
        console.log('in writeMoodleLog', payload)
        
        // a bit of a hack.  sometimes we don't know the step, activity, topic
        // (for example, working in the editor and running code)
        // but we want to be able to query the log for all records
        // so we simply use the PREVIOUS step, activity, topic (usually that got us here)

        // step
        if (payload.step !== undefined)
            this.prevStep = payload.step   // save latest step
        else
            payload.step = this.prevStep    // step unknown, use previous one
        // activity    
        if (payload.activity !== undefined)
            this.prevActivity = payload.activity
        else
            payload.activity = this.prevActivity
        // topic    
        if (payload.topic !== undefined)
            this.prevTopic = payload.topic
        else
            payload.topic = this.prevTopic



        let JsonData = JSON.stringify(payload)
        // console.log('JsonData:', JsonData)

        let xhr = new XMLHttpRequest();
        // let formData = new FormData(); // Currently empty

        xhr.open("POST", "ajax.php", true);
        //Send the proper header information along with the request
        // xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.setRequestHeader("Content-type", "application/json");

        xhr.send(JsonData);
    }

}