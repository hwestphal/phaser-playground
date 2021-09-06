<?php

// TODO:  add mce editor https://www.tiny.cloud/docs/demo/classic/

define("_KELLER", false); // this is the only entry point to these programs

$GLOBALS['version'] = '1.00';

$GLOBALS['debugMode'] = true; // false for production
$GLOBALS['debugSQL'] = true; // false for production

$purl = parse_url("http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]");
$port = '';if (isset($purl['port'])) {
    $port = ":{$purl['port']}";
}

error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once 'controller.php';
require_once 'utilities.php';
require_once 'models.php';
require_once 'views.php';
require_once 'steps.php';
// require_once 'renderHtml.php';
require_once 'Parsedown.php';


// every activity tries to include a competency and a curriculumStrand

$GLOBALS['competencies'] = [
    'Communications',
    'Mathematising',
    'Representation',
    'Reasoning & Argument',
    'Strategic Thinking',
    'Using Language & Symbols',
    'Tool Skills',
    'Learning Skills'
];


$GLOBALS['curriculumStrands'] = [
    'Algebra', 'Functions', 'Geometry', 'Probability', 'Statistics', 'Discrete math',
    'Types & Operators', 'Program structure', // programming
    'Forces and Movement'];

$url = "http://{$purl['host']}$port{$purl['path']}";
$GLOBALS['url'] = $url;
$GLOBALS['phpfile'] = "$url";
$GLOBALS['datapath'] = getcwd() . "/coursedata/";

$GLOBALS['adminEmail'] = ['tom.berend@cheeseandcrackers.ca'];

// Start the session
if (!session_start()) {
    echo "Fail to start session";die;
}

$a = new activities();

date_default_timezone_set('America/Toronto');
$GLOBALS['dateformat'] = "Y-m-d"; //  for exchange with JS      2014-04-14
$GLOBALS['dateformat2'] = "l F d Y"; //  for human display         Thursday September 17 2020
$GLOBALS['today'] = date($GLOBALS['dateformat'], time()); // today in ISO format

$GLOBALS['path'] = './data/';
$GLOBALS['maxfilesize'] = intval(ini_get('post_max_size')) * 1000000;

$GLOBALS['logging'] = true;
$GLOBALS['errorString'] = '';
$GLOBALS['report'] = '';

// alertMessage('this is a test','success');
// alertMessage('this is a test','danger');
// alertMessage('this is a test','primary');

$GLOBALS['logfilename'] = "data/" . date("Y-m-d", time()) . ".log";




///////////////////////////////////////////
///////////////////////////////////////////
///////////////////////////////////////////

$req = $_REQUEST; // make a copy of $_REQUEST

//transactionLog($_SERVER['REQUEST_URI'], $req); // record we were here

// this is the main call to the program
///////////////////////////////////////

// get the header out immediately  <!DOCTYPE HTML>
$views = new Views();
echo $views->htmlHeader(); // $HTML from runUnitTests();

$HTML = '';

// run unit tests even if not logged in yet   
$unitTestHTML = '';
if ($GLOBALS['debugMode'] or isset($_REQUEST['RunUnitTests'])) {
    $unitTestHTML .= runUnitTests();
}

$HTML .= $views->titleBar($unitTestHTML);
$HTML .= $views->debugMsg();

$temp = processrequest(); // do whatever (starts by loading data)
$HTML .= $GLOBALS['errorString']; // put this first
$HTML .= $temp;

$HTMLTester = new HTMLTester();
$goodHTML = $HTMLTester->validate($HTML);

$HTML .= $views->htmlFooter();

printNice($GLOBALS['queries']);

echo $HTML;

return; // end of program
