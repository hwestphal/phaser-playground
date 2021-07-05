<?php

defined('_KELLER') or die;






 // Interface that all _Table classes must support

interface BasicTableFunctions
{
    public function getListOfTables();
    public function create($createString);
    public function drop();
    public function truncate();
    public function insert($cargo, $key);
    public function getbyKey($key);
    public function deleteByKey($key);
    public function updateByKey($key, $cargo);
    public function getAllByWhere($where, $order);
}







class FactoryData extends UnitTestCase
{    // all data tables inherit from this class
    public $tableName;
    public $primaryKey;
    public $uuidPrefix;
    public $createString;

    public $dbo;

    public function __construct()
    {
        $this->dbo = new dbconnect();
    }


    public function testTablesExist()
    {
        $testTable = current($GLOBALS['TableList']);
        $allTables = $testTable->getListOfTables();     // can use any object, they all return the same list
        //echo serialize($allTables);

        assertTrue(true, "testing assertions");
        assertTrue(is_array($allTables), "Couldn't get list of mySQL tables");


        // there's a conflict between LINUX and WINDOWS between case.  The
        // list of tables will be lowercase in WINDOWS and match the actual
        // case in LINUX.  so we convert everything to lowercase.

        foreach ($allTables as &$value) {		// convert the list of tables to lower
            $value = strtolower($value);
        }

        foreach ($GLOBALS['TableList'] as $thisTable) {
            if (!in_array(strtolower($thisTable->tableName), $allTables)) {
                assertTrue(false, "$thisTable->tableName doesn't exist, trying to create...");
                assertTrue(empty($thisTable->create($thisTable->createString)), "creating table {$thisTable->tableName}");
            }
        }
    }

    public function testQuery()
    {     // query does most of the hard work

        // clear the test records
        $session = TestTable::singleton();   // we'll use this for testing, looks like a Session table`

        $stmt = "Delete from  {$session->tableName} where SessionID like 'dummySession%'";
        $ret = $session->query($stmt);
        //echo serialize($ret),'<br>';
        assertTrue(is_array($ret), "Error running mySQL statement, check error logs");

        $stmt = "INSERT INTO {$session->tableName} (SessionID, UserID) VALUES ('dummySession1', 'dummyUser1')";
        $ret = $session->query($stmt);
        //echo serialize($ret),'<br>';
        assertTrue(is_array($ret), "Error running mySQL statement, check error logs");

        $stmt = "SELECT SessionID,UserID from  {$session->tableName} where SessionID like 'dummySession%'";
        $ret = $session->query($stmt);
        //echo serialize($ret),'<br>';
        assertTrue(is_array($ret), "Error running mySQL statement, check error logs");
        assertTrue(count($ret)==1, "Should only get one record.");
        assertTrue($ret[0]['UserID']=='dummyUser1', "Strange, didn't get the right user");

        $stmt = "INSERT INTO {$session->tableName} (SessionID, UserID) VALUES ('dummySession2', 'dummyUser2')";
        $ret = $session->query($stmt);
        //echo serialize($ret),'<br>';
        assertTrue(is_array($ret), "Error running mySQL statement, check error logs");

        $stmt = "SELECT SessionID,UserID from  {$session->tableName} where SessionID like 'dummySession%' order by UserID";
        $ret = $session->query($stmt);
        //echo serialize($ret),'<br>';
        assertTrue(count($ret)==2, "Should get two records.");
        assertTrue($ret[0]['UserID']=='dummyUser1', "Strange, didn't get the right user");

        $stmt = "SELECT count(*) from  {$session->tableName} where SessionID like 'dummySession%'";
        $ret = $session->query($stmt);
        //echo serialize($ret),'<br>';
        assertTrue(count($ret)==1, "Should get one record containing a string '2'.");
        assertTrue($ret[0]['count(*)']=='2', "Strange, didn't get the right count");

        // clear the test records
        $stmt = "Delete from  {$session->tableName} where SessionID = 'dummySession'";
        $ret = $session->query($stmt);
        //echo serialize($ret),'<br>';
        assertTrue(is_array($ret), "Error running mySQL statement, check error logs");
    }


    public function testOtherFUnctions()
    {    // also good examples of how to use them
        $test = TestTable::singleton();   // we'll use this for testing`

        $test->dropTable();              // don't care whether it exists yet or not, we'll retest again

        $list = $this->getListOfTables();   //  echo serialize($list);
        assertTrue(!(in_array($test->tableName, $list)), 'We dropped table, but it is still there.');

        $test->createTable();              // let's see if we can create it

        $list = $this->getListOfTables();    // echo $test->tableName,serialize($list);
        assertTrue(in_array($test->tableName, $list), 'We created table, but we do not see it.');

        assertTrue($test->countRecords() == 0, 'count of empty database');

        $aArray = array("SessionID"=>"dummyID1", "UserID"=>"userID1");
        $test->insertArray($aArray);  // $aArray is a set of field-value pairs

        assertTrue($test->countRecords() == 1, 'count after inserting one record');

        $aArray = array("UserID"=>"userID2");
        $where = "SessionID = 'dummyID1'";
        $test-> updateArray($aArray, $where);

        assertTrue($test->countRecords() == 1, 'count after updating one record');

        $stmt = "SELECT SessionID,UserID from  {$test->tableName} where SessionID like 'dummy%'";
        $ret = $test->query($stmt);    //   echo serialize($ret);

        $value = $this->getfield($ret[0], 'UserID');            // really just a 'safe' read from an array
        assertTrue($value == 'userID2', 'Update does not seem to have worked');

        $test->dropTable();              // now we test dropTable() properly

        $list = $this->getListOfTables();   //  echo serialize($list);
        assertTrue(!(in_array($test->tableName, $list)), 'We dropped table, but it is still there.');

        // finally, leave an empty table so we can check with PHPMyAdmin and run tests again
        assertTrue(empty($test->create($test->createString)), "creating table {$test->tableName}");

    }




    public function query($query)
    {             // also gets an answer back
        $result = $this->dbo->query($query);
        $error =  $this->dbo->error();

        if ($GLOBALS['logQueries']) {
            writeDBLog($query, $result);
        }

        if (!($error == '')) {  // queries should always return an array
            assertTrue(false,$error);
            writeErrorLog($query, $error);
            return(false);
        }

        return($result);
    }



    public function getListOfTables()
    {     // can use any object, they all return the same list
        $resultset = $this->query("show tables");
        $result = array();
        foreach ($resultset as $r) {    // resultSet is an array of arrays
            $result[] = current($r);  // we just want the table name
        }
        return($result);
    }


    public function dropTable()
    {
        trace(__METHOD__."()");
        $ret = $this->query("drop table {$this->tableName}");
        return (assertTrue(empty($ret), "Trying to drop table {$this->tableName}: "));  // returns empty array
    }

    public function truncateTable()
    {
        trace(__METHOD__."()");
        $ret = $this->query("truncate table {$this->tableName}");
        return (assertTrue(empty($ret), "Trying to truncate table {$this->tableName}: "));  // returns empty array
    }


    public function createTable()
    {
        $ret = $this->query($this->createString);
        return($ret);
    }


    public function countRecords()
    {
        $resultSet = $this->query("select count(*) as count from {$this->tableName}");
        if (empty($resultSet)) {
            $count = 0;
        } else {
            $record = reset($resultSet);  //a:1:{i:0;a:1:{i:0;s:1:"0";}}
            $count  = $record['count'];
        }
        trace(__METHOD__."() returns $count");
        return($count);
    }

    public function uuid()
    {
        assertTrue(!empty($this->uuidPrefix), "Checking for non-empty UUID prefix");
        return(uniqid($this->uuidPrefix));
    }

    public function getfield($array, $field)
    {            // really just a 'safe' read from an array

        if (is_array($array) and isset($array[$field])) {
            return($array[$field]);
        } else {
            trigger_error("Could not find field '$field' in array ".serialize($array));
            return(false);
        }
    }

    public function insertArray($aArray)
    {    // $aArray is a set of field-value pairs

        $cFields = "" ;
        $cValues = "" ;

        foreach ($aArray as $key => $value) {
            if ($cFields != "") {                 // for second and subsequent fields, we need comma separators
                $cFields .= ", " ;
                $cValues .= ", " ;
            }

            $cFields .= $key;                     //  no checks against field names, but we have to be more careful with value fields

            switch (gettype($value)) {
            case   "boolean":
               $cValues .= $value?'1':'0';
               break;
            case   "integer":
               $cValues .=  strval($value);
               break;
            case   "double":
               assertTrue(false, "don't have a DOUBLE handler for insert ".serialize($aArray));
               break;
            case   "string":
               $cValues .= $this->quote_string($value);                 // clean up, prevent injection
               break;
            case   "array":
               assertTrue(false, "don't have an ARRAY handler for inserts of $key ".serialize($aArray));
               break;
            case   "object":
               assertTrue(false, "don't have an OBJECT handler for inserts of $key ".serialize($aArray));
               break;
            case   "resource":
               assertTrue(false, "don't have a RESOURCE handler for inserts of $key ".serialize($aArray));
               break;
            case   "NULL":
               // we decided to try to convert to empty string, because we don't have a schema
               $cValues .= $this->quote_string('');
               break;
            default:
               assertTrue(false, "Did not expect a type ".gettype($value)." in INSERT() on field $key ".serialize($aArray));
         }
        }
        $insertString =  "INSERT INTO " . $this->tableName . " (" . $cFields . ") VALUES (" . $cValues . ")";

        $ret = $this->query($insertString);
        assertTrue(is_array($ret),$insertString." returns ".serialize($ret));
        return($ret);
    }


    public function updateArray($aArray, $where)
    {
        $updates = '';

//      // if we don't have LastUpdated in our list (won't unless we are copying), then update it.
//      //    ie: a copy operation retains the old update time
//      if (!array_key_exists('LastUpdate',$aArray))
//            $aArray['LastUpdate'] = time();        // seconds are good enough

        foreach ($aArray as $key => $value) {
            if ($updates != "") {                 // for second and subsequent fields, we need comma separators
                $updates .= "," ;
            }

            $updates .= $key;              //  no checks against field names, but we have to be more careful with value fields
            $updates .= '=';

            switch (gettype($value)) {
                case   "boolean":
                    $updates .= $value?'1':'0';
                    break;
                case   "integer":
                    $updates .=  strval($value);
                    break;
                case   "double":
                    break;
                case   "string":
                    $updates .= $this->quote_string($value);             // never put a raw string in a query...
                    break;
                case   "array":
                    break;
                case   "object":
                    break;
                case   "resource":
                    break;
                case   "NULL":
                    $updates .= '';                                                           // treat NuLL as an empty string
                    break;
            }
        }

        // everyone gets the 'lastupdate' so that we can replicate one day
        $updates .= ", lastupdate=".time();    // it's a number, doesn't need quotes


        $UpdateString =  "Update $this->tableName set $updates where $where";
        $this->query($UpdateString);

        printNice('Database', $UpdateString);
    }

    public function quote_string($dangerous)
    {                                 // clean up, prevent injection
        $safe = addslashes($dangerous);
        return("'".$safe."'");
    }

    public function quote_smart($value)
    {
        // Stripslashes

        if (get_magic_quotes_gpc()) {
            $value = stripslashes($value);
        }

        // Quote if not integer or starts with a leading zero ie zip code
        if (!is_numeric($value) || $value[0] == '0') {
            $value = "'".addslashes($value)."'";
        }        // backslash all existing quotes and add new ones

        //Convert HTML
        $value = htmlspecialchars($value);          //escape % and _ (Dangerous to SQL Like)
        return $value;
    }

    public function formatResultSet($result, $title, $columns=array())
    {

        // typical usage
        //   $table = singleton('identityTBL');
        //   $query = "SELECT * FROM " . $table->TableName . " ORDER BY LastUpdate DESC";        // query can join other tables too
        //   $result = $table->query($query);
        //
        //   echo $table->FormatResultSet($result, 'Contents of Identity Table');

        $HTMLresult = '';

        $HTMLresult .= "<br /><strong>$title</strong>";

        if (empty($result)) {
            $HTMLresult .= "<br />empty resultset";
        } else {
            $HTMLresult .=  "<span style=\"font-size:9px;\"><table class=\"gridtable\">";

            $firsttime = true;
            foreach ($result as $row) {                         // we already have the first row, so do the fetchs at the end
                if ($firsttime) {
                    $HTMLresult .=  "<tr>";

                    if (empty($columns)) {                       // if not specified, then all columns
                        $columns = array_keys($row);
                    }

                    // print the table header
                    foreach ($columns as $col) {
                        if (is_string($col)) {   // filter out the numeric indexes - they are duplicates
                            $HTMLresult .=  "<td><strong>&nbsp; $col &nbsp;</strong></td>";
                        }
                    }
                    $HTMLresult .=  "</tr>\n";
                    $firsttime = false;
                }

                $HTMLresult .=  "<tr>";
                foreach ($columns as $col) {
                    $HTMLresult .=  "<td nowrap>&nbsp; $row[$col] &nbsp;</td>";          // not a special name, so just display it
                }
                $HTMLresult .=  "</tr>\n";
            }
            reset($result);                        // point back to the top of the array

            $HTMLresult .=  "</table></span>";
            //echo mysql_real_escape_string($HTMLresult);
        }
        return($HTMLresult);
    }
}




class AbstractData extends FactoryData
{
    public function __construct()
    {   // constructor
        parent::__construct();
    }

    public function create($createString)
    {
        $ret = $this->createTable($this->createString);
        if(!is_array($ret)){
          assertTrue(false, $this->tableName." table is being created, returns ".serialize($ret));
          assertTrue(false, $createString);
        }
    }

    public function drop()
    {
        return(assertTrue($this->dropTable(), '{$this->tableName} is being dropped'));
    }

    public function truncate()
    {
        return(assertTrue($this->truncateTable(), '{$this->tableName} is being truncated'));
    }


    public function deleteByKey($key)
    {
        assertTrue(is_string($key), "Should be a string: ".serialize($key));
        $ret = $this->query("delete from {$this->tableName} where {$this->primaryKey} = '$key'");
    }


    public function getByKey($key)
    {
        trace(__METHOD__." attempting {$this->tableName} for key $key");

        assertTrue(!empty($key), "Need a key for getByKey");
        $resultSet = $this->query("select * from `{$this->tableName}` where {$this->primaryKey} = '{$key}';");
        //echo "<br>select cargo from `{$this->tableName}` where {$this->primaryKey} = '{$key}',<br>";
        //echo serialize($resultSet);

        if (count($resultSet)==0) {
            return false;
        }           // didn't find the key

        return($resultSet);
    }

    // check for special updates in each class, this is just a basic update
    public function updateByKey($key, $cargo)
    {
        assertTrue(!empty($key), "Need a key for updateByKey");

        $aArray = array();
        $cargo['lastupdate'] = date($GLOBALS['dateFormat']);
        $aArray['cargo']= serialize($cargo);

        // add or update the secondary keys
        foreach ($this->secondaryKeys as $sKey) {
            if (!isset($cargo[$sKey])) {
                assertTrue(false, "Required secondary key '$sKey' is not set in cargo");
                $cargo[$sKey] = $this->uuid();  // jam in something unique
            }
            $aArray[$sKey] = strval($cargo[$sKey]);
        }

        $this->updateArray($aArray, "$this->primaryKey = '$key'");
    }

    // the key is optional, if missing we generate a UUID
    public function insert($cargo, $key=false)
    {
        if (!$key) {
            $key = $this->uuid();
            $cargo[$this->primaryKey] = $key;       // make sure cargo knows about it...
        }

        $cargo['lastupdate'] = date("Y-m-d H:i:s");

        $aArray = array();
        $aArray[$this->primaryKey] = $key                     ;
        $aArray['cargo'          ] = serialize($cargo)        ;

        // add the secondary keys
        foreach ($this->secondaryKeys as $sKey) {
            assertTrue(isset($cargo[$sKey]), "insert() requires secondary key '$sKey' to be set in cargo");
            $aArray[$sKey] = $cargo[$sKey];
        }

        $this->insertArray($aArray);
        return($key);
    }

    public function getAllByWhere($where='', $order='')
    {
        $query = "select * from `{$this->tableName}`" . iif(empty($where), '', "where $where")
                                                      . iif(empty($order), '', " order by $order");

        $resultSet = $this->query($query);
        //echo "resultSet",serialize($resultSet),"<br><br>";
         if (!is_array($resultSet) /*or !isset($resultSet['cargo'])*/) {
             return (array());
         }       // special case of no results, we always return an array

        return($resultSet);
    }

}


//////////////////////////////////////////////////////////////////////////////////
////////////  now start indiviual database code       ///////////////////////////
//////////////////////////////////////////////////////////////////////////////////

class Fprojects extends AbstractData implements BasicTableFunctions
{
      public function __construct()

      // a 'document' represents a COMMITTED (ie: pristine) version
      //     look at 'fragments' to find the most up-to-date version

      // documentType is 'T'- HTML Template, 'J'- Javascript

      {
          parent::__construct();
          $this->tableName    = $GLOBALS['dbPrefix'].'_Fprojects';
          $this->uuidPrefix   = 'P';
          $this->primaryKey   = 'projectuuid';
          $this->secondaryKeys= array();

          // filesystem types are
          //    'text'     -- stupid, no fragments, no synchronization
          //    nothing else implemented yet

          $this->createString =
                  "CREATE TABLE IF NOT EXISTS `{$this->tableName}` (
                    `projectuuid`    	        varchar(16)  NOT NULL,
                    `projectname`             varchar(64)  NOT NULL,
                    `branch`                  varchar(64),
                    `filesystemtype`          varchar(10),
                    `created`                TIMESTAMP(3),
                    `lastupdate`              int(10) unsigned default 0,
                    `lastbackup`              int(10) unsigned default 0,
                    PRIMARY KEY  (`{$this->primaryKey}`)
                  ) DEFAULT CHARSET=utf8;";
      }


      function addNewProject($id,$projectname,$branch='',$FStype="text"){
        assertTrue(!empty($id));
        assertTrue(!empty($projectname));

        assertTrue($FStype == "text");  // all we support so far

        $aArray = array("projectuuid"=> ($projectuuid = $this->uuid()),
                        "projectname"=>$projectname,
                        "branch"=>$branch,
                        "filesystemtype"=> $FStype
                        );
        $this->insertArray($aArray);  // $aArray is a set of field-value pairs

        // but we really want to return the whole record
        return($this->getByKey($projectuuid));
      }


      function getProjectByName($id,$projectName,$branch){
        $query = sprintf('SELECT B.*
                   FROM `games_Fcollaborators` A
                   LEFT OUTER join `games_Fprojects` B on A.projectuuid=B.projectuuid
                   WHERE A.collaboratorid = %s and B.projectname=%s and B.branch=%s',
                   $id, $this->quote_string($projectName),$this->quote_string($branch));
             $ret = $this->query($query);
             assertTrue(is_array($ret),"Expected array, got ".serialize($ret));
             return($ret);
      }



}





class Fdocuments extends AbstractData implements BasicTableFunctions
{
      public function __construct()

      // a 'document' represents a COMMITTED (ie: pristine) version
      //     look at 'fragments' to find the most up-to-date version

      // documentType is 'T'- HTML Template, 'J'- Javascript

      {
          parent::__construct();
          $this->tableName    = $GLOBALS['dbPrefix'].'_Fdocuments';
          $this->uuidPrefix   = 'D';
          $this->primaryKey   = 'documentuuid';
          $this->secondaryKeys= array('projectuuid');

          $this->createString =
                  "CREATE TABLE IF NOT EXISTS `{$this->tableName}` (
                    `documentuuid`            varchar(16)  NOT NULL,
                    `projectuuid`    	        varchar(16)  NOT NULL,
                    `documentname`            varchar(64)  NOT NULL,
                    `created`                TIMESTAMP(3),
                    `lastupdate`              int(10) unsigned default 0,
                    `lastbackup`              int(10) unsigned default 0,
                    PRIMARY KEY  (`{$this->primaryKey}`)
                  ) DEFAULT CHARSET=utf8;";
      }


     function getDocumentByName($projectuuid,$documentname){
       $query = sprintf('SELECT A.projectuuid,A.projectname,B.documentuuid,B.documentname, B.created
                  FROM `games_Fprojects` A
                  LEFT OUTER JOIN `games_Fdocuments` B on A.projectuuid=B.projectuuid
                  LEFT OUTER JOIN `games_Ffragments` C on B.documentuuid=C.documentuuid
                  WHERE A.projectname=%s and B.documentname=%s
                  ORDER by C.created',
                  $this->quote_string($projectuuid),$this->quote_string($documentname));
            $ret = $this->query($query);
            assertTrue(is_array($ret),"Expected array, got ".serialize($ret));
            return($ret);
     }

     function addDocument($projectuuid,$documentName,$content){
       $aArray = array("documentuuid"=> ($uuid = $this->uuid()),
                       "projectuuid"=>$projectuuid,
                       "documentname"=>$documentName,
                       );
       $this->insertArray($aArray);  // $aArray is a set of field-value pairs
       return($uuid);
     }

     function getDocumentsByProject($projectuuid){
       $query = sprintf("select * from $this->tableName where projectuuid=%s",
             $this->quote_string($projectuuid));
       $ret = $this->query($query);
       assertTrue(is_array($ret),"Expected array, got ".serialize($ret));
       return($ret);

     }

     function deleteDocument($documentuuid){
       $query = sprintf("delete from $this->tableName where documentuuid=%s",
             $this->quote_string($documentuuid));
       $ret = $this->query($query);
       assertTrue(is_array($ret),"Expected array, got ".serialize($ret));
       return($ret);
     }


     // // // get list of projects for a specific person
     //  function getAllDocumentsByID($collaboratorID){
     //   $query = sprintf('"SELECT A.documentuuid,A.type,A.name,
     //                            ,B.fragmentuuid,B.document as documentb
     //                    FROM `games_Fdocuments` A left outer join `games_Ffragments` B ON A.documentuuid = B.documentuuid
     //                    WHERE A.documentuuid="%s"
     //                    ORDER by B.created',
     //         $this->quote_string($collaboratorID));
     //   $ret = $this->query($query);
     //   assertTrue(is_array($ret),"Expected array, got ".serialize($ret));
     //   return($ret);
     // }

     // get current document text (last fragment)
     function getCurrentDocumentByDocID($documentID){
         $query = sprintf('SELECT A.documentuuid,A.type,A.name,A.document,
                                  B.fragmentuuid,B.document as fragment
                          FROM `games_Fdocuments` A left outer join `games_Ffragments` B ON A.documentuuid = B.documentuuid
                          WHERE A.documentuuid="%s"
                          ORDER by B.created',
               $this->quote_string($documentID));
         $ret = $this->query($query);
         assertTrue(is_array($ret),"Expected array, got ".serialize($ret));
         return($ret);
     }

}



class Ffragments extends AbstractData implements BasicTableFunctions
{
      public function __construct()

      // a 'fragment' represents changes to a document or earlier fragment
      //     we can throw away earlier fragments after some period of time

      {
          parent::__construct();
          $this->tableName    = $GLOBALS['dbPrefix'].'_Ffragments';
          $this->uuidPrefix   = 'F';
          $this->primaryKey   = 'fsequence';
          $this->secondaryKeys= array('documentuuid','projectuuid');

          // the primary key is fsequence, but we use fragmentuuid for all references

          $this->createString =
                  "CREATE TABLE IF NOT EXISTS `{$this->tableName}` (
                    `fsequence`              int NOT NULL AUTO_INCREMENT,
                    `fragmentuuid`            varchar(16) NOT NULL,
                    `fromfragmentuuid`        varchar(16),
                    `documentuuid`            varchar(16),
                    `collaboratorID`          int NOT NULL,
                    `document`                longtext,
                    `md5`                     varchar(40),
                    `markfordelete`           int,
                    `created`                TIMESTAMP(3),
                    `lastupdate`              int(10) unsigned default 0,
                    `lastbackup`              int(10) unsigned default 0,
                    PRIMARY KEY  (`{$this->primaryKey}`)
                  ) DEFAULT CHARSET=utf8;";
      }


      // could have combined addFIRSTFragment() and addNewFragment(), but maybe safer...
      // also this way, I don't need $documentuuid all the time

      function addFIRSTFragment($documentuuid,$document,$collaboratorID){
        assertTrue(substr($documentuuid,0,1)=="D");

        $aArray = array("fragmentuuid"=> ($uuid= $this->uuid()),
                        "fromfragmentuuid"=>'',
                        "documentuuid"=>$documentuuid,
                        "document"=>$document,
                        "collaboratorID"=>$collaboratorID,
                        "md5"=>md5($document)
                        );
        $this->insertArray($aArray);  // $aArray is a set of field-value pairs
        return($uuid);
      }


      function addNewFragment($fromFragmentuuid,$document,$collaboratorID){

        // shortcut - if the md5 of the FROM is same as current, no changes
        $md5 = md5($document);

          assertTrue(substr($fromFragmentuuid,0,1)=="F");
          $query = sprintf("select A.md5,A.documentuuid,B.documentname,B.projectuuid
                            from $this->tableName A left outer join `games_Fdocuments` B on A.documentuuid = B.documentuuid
                            where A.fragmentuuid=%s",
                $this->quote_string($fromFragmentuuid));
          $ret = $this->query($query);
          assertTrue(is_array($ret),"Expected array, got ".serialize($ret));
          assertTrue(count($ret)==1,"Expected 1 result, got ".serialize($ret));

          $projectuuid = $ret[0]['projectuuid'];
          $documentuuid = $ret[0]['documentuuid'];
          $documentname = $ret[0]['documentname'];

          assertTrue(substr($projectuuid,0,1)=="P");
          assertTrue(substr($documentuuid,0,1)=="D");

          if($ret[0]['md5'] === $md5){
            // no changes to fragment content, simply echo old one
            $aRet = [$projectuuid,$documentuuid,$fromFragmentuuid,$documentname];
            return($aRet);
          }

          // if we got here, we have to insert a new fragment

        $aArray = array("fragmentuuid"=> ($uuid= $this->uuid()),
                        "fromfragmentuuid"=>$fromFragmentuuid,
                        "documentuuid"=>$documentuuid,
                        "document"=>$document,
                        "collaboratorID"=>$collaboratorID,
                        "md5"=>$md5
                        );
        $this->insertArray($aArray);  // $aArray is a set of field-value pairs

        $aRet = [$projectuuid,$documentuuid,$uuid,$documentname];
        return($aRet);
      }


      function getNewestFragment($documentuuid){
        $query = sprintf("select * from $this->tableName where documentuuid=%s order by created desc limit 1",
              $this->quote_string($documentuuid));
        $ret = $this->query($query);
        assertTrue(is_array($ret),"Expected array, got ".serialize($ret));
        return($ret);

      }

      function getAllDocumentFragments($documentuuid){
        $query = sprintf("select * from $this->tableName where documentuuid=%s",
              $this->quote_string($documentuuid));
        $ret = $this->query($query);
        assertTrue(is_array($ret),"Expected array, got ".serialize($ret));
        return($ret);
      }


      function deleteAllDocumentFragments($documentuuid){
        $query = sprintf("delete from $this->tableName where documentuuid=%s",
              $this->quote_string($documentuuid));
        $ret = $this->query($query);
        assertTrue(is_array($ret),"Expected array, got ".serialize($ret));
        return($ret);
      }



      function getLast30Fragments($fragmentuuid){   // given a fragmentID, get what we need for a timeslider...
        $query = sprintf("SELECT B.fsequence, B.fragmentuuid, B.fromfragmentuuid, B.created, B.collaboratorID, B.documentuuid
                          FROM `games_Ffragments` A, `games_Ffragments` B
                          where A.documentuuid = B.documentuuid and A.fragmentuuid = %s
                          order by fsequence desc LIMIT 302",
                $this->quote_string($fragmentuuid));
        $ret = $this->query($query);
        assertTrue(is_array($ret),"Expected array, got ".serialize($ret));
        return($ret);
      }

      function infoFromFragment($fragmentuuid){
        $query = sprintf("SELECT A.fragmentuuid, A.created, A.collaboratorID,A.document,
                                 B.projectuuid, B.documentname, C.projectname, C.branch
                          FROM `games_Ffragments` A
                          left outer join `games_Fdocuments` B on A.documentuuid = B.documentuuid
                          left outer join `games_Fprojects` C on B.projectuuid = C.projectuuid
                          left outer join `games_Fcollaborators` D on A.collaboratorID = D.collaboratorID
                          where A.fragmentuuid = %s",
                $this->quote_string($fragmentuuid));
        $ret = $this->query($query);
        assertTrue(is_array($ret),"Expected array, got ".serialize($ret));
        return($ret);
      }
}



class Fcollaborators extends AbstractData implements BasicTableFunctions
{
      public function __construct()

      // a 'fragment' represents changes to a document or earlier fragment
      //     we can throw away earlier fragments after some period of time

      {
          parent::__construct();
          $this->tableName    = $GLOBALS['dbPrefix'].'_Fcollaborators';
          $this->uuidPrefix   = 'C';
          $this->primaryKey   = 'uuid';
          $this->secondaryKeys= array('projectuuid');

          $this->createString =
                  "CREATE TABLE IF NOT EXISTS `{$this->tableName}` (
                    `uuid`      	            varchar(16)  NOT NULL,
                    `collaboratorID`          int NOT NULL,
                    `projectuuid`    	        varchar(16)  NOT NULL,
                    `created`                TIMESTAMP(3),
                    `lastupdate`              int(10) unsigned default 0,
                    `lastbackup`              int(10) unsigned default 0,
                    PRIMARY KEY  (`{$this->primaryKey}`)
                  ) DEFAULT CHARSET=utf8;";
      }

      // get list of all unique collaborators
      function getAllCollaborators(){
        $query = "select distinct collaboratorID from {$this->tableName}";
        $ret = $this->query($query);
        assertTrue(is_array($ret),"Expected array, got ".serialize($ret));
        return($ret);

      }

      // get list of documents for a specific person
      function GetAllProjectsByID($id){
        $query = sprintf("select B.collaboratorid,A.projectuuid,A.projectname,C.documentname,C.documentuuid,C.created
                from games_Fprojects A
                left outer join games_Fcollaborators B on A.projectuuid = B.projectuuid
                left outer join `games_Fdocuments` C on A.projectuuid = C.projectuuid
                where B.collaboratorID=%s",
              $this->quote_string($id));
        $ret = $this->query($query);
        assertTrue(is_array($ret),"Expected array, got ".serialize($ret));
        return($ret);
      }

      function addCollaborator($id,$projectuuid){
        $aArray = array("uuid"=> ($uuid = $this->uuid()),
                        "projectuuid"=> $projectuuid,
                        "collaboratorID"=>$id
                        );
        $this->insertArray($aArray);  // $aArray is a set of field-value pairs
        return($uuid);
      }

      function deleteProject($projectuuid){
        $query = sprintf("delete from $this->tableName where projectuuid=%s",
              $this->quote_string($projectuuid));
        $ret = $this->query($query);
        assertTrue(is_array($ret),"Expected array, got ".serialize($ret));
        return($ret);
      }

}
      class Fhistory extends AbstractData implements BasicTableFunctions
      {
            public function __construct()

            // a 'fragment' represents changes to a document or earlier fragment
            //     we can throw away earlier fragments after some period of time

            {
                parent::__construct();
                $this->tableName    = $GLOBALS['dbPrefix'].'_Fhistory';
                $this->uuidPrefix   = 'H';
                $this->primaryKey   = 'historyuuid';
                $this->secondaryKeys= array('projectuuid','collaboratorID','documentuuid','fragmentuuid');

                $this->createString =
                        "CREATE TABLE IF NOT EXISTS `{$this->tableName}` (
                          `historyuuid`             varchar(16)  NOT NULL,
                          `documentuuid`            varchar(16),
                          `collaboratorID`          int NOT NULL,
                          `projectuuid`    	        varchar(16),
                          `fragmentuuid`            varchar(16),
                          `message`                 varchar(140),
                          `created`                TIMESTAMP(3),
                          `lastupdate`              int(10) unsigned default 0,
                          `lastbackup`              int(10) unsigned default 0,
                          PRIMARY KEY  (`{$this->primaryKey}`)
                        ) DEFAULT CHARSET=utf8;";
            }

            function historyLog($message,$id="",$projectuuid="",$documentuuid="",$fragmentuuid=""){
              $date = date("Y-m-d H:i:s");
              $aArray = array("historyuuid"=> ($uuid = $this->uuid()),
                              "collaboratorID"=>$id,
                              "projectuuid"=> $projectuuid,
                              "documentuuid"=>$documentuuid,
                              "fragmentuuid"=>$fragmentuuid,
                              "message"=>$message
                            );
              $this->insertArray($aArray);  // $aArray is a set of field-value pairs
              return($uuid);

            }

            function deleteProject($projectuuid){
              $query = sprintf("delete from $this->tableName where projectuuid=%s",
                    $this->quote_string($projectuuid));
              $ret = $this->query($query);
              assertTrue(is_array($ret),"Expected array, got ".serialize($ret));
              return($ret);
            }

            // we are losing this user, wipe his history
            function eraseHistoryByID($id){
              $query = sprintf("delete from $this->tableName where collaboratorid=%s",
                    $this->quote_string($id));
              $ret = $this->query($query);
              assertTrue(is_array($ret),"Expected array, got ".serialize($ret));
              return($ret);
            }
}



// this table is just used for assertion testing NOT for production
class TestTable extends AbstractData implements BasicTableFunctions
{
    private static $instance;

    public function __construct()
    {    // private, so can't instantiate from outside class
        parent::__construct();
        $this->tableName    = $GLOBALS['dbPrefix'].'_test';
        $this->uuidPrefix   = 'S';
        $this->primaryKey   = 'sessionID';
        $this->secondaryKeys= array('UserID');

        $this->createString =
                "CREATE TABLE IF NOT EXISTS `{$this->tableName}` (
                  `SessionID`  	            varchar(32)  NOT NULL,
                  `UserID`                  varchar(32),
                  `created`                TIMESTAMP(3),
                  `lastupdate`              int(10) unsigned default 0,
                  `lastbackup`              int(10) unsigned default 0,
                  PRIMARY KEY  (`{$this->primaryKey}`)
                ) DEFAULT CHARSET=utf8;";
    }

    // The singleton method
    public static function singleton()
    {
        if (!isset(self::$instance)) {
            $c = __CLASS__;
            self::$instance = new $c;
        }
        return self::$instance;
    }

    // we build our JOOMLA queries here.

    // Get the Joomla Name from an // ID
    public function getName($ID)
    {
        $query = sprintf("select name from joom_users where id= %s",
              $this->quote_string($ID));

        $result = $this->query($query);

        if(count($result)== 1 ){
            return($result[0]['name']);
        }else{
          assertTrue(false,"Count of records not 1");
          return('Unknown');
        }
    }
}








// holds 'event' stuff in cargo, like DisfiguredWriting or tests
class StudentEventTable extends AbstractData implements BasicTableFunctions
{

   // Hold a singleton instance of the class
    private static $instance;

    public function __construct()
    {    // private, so can't instantiate from outside class
        parent::__construct();
        $this->tableName    = $GLOBALS['dbPrefix'].'_StudentEvent';
        $this->uuidPrefix   = 'E';
        $this->primaryKey   = 'uuid';
        $this->secondaryKeys= array('trainerID','studentID');
        $this->createString =
            "CREATE TABLE IF NOT EXISTS `{$this->tableName}` (
              `uuid`      	        varchar(16)  NOT NULL,
              `trainerID`  	        varchar(64)  NOT NULL,
              `studentID`  	        varchar(32)  NOT NULL,
              `cargo` 	                text,
              `project`                 varchar(32),
              `created`                 int(10) unsigned default 0,
              `createdhuman`            varchar(32),
              `lastupdate`              int(10) unsigned default 0,
              `lastbackup`              int(10) unsigned default 0,
              PRIMARY KEY  (`{$this->primaryKey}`)

            ) DEFAULT CHARSET=utf8;";
    }

    // The singleton method
    public static function singleton()
    {
        if (!isset(self::$instance)) {
            $c = __CLASS__;
            self::$instance = new $c;
        }
        return self::$instance;
    }



    // if you have logged in as a parent or psychologist, you have a number of students.
    public function GetAllEventsbyTeacher($trainerID)
    {
        $query =  sprintf(
                "SELECT cargo
                                 FROM $this->tableName
                                 WHERE trainerID=%s
                                 ORDER BY created desc",
                         $this->quote_string($trainerID)
            );                 // avoids SQL injection attacks
        $result = $this->query($query);
        $unpack = array();
        foreach ($result as $single) {
            $unpack[] = unserialize($single['cargo']);
        }
        return($unpack);
    }


    // would be safer if this were uncommented
    //function drop(){assertTrue(false,__METHOD__." is not supported.");}
}













// TrainingLog holds details of all training sessions
class TrainingLog extends AbstractData implements BasicTableFunctions
{

   // Hold a singleton instance of the class
    private static $instance;

    public function __construct()
    {    // private, so can't instantiate from outside class
        parent::__construct();
        $this->tableName    = $GLOBALS['dbPrefix'].'_TrainingLog';
        $this->uuidPrefix   = 'T';
        $this->primaryKey   = 'uuid';
        $this->secondaryKeys= array('created','studentID','action','project','trainerID','rule','result');   // so can sort by date
        $this->createString =
            "CREATE TABLE IF NOT EXISTS `{$this->tableName}` (
              `sessionID`  	        varchar(16)  NOT NULL,
              `trainerID`  	        varchar(64)  NOT NULL,
              `studentID`  	        varchar(32)  NOT NULL,
              `action`  	        varchar(32)  NOT NULL,
              `project`                 varchar(32),
              `rule`                    varchar(64),
              `result`                  varchar(64),
              `comment`                 varchar(256),
              `JoomlaName`              varchar(32),
              `remoteAddr`              varchar(32),
              `created`                 int(10) unsigned default 0,
              `createdhuman`            varchar(32),
              `lastupdate`              int(10) unsigned default 0,
              `lastbackup`              int(10) unsigned default 0
            ) DEFAULT CHARSET=utf8;";
    }

    // The singleton method
    public static function singleton()
    {
        if (!isset(self::$instance)) {
            $c = __CLASS__;
            self::$instance = new $c;
        }
        return self::$instance;
    }



    public function insert($cargo, $key='')
    {
        assertTrue(false, "Use insertLOG() instead of insert() for the log file");
    }


    // we use the TrainingSession singleton to get trainerID, studentID, and project
    public function insertLog($action, $rule='', $result='', $comment='')
    {
        $identity = identity::singleton();

        $aArray = array();
        $aArray['sessionID'] = $identity->sessionID();
        $aArray['trainerID'] = $identity->userName()  ;
        $aArray['studentID'] = $identity->studentID();
        $aArray['JoomlaName']= $identity->name()  ;
        $aArray['project'  ] = $identity->project()            ;
        $aArray['created'  ] = time()                 ;
        $aArray['createdhuman'] = date("Y-m-d H:i:s")    ;
        $aArray['action'   ] = $action     ;
        $aArray['rule'     ] = $rule       ;
        $aArray['result'   ] = $result     ;
        $aArray['comment'  ] = $comment    ;
        $aArray['remoteAddr']=  iif(isset($_SERVER['REMOTE_ADDR']), $_SERVER['REMOTE_ADDR']);

        $this->insertArray($aArray);
    }

    public function getHistoryByTrainer($trainerID)
    {
        $query = sprintf(
         "SELECT count(trainerID),trainerID,left(createdhuman,11) as cdate FROM $this->tableName ".
                        " where trainerID=%s group by cdate order by trainerID,cdate ",
                    $this->quote_smart($trainerID)
     );
        $resultSet = $this->query($query);
        return($resultSet);
    }

    public function getHistoryByStudent($studentID)
    {
        $query = sprintf(
            "select trainerID,action,rule,createdhuman,project,sessionID from $this->tableName where studentID=%s order by created",
                         $this->quote_smart($studentID)
        );
        $resultSet = $this->query($query);
        return($resultSet);
    }

    public function getRecentHistory($userOnly='')
    {
        $limit = '';
        if (!empty($userOnly)) {
            $limit = sprintf(
               "where trainerID = %s ",
                                $this->quote_smart($userOnly)
           );
        }

        $query = "select *, count(sessionid) as count from {$this->tableName} $limit group by sessionid order by created desc limit 100";

        return($this->query($query));
    }

    public function getTrainingSession($sessionID)
    {
        $query = "select * from {$this->tableName} where sessionid = '$sessionID' order by created desc";

        return($this->query($query));
    }

    public function getAssessment($studentID, $program='Assessment')
    {

        // have to break the next stmt into two because the % in the like clause confuses sprintf
        $query = sprintf(
            "select * from {$this->tableName} where studentID=%s ",
                         $this->quote_smart($studentID)
        ) . "and rule like '{$program}%' order by created";
        return($this->query($query));
    }
}
// SystemLog holds error messages and exceptions
class SystemLog extends AbstractData implements BasicTableFunctions
{


   // Hold a singleton instance of the class
    private static $instance;

    // Prevent logging events if we are already writing one (usually DB errors)
    public $inSystemLog;

    public function __construct()
    {    // private, so can't instantiate from outside class
        parent::__construct();
        $this->tableName    = $GLOBALS['dbPrefix'].'_SystemLog';
        $this->uuidPrefix   = 'L';
        $this->primaryKey   = 'uuid';
        $this->secondaryKeys= array('joomlaName','created','action');   // so can sort by date
        $this->inSystemLog = false;
        $this->createString =
            "CREATE TABLE IF NOT EXISTS `{$this->tableName}` (
              `uuid`        	        varchar(16)  NOT NULL,
              `joomlaName`  	        varchar(64)  NOT NULL,
              `action`  	            varchar(32)  NOT NULL,
              `project`                 varchar(32),
              `cargo` 	                text,
              `created`                 int(10) unsigned default 0,
              `createdhuman`            varchar(32),
              `lastupdate`              int(10) unsigned default 0,
              `lastbackup`              int(10) unsigned default 0,
              PRIMARY KEY  (`{$this->primaryKey}`)
            ) DEFAULT CHARSET=utf8;";
    }

    // The singleton method
    public static function singleton()
    {
        if (!isset(self::$instance)) {
            $c = __CLASS__;
            self::$instance = new $c;
        }
        return self::$instance;
    }


    public function write($action, $comment)
    {
        $identity = identity::singleton();

        $aArray = array();
        $aArray['uuid'  ]    = $this->uuid()                 ;
        if ($identity->isValidUser()) {
            $aArray['JoomlaName']= $identity->userName();
            $aArray['project'  ] = $identity->project();
        } else {
            $aArray['JoomlaName']= 'Not logged in';
            $aArray['project'  ] = '';
        }
        $aArray['created'  ] = time()                 ;
        $aArray['createdhuman'] = date("Y-m-d H:i:s")    ;
        $aArray['action'   ] = $action     ;
        $aArray['cargo'    ] = $comment  ;

        if ($this->inSystemLog == true) {
            //Recursive call to SystemLog while logging another message (usually a DB error)
            return;
        } else {
            $this->inSystemLog = true;      // now if a logging event happens, we
            $this->insertArray($aArray);    //      don't write a second time
        }

//        printNice('Database',"<hr />$action<br>$comment");

        $this->inSystemLog = false;
    }


    public function getLast20()
    {
        $ret = $this->query("select * from {$this->tableName} order by created desc LIMIT 20");
        $return = array();
        foreach ($ret as $element) {
            $return[] =  "<b>{$element['action']}  <i>{$element['joomlaName']}</i>  {$element['createdhuman']}</b><br/>".
                        urldecode(htmlspecialchars_decode(html_entity_decode(html_entity_decode($element['cargo']))));
        }
        return($return);
    }
}


class Projects extends AbstractData implements BasicTableFunctions
{

   // Hold a singleton instance of the class
    private static $instance;

    public function __construct()
    {    // private, so can't instantiate from outside class
        parent::__construct();
        $this->tableName    = $GLOBALS["dbPrefix"].'_Projects';
        $this->uuidPrefix   = 'P';
        $this->primaryKey   = 'uuid';
        $this->secondaryKeys= array('shortName');   // so can sort by date
        $this->createString =
            "CREATE TABLE IF NOT EXISTS `{$this->tableName}` (
              `uuid`      	            varchar(16)  NOT NULL,
              `project`                 varchar(32)  NOT NULL,
              `cargo` 	                text,
              `created`                 int(10) unsigned default 0,
              `createdhuman`            varchar(32),
              `lastupdate`              int(10) unsigned default 0,
              `lastbackup`              int(10) unsigned default 0,
              PRIMARY KEY  (`{$this->primaryKey}`)
            ) DEFAULT CHARSET=utf8;";
    }

    // The singleton method
    public static function singleton()
    {
        if (!isset(self::$instance)) {
            $c = __CLASS__;
            self::$instance = new $c;
        }
        return self::$instance;
    }

}




// ////////////////////////////////////////////////////
// ////////////////////////////////////////////////////
//
// // Joomla utilities
//
// function getJoomlaUsergroups(){
//
//     $db = JFactory::getDBO();
//     $db->setQuery("select id, title from #__usergroups");
//     $resultset = $db->loadAssocList();       // we return ALL rows in an array of associative arrays
//
//     // but we want to make sure that OUR usergroups are included - if not, then
//     // this is a new joomla install
//
//     $P_groupsExist = false;
//     foreach ($resultset as $group){
//         if (left($group['title'],7)=='Phonics'){       // and whether the P_ groups are there
//             $P_groupsExist = true;
//         }
//     }
//
//     if(!$P_groupsExist){     // probably the first time we try running...
//
//         $document = document::singleton();
//         $document->systemMessage("Initializing User Groups - You MUST set permissions before continuing.");
//
//         $roles = $GLOBALS['roles'];    // defined in 'initialize_me_first'
//
//         $currentParent = 1;         // first parent is 'Public'
//
//         foreach ($roles as $role){
//             $sql = "INSERT INTO #__usergroups (title,parent_id) VALUES ('$role',$currentParent)";
//             $db->setQuery($sql);
//             $db->query(); //confirm
//
//             $db->setQuery("select id from #__usergroups where title = '$role'");
//             $rs = $db->loadAssocList();
//             $currentParent = $rs[0]['id'];
//         }
//
//         // finally rerun the entire query with the new elements
//         $db->setQuery("select id, title from #__usergroups");
//         $resultset = $db->loadAssocList();       // we return ALL rows in an array of associative arrays
//
//         // and now rebuild the nesting
//         jimport( 'joomla.database.tablenested' );
//         $jtn = new JTableNested('#__usergroups','id',$db);
//         $jtn->rebuild(0);
//
//     }
//
//     // $resultset isn't in the right format, we simply want an array
//     $userGroups = array();
//     foreach ($resultset as $result){
//         $userGroups[$result['id']] = $result['title'];
//     }
//     return($userGroups);
// }


///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////



class dbconnect
{    // don't extend UnitTestCase because Factory does
    public static $dbc;        // a connection

    public function __construct()
    {
        // bring in the $host, $user, $pswd and $db parameters

        $sys = new systemStuff();

        include_once('config.php');   // our own config file

        if (!self::$dbc) {   // only need to create a connection once

            self::$dbc = new mysqli($host, $user, $pswd, $db);
            if (mysqli_connect_errno()) {
                writeErrorLog(false, 'Cannot connect to MySQL server:'. mysqli_connect_errno());
            }
        }
    }

    public function query($query)
    {
        //echo 'query:',$query,'<br>';
        $data = array();
        if ($result = mysqli_query(self::$dbc, $query)) {
            /* fetch associative array */
            if (!is_bool($result)) {  // was probably a statement
                while ($row = mysqli_fetch_assoc($result)) {
                    $data[] = $row;
                }
                /* free result set */
                mysqli_free_result($result);
            }
            //if(isset($data[0]))
            //    echo serialize($data[0]),'<br>';
            //echo '<br>';
        } else {
            //writeErrorLog(false,"mySQL error $query ".mysqli_error(self::$dbc));
        }
        return($data);
    }

    public function error(){
      return (mysqli_error (self::$dbc));
    }



    public function query_bool($query, $file = '', $line = 0)
    {
        // this needs to be updated to mysqli functions
//        if(!$result = @mysql_query($query, self::$dbc)){
//            writeErrorLog(false, 'Error <b>'.mysql_error(self::$dbc).'</b> in query <b>'.$query.'</b>. In file '.$file.' in line '.$line.'. Date: '.date('Y-m-d H:i:s'));
//        }
        return ($result?true:false);
    }

    public function insert_id()
    {
        $id = $this->firstCell("SELECT LAST_INSERT_ID() as id");
        return $id;
    }

    public function fetch_array($query, $type = SQL_BOTH)
    {
        $result = $this->query($query);
        return $result->fetch_array($type);
    }

    public function first_cell($query)
    {
        $result = $this->query($query);
        $row = $result->fetch_array(SQL_NUM);
        return $row[0];
    }

    public function change_base($base, $file = '', $line = 0)
    {
        if (!$result = @mysql_query('USE '.$base, self::$dbc)) {
            $error = 'Error <b>'.'</b> in query <b>'.$query.'</b>. In file '.$file.' in line '.$line.'. Date: '.date('Y-m-d H:i:s').'<br />'.CRLF;
            //$error = 'Error <b>'.mysql_error(self::$dbc).'</b> in query <b>'.$query.'</b>. In file '.$file.' in line '.$line.'. Date: '.date('Y-m-d H:i:s').'<br />'.CRLF;
            if ($this->showError) {
                echo $error;
            }
        }
        return ($result?true:false);
    }

    public function close()
    {
        @mysql_close(self::$dbc);
        //unset($this);
    }
}

class dbcResult
{
    public function __construct($result)
    {
        $this->result = $result;
    }

    public function fetch_array($type = SQL_BOTH)
    {
        return @mysql_fetch_array($this->result, $type);
    }

    public function first_cell()
    {
        $row = @mysql_fetch_row($this->result);
        return $row[0];
    }

    public function num_rows()
    {
        return @mysql_num_rows($this->result);
    }
}
