<?php




$GLOBALS['renderErrors'] = '';
$GLOBALS['lessonTitle'] = 'Missing Title';
$GLOBALS['aEditorList'] = [];     // ok, need to turn this into a class
$GLOBALS['showThree'] = true;
$GLOBALS['GameCode'] ='';   // will be set to   'http://hostname/gamecode/'  (or https://, whatever)
$GLOBALS['jUserID'] = '';

//runWithoutJoomla();   // uncomment to run without Joomla


function runWithoutJoomla()
{
    assertTrue(false, "The 'runWithoutJoomla' test should be commented out");
    // assertTrue(false,$testText);

    $document = gameCodeRenderHtml($testText,'title');
    return;
}



function mathCodeRenderHtml($jText)
{
 
    unitTests();  // we ALWAYS run them

 
    $aLines = preProcessDocument($jText);
    printNice($aLines);

    // echo $GLOBALS['renderErrors'];
    //
    // for ($i = 0; $i < min(5, count($aLines)); $i++) {
    //   echo "<br>$i: {$aLines[$i]}";
    // }

    $aTags = inputToParagraphs($aLines);

    // for ($i = 0; $i < min(5, count($aTags)); $i++) {
    //   echo "<br>",serialize($aTags[$i]),"\n";
    // }

    $lesson = assembleDocument($aTags); // the output



    if (class_exists("JUri")) {   // means we are running under Joomla properly
        // add stylesheets
        $document->addStyleSheet($GLOBALS['GameCode']."lib/codemirror/codemirror.css");
        $document->addStyleSheet($GLOBALS['GameCode']."lib/codemirror/dialog.css");
        $document->addStyleSheet($GLOBALS['GameCode']."lib/codemirror/lint.css");

        // alsoe critical CSS settings in user.css
        // COPY gamecode/js/user.css  to  /games/templates/protostar/css

        // add Javascript files
        //


        $document->addScript($GLOBALS['GameCode']."lib/jshint.js");

        $document->addScript($GLOBALS['GameCode']."lib/codemirror/codemirror.js");
        $document->addScript($GLOBALS['GameCode']."lib/codemirror/javascript.js");
        $document->addScript($GLOBALS['GameCode']."lib/codemirror/formatting.js");

        $document->addScript($GLOBALS['GameCode']."lib/codemirror/lint.js");
        $document->addScript($GLOBALS['GameCode']."lib/codemirror/javascript-lint.js");
        $document->addScript($GLOBALS['GameCode']."lib/codemirror/fullscreen.js");

        if ($GLOBALS['showThree']){           //   <!-- three.js -->
            $document->addScript($GLOBALS['GameCode']."lib/three.js");
            $document->addScript($GLOBALS['GameCode']."joomla/gametemplate2.00.js");

            $document->addScript($GLOBALS['GameCode']."lib/split.js");
        }


        //
        //   <!-- Bootstrap -->
        //   <script src="../lib/jquery-3.3.1.min.js"></script>
        //   <script src="../lib/bootstrap-3.3.7-dist/js/bootstrap.min.js"></script>
        //   <link href="../lib/bootstrap-3.3.7-dist/css/bootstrap.min.css" rel="stylesheet">
        //

        // <!-- drive the lessons -->
        // when we update, change the trailing number to force cache updates
        // and change in renderHtml.js as well
        $document->addScript($GLOBALS['GameCode']."joomla/gamecode00.js");
    //
    } else {
        $GLOBALS['GameCode'] = "http://localhost/gamecode/";
        // build a local version ??  this code isn't written yet
    }



    // now assemble and send back to Joomla Component to print
    $HTML = '';
    $HTML .= $GLOBALS['renderErrors'];  // any warnings and errors
    //  $HTML .= dataScript($lesson);    // a <script> block with data for CodeMirror and Three



    if ($GLOBALS['showThree']) {    // if this page uses THREE
        // send the url prefix to the startup function
        $HTML .= '<div id="modgamecode" class="split-screen" style="height:400px;display:block">
                <div id="gamecode-left" class="split split-horizontal"  style="overflow: auto;"">';
    }

    $HTML .= $lesson;
    //$HTML .= "lesson goes here";


    if ($GLOBALS['showThree']) {    // if this page uses THREE
        $HTML .=   "</div>\n
                <div id='gamecode-right' class='split split-horizontal'>\n
                    <div id='gamecode-right-canvas'></div>
                
                </div>\n
              </div>";
    }

    $HTML .= "<script>\nwindow.onload = function(e){ lessonStartup('{$GLOBALS['GameCode']}');}\n";

    //---- build this...
    // var aEditors = [
    //   new oEditor('jscode','020', false),
    //   new oEditor('jscode','027', false),
    //   new oEditor('jscode','032', false),

    $HTML .= "let jLessonTitle = '{$GLOBALS['lessonTitle']}';";   // so we can save project code via AJAX
    // the project editor will override

    $HTML .= "let jUserID = '{$GLOBALS['jUserID']}';";
    //echo htmlentities($edit);

    $HTML .=  "let aEditors = [";
    foreach ($GLOBALS['aEditorList'] as $aE) {
        $bv = $aE[2]?'true':'false';
        $HTML .= "new oEditor( '{$aE[0]}' , '{$aE[1]}', $bv  ),";
    }

    $HTML .= "];";

    if ($GLOBALS['showThree']) {    // if this page uses THREE
        // we need a SCENE, CAMERA, and RENDERER and we define them here so they are "global"

        $HTML .= "\n
              document.getElementById('modgamecode').style.display = 'block';
              document.getElementById('modgamecode').style.height = (jQuery(window).height()-100)+'px';
              document.SplitInstance = Split(['#gamecode-left', '#gamecode-right'], {
                sizes: [80, 20],
                minSize: 20
              })\n";


        $HTML .= "\n
              jQuery(window).resize(function() {
                document.getElementById('modgamecode').style.height = (jQuery(window).height()-150)+'px';
              })\n";



        $HTML .= "let width=800,height=600;

        let scene = new THREE.Scene();
        let camera = new THREE.PerspectiveCamera( 75, width/height, 0.1, 1000 );
        // let camera = new THREE.OrthographicCamera( width / - 25, width / 25, height / 25, height / - 25, 1, 1000 );

        let renderer = new THREE.WebGLRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight );

        document.getElementById('gamecode-right-canvas').appendChild(renderer.domElement);\n";
  
    }


    $HTML .= "</script>\n";



    return($HTML);
}




function preProcessDocument($jText)
{
    $jText = convert_smart_quotes($jText);   //fix curly qus

    $aLines = preg_split('/\r\n|\r|\n/', $jText);
    //$aLines = explode('\n',$jText);          // explode into paragraphs

    // // a bit of debugging...
    // for ($i = 0; $i < min(5, count($aLines)); $i++) {
    //   renderWarning("$i {$aLines[$i]}");
    // }

    return($aLines);
}

function convert_smart_quotes($string)
{  // Fixing Curly Quotes and Em Dashes

    $search = array(chr(145),  chr(146),  chr(147),  chr(148),  chr(151));
    $replace = array("'",  "'",  '"',  '"',  '-');
    $result = str_replace($search, $replace, $string);
    return($result);
}




function threeDigit($n)
{
    return(str_pad($n, 3, '0', STR_PAD_LEFT));
}


function processMarkdown($sTest)
{

  // filter out \_ to chr(1)
    $oldTest = $sTest;
    while (($match = strpos($sTest, '\_')) !== false) {
        $sTest = substr($sTest, 0, $match) . chr(1) . substr($sTest, $match+strlen('\_')) ;
    }
    while (($match = strpos($sTest, '\[')) !== false) {
        $sTest = substr($sTest, 0, $match) . chr(2) . substr($sTest, $match+strlen('\[')) ;
    }
    while (($match = strpos($sTest, '\]')) !== false) {
        $sTest = substr($sTest, 0, $match) . chr(3) . substr($sTest, $match+strlen('\]')) ;
    }
    // echo "<br>shift-out('$oldTest',$match)  ==>  $sTest ";


    // some global substitutions  // use them carefully
    $sTest = str_replace('^^2', '[<sup>2</sup>| squared ]', $sTest);


    // first alternate voice / speech
  $sTest = processAlternateMarkdown($sTest, true);  // keep first set

  $sTest = processSingleMarkdown($sTest, '_', '<em>', '</em>');
    $sTest = processSingleMarkdown($sTest, '**', '<b>', '</b>');
    $sTest = processSingleMarkdown($sTest, '`', '<span style="font-family:monospace;font-size:smaller;">', '</span>');

    // trick, alternate is [text[]voice] and it's TWO diffefirst rent markdowns  [--[ and ]--]

    // now if we still have chr(1), change it back to _
    $oldTest = $sTest;
    while (($match = strpos($sTest, chr(1))) !== false) {
        $sTest = substr($sTest, 0, $match) . '_' . substr($sTest, $match+1);
    }
    while (($match = strpos($sTest, chr(2))) !== false) {
        $sTest = substr($sTest, 0, $match) . '[' . substr($sTest, $match+1);
    }
    while (($match = strpos($sTest, chr(3))) !== false) {
        $sTest = substr($sTest, 0, $match) . ']' . substr($sTest, $match+1);
    }

    // echo "<br>shift-in('$oldTest')  ==>  $sTest ";

    return ($sTest);
}

function eraseMarkdown($sTest)
{   // identical to processMarkdown, but erases the marks without replacement
  // first alternate voice / speech
  $sTest = processAlternateMarkdown($sTest, false);  // keep second set
  // then the italics (ignore \_)
  $sTest = processSingleMarkdown($sTest, '_', '', '');
    $sTest = processSingleMarkdown($sTest, '**', '', '');
    $sTest = processSingleMarkdown($sTest, '`', '', '');

    // substitution list to improve voices - only do this for erase text
    $subs = [ ['from'=> 'JavaScript', 'to'=> 'JavvaScript'],
            ['from'=> 'console.log()', 'to'=> 'console dot log']
  ];

    foreach ($subs as $sub) {
        while (true) {
            $n = strpos($sTest, $sub['from']);
            if ($n === false) {
                break;
            }

            $oldTest = $sTest;
            $sTest = substr($sTest, 0, $n) . $sub['to'] . substr($sTest, $n+strlen($sub['from']));
            // echo "<br>substitute('$oldTest','{$sub['from']}','{$sub['to']}')  ==>  $sTest ";
        }
    }
    return ($sTest);
}

function processSingleMarkdown($sTest, $match, $openSub, $closeSub)
{
    while (($sMatch = strpos($sTest, $match)) !== false) {
        $sMatch2 = strpos($sTest, $match, $sMatch+1);   // closing match
        if (!$sMatch2) {
            assertTrue(false, "Found open tag for $match, missing close tag on '$sTest at {substr($sTest,$sMatch,10)}");
            return($sTest);   // bail
        }

        $part1 = substr($sTest, 0, $sMatch);
        $part2 = substr($sTest, $sMatch+strlen($match), ($sMatch2 -$sMatch) - strlen($match));
        $part3 = substr($sTest, $sMatch2 + strlen($match), strlen($sTest)-$sMatch2);

        $oldsTest = $sTest;    // for debugging msg

        $sTest =  $part1 . $openSub . $part2 . $closeSub . $part3;

        // echo "<br>assemble('$oldsTest','$match') ($sMatch,$sMatch2) '$part1 + $part2 + $part3'   ==>  $sTest ";
//     console.log(sTest)
    }
    return ($sTest);
}

function processAlternateMarkdown($sTest, $isKeepFirst)
{
    while (true) {    // may have more than one
        $m = strpos($sTest, '[');
        if ($m === false) { // all done
            break;
        }

        $n = strpos($sTest, '|', $m+1);
        assertTrue($n !== false, "Missing middle marker on '$sTest', n='$n',remainder={substr($sTest,$n-1,20)}");
        $p = strpos($sTest, ']', $n+1);
        assertTrue($p !== false, "Missing end marker on '$sTest', p='$p',remainder={substr($sTest,$p-1,20)}");

        $part1 = substr($sTest, 0, $m);
        $part2 = substr($sTest, $m+1, $n-$m-1);
        $part3 = substr($sTest, $n+1, $p-$n-1);
        $part4 = substr($sTest, $p+1);

        $oldsTest = $sTest;  // just for debugging message
        if ($isKeepFirst) {
            $sTest = $part1 . $part2 . $part4;
        } else {
            $sTest = $part1 . $part3 . $part4;
            ;
        }
        // echo "<br> Alternate($oldsTest, $isKeepFirst) 1:'$part1' + 2:'$part2' + 3:'$part3' + 4:'$part4'  ==> '$sTest'";
    }
    return ($sTest);
}

// // ///////////////////////////////////////
// // ////////// assemble document

function assembleDocument($aTags)
{

//   // a list of editors, like this=>
    //   // aEditorList.push('jscode','002', isProctor)   // element 0
    //   // aEditorList.push('three','017', isProctor)
    //   // aEditorList.push('jscode','019', isProctor)
    //   // aEditorList.push('three','025', isProctor)
//
    //   // now walk through the tags, creating the HTML

    $HTML = '';

    $utterance = '';
    $inASpeechBlock = false; // ie=> we are inside and building a tag
    $uTagID = 0;

    $HTML .= "<div id='top' style='margin:30px;'>\n";

    // we want the focus at the top, but codemirror does setup in the background
    // so dirty trick, we put a HIDDEN codemirror editor at the TOP, and
    // instantiate the codemirror instances from the bottom.


    for ($i = 0; $i < count($aTags); $i++) {
        if (!$inASpeechBlock and $aTags[$i]['tag'] === '%p') { // need to open our speech blocks
            $threeUt =  threeDigit($uTagID);
            $HTML .= "<img onClick=\"onClickSaySpeech('utter{$threeUt}')\"
                     style=\"position:relative;top:35px;right:30px;\"
                     height='20px' width='20px' src='{$GLOBALS['GameCode']}html/images/speaker.png' />\n";
            $inASpeechBlock = true;
        }
        if ($inASpeechBlock and $aTags[$i]['tag'] !== '%p') { // need to close off our speech block
            $threeUt = threeDigit($uTagID);
            $HTML .= "<span id=\"utter{$threeUt}\" style=\"display:none;\">$utterance</span>\n";
            $uTagID += 1; // reset
            $utterance = '';
            $inASpeechBlock = false;
            // watch out - fix up at the bottom of the for loop too
        }

        $proctorMsg = "To complete this module, you must DEMONSTRATE your program to a proctor.  Click here to
          connect to a proctor using our Slack workspace.  Your ID is \"<span id=\"userID\">xxx</span>\"";

        $proctorHTML = "<div style=\"border=>5px solid;border-color:lightblue;background-color:lightblue;\">
                    <p>Challenge Problem</p>
                    <span class=\glyphicon glyphicon-facetime-video\></span>&nbsp;
                    <a href=\"https://m.me/Tom.Berend.Toronto\" style=\"color:black;\">$proctorMsg</a></div>";


        switch ($aTags[$i]['tag']) {
      case '%cm':
        $isProctor = ($aTags[$i]['param'] === 'proctor');
        $threeDigit = threeDigit($i);
        $GLOBALS['aEditorList'][] = ['jscode', $threeDigit, $isProctor];

        if ($isProctor) {  // add proctoring tools
            $HTML .= $proctorHTML;
        }
        $HTML .= "<textarea id=\"jscode{$threeDigit}\">{$aTags[$i]['value']}</textarea><p></p>\n";
        break;

      case '%three':
        $isProctor = ($aTags[$i]['param'] === 'proctor');
        $threeDigit = threeDigit($i);
        $GLOBALS['aEditorList'][] = ['three', $threeDigit, $isProctor];

        if ($isProctor) {  // add proctoring tools
            $HTML .= $proctorHTML;
        }

        $HTML .= "<div id=\"jump{$threeDigit}\">";   // need this so we can jump to the codemirror instance
        $HTML .= "<textarea id=\"jscode{$threeDigit}\" style=\"border=>5px;border-color=>red;\">{$aTags[$i]['value']}</textarea><p></p>\n";
        $HTML .= "</div>";   

        break;

      case '%title':
        if ($aTags[$i]['param'] === 'plain') {    // %title(plain) for Joomla content, first lesson
            $GLOBALS['showThree'] = false;
        }

        // we want the focus at the top, but codemirror does setup in the background
        // so dirty trick, we put a HIDDEN codemirror editor at the TOP, and
        // instantiate the codemirror instances from the bottom.
        // it ends up hidden under the yellow GameCode mod.

        if ($aTags[$i]['param'] != 'plain') {    // %title(plain) for Joomla content, first lesson
          $threeDigit = threeDigit($i);
          $isProctor = false;
          $GLOBALS['aEditorList'][] = ['jscode', $threeDigit, $isProctor];
          $HTML .= "<div style='position:relative;margin-top:-100px''><p><textarea id=\"jscode{$threeDigit}\" ></textarea></p></div><br /><br />\n";
        }

        $HTML .= "<h1>{$aTags[$i]['value']}</h1>\n";



        break;
      case '%subtitle':
        $HTML .= "<h2>{$aTags[$i]['value']}</h2>\n";
        break;
      case '%br':
        $HTML .= "<br \>\n";
        break;
      case '%p':
        $divBegin="";
        $divEnd="";
        $textBegin='';
        $utterBegin='';   // we might have a hint paragraph

        //console.log('aTags[$i]',aTags[$i])

        $isJSSkill = ($aTags[$i]['param'] === 'JSSkill');
        if ($isJSSkill) {
            $divBegin = "<div style=\"background-color:wheat\">";
            $divEnd = "</div>";
            $textBegin = "<b>JAVASCRIPT SKILL: </b>";
            $utterBegin = "JavaScript skill. ";
        }

        $isMathSkill = ($aTags[$i]['param'] === 'MathSkill');
        if ($isMathSkill) {
            $divBegin = "<div style=\"background-color:palegreen\">";
            $divEnd = "</div>";
            $textBegin = "<b>MATH SKILL: </b>";
            $utterBegin = "Math skill. ";
        }


        $temp = processMarkdown($aTags[$i]['value']);
        $HTML .= "$divBegin<p>$textBegin$temp</p>$divEnd\n";
        $utterance .= $utterBegin . eraseMarkdown($aTags[$i]['value']) . ' ';
        break;
      case '%img':
        $HTML .= "<img src=\"{$GLOBALS['GameCode']}/html/{$aTags[$i]['value']}\" style=\"margin=>5px;\" width=\"250\" align=\"right\" />\n";
        break;
      case '%quote':
        $HTML .= "<blockquote class=\"blockquote\" style=\"margin-bottom=>0px;padding-bottom=>0px;\">{$aTags[$i]['value']}</blockquote>\n";
        break;
      case '%citation':
        $HTML .= "<cite><footer class=\"blockquote-footer\" style=\"text-indent=>100px;margin-bottom=>30px;\">{$aTags[$i]['value']}</footer></cite>\n";
        break;
      case '%pre':
        $HTML .= "<pre>{$aTags[$i]['value']}</pre>\n";
        break;
      case '%youtube':
        $link = rtrim($aTags[$i]['value']);
        $HTML .= "<iframe width='480' height='270' align='right' src=\"https://www.youtube.com/embed/{$link}?rel=0&amp;controls=0\" frameborder=\"0\" allow=\"autoplay; encrypted-media\" allowfullscreen></iframe>\n";
        break;
      default:
        assertTrue(false, "Don't know how to deal with tag '{$aTags[$i]['tag']}'");
    }
    }
    if ($inASpeechBlock) { // maybe need to close off our last speech block
        $threeUt = threeDigit($uTagID);
        $HTML .= "<span id=\"utter{$threeUt}\" style=\"display:none;\">$utterance</span>\n";
    }

    $HTML .= "</div>\n";


    return ($HTML);
}


// // ///////////////////////////////////////
// // ///////////////////////////////////////
//
function inputToParagraphs($aLines)
{
    assertTrue(is_array($aLines), 'Expected array, got type ' .gettype($aLines));
    //   // console.log('we ve # lines ', aLin{es)

    $aTags = [];

    foreach ($aLines as $sLine) {

            // print ascii of every line for serious debugging
        //foreach(unpack("C*", $sLine) as $char){$a=chr($char);echo "[$a:$char]";}echo"$sLine<br><br>";

        // sometimes lines begin with...
        // [1] => 239
        // [2] => 187
        //  [3] => 191
        // strip that off
        if (ord($sLine)==239) {
            $sLine = substr($sLine, 3);
        }

//       // sometimes lines END with \n, strip them off (human spacing in Joomla Editor)
//       if(substr($sLine,strlen($sLine)-2,2) === '\n'){
//         $sLine = substr($sLine,0,strlen($sLine)-2);
//       }

        if (substr($sLine, 0, 1) === '%') {     // % starts tag
        $space = strpos($sLine, ' ');    // space ends tag if line is longer
        if ($space!== false) {
            $aTag['tag'] = substr($sLine, 0, $space);
            $aTag['value'] = substr($sLine, $space+1);
        } else {
            $aTag['tag'] = $sLine;    // nothing else on this line excecpt the tag
            $aTag['value'] = '';
        }

            $aTag['param'] = '';
            // if the tag looks like %xx(yy) then it has a parameter, fix it up
            $openB = strpos($aTag['tag'], '(');
            if ($openB) {
                $closeB = strpos($aTag['tag'], ')');
                assertTrue($closeB, "Missing close bracket in tag parameter? {$aTag['tag']}");
                //assertTrue($closeB == strlen($aTag['tag']),"Close bracket not last character? {$aTag['tag']}");
                // echo "tag:  $openB, $closeB, '". substr($aTag['tag'],$openB+1,$closeB-$openB)."'";
                $aTag['param'] = substr($aTag['tag'], $openB+1, $closeB-$openB-1);
                $aTag['tag'] = substr($aTag['tag'], 0, $openB);
            }
            $aTags[] =$aTag;
        } else {   // here for continuation lines (without tags)

            // just test that the first character isn't a '%'
            assertTrue(substr($sLine, 0, 1) != '%', "Looks like a bad tag, got ORD " . ord($sLine) . " from  '$sLine'");
            // this line didn't start with a tag, append to last aTag
            assertTrue(count($aTags)>0, 'File must start with a tag');
            // echo "before",$aTags[count($aTags)-1]['value'];
            $aTags[count($aTags)-1]['value'] .= "\n" . $sLine;
            // echo "after",$aTags[count($aTags)-1]['value'];
        }
    }
    return ($aTags);
}


///////////////////////////////
////////// tests //////////////
///////////////////////////////
function unitTests()
{

  // inputToParagraphs()

    $aLines = ['%p'];
    $aTags = inputToParagraphs($aLines);   // break array of paragraphs into array of [tag, value]
    assertTrue(count($aTags) === 1, 'Expected array of one object');
    assertTrue($aTags[0]['tag'] === '%p', 'Expected tag to be "%p" and got "' . $aTags[0]['tag'] . '"');
    assertTrue($aTags[0]['value'] === '', "Expected string to be 'testParagraph'");

    $aLines = ['%p testParagraph'];
    $aTags = inputToParagraphs($aLines);   // break array of paragraphs into array of [tag, value]
    assertTrue(count($aTags) === 1, 'Expected array of one object');
    assertTrue($aTags[0]['tag'] === '%p', 'Expected tag to be "%p" and got "' . $aTags[0]['tag'] . '"');
    assertTrue($aTags[0]['value'] === 'testParagraph', "Expected string to be 'testParagraph'");

    $aLines = ['%p testParagraph', 'and more'];
    $aTags = inputToParagraphs($aLines);
    assertTrue(count($aTags) === 1, 'Expected array of one object');
    assertTrue($aTags[0]['tag'] === '%p', "'Expected tag to be '%p' and got ''{$aTags[0]['tag']}'");
    assertTrue($aTags[0]['value'] === "testParagraph\nand more", "concat error, got ".serialize($aTags[0]));

    $aLines = ['%p(p1) testParagraph', 'and more'];
    $aTags = inputToParagraphs($aLines);
    //echo "<br>".serialize($aTags);
    assertTrue(count($aTags) === 1, 'Expected array of one object');
    assertTrue($aTags[0]['tag'] === '%p', "'Expected tag to be '%p' and got ''{$aTags[0]['tag']}'");
    assertTrue($aTags[0]['value'] === "testParagraph\nand more", "concat error, got ".serialize($aTags[0]));
    assertTrue($aTags[0]['param'] === 'p1', "parameter error, got ".serialize($aTags[0]));

    $aLines = ['%cm(proctor)',"console.log('hello world');" ];
    $aTags = inputToParagraphs($aLines);
    //echo "<br>".serialize($aTags);
    assertTrue(count($aTags) === 1, 'Expected array of one object');
    assertTrue($aTags[0]['tag'] === '%cm', "'Expected tag to be '%cm' and got ''{$aTags[0]['tag']}'");
    assertTrue($aTags[0]['value'] === "\nconsole.log('hello world');", "concat error, got ".serialize($aTags[0]));
    assertTrue($aTags[0]['param'] === 'proctor', "parameter error, got ".serialize($aTags[0]['param']));

    // one day, if we need it, we can add   <p(p1,p2)>text

    // processMarkdown()

    $rTests = [
    ['test'=> 'this _value_ is',           'result'=> 'this <em>value</em> is'],
    ['test'=> 'this _value_ is _great_',   'result'=> 'this <em>value</em> is <em>great</em>'],
    ['test'=> 'this _value_ is **great**', 'result'=> 'this <em>value</em> is <b>great</b>'],
    ['test'=> 'this `value` is _great_',   'result'=> 'this <span style="font-family:monospace;font-size:smaller;">value</span> is <em>great</em>'],
    ['test'=> 'this \_value\_ is',          'result'=> 'this _value_ is'],
  ];

    foreach ($rTests as $sTest) {
        $result = processMarkdown($sTest['test']);
        assertTrue($result === $sTest['result'], "From Process '{$sTest['test']}' we expected '{$sTest['result']}' but got '$result'");
    }

    //   // eraseMarkdown()
    $rTests = [
  ['test'=> 'this _value_ is',           'result'=> 'this value is'],
  ['test'=> 'this _value_ is _great_',   'result'=> 'this value is great'],
  ['test'=> 'this _value_ is **great**', 'result'=> 'this value is great'],
  ['test'=> 'this `value` is _great_',   'result'=> 'this value is great'],
  ['test'=> 'xx JavaScript is great',    'result'=> 'xx JavvaScript is great']
];
    foreach ($rTests as $sTest) {
        $result = eraseMarkdown($sTest['test']);
        assertTrue($result === $sTest['result'], "From Erase '{$sTest['test']}' we expected '{$sTest['result']}' but got '$result'");
    }

    // processAlternateMarkdown (sTest, marker, isKeep)
    $rTests = [
    ['test' => 'this[?|,] value', 'resultKeep' => 'this? value', 'resultDisc' => 'this, value'],
    ['test' => '[`console.log()`|console dot log]', 'resultKeep' => '`console.log()`', 'resultDisc' => 'console dot log']
  ];

    foreach ($rTests as $sTest) {
        $resultKeep = processAlternateMarkdown($sTest['test'], true);
        $resultDisc = processAlternateMarkdown($sTest['test'], false);

        assertTrue($resultKeep === $sTest['resultKeep'], "From '{$sTest['test']}' we expected '{$sTest['resultKeep']}' but got '$resultKeep'");
        assertTrue($resultDisc === $sTest['resultDisc'], "From '{$sTest['test']}' we expected '{$sTest['resultDisc']}' but got '$resultDisc'");
    }
}



function testHTMLTester()
{
    $string = "<html><body><table><tr><td>first element</td><td>second element<img stuff here /></td></tr></table></body></html>";
    HTMLTester($string);   // assertions are already in the validation
}


function HTMLTester($string)
{
    $tagCounts = array();


    $goodHTML = true;

    // this can be expensive, so don't run it in production

    $tagArray = explode('<', strtolower($string));
    $start = 0;

    //echo serialize($tagArray);      // now have the tags, eg: 'td>second element

    foreach ($tagArray as $tag) {
        $start = $start + strlen($tag) + 1;         // running pointer to where this tag ends

        if (empty($tag)) {         // explode() will create this extra element at the start of the array, not sure why
            continue;
        }

        //echo $tag,",";
            if (($ptr =  strpos($tag, '>')) !== false) {         // first clean out any 'content' between the tag end '>' and the beginning of the next tag
                $cleanTag = substr($tag, 0, $ptr);
            } else {
                // something is wrong here, but i don't know what.  means we get an isolated '<'
                continue;
            }

        // KLUDGE - this allows <!-- comment --> but not spread over multiple brackets
            if (strtolower(substr($cleanTag, 0, 1)) == '!') {     // <br> is a special case...
                continue;                                                    // just ignore it
            }


        if (strtolower(substr($cleanTag, 0, 2)) == 'br') {     // <br> is a special case...
                continue;                                                    // just ignore it
        }
        if (strtolower(substr($cleanTag, 0, 2)) == '/br') {     // </br> is a special case...
                continue;                                                    // just ignore it
        }



        //echo $cleanTag,",";
            if (substr($cleanTag, strlen($cleanTag)-1) == '/') {     // means it was a <image /> self-closing tag
                continue;                                                    // just ignore it
            }

        //echo $cleanTag,",";
            if ($ptr =  strpos($tag, ' ')) {        // now get rid of anything after a space (usually <a href=...)
                $cleanTag = substr($cleanTag, 0, $ptr);
            }

        // should have a clean tag now
        //echo $cleanTag,"<br>";

        // ok, now we have either 'td' or '/td'.   let's run a stack
        if (substr($cleanTag, 0, 1)=='/') {
            $openTag = array_pop($stack);
            if (('/'.$openTag['clean']) <> $cleanTag) {        // no match
                $goodHTML = false;
                assertTrue(false, "Unmatched closing tag '$cleanTag' (got '/{$openTag['clean']}' instead) at '".htmlentities('<'.substr($string, $openTag['start'], 100))."'");
                break;
            }
        } else {
            $s = ($start - strlen($tag) - 1);
            $stack[] = array('clean'=>$cleanTag,'start'=>$s);
        }
        //echo serialize($stack),"<br>";
    }

    if (!$goodHTML) {
        assertTrue(false, '<br><br>Bad HTML'. format($string));
    }
    return($goodHTML);
}

function format($string)
{
    $tagArray = explode('<', strtolower($string));
    $start = 0;
    $indent = 0;

    // explode takes away the opening <'s  so let's restore them
    $first = true;

    foreach ($tagArray as &$tag) {
        if (!$first) {		// the first tag ends up in the second spot
            $tag = '<'.$tag;
        }

        $first = false;

        $indent += 1;		// assume

        if (substr($tag, 0, 2) == '</') {
            $indent -= 1;
        }	// cancel indent (add exdent AFTER printing)

        $temp = str_repeat(".&nbsp;&nbsp;&nbsp;&nbsp;", $indent).htmlentities($tag).'<br>';

        if (strpos($tag, '/>')>0) {
            $indent -= 1;	// cancel indent
        }

        if (substr($tag, 0, 2) == '</') {
            $indent -= 1;
        }	// add exdent (already cancelled indent)

        $tag = $temp;	// do this last, writing by by reference
    }
    return(implode('', $tagArray));	// glue them together again
}
