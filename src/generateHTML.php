<?php

function generateHTML()
    {
        $HTML = '';
        $this->wordcount = 0;   // reset


        $HTML .= "<script>console.log(this);
            </script>";

        $Parsedown = new Parsedown(1); // slightly bigger

        // process the Introduction / Summary

        // $title = '';        // want the title included so voice reader catches it
        // if ($n == 0 and !empty($this->title)) {
        //     $title = neutered($this->title);
        // }

        $sayText = '';
        $voice = 1;

        $title = $this->title;

        $paragraphs = new Paragraphs();
        $parseDown = new Parsedown();

        $cleanIntro = $parseDown->voice($this->introduction); // might have some <p></p>
        if (!empty($cleanIntro)) {
            $jP = $paragraphs->emptyJparagraph();

            $jP['assistant'] =  'Summary';
            $jP['paragraph'] = $this->introduction;
            $title = $this->title;
            $HTML .= $this->generateHTMLHelper(-1, $jP, $title);
            $title = ''; // only show once
        }


        // process each paragraph
        $pNum =intval($this->uniq);   // unique paragraph number
        $allP = $paragraphs->getJparagraphsByStep($pNum);
        $i = 1;
        foreach ($allP as $Jparagraph) {
            // printNice($Jparagraph);
            $HTML .= popquizPopupRender($Jparagraph['popquiz'],$pNum);
            $HTML .= codePopupRender($Jparagraph['code'],$pNum);

            $HTML .= $this->generateHTMLHelper($i++, $Jparagraph, $title);
            $title = '';   // only show it once
        }



        //         ////////////////////////// reflection
        //         $rawcode = <<<END
        // ['1',"2",`&`,'<',">"].foreach(letter => {
        //     console.log(letter) //comment
        // })
        // END;

        // $HTML .= addLoadEventScript();
        // $HTML .= "<script>addLoadEvent('MathcodeAPI.expandCodestr()')</script>";

        // $codeID = $this->clickActionID("c", strval($n));
        // $codevalue = htmlspecialchars($rawcode);

        /*
        $onClick = '';

        // $HTML .= "<div style='display: none;' id='$utterID'>$sayText</div>";
        $HTML .= "<div class='row'>";
        $HTML .= "<div class='col-1'>";
        $HTML .= "<img src='pix/copy.png' width='100%' onClick='$onClick'></img>";
        $HTML .= "<br><br><img src='pix/run.png' width='100%' onClick='$onClick'></img>";
        $HTML .= "</div>";

        // $HTML .= "<div class='col-11'  style='background-color:Gainsboro;'>";
        // $HTML .= "<pre id='$codeID' class='codestr' data-code=\"$codevalue\"></pre>";
        // $HTML .= "</div></div>";

        $HTML .= '<br><br><a class="btn btn-primary btn-lg" href="#" role="button"><i class="fa fa-home"></i> Learn more »</a>';
        */


        ////////////////////////// reflection

        $HTML .= $this->showReflection();


        // if $entities, then show HTML source
        if (isset($_SESSION['entities']) and $_SESSION['entities']) {
            $HTML = neutered($HTML);  // TODO is this right ???
        }

        return ($HTML);
    }

    function showReflection()
    {
        $HTML = '';

        $Parsedown = new Parsedown(1); // slightly bigger

        $reflectTitle = "Reflect on this Page.";
        $helpUsImprove = "Help Improve this Page.";

        // $askYourself = 'How well did you UNDERSTAND this lesson?';
        $keyIdea = "What is the KEY IDEA of this page?";
        $newQuestions = "Having finished this page, do you have any NEW questions?
        If the author was here, what would you ask him?";

        $clarityPurpose = 'How CLEAR is the PURPOSE of this page?';
        $clarityPresentation = 'How CLEAR is the PRESENTATION of this page?';
        $howImprove = "What would you change?  Suggest a way for us to make this lesson clearer or more interesting.";

        $id4 = Utils::fourDigit($this->uniq);

        if (!empty($this->reflection)) {
            $text = $Parsedown->text($this->reflection);

            $sayText = 'Summary..' . $Parsedown->voice($this->reflection);
            $voice = 1;
            $HTML .= $this->speakerIcon('i', $sayText, $voice);

            $HTML .= "<div class='col-11'>";

            $HTML .= "</div'>";
        }

        // step, activity and topic are passed as numbers
        $onclick = "MathcodeAPI.readyToReflect(\"{$this->uniq}\",\"{$this->activityuniq}\",\"{$this->topicUniq}\")"; // warn if student not ready to reflect
        $HTML .= "<div onclick='$onclick'>";


        $HTML .= "<div class='row'>";

        $HTML .= "<div class='col-6' style='background-color:lightcyan'>";
        $HTML .= "<h3>$reflectTitle</h3>";

        // add our custom message for this reflection
        if (!empty($this->reflection)) {
            $HTML .= $text; // parsedown of reflection text
        }

        $HTML .= "<label style='margin-bottom:0px;' for='ref3'>$keyIdea</label>";
        $HTML .= "<textarea style='margin:2px 2px 2px -2px;'  wrap='hard' class='form-control' name='ref3' rows='4' placeholder='The KEY IDEA is...' required='required'></textarea>";

        $HTML .= "<label style='margin-bottom:0px;' for='ref2'>$newQuestions</label>";
        $HTML .= "<textarea style='margin:2px 2px 2px -2px;' wrap='hard'  class='form-control' name='ref2' rows='4' placeholder='How..?  Why..?' required='required'></textarea>";

        $HTML .= "</div>
                    <div class='col-6' style='background-color:lightcyan;border-left: 1px solid;'>";
        $HTML .= "<h3>$helpUsImprove</h3>";
        $HTML .= likertScale($clarityPurpose, 'ref4');
        $HTML .= likertScale($clarityPresentation, 'ref4');

        $HTML .= "<label  style='margin-bottom:0px;' for='ref5'>$howImprove</label>";
        $HTML .= "<textarea style='margin:2px 2px 2px -2px;' wrap='hard'  class='form-control' name='ref5' rows='4' placeholder='Make it BETTER by...'></textarea>";

        $HTML .= "      </div>"; // second col
        $HTML .= "    </div>"; // row

        // $HTML .= "</div></div>";  // inner close col and row

        $HTML .= "<input type='hidden' name='id' value='{$GLOBALS['id']}' />";
        $HTML .= "<input type='hidden' name='sesskey' value='{$GLOBALS['session']}' />";
        $HTML .= "<input type='hidden' name='uniq' value='{$this->uniq}' />";

        $HTML .= reflectionButton(
            'Complete this Page',
            'primary',
            'reflection',
            true,
            "return MathcodeAPI.completeStep('$id4','r','{$this->activityuniq}','{$this->topicUniq}')"
        );

        $HTML .= "  </div>"; // bkgnd color
        $HTML .=
            '</form>';

        ///////////

        $HTMLTester = new HTMLTester();
        $HTMLTester->validate($HTML);

        return ($HTML);
    }

    function speakerIcon($extendChar, $sayText, $voice)
    {
        $HTML = '';
        // put the speaker and utterance in col 1,
        $utterID = Utils::clickActionID($this->uniq, "u", $extendChar);  // id is u+$id4+$extendChar
        // $onClick = $this->onClickSay($extendChar, $voice);
        $onClick = Utils::onClickSay($utterID, $voice);
        $HTML .= "<div style='display: none;' id='$utterID'>$sayText</div>";
        $HTML .= "<img src='pix/speaker.png' width='30px' onClick='$onClick'></img>";
        // $HTML .= $sayText;
        $HTML .= "  </div>";
        return ($HTML);
    }
    // public function testTextStep()
    // {
    //     $this->testAbstract();
    // }
// }
