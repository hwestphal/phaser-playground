
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