<?php


///////// debug these three calls
// loader
// setupEditorWithCode
// runMathcodeEditor



ini_set('display_startup_errors', 1);
ini_set('display_errors', 1);
error_reporting(E_ALL);

$GLOBALS['debugMode'] = true;
session_start();

if (!isset($_SESSION['gameframe'])) // default
    $_SESSION['gameframe'] = 0;     // 1 or 0, not true/false


require_once('models.php');   // debug and sql

$request = $_SERVER['REQUEST_URI'];

if (basename($request) !== 'playground')
    $request = substr($request, 0, strpos($request, basename($request)));  // strip 'stats.php' or ?script.. from $request

$GLOBALS['key'] = generateRandomString();

// $GLOBALS['url'] = ($_SERVER['REQUEST_SCHEME'] ? 'https://' : 'http://') . $_SERVER['SERVER_NAME'] . $request . "?script={$GLOBALS['key']}";
$GLOBALS['url'] = $_SERVER['REQUEST_SCHEME'] . '://' . $_SERVER['SERVER_NAME'] . $request . "?script={$GLOBALS['key']}";

/////////  these two are required for editor, may yet find a use for them.
$GLOBALS['hiddendecl'] = base64_encode('');
$GLOBALS['hiddencode'] = base64_encode('');


// polyfill for PHP8
if (!function_exists('str_contains')) {
    function str_contains(string $haystack, string $needle): bool
    {
        return strlen($needle) === 0 || strpos($haystack, $needle) !== false;
    }
}



// if we received   someURL?stats  then show the stats and eit
if (isset($_REQUEST['stats'])) {
    $showcase = new Showcase();
    $count = $showcase->countRecords();
    echo "\n<h1>Stats</h1>";
    echo "\n$count records";
    $different = $showcase->differentRecords();
    // echo $showcase->dumpAll();
    $ret = $showcase->differentRecords();
    echo $showcase->quickTable($ret, ['id', 'datecreate', 'uniq', 'visits', 'code']);
    return;
}

// if we received   someURL?stats  then show the stats and eit
if (isset($_REQUEST['log'])) {
    $log = file_get_contents('ajaxHistory.txt');
    $log = str_replace("\n", "<br>", $log);
    echo '<h1>Log</h1>';
    echo $log;
    return;
}

// turn mobile on/off
if (isset($_REQUEST['modifyFrame'])) {
    $_SESSION['gameframe']  = 1 - $_SESSION['gameframe'];
}

// icon preview
// echo print_r($_REQUEST);
if (isset($_REQUEST['previewIcons'])) {
    $html = previewIcons();
    echo $html;
    return; // nothing else on this page
}


// if we received   someURL?share  then show the stats and eit
if (isset($_REQUEST['share'])) {
}


$qmark = strpos($request, '?');      // strip script key if supplied
if ($qmark) $request = substr($request, 0, $qmark);




// the key (and url containing it) are unique to this page, reload will change them.
// but it doesn't change on this page.  every 'run' saves to the same db record
//


$GLOBALS['helpPopup'] =

    "<div style='font-size:12px;'>
        <table class='table'>
        <tr style='margin:0px;'><td>Description</td><td>Windows / Linux</td><td>Mac</td></tr>
        <tr style='margin:0px;'><td>Undo</td><td>Ctrl + Z</td><td>Command + Z</td></tr>
        <tr style='margin:0px;'><td>Redo</td><td>Ctrl + Y</td><td>Shift + Command + Z or Command + Y</td></tr>
        <tr style='margin:0px;'><td>Cut</td><td>Ctrl + X</td><td>Command + X</td></tr>
        <tr style='margin:0px;'><td>Copy</td><td>Ctrl + C</td><td>Command + C</td></tr>
        <tr style='margin:0px;'><td>Paste</td><td>Ctrl + V</td><td>Command + V</td></tr>
        <tr style='margin:0px;'><td>Format Document</td><td>Ctrl + Shift + I</td><td>Command + Shift + I</td></tr>
        <tr style='margin:0px;'><td>Toggle Line Comment</td><td>Ctrl + /</td><td>Command + /</td></tr>
        <tr style='margin:0px;'><td>Search</td><td>Ctrl + F</td><td>Command + F</td></tr>
        <tr style='margin:0px;'><td>Replace</td><td>Ctrl + H</td><td>Command + H</td></tr>
        <tr style='margin:0px;'><td>Increase indent</td><td>Tab</td><td>Tab</td></tr>
        <tr style='margin:0px;'><td>Decrease indent</td><td>Shift + Tab</td><td>Shift Tab</td></tr>
        <tr style='margin:0px;'><td>Increase font size</td><td>Ctrl + .</td><td>Command + .</td></tr>
        <tr style='margin:0px;'><td>Decrease font size</td><td>Ctrl + ,</td><td>Command + ,</td></tr>
        <tr style='margin:0px;'><td>Move a line down</td><td>Alt + Down</td><td>Option + Down</td></tr>
        <tr style='margin:0px;'><td>Move a line up</td><td>Alt + Up</td><td>Option + Up</td></tr>
        <tr style='margin:0px;'><td>Select all</td><td>Ctrl + A</td><td>Command + A</td></tr>
        <tr style='margin:0px;'><td>Select downward</td><td>Shift + Down</td><td>Shift + Down</td></tr>
        <tr style='margin:0px;'><td>Select right</td><td>Shift + Right</td><td>Shift + Right</td></tr>
        <tr style='margin:0px;'><td>Select left</td><td>Shift + Left</td><td>Shift + Left</td></tr>
        <tr style='margin:0px;'><td>Select upward</td><td>Shift + Up</td><td>Shift + Up</td></tr>
        <tr style='margin:0px;'><td>Select to the end</td><td>Alt + Shift + Right</td><td>Alt + Shift + Right</td></tr>
        <tr style='margin:0px;'><td>Select to the start</td><td>Alt + Shift + Left</td><td>Alt + Shift + Left</td></tr>
        <tr style='margin:0px;'><td>Add multi-cursor above</td><td>Ctrl + Shift + Up</td><td>Command + Shift + Up</td></tr>
        <tr style='margin:0px;'><td>Add multi-cursor below</td><td>Ctrl + Shift + Down</td><td>Command + Shift + Down</td></tr>
        </table>
        </div>";




$GLOBALS['helpDrawer'] = <<<PAGETEXT


<button class="btn btn-primary btn-sm" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample" style="padding-top:0px;padding-bottom:0px;">
Editor Keys
</button>

<div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
  <div class="offcanvas-header">
    <h5 class="offcanvas-title" id="offcanvasExampleLabel">Editor Keys</h5>
    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div class="offcanvas-body" style='padding:0px;'>
    <div>
    {$GLOBALS['helpPopup']}
    </div>
  </div>
</div>
PAGETEXT;


////////////////////////////////////////////////
//// build the page here
////////////////////////////////////////////////



echo '<!DOCTYPE html>';
echo '<html dir="ltr" lang="en" xml:lang="en">';

echo '<head>';

// list of scripts that have been saved
if (substr($_SERVER['QUERY_STRING'], 0, 6) == 'script') {
    loadFromPayload($_SERVER['QUERY_STRING']);
}

echo getHeader();
echo '</head>';


echo '<body>';
echo getBody();
echo '</body>';

echo '</html>'; // footer


return;




function getHeader()
{
    $page = <<<PAGETEXT
        <title>Simplified JSXGraph</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <script type='text/javascript' src='dist.{$GLOBALS['dist']}/bootstrap/bootstrap-5.3.8.min.js'></script>
        <link rel='stylesheet' type='text/css' href='dist.{$GLOBALS['dist']}/bootstrap/bootstrap-5.3.8.min.css' />

        <script type='text/javascript' src='dist.{$GLOBALS['dist']}/split.min.js'></script>

        <script type='text/javascript' src='dist.{$GLOBALS['dist']}/jsxgraphcore.js'></script>
        <link rel='stylesheet' type='text/css' href='dist.{$GLOBALS['dist']}/jsxgraph.css' />

        <link rel='stylesheet' type='text/css' href='styles.css' />

PAGETEXT;
    return $page;
}





function getBody()
{
    $width = "1600px;";
    $gameFrame = $_SESSION['gameframe'] ?  'btn-warning' : 'btn-outline-warning';    // outline if we want gameframe

    $jsDelivr = str_contains($_SERVER['SERVER_NAME'], 'localhost') ? '0' : '1';

    $pathToDist = (empty($_SERVER['HTTPS']) ? 'http' : 'https') . "://$_SERVER[HTTP_HOST]" . parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    // echo "<br>",$pathToDist;
    $pathToDist .=  "dist." . $GLOBALS['dist'];      // eg: http://cheeseandcrackers/playground/dist.2.1.1
    // echo "<br>",$pathToDist;

    $html = '';

    $html .= <<<PAGETEXT
    <script>

        window.onload = function () {
            let e = document.getElementById('editor');
            MathcodeAPI.loader('found you', '1');  // hardcode user 1
            // console.log('about to call setupEditorwithCode("{$GLOBALS['hiddencode']}","{$GLOBALS['hiddendecl']}","{$GLOBALS['code']}")')
            MathcodeAPI.setupEditorWithCode('{$GLOBALS['hiddencode']}','{$GLOBALS['hiddendecl']}','{$GLOBALS['code']}');

            let offsetWidth = 10


       }

        // utf8 to ansi converter  (atob/btoa needs it)
        function tryToTranslate(c) {
            switch (c.charCodeAt(0)) {
                case 8221:
                case 8220:
                    return 34 // double quote

                default:
                    console.log('add this to tryToTranslate()', c, c.charCodeAt(0))
                    return 255
            }
        }
        function charToByte(c) {
            return (
                (c.charCodeAt(0) < 128)
                ? c.charCodeAt(0) // This is english alphabet
                : tryToTranslate(c) // c.charCodeAt(0) - 0x0e01 /* Utf8 ก */ + 161; /* Window-874 ก*/
                )
        };
        function toByteArray(s) {
            return s.split('').map((c) => charToByte(c));
        };
        function utf8ToAnsi(s) {
            if (s) {
                return toByteArray(s).map(function (c) {
                    return String.fromCharCode(c);
                }).reduce(function (converted, c) {
                    return converted + c;
                })
            }
            return ''   // s was empty
        }

    </script>
    PAGETEXT;


    $html .=
        "<div>
        <table class='table' style='max-width:1200px;'>
            <tr><td><strong><a href='https://github.com/tom-berend/jsxgraph-wrapper-typescript' target='_blank'>Simplified JSXGraph</a> Playground V{$GLOBALS['dist']}</strong></td>
            <td><b><a href='https://jsxgraph.uni-bayreuth.de/' target='_blank'>JSXGraph</a> with VSCode scaffolding !!</b></td>
            <td>{$GLOBALS['helpDrawer']}</td></tr></table>
";

    $html .=
        "<table class='table' style='max-width:1200px;height:80px;'>
        <tr><td style='width:500px;'>


        <div id='buttons' style='margin-top:2px;'>

               <button id='runButton' type='button' class='btn btn-md btn-success'
                onclick='MathcodeAPI.runMathcodeEditor(`A000`, `playground`, `$pathToDist`);return false;'

                style='margin-left:10px;'
                aria-label='Run'>Run</button>

                 &nbsp;
";

    $html .=
        "<!-- Button trigger modal -->
                <button type='button' class='btn btn-md btn-primary' data-bs-toggle='modal' data-bs-target='#staticBackdrop' onclick='MathcodeAPI.share(``,`playground`,`{$GLOBALS['key']}`);return false;'>
                Share
                </button>

                <button id='download' type='button' class='btn btn-md btn-info' onclick='MathcodeAPI.downloadPlayground(``,`playground`,`{$GLOBALS['key']}`);return false;'
                    style='margin-left:10px;'
                    aria-label='Download HTML'>Download HTML</button>

                 &nbsp;

                <button id='gameframe' type='button' class='btn btn-md {$gameFrame}' style='color:black;'  onclick='window.location.assign('?modifyFrame')'
                    style='margin-left:10px;'
                    aria-label='Mobile'>Mobile</button>

            <!-- Modal -->
            <div class='modal fade' id='staticBackdrop' data-bs-backdrop='static' data-bs-keyboard='false' tabindex='-1' aria-labelledby='staticBackdropLabel' aria-hidden='true'>
              <div class='modal-dialog'>
                <div class='modal-content' style='width:900px;'>
                  <div class='modal-header'>
                    <h1 class='modal-title fs-5' id='staticBackdropLabel'>Copy this link to your construction...</h1>
                    <button type='button' class='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                  </div>
                  <div class='modal-body'>
                      <a style='font-size:20px;color:darkblue;border-width:50px;white-space: nowrap;'>{$GLOBALS['url']}</a><br><br>
                      <button type='button' onclick='navigator.clipboard.writeText
                            ('{$GLOBALS['url']}')';>Copy</button>

                  </div>
                  <div class='modal-footer'>
                    <button type='button' class='btn btn-info' data-bs-dismiss='modal' onclick='window.location.reload();'>Close</button>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </td>
        <td style='font-size:14px;'><b>Space Icons</b> by <a href='https://goodstuffnononsense.com/' target='_blank'>Good Stuff No Nonsense</a>
                        licensed under <a href='https://creativecommons.org/licenses/by/4.0/?ref=chooser-v1' target='_blank' rel='license noopener noreferrer' style='display:inline-block;'>CC-BY 4.0</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href='?previewIcons'><b>Preview</b></a>
        <br><b>Essential Retro Video Game Sound Effects Collection </b> by <a href='https://juhanijunkala.com' target='_blank'>Juhani Junkala</a> 
                          licensed under <a href='https://creativecommons.org/publicdomain/zero/1.0/deed.en' target='_blank' rel='license noopener noreferrer' style='display:inline-block;'>CC0</a>
        </td>
        </tr>
        </table>

        <div class='split'>
            <div id='editor' style='height:calc(100vh - 150px); '></div>
            <div id='jxgframe'></div>
        </div>            

        <script>
            Split(['#editor', '#jxgframe']);
        </script>                            


    <script type='text/javascript' src='dist.{$GLOBALS['dist']}/bundle.app.js'></script>
";

    return $html;
}







// the random number is 6 digits of randomness plus the encoded time to the second
function generateRandomString()
{
    $length = 6; // the random part
    $characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';

    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[random_int(0, $charactersLength - 1)];
    }

    $time = time();     // timestamp - this will add THREE chars to end of random string
    // 1726152386  - time() in 2024 is a 10-digit number
    $time = intval(substr(strval($time), 6));       // lose the first six digits - they never change
    // 2386
    while ($time > 0) {
        $mod = $time % $charactersLength;
        $time = floor($time / $charactersLength);
        $randomString .= $characters[$mod];
    }


    return $randomString;
}


function previewIcons(): string
{
    $html = '<!DOCTYPE html><html><head></head><body>';
    $files = scandir("./icons");
    $html .= "<div style='max-width:1000px;'>";
    foreach ($files as $file) {
        if ($file == '.' or $file == '..')
            continue;
        if (substr($file, 0, 1) == '_')  // starts with underscore
            continue;

        $html .= "<div style='float:left;'><figure>
                    <img src='icons/$file' style='height:100px' />
                    <figcaption>$file</figcaption>
                  </figure></div>";
    }


    $html .= '</div></body></html>';
    return $html;
}
