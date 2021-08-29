<?php

defined('_KELLER') or die('cannot access models.php directly');

class activities extends dbconnect
{ // dbconnect extends UnitTestCase, so we can test this too

    public function __construct()
    {
        parent::__construct();
        $this->tableName = 'activities';

        if (!isset($_SESSION['dbActivities']) or $GLOBALS['debugMode']) {
            $_SESSION['dbActivities'] = true;

            // act_desc is a very specific expectation, with example.
            // act_prereq is 'n,n,n... where n is activity uniq
            $createString =
                "CREATE TABLE IF NOT EXISTS `{$this->tableName}` (
              `uniq`          integer PRIMARY KEY AUTOINCREMENT NOT NULL ON CONFLICT FAIL,
              `topicuniq`     integer default 0,
              `team`          integer default 0,
              `activityname`  text default '',
              `act_desc`      text default '',
              `act_seq`       text default '',
              `act_type`      integer default 0,

              `act_expect`    text default '',
              `act_prereq`    text default '',

              `competency1` text default '',
              `competency2` text default '',
              `content`       text,

              `datelastedit`    text
               );";

            $this->statement($createString);

            $indexString = "CREATE INDEX IF NOT EXISTS `idx1_{$this->tableName}` ON {$this->tableName} (topicuniq);";
            $this->statement($indexString);

        }
    }

    public function showActivity($q)
    {
        assertTrue(is_integer($q));

        $q = "select * from {$this->tableName} where uniq = $q ";
        $ret = $this->query($q);
        return ($ret);
    }

    public function allActivities($where = '') // eg: "topicuniq = 123"

    { // for a specic topic, provide a  topicuniq
        assertTrue(is_string($where));

        $qWhere = ($where == '') ? "where activities.team={$_SESSION['team']}" : "where $where and activities.team={$_SESSION['team']}";

        $query = "select activities.*, topics.courseuniq, topics.topicname, courses.uniq,courses.coursename from activities left join topics on topics.uniq = activities.topicuniq  left join courses on topics.courseuniq = courses.uniq $qWhere order by courses.coursesequence,topics.topicsequence, activities.act_seq";
        $ret = $this->query($query);
        return ($ret);

    }

    public function resequenceActivities($topicuniq)
    {
        $index = 10;
        $ret = $this->allActivities("topicuniq = $topicuniq");
        foreach ($ret as $r) {
            $q = "update {$this->tableName} set act_seq = $index where uniq = {$r['uniq']}";
            $this->statement($q);
            $index += 10;
        }
    }

}

class courses extends dbconnect
{
    public function __construct()
    {
        parent::__construct();
        $this->tableName = 'courses';

        if (!isset($_SESSION['dbCourses']) or $GLOBALS['debugMode']) {
            $_SESSION['dbCourses'] = true;

            $createString =
                "CREATE TABLE IF NOT EXISTS `{$this->tableName}` (
                  `uniq`          integer PRIMARY KEY AUTOINCREMENT NOT NULL ON CONFLICT FAIL,
                  `team`          integer default 0,
                  `coursename`     text default '',
                  `coursesummary`  text default '',
                  `coursesequence` integer
                   );";

            $this->statement($createString);

        }

    }

    public function showCourse($q)
    {
        assertTrue(is_integer($q));

        $q = "select * from {$this->tableName} where uniq = $q ";
        $ret = $this->query($q);
        return ($ret);
    }

    public function allCourses()
    {
        $q = "select * from {$this->tableName} where team = {$_SESSION['team']} order by coursesequence";
        $ret = $this->query($q);
        return ($ret);
    }

    public function resequenceCourses()
    {
        $index = 10;
        $ret = $this->allCourses();
        foreach ($ret as $r) {
            $q = "update {$this->tableName} set coursesequence = $index where uniq = {$r['uniq']}";
            $this->statement($q);
            $index += 10;
        }
    }
}

class topics extends dbconnect
{
    public function __construct()
    {
        parent::__construct();
        $this->tableName = 'topics';

        if (!isset($_SESSION['dbTopics']) or $GLOBALS['debugMode']) {
            $_SESSION['dbTopics'] = true;

            // topicexpectations is 'overall expectations' - typically a bullet point list
            $createString =
                "CREATE TABLE IF NOT EXISTS `{$this->tableName}` (
                  `uniq`          integer PRIMARY KEY AUTOINCREMENT NOT NULL ON CONFLICT FAIL,
                  `courseuniq`   integer,
                  `topicname`     text default '',
                  `topicsummary`  text default '',
                  `topicsequence` integer,
                  `topicexpectations` text default ''
                   );";

            $this->statement($createString);

        }

    }

    public function showTopic($topicuniq)
    {
        $q = "select topics.*, courses.uniq, courses.coursename, courses.coursesequence from {$this->tableName} left join  courses on topics.courseuniq = courses.uniq order by courses.coursesequence, topics.topicsequence";
        $ret = $this->query($q);
        return ($ret);
    }

    public function allTopics($courseuniq)
    {
        // $q = "select topics.*, courses.uniq, courses.coursename, courses.coursesequence from {$this->tableName} left join courses on topics.courseuniq = courses.uniq where topics.courseuniq = $courseuniq order by courses.coursesequence, topics.topicsequence";
        $q = "select * from {$this->tableName} where courseuniq = $courseuniq order by topicsequence";
        $ret = $this->query($q);
        return ($ret);
    }

    public function allTopicsInCourse($courseuniq)
    {
        $q = "select * from {$this->tableName} where courseuniq = $courseuniq order by topicsequence";
        $ret = $this->query($q);
        return ($ret);
    }

    public function resequenceTopics($courseuniq)
    { // may have hundreds, this is expensive
        $index = 10;
        $ret = $this->allTopics($courseuniq);
        foreach ($ret as $r) {
            $q = "update {$this->tableName} set topicsequence = $index where uniq = {$r['uniq']}";
            $this->statement($q);
            $index += 10;
        }
    }
}

class Steps extends dbconnect
{
    public function __construct()
    {
        parent::__construct();
        $this->tableName = 'steps';

        if (!isset($_SESSION['dbSteps']) or $GLOBALS['debugMode']) {
            $_SESSION['dbSteps'] = true;

            // content is already preprocessed into HTML, ready to run
            $createString =
                "CREATE TABLE IF NOT EXISTS `{$this->tableName}` (
                  `uniq`          integer PRIMARY KEY AUTOINCREMENT NOT NULL ON CONFLICT FAIL,
                  `activityuniq`   integer,
                  `steptype`       text default '',
                  `competency`     text default '',
                  `curriculum`     text default '',
                  `comments`       text default '',
                  `jsondata`       text default '',
                  `html`           text default '',
                  `stepsequence`   integer

                   );";

            $this->statement($createString);

            $indexString = "CREATE INDEX IF NOT EXISTS `idx1_{$this->tableName}` ON {$this->tableName} (activityuniq);";
            $this->statement($indexString);

        }

    }

    public function createStep($activityUniq, $stepType)
    {
        $a = [];
        $a['activityuniq'] = $activityUniq;
        $a['steptype'] = $stepType;

        $this->insertArray($a); // format it and write it out
        // get the autoincrement value of the event
        $lastIndex = $this->query('select last_insert_rowid()');
        $uniq = $lastIndex[0][0];
    }

    public function getStep($uniq)
    {
        $uniq = intval($uniq);  // ensure that it is an int

        $ret = $this->query("Select * from {$this->tableName} where uniq = $uniq");
        assertTrue(count($ret) == 1);

        return ($ret[0]); // we filter off the record #
    }

    public function getAllSteps($activityUniq) 
    {
        $activityUniq = intval($activityUniq);  // force to integer

        $query = "select * from steps where activityuniq = $activityUniq order by stepsequence";
        $ret = $this->query($query);
        return ($ret);
    }

    public function resequence($activityUniq)
    {
        $activityUniq = intval($activityUniq);  // force to integer

        $index = 10;
        $ret = $this->getAllSteps($activityUniq);
        foreach ($ret as $r) {
            $q = "update {$this->tableName} set stepsequence = $index where uniq = {$r['uniq']}";
            $this->statement($q);
            $index += 10;
        }
    }

}

class users extends dbconnect
{ // many extra fields, in case we do something bigger one day

    public function __construct()
    { // role is 'admin', 'teacher', 'user'
        parent::__construct();
        $this->tableName = 'users';

        if (!isset($_SESSION['dbusers']) or $GLOBALS['debugMode']) {

            // we put a random string into `team` when you register
            // a teammate has to INVITE you to join, knowing your email
            // they set your random string to be the same as theirs
            //
            // 'role' isn't used yet.  when it does get used, use binaries
            //  eg: admin = 1 teacher = 2, author = 4 so can create ACL()

            $createString =
                "CREATE TABLE IF NOT EXISTS `{$this->tableName}` (
              `email`        text PRIMARY KEY NOT NULL ON CONFLICT FAIL,
              `team`         integer,
              `password`     text,
              `role`         integer default 0,
              `firstname`    text,
              `lastname`     text,
              `phone`        text,
              `confirmkey`   text,
              `msgtouser`  text,
              `signeddate`  text,
              `resetpassword` integer default 0,
              `datecreate`   integer );";

            $this->statement($createString);

            // $indexString =  "CREATE INDEX IF NOT EXISTS `idx2_{$this->tableName}` ON {$this->tableName} (confirmkey);";
            // $this->statement($indexString);

            $_SESSION['dbusers'] = true;

        }
    }

    public function register($form)
    { // 0-success, 1-already, 2-other
        // printNice('in register');
        $form['email'] = strtolower($form['email']); // put username into lowercase right away

        $stmt = "SELECT * FROM {$this->tableName} where email = " . $this->quote_string($form['email']);
        $ret = $this->query($stmt);
        // printNice($ret);
        if (count($ret) > 0) {
            return (1); // already there
        }

        $aArray = array();
        $aArray['email'] = strtolower($form['email']); // always lowercase

        $aArray['role'] = in_array(strtolower($form['email']), $GLOBALS['adminEmail'], true) ? 1 : 0;
        $aArray['firstname'] = $form['firstname'];
        $aArray['lastname'] = $form['lastname'];

        $rand = mt_rand();
        $aArray['team'] = $rand;
        $_SESSION['team'] = $rand; // set it right away

        $aArray['phone'] = $form['phone'];
        $aArray['signeddate'] = date($GLOBALS['dateformat'], time());
        $aArray['password'] = crypt($form['password'], $this->salt);
        $aArray['datecreate'] = time();

        // printNice($aArray);
        $this->insertArray($aArray); // format it and write it out

        // printNice("'verifying that we were able to add dancer");
        $stmt = "SELECT * FROM {$this->tableName} where lower(email) = " . $this->quote_string($form['email']);
        $ret = $this->query($stmt);

        if (count($ret) == 0) {
            return (2); // other error
        }

        // printNice($ret);
        return (0);
    }

    // if RESETPASSWORD is set to 1, then ANY password is acceptable and becomes the new password
    // big security hole, but we are a small club and no valuable data on this site

    public function validateLogin($form)
    {
        $email = strtolower($form['email']); // put username into lowercase right away

        $stmt = "SELECT * FROM {$this->tableName} where lower(email)= " . $this->quote_string($email);
        $ret = $this->query($stmt);

        if (count($ret) != 1) { // basic hygiene
            $ret = [];
            return ($ret);
        }

        // allow exception if resetpassword is true
        if ($ret[0]['resetpassword'] == 1) {
            $newPswd = crypt($form['password'], $this->salt);
            $this->query("update {$this->tableName} set password = '{$newPswd}', resetpassword=0 where lower(email)= " . $this->quote_string($email));
            return ($ret); // accepted
        }

        // if the password doesn't match, then sent back an empty array
        if ((crypt($form['password'], $this->salt) != $ret[0]['password'])) {
            $ret = [];
        }

        // accepted
        return ($ret);
    }

    public function userRecord($email)
    {
        assertTrue(!empty($email), "asked for a user record without an email address: '$email'");

        // printNice($email);
        $stmt = "SELECT * FROM {$this->tableName} where email= " . $this->quote_string($email);
        $ret = $this->query($stmt);
        if (empty($ret)) {
            // assertTrue(false, "could not find email '$email'");
            return ([]);
        }

        return ($ret[0]);
    }
}

///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////

class dbconnect extends UnitTestCase
{

    public $db;
    public $salt;

    public function __construct()
    {

        //assertTrue(!empty(SQLite3::version()),'Expected a SQLLite Version');

        if ($GLOBALS['debugMode']) {
            $file = "{$GLOBALS['datapath']}MOODLEEDIT-TEST.SQLite3";
        } else {
            $file = "{$GLOBALS['datapath']}MOODLEEDIT.SQLite3";
        }
        // Create (connect to) SQLite database in file
        // printNice('creating database file: '.$file);
        $this->db = new SQLite3($file);
        assertTrue(file_exists($file));

        $this->salt = 'FatBa5tard'; // for password crypt
    }

    public function testbasics()
    {

        $this->statement("DROP TABLE IF EXISTS `crudtable`;");
        assertTrue(!$this->tableExists('crudtable'), "Don't expect crudtable to exist");

        $this->statement("CREATE TABLE IF NOT EXISTS `crudtable` (
            `column_1` INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL ON CONFLICT REPLACE,
            `column_2` INTEGER,
            `column_3` text,
            `column_4` DATETIME default 0
        )");

        assertTrue($this->tableExists('crudtable'), "Expect this table");

        $this->statement("INSERT INTO crudtable (column_1, column_2, column_3)
                      VALUES (7, 5, 'Hello World');");

        $result = $this->query("SELECT * FROM crudTable;");
        // printNice($result);

        assertTrue(count($result) == 1); // should be one record
        assertTrue(count($result[0]) == 8); // with four fields (each two ways)
        assertTrue(5 == $result[0]['column_2']); // column_1 is the autoincrement
    }

    public function open($filename)
    {
        //$this->db = new SQLite3($filename);
        $SQLite3->open($filename);
        assertTrue($this->db->lastErrorCode() == 0, $this->db->lastErrorMsg());
    }

    public function tableExists($name)
    {
        $result = $this->query("SELECT name FROM sqlite_master WHERE type='table' AND name='$name'");
        return (count($result) > 0);
    }

    public function statement($query)
    {
        // printNice($query);
        $results = $this->db->query($query);
    }

    public function query($query)
    {
        // printNice('query :' . $query);
        // $_SESSION['queries'][] = $query; // save a copy

        $return = array();
        $results = $this->db->query($query);

        if (false == $results) {
            assertTrue(false, "Error in query" . $this->db->lastErrorMsg() . "  " . $query);
        } else {

            while ($row = $results->fetchArray()) {
                $return[] = $row;
                // printNice($row);
            }
        }
        //assertTrue($this->db->lastErrorCode()==0, $this->db->lastErrorMsg());
        return ($return);
    }

    public function insertArray($aArray)
    { // $aArray is a set of field-value pairs

        $cFields = "";
        $cValues = "";

        foreach ($aArray as $key => $value) {
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
                    $cValues .= $this->quote_string($value); // clean up, prevent injection
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
                    $cValues .= $this->quote_string('');
                    break;
                default:
                    assertTRUE(false, "Did not expect a type " . gettype($value) . " in INSERT() on field $key " . serialize($aArray));
            }
        }
        $insertString = "INSERT INTO " . $this->tableName . " (" . $cFields . ") VALUES (" . $cValues . ")";
        printNice($insertString);
        return ($this->statement($insertString));
    }

    public function updateArray($aArray, $where)
    {
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
                    $updates .= $this->quote_string($value); // never put a raw string in a query...
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

        $UpdateString = "Update $this->tableName set $updates where $where";
        $this->statement($UpdateString);

        printNice($UpdateString);
    }

    public function quote_string($dangerous)
    { // clean up, prevent injection
        $safe = $this->mysql_escape_mimic($dangerous);
        return ("'" . $safe . "'");
    }

    public function mysql_escape_mimic($inp)
    {
        assertTrue(is_string($inp), "expected string, got " . serialize($inp));

        $inp = strval($inp); // force to string
        if (!empty($inp)) {
            // sqlite  replace single quote with 2x
            $bkslash = chr(92);
            $ret = str_replace(array($bkslash, '\\\\', "\0", "\n", "\r", "'", '"', "\x1a"), array('\\', '\\\\', '\\0', '\\n', '\\r', "''", '"', '\\Z'), $inp);
        } else {
            $ret = "''";
        }

        // printNice("$inp  ==>>  $ret <br>");
        return $ret;
    }

    public function count()
    {
        $ret = $this->query("select count(*) from {$this->tableName};");
        return ($ret[0][0]);
    }

    public function show()
    {
        $HTML = '';
        if ($GLOBALS['debugMode']) {
            $HTML .= '<div>';
            $HTML .= "<h2 style='background-color:yellow;'>{$this->tableName}</h2>";

            $ret = $this->query("select * from {$this->tableName}");
            $HTML .= printNiceR($ret);
            $HTML .= '</div>';
        }
        return ($HTML);
    }

    public function exportCSV()
    {
//get records from database
        $ret = $this->query("SELECT * FROM {$this->tableName} ORDER BY datecreate DESC");

        if (count($ret) > 0) {
            $delimiter = ",";
            $filename = "{$this->tableName}_" . date('Y-m-d') . ".csv";

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

}
