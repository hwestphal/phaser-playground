<?php

defined('_KELLER') or die('cannot access views.php directly');

class Views extends UnitTestCase
{

    public function htmlHeader()
    {
        $HTML = "<!DOCTYPE html>
                    <html lang='en'>
                    <head>
                        <meta charset=UTF-8>
                        <title><b>MATHCODE Editor</b></title>

                        <!-- jquery  3.5.1 -->
                        <script src='https://code.jquery.com/jquery-3.5.1.min.js'  crossorigin='anonymous'></script>
                        <!--script src='https://code.jquery.com/ui/1.12.1/jquery-ui.js'></script-->


                        <link rel='stylesheet' href='//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css'>
                        <script src='https://code.jquery.com/ui/1.12.1/jquery-ui.js'></script>

                        <!-- bootstrap-5.1.0 -->
                        <link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css'>
                        <script src='https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.min.js'></script>

                        <!-- tinyMCE -->
                        <script src='https://cdn.tiny.cloud/1/rj9dbfq7jyvk2dec9zridnbc8qs622xo61ma9gmrta4c6t2g/tinymce/5/tinymce.min.js' referrerpolicy='origin'></script>

                    </head>
                    <body onload='window.history.pushState(null, null, `index.php`);'>
                    <script>
                    tinymce.init({
                        selector: 'textarea',
                        height: 500,
                        menubar: false,
                        plugins: [
                          'advlist autolink lists link image charmap print preview anchor',
                          'searchreplace visualblocks code codesample fullscreen',
                          'insertdatetime media table paste link image code help wordcount'
                        ],
                        toolbar: 'undo redo | formatselect | ' +
                        'bold italic underline strikethrough backcolor |' +
                        //'alignleft aligncenter alignright alignjustify |' +
                        'bullist numlist outdent indent | ' +
                        'removeformat | insertfile image media link codesample | code  | help',
                        extended_valid_elements : 'mycustomblock[id],mycustominline',
                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                      });


                  </script>
                    <div class='container'>
                    <div class='row'>
                    ";
        return ($HTML);
    }

    public function htmlFooter()
    {
        $HTML = '</div></div></body></html>';
        return ($HTML);
    }

    public function titleBar()
    {
        $debug = '';

        if ($GLOBALS['debugMode']) {
            $debug = '
            <li class="nav-item active dropdown border"><a class="nav-link dropdown-toggle" data-toggle="dropdown" >Debug<span class="caret"></span></a>
                <ul class="dropdown-menu">
                    <li><a class="nav-link active" href="?RunUnitTests">Run Unit Tests</a></li>
                    <li><a class="nav-link active" href="?testAging">Step Test</a></li>
                </ul>
            </li>';
        }

        $reports = '
            <li class="nav-item active dropdown border"><a class="nav-link dropdown-toggle" data-toggle="dropdown" >Reports<span class="caret"></span></a>
                <ul class="dropdown-menu">
                    <li><a class="nav-link active" href="?errorLog">Error Log</a></li>
                    <li><a class="nav-link active" href="?nov2019">Nov 2019 Upgrade</a></li>
                </ul>
            </li>';

        $HTML = '';

        // // put up a little message if the error file has been created.
        // if(file_exists($GLOBALS['logfilename'])){
        //     $HTML .= "<span style='text-font:7px;background-color:pink;'>There is an error log. Please notify Tom.</span></br>";
        // }

        $HTML = '';
        $HTML .= '

            <nav class="navbar navbar-expand-lg navbar-light bg-light" style="border-color:blue;border-style:solid;>
            <a href="#" class="navbar-left"><img src="logo.png" height="40px" style="margin-right:50px"></a>

            <div class="container-fluid">
              <a class="navbar-brand" href="#">MathCode Editor</a>

              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>

              <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">';

        $HTML .= '
                <li class="nav-item btn btn-sm btn-outline-primary">
                    <a class="nav-link active" href="?p=showCourses">Courses</a>
                </li>';

        ////////////// examples for navbar
        // $HTML .= '
        // <li class="nav-item">
        //     <a class="nav-link active" aria-current="page" href="#">Home</a>
        //   </li>
        //   <li class="nav-item">
        //     <a class="nav-link" href="#">Link</a>
        //   </li>
        //   <li class="nav-item dropdown">
        //     <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
        //       Dropdown
        //     </a>
        //     <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
        //       <li><a class="dropdown-item" href="#">Action</a></li>
        //       <li><a class="dropdown-item" href="#">Another action</a></li>
        //       <li><hr class="dropdown-divider"></li>
        //       <li><a class="dropdown-item" href="#">Something else here</a></li>
        //     </ul>
        //   </li>
        //   <li class="nav-item">
        //     <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
        //   </li>';

        $HTML .= '

                  </ul>
                <form class="d-flex">
                  <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                  <button class="btn btn-outline-success" type="submit">Search</button>
                </form>
              </div>
            </div>
          </nav>
          ';

        return ($HTML);
    }

    public function debugMsg()
    {
        $HTML = '';
        if ($GLOBALS['debugMode']) {
            $HTML .= '<div class="alert alert-warning" role="alert">
                    <b>WE ARE IN DEBUG MODE.</b>
                    </div>';
        }

        return ($HTML);
    }

    public function fileDirectory()
    {
        $files = scandir($GLOBALS['path']);
        $files = array_diff(scandir($GLOBALS['path']), array('.', '..')); // remove . and ..

        $HTML = '<table>';
        foreach ($files as $r) {
            $d = date("F d Y H:i:s", filemtime($GLOBALS['path'] . '/' . $r));
            $s = filesize($GLOBALS['path'] . '/' . $r);
            $HTML .= "<tr><td>$r.&nbsp;&nbsp;</td><td>$d,&nbsp;&nbsp;</td><td>$s bytes</td></tr>";
        }
        $HTML .= '</table>';
        $HTML .= '<hr>';
        return ($HTML);
    }

    public function loginScreen()
    {

        $HTML = '<div class="container">
                    <form action="limits.php?login" method="post">
                        <div class="form-group row">
                            <label for="lgFormGroupInput" class="col-sm-2 col-form-label col-form-label-lg">Email</label>
                            <div class="col-sm-5">
                            <input type="email" class="form-control form-control-lg" name="loginemail" placeholder="you@example.com">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="smFormGroupInput" class="col-sm-2 col-form-label col-form-label-lg">Password</label>
                            <div class="col-sm-5">
                            <input type="password" class="form-control form-control-lg" name="loginpassword" placeholder="password">
                            </div>
                        </div>

                    <br><br>

                    <!-- the default button is the FIRST button.   I want the default to be the Login.   So I have
                         THREE buttons, and the first one is HIDDEN.  It is the default action if you just hit ENTER.  -->

                    <button style="visibility: hidden;" type="submit" name="loginverify"></button>;

                    <button style="float:left;margin-right:400px;" type="submit" class="btn btn-warning" name="logincreate">Create New Account</button>
                    <button style="float:left;" type="submit" class="btn btn-primary" name="loginverify">Log In</button>;

                    </form>
                </div>';

        $HTML .= '<br><br><div class="alert alert-info" role="alert">
        <b>THIS SITE HAS ONLY BEEN TESTED WITH THE CHROME BROWSER.  IT WILL NOT WORK PROPERLY WITH MICROSOFT EDGE.</b>
        </div>';

        return ($HTML);
    }

    public function oldBody()
    {

        $HTML = '

    <br><br><br><math id="testmath"></math><br>
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
                document.getElementById("tomseditor").value = reader.result
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
            <input type="hidden" id="payload" name="q" value="" />
        </form>
        </div>
        <script>
            console.log("linking PHPSave");
            function copyeditor(){
                let payload = document.getElementById("tomseditor").value
                // alert(payload)
                document.getElementById("payload").value = payload
            }
        </script>

        <div style="float:right">
        <button onclick="alert("boo")">Click me</button>
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

    <script src="bundle.js"></script>
    ';

        return ($HTML);

    }

    public function directory()
    {
        $a = new activities();

    }

    ///////////////////////////////
    ///////// courses /////////////
    ///////////////////////////////

    public function addEditCourseForm($isAdd, $form = []) // or edit

    {
        $HTML = '';

        if ($isAdd) {
            $return = '<input type="hidden" name="p" value="saveCourseForm"></input>';
            $name = '';
            $summary = '';
            $sequence = '';
        } else {
            printNice($form);
            $return = '<input type="hidden" name="p" value="updateCourseForm" />
                       <input type="hidden" name="q" value="' . $form['uniq'] . '" />';
            $name = $form['coursename'];
            $summary = $form['coursesummary'];
            $sequence = $form['coursesequence'];
        }

        $HTML .=
            "<div class='container'>
        <div class='row'>";

        $HTML .=
            "<form>
            $return
            <div class='form-group'>
                  <label for='courseName'>Course Name</label>
                  <input type='text' class='form-control' name='coursename' value = '$name'placeholder='Course Name' required></input>
            </div>
            <div class='form-group'>
                  <label for='courseSummary'>Course Summary</label>
                  <textarea class='form-control' name='coursesummary' rows='5' placeholder='Course Summary'>$summary</textarea>
            </div>
            <div class='form-group'>
                <label for='courseSequence'>Sequence #</label>
                <input type='number' class='form-control' name='coursesequence' value='$sequence'></input>
            </div>
            <button type='submit' class='btn btn-primary'>Submit</button>
        </form>";

        $HTML .=
            "</div>
            </div>";

        return ($HTML);

    }

    public function showAllCourses()
    {

        $HTML = '';

        $course = new courses();
        $ret = $course->allCourses();
        // printNice($ret);

        $course = new courses();
        // $HTML = $course->show($ret);

        $add = button('add', 'warning', 'addCourseForm');
        $resequence = button('resequence', 'primary', 'resequenceCourses');

        $HTML .= "<h3>Courses $add $resequence</h3>
        <table class='table'>
        <thead>
          <tr>
            <th></th>   <!-- buttons -->
            <th>Sequence</th>
            <th>#</th>
            <th>Name</th>
            <th>Summary</th>
            <th></th>   <!-- buttons -->
          </tr>
        </thead>

        <tbody>";

        foreach ($ret as $r) {
            $edit = button('edit', 'primary', 'editCourseForm', $r['uniq']);
            $delete = button('delete', 'danger', 'updateCourseForm', $r['uniq'], true, "Delete this Course?");
            $open = button('open', 'success', 'showTopics', $r['uniq']);
            $HTML .= "
          <tr>
            <td>$open</td>   <!--buttons-->
            <th>{$r['coursesequence']}</th>
            <td>{$r['uniq']}</td>
            <td>{$r['coursename']}</td>
            <td>{$r['coursesummary']}</td>
            <td>$edit&nbsp;$delete</td>   <!--buttons-->
          </tr>";
        }
        $HTML .= "
          </tbody>
        </table> ";

        return $HTML;
    }

    ///////////////////////////////
    ///////// topics //////////////
    ///////////////////////////////

    public function addEditTopicForm($isAdd, $courseuniq, $form = []) // or edit

    {
        $HTML = '';

        $courses = new courses();
        $course = $courses->showCourse($courseuniq);
        printNice($courseuniq);
        printNice($course);

        printNice($form);

        if ($isAdd) {
            $return = '<input type="hidden" name="p" value="saveTopicForm"></input>';
            $name = '';
            $summary = '';
            $sequence = '';
        } else {
            printNice($form);
            $return = '<input type="hidden" name="p" value="updateTopicForm" />
                       <input type="hidden" name="q" value="' . $form['uniq'] . '" />';
            $name = $form['topicname'];
            $expectations = $form['topicexpectations'];
            $sequence = $form['topicsequence'];
        }

        $HTML .=
            "<div class='container'>
        <div class='row'>";

        $HTML .=
            "<form>
            <input type='hidden' name='courseuniq' value='$courseuniq' />

            $return
            <div class='form-group'>
               <label for='topicName'>Course Name</label>
               <input type='text' class='form-control' name='coursename' value = '{$course[0]['coursename']}' disabled></input>
            </div>

            <div class='form-group'>
                  <label for='topicName'>Topic Name</label>
                  <input type='text' class='form-control' name='topicname' value = '$name'placeholder='Topic Name' required></input>
            </div>
            <div class='form-group'>
                  <label for='topicSummary'>Topic Expectations</label>
                  <textarea class='form-control' name='topicexpectations' rows='5' placeholder='Topic Expectations'>$expectations</textarea>
            </div>
            <div class='form-group'>
                <label for='topicSequence'>Sequence #</label>
                <input type='number' class='form-control' name='topicsequence' value='$sequence'></input>
            </div>
            <button type='submit' class='btn btn-primary'>Submit</button>
        </form>";

        $HTML .=
            "</div>
            </div>";

        return ($HTML);

    }

    public function showAllTopics($courseuniq)
    {

        $HTML = '';

        $course = new courses();
        $c = $course->showCourse($courseuniq);
        // printNice($courseuniq);
        // printNice($c);

        $cname = $c[0]['coursename'];

        $topic = new topics();

        $ret = $topic->allTopics($courseuniq);
        printNice($ret);

        $add = button('add', 'warning', 'addTopicForm', $courseuniq);
        $resequence = button('resequence', 'primary', 'resequenceTopics', $courseuniq);
        $HTML .= "<h3>Topics in <b>'$cname'</b>  $add $resequence</h3>
        <table class='table'>
        <thead>
          <tr>
            <th></th>   <!-- buttons -->
            <th>Sequence</th>
            <th>#</th>
            <th>Name</th>
            <th>Summary</th>
            <th></th>   <!-- buttons -->
          </tr>
        </thead>

        <tbody>";

        foreach ($ret as $r) {
            $edit = button('edit', 'primary', 'editTopicForm', $r['uniq']);
            $delete = button('delete', 'danger', 'updateTopicForm', $r['uniq'], true, "Delete this Topic?");
            $open = button('open', 'success', 'showActivities', $r['uniq']);
            $HTML .= "
          <tr>
            <td>$open</td>   <!--buttons-->
            <th>{$r['topicsequence']}</th>
            <td>{$r['uniq']}</td>
            <td>{$r['topicname']}</td>
            <td>{$r['topicexpectations']}</td>
            <td>$edit&nbsp;$delete</td>   <!--buttons-->
          </tr>";
        }
        $HTML .= "
          </tbody>
        </table> ";

        return $HTML;
    }

    ///////////////////////////////
    ///////// activities //////////
    ///////////////////////////////

    public function showAllActivities($topicuniq)
    {

        $HTML = '';

        $course = new courses();

        $topic = new topics();
        $t = $topic->showTopic($topicuniq);
        $tname = $t[0]['topicname'];

        $a = new activities();
        $ret = $a->allActivities($topicuniq);
        // printNice($ret);

        $add = button('add', 'warning', 'addActivityForm', $topicuniq);
        $resequence = button('resequence', 'primary', 'resequenceTopics');
        $HTML .= "<h3>Activities in '$tname'  $add $resequence</h3>
            <table class='table'>
            <thead>
              <tr>
                <th></th>   <!-- buttons -->
                <th>Sequence</th>
                <th>#</th>
                <th>Name</th>
                <th>Type</th>
                <th>Size</th>
                <th>Summary</th>
                <th>LastEdit</th>
                <th></th>   <!-- buttons -->
              </tr>
            </thead>

            <tbody>";

        foreach ($ret as $r) {
            $edit = button('edit', 'primary', 'editActivityForm', $a['uniq']);
            $delete = button('delete', 'danger', 'updateActivityForm', $a['uniq'], true, "Delete this Activity?");
            $open = button('open', 'success', 'showActivities', $a['uniq']);
            $len = strlen($r['content']);
            $HTML .= "
              <tr>
                <td>$open</td>   <!--buttons-->
                <th>{$r['act_sequence']}</th>
                <td>{$r['uniq']}</td>
                <td>{$r['act_title']}</td>
                <td>{$r['act_type']}</td>
                <td>$len</td>
                <td>{$r['act_expect']}</td>
                <td>{$r['datelastedit']}</td>
                <td>$edit&nbsp;$delete</td>   <!--buttons-->
              </tr>";
        }
        $HTML .= "
              </tbody>
            </table> ";

        return $HTML;
    }

    public function addEditActivityForm($isAdd, $topicuniq, $form = []) // or edit

    {
        $HTML = '';

        printNice($form);

        $topics = new topics();
        $topic = $topics->showTopic($topicuniq);
        printNice($topic);

        if ($isAdd) {
            $return = '<input type="hidden" name="p" value="saveActivityForm"></input>';
            $name = '';
            $summary = '';
            $expectation = '';
            $sequence = '';
        } else {
            printNice($form);
            $return = '<input type="hidden" name="p" value="updateActivityForm" />
                           <input type="hidden" name="q" value="' . $form['uniq'] . '" />';
            $name = $form['topicname'];
            $expectation = $form['act_expect'];
            $sequence = $form['topicsequence'];
        }

        $HTML .=
            "<div class='container'>
            <div class='row'>";

        $HTML .=
            "<form>
                <input type='hidden' name='topicuniq' value='$topicuniq' />

                $return
                <div class='form-group'>
                   <label for='topicName'>Course Name</label>
                   <input type='text' class='form-control' name='coursename' value = '$name'placeholder='Topic Name' disabled></input>
                </div>

                <div class='form-group'>
                      <label for='activityName'>Activity Name</label>
                      <input type='text' class='form-control' name='activityname' value = '$name'placeholder='Activity Name' required></input>
                </div>
                <div class='form-group'>
                <label for='activityName'>Activity Type</label>";

        if ($isAdd) { // once you set the TYPE of the activity, you can't change it
            $HTML .= "
                              <select class='form-control' name='act_type'>
                                  <option value='mathcode'>Mathcode</option>
                                  <option value='quiz'>Quiz</option>
                              </select>";
        } else {
            $HTML .= "<input type='text' class='form-control' name='activitytype' value = '{$form[0]['act_type']} disabled></input>";

        }

        $HTML .= "
                </div>

                <div class='form-group'>
                      <label for='activityDesc'>Activity Expectation</label>
                      <textarea class='form-control' name='act_expect' rows='5' placeholder='Activity Description'>$expectation</textarea>
                </div>

                <div class='form-group'>
                    <label for='activitySequence'>Sequence #</label>
                    <input type='number' class='form-control' name='act_seq' value='$sequence'></input>
                </div>
                <button type='submit' class='btn btn-primary'>Submit</button>
            </form>";

        $HTML .=
            "</div>
                </div>";

        return ($HTML);

    }

    public function login()
    {
        $HTML = '';

        $HTML =
            '<form class="form-group form-signin" action="index.php" method="post">
        <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
        <input type="hidden" name="p" value="signin"></input>

        <div class="form-group">
            <label for="inputEmail">Email address</label>
            <input type="email" name="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus>
        </div>
        <div class="form-group">
           <label for="inputPassword"">Password</label>
           <input type="password" name="password" id="inputPassword" class="form-control" placeholder="Password" required>
        </div>

        <input class="btn btn-lg btn-primary btn-block" type="submit" value="Submit"></input>
        </form>';

        $HTML .=
            '<form class="form-signin" action="index.php" method="post">
        <br><br><br><br><h2 class="h3 mb-3 font-weight-normal">Don\'t have a account?</h2>
        <input type="hidden" name="p" value="registerAndWaiver"></input>
        <input class="btn btn-lg btn-secondary btn-block" type="submit" value="Register"></input>';

        $HTML .= "<br><br>Forgot your password?  Contact <b>admin@30-up.com</b> and we'll reset it.";

        $HTML .= '</form>';

        return ($HTML);
    }

    public function resetPassword($email)
    {
        $HTML =
            '<form class="form-group form-signin" action="index.php" method="post">
                <h1 class="h3 mb-3 font-weight-normal">Please Enter a New Password</h1>
                <input type="hidden" name="p" value="resetpassword"></input>
                <input type="hidden" name="email" value="' . $email . '"></input>

                <div class="form-group">
                <label for="inputPassword"">New Password</label>
                <input type="password" name="password" id="inputPassword" class="form-control" placeholder="Password" required>
                </div>

                <input class="btn btn-lg btn-primary btn-block" type="submit" value="Submit"></input>
            </form>';

        return ($HTML);

    }

    public function registerAndWaiver()
    {
        $HTML = '';

        $HTML .= '<div class="container">';

      
        $HTML .=
            '<form class="form-register" action="index.php" method="post">';

        $HTML .=
            '<br><br><h3>REGISTER</h3>
      
        <input type="hidden" name="p" value="register"></input>

        <label for="firstname">First Name</label>
        <input type="text" name="firstname" id="firstname" class="form-control" placeholder="First Name" required>

        <label for="lastname">Last Name</label>
        <input type="text" name="lastname" id="lastname" class="form-control" placeholder="Last Name" required>

        <label for="email">Email</label>
        <input type="email" name="email" id="email" class="form-control" placeholder="Email" required>

        <label for="phone">Phone</label>
        <input type="phone" name="phone" id="phone" class="form-control" placeholder="Phone" required>

        <label for="password">Password</label>
        <input type="password" name="password" id="password" class="form-control" placeholder="Password" required>


        <input class="btn btn-lg btn-primary btn-block" type="submit" value="Register"></input>

        </form>';

        $HTML .= '</div>';

        return ($HTML);
    }

}
