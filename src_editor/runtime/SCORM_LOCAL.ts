/**
 * Based on pipwerks SCORM Wrapper for JavaScript
 * Created by Philip Hutchison, January 2008-2016
 */


// examples

// // get the learner's name
// var name = doGetValue("cmi.learner_name");
// // set the score for the SCO
// var score = ".85";
// doSetValue("cmi.score.scaled", score);
// // mark the SCO as passed
// doSetValue("cmi.success_status", "passed");
// // look up the bookmark of a SCO
// var bookmark = doGetValue("cmi.location");
// // store the current state data of the SCO to be used after resuming.
// // „save this data‟ refers to a string stored in the LMS that upon
// // resumption of the course will be fetched and used to initialize the
// // content
// doSetValue("cmi.suspend_data", “save this data”);


////// record every interaction on a multiple-choice test

// Using interactions, the following code is required to be implemented in the SCO:
// // Find an array index to use for the new interaction. This is
// // done by checking how many exist and using that as the next
// // available index in the array.
// var numInts = doGetValue("cmi.interactions._count");
// // Create the new one. The id must be a valid Uniform Resource
// // Identifier (URI). In general, it is a short string (no spaces)
// // that can be used to identify the interaction in an external
// // list. A list of all the interaction elements and their types
// // can be found in RTE table 4.2.9a
// var id = "example-question-1";
// doSetValue("cmi.interactions." + numInts + ".id", id);
// // Set the type of interaction. The options include:
// // true-false, choice, fill-in, long-fill-in, likert, matching,
// // performance sequencing, numeric, other (see RTE table 4.2.9a)
// doSetValue("cmi.interactions." + numInts + ".type", "choice");
// // description is typically the question asked or task
// // description
// doSetValue("cmi.interactions." + numInts + ".description",
// "Which of the following cities are in Texas?");
// // The correct responses array contains a list of possible
// // correct answers. Each correct answer has a pattern specific to
// // the type defined above. These patterns are defined in
// // RTE table 4.2.9a. The simplest example is shown below: A
// // multiple choice response with a single correct answer.
// doSetValue("cmi.interactions." + numInts + ".correct_responses.0.pattern",
// "Austin");
// // When the learner submits their answer, you (the programmer)
// // must capture this response and store it in the
// // learner_response field of the interaction.
// doSetValue("cmi.interactions." + numInts + ".learner_response",
// "SantaFe");
// // An interaction also stores the result. The values may be:
// // correct, incorrect, unanticipated, neutral, or a real number.
// // programming logic of the SCO will determine
// // the result of the learner's answer and store it here.
// doSetValue("cmi.interactions." + numInts + ".result",
// "incorrect");

// This example is then repeated for each tested item in the assessment.









/////////////// SCORM 2004 4th Edition  API Signature
// Initialize( “” ) : bool – Begins a communication session with the LMS.
// Terminate( “” ) : bool – Ends a communication session with the LMS.
// GetValue( element : CMIElement ) : string – Retrieves a value from the LMS.
// SetValue( element : CMIElement, value : string) : string – Saves a value to the LMS.
// Commit( “” ) : bool – Indicates to the LMS that all data should be persisted (not required).
// GetLastError() : CMIErrorCode – Returns the error code that resulted from the last API call.
// GetErrorString( errorCode : CMIErrorCode ) : string – Returns a short string describing the specified error  code.
// GetDiagnostic( errorCode : CMIErrorCode ) : string – Returns detailed information about the last error that occurred.


// information we might ask from the LMS....

////////// check wether learner has ever started this course
// cmi.entry (ab_initio, resume, “”, RO) Asserts whether the learner has previously accessed the SCO

///////// load and store data about the course between sessions
// cmi.suspend_data (characterstring (SPM: 64000), RW) Provides space to store and retrieve data between learner sessions

///////// learner name?
// cmi.learner_id (long_identifier_type (SPM: 4000), RO) Identifies the learner on behalf of whom the SCO was launched
// cmi.learner_name (localized_string_type (SPM: 250), RO) Name provided for the learner by the LMS



// information we should send to the LMS
// cmi.completion_status (“completed”, “incomplete”, “not attempted”, “unknown”, RW) Indicates whether the learner has completed the SCO

/// interactions
/// id - The question identifier. This is used to associate the question to a database or master list of questions.
/// description - A description of the interaction. This might be the question presented or a description of the task given to the learner.
/// type - Type of question, e.g. multiple-choice, true/false, matching, etc.
/// timestamp – The time when this item was presented to the learner
/// correct_responses - Defines an array of correct responses to be presented.
/// learner_response – What the learner actually answered
/// result - Whether the learner’s response was correct or not
/// latency – How long it took the le

// cmi.interactions.n.id (long_identifier_type (SPM: 4000), RW) Unique label for the interaction
// cmi.interactions.n.description (localized_string_type (SPM: 250), RW) Brief informative description of the interaction
// cmi.interactions.n.type (“true-false”, “choice”, “fill-in”, “long-fill-in”, “matching”, “performance”, “sequencing”, “likert”, “numeric” or “other”, RW) Which type of interaction is recorded
// cmi.interactions.n.timestamp (time(second,10,0), RW) Point in time at which the interaction was first made available to the learner for learner interaction and response
// cmi.interactions.n.correct_responses._count (non-negative integer, RO) Current number of correct responses being stored by the LMS for this interaction
// cmi.interactions.n.correct_responses.n.pattern (format depends on interaction type, RW) One correct response pattern for the interaction
// cmi.interactions.n.weighting (real (10,7), RW) Weight given to the interaction relative to other interactions
// cmi.interactions.n.learner_response (format depends on interaction type, RW) Data generated when a learner responds to an interaction
// cmi.interactions.n.result (“correct”, “incorrect”, “unanticipated”, “neutral”) or a real number with values that is accurate to seven significant decimal figures real. , RW) Judgment of the correctness of the learner response
// cmi.interactions.n.latency (timeinterval (second,10,2), RW) Time elapsed between the time the interaction was made available to the learner for response and the time of the first response


/// report progress by module (SCO). use one or the other....
// cmi.progress_measure (real (10,7) range (0..1), RW) Measure of the progress the learner has made toward completing the SCO
// cmi.completion_status (“completed”, “incomplete”, “not attempted”, “unknown”, RW) Indicates whether the learner has completed the SCO

////// an 'objective' is really just a module

// cmi.objectives.n.id (long_identifier_type (SPM: 4000), RW) Unique label for the objective
// cmi.objectives.n.score.scaled (real (10,7) range (-1..1), RW) Number that reflects the performance of the learner for the objective
// cmi.objectives.n.success_status (“passed”, “failed”, “unknown”, RW) Indicates whether the learner has  mastered the objective
// cmi.objectives.n.completion_status (“completed”, “incomplete”, “not attempted”, “unknown”, RW) Indicates whether the learner has completed the associated objective
// cmi.objectives.n.progress_measure (real (10,7) range (0..1), RW) Measure of the progress the learner has made toward completing the objective
// cmi.objectives.n.description (localized_string_type (SPM: 250), RW) Provides a brief informative description of the objective

//////// track time on task
// cmi.session_time (timeinterval (second,10,2), WO) Amount of time that the learner has spent in the current learner session for this SCO
// cmi.total_time (timeinterval (second,10,2), RO) Sum of all of the learner’s session times accumulated in the current learner attempt

// cmi.exit (timeout, suspend, logout, normal, “”, WO) Indicates how or why the learner left the SCO

// cmi.location (characterstring (SPM: 1000), RW) The learner’s current location in the SCO

//////// assessments


let apiHandle: any = null
let isAPIFound = false

/* -------------------------------------------------------------------------
   api.find(window)
   Looks for an object named API in parent and opener windows
   Parameters: window (the browser window object).
   Returns:    Object if API is found, null if no API found
---------------------------------------------------------------------------- */

function find(win:any) {
    let API = null,
        findAttempts = 0,
        findAttemptLimit = 500,
        traceMsgPrefix = 'SCORM.API.find'

    while (
        !win.API &&
        !win.API_1484_11 &&
        win.parent &&
        win.parent != win &&
        findAttempts <= findAttemptLimit
    ) {
        findAttempts++
        win = win.parent
    }

    // If SCORM version is specified by user, look for specific API
    if (scorm.version) {
        switch (scorm.version) {
            case '2004':
                if (win.API_1484_11) {
                    API = win.API_1484_11
                } else {
                    debug(
                        traceMsgPrefix +
                        ': SCORM version 2004 was specified by user, but API_1484_11 cannot be found.',
                    )
                }

                break

            case '1.2':
                if (win.API) {
                    API = win.API
                } else {
                    debug(
                        traceMsgPrefix +
                        ': SCORM version 1.2 was specified by user, but API cannot be found.',
                    )
                }

                break
        }
    } else {
        // If SCORM version not specified by user, look for APIs

        if (win.API_1484_11) {
            // SCORM 2004-specific API.

            scorm.version = '2004' // Set version
            API = win.API_1484_11
        } else if (win.API) {
            // SCORM 1.2-specific API

            scorm.version = '1.2' // Set version
            API = win.API
        }
    }

    if (API) {
        debug(traceMsgPrefix + ': API found. Version: ' + scorm.version)
        debug('API: ' + API)
    } else {
        debug(
            traceMsgPrefix +
            ': Error finding API. \nFind attempts: ' +
            findAttempts +
            '. \nFind attempt limit: ' +
            findAttemptLimit,
        )
    }

    return API
}

/* -------------------------------------------------------------------------
   api.get()
   Looks for an object named API, first in the current window's frame
   hierarchy and then, if necessary, in the current window's opener window
   hierarchy (if there is an opener window).
   Parameters:  None.
   Returns:     Object if API found, null if no API found
---------------------------------------------------------------------------- */

function getAPI() {
    let API = null,
        win = window

    API = find(win)

    if (!API && win.parent && win.parent != win) {
        API = find(win.parent)
    }

    if (!API && win.top && win.top.opener) {
        API = find(win.top.opener)
    }

    // Special handling for Plateau
    // Thanks to Joseph Venditti for the patch
    if (!API && win.top && win.top.opener && win.top.opener.document) {
        API = find(win.top.opener.document)
    }

    if (API) {
        isAPIFound = true
    } else {
        debug("getAPI failed: Can't find the API!")
    }

    return API
}

/* -------------------------------------------------------------------------
   api.getHandle()
   Returns the handle to API object if it was previously set
   Parameters:  None.
   Returns:     Object (the api.handle variable).
---------------------------------------------------------------------------- */

function getHandle() {
    if (!apiHandle && !isAPIFound) {
        apiHandle = getAPI()
    }

    return apiHandle
}

// Public API

type SCORMconfig = {
    version?: string; // SCORM version.
    debug?: boolean;
    handleExitMode?: boolean; // Whether or not the wrapper should automatically handle the exit mode
    handleCompletionStatus?: boolean; // Whether or not the wrapper should automatically handle the initial completion status
}

export class Scorm {
    version: string = ''
    handleExitMode: boolean = true
    handleCompletionStatus: boolean = true
    isDebugActive: boolean = true
    exitStatus: any

    isActive = false
    completionStatus: any


    configure(config:SCORMconfig) {

        this.handleExitMode = (config.handleExitMode === undefined)
          ? !!config.handleExitMode
          : true

        this.handleCompletionStatus = (config.handleCompletionStatus === undefined)
          ? !!config.handleCompletionStatus
          : true

        this.isDebugActive = (config.debug === undefined)
          ? !!config.debug
          : true
    }

    initialize() {
        let success = false,
            traceMsgPrefix = 'scorm.initialize '

        debug('connection.initialize called.')

        if (!this.isActive) {
            let API = getHandle(),
                errorCode = 0

            if (API) {
                switch (this.version) {
                    case '1.2':
                        success = toBoolean(API.LMSInitialize(''))
                        break
                    case '2004':
                        success = toBoolean(API.Initialize(''))
                        break
                }

                if (success) {
                    // Double-check that connection is active and working before returning 'true' boolean
                    errorCode = this.getLastError()

                    if (errorCode !== null && errorCode === 0) {
                        this.isActive = true

                        if (this.handleCompletionStatus) {
                            // Automatically set new launches to incomplete
                            this.completionStatus = this.status()

                            if (this.completionStatus) {
                                switch (this.completionStatus) {
                                        // Both SCORM 1.2 and 2004
                                    case 'not attempted':
                                        this.status('incomplete')
                                        break

                                        // SCORM 2004 only
                                    case 'unknown':
                                        this.status('incomplete')
                                        break

                                        // Additional options, presented here in case you'd like to use them
                                        // case "completed"  : break;
                                        // case "incomplete" : break;
                                        // case "passed"     : break;    //SCORM 1.2 only
                                        // case "failed"     : break;    //SCORM 1.2 only
                                        // case "browsed"    : break;    //SCORM 1.2 only
                                }

                                // Commit changes
                                scorm.commit()
                            }
                        }
                    } else {
                        success = false
                        debug(
                            traceMsgPrefix +
                            'failed. \nError code: ' +
                            errorCode +
                            ' \nError info: ' +
                            this.getErrorString(errorCode),
                        )
                    }
                } else {
                    errorCode = this.getLastError()

                    if (errorCode !== null && errorCode !== 0) {
                        debug(
                            traceMsgPrefix +
                            'failed. \nError code: ' +
                            errorCode +
                            ' \nError info: ' +
                            this.getErrorString(errorCode),
                        )
                    } else {
                        debug(traceMsgPrefix + 'failed: No response from server.')
                    }
                }
            } else {
                debug(traceMsgPrefix + 'failed: API is null.')
            }
        } else {
            debug(traceMsgPrefix + 'aborted: Connection already active.')
        }

        return success
    }

    terminate() {
        let success = false,
            traceMsgPrefix = 'scorm.terminate '

        if (this.isActive) {
            let API = getHandle(),
                errorCode = 0

            if (API) {
                if (scorm.handleExitMode && !this.exitStatus) {
                    if (this.completionStatus !== 'completed' && this.completionStatus !== 'passed') {
                        switch (scorm.version) {
                            case '1.2':
                                success = scorm.set('cmi.core.exit', 'suspend')
                                break
                            case '2004':
                                success = scorm.set('cmi.exit', 'suspend')
                                break
                        }
                    } else {
                        switch (scorm.version) {
                            case '1.2':
                                success = scorm.set('cmi.core.exit', 'logout')
                                break
                            case '2004':
                                success = scorm.set('cmi.exit', 'normal')
                                break
                        }
                    }
                }

                // Ensure we persist the data
                success = scorm.commit()

                if (success) {
                    switch (scorm.version) {
                        case '1.2':
                            success = toBoolean(API.LMSFinish(''))
                            break
                        case '2004':
                            success = toBoolean(API.Terminate(''))
                            break
                    }

                    if (success) {
                        this.isActive = false
                    } else {
                        errorCode = this.getLastError()
                        debug(
                            traceMsgPrefix +
                            'failed. \nError code: ' +
                            errorCode +
                            ' \nError info: ' +
                            this.getErrorString(errorCode),
                        )
                    }
                }
            } else {
                debug(traceMsgPrefix + 'failed: API is null.')
            }
        } else {
            debug(traceMsgPrefix + 'aborted: Connection already terminated.')
        }

        return success
    }

    get(parameter:string) {
        let value = null,
            traceMsgPrefix = "scorm.get('" + parameter + "') "

        if (this.isActive) {
            let API = getHandle(),
                errorCode = 0

            if (API) {
                switch (scorm.version) {
                    case '1.2':
                        value = API.LMSGetValue(parameter)
                        break
                    case '2004':
                        value = API.GetValue(parameter)
                        break
                }

                errorCode = this.getLastError()

                // GetValue returns an empty string on errors
                // If value is an empty string, check errorCode to make sure there are no errors
                if (value !== '' || errorCode === 0) {
                    // GetValue is successful.
                    // If parameter is lesson_status/completion_status or exit status, let's
                    // grab the value and cache it so we can check it during connection.terminate()
                    switch (parameter) {
                        case 'cmi.core.lesson_status':
                        case 'cmi.completion_status':
                            this.completionStatus = value
                            break

                        case 'cmi.core.exit':
                        case 'cmi.exit':
                            this.exitStatus = value
                            break
                    }
                } else {
                    debug(
                        traceMsgPrefix +
                        'failed. \nError code: ' +
                        errorCode +
                        '\nError info: ' +
                        this.getErrorString(errorCode),
                    )
                }
            } else {
                debug(traceMsgPrefix + 'failed: API is null.')
            }
        } else {
            debug(traceMsgPrefix + 'failed: API connection is inactive.')
        }

        debug(traceMsgPrefix + ' value: ' + value)

        return String(value)
    }

    set(parameter:string, value:number|string) {
        let success = false,
            traceMsgPrefix = "scorm.set('" + parameter + "') "

        if (this.isActive) {
            let API = getHandle(),
                errorCode = 0

            if (API) {
                switch (scorm.version) {
                    case '1.2':
                        success = toBoolean(API.LMSSetValue(parameter, value))
                        break
                    case '2004':
                        success = toBoolean(API.SetValue(parameter, value))
                        break
                }

                if (success) {
                    if (
                        parameter === 'cmi.core.lesson_status' ||
                        parameter === 'cmi.completion_status'
                    ) {
                        this.completionStatus = value
                    }
                } else {
                    errorCode = this.getLastError()

                    debug(
                        traceMsgPrefix +
                        'failed. \nError code: ' +
                        errorCode +
                        '. \nError info: ' +
                        this.getErrorString(errorCode),
                    )
                }
            } else {
                debug(traceMsgPrefix + 'failed: API is null.')
            }
        } else {
            debug(traceMsgPrefix + 'failed: API connection is inactive.')
        }

        debug(traceMsgPrefix + ' value: ' + value)

        return success
    }

    commit() {
        let success = false,
            traceMsgPrefix = 'scorm.commit failed'

        if (this.isActive) {
            let API = getHandle()

            if (API) {
                switch (scorm.version) {
                    case '1.2':
                        success = toBoolean(API.LMSCommit(''))
                        break
                    case '2004':
                        success = toBoolean(API.Commit(''))
                        break
                }
            } else {
                debug(traceMsgPrefix + ': API is null.')
            }
        } else {
            debug(traceMsgPrefix + ': API connection is inactive.')
        }

        return success
    }

    status(status: string = '') {
        let success: any = false,
            traceMsgPrefix = 'scorm.status failed',
            cmi = '',
            action = (arguments.length === 0) ? 'get' : 'set'

        switch (scorm.version) {
            case '1.2':
                cmi = 'cmi.core.lesson_status'
                break
            case '2004':
                cmi = 'cmi.completion_status'
                break
        }

        switch (action) {
            case 'get':
                success = this.get(cmi)
                break

            case 'set':
                if (status !== null) {
                    success = this.set(cmi, status)
                } else {
                    success = false
                    debug(traceMsgPrefix + ': status was not specified.')
                }

                break

            default:
                success = false
                debug(traceMsgPrefix + ': no valid action was specified.')
        }

        return success
    }

    getLastError() {
        let API = getHandle(),
            code = 0

        if (API) {
            switch (this.version) {
                case '1.2':
                    code = parseInt(API.LMSGetLastError(), 10)
                    break
                case '2004':
                    code = parseInt(API.GetLastError(), 10)
                    break
            }
        } else {
            debug('scorm.getLastError failed: API is null.')
        }

        return code
    }

    getErrorString(errorCode:number) {
        let API = getHandle(),
            result = ''

        if (API) {
            switch (this.version) {
                case '1.2':
                    result = API.LMSGetErrorString(errorCode.toString())
                    break
                case '2004':
                    result = API.GetErrorString(errorCode.toString())
                    break
            }
        } else {
            debug('scorm.getErrorString failed: API is null.')
        }

        return String(result)
    }

    getDiagnostic(errorCode:number) {
        let API = getHandle(),
            result = ''

        if (API) {
            switch (this.version) {
                case '1.2':
                    result = API.LMSGetDiagnostic(errorCode)
                    break
                case '2004':
                    result = API.GetDiagnostic(errorCode)
                    break
            }
        } else {
            debug('scorm.getDiagnostic failed: API is null.')
        }

        return String(result)
    }
}

function toBoolean(value:any):boolean {
    switch (typeof(value)) {
        case 'object':
        case 'string':
            return /(true|1)/i.test(value)
        case 'number':
            return !!value
        case 'boolean':
            return value
        case 'undefined':
            return false
        default:
            return false
    }
}

function debug(msg:string) {
    if (scorm.isDebugActive) {
        window.console.log(msg)
    }
}

export let scorm = new Scorm()
