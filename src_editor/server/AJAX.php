<?php
// this is the server interface, mostly for serving database stuff

// test it directly in the browser, for example
//      http://localhost/gamecode/php/AJAX.php?cmd=getName&P1=503

define('_KELLER', true); // or die;

////////////////////////////////////////////////////////////////////////////////
//// to check for parsing errors, run this from the browser line
////    http://localhost/keller/www/AJAX.php?cmd=test;
////////////////////////////////////////////////////////////////////////////////
// http://localhost/3d/src/server/AJAX.php?cmd=test;

require_once "utilities.php"; // mostly debugging stuff
require_once "database.php";
require_once "filesystem.php";
require_once "AJAXLibrary.php";

error_reporting(E_ALL);
$GLOBALS['logging'] = true;
$GLOBALS['inCustomError'] = false;

function customError($errno, $errstr, $errfile, $errline = 0)
{
    // if($GLOBALS['inCustomError']){
    //   echo "<br> Cannot report $errstr in $errfile($errline) because already processing an error";
    //   die;
    // }
    // $GLOBALS['inCustomError'] = true;

    echo json_encode(array('success' => '0', 'errstr' => $errstr, 'errfile' => $errfile, 'errline' => $errline));
    echo '<br><pre>';
    echo "<br>$errstr in $errfile($errline)";
    print_r(debug_backtrace());
    echo '</pre><br>';
    writeErrorLog("$errfile($errline)", $errstr);
    die;
}
set_error_handler("customError"); //set error handler

// $stupidMsg = serialize($_POST);  // only for very early debugging
// writeErrorLog('hello world',$stupidMsg);

$GLOBALS['debugON'] = true; // true runs the tests, false for production
// also runs other tests such as HTML verification
// turns off all debugging tabs, etc.

$GLOBALS['logQueries'] = true;

$GLOBALS['singleUser'] = false; // true for android stand-alone, false for server

$GLOBALS['dbPrefix'] = 'games';

/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

$host = "localhost";
$username = "root";
$password = "root";
$dbname = "games";

// ok, let's process this request

$in = '$_REQUEST:' . json_encode($_REQUEST);
$contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';

writeAJAXLog($in, $contentType);
if ($contentType === "application/json") {
    //Receive the RAW post data.
    $content = trim(file_get_contents("php://input"));

    $decoded = json_decode($content, true);

    $in = $content;
    $out = serialize($decoded);
    writeSimpleAJAXLog($in,$out);
}


foreach ($_REQUEST as $k => $i) {
    writeSimpleAJAXLog($k, $i);
}

$result_array = dispatch($_REQUEST);

// ... send it back
echo json_encode($result_array);

// // ... and log at our leisure
$out = 'REPLY: ' . serialize($result_array);

if ($GLOBALS['logging']) {
    writeAJAXLog($in, $out);
}

die;

// ///////////////////////////////////
//
// $result_array = array();
//
// /* Create connection */
// $conn = new mysqli($host, $username, $password, $dbname);
//
// /* Check connection  */
// if ($conn->connect_error) {
//      die("Connection to database failed: " . $conn->connect_error);
// }
//
// /* SQL query to get results from database */
//
// $sql = "SELECT pkID, fldFIELD1, fldFIELD2 FROM tblDemo ";
//
// $result = $conn->query($sql);
//
// /* If there are results from database push to result array */
//
// if ($result->num_rows > 0) {
//     while($row = $result->fetch_assoc()) {
//         array_push($result_array, $row);
//     }
// }
//
// $conn->close();
//
//
// /* send a JSON encded array to client */
// echo json_encode($result_array);
// //echo json_encode($_POST);
//

/////////////////////////////////
/////////////////////////////////

function dispatch($request)
{ // the request is really just $_POST

    if (!isset($request['cmd'])) {
        // we don't know what to do
        trigger_error("cmd not set for AJAX request " . serialize($request));
        return (false);
    }

    $cmd = $request['cmd'];
    $cmd = str_replace("\\", "", $cmd); // strip out slashes

    $P1 = isset($request['P1']) ? $request['P1'] : "";
    $P2 = isset($request['P2']) ? $request['P2'] : "";
    $P3 = isset($request['P3']) ? $request['P3'] : "";

    $AJAX = new AJAXLibrary();

    $result = $AJAX->cmd($cmd, $P1, $P2, $P3);
    return (json_encode($result));
}

///////////////////////////////////////////
///////////////////////////////////////////
