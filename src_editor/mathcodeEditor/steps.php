<?php

defined('_KELLER') or die('cannot access steps.php directly');

$GLOBALS['stepTypes'] = ['Text', 'Code', 'StaticQuiz', 'GeneratedQuiz',
    'Intro','Reflection', 'JSXGraph', 'YouTube'];

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
    public $sequence;

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
            assertTrue($activityUniq !== 0, "must provide activityUniq if adding a step");

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

        $HTML .= "<div class='row'>
                    <div class='col-5'>";

        $options = formSelectList($GLOBALS{'competencies'}, '');
        $HTML .=
            "<div class='form-inline'>
               <label for='competency'>Competency</label>
               <select class='form-control' name='competency' value = '{$this->competency}' >
               $options
               </select>
            </div>";

        $HTML .= "</div><div class='col-5'>";

        $options = formSelectList($GLOBALS{'curriculumStrands'}, '');
        $HTML .=
            "<div class='form-inline'>
             <label for='curriculum'>Curriculum</label>
             <select class='form-control' name='curriculum' value = '{$this->curriculum}' >
             $options
             </select>
          </div>";

          $HTML .= "</div><div class='col-2'>";

          $HTML .=
          "<div class='form-group'>
              <label for='courseSequence'>Sequence #</label>
              <input type='number' class='form-control' name='actsequence' value='$this->sequence'></input>
          </div>";



        $HTML .= "</div></div>";
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

    // these are specific to this kind of step
    var $indentLevel;
    var $assistant;
    var $paragraph1,$paragraph2,$paragraph3,$paragraph4;
    var $imageType;


    function __construct($activityUniq, $uniq = 0)
    {
        $this->activityUniq = $activityUniq;
        $this->loadStep($uniq, 'Text');

    }

    function drawInputForm()
    {

        $HTML = '';

        // divide the page into two sides
        $HTML .=
            "<div class='row'>
            <div class='col'>
                <div id='lesson'>
                   <h2>TextStep</h2>
                </div>
            </div><div class='col'>";

        // the hard work is all on the second side
        $HTML .=
        "<form action='processStepForm'>" . $this->formStandards();

        $HTML .= "<div class='row'>";  // full row for the title
        
                // the title / subtitle of this sections
        $HTML .=
                "<div class='form-group'>
                <label for='title'>Title / Subtitle</label>
                <input class='form-control' type='text' id='title' placeholder='Title/Subtitle'  required></input>
                </div>";
    
        $HTML .= "</div><div class='row'>";
    
        
        $HTML .= "<div class='col-1'>";

        // the dropdown for selecting indent level
        $options = formSelectList(['h1', 'h2', 'h3'], 'h2');
        $HTML .=
            "<div class='form-inline'>
                 <label for='indentLevel'>Indent</label>
                 <select class='form-control' name='indentlevel' value = '{$this->indentLevel}' >
                 $options
                 </select>
              </div>";

         $HTML .= "</div><div class='col-2'>";

                 // the dropdown for selecting image type
        $options = formSelectList(['None', 'Image', 'JSXGraph','YouTube'], 'None');
        $HTML .=
            "<div class='form-inline'>
                 <label for='curriculum'>ImageType</label>
                 <select class='form-control' name='imagetype' value = '{$this->imageType}' >
                 $options
                 </select>
              </div>";

        $HTML .= "</div><div class='col-2'>";

        // the dropdown for selecting assistant: standard / history, etc
        $options = formSelectList(['None', 'History', 'Science','Mindset'], 'None');
        $HTML .=
            "<div class='form-inline'>
                 <label for='curriculum'>Assistant</label>
                 <select class='form-control' name='assistant' value = '{$this->assistant}' >
                 $options
                 </select>
              </div>";

        $HTML .= "</div><div class='col-7'>";

        $HTML .= 'placekeeper';

        $HTML .= "</div></div>"; // end of col, end of row

        $HTML .=
            "<div class='form-group'>
            <br><textarea class='form-control' name='paragraph1' rows='4' placeholder='Paragraph 1'>{$this->paragraph1}</textarea>
            <br><textarea class='form-control' name='paragraph2' rows='4' placeholder='Paragraph 2'>{$this->paragraph2}</textarea>
            <br><textarea class='form-control' name='paragraph3' rows='4' placeholder='Paragraph 3'>{$this->paragraph3}</textarea>
            <br><textarea class='form-control' name='paragraph4' rows='4' placeholder='Paragraph 4'>{$this->paragraph4}</textarea>
            </div>";


        $HTML .= "</form>";


        // this is the monaco editor
        $HTML .= 
        "<div style='border-style:solid;border-color:blue;'>
            <div id='buttons'>
                <p>
                    <button id='download'>Download</button>
                    <button id='upload'>Upload</button>
                    <button id='run'>Run</button>
                    <button id='stop' disabled>Stop</button>
                    <button id='pause' disabled>Pause</button>
                    <!-- button id='fullscreen' disabled>Full Screen</button -->
                </p>

            </div>
            <div id='editor' style='height:300px'></div>
            <div id='canvas'><canvas id='renderCanvas' touch-action='none'></canvas></div>
        </div>   
        ";

        // finally, join the left and right halves at the bottom
        $HTML .= "</div>
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

    public function drawInputForm()
    {}

    public function createHTML()
    {

    }
}
