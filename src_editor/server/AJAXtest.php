<?php
define ('_KELLER',false);		  // AJAX.php and AJAXtest.PHP are the ONLY program that can be run
                                // other modules will die if this value isn't defined


// this is the server interface, mostly for serving database stuff

error_reporting( E_ALL );
ini_set('display_errors', 1);
$GLOBALS['logging'] = true;



$GLOBALS['debugON'] = true;     // true runs the tests, false for production
            			          // also runs other tests such as HTML verification
								                    // turns off all debugging tabs, etc.

$GLOBALS['logQueries'] = false;     // true runs the tests, false for production

$GLOBALS['dbPrefix'] = 'games';

require_once  "utilities.php";    // mostly debugging stuff
require_once  "database.php";
require_once  "AJAXLibrary.php";
require_once  "filesystem.php";


$GLOBALS['TableList'] = array();
  $GLOBALS['TableList'][] = new TestTable();

  $GLOBALS['TableList'][] = new Fdocuments();       // best to do documents table first, fewer errors
  $GLOBALS['TableList'][] = new Fprojects();
  $GLOBALS['TableList'][] = new Ffragments();
  $GLOBALS['TableList'][] = new Fcollaborators();
  $GLOBALS['TableList'][] = new Fhistory();




$url = $_SERVER['REQUEST_URI'];
$aPath = explode('/',parse_url($url, PHP_URL_PATH));

runUnitTests();

?>
