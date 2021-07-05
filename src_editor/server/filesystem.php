<?php
defined('_KELLER') or die;

// these are the functions for the 'filesystem', implemented in four database tables
//   Fdocuments
//   Fprojects
//   Fcollaborators
//   Ffragments

/*
function createEmptyProject($id,$projectname,$branch,$Tname,$Ttype,$Tdocument,
                                                                 $Jname,$Jtype,$Jdocument)
function GetAllProjectsByID($id)

// // TODO:
getDocument(uuid) => cleanDoc (array of nodes)
simpleSaveDocument(uuid,steps) => {cleanDoc, steps}  // client must then merge

commitDocument


*/

class filesystem extends UnitTestCase
{

    // where are the games created by the members?  this way we can move them around
    function gcp($projectuuid){
      $gc = substr($_SERVER['SCRIPT_FILENAME'],0,strpos($_SERVER['SCRIPT_FILENAME'],'gamecode'));
      $gcp = $gc ."gamecode/projects/$projectuuid";
      return($gcp);
    }


    function showAllDocuments(){
      $collDB = new Fcollaborators();
      $all = $collDB->getAllCollaborators();

      echo $collDB->formatResultSet($all, "Collaborators", $columns=array());

      foreach($all as $id){
        $this->showAllDocumentsByID($id['collaboratorID']);
      }

    }

    function testShowAllDocuments(){
      $this->showAllDocuments();
    }




    public function showAllDocumentsbyID($id)
    {   // testing only
        $collDB = new Fcollaborators();
        $ret = $collDB->GetAllProjectsByID($id);
        echo $collDB->formatResultSet($ret, "Documents for $id", $columns=array());

        $docDB = new Fdocuments();
        foreach($ret as $doc){
                $details = $docDB->getDocumentByName($doc['collaboratorid'], $doc['projectname'], $doc['documentname']);
                echo $docDB->formatResultSet($details, "Single document({$doc['collaboratorid']}, {$doc['projectname']}, {$doc['documentname']})", $columns=array());
        }

    }



    // don't need any uuid's for this call, all by readable names
    function getDocumentByName($id, $project, $docName){
      $docDB = new Fdocuments();
      $ret = $docDB->getDocumentByName($id, $project, $docName);
      echo $docDB->formatResultSet($ret, "Single document($id, $project, $docName)", $columns=array());

      if(empty($ret)){    // maybe doesn't exist
        return(false);
      }

      // otherwise this could be a long list of fragments
      $frag = end($ret)["fragment"];   // last element is newest fragment
      return($frag);
    }



    // function $fragmentSaveDocument($fragmentID,$newText)
    public function fragmentSaveDocument($fromfragmentID,$newText,$id) {
      // create a new fragment
      // now have a valid document in a valid project
      // always create a fragment for the new code (clean up when it gets committed)
        $fragDB = new Ffragments();
        $fragmentuuid = $fragDB->addNextFragment($fromfragmentID, $content, $id);

      return($fragmentuuid);   // fragmentID can be used for subsequent adds

    }


    public function showDBforID($id)
    {  //testing only
        //echo serialize($ret);
        $collDB = new Fcollaborators();
        $ret = $collDB->GetAllProjectsByID($id);
        echo $collDB->formatResultSet($ret, "Projects for $id", $columns=array());

        $docDB = new Fdocuments();
        $fragDB = new Ffragments();

        foreach ($ret as $key => $value) {   // for each
            $dret = $docDB->getProjectDocuments($value['projectuuid']);
            echo $docDB->formatResultSet($dret, "project uuid: {$value['projectuuid']}");

            foreach ($dret as $dkey => $dvalue) {
                $fret = $fragDB->getAllDocumentFragments($dvalue["documentuuid"]);
                echo $fragDB->formatResultSet($fret, "document uuid: {$dvalue['documentuuid']}");
            }
        }
    }


    public function GetAllProjectsByID($id)
    {
        $collDB = new Fcollaborators();
        $ret = $collDB->GetAllProjectsByID($id);
        return($ret);
    }

    public function testGetAllProjectsByID()
    {
        $id = 500;  // tester ID
        $ret = $this->GetAllProjectsByID($id);
        assertTrue(is_array($ret));
//    assertTrue(count($ret)>0);
//    $this->showDBforID($id);
    }


    // creates index.html, main.js, eventually other stuff

    public function createEmptyProject($id,$projectname,$branch='') {
        $projDB = new Fprojects();
        $aProject = $projDB->addNewProject($id, $projectname, $branch);

        $collDB = new Fcollaborators();
        $collDB->addCollaborator($id, $aProject[0]['projectuuid']);

        history("Created empty project '$projectname' # $projectname", $id);
        return($aProject);  // subsequent adds can be done by fragmentuuid
    }


    function addDocument($projectuuid,$documentName,$content,$id,$testing=false){
      $docsDB = new FDocuments();
      $fragDB = new FFragments();

      // we need the 'testing' flag because we are ALLOWED to try to add a document
      // and discover that we already have that document name.  But we don't want
      // errors from that.

      assertTrue(substr($projectuuid,0,1)=="P");
      assertTrue(!empty($id));    // which collaborator is adding this document?

      // first, sanity check - does this documentName exist in this project?
      $existing = $docsDB->getDocumentByName($projectuuid,$documentName);
      if($existing)
        return(false);    // not an error, might be expected behavior in a test function

      // call db function and create the document
      $documentuuid = $docsDB->addDocument($projectuuid,$documentName,$content);
      assertTrue(substr($documentuuid,0,1)=='D',"Expected documentuuid, got '$documentuuid'");

      // call db functin and create the first fragment (which has a blank 'prev')
      $fragmentuuid = $fragDB->addFIRSTFragment($documentuuid,$content,$id);

      // we also have to add the document into  gamecode_dev/projectuuid
      // we know we are in /--something--/gamecode... and we want /--something--/
      $gcp = $this->gcp($projectuuid);  // get the directory name for this project
      assertTrue(mkdir($gcp,0775),"failed to create directory '$gcp'");

      $ret = file_put_contents("$gcp/$documentName", $content);
      assertTrue($ret !== false,"failed to write '$documentName' to directory '$gcp'");

      return($documentuuid);
    }


    // this is a nice compact function - give it a fragmentuuid and it updates.
    // but lots of stuff going on at the database level...
    function updateDocument($fromFragmentuuid,$content,$id){
      $fragDB = new FFragments();

      assertTrue(substr($fromFragmentuuid,0,1)=="F");
      assertTrue(!empty($id));    // which collaborator is adding this document?

    $aRet = $fragDB->addNewFragment($fromFragmentuuid, $content,$id,true/*testing*/ );
      $projectuuid  = $aRet[0];
      $documentuuid = $aRet[1];
      $fragmentuuid = $aRet[2];
      $documentName = $aRet[3];

      // only write out if the file has changed
      if($fromFragmentuuid !== $fragmentuuid){
        $gcp = $this->gcp($projectuuid);  // get the directory name for this project
        $ret = file_put_contents("$gcp/$documentName", $content);
        assertTrue($ret !== false,"failed to write '$documentName' to directory '$gcp'");
      }

      return($fragmentuuid);
    }


    public function getDocumentByID($documentuuid)
    {
        $docDB = new FDocuments();
        $ret = $docDB->getCurrentDocumentByDocID($documentuuid);
        assertTrue(is_array($reg));
        assertTrue(count(ret)==1);

        // returns cleanDoc (array of nodes) and EMPTY steps.
        $retArray = array("newDocument"=>$newDocument, "sinceSteps"=>array());
        return($retArray);
    }



    function testhistoryFromFragment(){
       $fragDB = new Ffragments();
       $random = $fragDB->getAllByWhere();

       if(count($random)==0){
         assertTrue(false,"Didn't get any fragments, couldn't test the TimeSlider");
       }else{

         echo $fragDB->formatResultSet([$random[0]], "Random Fragment", $columns=array());
         $fragmentuuid = $random[0]['fragmentuuid'];
         assertTrue(substr($fragmentuuid,0,1)=="F", "This doesn't seem to be a fragmentuuid: '$fragmentuuid'");

         $history = $this->historyFromFragment($fragmentuuid);
         echo $fragDB->formatResultSet($history, "History from Fragment $fragmentuuid", $columns=array());

         $info = $this->infoFromFragment($fragmentuuid);
         echo $fragDB->formatResultSet($info, "Info from Fragment $fragmentuuid", $columns=array());
       }
    }


    public function historyFromFragment($fragmentuuid){
      $fragDB = new Ffragments();
      $fragHist = $fragDB->getLast30Fragments($fragmentuuid);
      return($fragHist);
    }

    function deleteDocument($documentuuid){
      $docsDB = new Fdocuments();
      $fragDB = new Ffragments();

      // we will need the projectuuid...
      $aDoc = $docsDB->getbyKey($documentuuid);
      $projectuuid = $aDoc[0]['projectuuid'];
      $documentName = $aDoc[0]['documentname'];
      assertTrue(substr($projectuuid,0,1) =='P');

      $fragDB->deleteAllDocumentFragments($documentuuid);
      $docsDB->deleteDocument($documentuuid);

      // now delete the web document
      $gcp = $this->gcp($projectuuid);  // get the directory name for this project
      $ret = unlink("$gcp/$documentName");
      assertTrue($ret,"failed to delete file '$gcp/$documentName'");


    }

    function deleteProject($projectuuid){
        // get all documentuuids with Fdoc->getProjectDocuments()
          $docsDB = new Fdocuments();
          $collDB = new Fcollaborators();
          $histDB = new Fhistory();

          // get all documents for this project
          $documents = $docsDB->getDocumentsByProject($projectuuid);
          foreach($documents as $document){
            $this->deleteDocument($document['documentuuid']);
          }

          // get rid of collaborations and history for this project
          $collDB->deleteProject($projectuuid);
          $histDB->deleteProject($projectuuid);

          // now delete the web directory
          $gcp = $this->gcp($projectuuid);  // get the directory name for this project
          $ret = rmdir($gcp);
          assertTrue($ret,"failed to delete directory '$gcp'");

      }




    //////////////////////////////////////////////////
    /// wrappers for DB $functions
    //////////////////////////////////////////////////

    public function infoFromFragment($fragmentuuid){  // wrapper for database function
      $fragDB = new Ffragments();
      return ($fragDB->infoFromFragment($fragmentuuid));
    }

    function getProjectByName($id,$projName,$branch){   // wrapper for database function
      $projDB = new FProjects();
      return($projDB->getProjectByName($id,$projName,$branch));
    }

    function getDocumentsByProject($projectuuid){   // wrapper for database function
      $docsDB = new FDocuments();
      return($docsDB->getDocumentsbyProject($projectuuid));
    }

    function getNewestFragment($documentuuid){
      $fragDB = new FFragments();
      return($fragDB->getNewestFragment($documentuuid));
    }



    function testTypicalAJAXDialog(){
      echo "<hr>TESTING typical AJAX Dialog - testTypicalAJAXDialog() ";
      $id = 77;

      // start by removing any records for this $id
      $collDB = new Fcollaborators();
      $projDB = new FProjects();
      $docsDB = new FDocuments();
      $fragDB = new Ffragments();
      $histDB = new Fhistory();


      // drop all projects for this ID
      $all = $collDB->GetAllProjectsByID($id);
      foreach($all as $project){
          $this->deleteProject($project['projectuuid']);
      }
      $all = $collDB->GetAllProjectsByID($id);
      assertTrue(count($all)==0,"expected no projects remaining for this user");

      $histDB->eraseHistoryByID($id);

      //echo $collDB->formatResultSet($all, "Collaborators", $columns=array());


      // create an empty project
      $projName = "Test Project";
      $branch   = '';
      $documentName1 = "index.html";
      $documentContent1 = "<HEAD></HEAD>";
      $documentContent2 = "<HEAD></HEAD><BODY></BODY>";
      $documentName2 = "main.js";

      $aProject = $this->getProjectbyName($id,$projName,$branch);
      assertTrue(count($aProject) == 0, "Didn't expect the project to exist");
      $aProject = $this->createEmptyProject($id,$projName,$branch);

      // make sure we can now see the project
      $testProject = $this->getProjectbyName($id,$projName,$branch);
      assertTrue($aProject[0]['projectuuid'] === $testProject[0]['projectuuid'],"Should not have created a second project ");
              // echo "<br>",serialize($aProject);
              // echo "<br>",serialize($testProject);


      $projectuuid = $aProject[0]['projectuuid'];

      // since it's an empty project, i don't expect to see a file.  But let's check anyhow
      $aDocs = $this->getDocumentsByProject($projectuuid);
      assertTrue(count($aDocs)==0,"Don't expect any documents in a new project");

      $documentuuid = $this->addDocument($projectuuid,$documentName1,$documentContent1,$id,true/*testing*/);

      // now I expect to see a single document
      $aDocs = $this->getDocumentsByProject($projectuuid);
      assertTrue(count($aDocs)==1,"Expect to see ONE document, got ".serialize($aDocs));

      // let's see if the fragment holds what we expect
      $aFragment = $this->getNewestFragment($documentuuid);
      assertTrue(count($aFragment)==1,"Expect to see ONE fragment, got ".serialize($aFragment));

      // did the content get written correctly?
      $retrieved = $aFragment[0]['document'];
      $fraguuid  = $aFragment[0]['fragmentuuid'];

      // make sure the document is what we expect
      assertTrue($retrieved == $documentContent1,"Expected content to match");


      // normally we would start working with the fragmentuuid
      //  return($fragmentuuid);   // fragmentID can be used for subsequent adds

      // let's try again with an existing document

      $aProjects = $this->GetAllProjectsByID($id);
      assertTrue(count($aProjects)==1,"Expected one project, got ".serialize($aProjects));
      //echo serialize($aProjects);

      // let's go straight to the latest fragment
      $documentuuid = $aProjects[0]['documentuuid'];
      $aFragment = $this->getNewestFragment($documentuuid);

      assertTrue(count($aFragment)==1,"Expect to see ONE fragment, got ".serialize($aFragment));

      // did the content get written correctly?
      $retrieved = $aFragment[0]['document'];
      $fraguuid  = $aFragment[0]['fragmentuuid'];

      // make sure the document is what we expect
      assertTrue($retrieved == $documentContent1,"Expected content to match");

      // ok, let's update this fragment
      $fragmentuuid = $this->updateDocument($fraguuid, $documentContent2,$id);

      // did it write out correctly?
      $aFragment = $this->getNewestFragment($documentuuid);
      // did the content get written correctly?
      $retrieved = $aFragment[0]['document'];
      $fraguuid2  = $aFragment[0]['fragmentuuid'];

      // make sure the document is what we expect
      assertTrue($retrieved == $documentContent2,"Expected content to match new content");
      assertTrue($fraguuid !== $fraguuid2,"Expected different fragments");

      // ok, let's update this fragment WITHOUT CHANGE
      $fragmentuuid = $this->updateDocument($fraguuid2, $documentContent2,$id);

      // CodeMirror doesn't need to fetch the new document, but we do
      $aFragment = $this->getNewestFragment($documentuuid);
      // did the content get written correctly?
      $retrieved = $aFragment[0]['document'];
      $fraguuid3  = $aFragment[0]['fragmentuuid'];

      // make sure the document is what we expect
      assertTrue($retrieved == $documentContent2,"Expected content to match new content");
      assertTrue($fraguuid2 == $fraguuid3,"Expected SAME fragments");
    }

}
