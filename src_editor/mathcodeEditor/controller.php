<?php

defined('_KELLER') or die('cannot access controller.php directly');

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////

function processrequest()
{

//     $Parsedown = new Parsedown();

//     $text = "It's very easy to make some words
    //         **bold** and other words *italic* with Markdown.
    //         You can even [link to Google!](http://google.com)

// * Item 1
    // * Item 2
    //   * Item 2a
    //   * Item 2b

//   1. Item 1
    //   1. Item 2
    //   1. Item 3
    //      1. Item 3a
    //      1. Item 3b

// As Kanye West said:

// > We're living the future so
    // > the present is our past.

// http://github.com - automatic!
    // [GitHub](http://github.com)

// ```javascript
    // function fancyAlert(arg) {
    //   if(arg) {
    //     $.facebox({div:'#foo'})
    //   }
    // }
    // ```

// ";

//     $output = $Parsedown->text($text);
    //     die;

    // $competency = 'Reasoning';
    // $curriculum = 'Functions';
    // $JSONdata = '{"inParagraph":"0","title":"Test title","indentLevel":"","assistant":"","paragraph1":"this is the `text` in paragraph 1","paragraph2":"this is the ^text^ in paragraph 2. we have [modified | not modified|https:\/\/en.wikipedia.org\/wiki\/Main_Page]","paragraph3":"","paragraph4":"","proctorNotes":"","imageName":"fred.png","imageType":"Image","ccAuthor":"fred","ccSource":"fred@fred.com","ccOption":"CC BY-NC","ccVersion":"1.0","dnloadDate":"2021-09-01","ccComment":""}';

    // $renderer = new RenderTextStep();
    // $aOutput = $renderer->render($JSONdata,$competency,$curriculum);
    // printNice($aOutput);
    // die;

    // we need views early, so we can post error messages
    $views = new Views();
    $views->codeEditorPage = true;

    $HTML = '';

    printNice($_REQUEST);
    printNice($_SESSION);


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
            printNice('','clearing the Session');
            if (!isset($_SESSION['user'])) { // no one is logged in
                foreach (array_keys($_SESSION) as $key) {
                    unset($_SESSION[$key]);
                }

                $HTML .= $views->login();
            } else {
                $HTML .= $views->showAllCourses();
            }
            break;

        ///////////////////////////////
        ///////// courses /////////////
        ///////////////////////////////

        case 'login': // login page
            printNice('','clearing the Session');
            foreach (array_keys($_SESSION) as $key) {
                unset($_SESSION[$key]);
            }

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
            $stepObj = new $stepClass($q); // just the activity's uniq, default to new step

            // with $uniq=0, this is an ADDSTEP
            $stepObj->loadStep(0, $q, $_REQUEST['stepType']); // creates a new step of this type

            $HTML .= $stepObj->drawInputForm();
            break;

        case 'editStep':

            $HTML .= $views->editStep($q);
            break;

        case 'saveStepForm':

            $steps = new Steps();

            // read the step to find the steptype (yes, it might be in the form)
            $step = $steps->getStep($q);
            printNice($step, 'this is the record we are trying to update');

            $stepClass = $step['steptype'] . 'Step'; // the name of the class we want

            if (!class_exists($stepClass)) {
                assertTrue(false, "Something wrong - can't find class '$stepClass'.  Look at REQUEST['steptype'], is it a valid step type?");
                $HTML .= $views->showAllActivities();
                break;
            }
            printNice("new stepClass($q,{$_REQUEST['activityUniq']} ); //TextStep, CodeStep, etc");
            $stepObj = new $stepClass($q, $_REQUEST['activityUniq']); //TextStep, CodeStep, etc
            $stepObj->saveStep($q, $_REQUEST);

            $HTML .= $views->editStep($q);
            break;

        case 'resequenceSteps':
            $steps = new Steps();
            $steps->resequence($q); // send the $activityUniq

            $HTML .= $views->mathcodeEditor($q); // redraw the activity
            break;

        case 'deleteStep':    
            $steps = new Steps();
            $steps->deleteStep($q); 

            $HTML .= $views->mathcodeEditor($q); // redraw the activity
            break;

        //////// show and hide HTML for debugging

        case 'hideHTML':
            printNice("setting entities false");
            $_SESSION['entities'] = false;
            $HTML .= $views->editStep($q); // redraw the activity
            break;

        case 'showHTML':
            printNice("setting entities true");
            $_SESSION['entities'] = true;
            $HTML .= $views->editStep($q); // redraw the activity
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
    $a = new steps();
    $HTML .= $a->show();

    return ($HTML);

}
