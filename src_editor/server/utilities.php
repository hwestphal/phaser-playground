<?php
defined('_KELLER') or die;

                  // turn on/off individual tests below...

//////////////////////////////////////////////////
//////////////////////////////////////////////////
//    this is the unit-tester

function runUnitTests()
{
    // these are really cheap, should always be run
    //  $o = new dbconnect();          $o->runTests();    // the mysqli wrapper
    $GLOBALS['errorString'] = '';
    $GLOBALS['tests'] =0;
    $GLOBALS['assertions'] =0;
    $GLOBALS['fails'] = 0;

    $o = new FactoryData();
    $o->runTests();    // database factory class

    $o = new AJAXLibrary();
    $o->runTests();     // AJAX functions

    $o = new filesystem();
    $o->runTests();     // AJAX functions


    echo finalReport();
    return(true);
}


//////////////////////////////////////////////////
//////////////////////////////////////////////////
//    UnitTestCase is the parent of all testable classes

class UnitTestCase
{               // no unit tests - use for production

    public $ClassBeingTested="Unknown";
    public $testFunction="Unknown";


    public function runTests()
    {
        $this->ClassBeingTested = get_class($this);
        $functions = get_class_methods($this->ClassBeingTested);

        foreach ($functions as $function) {
            if (left($function, 4) == 'test') {	// only function test----(),
                // not upda<teSt>udent() and similar
                $GLOBALS['tests'] += 1;
                $this->testFunction = $function;

                $this->$function();   // and run each test function
            }
        }

        // // now check that there are no lower-case conflicts (helps debugging)
        // $o = get_object_vars($this);
    // 	foreach($o as $key=>$value){
    // 		$k=strtolower($key).'123123';
    // 		//$this->assertTrue(!isset($lowerCase[$k]),"likely a case conflict with '$key' and '{$lowerCase[$k]}'");
    // 		if(isset($lowerCase[$k])){
    // 			$message = "likely a case conflict in '".get_class($this)."' with '$key' and '{$lowerCase[$k]}'";
    //       $this->fail++;
    //       $this->errorstring .= "<br />{$this->testFunction}:    <b>$message</b>";
    // 		}
    // 		$lowerCase[$k] = $key;
    // 	}
    }
}


function finalReport()
{
    $span = "<span style=\"padding: 8px; margin-top: 1em; background-color: green; color: white;\">";
    if ($GLOBALS['fails']>0) {
        $span = "<span style=\"padding: 8px; margin-top: 1em; background-color: red; color: white;\">";
    }

    $HTML =  "<br /><br />".$span;
    $HTML .=   " <strong>{$GLOBALS['tests']}</strong> tests,";
    $HTML .=   "  <strong>{$GLOBALS['assertions']}</strong> assertions,";
    $HTML .=   "  <strong>{$GLOBALS['fails']}</strong> fails</span>";
    $HTML .=   " <br \>{$GLOBALS['errorString']}";

    return($HTML);
}

function assertTrue($assertion, $comment="Assert Failed")
{
    if(!isset($GLOBALS['assertions'])){  // must be initialized, whether testing or not
      $GLOBALS['assertions']= 0;
      $GLOBALS['fails'] = 0;
      $GLOBALS['errorString'] = '';
    }

    $GLOBALS['assertions'] += 1;
    if (!is_bool($assertion)) { 
        // strip the comment of any HTML tags
        $GLOBALS['errorString'] .= "<br>Assertion Not TRUE or FALSE: )  <b>$comment</b>";
        $GLOBALS['errorString'] .=  " expected BOOL instead got type ". gettype($assertion) ." value:". serialize($assertion);

        $GLOBALS['fails'] += 1;
        $array = debug_backtrace(0, 3);
        foreach ($array as $key => $value) {
            $GLOBALS['errorString'] .= "<br />&nbsp;{$value['file']}({$value['line']})";
        }
    } else {   // it's a boolean, so...
        if ($assertion) {
            return($assertion);
        } else {
            $GLOBALS['fails'] += 1;
            $GLOBALS['errorString'] .= "<br />Assertion Failed:   <b>,$comment</b>";

            $array = debug_backtrace(0, 3);
            foreach ($array as $key => $value) {
                $GLOBALS['errorString'] .= "<br />&nbsp;{$value['file']}({$value['line']})";
            }
        }
    }
    return($assertion);          // allows chained assertions
}



                                                              ////


//




function trace($class="", $method="", $file="", $msg="")
{
    $traceback = '';

    $result = str_repeat('-', count(debug_backtrace()));             // show depth

//    if (!empty($method)){
//        $result .=  " $method $msg <br />";    // probably a message
//    }else{
    $result .= "$method $file $msg <br />";
//    }

    //echo $result;
    $GLOBALS['holdTrace'][] = $result;
}




function printNice($tab, $elem)
{
    if (!$GLOBALS['debugON']) {
        return;
    }   // debugging isn't on

    $HTML = printNiceHelper($elem);
    return($HTML);
}


        // helper function for printNice()
        function printNiceHelper($elem, $max_level=10, $print_nice_stack=array(), $HTML='')
        {


        // show where we were called from
            $backtrace = debug_backtrace();   // if no title, then show who called us
            if ($backtrace[1]['function']!== 'printNice' and $backtrace[1]['function']!== 'printNiceHelper') {
                if (isset($backtrace[1]['class'])) {
                    $HTML .= "<hr /><h1>class {$backtrace[1]['class']}, function {$backtrace[1]['function']}() (line:{$backtrace[1]['line']})</h1>";
                }
            }

            if (is_string($elem)) {
                $HTML .= htmlentities($elem).'<br>';
                return($HTML);
            }

            if (is_array($elem) || is_object($elem)) {
                if (in_array($elem, $print_nice_stack, true)) {
                    $document = document::singleton();		// it's a recursive function, but this is a static so should work
                    $document->errorMessage("<font color=red>RECURSION</font>");
                    $HTML .= "<hr /><h1>class {$backtrace[1]['class']}, function {$backtrace[1]['function']}() (line:{$backtrace[1]['line']})</h1>";
                    return($HTML);
                }
                if ($max_level<1) {
                    //print_r(debug_backtrace());
//die;
                    $document = document::singleton();		// it's a recursive function, but this is a static so should work
                    $document->errorMessage("<font color=red>max stack level of $max_level exceeded</font>");
                    $HTML .= "<FONT COLOR=RED>MAX STACK LEVEL OF $MAX_LEVEL EXCEEDED</FONT>";
                    return($HTML);
                }

                $print_nice_stack[]=&$elem;
                $max_level--;
                $HTML .= "<table border=1 cellspacing=0 cellpadding=3 width=100%>";
                if (is_array($elem)) {
                    $HTML .= '<tr><td colspan=2 style="background-color:#333333;"><strong><font color=white>ARRAY</font></strong></td></tr>';
                } else {
                    $HTML .= '<tr><td colspan=2 style="background-color:#333333;"><strong>';
                    $HTML .= '<font color=white>OBJECT Type: '.get_class($elem).'</font></strong></td></tr>';
                }
                $color=0;
                foreach ($elem as $k => $v) {
                    if ($max_level%2) {
                        $rgb=($color++%2)?"#888888":"#BBBBBB";
                    } else {
                        $rgb=($color++%2)?"#8888BB":"#BBBBFF";
                    }
                    $HTML .= '<tr><td valign="top" style="width:40px;background-color:'.$rgb.';">';
                    $HTML .= '<strong>'.$k."</strong></td><td>";
                    $HTML .= printNiceHelper($v, $max_level, $print_nice_stack);

                    $HTML .= "</td></tr>";
                }

                $HTML .= "</table>";
                return($HTML);
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
            return($HTML);
        }




// a wrapper to make writing history a one-liner
function history($message,$id="",$projectuuid="",$documentuuid="",$fragmentuuid=""){
    $histDB = new Fhistory();
    $histDB->historylog($message,$id,$projectuuid,$documentuuid,$fragmentuuid);
}


function writeSystemLog($action, $comment)
{
    //trace(__CLASS__,__METHOD__,__FILE__,"action = '$action'");
    $systemLog = SystemLog::singleton();
    $systemLog->write($action, $comment);
}



// this function unloads GET or POST values
function unload($parameter, $default='')
{
    if (empty($_GET[$parameter])) {
        if (empty($_POST[$parameter])) {
            $i = $default;
        } else {
            $i = $_POST[$parameter];
        }
    } else {
        $i = $_GET[$parameter];
    }

    return ($i);
}


function str_replace_single($needle, $replace, $haystack)
{ // like str_replace() but only first occurance
    $pos = strpos($haystack, $needle);
    if ($pos !== false) {
        $haystack = substr_replace($haystack, $replace, $pos, strlen($needle));
    }
    return($haystack);
}


class HTMLTester extends UnitTestCase
{
    public $tagCounts = array();

    public function testHTMLTester()
    {
        $string = "<html><body><table><tr><td>first element</td><td>second element<img stuff here /></td></tr></table></body></html>";
        return($this->validate($string));   // assertions are already in the validation
    }

    public function validate($string)
    {
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
                    $this->assertTrue(false, "Unmatched closing tag '$cleanTag' (got '/{$openTag['clean']}' instead) at '".htmlentities('<'.substr($string, $openTag['start'], 100))."'");
                    break;
                }
            } else {
                $s = ($start - strlen($tag) - 1);
                $stack[] = array('clean'=>$cleanTag,'start'=>$s);
            }
            //echo serialize($stack),"<br>";
        }

        if (!$goodHTML) {
            $this->assertTrue(false, 'bad html, see debug tab');
            $document = document::singleton();
            $document->writeTabDebug('Bad HTML', $this->format($string));
        }
        return($goodHTML);
    }


    public function format($string)
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
}

//////////////////////////////////////////////////
class UtilityTests extends UnitTestCase
{
    public function testSystemLog()
    {
        writeSystemLog('test', "This is a test of SystemLog()");

        $systemLog = SystemLog::singleton();
        $ret = $systemLog->getLast20();
        printNice('SysLog20', $ret);

        return(true);
    }
}






///////////////////////////////////////////
//  we create a wrapper for system stuff
///////////////////////////////////////////

class systemStuff
{


    // this returns the front of our url, always called 'phonics'
    public function URL_Base()
    {
        $URL = $GLOBALS['SSL'].$_SERVER['SERVER_NAME'].'/phonics/';
        //echo "URL_Base() is $URL<br>";
        return($URL);
    }

    // this returns the server location for URL_Base() files
    public function FILE_Base()
    {
        $root = $_SERVER['DOCUMENT_ROOT'].'/phonics/';
        //echo "FILE_Base() is $root<br>";
        return($root);                          // eg:  d:/html/phonics/
    }

    // remaining functions should ALWAYS use URL_Base() or FILE_Base()


    public function PHONICS_Base()
    {
        $root = $this->FILE_Base().$GLOBALS['PVersion'].'/';
        //echo "PHONICS_Base() is $root<br>";
        return($root);    // d:/html/phonics/201/
    }

    public function PHONICS_URL()
    {
        $base = $this->URL_Base().$GLOBALS['PVersion'].'/';
        //echo "PHONICS_URL() is $base<br>";
            return($base);       //    /phonics/201/
    }


    // pull a graphic from WP directory
    public function wpGraphic($icon)
    {
        $dir = "wordart_00";
        $HTML = "<img src='".$GLOBALS['SSL']."communityreading.org/wp/images/$dir/$icon' style='max-width:500px;' />";
        return($HTML);
    }

    // since this is done in a single place, we can encrypt one day...
    public function buildURL($handler, $action, $param1='', $param2='', $param3='')
    {
        $addons = "?";

        if ($GLOBALS['isWordpress']) {
            $addons .= "page_id=3287&amp;";
        }

        $addons .= "handler=$handler&amp;action=$action";


        $param1 = rawurlencode($param1);
        $param2 = rawurlencode($param2);
        $param3 = rawurlencode($param3);

        if (!empty($param1)) {
            $addons .= "&amp;P1=$param1";
        }
        if (!empty($param2)) {
            $addons .= "&amp;P2=$param2";
        }
        if (!empty($param3)) {
            $addons .= "&amp;P3=$param3";
        }
        $addons .= "&amp;time=".time();

        //		$URL = $GLOBALS['uriPath'] . $addons ;		// $GLOBALS['getPath'] is the Joomla base address
        $URL = $this->PHONICS_URL() . $addons ;		// $GLOBALS['getPath'] is the Joomla base address
        //echo "buildURL($handler,$action,$param1,$param2,$param3) is $URL<br>";
        return($URL);
    }


    // same thing, but for forms.
    public function buildFormURL($handler, $action, $param1='', $param2='', $param3='')
    {
        $URL = "$handler.$action";
        if (!empty($param1)) {
            $URL .= '.'.$param1;
        }
        if (!empty($param2)) {
            $URL .= '.'.$param2;
        }
        if (!empty($param3)) {
            $URL .= '.'.$param3;
        }
        return($this->URL_Base().$URL);
    }

    // same thing, but for Icons.
    public function buildIconURL($icon, $size, $dir, $title, $handler, $action, $param1='', $param2='', $param3='')
    {
        $addons = "?handler=$handler&amp;action=$action";
        $param1 = rawurlencode($param1);
        $param2 = rawurlencode($param2);
        $param3 = rawurlencode($param3);
        if (!empty($param1)) {
            $addons .= "&amp;P1=$param1";
        }
        if (!empty($param2)) {
            $addons .= "&amp;P2=$param2";
        }
        if (!empty($param3)) {
            $addons .= "&amp;P3=$param3";
        }
        $addons .= "&amp;time=".time();

        $URL = "<a href=\"{$this->URL_Base()}{$addons}\"><img title=\"$title\" src=\"{$this->PHONICS_URL()}png/{$size}x{$size}/{$dir}/{$icon}.png\" /></a>";
        $URL = str_replace('/?', '?', $URL);  // avoid url/?addons
        return($URL);
    }

    // same thing, but for images (eg: matrix)
    public function buildImageURL($image, $style='', $onClick='', $alt='')
    {
        $myStyle = $myAlt = '';
        if (!empty($style)) {
            $myStyle = "style='".$style."'";
        }
        if (!empty($alt)) {
            $myAlt = "alt='".$alt."'";
        }

        $URL = "<img src=\"{$this->PHONICS_URL()}images/{$image}\" $myStyle $myAlt />";
        return($URL);
    }

    // same thing, but for form submit (can only use for single-button forms)
    public function buildIconSubmit($icon, $size, $dir, $title, $handler, $action, $param1='', $param2='', $param3='', $onClick='')
    {
        $clk = '';
        if (!empty($onClick)) {
            $clk = "onClick=\"$onClick\"";
        }

        $addons = "?handler=$handler&amp;action=$action";
        $param1 = rawurlencode($param1);
        $param2 = rawurlencode($param2);
        $param3 = rawurlencode($param3);
        if (!empty($param1)) {
            $addons .= "&amp;P1=$param1";
        }
        if (!empty($param2)) {
            $addons .= "&amp;P2=$param2";
        }
        if (!empty($param3)) {
            $addons .= "&amp;P3=$param3";
        }
        $addons .= "&amp;time=".time();

        $URL = "<a href=\"{$GLOBALS['uriPath']}$addons\" $clk><img type=\"image\" src=\"{$this->PHONICS_URL()}png/{$size}x{$size}/{$dir}/{$icon}.png\" /></a>";
        $URL = str_replace('/?', '?', $URL);  // avoid url/?addons
        return($URL);
    }



    // same thing, but just the icon, no link
    public function showIcon($icon, $size, $dir, $title='', $onClick='', $id='')
    {      // onClick eg:  myFunc(parm);    (we put in the quotes)
        if (!empty($id)) {
            $id = " id=\"$id\" ";
        }
        $img = $URL = "<img title=\"$title\" src=\"{$this->PHONICS_URL()}png/{$size}x{$size}/{$dir}/{$icon}.png\" $id class=\"ui-li-icon\" />";
        if (!empty($onClick)) {
            $clk = "onClick=\"$onClick\"";
            $URL = "<a HREF='javascript:$clk'>$img</a>";
        }
        return($URL);
    }

    public function Tomlib_Base()
    {
        return("../tomlib/");               //    d:/html/tomlib/
    }

    public function jquery()
    {                      // JQUERY stuff is in the root of PHONICS
        $base = $this->PHONICS_URL()."jquery/";
        return($base);
    }

    public function views()
    {
        $base = $this->PHONICS_URL()."views/";
        return($base);
    }

    public function tinyMCE()
    {                      // JQUERY stuff is in the root of PHONICS
        $base = $this->URL_Base()."tiny_mce/";
        return($base);
    }

    public function texts()
    {
        $base = $this->FILE_Base()."{$GLOBALS['PVersion']}/texts/";
        return($base);
    }

    public function images($image='')
    {
        $base = $this->URL_Base()."images/$image";
        return($base);
    }

    // function libchart(){
        // $base = $this->FILE_Base()."libchart/libchart/";
        // return($base);
    // }
}




// some utility functions

function iif($condition, $true, $false='')
{
    return ($condition ? $true : $false);
}
function boolStr($x)
{
    return (is_bool($x) ? ($x ? "true":"false"):$x);
}

function microtime_float()
{
    list($usec, $sec) = explode(" ", microtime());
    return ((float)$usec + (float)$sec);
}


function left($string, $len=1)
{
    return substr($string, 0, $len);
}




//////////////////////////////////////////////////////////////////
///////////////  write log files

function writeLog($file, $string)
{
    clearstatcache();     // otherwise file_exists looks at old data

    $handle = fopen($file, 'a+');
    if ($handle) {
        fwrite($handle, "\n\n". date("Y-m-d H:i:s"). "\n".$string);
        fflush($handle);
        if (!fclose($handle)) {
            trigger_error("cannot close file $file");
        }
    } else {
        trigger_error("cannot open $file to say $string");
    }
}

  function writeDBLog($query, $result)
  {
      $data = "IN:  " . json_encode($query) . "\nOUT: ". json_encode($result) ;
      writeLog('AJAX_queryLog.log', $data);
  }

  function writeErrorLog($where, $message)
  {
      $data = "IN:  " . json_encode($where) . "\nOUT: ". json_encode($message) ;
      writeLog('AJAX_errorLog.log', $data);
  }

  function writeAJAXLog($in, $out)
  {
      $data = "IN:  " . json_encode($in) . "\nOUT: ". json_encode($out) ;
      writeLog('AJAX_callLog.log', $data);
  }

  function writeSimpleAJAXLog($in, $out)
  {
      $data = "IN:  " . $in . "\nOUT: ". $out ;
      writeLog('AJAX_callLog.log', $data);
  }

  function writeDebugLog($in, $out)
  {
      $data = "IN:  " . $in . "\nOUT: ". $out ;
      writeLog('AJAX_DebugLog.log', $data);
  }



///////////////////////////////////////////////

function defaultHTMLdocument(){
  $HTML = "<HTML><HEAD></HEAD><BODY></BODY></HTML>";
  return($HTML);
}
