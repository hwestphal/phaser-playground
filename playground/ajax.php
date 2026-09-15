<?php


// http://localhost/moodle/mod/mathcode/ajax.php?payload=%22eyJkYXRhY29kZSI6IkxPR19DbGlja1NheSIsImlkIjoyLCJ0ZXh0Ym9vayI6ImphdmFzY3JpcHQiLCJkYXRhMDEiOiJUaGUgbW9zdCBmYW1vdXMgdGV4dGJvb2sgb2YgYWxsIHRpbWUgaXMgIiwidW5pcSI6IkExQ1YifQ==%22
// need lots of checking here first


ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$GLOBALS['debugMode'] = true;
require_once('models.php');   // looks like mathcode version

///////////////////////////////////////////////////////////////

// unlink('ajaxHistory.txt');      // delete old log
// set to the user defined error handler
$old_error_handler = set_error_handler("myErrorHandler");




// polyfill for PHP8
if (!function_exists('str_contains')) {
    function str_contains(string $haystack, string $needle): bool
    {
        return strlen($needle) === 0 || strpos($haystack, $needle) !== false;
    }
}


/////////////// don't change above this line ///////////////////////


printNice('called at ', date(DATE_RSS));
printNice($_SERVER['QUERY_STRING'],'queryString');
printNice($_REQUEST, 'request');
printNice(print_r($_REQUEST,true));

if(isset($_REQUEST['payload'])){

    $payload = $_REQUEST['payload'];
    printNice($payload);

    $json =base64_decode($payload);
    printNice($json);

    $data = json_decode($json, true);
    printNice($data);

    writeRecord($data);

}else{
    printNice('strange, did not find a payload');
}


