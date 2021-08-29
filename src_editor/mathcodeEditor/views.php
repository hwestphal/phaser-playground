<?php

defined('_KELLER') or die('cannot access views.php directly');

class Views extends UnitTestCase
{

    public $codeEditorPage = true;

    public function htmlHeader()
    {
        $HTML = "<!DOCTYPE html>
                    <html lang='en'>
                    <head>
                        <meta charset=UTF-8>
                        <title><b>MATHCODE Editor</b></title>

                        <!-- jquery  3.5.1 -->
                        <script src='../../lib/jquery-3.5.1.min.js'  crossorigin='anonymous'></script>

                        <link rel='stylesheet' href='../../lib/jquery-ui.css' />
                        <script src='../../lib/jquery-ui.js'></script>

                        <!-- bootstrap-5.1.0 -->
                        <link rel='stylesheet' href='../../lib/bootstrap.min.css' />
                        <script src='../../lib/bootstrap.min.js'></script>

                        <!-- tinyMCE -->
                        <!--script src='https://cdn.tiny.cloud/1/rj9dbfq7jyvk2dec9zridnbc8qs622xo61ma9gmrta4c6t2g/tinymce/5/tinymce.min.js' referrerpolicy='origin'></script-->
                        <script src='../../lib/tinymce.min.js' referrerpolicy='origin'></script>

                        <!-- our css -->
                        <link rel='stylesheet' href='../../dist_editor/3d.css' />

                    </head>
                    <body>"; //  onload='window.history.pushState(null, null, `index.php`);'>

        // notes for TINY MCE

        //===schema
        //The schema option enables you to switch between the HTML4 and HTML5
        // schema. This controls the valid elements and attributes that can be
        // placed in the HTML. This value can either be the default html5, html4 or html5-strict.

        // The html5 schema is the full HTML5 specification including the older
        // HTML4 elements for compatibility. The html5-strict will only allow the
        // elements that are in the current HTML5 specification excluding things
        // that were removed. The html4 schema includes the full html4 transitional
        // specification.

        // Also note that all event attributes are excluded by default since it’s a
        // bad practice to use inline script handles like “onclick”. You can manually
        // add extra elements and attributes using the extended_valid_elements option.

        //=== valid_elements
        // The valid_elements option defines which elements will remain in the edited
        // text when the editor saves. You can use this to limit the returned HTML to a subset.

        // This option contains a comma separated list of element conversion
        // chunks. Each chunk contains information about how one element and its
        // attributes should be treated. The default rule set for this option is
        // a mixture of the full HTML5 and HTML4 specification or the HTML5 or
        // HTML4 specification depending on the configured schema.

        //If you just want to add or change some behavior for a few items, use
        //the extended_valid_elements option

        // ===extended_valid_elements
        // This option is very similar to valid_elements. The only difference
        // between this option and valid_elements is that this one gets added
        // to the existing rule set. This can be very useful if the existing
        // rule set is fine but you want to add some specific elements that
        // also should be valid. The default rule set is controlled by the schema option.

        // When adding a new attribute by specifying an existing element rule (e.g. img), the entire rule for that element is over-ridden so be sure to include all valid attributes not just the one you wish to add. See valid_elements for default rules.

        $HTML .= "
                    <script>



                    tinymce.init({
                        selector: 'textarea#mathcode',
                        height: 500,
                        menubar: false,
                        plugins: [
                          'advlist autolink lists link image charmap print preview anchor',
                          'searchreplace visualblocks code codesample fullscreen',
                          'insertdatetime media table paste link image code help wordcount'
                        ],
                        toolbar: 'bold italic underline backcolor |' +
                        //'alignleft aligncenter alignright alignjustify |' +
                        'bullist numlist outdent indent | ' +
                        'removeformat | insertfile image media link codesample | code  | help',

                        extended_valid_elements: 'img[class=myclass|!src|border:0|alt|title|width|height|style]',
                        //  <p><img style='display: block; margin-left: auto; margin-right: auto;' title='Tiny Logo' src='https://www.tiny.cloud/labs/android-chrome-256x256.png' alt='TinyMCE Logo' width='128' height='128' /></p>

                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                      });


                  </script>

                  <br><br><br>  <!-- get out from under the header -->
                    <div class='container-fluid'>

                    <div class='row'>
                    ";
        return ($HTML);
    }

    public function htmlFooter()
    {
        $HTML = '';

        $HTML .= "<script src='dist/bundle.app.js'></script>";
        $HTML .= '</body></html>';
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

            <nav class="navbar navbar-expand-lg navbar-light bg-light" style="border-color:blue;border-style:solid;">
            <a href="#" class="navbar-left"><img src="logo.png" height="40px" style="margin-right:50px;"></img></a>

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

        $HTML .= '
                <li class="nav-item btn btn-sm btn-outline-primary">
                    <a class="nav-link active" href="?p=showAllActivities">Outline</a>
                </li>';

        $HTML .= '
                <li class="nav-item btn btn-sm btn-outline-primary">
                    <a class="nav-link active" href="?p=login">Logout</a>
                </li>';

        if ($this->codeEditorPage) { // only put up the run/save if
            $HTML .= '
            <li class="nav-item btn btn-sm" >
            </li>
            <button class="btn-warning" id="run">Save&Run</button>
                ';
        }
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
                </div>  
                </div>
                <form class="d-flex">
                  <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input>
                  <button class="btn btn-outline-success" type="submit">Search</button>
                </form>
          </nav>
          
          ';

        //   printNice(htmlspecialchars($HTML));
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
                    <form action="?login" method="post">
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

        $return = '<input type="hidden" name="p" value="saveTopicForm"></input>';
        $name = '';
        $summary = '';
        $sequence = '';
        $expectations = '';

        if (!$isAdd) {
            printNice($form);
            $return = '<input type="hidden" name="p" value="updateTopicForm" />
                       <input type="hidden" name="q" value="' . $form['uniq'] . '" />';
            $name = $form['topicname'];
            $expectations = $form['topicexpectations'];
            $sequence = $form['topicsequence'];
            $expectations = $form['topicexpectations'];
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
                  <input type='text' class='form-control' name='topicname' value = '$name' placeholder='Topic Name' required></input>
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
        // printNice($ret);

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

    // this is the generalized function for activities.  everyone uses it.
    public function showAllActivities($where = '')
    {

        $header = "
        <tr>
          <th></th>   <!-- buttons -->
          <th>Sequence</th>
          <th>#</th>
          <th>Name</th>
          <th>Type</th>
          <th>Size</th>
          <th>Competencies</th>
          <th></th>

          <th>Expectations</th>
          <th>LastEdit</th>
          <th>&nbsp;</th>   <!-- buttons -->
        </tr> ";

        $HTML = '';

        $a = new activities();
        $ret = $a->allActivities($where); // returns activities left join topics left join courses
        // printNice($ret);

        $HTML .= "
            <table class='table'>";

        $currentCourse = 0;

        foreach ($ret as $r) {
            $edit = button('edit', 'primary', 'editActivityForm', $r['uniq']);
            $delete = button('delete', 'danger', 'updateActivityForm', $r['uniq'], true, "Delete this Activity?");
            $open = button('open', 'success', 'mathcodeEditor', $r['uniq']);
            $len = strlen($r['content']);
            $topicsInCourse = badge($r['courseuniq'], 'success', 'showTopics', $r['courseuniq']);
            $activitiesInCourse = badge($r['topicuniq'], 'secondary', 'showActivities', $r['topicuniq']);
            $course = "<table><tr><td>$topicsInCourse</td><td>&nbsp;</td><td>{$r['coursename']}</td></tr>
                        <tr><td>$activitiesInCourse</td><td>&nbsp;</td><td>{$r['topicname']}</td></tr></table>";

            if ($currentCourse !== $r['courseuniq']) {
                $HTML .= "<thead><tr><td colspan=10><br><br><h2>{$r['coursename']}</h2></td></tr>";
                $HTML .= $header . '</thead>';
                $currentCourse = $r['courseuniq'];
            }

            $HTML .= "
              <tr>
                <td>$open</td>   <!--buttons-->
                <th>{$r['act_seq']}</th>
                <td>{$r['uniq']}</td>
                <td>{$r['activityname']}</td>
                <td>{$r['act_type']}</td>
                <td>$len</td>
                <td>{$r['competency1']}<br>{$r['competency2']}</td>
                <td>$course</td>


                <td>{$r['act_expect']}</td>
                <td>{$r['datelastedit']}</td>
                <td>$edit&nbsp;$delete</td>   <!--buttons-->
              </tr>";
        }
        $HTML .= "
            </table> ";

        return $HTML;

    }

    // this is the small one, for a specific topic
    public function showActivitiesForTopic($topicuniq)
    {

        $HTML = '';

        $topic = new topics();
        $t = $topic->showTopic($topicuniq);
        $tname = $t[0]['topicname'];

        $add = button('add', 'warning', 'addActivityForm', $topicuniq);
        $resequence = button('resequence', 'primary', 'resequenceActivities', $topicuniq);
        $HTML .= "<h3>Activities in '$tname'  $add $resequence</h3>";

        $HTML .= $this->showAllActivities("topicuniq = $topicuniq");

        return $HTML;
    }

    public function addEditActivityForm($isAdd, $topicuniq, $form = []) // or edit

    {
        $HTML = '';

        printNice($form);

        $topics = new topics();
        $topic = $topics->showTopic($topicuniq);
        printNice($topic);

        $return = '<input type="hidden" name="p" value="saveActivityForm"></input>';
        $name = '';
        $summary = '';
        $expectation = '';
        $sequence = '';
        $prereq = '';

        if (!$isAdd) {
            printNice($form);
            $return = '<input type="hidden" name="p" value="updateActivityForm" />
                           <input type="hidden" name="q" value="' . $form['uniq'] . '" />';
            $name = $form['topicname'];
            $expectation = $form['act_expect'];
            $sequence = $form['act_seq'];
            $prereq = $form['act_prereq'];
        }

        $HTML .=
            "<div class='container'>
        <div class='row'>";

        $HTML .=
            "<form class='row'>
                <input type='hidden' name='topicuniq' value='$topicuniq' />

                $return
                <div class='form-group'>
                   <label for='topicName'>Course Name</label>
                   <input type='text' class='form-control' name='coursename' value = '$name'placeholder='Topic Name' disabled></input>
                </div>

                <div class='form-group'>
                      <label for='activityName'>Activity Name</label>
                      <input type='text' class='form-control' name='activityname' value = '$name'placeholder='Activity Name' required></input>
                </div>";

        if ($isAdd) { // once you set the TYPE of the activity, you can't change it
            $HTML .= "<div class='col-mb-3'>
                            <label for='activityName'>Activity Type</label>
                            <select class='form-select'  name='act_type'>
                                  <option value='mathcode'>Mathcode</option>
                                  <option value='quiz'>Quiz</option>
                              </select>
                    </div>";

        } else {
            $HTML .= "<input type='text' class='form-control' name='activitytype' value = '{$form[0]['act_type']} disabled> </input>";

        }

        $HTML .= "
                <div class='form-group'>
                    <label for='act_prereq'>Prerequisites (comma separated, eg:  4,71,16 </label>
                    <input type='text' class='form-control' name='act_seq' value='$prereq'></input>
                </div>

                <div class='form-group'>
                      <label for='activityDesc'>Activity Expectation</label>
                      <textarea class='form-control' name='act_expect' rows='5' placeholder='Activity Expectation'>$expectation</textarea>
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
            <input type="email" name="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus />
        </div>
        <div class="form-group">
           <label for="inputPassword"">Password</label>
           <input type="password" name="password" id="inputPassword" class="form-control" placeholder="Password" required />
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
                <input type="password" name="password" id="inputPassword" class="form-control" placeholder="Password" required />
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
        <input type="text" name="firstname" id="firstname" class="form-control" placeholder="First Name" required />

        <label for="lastname">Last Name</label>
        <input type="text" name="lastname" id="lastname" class="form-control" placeholder="Last Name" required />

        <label for="email">Email</label>
        <input type="email" name="email" id="email" class="form-control" placeholder="Email" required />

        <label for="phone">Phone</label>
        <input type="phone" name="phone" id="phone" class="form-control" placeholder="Phone" required />

        <label for="password">Password</label>
        <input type="password" name="password" id="password" class="form-control" placeholder="Password" required />


        <input class="btn btn-lg btn-primary btn-block" type="submit" value="Register"></input>

        </form>';

        $HTML .= '</div>';

        return ($HTML);
    }

    public function activityFinder()
    {
        $a = new activities();

    }

    public function mathcodeEditor($activityUniq)
    {

        $HTML = '';


        $stepsDB = new Steps();
        $steps = $stepsDB->getAllSteps($activityUniq);

        $add = button('add', 'warning', 'addTopicForm', $activityUniq);
        $resequence = button('resequence', 'primary', 'resequenceSteps', $activityUniq);

        $HTML .= "<h3>Steps in <b>'something'</b>  $add $resequence</h3>";

        foreach ($steps as $step) {

            $HTML .=
                "<div class='row'>
                    <div class='col-6'>
                        {$step['html']}
                    </div>
                    <div class='col-6'>";

            // add badges for activities:
                $badges = '';
                foreach($GLOBALS['stepTypes'] as $stepType){
                    $badges .= badge($stepType,'secondary','addStep',"$activityUniq&stepType=$stepType");
            }    
            // $HTML .= "<div style='border-style:solid;border-color:blue;'>Add: $badges</div>";
            $HTML .= $badges;

            // $HTML .= "<h3>Courses $add $resequence</h3>
            $HTML .= "<table class='table'>
                <thead>
                  <tr>
                    <th></th>   <!-- buttons -->
                    <th>Sequence</th>
                    <th>#</th>
                    <th>Type</th>
                    <th>Competency</th>
                    <th>Curriculum</th>
                    <th></th>   <!-- buttons -->
                  </tr>
                </thead>

                <tbody>";

            $edit = button('open', 'success', 'editStep', $step['uniq']);
            $delete = button('delete', 'danger', 'deleteCourseForm', $step['uniq'], true, "Delete this Course?");
            // $open = button('open', 'success', 'showTopics', $step['uniq']);

            $HTML .= "
                  <tr>
                    <td>$edit</td>   <!--buttons-->
                    <th>{$step['stepsequence']}</th>
                    <td>{$step['uniq']}</td>
                    <td>{$step['steptype']}</td>
                    <td>{$step['competency']}</td>
                    <td>{$step['curriculum']}</td>
                    <td>$delete</td>   <!--buttons-->
                  </tr>";
    
        $HTML .= "
                  </tbody>
                </table> ";

        $HTML .=
            "</div> <!-- class = col-6 -->
            </div>";
        }
         return($HTML);
         
         
        // $HTML .= "<h3>Topics in <b>'$cname'</b>  $add $resequence</h3>
        // <table class='table'>
        // <thead>
        //   <tr>
        //     <th></th>   <!-- buttons -->
        //     <th>Sequence</th>
        //     <th>#</th>
        //     <th>Name</th>
        //     <th>Summary</th>
        //     <th></th>   <!-- buttons -->
        //   </tr>
        // </thead>

        // <tbody>";

        // foreach ($ret as $r) {
        //     $edit = button('edit', 'primary', 'editTopicForm', $r['uniq']);
        //     $delete = button('delete', 'danger', 'updateTopicForm', $r['uniq'], true, "Delete this Topic?");
        //     $open = button('open', 'success', 'showActivities', $r['uniq']);
        //     $HTML .= "
        //   <tr>
        //     <td>$open</td>   <!--buttons-->
        //     <th>{$r['topicsequence']}</th>
        //     <td>{$r['uniq']}</td>
        //     <td>{$r['topicname']}</td>
        //     <td>{$r['topicexpectations']}</td>
        //     <td>$edit&nbsp;$delete</td>   <!--buttons-->
        //   </tr>";
        // }
        // $HTML .= "
        //   </tbody>
        // </table> ";

        
        // this is the hidden form that uploads data to PHP
        $HTML = "
        <div style='display:none;'>
            <form method='post' name='uploadPost' action='?saveContent'>
                <textarea rows='1' id='tomseditor' ></textarea>
                 <input type='submit' name='send' value='submit' />
            </form>
        </div>";

        // and a function that drives the coode into the upload form
        $HTML .= "
        <script>
            function uploadContent(){
                let data = 'tesst data';
                document.uploadPost.data.value = data;
                document.forms['uploadPost'].submit();
            }

            var xhr = new XMLHttpRequest();
            xhr.addEventListener('load', reqListener);
            function reqListener () {
                console.log(this.responseText);
            }

            function AJAXuploadContent(){
                // i can't access tinymce.get90 from typescript, so I call this guy to copy
                // the text to 'tomseditor
                //
                // then I send an upload via AJAX so the content is saved (TS can't save it either)
                //
                // then I let typescript grab and process from tomseditor and push it back down

                let text = tinymce.get('mathcode').getContent();    // get the text out of TinyMCE
                console.log('text:',text);
                document.getElementById('tomseditor').value = text   // pop it into a hidden textarea

                let editorText = JSON.stringify(text)           // upload it via AJAX
                console.log('editorText:',editorText);
                console.log('about to try: ','ajax.php?p='+editorText)
                xhr.open('POST', 'ajax.php?p='+editorText, true);

                //Send the proper header information along with the request

                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                xhr.onreadystatechange = function() { // Call a function when the state changes.
                    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                        // alert ('Request finished. Do processing here.');
                    }
                }
                xhr.send();
            }
        </script>
        ";

        $HTML .= "
        <br><br><br><math id='testmath'></math><br>
        <div class='navbar'>
            <div style='float:right;padding-right:200px'>
                <button id='save'>Save</button>
            </div>
            <div style='float:right'>
                <button id='load'>Load</button>
            </div>
            <div style='float:right'>
                <button id='run'>Run</button>
            </div>
            <div style='float:right'>
                <button id='debug'>Debug</button>
            </div>
            <!-- <div style='float:right'>
                <button id='tagcount'>count</button>
            </div> -->
            <div style='float:right'>
            <!-- lots of CSS to change the name of this button -->
            <input type='file' onchange='readFile(this)'></input>
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

            <div style='float:right'>
            <form action='./index.php'  onsubmit='copyeditor()' >
                <input type='submit' id='PHPSave' value='PHP save' />
                <input type='hidden' id='p2' name='p' value='save' />
                <input type='hidden' id='payload' name='q' value='' />
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

            <div style='float:right'>
            <button onclick='AJAXuploadContent()'>Click me AJAX</button>
            <button onclick='uploadContent()'>Click me2</button>
            </div>

        </div>";

        $HTML .= "
        <div class='main' style='margin-top:30px'>
            <p>If you’re using Chrome or Edge, enable “Experimental Web Platform features” on the chrome://flags page.</p>
            <!-- lesson and editor, side by side-->

            <div id='lesson'
                style='border-style: solid;  border-block-color: black;border-width: 1px; float:left; width:50%'>

            </div>
            <div  style='border-style: solid;  border-block-color: black;border-width: 1px; float:left; width:50%; height:100%;'>
                <div>

                    <textarea rows='1000' id='mathcode' style='width:100%;margin:2px;padding:5px;'></textarea>
                </div>
            </div>

        </div>

        <script src='../../dist_editor/bundle.js'></script>

        ";

        return ($HTML);
    }

}
