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

    public function allActivities($where='')  // eg: "topicuniq = 123"
    { // for a specic topic, provide a  topicuniq
        assertTrue(is_string($where));

        $qWhere = ($where=='') ?"where activities.team={$_SESSION['team']}" : "where $where and activities.team={$_SESSION['team']}";

        $query = "select activities.*, topics.courseuniq, topics.topicname, courses.uniq,courses.coursename from activities left join topics on topics.uniq = activities.topicuniq  left join courses on topics.courseuniq = courses.uniq $qWhere order by courses.coursesequence,topics.topicsequence, activities.act_seq";
        $ret = $this->query($query);
        return($ret);
    
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

        $rand =  mt_rand();
        $aArray['team'] = $rand;
        $_SESSION['team'] = $rand;      // set it right away

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

// class MonarisPurchase
// {

//     public function purchase()
//     {
//         ##
//         ## Example php -q TestPurchase.php store1
//         ##

//         require "monaris/mpgClasses.php";

// /**************************** Request Variables *******************************/

//         $store_id = 'store5';
//         $api_token = 'yesguy';

// /************************* Transactional Variables ****************************/

//         $type = 'purchase';
//         $cust_id = 'cust id';
//         $order_id = 'ord-' . date("dmy-G:i:s");
//         $amount = '1.00';
//         $pan = '4242424242424242';
//         $expiry_date = '2011';
//         $crypt = '7';
//         $dynamic_descriptor = '123';
//         $status_check = 'false';

// /*********************** Transactional Associative Array **********************/

//         $txnArray = array('type' => $type,
//             'order_id' => $order_id,
//             'cust_id' => $cust_id,
//             'amount' => $amount,
//             'pan' => $pan,
//             'expdate' => $expiry_date,
//             'crypt_type' => $crypt,
//             'dynamic_descriptor' => $dynamic_descriptor,
//             //,'wallet_indicator' => '' //Refer to documentation for details
//             //,'cm_id' => '8nAK8712sGaAkls56' //set only for usage with Offlinx - Unique max 50 alphanumeric characters transaction id generated by merchant
//         );

// /**************************** Transaction Object *****************************/

//         $mpgTxn = new mpgTransaction($txnArray);

// /******************* Credential on File **********************************/

//         $cof = new CofInfo();
//         $cof->setPaymentIndicator("U");
//         $cof->setPaymentInformation("2");
//         $cof->setIssuerId("168451306048014");

//         $mpgTxn->setCofInfo($cof);

// /****************************** Request Object *******************************/

//         $mpgRequest = new mpgRequest($mpgTxn);
//         $mpgRequest->setProcCountryCode("CA"); //"US" for sending transaction to US environment
//         $mpgRequest->setTestMode(true); //false or comment out this line for production transactions

// /***************************** HTTPS Post Object *****************************/

// /* Status Check Example
// $mpgHttpPost  =new mpgHttpsPostStatus($store_id,$api_token,$status_check,$mpgRequest);
//  */

//         $mpgHttpPost = new mpgHttpsPost($store_id, $api_token, $mpgRequest);

// /******************************* Response ************************************/

//         $mpgResponse = $mpgHttpPost->getMpgResponse();

//         return($mpgResponse)
//     }

//     /** Monaris print (debug) */
//     function print($mpgResponse) {

//         print("\nCardType = " . $mpgResponse->getCardType());
//         print("\nTransAmount = " . $mpgResponse->getTransAmount());
//         print("\nTxnNumber = " . $mpgResponse->getTxnNumber());
//         print("\nReceiptId = " . $mpgResponse->getReceiptId());
//         print("\nTransType = " . $mpgResponse->getTransType());
//         print("\nReferenceNum = " . $mpgResponse->getReferenceNum());
//         print("\nResponseCode = " . $mpgResponse->getResponseCode());
//         print("\nISO = " . $mpgResponse->getISO());
//         print("\nMessage = " . $mpgResponse->getMessage());
//         print("\nIsVisaDebit = " . $mpgResponse->getIsVisaDebit());
//         print("\nAuthCode = " . $mpgResponse->getAuthCode());
//         print("\nComplete = " . $mpgResponse->getComplete());
//         print("\nTransDate = " . $mpgResponse->getTransDate());
//         print("\nTransTime = " . $mpgResponse->getTransTime());
//         print("\nTicket = " . $mpgResponse->getTicket());
//         print("\nTimedOut = " . $mpgResponse->getTimedOut());
//         print("\nStatusCode = " . $mpgResponse->getStatusCode());
//         print("\nStatusMessage = " . $mpgResponse->getStatusMessage());
//         print("\nHostId = " . $mpgResponse->getHostId());
//         print("\nIssuerId = " . $mpgResponse->getIssuerId());

//     }
// }

function tbTableArray($eventUniq)
{

    $events = new events();
    $event = $events->getLesson($eventUniq);

    // printNice($event);
    $groupTables = explode(',', $event['grouptables']);

    $tb = [
        // '14' => [locn-x, locn-y, width, length, seats, booked]        "1"=>[5, 180, 40, 50, 4,0], // 1
        "01" => [5, 180, 40, 50, 4, 0], // 1
        "02" => [5, 125, 40, 50, 4, 0], // 2
        "03" => [5, 70, 40, 50, 4, 0], // 3
        "04" => [5, 15, 40, 50, 4, 0], // 4

        "05" => [65, 10, 50, 70, 10, 0], // 5
        "06" => [65, 90, 50, 70, 8, 0], // 6
        "07" => [65, 170, 50, 70, 8, 0], // 7

        "08" => [140, 170, 50, 70, 8, 0], // 8
        "09" => [140, 90, 50, 70, 8, 0], // 9
        "10" => [140, 10, 50, 70, 10, 0], // 10

        "11" => [215, 15, 40, 50, 4, 0], // 11
        "12" => [215, 70, 40, 50, 4, 0], // 12
        "13" => [215, 125, 40, 50, 4, 0], // 13
        "14" => [215, 180, 40, 50, 4, 0], // 14

        "15" => [295, 90, 40, 50, 4, 0], // 15
        "16" => [295, 150, 40, 50, 4, 0], // 16
        "17" => [295, 210, 40, 50, 4, 0], // 17
        "18" => [310, 270, 25, 50, 2, 0], // 18
        "19" => [295, 330, 40, 50, 4, 0], // 19
        "20" => [295, 390, 40, 50, 4, 0], // 20
        "21" => [295, 450, 40, 50, 4, 0], // 21

        "22" => [215, 320, 40, 50, 4, 0], // 22
        "23" => [215, 380, 40, 50, 4, 0], // 23
        "24" => [215, 440, 40, 50, 4, 0], // 24
        "25" => [215, 500, 40, 50, 4, 0], // 25

        "26" => [120, 420, 50, 70, 8, 0], // 26
        "27" => [120, 320, 50, 70, 8, 0], // 27

        "28" => [15, 320, 40, 50, 4, 0], // 28
        "29" => [15, 380, 40, 50, 4, 0], // 29
        "30" => [15, 440, 40, 50, 4, 0], // 30
        "31" => [15, 500, 40, 35, 2, 0], // 31

        "32" => [65, 525, 50, 70, 10, 0], // 32
        "33" => [140, 525, 50, 70, 10, 0], // 33
    ];

    $tb = [
        // '14' => [locn-x, locn-y, width, length, seats, booked]        "1"=>[5, 180, 40, 50, 4,0], // 1
        "01" => [5, 180, 40, 50, 2, 0], // 1                  // reduced seating
        "02" => [5, 125, 40, 50, 0, 0], // 2                  // reduced seating
        "03" => [5, 70, 40, 50, 0, 0], // 3                  // reduced seating
        "04" => [5, 15, 40, 50, 2, 0], // 4                  // reduced seating
        // reduced seating
        "05" => [65, 10, 50, 70, 4, 0], // 5                  // reduced seating
        "06" => [65, 90, 50, 70, 4, 0], // 6                  // reduced seating
        "07" => [65, 170, 50, 70, 2, 0], // 7                  // reduced seating
        // reduced seating
        "08" => [140, 170, 50, 70, 2, 0], // 8                  // reduced seating
        "09" => [140, 90, 50, 70, 2, 0], // 9                  // reduced seating
        "10" => [140, 10, 50, 70, 2, 0], // 10                  // reduced seating
        // reduced seating
        "11" => [215, 15, 40, 50, 2, 0], // 11                  // reduced seating
        "12" => [215, 70, 40, 50, 0, 0], // 12                  // reduced seating
        "13" => [215, 125, 40, 50, 0, 0], // 13                  // reduced seating
        "14" => [215, 180, 40, 50, 2, 0], // 14                  // reduced seating
        // reduced seating
        "15" => [295, 90, 40, 50, 2, 0], // 15                  // reduced seating
        "16" => [295, 150, 40, 50, 2, 0], // 16                  // reduced seating
        "17" => [295, 210, 40, 50, 2, 0], // 17                  // reduced seating
        "18" => [310, 270, 25, 50, 0, 0], // 18                  // reduced seating
        "19" => [295, 330, 40, 50, 2, 0], // 19                  // reduced seating
        "20" => [295, 390, 40, 50, 2, 0], // 20                  // reduced seating
        "21" => [295, 450, 40, 50, 2, 0], // 21                  // reduced seating
        // reduced seating
        "22" => [215, 320, 40, 50, 2, 0], // 22                  // reduced seating
        "23" => [215, 380, 40, 50, 0, 0], // 23                  // reduced seating
        "24" => [215, 440, 40, 50, 0, 0], // 24                  // reduced seating
        "25" => [215, 500, 40, 50, 2, 0], // 25                  // reduced seating
        // reduced seating
        "26" => [120, 420, 50, 70, 2, 0], // 26                  // reduced seating
        "27" => [120, 320, 50, 70, 2, 0], // 27                  // reduced seating
        // reduced seating
        "28" => [15, 320, 40, 50, 2, 0], // 28                  // reduced seating
        "29" => [15, 380, 40, 50, 0, 0], // 29                  // reduced seating
        "30" => [15, 440, 40, 50, 0, 0], // 30                  // reduced seating
        "31" => [15, 500, 40, 35, 2, 0], // 31                  // reduced seating
        // reduced seating
        "32" => [65, 525, 50, 70, 2, 0], // 32                  // reduced seating
        "33" => [140, 525, 50, 70, 2, 0], // 33                  // reduced seating
    ];

    // get the purchases for this event
    $p = new purchases();
    $pList = $p->getEventPurchases($eventUniq);

    foreach ($pList as $purchase) {
        // $tableStr = strval($purchase['clubtable']);
        if (intval($purchase['clubtable']) !== 0) {
            // printNice($purchase);
            $tableStr = $purchase['clubtable'];

            $tkts = $purchase['qty1'] + $purchase['qty2'] + $purchase['qty3'];
            if (isset($tb[$tableStr][5])) {
                $tb[$tableStr][5] += $tkts;
            }
        }
    }

    // make the grouptables unavailable
    // printNice($groupTables);
    foreach ($groupTables as $table) { // might be 4,5,8
        $tableStr = twoDigit($table);
        // set the 'booked'' value to the seats value

        if ($tableStr !== '00' and isset($tb[$tableStr])) {
            $tb[$tableStr][5] = $tb[$tableStr][4];
        }
    }

    return ($tb);

}

// want purchase stuff in the attendees file so they get emails
function addTicketsToAttendees($purchase)
{
    printNice('purchase record fed to attendees');
    printNice($purchase);

    // throw a record into 'attendees' so he gets an email reminder
    $attendee = new attendees();

    // // purchaser did not buy tickets for himself?
    // if (empty($_SESSION['tickets']['member1'])) { // member didn't buy member tickets
    //     $attendee->addAttendee($_SESSION['tickets']['event'], $_SESSION['user']);
    // }

    // pop any named members into the attendee list
    foreach (['member1', 'member2', 'member3', 'member4'] as $i) {
        if (!empty($_SESSION['tickets'][$i])) {
            $attendee->addAttendee($_SESSION['tickets']['event'], $_SESSION['tickets'][$i], $_SESSION['tickets']['clubtable']);
        }
    }
}

function addNonExclusiveEvent($lesson)
{
    // printNice($lesson);
    // printNice($_SESSION);

    // ///////////// ******** need to write out event
    $events = new events();

    $eventUniq = $events->addLesson($lesson); //_SESSION['lesson']);

    // use the attendees table for students, so they get confirm emails

    $attendees = new attendees();

    // teacher, and then any students identified
    $attendees->addAttendee($eventUniq, $_SESSION['lesson']['teacher']);

    if (isset($_SESSION['lesson']['student1']) and !empty($_SESSION['lesson']['student1'])) {
        $attendees->addAttendee($eventUniq, $_SESSION['lesson']['student1']);
    }
    if (isset($_SESSION['lesson']['student2']) and !empty($_SESSION['lesson']['student2'])) {
        $attendees->addAttendee($eventUniq, $_SESSION['lesson']['student2']);
    }

    return ($eventUniq);
}

function addExclusiveEvent($lesson)
{

    $events = new events();

    $eventUniq = $events->addLesson($_SESSION['lesson']);

    $attendees = new attendees(); // send notifications to teacher
    $attendees->addAttendee($eventUniq, $_SESSION['lesson']['teacher']);

    return ($eventUniq);
}

function dumpAll()
{
    $users = new users(); // need one object

    $ret = $users->query("select * from users");
    printNice($ret);

    $ret = $users->query("select * from events");
    printNice($ret);

    $ret = $users->query("select * from attendees");
    printNice($ret);

    $ret = $users->query("select * from purchases");
    printNice($ret);

    $ret = $users->query("select * from log");
    printNice($ret);

}
