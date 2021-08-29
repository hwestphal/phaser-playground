<?php

defined('_KELLER') or die('cannot access controller.php directly');

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////

function processrequest()
{

    // we need views early, so we can post error messages
    $views = new Views();
    $views->codeEditorPage = true;

    $HTML = '';

    printNice($_REQUEST);
    printNice($_SESSION);
    $_SESSION['queries'] = [];

    ////////////////////
    // dumpall();      // dump all databases for debugging
    ////////////////////

    // is there a request object?
    $p = $q = '';

    if (isset($_REQUEST) && isset($_REQUEST['p'])) {

        $p = $_REQUEST['p'];
        $q = isset($_REQUEST['q']) ? $_REQUEST['q'] : '';
        $q = str_replace('%22', '"', $q); // fix double-quotes
        // echo $q;

        // if not logged in, then can only register or sign it
        if (!isset($_SESSION['user'])
            and ('registerAndWaiver' != $p)
            and ('signin' != $p)
            and ('register' != $p)
            and ('resetpassword' != $p)
            and ('email' != $p)) { // exception for these pages

            $p = 'login'; // flip them back to the login page
        }
    }

    /////////////////////////////////////////////////
    /////////////////////////////////////////////////

    switch ($p) {

        case '': // usually the first page
            if (!isset($_SESSION['user'])) { // no one is logged in
                $HTML .= $views->login();
            } else {
                $HTML .= $views->showAllCourses();
            }
            break;

        ///////////////////////////////
        ///////// courses /////////////
        ///////////////////////////////

        case 'login': // login page
            $_SESSION = []; //session_unset();
            $HTML .= $views->login();
            break;

        case 'resetpassword': // this is a REQUEST to reset a password
            $users = new users();
            $users->resetPassword($_REQUEST);

            alertMessage("Tell the member to try again with ANY password, it will become his new password.");
            $HTML .= $views->showAllCourses();
            break;

        case 'signin': // validate login
            $users = new users();
            $ret = $users->validateLogin($_REQUEST); // returns the user record

            // printNice($ret);
            if (count($ret) == 0) {
                alertMessage("Not a valid user and/or password");
                $HTML .= $views->login();

            } else {

                // a normal login
                $_SESSION['user'] = strtolower($ret[0]['email']);
                $_SESSION['team'] = $ret[0]['team'];

                // we used to keep the 'role' in userDB, but now calculate it on
                // the fly.  too many places to go wrong.
                $_SESSION['role'] = 0;

                // only way to become an admin is hard-coded
                if (in_array(strtolower($_SESSION['user']), $GLOBALS['adminEmail'])) {
                    $_SESSION['role'] = 'admin';
                }
                $HTML .= $views->showAllCourses();

            }
            break;

        case 'registerAndWaiver': // ask to register
            $HTML .= $views->registerAndWaiver();
            break;

        case 'register': // register and get waiver
            $users = new users();
            $result = $users->register($_REQUEST); // 0-success, 1-already, 2-other
            if (0 != $result) {
                alertMessage("Already registered");
                $HTML = $views->login();
            } else {
                // let's validate them (in case other processing) and let them in
                $ret = $users->validateLogin($_REQUEST); // returns the user record
                $_SESSION['user'] = $ret[0]['email'];
                $_SESSION['role'] = $ret[0]['role'];
            }

            $HTML .= $views->showAllCourses();

            break;

        case 'showCourses':
            $HTML .= $views->showAllCourses();
            break;

        case 'addCourseForm':
            $HTML .= $views->addEditCourseForm(true);
            break;

        case 'editCourseForm':
            $course = new courses();
            $form = $course->showCourse($q);
            $HTML .= $views->addEditCourseForm(false, $form[0]);
            break;

        case 'saveCourseForm':
            $course = new courses();
            $a = [
                'coursename' => $_REQUEST['coursename'],
                'coursesummary' => $_REQUEST['coursesummary'],
                'coursesequence' => !empty($_REQUEST['coursesequence']) ? intval($_REQUEST['coursesequence']) : 1000,
                'team' => $_SESSION['team'],
            ];
            $course->insertArray($a);
            $HTML .= $views->showAllCourses();
            break;

        case 'updateCourseForm':
            $course = new courses();
            $a = [
                'coursename' => $_REQUEST['courseName'],
                'coursesummary' => $_REQUEST['courseSummary'],
                'coursesequence' => !empty($_REQUEST['coursesequence']) ? intval($_REQUEST['coursesequence']) : 1000,
            ];
            $course->updateArray($a, "uniq = {$q}");
            $HTML .= $views->showAllcourses();
            break;

        case 'resequenceCourses':
            $topic = new courses();
            $topic->resequenceCourses();
            $HTML .= $views->showAllCourses();
            break;

        ///////////////////////////////
        ///////// topics //////////////
        ///////////////////////////////

        case 'showTopics':
            $HTML .= $views->showAllTopics(intval(intval($q)));
            break;

        case 'addTopicForm': // q is the uniq of the course we are adding to
            $HTML .= $views->addEditTopicForm(true, intval($q));
            break;

        case 'editTopicForm':
            $topic = new topics();
            $form = $topic->showTopic(intval($q));
            $HTML .= $views->addEditTopicForm(false, $form[0]);
            break;

        case 'saveTopicForm':
            $topic = new topics();
            $a = [
                'courseuniq' => intval($_REQUEST['courseuniq']),
                'topicname' => $_REQUEST['topicname'],
                'topicexpectations' => $_REQUEST['topicexpectations'],
                'topicsequence' => !empty($_REQUEST['topicsequence']) ? intval($_REQUEST['topicsequence']) : 1000,
            ];
            $topic->insertArray($a);
            $HTML .= $views->showAllTopics(intval($_REQUEST['courseuniq']));
            break;

        case 'updateTopicForm':
            $topic = new topics();
            $a = [
                'topicname' => $_REQUEST['topicname'],
                'topicsummary' => $_REQUEST['topicsummary'],
                'topicsequence' => !empty($_REQUEST['topicsequence']) ? intval($_REQUEST['topicsequence']) : 1000,
            ];
            $topic->updateArray($a, "uniq = {$q}");
            $HTML .= $views->showAllTopics(intval($q));
            break;

        case 'resequenceTopics':
            $topic = new topics();
            $topic->resequenceTopics(intval($q)); //$q is the course to resequence
            $HTML .= $views->showAllTopics(intval($q));
            break;

        ///////////////////////////////
        ///////// activities //////////
        ///////////////////////////////

        case 'showAllActivities':
            $HTML .= $views->showAllActivities();
            break;

        case 'showActivities':
            $HTML .= $views->showActivitiesForTopic(intval($q));
            break;

        case 'addActivityForm': // q is the uniq of the course we are adding to
            $HTML .= $views->addEditActivityForm(true, intval($q));
            break;

        case 'editActivityForm':
            $activity = new Activitys();
            $form = $activity->showActivity(intval($q));
            $HTML .= $views->addEditActivityForm(false, $form[0]);
            break;

        case 'saveActivityForm':
            $activity = new Activities();
            $a = [
                'topicuniq' => intval($_REQUEST['topicuniq']),
                'team' => $_SESSION['team'],
                'activityname' => $_REQUEST['activityname'],
                'act_type' => $_REQUEST['act_type'],
                'act_expect' => $_REQUEST['act_expect'],
                'act_seq' => !empty($_REQUEST['act_seq']) ? intval($_REQUEST['act_seq']) : 1000,
            ];
            $activity->insertArray($a);
            $HTML .= $views->showActivitiesForTopic(intval($_REQUEST['topicuniq']));
            break;

        case 'updateActivityForm':
            $activity = new Activities();
            $a = [
                'Activityname' => $_REQUEST['Activityname'],
                'Activitysummary' => $_REQUEST['Activitysummary'],
                'Activitysequence' => !empty($_REQUEST['Activitysequence']) ? intval($_REQUEST['Activitysequence']) : 1000,
            ];
            $activity->updateArray($a, "uniq = {$q}");
            $HTML .= $views->showActivitiesForTopic(intval($q));
            break;

        case 'resequenceActivities':
            $activity = new Activities();
            $activity->resequenceActivities(intval($q));
            $HTML .= $views->showActivitiesForTopic(intval($q));
            break;

        ///////////////////////////////
        ///////// activities //////////
        ///////////////////////////////

        case 'mathcodeEditor':
            $HTML .= $views->mathcodeEditor($q);
            break;

        case 'addStep': // $q is the activityUnit, ['stepType'] is passed
            $stepClass = $_REQUEST['stepType'] . 'Step'; // the name of the class we want
            $stepObj = new $stepClass($q); //TextStep, CodeStep, etc

            $stepObj->loadStep(0, $q, $_REQUEST['stepType']); // creates a new step of this type
            $HTML .= $stepObj->drawInputForm();
            break;

        case 'editStep':

            $steps = new Steps();

            $stepData = $steps->getStep($q); // $q is the step uniq

            $stepType = $stepData['steptype'];
            $stepClass = $stepType . 'Step'; // the name of the class we want

            $stepObj = new $stepClass($stepData['activityuniq'], $q); //TextStep, CodeStep, etc
            $stepObj->loadStep($q); // loads data from existing

            $HTML = $stepObj->drawInputForm();
            break;

        case 'resequenceSteps':
            $steps = new Steps();
            $steps->resequence($q); // send the $activityUniq

            $HTML .= $views->mathcodeEditor($q);  // redraw the activity
            break;

        ///////////////////////////////
        ///////////////////////////////
        ///////////////////////////////

        case 'unittests':
            runUnitTests();
            $HTML .= $views->dayTable();
            break;

        case 'onetime':
            // populateOneTimeAttendees();
            $HTML .= $views->dayTable();
            break;

        default:
            // assertTrue(false, "did not expect to get here, with p ='$p' and q ='$q'");
            break;
    }

    assertTrue(isset($HTML) and !empty($HTML), 'HTML not set for request ' . serialize($_REQUEST));

    $HTML .= '<br><br><br><br><br><br><br><br><br>';
    $c = new courses();
    $HTML .= $c->show();
    $t = new topics();
    $HTML .= $t->show();
    $a = new activities();
    $HTML .= $a->show();
    $a = new users();
    $HTML .= $a->show();

    return ($HTML);

}
