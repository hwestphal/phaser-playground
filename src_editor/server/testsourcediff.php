<?php

require "sourcediff.php";

echo "didn't bother with a unittest libaray, each period represents one successful assertion<br>";
function assertTrue($boolean, $msg)
{
    if (!$boolean) {
        echo "<br><span style='background-color:red;'>ERROR:</span> $msg";
        debug_print_backtrace();
    }else{
      echo ".";
    }

}

//
// $test = ("Trim trims any common prefixes");
//     $arr1 = ['cat', 'in', 'the', 'hat'];
//     $arr2 = ['cat', 'in', 'the', 'bag'];
//
//     $diff = new SourceDiff();
//   //  $results = $diff->diff($arr1, $arr2);
//
//     $prefixCount = $diff->trimCommonLines($arr1, $arr2);
//
//     assertTrue($prefixCount == 3, $test);
//
// $test = ("Trim handles identical input");
//     $arr1 = ['cat'];
//     $arr2 = ['cat'];
//
//     $diff = new SourceDiff();
//     $prefix = $diff->trimCommonLines($arr1, $arr2);
//
//     assertTrue(1 == $prefix, $test);
//
//
// $test = ("Trim handles common suffixes");
//     $arr1 = ['dancing', 'in', 'the', 'rain'];
//     $arr2 = ['singing', 'in', 'the', 'rain'];
//
//     $diff = new SourceDiff();
//     $diff->trimCommonLines($arr1, $arr2);
//
//     assertTrue(["dancing"] == $arr1, $test);
//     assertTrue(["singing"] == $arr2, $test);
//
//
// $test = ("everything is an add");
//     $diff = new SourceDiff();
//     $result = $diff->diff('', 'added text');
//
//     assertTrue($result['added']->count()==1, $test);
//     assertTrue($result['deleted']->count()==0, $test);
//
//
// $test = ("everything is an add with blank line in the added text");
//     $diff = new SourceDiff();
//     $result = $diff->diff('', "added text\n\nthat was a blank line");
//
//     assertTrue($result['deleted']->count()==0, $test);
//
//     assertTrue($result['added']->count()==3, $test);
//     assertTrue([0, 1, 2] == $result['added']->all(), $test);
//
//
//
// $test = ("Deleting last line");
//     $diff = new SourceDiff();
//     $result = $diff->diff("test\ndelete me", 'test');
//
//     assertTrue([] == $result['added']->all(), $test);
//     assertTrue([1] == $result['deleted']->all(), $test);
//
//
// $test = ("Everything is a delete");
//     $diff = new SourceDiff();
//     $result = $diff->diff('delete me', '');
//
//     assertTrue([] == $result['added']->all(), $test);
//     assertTrue([0] == $result['deleted']->all(), $test);
//     echo "<br>". serialize($result);
//
//

$test = ("Everything is a delete with blank line in the deleted text");
    $diff = new SourceDiff();
    $result = $diff->diff("delete me\n\nblank line", '');

    assertTrue([] == $result['added']->all(), $test);
    assertTrue([0,1,2] == $result['deleted']->all(), $test);
    echo "<br>". serialize($result);


// $test = ("line diff remove and add lines");
//     $diff = new SourceDiff();
//     $result = $diff->diff("if (cond)\ndoSomething()\n//a func call", "if (cond)\n//a func call\n//no longer needed");
//
//     assertTrue([2], $result['added']->all(), $test);
//     assertTrue([1], $result['deleted']->all(), $test);
//

/*

test("line diff simple delete first line", function() {
    var diff = new SourceDiff.Diff(false);
    var result = diff.diff("first line\nsecond line", "second line");

    assertEquals([], result.added.all());
    assertEquals([0], result.deleted.all());
});

test("line add and delete", function() {
    var diff = new SourceDiff.Diff(false);
    var result = diff.diff("if (cond)\ndoSomething()", "//no check needed\ndoNothing()");

    assertEquals([0, 1], result.added.all());
    assertEquals([0, 1], result.deleted.all());
});

test("add line at top", function() {
    var diff = new SourceDiff.Diff(false);
    var result = diff.diff("doSomething()", "if (cond)\ndoSomething()");

    assertEquals([0], result.added.all());
    assertEquals([], result.deleted.all());
});

test("trailing whitespace is ignored", function() {
    var diff = new SourceDiff.Diff(false);
    var result = diff.diff("line\t", "line     \t  ");

    assertEquals([], result.added.all());
    assertEquals([], result.deleted.all());
});

test("leading whitespace is not ignored", function() {
    var diff = new SourceDiff.Diff(false);
    var result = diff.diff('line', ' line');

    assertEquals([0], result.added.all());
    assertEquals([0], result.deleted.all());
});

test("leading whitespace is ignored", function() {
    var diff = new SourceDiff.Diff(true);
    var result = diff.diff('  line\t', '\t \t  line     \t  ');

    assertEquals([], result.added.all());
    assertEquals([], result.deleted.all());
});

test("Inserts are shifted to line up braces", function() {
    var text1 = 'void CommonMethod()\n{\n  Common();\n}';
    var text2 = 'void CommonMethod()\n{\n  NewMethod();\n  Common();\n}\n\nvoid NewMethod()\n{\n  DoStuff();\n} ';

    var diff = new SourceDiff.Diff(false);
    var result = diff.diff(text1, text2);

    assertEquals([2, 5, 6, 7, 8, 9], result.added.all());
});

test("Inserts are not shifted if the resulting run would not start in a blank line or whitespace", function() {
    var text1 = 'void CommonMethod()\n{\n  Common();\n}';
    var text2 = 'void CommonMethod()\n{\n  NewMethod();\n  Common();\n}\nnon blank\nvoid NewMethod()\n{\n  DoStuff();\n}';

    var diff = new SourceDiff.Diff(false);
    var result = diff.diff(text1, text2);

    assertEquals([2, 4, 5, 6, 7, 8], result.added.all());
});

test("Deletes are shifted to line up braces", function() {
    var text1 = 'void CommonMethod()\n{\n  NewMethod();\n  Common();\n}\n\nvoid NewMethod()\n{\n  DoStuff();\n} ';
    var text2 = 'void CommonMethod()\n{\n  Common();\n} ';

    var diff = new SourceDiff.Diff(false);
    var result = diff.diff(text1, text2);

    assertEquals([2, 5, 6, 7, 8, 9], result.deleted.all());
});

test("Trim ignores whitespace", function() {
    var text1 = "Foo = 'hello';\n";
    var text2 = "  Foo = 'hello'; ";

    var diff = new SourceDiff.Diff(true);
    var result = diff.diff(text1, text2);

    assertEquals([], result.added.all());
    assertEquals([1], result.deleted.all());
});

test("When filling the matrix, whitespace is ignored", function() {
    var text1 = "new\r\ncommon \ncommon2  \nnew2";
    var text2 = "common\ncommon2";

    var diff = new SourceDiff.Diff(true);
    var result = diff.diff(text1, text2);

    assertEquals([], result.added.all());
    assertEquals([0,3], result.deleted.all());
});

test("Delete shows up", function() {
    var text1 = "word\nword";
    var text2 = "word";

    var diff = new SourceDiff.Diff(false);
    var result = diff.diff(text1, text2);

    assertEquals([], result.added.all());
    assertEquals([1], result.deleted.all());
});

test("character diff for line", function() {
    var diff = new SourceDiff.Diff(false);

    var results = diff.lineDiff('var test = "hello";', 'var test2 = "hell";');

    assertEquals([{position: 8, endPosition: 8}], results.added);
    assertEquals([{position: 16, endPosition: 16}], results.deleted);

});

test("line diff semantic cleanup merges adjacent edits", function() {
    var diff = new SourceDiff.Diff(false);

    var lineDiff = diff.lineDiff('aayyyyyybb', 'cccyyyyyyddd');

    lineDiff.cleanUp();

    assertEquals([{position: 0, endPosition: 1}, {position: 8, endPosition: 9}], lineDiff.deleted);
    assertEquals([{position: 0, endPosition: 2}, {position: 9, endPosition: 11}], lineDiff.added);
    assertEquals([{leftPosition: 2, leftEndPosition: 7, rightPosition: 3, rightEndPosition: 8}], lineDiff.common);
});

test("line diff semantic cleanup removes edits that are equal to or smaller than surrounding equalities", function() {
    var diff = new SourceDiff.Diff(false);

    var lineDiff = diff.lineDiff('ing', 'nment');

    lineDiff.cleanUp();

    assertEquals([{position: 0, endPosition: 4}], lineDiff.added);
    assertEquals([{position: 0, endPosition: 2}], lineDiff.deleted);
});

test("line diff semantic cleanup handles when there is no delete on the left", function() {
    var diff = new SourceDiff.Diff(false);

    var lineDiff = diff.lineDiff('ng', 'inment');

    lineDiff.cleanUp();

    assertEquals([{position: 0, endPosition: 5}], lineDiff.added);
    assertEquals([{position: 0, endPosition: 1}], lineDiff.deleted);
});

test("line diff semantic cleanup handles when there is no delete on the right", function() {
    var diff = new SourceDiff.Diff(false);

    var lineDiff = diff.lineDiff('in', 'gnment');

    lineDiff.cleanUp();

    assertEquals([{position: 0, endPosition: 5}], lineDiff.added);
    assertEquals([{position: 0, endPosition: 1}], lineDiff.deleted);
});

test("line diff semantic cleanup handles when there is no delete on the left or right", function() {
    var diff = new SourceDiff.Diff(false);

    var lineDiff = diff.lineDiff('n', 'gnment');

    lineDiff.cleanUp();

    assertEquals([{position: 0, endPosition: 5}], lineDiff.added);
    assertEquals([{position: 0, endPosition: 0}], lineDiff.deleted);
});

test("line diff semantic cleanup handles when there is no add on the right", function() {
    var diff = new SourceDiff.Diff(false);

    var lineDiff = diff.lineDiff('ing', 'mestn');

    lineDiff.cleanUp();

    assertEquals([{position: 0, endPosition: 4}], lineDiff.added);
    assertEquals([{position: 0, endPosition: 2}], lineDiff.deleted);
});

test("line diff semantic cleanup handles when there is no add on the left or right", function() {
    var diff = new SourceDiff.Diff(false);

    var lineDiff = diff.lineDiff('ing', 'n');

    lineDiff.cleanUp();

    assertEquals([{position: 0, endPosition: 0}], lineDiff.added);
    assertEquals([{position: 0, endPosition: 2}], lineDiff.deleted);
});

test("line diff semantic cleanup makes multiple passes", function() {
    var diff = new SourceDiff.Diff(false);

    var lineDiff = diff.lineDiff('Hovering', 'My government');

    lineDiff.cleanUp();

    assertEquals([{position: 0, endPosition: 12}], lineDiff.added);
    assertEquals([{position: 0, endPosition: 7}], lineDiff.deleted);
});

test("not an infinite loop", function() {
    var diff = new SourceDiff.Diff(false);

    var lineDiff = diff.lineDiff('path = docSnapin.GetFile(filename, reallyLocked, eventId);',
        'localPath = docSnapin.GetFile(docInfo.FileName, reallyLocked, eventID);');

    lineDiff.cleanUp();
});

test("Line diff ignores trailing whitespace", function() {
    var diff = new SourceDiff.Diff(false);

    var lineDiff = diff.lineDiff('pat',
        'path    ');

    assertEquals([{position: 3, endPosition: 3}], lineDiff.added);
    assertEquals([], lineDiff.deleted);
});

test("Line diff ignores leading whitespace", function() {
    var diff = new SourceDiff.Diff(true);

    var lineDiff = diff.lineDiff('pat',
        '  path');

    assertEquals([{position: 5, endPosition: 5}], lineDiff.added);
    assertEquals([], lineDiff.deleted);
});

test("Line diff bug with orphaned common letter", function() {
    var diff = new SourceDiff.Diff(true);

    var lineDiff = diff.lineDiff('deleted.unshift', 'diff.addDelete');
    lineDiff.cleanUp();

    assertEquals([{position: 0, endPosition: 13}], lineDiff.added);
    assertEquals([{position: 0, endPosition: 14}], lineDiff.deleted);
    assertEquals([], lineDiff.common);
});

test("LineDiff.addEdit", function() {
    var diff = new SourceDiff.Diff(false);

    var lineDiff = diff.lineDiff('createMatrix(s1, s2);', 'trim(s1Lines, s2Lines);');

    lineDiff.cleanUp();

    assertEquals([{position: 0, endPosition: 7}, {position: 11, endPosition: 11}, {position: 15, endPosition: 18}], lineDiff.deleted);
});

test("LineDiff correctly merges edits and removes semantic chaff", function() {
    var diff = new SourceDiff.Diff(false);

    var lineDiff = diff.lineDiff('deletedText += "<br>";', 'for(var e = 0; e < results.added.length; e++) {');

    lineDiff.cleanUp();

    assertEquals([{position: 0, endPosition: 21}], lineDiff.deleted);
    assertEquals([{position: 0, endPosition: 46}], lineDiff.added);
    assertEquals([], lineDiff.common);
});

test("LineDiff with blank lines", function() {
    var diff = new SourceDiff.Diff(false);

    var diffFormatter = new SourceDiff.DiffFormatter(diff);

    var formatted = diffFormatter.formattedDiff('\n', '*\n');

    assertEquals(formatted[0], "<a name=\"0\"></a><span class=\"modified\"> </span><br> <br>");
    assertEquals(formatted[1], "<span class=\"modified\"><span class=\"modified-light\">*</span></span><br> <br>");
});

test("AnchorIterator", function() {
    var diff = new SourceDiff.Diff(false);

    var diffFormatter = new SourceDiff.DiffFormatter(diff);

    var formatted = diffFormatter.formattedDiff('edit1\ncommon\n\ncommon2\ncommon3', 'edit2\ncommon\ncommon2\ncommon3\nnew line');

    var iterator = formatted[2];
    assertEquals(false, iterator.getPrevEdit());
    assertEquals(1, iterator.getNextEdit());
    assertEquals(0, iterator.getPrevEdit());
    iterator.getNextEdit();
    assertEquals(4, iterator.getNextEdit());
    assertEquals(false, iterator.getNextEdit());
});

test("AnchorIterator - Diffs on line 1 are recorded", function() {
    var diff = new SourceDiff.Diff(false);

    var diffFormatter = new SourceDiff.DiffFormatter(diff);

    var formatted = diffFormatter.formattedDiff('common\nledit1\ncommon\nledit2', 'common\nredit1\ncommon\nredit2');

    var iterator = formatted[2];
    assertEquals(false, iterator.getPrevEdit());
    assertEquals(2, iterator.getNextEdit());
    assertEquals(false, iterator.getNextEdit());
    assertEquals(0, iterator.getPrevEdit());
});

echo "<br>tests completed";

*/
