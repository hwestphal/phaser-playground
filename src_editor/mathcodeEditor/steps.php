<?php

defined('_KELLER') or die('cannot access steps.php directly');

$GLOBALS['stepTypes'] = ['Text', 'Code', 'StaticQuiz', 'GeneratedQuiz',
    'Reflection', 'JSXGraph', 'YouTube'];

class AbstractStep extends UnitTestCase
{

    // this part mirrors the data record
    public $uniq;
    public $activityUniq;
    public $steptype;
    public $competency;
    public $curriculum;
    public $comments;
    public $JSONdata;
    public $HTML;

    // every step needs to populate
    //
    // - curriculum thread (Communication, Mathematising, etc)
    // - competency  (Algebra, Functions, etc)
    // - stepType type (Text, Quiz, etc)

    public function loadStep($uniq = 0, $activityUniq = 0, $stepType = '')
    {
        $stepsDB = new Steps();

        if ($uniq == 0) { // new textstep
            
            // if we are ADDING a step, then $stepType cannot be empty
            assertTrue(in_array($stepType, $GLOBALS['stepTypes']), "'$stepType' is not a stepType for this course");
            assertTrue($activityUniq !== 0,"must provide activityUniq if adding a step");

            $this->stepType = $stepType;
            $this->uniq = $stepsDB->createStep($this->activityUniq, $stepType);
            $this->activityUniq = $activityUniq;
            $this->stepType = $stepType;
            $this->competency = '';
            $this->curriculum = '';
            $this->comments = '';
            $this->JSONdata = '';
            $this->HTML = '';

        } else {

            assertTrue(empty($stepType), "Existing step, don't try to specify stepType");

            $ret = $stepsDB->getStep($uniq);
            $this->uniq = $ret['uniq'];
            $this->activityUniq = $ret['activityuniq'];
            $this->stepType = $ret['steptype'];
            $this->competency = $ret['competency'];
            $this->curriculum = $ret['curriculum'];
            $this->comments = $ret['comments'];
            $this->JSONdata = $ret['jsondata'];
            $this->HTML = $ret['html'];

        }

        if (!empty($this->competency)) { // competency is allowed to be empty
            assertTrue(in_array($this->competency, $GLOBALS['competencies']), 'not a competency for this course');
        }
        if (!empty($this->curriculum)) { // curriculum strand is allowed to be empty
            assertTrue(in_array($this->curriculum, $GLOBALS['curriculumStrands']), 'not a curriulumStrand for this course');
        }

    }

    public function formStandards()
    {
        $HTML = '';
        $HTML .= "<input type='hidden' name='uniq' value='{$this->uniq}' />";
        $HTML .= "<input type='hidden' name='activityUniq' value='{$this->activityUniq}' />";
        $HTML .= "<input type='hidden' name='steptype' value='{$this->stepType}' />";

        $HTML .=
            "<div class='form-group'>
            <label for='competency'>Competency</label>
            <input type='text' class='form-control' name='Competency' value = '{$this->competency}' ></input>
         </div>

          <div class='form-group'>
             <label for='curriculum'>Curriculum</label>
             <input type='text' class='form-control' name='curriculum' value = '{$this->curriculum}' ></input>
          </div>";

        return ($HTML);
    }
}

// Declare the interface template
interface StepTemplate
{
    public function __construct($activityUniq, $uniq);
    public function drawInputForm();
}

////////////////////////////////////////
////////////// text step ///////////////
////////////////////////////////////////

class TextStep extends AbstractStep implements StepTemplate
{

    function __construct($activityUniq, $uniq = 0)
    {
        $this->activityUniq = $activityUniq;
        $this->loadStep($uniq, 'Text');

    }

    function drawInputForm()
    {
        $HTML = '';
        $HTML .=
        "<form action='processStepForm'>" . $this->formStandards();

        $HTML .=

            "</form>";

        $HTML .=
            "</div>
            </div>";

        return ($HTML);
    }

    function createHTML()
    {

    }
}

////////////////////////////////////////
////////////// code step ///////////////
////////////////////////////////////////

class CodeStep extends AbstractStep implements StepTemplate
{

    public function __construct($activityUniq, $uniq = 0)
    {
        $this->activityUniq = $activityUniq;
        $this->loadStep($uniq, 'Code');

    }

    function drawInputForm(){}

    public function createHTML()
    {

    }
}
