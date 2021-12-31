import { scorm } from "@gamestdio/scorm";

////////// mandatory LMS data
// cmi.core.student_id
// cmi.core.student_name
// cmi.core.lesson_location                 // bookmark
// cmi.core.credit                          // 'credit' | 'no-credit'
// cmi.core.lesson_status                   // 'passed' | 'completed' | 'failed' | 'incomplete' | 'browsed' | 'not attempted'
// cmi.core.entry                           // 'ab-initio' | 'resume'
// cmi.core.score.raw                       // a score that makes sense to the SCO (eg: %completion * avg score)
// cmi.core.score.max                       // max score student could have received
// cmi.core.score.min                       // min score student could have received
// cmi.core.total_time                      // initialize and keep adding session time


////////// optional LMS data
// cmi.core.lesson_mode                     // 'browse' | 'normal' | 'review'
// cmi.core.exit                            // 'time-out' | 'suspend' | 'logout'
// cmi.core.session_time                    // time spent in the SCO when they leave it (write periodically)
// cmi.comments                             // free-form comments from SCO
// cmi.comments_from_lms                    // free-form comments from LMS (from instructor?)
//   ... and lots more

// set configuration options
scorm.configure({
    version: '1.2',     // we are targeting 1.2
    debug: true
});

// initialize connection with parent/opener windows
scorm.initialize()


scorm.get('cmi.core.something')

scorm.set('cmi.core.lesson_status', 'Not Attempted');
scorm.commit();

scorm.status('cmi.core.something')
scorm.getLastError()

// finish e-learning session
scorm.terminate()

// scorm.getErrorString(errorCode)
// scorm.getDiagnostic((errorCode)



/////////////////////////////////////////////////////////////
// Testing
// Create a free account on SCORM Cloud
// Download and include one of the XML Schema Definition files into your package.
// Edit the imsmanifest.xml to meet your needs.
// Upload your e-learning course to SCORM Cloud.




// this stuff is tracked and sent back to the LMS

// lesson_location (where learner left off)
// suspend_data (bookmark with the specific information e.g. paragraph)
// lesson_status (pass, fail, complete, incomplete)
// session_time and total_time
// score_raw (score learner got)
// mastery_score (passing score)
// interactions (individual answers to exam questions, time spent etc.)

// status of the learner of a specific module (the smallest unit of eLearning)

// incomplete
// completed
// passed
// Failed

// check out this packager when you are ready....   https://github.com/Ivacko/node-scorm-packager

////////////// definitions
// "activities" - everything in the SCORM manifest
//          a tree with "clusters" of "deliverable" (also called "item")
// "assets" - reusable stuff that the LMS doesn't track
// "choice navigation" - does learner get to choose his path?
// "data model"   exchange data points, like 'cmi.completion_status'
// "descriptor files" describe content to LMS,  extensions are:  *.au, *.crs, *.des, *.cst.
// "PENS" - publishing standard for one-click publishing to LMS
// "PIF" - "Package Interchange File", a content package  in ZIP for delivery