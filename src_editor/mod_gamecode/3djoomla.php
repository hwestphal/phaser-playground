<?php

defined('_JEXEC') or die;

$user = JFactory::getUser();
$GLOBALS['jUserID'] = JFactory::getUser()->id;

$uri = JUri::getInstance();

// $GLOBALS['GameCode'] =  "../gamecode/";  // try relative addresses
// $GLOBALS['Games']    =  "../games/";

//  echo "<br>base(): ",$uri->base();    // base(): http://localhost/joomla/
//  echo "<br>current(): ",$uri->current();
//  echo "<br>JPATH_BASE: ",JPATH_BASE;  // JPATH_BASE: /home/tom/html/joomla
//  echo "<br>JPATH_ROOT: ",JPATH_ROOT;
//  echo "<br>JPATH_SITE: ",JPATH_SITE;
//  echo "<br>getcwd():  ", getcwd();  // getcwd('..'): /home/tom/html/joomla

if (getcwd() == false) {
    // means that this server doesn't allow getcwd because of parent permissions
    echo "<span style='color:red;'>Cannot use getcwd() on this server.</span><br>";
}

/////  MOVE INTO THE HTML DIRECTORY - IMPORTANT FOR ALL SUBSEQUENT CODE !! ///

chdir('..');
// echo "<br>getcwd('..'):  ", getcwd();    // getcwd('..'): /home/tom/html

$GLOBALS['3d'] = $uri->getScheme() . "://" . $uri->getHost() . "/3d/"; // http path
$GLOBALS['3d/dist'] = $uri->getScheme() . "://" . $uri->getHost() . "/3d/dist/"; // http path
$GLOBALS['3dCodePath'] = getcwd() . '/3d/dist/';

// we use a less file to compile into our css file.  check if the less file has changes
$cssFile = $GLOBALS['3dCodePath'] . "3d.css";
$lessFile = $GLOBALS['3dCodePath'] . "3d.less";

// quick check, anything need to be done?
$lessTime = filemtime($lessFile);
if (file_exists($cssFile)) {
    $cssTime = filemtime($cssFile);
} else {
    $cssTime = 0;
}

// looks like we have to update the CSS file
// echo '<br>time ',$lessTime, ',', $cssTime,' it is me';
if ($lessTime > $cssTime) {
    require_once "3d/lib/less.inc.php";
    echo "have required";
    $less = new lessc;
    $newCss = $less->compileFile($lessFile);
    echo "<br>about to write new css";
    file_put_contents($cssFile, $newCss);
}

// ok, ready to work on Joomla!
$document = JFactory::getDocument();

// add stylesheets
$document->addStyleSheet($GLOBALS['3d/dist'] . "3d.css");
$document->addStyleSheet($GLOBALS['3d'] . "monaco-editor/min/vs/editor/editor.main.css");

$level = 0; // assume not logged in

if ($user->id > 0) {
    $level = $user->getParam("level");

    if (empty($level)) {

        $user->setParam("role", "student"); // student, proctor, admin, teacher
        $user->setParam("level", "00"); // game level (current module)
        $user->setParam("teacherID", 0);
        $user->setParam("schoolID", 0);

        $user->setParam("3d", $GLOBALS['3d']);
        $user->setParam("3dDist", $GLOBALS['3d/dist']);
        $user->setParam("3dJoomla", $uri->base());
        $user->setParam("3dCodePath", $GLOBALS['3dCodePath']);

        $user->setParam("lastChat1", 0);
        $user->setParam("lastChat2", 0);
        $user->setParam("lastChat3", 0);
        $user->setParam("urgentMsg", "");
        $user->save(true);

        // get this guy enrolled in the level 1 group
        // --missing

        // Obtain a database connection
        // $db = JFactory::getDbo();
        // // Retrieve the shout
        // $query = $db->getQuery(true)
        //             ->select($db->quoteName('hello'))
        //             ->from($db->quoteName('#__helloworld'))
        //             ->where('lang = ' . $db->Quote('en-GB'));
        // // Prepare the query
        // $db->setQuery($query);
        // // Load the row.
        // $result = $db->loadResult();
        // // Return the Hello
        // return $result;
    }

    // and reload
    $role = $user->getParam("role");
    $level = $user->getParam("level");
}

echo "<p>My id is {$user->id}, my name is {$user->name}, my email is {$user->email}, and my username is {$user->username}, my role is '$role', my level is '$level'</p>";

$HTML = generateDisplay($level);
echo $HTML;
//$HTML = JSWorker();
//echo $HTML;

//echo "<p>My id is {$user->id}, my name is {$user->name}, my email is {$user->email}, and my username is {$user->username}</p>";

function generateDisplay($level)
{
    $user = JFactory::getUser();
//    echo "<p>My id is {$user->id}, my name is {$user->name}, my email is {$user->email}, and my username is {$user->username}, my role is '$role', my level is '$level'</p>";

    // save variables to html storage, so JS can access
    $HTML = <<<EOT
    <script>
    // Save data to sessionStorage
    sessionStorage.setItem('id', '{$user->id}');
    sessionStorage.setItem('name', '{$user->name}');
    sessionStorage.setItem('username', '{$user->username}');
    sessionStorage.setItem('level', '{$level}');
    </script>
EOT;

// a bit of a trick.  You can't tell whether we are in JOOMLA or not from the toolbar

// the 'home' button runs you back to Joomla's home page
    // the 'logoff' button similarly.  if you are in a lesson, then ALWAYS logged in

    $HTML .= <<<EOT
<div class="modbar">
    <table class="modbar" style="padding:10px;" rules="cols"><tr>

        <td class="modelement">
          <a href={$GLOBALS['3d']}><img height="20px" width="20px" src="{$GLOBALS['3d']}assets/images/home.png" data-toggle="tooltip" title="Home" /></a>
EOT;
    $HTML .= "<br/><a href={$GLOBALS['3d']}index.php?option=com_users&task=user.logout><img height=\"20px\" width=\"20px\" src=\"{$GLOBALS['3d']}assets/images/shutdown.png\" data-toggle=\"tooltip\" title=\"Logout\" /></a>";

    $HTML .= '</td>';

    $currentLesson = '01 - Learn Javascript';
    $HTML .= <<<EOT


        <td class="modelement">
          <h5 style="margin-top:2px;margin-bottom:2px;">Current Lesson</h5>
          <button class="greenbutton">{$currentLesson}
          <span class="tooltiptext">Tooltip text</span>
          </button>
        </td>
EOT;

    $HTML .= <<<EOT

        <td class="modelement">
        <h5 style="margin-top:2px;margin-bottom:2px;">Projects</h5>
        <img style="height:30px;" src="{$GLOBALS['3d']}assets/images/files.png" onclick = "document.gameCode.directory(); document.gameCode.render();" data-toggle="tooltip" title="Your Projects"/>
        </td>

        <td class="modelement">
         <h5 style="margin-top:2px;margin-bottom:2px;">Get Help</h5>
             <a href="https://communityreading.slack.com" target="_blank"><img style="height:25px;" src="{$GLOBALS['3d']}assets/images/slack.png"></a>

         <!--    <br />
          <a href="https://join.slack.com/t/communityreading/shared_invite/enQtMzY2MTU4NzczODcyLTJhODFlMDU3OGQ4YzQ3MjYyNGNjN2FhNTU3YzcyNDhlMTM1MmZjNzE1OTA3ZTMwM2RmNTgxNTk5YzcwMWMxODY">Join Slack</a>
        -->

      </td>
    </tr></table>
    </div>

EOT;

///////// now load the empty page for the course to play in.

// // load the sliding windows
    // $HTML .= "<div id='modgamecode' class='split-screen' style='height:400px;display:block' onClick='document.SplitInstance.setSizes([70, 30]);'>
    //
    //             <div id='gamecode-left' class='split split-horizontal'  style='overflow: auto;'>
    //             </div>\n
    //             <div id='gamecode-right' class='split split-horizontal'>\n
    //             </div>\n
    //
    //           </div>";


// and finally redirect to the right page

echo `<script type="text/javascript">
        location.replace("http://localhost/3d/dist");
     </script>`;


}


function JSWorker()
{
    $HTML = <<<EOT

  <!--button onclick="startWorker()">Start Worker</button>
  <button onclick="stopWorker()">Stop Worker</button>
  -->


  <output id="webworkerResult">
  </output></p>


  <script>
  window.onload = startWorker();
  ////////////////////////////////////
  /// webworker does an alarm every second

  var w;
  function startWorker() {
      if(typeof(w) == "undefined") {
          w = new Worker('../gamecode/webworkerTimer.js');
      }

      //////////  the webworker looks like this....
      // var i = 0;
      // function timedCount() {
      //     i = i + 1;
      //     postMessage(i);
      //     setTimeout("timedCount()",1000);
      // }
      // timedCount();
      ////////////////////////////////////////////

      w.onmessage = function(event) {
        if(event.data % 2 == 0) {     // every 10 seconds?
          //document.getElementById("webworkerResult").innerHTML = event.data;
          updateChatCount(event.data);
        }
      }
  }

  function updateChatCount(data){
    document.getElementById("webworkerResult").innerHTML = data;
    return;
  }

  function stopWorker() {     // no way to call this in production
      w.terminate();
      w = undefined;
  }

  </script>
EOT;

    return ($HTML);
}
