<?php

// tb:  go into site admin and turn on BOTH allow webservices and mobile webservices
// tb:  turn on web services documentation to see what is available
// tb:  follow these instructions http://localhost/moodle/admin/settings.php?section=webservicesoverview
// tb:  documentation is here:  http://localhost/moodle/admin/webservice/documentation.php
// tb:  create a token here:  http://localhost/moodle/admin/webservice/tokens.php
// tb:  admin/services/webservices/add function

// tb:  to get a token:
//       http://localhost/moodle/login/token.php?username=tberend&password=miche11e&service=moodle_mobile_app

/**
 * JAVASCRIPT client for Moodle 2.2 or later
 *
 * @authorr Jerome Mouneyrac
 */
?>

<html>

<head>
  <script type="text/javascript">
    document.addEventListener("DOMContentLoaded", function() {
      var domainname = 'http://localhost/moodle';


      // start by getting a token
      let adminServerUrl = domainname + '/admin/webservice/tokens.php';


// tb:  create a token here:  http://localhost/moodle/admin/webservice/tokens.php

// tb:  or call http://localhost/moodle/login/token.php?username=tberend&password=miche11e&service=moodle_mobile_app


      var token = '760ed1fbee1280b887e6628691cca74e'; // tom berend's token


      let functionname = 'mod_mathcode_view_page';
      let serverUrl = domainname + '/webservice/rest/server.php';


      let formData = new FormData(); // Currently empty

      formData.append('wstoken', token)
      formData.append('wsfunction', functionname)
      formData.append('moodlewsrestformat', 'json')
      formData.append('pageid', 1)




      function reqListener() {
        console.log(this.responseText);
      }

      var oReq = new XMLHttpRequest();
      oReq.addEventListener("load", reqListener);
      oReq.open("POST", serverUrl);
      oReq.send(formData);


    });
  </script>
</head>

<body>
  Check your Javascript console for the "responseText" value.
</body>

</html>