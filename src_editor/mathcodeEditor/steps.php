<?php

defined('_KELLER') or die('cannot access steps.php directly');

$GLOBALS['stepTypes'] = ['Text', 'Code', 'StaticQuiz', 'GeneratedQuiz',
    'Intro', 'Reflection', 'JSXGraph', 'YouTube'];

class AbstractStep extends UnitTestCase
{

    // this part mirrors the data record
    public $uniq;
    public $activityUniq;
    public $stepType;
    public $intent;
    public $competency;
    public $curriculum;
    public $comments;
    public $indexterms;
    public $glossaryterms;

    public $stepsequence;

    // also JSONdata which is stored in $_SESSION['JSONdata']
    // also HTML  which is generated as needed

    // for load and save operations  -  these are for ALL objects
    public $nAFields = ['activityUniq'];
    public $sAFields = ['intent', 'stepType', 'competency', 'curriculum', 'comments', 'indexterms', 'glossaryterms'];

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

            $this->uniq = $stepsDB->createStep($this->activityUniq, $stepType);

            $this->intent = '';
            $this->stepType = $stepType;
            $this->activityUniq = $activityUniq;

            $this->competency = '';
            $this->curriculum = '';
            $this->indexterms = '';
            $this->glossaryterms = '';
            $this->comments = '';

            $_SESSION['JSONdata'] = '';

        } else {

            $ret = $stepsDB->getStep($uniq);

            $this->uniq = $ret['uniq'];
            $this->activityUniq = $ret['activityuniq']; // stuff in the db is always lowercase
            $this->intent = $ret['intent'];
            $this->stepType = $ret['steptype'];
            $this->competency = $ret['competency'];
            $this->curriculum = $ret['curriculum'];
            $this->indexterms = $ret['indexterms'];
            $this->glossaryterms = $ret['glossaryterms'];
            $this->comments = $ret['comments'];

            if (!isset($_SESSION['JSONdata'])) {
                $_SESSION['JSONdata'] = '';
            }
            $this->unpackFromJSON($_SESSION['JSONdata']);
            $this->html = $this->generateHTML();

        }

        if (!empty($this->competency)) { // competency is allowed to be empty
            assertTrue(in_array($this->competency, $GLOBALS['competencies']), "'{$this->competency}' not a competency for this course");
        }
        if (!empty($this->curriculum)) { // curriculum strand is allowed to be empty
            assertTrue(in_array($this->curriculum, $GLOBALS['curriculumStrands']), "'{$this->curriculum}' not a curriulumStrand for this course");
        }
    }

    public function formStandards()
    {

        $HTML = '';
        $HTML .= "<input type='hidden' name='p' value='saveStepForm' />";
        $HTML .= "<input type='hidden' name='q' value='{$this->uniq}' />";
        $HTML .= "<input type='hidden' name='activityUniq' value='{$this->activityUniq}' />";
        $HTML .= "<input type='hidden' name='stepType' value='{$this->stepType}' />";
        $HTML .= "<textarea name='code' style='display:none;'></textarea>";

        $HTML .= "<div class='row'>
                    <div class='col-1'>";

        $HTML .=
            "<div class='form-group'>
                    <button type='submit' class='form-control btn-primary' name='saveRender'>Save</button>
                </div>";

        $HTML .= "</div><div class='col-1'>";

        $HTML .=
            "<div class='form-inline'>
                         <label>UNIQ</label>
                         <text class='form-control' value='{$this->uniq}' disabled>{$this->uniq}</text>
                      </div>";

        $HTML .= "</div><div class='col-4'>";

        $options = formSelectList($GLOBALS['competencies'], $this->competency);
        $HTML .=
            "<div class='form-inline'>
               <label for='competency'>Competency</label>
               <select class='form-control' name='competency' value = '{$this->competency}' >
               $options
               </select>
            </div>";

        $HTML .= "</div><div class='col-4'>";

        $options = formSelectList($GLOBALS['curriculumStrands'], $this->curriculum);
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
              <label for='stepeSequence'>Sequence</label>
              <input type='number' class='form-control' name='stepsequence' value='$this->stepsequence'></input>
          </div>";

        $HTML .= "</div>";

        
        
        $HTML .= "<div class='row'><div class='col-6'>";
        
        $HTML .= "<div class='form-inline'>
        <label for='indexterms'>Index Terms (separate with commas)</label>  
        <input type='text' class='form-control' name='indexterms' value='{$this->indexterms}'></input>
        </div>";

        $HTML .= "</div><div class='col-6'>";

        $HTML .= "<div class='form-inline'>
        <label for='glossaryterms'>Glossary Terms (separate with commas)</label>  
        <input type='text' class='form-control' name='glossaryterms' value='{$this->glossaryterms}'></input>
        </div>";
        
        $HTML .= "</div>";


        
        $HTML .= "<div class='row'>";

        $HTML .= "<div class='form-inline'>
                <label for='intent'>Intent of this Step</label>
                <input type='text' class='form-control' name='intent' value='{$this->intent}'></input>
                </div>";

        $HTML .= "</row><div class='row'>";

        $HTML .= "<div class='form-inline'>
                <label for='comments'>Reviewer comments, TODOs, etc</label>
                <textarea class='form-control' name='comments' rows='2' >{$this->comments}</textarea>
                </div>";

        $HTML .= "</div>";
        return ($HTML);
    }

    public function saveStep($uniq, $form)
    {

        $steps = new Steps();

        $a = [];

        foreach ($this->nAFields as $n) { // only the abstract fields
            if (isset($form[$n])) {
                $this->$n = intval($form[$n]);
                $a[strtolower($n)] = $this->$n;
            } else {
                assertTrue(false, "strange, could not find element '$n' in the form");
            }
        }

        foreach ($this->sAFields as $n) {

            if ($n == "JSONdata") {continue;} // not in the form

            if (isset($form[$n])) {
                $this->$n = $form[$n];
                $a[strtolower($n)] = $this->$n;
            } else {
                assertTrue(false, "strange, could not find element '$n' in the form");
            }
        }

        $_SESSION['JSONdata'] = $this->packIntoJson($form); // get the specific fields for this step into $_SESSION['JSONdata']
        $a['jsondata'] = $_SESSION['JSONdata'];

        $steps->updateStep(intval($uniq), $a);

    }

    public function packIntoJson($form)
    {
        // all we do here is pack up the JSON.  then we call parent reallyUpdateStep()

        // A note of caution:     json_encode() assumes that
        // your array is an object if your keys are not sequential
        // which is what we want.  MAKE SURE NOT SEQUENTIAL or use JSON_FORCE_OBJECT.

        $a = [];
        foreach (array_merge($this->nFields, $this->sFields) as $f) {

            if (isset($form[$f])) {
                $this->$f = $form[$f];
                // printNice("$f has value {$this->$f}");
                $a[$f] = $this->$f;
            }
        }

        // we could add JSONdata to the form, with JS hooks to save it, etc
        // but this is PHP and easier just to store it in the SESSION object
        return (json_encode($a, JSON_FORCE_OBJECT));

    }

    public function unpackFromJson($json)
    {
        assertTrue(is_string($json));
        $oJson = json_decode($json);
        assertTrue(is_object($oJson), 'expected $oJson to be object, got ' . gettype($oJson));

        foreach (array_merge($this->nFields, $this->sFields) as $f) {
            if (isset($oJson->$f)) {
                $this->$f = $oJson->$f;
            } else {
                printNice("$f is not defined in JSON object, but in field array. Was it added?  $json");
            }
        }
    }

    public function fourDigit($n) // pad a number to four digits

    {
        return str_pad($n, 4, '0', STR_PAD_LEFT);
    }
}

// Declare the interface template
interface StepTemplate
{
    public function __construct($activityUniq);
    public function drawInputForm();
    public function generateHTML();
}

////////////////////////////////////////
////////////// text step ///////////////
////////////////////////////////////////

class TextStep extends AbstractStep implements StepTemplate
{

    // these are specific to this kind of step, and should all have initial values
    // IF YOU ADD HERE THEN MAKE SURE ALSO IN JSON ENCODE AND DECODE
    var $title = '';
    var $indentLevel = '';
    var $assistant = '';
    var $paragraph1 = '', $paragraph2 = '', $paragraph3 = '', $paragraph4 = '';
    var $proctorNotes = '';
    var $imageName = '', $imageType = '', $imagePara = '', $imageAlt = '';
    var $ccAuthor = '', $ccSource = '', $ccOption = '', $ccVersion = '-', $dnloadDate = '', $ccComment = '';

    // Title: The title of the image.
    // Author: The name of the creator.
    // Source: The URL where the image is hosted (plus optional link to author profile).
    // License: The type of Creative Commons license it is available under,

    // for load and save operations  -  these are for THIS object only
    var $nFields = [];
    var $sFields = ['title', 'indentLevel', 'assistant', 'paragraph1', 'paragraph2', 'paragraph3', 'paragraph4',
        'proctorNotes', 'imageName', 'imageType', 'imageAlt', 'imagePara',
        'ccAuthor', 'ccSource', 'ccOption',
        'ccVersion', 'dnloadDate', 'ccComment'];

    function __construct($activityUniq)
    {
        $this->activityUniq = $activityUniq;
        // $this->loadStep($uniq, $activityUniq, 'Text'); // add if $uniq==0
    }

    function drawInputForm()
    {
        $HTML = '';

        // divide the page into two sides
        $this->html = $this->generateHTML();

        // buttons at the top show or hide the native HTML
        if ($GLOBALS['debugMode']) {
            // set $entities to true to see HTML source
            if (isset($_SESSION['entities']) and $_SESSION['entities']) {
                // true, so show entities, offer 'hide html' button
                $entities = true;
                $button = button('hide HTML', 'danger', 'hideHTML', $this->uniq);
            } else {
                // false (or undefined) so show HTML, offer to show HTML entities
                $entities = false;
                $button = button('show HTML', 'warning', 'showHTML', $this->uniq);
            }
            $HTML .= "<div class='row'><div class='col-1'>$button</div></div>";
        }

        $HTML .= "<div class='row'><div class='col-6'>
                <div id='lesson'>
                {$this->html}
                </div>
            </div><div class='col-6'>";

        // the hard work is all on the second side
        $HTML .=
        "<form action='?saveStepForm'>" . $this->formStandards();

        $HTML .= "<div class='row'>"; // full row for the title

        $HTML .= "<div class='col-1'>";

        // the dropdown for selecting indent level
        $options = formSelectList(['h1', 'h2', 'h3'], $this->indentLevel);
        $HTML .=
            "<div class='form-inline'>
                 <label for='indentLevel'>Indent</label>
                 <select class='form-control' name='indentLevel' value = '{$this->indentLevel}' >
                 $options
                 </select>
              </div>";

        $HTML .= "</div><div class='col-1'>";

        // the dropdown for selecting assistant: standard / history, etc
        $options = formSelectList(['None', 'History', 'Science', 'Mindset'], $this->assistant);
        $HTML .=
            "<div class='form-inline'>
                       <label for='curriculum'>Assistant</label>
                       <select class='form-control' name='assistant' value = '{$this->assistant}' >
                       $options
                       </select>
                    </div>";

        $HTML .= "</div><div class='col-10'>";

        // the title / subtitle of this sections
        $HTML .=
            "<div class='form-group'>
                <label for='title'>Title / Subtitle</label>
                <input class='form-control' type='text' name='title' value='{$this->title}'></input>
                </div>";

        $HTML .= "</div><div class='row'>";

        $HTML .= "</div><div class='col-2'>";

        // the dropdown for selecting image type
        $options = formSelectList(['Image', 'JSXGraph', 'YouTube', 'D3'], $this->imageType);
        $HTML .=
            "<div class='form-inline'>
                 <label for='curriculum'>ImageType</label>
                 <select class='form-control' name='imageType' value = '{$this->imageType}' >
                 $options
                 </select>
              </div>";

        $HTML .= "</div><div class='col-1'>";

        $options = formSelectList(['1', '2', '3', '4'], $this->imagePara);
        $HTML .=
            "<div class='form-inline'>
                             <label>Attach</label>
                             <select class='form-control' name='imagePara' value = '{$this->imagePara}' >
                             $options
                             </select>
                          </div>";

        $HTML .= "</div>"; // end of col,

        $HTML .= "<div class='col-3'>";

        $HTML .=
            "<div class='form-inline'>
                     <label for='Image/Video Name'>Image Name or Video URL</label>
                     <input type='text' class='form-control' name='imageName' value='{$this->imageName}'></input>
                  </div>";

        $HTML .= "</div><div class='col-4'>";

        $HTML .=
            "<div class='form-inline'>
                     <label>Alt Text</label>
                     <input type='text' class='form-control' name='imageAlt' value='{$this->imageAlt}'></input>
                  </div>";

        $HTML .= "</div>"; // end of col,

        $HTML .= "<div class='col-2'>";

        $HTML .=
            "<div class='form-inline'>
                <p></p>
                  </div>";

        $HTML .= "</div>"; // end of col,

        $HTML .= "</div></div>"; // end of col, end of row

        ////////////// line for tracing CC images

        $HTML .= "<div style='border-top:15px;border-style:solid;border-color:white;'>
                <div style='padding:5px; border-color:lightblue;border-style:solid;'>";

        $HTML .= "<div class='row'>";
        $HTML .= "<p>If you can’t trace the creator or terms of use, DO NOT USE this image.
                     CC versions below 4.0 are used by <a href='https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3844180'>CopyLeft Trolls</a>.
                     Consider keeping evidence, perhaps a screenshot, of the original site. </p>";

        $HTML .= "</div>
                <div class='row'>";

        $HTML .= "</div>
                <div class='row'>";

        $HTML .= "<div class='col-2'>";
        $options = formSelectList(['CC BY', 'CC BY-SA', 'CC BY-NC', 'CC BY-ND', 'CC BY-ND-NC', 'CC0', 'By Permission', 'Public Domain', 'My Own', 'Paid Stock'], $this->ccOption);
        $HTML .=
            "<div class='form-inline'>
                 <label for='curriculum'>CC Option</label>
                 <select class='form-control' name='ccOption' value = '{$this->ccOption}' >
                 $options
                 </select>
              </div>";

        $HTML .= "</div><div class='col-1'>";

        $options = formSelectList(['4.0', '3.0', '2.5', '2.1', '2.0', '1.0'], $this->ccVersion);
        $HTML .=
            "<div class='form-inline'>
                 <label for='ccVersion'>Version</label>
                 <select class='form-control' name='ccVersion' value = '{$this->ccVersion}' >
                 $options
                 </select>
              </div>";

        $HTML .= "</div><div class='col-3'>";

        $HTML .=
            "<div class='form-inline'>
                 <label for='ccAuthor'>Author</label>
                 <input type='text' class='form-control' name='ccAuthor' value='{$this->ccAuthor}'></input>
              </div>";

        $HTML .= "</div><div class='col-3'>";

        $HTML .=
            "<div class='form-inline'>
                 <label for='ccSource'>Source</label>
                 <input type='text' class='form-control' name='ccSource' value='{$this->ccSource}'></input>
              </div>";

        $HTML .= "</div><div class='col-1'>";

        $date = (empty($this->dnloadDate)) ? date('Y-m-d') : $this->dnloadDate; // default is now
        $HTML .=
            "<div class='form-inline'>
                   <label for='dnloadDate'>Downloaded</label>
                   <input type='date' name='dnloadDate'  value='$date'></input>
                   </div>";

        $HTML .= "</div></div>"; // end of col, end of row

        $HTML .= "<div class='row'>";

        $HTML .= "<div class='form-inline'>
                <label for='ccComment'>Copyright Info (purchase #, etc)</label>
                <textarea class='form-control' name='ccComment' rows='2' placeholder=''>{$this->ccComment}</textarea>
                </div>";

        $HTML .= "</div>"; // end of row

        $HTML .= "</div></div>"; // end of cc box
        $HTML .=
            "<div class='form-group'>
            <br><textarea class='form-control' name='paragraph1' rows='5' placeholder='Paragraph 1'>{$this->paragraph1}</textarea>
            <br><textarea class='form-control' name='paragraph2' rows='5' placeholder='Paragraph 2'>{$this->paragraph2}</textarea>
            <br><textarea class='form-control' name='paragraph3' rows='5' placeholder='Paragraph 3'>{$this->paragraph3}</textarea>
            <br><textarea class='form-control' name='paragraph4' rows='5' placeholder='Paragraph 4'>{$this->paragraph4}</textarea>

            <br><textarea class='form-control' name='proctorNotes' rows='5' placeholder='Proctor Notes'>{$this->proctorNotes}</textarea>

            </div>";

        $HTML .= "</div>";

        $HTML .= "</form>";

        // this is the monaco editor
        $canvas = "canvas" . $this->fourDigit($this->uniq);
        $HTML .=
            "<div style='border-style:solid;border-color:blue;'>
            <span>Embed code for image (usually JSXGraph, D3 or similar)</span>

            <div id='buttons'>
                <p>
                    <button id='download'>Download</button>
                    <button id='upload'>Upload</button>
                    <button id='run'>Run</button>
                    <button id='stop' disabled>Stop</button>
                    <button id='pause' disabled>Pause</button>
                    <button id='fullscreen' disabled>Full Screen</button>
                    <tt style='font-size: 70%;'>const canvas = document.getElementById('$canvas') as HTMLCanvasElement</tt>
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

    function generateHTML($entities = false) // if $entities, then show HTML source

    {
        $Parsedown = new Parsedown();
        $HTML = '';

        $HTML .= "<div class='row'>
                    <div class='col-1'>";
        $HTML .= "    <img src='assets/images/speaker.png' height='35px'></img>";
        $HTML .= "  </div>
                    <div class='col-11'>";

        foreach (['paragraph1', 'paragraph2', 'paragraph3', 'paragraph4'] as $para) {
            $markdown = $Parsedown->text($this->$para);
            $HTML .= (($entities) ? htmlentities($markdown) : $markdown);
        }

        $HTML .= "    </div>
                   </div>";

        $HTMLTester = new HTMLTester();
        $HTMLTester->validate($HTML);
        return ($HTML);

    }
}

////////////////////////////////////////
////////////// code step ///////////////
////////////////////////////////////////

class CodeStep extends AbstractStep implements StepTemplate
{

    public function __construct($activityUniq)
    {
        $this->activityUniq = $activityUniq;

    }

    public function drawInputForm()
    {}

    public function generateHTML()
    {

    }
}
