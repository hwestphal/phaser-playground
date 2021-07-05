<?php


// original source in .js from https://github.com/jhewlett/SourceDiff
// this file consolidates  diff.js, lineDiff, editSet



////////////////////////////////////////////
//////////  SourceDiff /////////////////////
////////////////////////////////////////////

class SourceDiff
{
    public function trimWhiteSpace($str)
    {
        return ltrim(rtrim($str));
    }

    public function lineDiff($originalLine, $editedLine)
    {
        $originalTrimmed = $this->trimWhiteSpace($originalLine);
        $editedTrimmed = $this->trimWhiteSpace($editedLine);

        $originalOffset = strlen($originalLine) - strlen($originalTrimmed);
        $editOffset = strlen($editedLine) - strlen($editedTrimmed);

        $originalTrimmed = rtrim($originalTrimmed);
        $editedTrimmed = rtrim($editedTrimmed);

        $matrix = createMatrix(0, $originalTrimmed, $editedTrimmed);

        fillMatrix(0, $originalTrimmed, $editedTrimmed, $matrix);

        return (createLineDiff($originalTrimmed, $editedTrimmed, $originalOffset, $editOffset, $matrix));
    }


    public function createLineDiff($originalTrimmed, $editedTrimmed, $originalOffset, $editOffset, $matrix)
    {
        $diff = new LineDiff();

        $i = $originalTrimmed.length;
        $j = $editedTrimmed.length;

        while ($i >= 0 && j >= 0) {
            if ($originalTrimmed[$i - 1] === $editedTrimmed[$j - 1]) {
                if ($originalTrimmed[$i - 1]) {
                    $diff->addCommon($originalOffset + $i - 1, $editOffset + $j - 1);
                }
                $i--;
                $j--;
            } elseif ($j >= 0 && ($i === 0 || $matrix[$i][j - 1] >= $matrix[$i - 1][$j])) {

                if (strlen($editedTrimmed[$j - 1]) > 0) {
                    $diff->addInsert($editOffset + $j - 1);
                }
                $j--;
            } elseif ($i > 0 and ($j === 0 || $matrix[$i][$j - 1] < $matrix[$i - 1][$j])) {  // tb was $i >= 0
                if (strlen($originalTrimmed[$i - 1]) > 0) {
                    $diff->addDelete($originalOffset + $i - 1);
                }
                $i--;
            }
        }

        return $diff;
    }


    public function diff($originalText, $editedText)
    {
        $originalLines = explode(PHP_EOL, $originalText);
        $editedLines = explode(PHP_EOL, $editedText);

        $this->padBlankLines($originalLines);
        $this->padBlankLines($editedLines);

        $startPos = $this->trimCommonLines($originalLines, $editedLines);

        $matrix = $this->createMatrix($startPos, $originalLines, $editedLines);
//        echo "<br>matrix <pre>",print_r($matrix),"</pre>";
        $this->fillMatrix($startPos, $originalLines, $editedLines, $matrix);
//        echo "<br>matrix <pre>",print_r($matrix),"</pre>";

        $results = $this->findAddsAndDeletes($originalLines, $editedLines, $startPos, $matrix);
        // $result is an array: ['added=>editset', 'deleted'=>editset]

        $this->checkShiftEdits(explode(PHP_EOL, $originalText), $results['deleted']);
        $this->checkShiftEdits(explode(PHP_EOL, $editedText), $results['added']);

        echo "<br>diff('$originalText','$editedText') returns ",serialize($results);
        return ($results);

    }

    public function findAddsAndDeletes($originalLines, $editedLines, $startPos, $matrix)
    {
        $i = count($originalLines);
        $j = count($editedLines);

        $added = new EditSet();
        $deleted = new EditSet();

        $a1 = $this->checkAllAddsOrDeletes($originalLines, $editedLines, $added);
        $a2 = $this->checkAllAddsOrDeletes($editedLines, $originalLines, $deleted);
        $allAddsOrDeletes = $a1 or $a1;

echo "<br> allAddsOrDeletes", serialize($allAddsOrDeletes);
        if (!$allAddsOrDeletes) {
            while ($i >= $startPos and $j >= $startPos) {
                $m = $i - $startPos;
                $n = $j - $startPos;
                echo "<br>??  startPos $startPos, i $i, j $j, m $m, n $n";

                if ($m > 0 and $n > 0 and
                      $this->linesAreEqual($originalLines[$i - 1], $editedLines[$j - 1])) {
                    $i--;
                    $j--;
                } elseif ($j >= $startPos
                    and ($m > 0 and $n > 0)
                    and ($i === $startPos or $matrix[$m][$n - 1] >= $matrix[$m - 1][$n])) {

                    if ($j - 1 >= $startPos and count($editedLines[$j - 1]) > 0) {
echo "<br>findAddsAndDeletes removing an add";

                        $added->add($j - 1);
                    }
                    $j--;
                } elseif ($i >= $startPos and ($j === $startPos or $matrix[$m][$n - 1] < $matrix[$m - 1][$n])) {
                    if ($i - 1 >= $startPos and count($originalLines[$i - 1]) > 0) {
                        $deleted->add($i - 1);
                    }
                    $i--;
                }
            }
        }
        $ret = ['added'=> $added, 'deleted'=> $deleted];
        // echo "<br>findAddsAndDeletes(".implode('\n', $originalLines).','
        //                               .implode('\n', $editedLines).", $startPos,  matrix) returns "
        //                               .serialize($ret);

        return ($ret);
    }

    public function checkAllAddsOrDeletes($lines, $otherLines, $editSet)
    {
        $ret = false;  // unless

//        echo "<br>count is ",count($lines), "empty zero is ",($lines[0] === '')?'true':'false';
        if (count($lines) === 1 and $lines[0] === '') {
            for ($i = 0; $i < count($otherLines); $i++) {
                $editSet->add($i);
            }
            $ret = true;
        }

//        echo "<br>checkAllAddsOrDeletes(",implode('\n', $lines),',',
//                                         implode('\n', $otherLines),',',serialize($editSet)," returns ",$ret?'true':'false';
        return($ret);
    }

    public function linesAreEqual($line1, $line2)
    {
        return $this->trimWhiteSpace($line1) === $this->trimWhiteSpace($line2);
    }

    //Find all continuous runs of inserts or deletes. For each run, see if it can be shifted forward 1 line.
    //This is useful for properly pairing opening and closing braces in C-like languages, for example.
    public function checkShiftEdits($textLines, $editSet)
    {
        $editArray = $editSet->all();
        if (count($editArray) > 0) {
            $startRun = $editArray[0];

            $current = $startRun;
            for ($i = 1; $i < count($editArray); $i++) {
                if ($i === count($editArray)- 1) {   //end of the run and the edits
                    if ($editArray[$i] === $current + 1) {
                        $current++;
                    }
                    $this->checkShiftRun($textLines, $editSet, $startRun, $current);
                } elseif ($editArray[$i] === $current + 1) {
                    $current++;
                } else {    //end of the run
                    $this->checkShiftRun($textLines, $editSet, $startRun, $current);

                    $startRun = $current = $editArray[$i];
                }
            }
        }
    }

    public function checkShiftRun($textLines, $editSet, $startRun, $endRun)
    {
//      echo "<br> checkshiftrun",print_r($textLines),print_r($editSet),"startRun $startRun endrun $endRun";
//      echo '<br> $this->linesAreEqual($textLines[$startRun], $textLines[$endRun + 1]) and
//                $this->lineIsBlank($textLines[$startRun + 1]))';

        // added a test for reading beyond the array limit
        if (($endRun < count($textLines)-1) and $this->linesAreEqual($textLines[$startRun], $textLines[$endRun + 1]) and
                  $this->lineIsBlank($textLines[$startRun + 1])) {
            $editSet->remove(startRun);
            $editSet->add(endRun + 1);
        }
    }

    public function lineIsBlank($line)
    {
        return(preg_match('/^\s*$/', $line));   // return /^\s*$/.test(line);
    }

    public function createMatrix($startPos, $originalLines, $editedLines)
    {   // for PHP, I initialize the whole matrix.  may not exist if uninitialized
echo "createMatrix({$startPos}, '",print_r($originalLines),"', '",print_r($editedLines),"')";

        $matrix = [];
        for ($i = 0; $i <= count($originalLines) - $startPos; $i++) {
            $matrix[$i] = array(count($editedLines) - $startPos + 1);

            for ($j = 0; $j <= count($editedLines) - $startPos; $j++) {
                $matrix[$i][$j] = 0;
            }
        }
echo "<br>matrix <pre>",print_r($matrix),"</pre>";

        return ($matrix);
    }

    public function fillMatrix($startPos, $originalLines, $editedLines, $matrix)
    {
        for ($i = 1; $i <= count($originalLines) - $startPos; $i++) {
            $originalTrimmed = $this->trimWhiteSpace($originalLines[$i + $startPos - 1]);
            for ($j = 1; $j <= count($editedLines) - $startPos; $j++) {
                $trimmedEdit = $this->trimWhiteSpace($editedLines[$j + $startPos - 1]);
//echo "<br>FillMatrix Orig: '$originalTrimmed', Edit '$trimmedEdit', $i, $j";

                if ($originalTrimmed === $trimmedEdit) {
//echo "<br>FillMatrixADD";
                    $matrix[$i][$j] = $matrix[$i - 1][$j - 1] + 1;
                } else {
                    $matrix[$i][$j] = max($matrix[$i][$j - 1], $matrix[$i - 1][$j]);
                }
            }
        }
    }

    public function trimCommonLines(&$originalLines, &$editedLines)   // call by reference
    {
        $startPos = 0;

        while (count($originalLines) > $startPos && count($editedLines) > $startPos
                and $this->linesAreEqual($originalLines[$startPos], $editedLines[$startPos])) {
            $startPos++;
        }
        while (count($originalLines) > $startPos && count($editedLines) > $startPos
            and  $this->linesAreEqual($originalLines[count($originalLines) - 1], $editedLines[count($editedLines) - 1])) {
            array_pop($originalLines);
            array_pop($editedLines);
        }

        return ($startPos);
    }


    public function padBlankLines($lines)
    {
        if (count($lines) === 1 and $lines[0] === '') {
            return;
        }

        for ($l = 0; $l < count($lines); $l++) {
            if ($lines[$l] === '') {
                $lines[$l] = ' ';
            }
        }
    }

    //SourceDiff.split = function(string) {
    //    return string.split(/\r?\n/);
    //};
}


////////////////////////////////////////////
//////////  SourceDiff /////////////////////
////////////////////////////////////////////



class LineDiff
{
    public $added = [];
    public $deleted = [];
    public $common = [];

    public function addCommonn($leftPosition, $rightPosition)
    {
        array_unshift($this->common, ['leftPosition'=> $leftPosition,
                                      'leftEndPosition'=> $leftPosition,
                                      'rightPosition' => $rightPosition,
                                      'rightEndPosition' => $rightPosition]);
    }

    public function addDelete($position)
    {
        array_unshift($this->deleted, ['position' =>$position,
                                      'endPosition' => $position]);
    }

    public function addInsert($position)
    {
        array_unshift($this->added, ['position'=> $position,
        'endPosition'=> $position]);
    }

    public function editLength($edit)
    {
        if (!$edit) {
            return 0;
        }
        return $edit['endPosition'] - $edit['position'] + 1;
    }

    public function cleanUp()
    {
        $this->mergeAdjacent($added);
        $this->mergeAdjacent($deleted);
        $this->mergeAdjacentCommon();

        do {
            $didmerge = false;
            for ($i = 0; $i < count($this->common); $i++) {
                $equalityLength = $this->common[i]['leftEndPosition'] - $this->common[$i]['leftPosition'] + 1;

                $leftDelete = findEditWithEndingPosition($this->deleted, $this->common[$i]['leftPosition'] - 1);
                $rightDelete = findEditWithPosition($this->deleted, $this->common[$i]['leftEndPosition'] + 1);

                $leftAdd = findEditWithEndingPosition($this->added, $this->common[$i]['rightPosition'] - 1);
                $rightAdd = findEditWithPosition($this->added, $this->common[$i]['rightEndPosition'] + 1);

                if ($equalityLength <= 8 and ($editLength(leftDelete) + $editLength(leftAdd)) >= equalityLength
                        and ($editLength($rightDelete) + $editLength($rightAdd)) >= equalityLength) {
                    $didmerge = true;
                    if ($leftDelete and $rightDelete) {
                        $leftDelete['endPosition'] = $rightDelete['endPosition'];
                        $this->removeEdit($this->deleted, $rightDelete);
                    } elseif ($leftDelete) {
                        leftDelete.$endPosition = $this->common[$i].$leftEndPosition;
                    } elseif ($rightDelete) {
                        $rightDelete['position'] = $this->common[$i]['leftPosition'];
                    } else {
                        $this->addEdit($this->deleted, $this->common[$i]['leftPosition'], $this->common[$i]['leftEndPosition']);
                    }

                    if ($leftAdd and $rightAdd) {
                        $leftAdd['endPosition'] = $rightAdd['endPosition'];
                        $this->removeEdit($this->added, $rightAdd);
                    } elseif ($leftAdd) {
                        $leftAdd['endPosition'] = $this->common[i]['rightEndPosition'];
                    } elseif ($rightAdd) {
                        $rightAdd['position'] = $this->common[i]['rightPosition'];
                    } else {
                        $this->addEdit($this->added, $this->common[i]['rightPosition'], $this->common[i]['rightEndPosition']);
                    }

                    array_splice($this->common, $i, 1);
                }
            }
        } while ($didmerge);
    }

    public function mergeAdjacentCommon()
    {
        for ($i = 0; $i < count($this->common); $i++) {
            if ($i + 1 < count($this->common)
                    and $this->common[$i]['leftEndPosition'] + 1 === $this->common[$i + 1]['leftPosition']
                    and $this->common[$i]['rightEndPosition'] + 1 === $this->common[$i + 1]['rightPosition']) {
                $this->common[$i]['leftEndPosition'] = $this->common[$i + 1]['leftEndPosition'];
                $this->common[$i]['rightEndPosition'] = $this->common[$i + 1]['rightEndPosition'];
                array_splice($this->common, $i + 1, 1);
                $i--;
            }
        }
    }

    public function addEdit(&$edits, $position, $endPosition)
    {
        $newEdit = [
            'position' => $position,
            'endPosition' => $endPosition
        ];

        if (edits['length'] === 0) {
            array_push($edits, $newEdit);
        } elseif ($position < $edits[0]['position']) {
            array_unshift($edits, $newEdit);
        } else {
            for ($i = count($edits) - 1; $i >= 0; $i--) {
                if ($position > $edits[$i]['position']) {
                    array_splice($edits, $i + 1, 0, $newEdit);
                    break;
                }
            }
        }
    }

    public function removeEdit(&$edits, $item)
    {
        for ($i = 0; $i < edits.length; $i++) {
            if ($edits[$i] === $item) {        // php? can compare array this way?
                array_splice($edits, i, 1);
                break;
            }
        }
    }

    public function findEditWithPosition($edits, $pos)
    {
        for ($i = 0; $i < count($edits); $i++) {
            if ($edits[$i]['position'] === $pos) {
                return ($edits[$i]);
            }
        }
    }

    public function findEditWithEndingPosition($edits, $endPos)
    {
        for ($i = 0; $i < count($edits); $i++) {
            if ($edits[$i]['endPosition'] === $endPos) {
                return ($edits[$i]);
            }
        }
    }

    public function mergeAdjacent(&$edits)
    {
        for ($i = 0; $i < count($edits); $i++) {
            if ($i + 1 < count($edits) and $edits[i]['endPosition'] + 1 === $edits[i + 1]['position']) {
                $edits[i]['endPosition'] = $edits[i + 1]['endPosition'];
                array_splice($edits, i + 1, 1);
                $i--;
            }
        }
    }
}







// not sure what this is, suspect is because JS arrays are so weird
// only useful function is 'updatenumbers'

class EditSet
{
    public $set = [];

    public function add($line)
    {
        $this->set[$line] = true;
    }

    public function addValue($line, $value)
    {
        $this->set[$line] = $value;
    }

    public function remove($line)
    {
        unset($this->set[$line]);
    }

    public function count()
    {
        return (count($this->set));
    }

    public function get($line)
    {
        return ($this->set[line]);
    }

    public function all()
    {
        $arr = [];
        $i = 0;
        // this is a JS style array, must reset numbering
        foreach ($this->set as $line=>$value) {
            $arr[$i++] = $line;    // resets the keys to 0,1,2...
        }
        // weird, creates [0]=>0, [1]=>1, etc
        return($arr);
    }

    public function contains($lineNumber)
    {
        return (isset($this->set[$lineNumber]));
    }

    public function updateNumbers($lineNumber)
    {
        $newSet = [];

        foreach ($this->set as $prop=>$value) {
            if ($value) {
                if ($prop >= $lineNumber) {
                    $newSet[$prop + 1] = $value;
                } else {
                    $newSet[$prop] = $value;
                }
            }
        }
        $this->set = $newSet;
    }

    public function show()
    {
        $ret = '';
        foreach ($this->set as $prop=>$value) {
            $ret .= "<br>$prop: $value";
        }
        return($ret);
    }
}
