<?php


$GLOBALS['dist'] = '2.1.6';        // point at current dist directory


// list of all table names in the database
$GLOBALS['allTableNames'] = ['showcase'];

$GLOBALS['code'] = base64_encode('');
// $GLOBALS['hiddencode'] = base64_encode('import { TXG } from "./dist/tsxgraph.js";  let TSX = TXG.TSXGraph.initBoard("jxgbox");');
// $GLOBALS['hiddendecl'] = base64_encode('declare let TSX: TXG.TSXBoard;');

$GLOBALS['hiddendecl'] = base64_encode(
    "declare let TSX:Object"
);

$GLOBALS['hiddencode'] = base64_encode(
    "\n import {TSXBoard} from '/TSXGraph/playground//dist.{$GLOBALS['dist']}/tsxgraph.js';
 \n let TSX = new TSXBoard('jxgbox');"
);


function myErrorHandler($errno, $errstr, $errfile, $errline)
{
    printNice("<b style='color:red;'>ERROR</b> [$errno] (line $errline): $errfile.  $errstr");
}

// set to the user defined error handler
$old_error_handler = set_error_handler("myErrorHandler");


function backTrace(): string
{
    $debug = debug_backtrace();
    $trace = '';
    for ($i = 1; $i < 7; $i++) {
        if (isset($debug[$i]['file'])) {
            $file = explode('/', $debug[$i]['file']);
            $f = $file[count($file) - 1];
            $line = $debug[$i]['line'];
            $trace .= "$f($line) ";
        }
    }
    return $trace;
}


if (!function_exists('printNice')) {
    function printNice($a, string $b = '')
    {
        if (is_array($a)) {
            $a = json_encode($a);
        }
        $output = '    ' . date(DATE_COOKIE) . ' <span style="color:blue;">' . $b . ':</span>  ' . $a . ' ' . backtrace() . "\n\r";
        file_put_contents('ajaxHistory.txt', $output, FILE_APPEND);
        // if ($GLOBALS['debugMode']) echo "<br>", $output;
    }
}
if (!function_exists('assertTrue')) {
    function assertTrue($a, $b = 'unknown error')
    {
        if (!$a) {
            printNice('assert follows, i hope');
            $a = json_encode($a);
            $output = 'ERR ' . date(DATE_COOKIE, time()) . ' ' . $b . backtrace() . "\n\r";
            file_put_contents('ajaxHistory.txt', $output, FILE_APPEND | LOCK_EX);
            // if ($GLOBALS['debugMode']) echo "<br><span style='color:red;>", $output, '</span>';
        }
    }
}



dbconnect::open('showcase');



// index.php called with
function loadFromPayload(string $queryFromURL)
{
    $showcase = new Showcase();

    parse_str($queryFromURL, $qArray);     // very nonstandard call:  src is $query,  result is $queries

    $uniq = $qArray['script'] ?? '';
    if ($uniq) {
        $showcase = new Showcase();

        $ret = $showcase->getRecord($uniq);
        // echo serialize($ret);
        if ($ret) {

            // printNice('count(ret):', count($ret));
            // printNice(json_encode($ret));

            if (count($ret) > 0) {
                $GLOBALS['code'] = $ret['code'];
                $GLOBALS['hiddencode'] = $ret['hiddencode'];
                $GLOBALS['hiddendecl'] = $ret['hiddendecl'];
                $GLOBALS['dist'] = $ret['jsxversion'];
            }
        }
    }
}



function writeRecord(array $data)
{
    $showcase = new Showcase();


    $key = $data['data02'] ?? 'noKey';
    printNice(base64_decode($data['data05']));  // just curiosity, keep it encoded
    printNice($data['data06']);  // just curiosity, keep it encoded
    printNice($data['data07']);  // just curiosity, keep it encoded

    $code = $data['data05'] ?? '';
    $hiddenCode = $data['data06'] ?? '';
    $hiddenDecl = $data['data07'] ?? '';
    printNice("processing-->  $key: $code");

    $showcase->addOrUpdateCode($key, $code, $hiddenCode, $hiddenDecl);

    // echo $showcase->dumpAll();
}



////////////// this is what the moodle version looks like
// <TABLE NAME="mathcode_showcase" COMMENT="lets students post their work (within Moodle)">
// <FIELDS>
//   <FIELD NAME="id" TYPE="int" LENGTH="10" NOTNULL="true" SEQUENCE="true"/>
//   <FIELD NAME="userid" TYPE="int" LENGTH="10" NOTNULL="true" SEQUENCE="false" COMMENT="for index, mark multi records for one student"/>
//   <FIELD NAME="uniq" TYPE="char" LENGTH="40" NOTNULL="false" SEQUENCE="false" COMMENT="random key for student url"/>
//   <FIELD NAME="isodate" TYPE="char" LENGTH="10" NOTNULL="false" SEQUENCE="false" COMMENT="date posted"/>
//   <FIELD NAME="data_blob" TYPE="binary" NOTNULL="false" SEQUENCE="false" COMMENT="used for storing student artifacts"/>
// </FIELDS>
// <KEYS>
//   <KEY NAME="primary" TYPE="primary" FIELDS="id"/>
// </KEYS>
// <INDEXES>
//   <INDEX NAME="uniq" UNIQUE="false" FIELDS="uniq"/>
//   <INDEX NAME="portfolio" UNIQUE="false" FIELDS="userid,isodate"/>
// </INDEXES>
// </TABLE>


/** a showcase for codes */
$GLOBALS['firstTime'] = true;  // only try to create the showcase db on the fist time in each invoke
class Showcase extends dbconnect
{
    public $tableName = 'showcase';

    public function __construct()
    {
        if ($GLOBALS['firstTime']) {
            $GLOBALS['firstTime'] = false;  // not next time

            $dbConnect = new dbconnect();
            $dbConnect->open('showcase');

            $createString =
                "CREATE TABLE IF NOT EXISTS `{$this->tableName}` (
              `id`           integer PRIMARY KEY AUTOINCREMENT NOT NULL ON CONFLICT FAIL,
              `userid`       integer default 0,
              `uniq`         text default '',
              `jsxversion`   text default '',
              `gameframe`    integer default 0,
              `isodate`      text default '',
              `code`         text default '',
              `hiddencode`   text default '',
              `hiddendecl`   text default '',
              `hash`         text default '',
              `visits`       integer default 0,
              `datecreate`   integer default 0);";


            $this->statement($createString);

            $indexString = "CREATE INDEX IF NOT EXISTS `idx1_{$this->tableName}` ON {$this->tableName} (uniq);";
            $this->statement($indexString);
            $indexString = "CREATE INDEX IF NOT EXISTS `idx2_{$this->tableName}` ON {$this->tableName} (datecreate,hash);";
            $this->statement($indexString);
            $indexString = "CREATE INDEX IF NOT EXISTS `idx3_{$this->tableName}` ON {$this->tableName} (hash);";
            $this->statement($indexString);

            // $alterString = "ALTER TABLE {$this->tableName}  ADD `gameframe` integer default 0;";
            // $this->statement($alterString);

            //  // don't do this more than once per session, or will kill testing
            //  // purge after three years  (so make sure there is an index on datecreate)
            //  if($_SESSION['dbEvents']??''){
            //      $threeYears = 60 * 60 * 24 * 365 * 3; // seconds in three years
            //      $deleteBefore = time() - $threeYears;
            //
            //      $purgeString = "DELETE FROM {$this->tableName} WHERE datecreate < $deleteBefore";
            //      //printNice($purgeString);
            //      $this->statement($purgeString);
            //
            //      $_SESSION['dbEvents'] = true;
            //  }

        }
    }

    public function addOrUpdateCode(string $key, string $code, string $hiddenCode, string $hiddenDecl)
    {
        $a = [
            'jsxversion' => $GLOBALS['dist'],
            'code' => $code,
            'hiddencode' => $hiddenCode,
            'hiddendecl' => $hiddenDecl,
            'isodate' => date('Y-m-d'),
            'hash' => hash('sha1', $code),
            'datecreate' => time(),
        ];
        $ret = $this::query("select * from $this->tableName where uniq = '$key'");
        if (count($ret) == 0) {
            $a['uniq'] = $key;
            $this::insertArray($this->tableName, $a);
        } else {
            $a['visits'] = $ret[0]['visits'] + 1;
            $this::updateArray($this->tableName, $a, $key);
        }
    }

    public function getRecord(string $uniq)
    {
        $query = "select * from $this->tableName where uniq = '$uniq'";
        $ret = $this->query($query);
        return $ret[0];
    }

    /** returns [n,m]  where n is #records, m is #distinct records by hash*/
    public function countRecords()
    {
        $query = "select count(*) from $this->tableName";
        $ret = $this->query($query);
        return $ret[0][0];
    }

    public function differentRecords()
    {

        $query = "select * from $this->tableName where hash in (select distinct hash from $this->tableName) group by hash order by datecreate desc";
        // $query = "select distinct hash from $this->tableName";
        $ret = $this->query($query);
        return $ret;
    }

    public function dumpAll()
    {
        $query = "select * from $this->tableName order by datecreate";
        $ret = $this->query($query);
        return $this->quickTable($ret, ['id', 'datecreate', 'uniq', 'visits', 'hash', 'code', 'hiddencode', 'hiddendecl']);
    }
}


///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////

class dbconnect
{

    static $db = null;

    // we come through here everytime we create a new db object, which is OFTEN
    // so it's really a singleton

    static function open(string $database, bool $dropAndCreateNew = false)
    {
        // only open if $db is empty (once per PHP transaction)
        if (empty(dbconnect::$db)) {

            $filename = $database . ".SQLite3";
            $fileExistsBeforeOpen = file_exists($filename);

            // open the connection, this will create a file if necessary
            dbconnect::$db = new SQLite3($filename);
            dbconnect::$db->exec("PRAGMA busy_timeout=5000"); //(msec)    // defaults to zero, gives 'busy'
            assertTrue(dbconnect::$db->lastErrorCode() == 0, dbconnect::$db->lastErrorMsg());
            assertTrue(file_exists($filename));

            if (!$fileExistsBeforeOpen) {
                // create each table with the latest definitions
                foreach ($GLOBALS['allTableNames'] as $tableName) {
                    // printNice($table);
                    $db = new $tableName();

                    // useful if we have restructured
                    if ($dropAndCreateNew) {
                        DBconnect::statement("DROP TABLE IF EXISTS $tableName");
                    }
                    // $db->createIfNecessary();
                }
                // printNice("dbconnect:  have opened '$filename'");

            }
        }
    }

    // not sure we need a close
    static function close()
    {
        if (dbconnect::$db !== null)
            $ret = dbconnect::$db->close();
        dbconnect::$db = null;
    }


    static function statement(string $query)
    {
        // if (strpos('mathcode_tom_1_1650295235_385',$query)){
        // printNice($query);
        // }

        // if (!(left(strtoupper($query), 6) == 'CREATE'
        //     or left(strtoupper($query), 6) == 'INSERT'
        //         or left(strtoupper($query), 6) == 'DELETE')) {
        //             printNice($query, 'WRITE TO DB IS TURNED OFF');
        //     return;
        // }




        printNice($query, 'query');
        $results = dbconnect::$db->query($query);

        assertTrue($results !== false, "Error in statement " . dbconnect::$db->lastErrorMsg() . ' ' . $query);

        // this will call for a backup the next time we are at the kanban screen or sooner
        if (!isset($_SESSION['currentOpenTextbookDirtySince']) or $_SESSION['currentOpenTextbookDirtySince'] == 0)
            $_SESSION['currentOpenTextbookDirtySince'] = time();

        return ($results);
    }

    // public function changes()
    // {
    //     $changes = dbconnect::db->changes();
    //     return ($changes);
    // }

    static function query(string $query)
    {
        // should use 'statement' for these
        assertTrue(substr($query, 0, 6) !== 'update');
        assertTrue(substr($query, 0, 6) !== 'insert');
        assertTrue(substr($query, 0, 6) !== 'delete');
        assertTrue(substr($query, 0, 4) !== 'drop');
        assertTrue(substr($query, 0, 5) !== 'create');

        // printNice('query :' . $query);

        // $_SESSION['queries'][] = Utils::backTrace() . ' ' . $query; // save a copy

        $return = [];

        if (dbconnect::$db === null) {
            assertTrue(false, "how did this happen?");
        }

        $results = dbconnect::$db->query($query);

        if (false == $results) {
            assertTrue(false, "Error in query: " . dbconnect::$db->lastErrorMsg() . "  " . $query);
        } else {

            while ($row = $results->fetchArray()) {
                $return[] = $row;
                // printNice($row);
            }
        }
        $lastError = dbconnect::$db->lastErrorCode();
        if ($lastError !== 0 and $lastError != 101) {   // 101 is just 'no more rows'
            printNice($lastError, "error message from SQLlite");
            assertTrue($lastError == 0, dbconnect::$db->lastErrorMsg());
        }
        return ($return);
    }


    static function insertArray(string $tableName, array $aArray)
    {
        $insertString = dbconnect::createInsertString($aArray, $tableName);
        return (dbconnect::statement($insertString));
    }

    static function createInsertString(array $aArray, string $tableName)
    { // $aArray is a set of field-value pairs

        $cFields = "";
        $cValues = "";

        foreach ($aArray as $key => $value) {

            // this is crazyness of SQLite3  we get $a['uniq]  and $a[0]
            // if any number indexes make it here, just filter them out
            if (is_numeric($key)) {
                continue;
            }


            if ("" != $cFields) { // for second and subsequent fields, we need comma separators
                $cFields .= ", ";
                $cValues .= ", ";
            }

            $cFields .= $key; //  no checks against field names, but we have to be more careful with value fields

            switch (gettype($value)) {
                case "boolean":
                    $cValues .= $value ? '1' : '0';
                    break;
                case "integer":
                    $cValues .= strval($value);
                    break;
                case "double":
                    $cValues .= strval($value);
                    break;
                case "string":
                    $cValues .= dbconnect::quote_string($value); // clean up, prevent injection
                    break;
                case "array":
                    assertTRUE(false, "don't have an ARRAY handler for inserts of $key " . serialize($aArray));
                    break;
                case "object":
                    assertTRUE(false, "don't have an OBJECT handler for inserts of $key " . serialize($aArray));
                    break;
                case "resource":
                    assertTRUE(false, "don't have a RESOURCE handler for inserts of $key " . serialize($aArray));
                    break;
                case "NULL":
                    // we decided to try to convert to empty string, because we don't have a schema
                    $cValues .= dbconnect::quote_string('');
                    break;
                default:
                    assertTRUE(false, "Did not expect a type " . gettype($value) . " in INSERT() on field $key " . serialize($aArray));
            }
        }
        $insertString = "INSERT INTO " . $tableName . " (" . $cFields . ") VALUES (" . $cValues . ")";
        return ($insertString);
    }


    static function updateArray(string $tableName, array $aArray, string $uniq)
    {
        // printNice($aArray, 'update ARRAY');
        // printNice($where, 'update WHERE');

        // old way was 'uniq='xxx',  new way is just 'xxx'
        assertTrue(!str_contains($uniq, '='), "update where is just UNIQ, got $uniq");

        $updates = '';

        foreach ($aArray as $key => $value) {
            if ("" != $updates) { // for second and subsequent fields, we need comma separators
                $updates .= ",";
            }

            $updates .= $key; //  no checks against field names, but we have to be more careful with value fields
            $updates .= '=';

            switch (gettype($value)) {
                case "boolean":
                    $updates .= $value ? '1' : '0';
                    break;
                case "integer":
                    $updates .= strval($value);
                    break;
                case "double":
                    $updates .= strval($value);
                    break;
                case "string":
                    $updates .= dbconnect::quote_string($value); // never put a raw string in a query...
                    break;
                case "array":
                    break;
                case "object":
                    break;
                case "resource":
                    break;
                case "NULL":
                    $updates .= ''; // treat NuLL as an empty string
                    break;
            }
        }

        $updateString = "Update $tableName set $updates where uniq = '$uniq'";
        // printNice($updateString, 'update string');
        dbconnect::statement($updateString);
    }


    static function quote_string($dangerous)
    { // clean up, prevent injection
        // $safe = "'" .dbconnect::mysql_escape_mimic($dangerous) . "'";
        $safe = "'" . dbconnect::mysql_escape_mimic($dangerous) . "'";
        // printNice($safe.' safe' ,$dangerous.' dangerous');
        return ($safe);
    }

    static function mysql_escape_mimic($inp)
    {
        assertTrue(is_string($inp), "expected string, got " . serialize($inp));

        $inp = strval($inp); // force to string
        if (!empty($inp)) {
            // sqlite  replace single quote with two quotes
            $bkslash = chr(92);
            $ret = str_replace(array($bkslash, '\\\\', "\0", "\n", "\r", "'", '"', "\x1a"), array('\\', '\\\\', '\\0', '\\n', '\\r', "''", '"', '\\Z'), $inp);
        } else {
            $ret = "";
        }

        // printNice("$inp into  $ret ",'mysql_escape_mimic');

        return $ret;
    }

    static function count()
    {
        $ret = dbconnect::query("select count(*) from {dbconnect::tableName};");
        return ($ret[0][0]);
    }

    static function show()
    {
        $HTML = '';
        if ($GLOBALS['debugMode']) {
            $HTML .= '<div>';
            $HTML .= "<h2 style='background-color:yellow;'>{dbconnect::tableName}</h2>";

            $ret = dbconnect::query("select * from {dbconnect::tableName}");
            // $HTML .= printNiceR($ret, '');
            $HTML .= '</div>';
        }
        return ($HTML);
    }

    static function exportCSV() //get records from database

    {
        $ret = dbconnect::query("SELECT * FROM {dbconnect::tableName} ORDER BY datecreate DESC");

        if (count($ret) > 0) {
            $delimiter = ",";
            $filename = "{dbconnect::tableName}_" . date('Y-m-d') . ".csv";

            //create a file pointer
            $f = fopen('php://memory', 'w');
            fputcsv($f, array(''), $delimiter);
            fputcsv($f, array(''), $delimiter);

            //set column headers, eg: //  $fields = array('ID', 'Name', 'Email', 'Phone', 'Created', 'Status');
            $firstRecord = $ret[0];
            $fields = [];
            foreach ($firstRecord as $key => $field) {
                if (!is_numeric($key)) {
                    array_push($fields, $key);
                }
            }

            fputcsv($f, $fields, $delimiter);

            //output each row of the data, format line as csv and write to file pointer
            foreach ($ret as $row) {
                $lineData = [];
                foreach ($fields as $field) { // otherwise we get both [3] and [email]
                    array_push($lineData, $row[$field]);
                }
                fputcsv($f, $lineData, $delimiter);
            }

            //move back to beginning of file
            fseek($f, 0);

            //set headers to download file rather than displayed
            header('Content-Type: text/csv');
            header('Content-Disposition: attachment; filename="' . $filename . '";');

            //output all remaining data on a file pointer
            fpassthru($f);
            exit;
        }
    }


    // this doesn't do any select, it just formats up a $ret into HTML
    static function quickTable($ret, $fields)
    {

        // printNice('quicktable', $_SESSION['currentOpenTextbook']);
        // printNice($ret);
        // printNice($fields, count($ret));

        $HTML = "<table class='table table-striped'><thead><tr>";
        foreach ($fields as $t) {
            $HTML .= "<th>$t</th>";
        }
        $HTML .= "</tr></thead><tbody>";



        foreach ($ret as $r) {
            $aR = (array)$r;
            $HTML .= "<tr>";
            foreach ($fields as $t) {

                switch ($t) {

                    // special cases here
                    case 'uniq':
                        $request = $_SERVER['REQUEST_URI'];
                        $request = substr($request, 0, strpos($request, basename($request)));  // strip 'stats.php' from $request

                        $url = (isset($_SERVER['HTTPS']) ? 'https://' : 'http://') . $_SERVER['SERVER_NAME'] . $request . "?script={$aR[$t]}";

                        $HTML .= "<td><a href='$url' target='_blank'>" . $aR[$t] . '</a></td>';
                        break;

                    case 'datecreate':
                        $HTML .= '<td><nobr>' . date('Y-m-d', $aR[$t]) . '</nobr></td>';
                        break;

                    case 'code':
                        $HTML .= '<td style="color:blue;">' . substr(base64_decode($aR[$t]), 0, 1000) . '</td>';
                        break;

                    case 'hiddencode':
                    case 'hiddendecl':
                        $HTML .= '<td>' . substr(base64_decode($aR[$t]), 0, 40) . '</td>';
                        break;

                    default:
                        $HTML .= '<td>';
                        if (!empty($aR[$t] ?? '')) {
                            $HTML .= $aR[$t];
                        }
                        $HTML .= '</td>';
                }
            }
            $HTML .= "</tr>";
        }

        $HTML .= "</tbody></table>";
        return ($HTML);
    }
}


