<?php
// look at $_REQUEST.  it might say [p]=>'save'  or  [p]=>'load'.
//    or might be empty, which is a 'load'

session_start();

$HTML = '';
$HTML .= print_r($_REQUEST, true);
$payload = '';

// if we got a filename then we are running a 'load'
if (isset($_FILES["file"])) { // upload this file!!
    if ($_FILES["file"]["error"] > 0) {
        echo "<br><br><br>Error: " . $_FILES["file"]["error"] . "<br />";
    } else {

        $_SESSION['filename'] = $_FILES["file"]["name"];
        $_SESSION['filepath'] = $_FILES["file"]["tmp_name"];
        $payload = file_get_contents("{$_SESSION['filepath']}/{$_SESSION['filename']}");
        // echo "<br><h2>we have read $payload</h2>";
    }
}

// defaults
$action = '';
$payload = '';

if (isset($_REQUEST['p'])) { // pick up action
    $action = $_REQUEST['p'];
}
if (isset($_REQUEST['q'])) { // pick up payload
    $payload = $_REQUEST['q'];
}


// the web page sent us the text to save
if ($action == 'save') { // save the payload
    // we can get the filename from $_SESSION, but maybe it doesn't exist
    if (!isset($_SESSION['filename'])) {
        $_SESSION['filename'] = strval(time()) . ".temp";
        $_SESSION['filepath'] = dirname(getcwd()) . "/courseware";
        echo "<h1>WARNING - Save before load.  We saved your work in <br>{$_SESSION['filepath']}/{$_SESSION['filename']}</h1>";
    }

    $myFile = "{$_SESSION['filepath']}/{$_SESSION['filename']}";
    echo "<br><br>writing $payload to $myFile";
    file_put_contents($myFile, $payload);
}

?>
<!DOCTYPE html>
<html>

<head>
    <!-- <meta http-equiv="X-UA-Compatible" content="IE=edge" /> -->
    <meta http-equiv="Content-Type" content="text/html;charset=utf-8">
    <link rel="stylesheet" href="3d.css" />
</head>

<body>
<?php $r = print_r($_REQUEST, true);
echo "<p>$r</p>";?>
    <br><br><br><math id='testmath'></math><br>
    <div class="navbar">
        <div style="float:right;padding-right:200px">
            <button id="save">Save</button>
        </div>
        <div style="float:right">
            <button id="load">Load</button>
        </div>
        <div style="float:right">
            <button id="run">Run</button>
        </div>
        <div style="float:right">
            <button id="debug">Debug</button>
        </div>
        <!-- <div style="float:right">
            <button id="tagcount">count</button>
        </div> -->
        <div style="float:right">
        <!-- lots of CSS to change the name of this button -->
        <input type="file" onchange="readFile(this)">
        </div>
        <script>
            function readFile(input) {
            let file = input.files[0];
            let reader = new FileReader();
            reader.readAsText(file);
            reader.onload = function() {
                document.getElementById('tomseditor').value = reader.result
            };

            reader.onerror = function() {
                console.log(reader.error);
            };

            }
        </script>

        <div style="float:right">
        <form action="./index.php"  onsubmit="copyeditor()" >
            <input type="submit" id="PHPSave" value="PHP save" />
            <input type="hidden" id="p2" name="p" value="save" />
            <input type="hidden" id="payload" name="q" value='' />
        </form>
        </div>
        <script>
            console.log('linking PHPSave');
            function copyeditor(){
                let payload = document.getElementById('tomseditor').value
                // alert(payload)
                document.getElementById('payload').value = payload
            }
        </script>

        <div style="float:right">
        <button onclick="alert('boo')">Click me</button>
        </div>

    </div>


    <div class="main" style="margin-top:30px">
        <p>If you’re using Chrome or Edge, enable “Experimental Web Platform features” on the chrome://flags page.</p>
        <!-- lesson and editor, side by side-->
        <div id="lesson"
            style="border-style: solid;  border-block-color: black;border-width: 1px; float:left; width:45%">
        </div>
        <div
            style="border-style: solid;  border-block-color: black;border-width: 1px; float:left; width:45%; height:100%;">
            <div>

                <textarea rows="1000" id="tomseditor" style="width:100%;margin:2px;padding:5px;"></textarea>
            </div>


        </div>

    </div>

    <script>function AJAXuploadContent(){};</script>

    <script src="bundle.js"></script>


</body>

</html>