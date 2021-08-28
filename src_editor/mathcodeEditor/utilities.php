<?php

defined('_KELLER') or die('cannot access utilities.php directly');

// turn on/off individual tests below...

//////////////////////////////////////////////////
//////////////////////////////////////////////////
//    this is the unit-tester

function runUnitTests()
{
    // these are really cheap, should always be run
    //  $o = new dbconnect();          $o->runTests();    // the mysqli wrapper
    $GLOBALS['errorString'] = '';
    $GLOBALS['tests'] = 0;
    $GLOBALS['assertions'] = 0;
    $GLOBALS['fails'] = 0;

    $o = new accounts();
    $o->runTests(); // SQLlite3 wrapper class

    // $o = new accountLog();
    // $o->runTests();    // SQLlite3 wrapper class

    // $o = new passwords();
    // $o->runTests();    // SQLlite3 wrapper class

    $o = new Views();
    $o->runTests(); // SQLlite3 wrapper class

    // we can step through manually, or simply run all of them and check the asserts
    require_once 'testaging.php';
    $o = new testAging();
    $o->runTests();

    $HTML = finalReport();
    return ($HTML);
}

//////////////////////////////////////////////////
//////////////////////////////////////////////////
//    UnitTestCase is the parent of all testable classes

class UnitTestCase
{ // no unit tests - use for production

    public $ClassBeingTested = "Unknown";
    public $testFunction = "Unknown";

    public function runTests()
    {
        $this->ClassBeingTested = get_class($this);
        $functions = get_class_methods($this->ClassBeingTested);

        foreach ($functions as $function) {
            if (left($function, 4) == 'test') { // only function test----(),
                // not upda<teSt>udent() and similar
                $GLOBALS['tests'] += 1;
                $this->testFunction = $function;

                $this->$function(); // and run each test function
            }
        }

        // // now check that there are no lower-case conflicts (helps debugging)
        // $o = get_object_vars($this);
        //     foreach($o as $key=>$value){
        //         $k=strtolower($key).'123123';
        //         //$this->assertTrue(!isset($lowerCase[$k]),"likely a case conflict with '$key' and '{$lowerCase[$k]}'");
        //         if(isset($lowerCase[$k])){
        //             $message = "likely a case conflict in '".get_class($this)."' with '$key' and '{$lowerCase[$k]}'";
        //       $this->fail++;
        //       $this->errorstring .= "<br />{$this->testFunction}:    <b>$message</b>";
        //         }
        //         $lowerCase[$k] = $key;
        //     }
    }
}

function finalReport()
{
    $span = "<span style=\"padding: 8px; margin-top: 1em; background-color: green; color: white;\">";
    if ($GLOBALS['fails'] > 0) {
        $span = "<span style=\"padding: 8px; margin-top: 1em; background-color: red; color: white;\">";
    }

    $HTML = "<br /><br />" . $span;
    $HTML .= " <strong>{$GLOBALS['tests']}</strong> tests,";
    $HTML .= "  <strong>{$GLOBALS['assertions']}</strong> assertions,";
    $HTML .= "  <strong>{$GLOBALS['fails']}</strong> fails</span>";
    $HTML .= " <br \>{$GLOBALS['errorString']}";

    return ($HTML);
}

function assertTrue($assertion, $comment = "Assert Failed")
{
    if (!isset($GLOBALS['assertions'])) { // must be initialized, whether testing or not
        $GLOBALS['assertions'] = 0;
        $GLOBALS['fails'] = 0;
        $GLOBALS['errorString'] = '';
    }

    $GLOBALS['assertions'] += 1;
    if ($assertion) {
        return ($assertion);
    } else {
        $errorString = "<br /><span style='color:red;'>Assertion Failed:   </span><b>,$comment</b>";
        $errorText = PHP_EOL . PHP_EOL . "Assertion Failed:  $comment " . PHP_EOL;
        $array = debug_backtrace();
        foreach ($array as $key => $value) {
            if (isset($value['file']) and isset($value['line'])) {
                $errorString .= "<br />&nbsp;{$value['file']}({$value['line']})";
                $errorText .= "{$value['file']}({$value['line']}),   ";
            }
        }

        if ($GLOBALS['debugMode']) {
            echo "<br>", $errorString;
        }

        // // always write to the log file
        // file_put_contents($GLOBALS['logfilename'], $errorText, FILE_APPEND);

        $GLOBALS['fails'] += 1;
        $GLOBALS['errorString'] .= $errorString;
    }
    return ($assertion); // allows chained assertions
}

function printNice($elem)
{
    if (!$GLOBALS['debugMode']) {
        return;
    } // debugging isn't on

    $debug = debug_backtrace();

    $HTML = '<br>from ';
    for ($i = 0; $i < 3; $i++) {
        if (isset($debug[$i]['file'])) {
            $file = explode('/', $debug[$i]['file']);
            $f = $file[count($file) - 1];
            $line = $debug[$i]['line'];
            $HTML .= "$f($line) ";
        }
    }

    $HTML .= "-->" . printNiceHelper($elem);
    echo $HTML;
}

// printNice utility for debugging

function printNiceR($elem)
{

    $HTML = printNiceHelper($elem);
    return ($HTML);
}

// helper function for printNice()
function printNiceHelper($elem, $max_level = 10, $print_nice_stack = array(), $HTML = '')
{

    // show where we were called from
    $backtrace = debug_backtrace(); // if no title, then show who called us
    if ($backtrace[1]['function'] !== 'printNice' and $backtrace[1]['function'] !== 'printNiceHelper') {
        if (isset($backtrace[1]['class'])) {
            $HTML .= "<hr /><h1>class {$backtrace[1]['class']}, function {$backtrace[1]['function']}() (line:{$backtrace[1]['line']})</h1>";
        }
    }

    if (is_string($elem)) {
        //$HTML .= htmlentities($elem).'<br>';
        $HTML .= $elem;
        return ($HTML);
    }

    if (is_array($elem) || is_object($elem)) {
        if (in_array($elem, $print_nice_stack, true)) {
            $HTML .= "<hr /><h1>class {$backtrace[1]['class']}, function {$backtrace[1]['function']}() (line:{$backtrace[1]['line']})</h1>";
            return ($HTML);
        }
        if ($max_level < 1) {
            //print_r(debug_backtrace());
            //die;
            $HTML .= "<FONT COLOR=RED>MAX STACK LEVEL OF $MAX_LEVEL EXCEEDED</FONT>";
            return ($HTML);
        }

        $print_nice_stack[] = &$elem;
        $max_level--;
        $HTML .= "<table border=1 cellspacing=0 cellpadding=3 width=100%>";
        if (is_array($elem)) {
            // $HTML .= '<tr><td colspan=2 style="background-color:#333333;"><strong><font color=white>ARRAY</font></strong></td></tr>';
        } else {
            $HTML .= '<tr><td colspan=2 style="background-color:#333333;"><strong>';
            $HTML .= '<font color=white>OBJECT Type: ' . get_class($elem) . '</font></strong></td></tr>';
        }
        $color = 0;
        foreach ($elem as $k => $v) {
            if ($max_level % 2) {
                $rgb = ($color++ % 2) ? "#888888" : "#BBBBBB";
            } else {
                $rgb = ($color++ % 2) ? "#8888BB" : "#BBBBFF";
            }
            $HTML .= '<tr><td valign="top" style="width:40px;background-color:' . $rgb . ';">';
            $HTML .= '<strong>' . $k . "</strong></td><td>";
            $HTML .= printNiceHelper($v, $max_level, $print_nice_stack);

            $HTML .= "</td></tr>";
        }

        $HTML .= "</table>";
        return ($HTML);
    }
    if ($elem === null) {
        $HTML .= "<font color=green>NULL</font>";
    } elseif ($elem === 0) {
        $HTML .= "0";
    } elseif ($elem === true) {
        $HTML .= "<font color=green>TRUE</font>";
    } elseif ($elem === false) {
        $HTML .= "<font color=green>FALSE</font>";
    } elseif ($elem === "") {
        $HTML .= "<font color=green>EMPTY STRING</font>";
    } else {
        $HTML .= str_replace("\n", "<strong><font color=red>*</font></strong><br>\n", $elem);
    }
    return ($HTML);
}

class HTMLTester extends UnitTestCase
{
    public $tagCounts = array();

    public function testHTMLTester()
    {
        $string = "<html><body><table><tr><td>first element</td><td>second element<img stuff here /></td></tr></table></body></html>";
        return ($this->validate($string)); // assertions are already in the validation
    }

    public function validate($string)
    {
        $goodHTML = true;

        // this can be expensive, so don't run it in production

        $tagArray = explode('<', strtolower($string));
        $start = 0;

        //echo serialize($tagArray);      // now have the tags, eg: 'td>second element

        foreach ($tagArray as $tag) {
            $start = $start + strlen($tag) + 1; // running pointer to where this tag ends

            if (empty($tag)) { // explode() will create this extra element at the start of the array, not sure why
                continue;
            }

            //echo $tag,",";
            if (($ptr = strpos($tag, '>')) !== false) { // first clean out any 'content' between the tag end '>' and the beginning of the next tag
                $cleanTag = substr($tag, 0, $ptr);
            } else {
                // something is wrong here, but i don't know what.  means we get an isolated '<'
                continue;
            }

            // KLUDGE - this allows <!-- comment --> but not spread over multiple brackets
            if (strtolower(substr($cleanTag, 0, 1)) == '!') { // <br> is a special case...
                continue; // just ignore it
            }

            if (strtolower(substr($cleanTag, 0, 2)) == 'br') { // <br> is a special case...
                continue; // just ignore it
            }
            if (strtolower(substr($cleanTag, 0, 2)) == '/br') { // </br> is a special case...
                continue; // just ignore it
            }

            //echo $cleanTag,",";
            if (substr($cleanTag, strlen($cleanTag) - 1) == '/') { // means it was a <image /> self-closing tag
                continue; // just ignore it
            }

            //echo $cleanTag,",";
            if ($ptr = strpos($tag, ' ')) { // now get rid of anything after a space (usually <a href=...)
                $cleanTag = substr($cleanTag, 0, $ptr);
            }

            // should have a clean tag now
            //echo $cleanTag,"<br>";

            // ok, now we have either 'td' or '/td'.   let's run a stack
            if (substr($cleanTag, 0, 1) == '/') {
                $openTag = array_pop($stack);
                if (!empty($openTag)) {
                    if (('/' . $openTag['clean']) != $cleanTag) { // no match
                        $goodHTML = false;
                        assertTrue(false, "Unmatched closing tag '$cleanTag' (got '/{$openTag['clean']}' instead) at '" . htmlentities('<' . substr($string, $openTag['start'], 200)) . "'");
                        break;
                    }
                }else {
                    assertTrue(false, "Too many closing tags '$cleanTag' (got '/{$openTag['clean']}' at ".'<span style="background-color:pink">'. htmlentities(substr($string, max(0,$openTag['start']-200), 200)). '</span>'. "' instead) at '" . htmlentities('<' . substr($string, $openTag['start'], 200)) . "'");

                }
            } else {
                $s = ($start - strlen($tag) - 1);
                $stack[] = array('clean' => $cleanTag, 'start' => $s);
            }
            //echo serialize($stack),"<br>";
        }

    }

    public function format($string)
    {
        $tagArray = explode('<', strtolower($string));
        $start = 0;
        $indent = 0;

        // explode takes away the opening <'s  so let's restore them
        $first = true;

        foreach ($tagArray as &$tag) {
            if (!$first) { // the first tag ends up in the second spot
                $tag = '<' . $tag;
            }

            $first = false;

            $indent += 1; // assume

            if (substr($tag, 0, 2) == '</') {
                $indent -= 1;
            } // cancel indent (add exdent AFTER printing)

            $temp = str_repeat(".&nbsp;&nbsp;&nbsp;&nbsp;", $indent) . htmlentities($tag) . '<br>';

            if (strpos($tag, '/>') > 0) {
                $indent -= 1; // cancel indent
            }

            if (substr($tag, 0, 2) == '</') {
                $indent -= 1;
            } // add exdent (already cancelled indent)

            $tag = $temp; // do this last, writing by by reference
        }
        return (implode('', $tagArray)); // glue them together again
    }
}

// some utility functions

function iif($condition, $true, $false = '')
{
    return ($condition ? $true : $false);
}
function boolStr($x)
{
    return (is_bool($x) ? ($x ? "true" : "false") : $x);
}

function microtime_float()
{
    list($usec, $sec) = explode(" ", microtime());
    return ((float) $usec + (float) $sec);
}

function left($string, $len = 1)
{
    return substr($string, 0, $len);
}

// copy an array BY VALUE.  by default, PHP copies by reference, and we don't want to change the original data.
function arrayCopy(array $array)
{ // http://php.net/manual/en/ref.array.php
    $result = array();
    foreach ($array as $key => $val) {
        if (is_array($val)) {
            $result[$key] = arrayCopy($val);
        } elseif (is_object($val)) {
            $result[$key] = clone $val;
        } else {
            $result[$key] = $val;
        }
    }
    return $result;
}

function calculateFutureDate($plusCount = 0, $plusType = 'Days')
{ // supports 'Hours', 'Days', or 'Weeks'
    assertTrue($plusCount > 0);
    assertTrue($plusType == "Hours" or $plusType == "Days" or $plusType = "Weeks", "Did not expect $plusType");

    $hour = 3600; // seconds in an hour
    $day = $hour * 24; // seconds in a day
    $week = $day * 7;

    switch ($plusType) {
        case 'Hours':
            $until = $GLOBALS['today'] + $plusCount * 3600;
            break;
        case 'Days':
            $until = $GLOBALS['today'] + $plusCount * 24 * 3600;
            $endDay = strftime("%A", $until);
            if ($plusCount = 3 and $endDay == 'Monday') // perhaps friday we skipped three days...
            {
                $until += 2 * $day;
            }
            // skip the weekend
            if ($plusCount = 4 and ($endDay == 'Monday' or $endDay == 'Tuesday')) {
                $until += 2 * $day;
            }
            // skip the weekend
            if ($plusCount = 5 and ($endDay == 'Monday' or $endDay == 'Tuesday' or $endDay == 'Wednesday')) {
                $until += 2 * $day;
            }
            // skip the weekend
            if ($plusCount = 6 and ($endDay == 'Monday' or $endDay == 'Tuesday' or $endDay == 'Wednesday' or $endDay == 'Thursday')) {
                $until += 2 * $day;
            }
            // skip the weekend
            break;
        case 'Weeks':
            $until = $GLOBALS['today'] + $plusCount * 7 * 24 * 3600;
            break;
    }

    $endDay = strftime("%A", $until);

    if ($endDay == 'Saturday' or $endDay == 'Sunday') {
        $until += 2 * $day; // skip the weekend if we land on it
    }
    return ($until);
}

function Button($text, $color, $p = '', $q = '', $solid = true, $onClick = '')
{
    assertTrue(!empty($text));
    assertTrue(in_array($color, ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark', 'link']));
    assertTrue(is_bool($solid));

    $confirm = '';
    if (!empty($onClick)) {
        $confirm = "onclick=\"return(confirm('$onClick - Are you sure?'))\"";
    }

    $buttonClass = "btn btn-" . (($solid) ? '' : 'outline-') . "$color btn-sm";

    if (empty($p)) {
        return "<a class='$buttonClass' role='button' $confirm>$text</a>";
    }
    return "<a href='?p=$p&q=$q' class='$buttonClass' role='button' $confirm>$text</a>";
}

function badge($text, $color, $p = '', $q = '', $solid = true, $onClick = '')
{
    assertTrue(!empty($text));
    assertTrue(in_array($color, ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark', 'link']));
    assertTrue(is_bool($solid));

    $confirm = '';
    if (!empty($onClick)) {
        $confirm = "onclick=\"return(confirm('$onClick - Are you sure?'))\"";
    }

    // if (empty($p)) {
    //     return "<a class='$buttonClass' role='button' $confirm>$text</a>";
    // }
    // return "<a href='reserve.php?p=$p&q=$q' class='$buttonClass' role='button' $confirm>$text</a>";

    // EDIT button in blue
    $href = "href='{$GLOBALS['url']}?p=$p&q=$q'";
    $class = "class='badge bg-$color' role='button'";
    $style = "style = 'float:right;'";
    $ret = "<a $class $href $style $confirm>$text</a>";
    return ($ret);
}

/////// this is the old  ACL from 30-up
// now look at role (1=admin 2 =teacher, etc)
// can have multiple values

function ACL($role)
{ // call acl('teacher'), will return true for admin, board, teacher

    assertTrue(false, 'ACL is not set up');
    return false;

    if (!isset($_SESSION['role'])) {
        return false;
    }
    // catchall

    // $roles from lowest to highest
    // $roles = ['dancer','member','teacher','board','admin'];
    $roles = ['admin', 'board', 'teacher', 'member', 'dancer'];
    assertTrue(in_array('admin', $roles)); // this is just a test of $roles

    assertTrue(in_array($role, $roles), "Don't know how to handle '$role' in ACL()"); // this is just a test of $roles

    $position = array_search($_SESSION['role'], $roles);
    // printNice(" optained positon $position for role $role");
    // printNice(" testing $role against roles ".serialize(array_slice($roles, $position)));
    return (in_array($role, array_slice($roles, $position)));

}

function testACL()
{
    $old = $_SESSION['role'];

    $_SESSION['role'] = 'admin';
    assertTrue(ACL('admin'), 'role: ' . $_SESSION['role'] . " with test ACL('admin')");
    assertTrue(ACL('board'), 'role: ' . $_SESSION['role'] . " with test ACL('board')");

    $_SESSION['role'] = 'board';
    assertTrue(!ACL('admin'), 'role: ' . $_SESSION['role'] . " with test ACL('admin')");
    assertTrue(ACL('board'), 'role: ' . $_SESSION['role'] . " with test ACL('board')");
    assertTrue(ACL('teacher'), 'role: ' . $_SESSION['role'] . " with test ACL('teacher')");

    $_SESSION['role'] = 'teacher';
    assertTrue(!ACL('admin'), 'role: ' . $_SESSION['role'] . " with test ACL('admin')");
    assertTrue(!ACL('board'), 'role: ' . $_SESSION['role'] . " with test ACL('board')");
    assertTrue(ACL('teacher'), 'role: ' . $_SESSION['role'] . " with test ACL('teacher')");
    assertTrue(ACL('member'), 'role: ' . $_SESSION['role'] . " with test ACL('member')");

    $_SESSION['role'] = $old;
}

function twoDigit($number)
{ // returns two-digit string
    return str_pad(intval($number), 2, '0', STR_PAD_LEFT);
}

// most view functions return HTML.  this adds to a message box at the top of the page
function alertMessage($message, $alertType = "danger") // primary, secondary, success, danger, warning, info

{
    $GLOBALS['errorString'] .=
        "<div style='border: 2px solid black;' class='alert alert-$alertType' role='alert'>
                    <b>$message</b>
                </div>";

}
