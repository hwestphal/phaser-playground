<?php

//     http://localhost/baby/baby-playground/src/createPlanetCute.php

// tsc planetcute.ts -module commonjs -d

// copy the js to the /lib directory
// copy the contents of planetcute.t.ds into extraLibs/mathcode.t.ds


ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

convertToBASE64();

//////////////////////////
/// utility to convert png files to BASE64
function convertToBASE64()
{
    $directory = '../../PlanetCutePNG';
    $aFiles = scandir($directory);
    // printNice($aFiles);

    $imgFile = '';
    $imgFile .= "\nexport class PlanetCute{";

    $mapFile = '';
    $mapFile .= "\nexport declare class PlanetCute {";

    foreach ([1, 2] as $pass) {

        if ($pass == 2) {   // some stuff to do between pass1 and pass2

            $mapFile .= "\n} \n";       // close it all off
            file_put_contents('planetcute.d.ts', $mapFile);

            $imgFile .= "\nconstructor(){";
        }


        foreach ($aFiles as $file) {
            if (substr($file, 0, 1) == '.')
                continue;

            $path = $directory . '/' . $file;
            $type = pathinfo($path, PATHINFO_EXTENSION);
            $data = file_get_contents($path);
            $base64 = 'data:image/' . $type . ';base64,' . base64_encode($data);

            // convert 'Brown Bear.png' to 'BrownBear'
            $shortFileName = str_replace(' ', '', $file);
            $shortFileName = substr($shortFileName, 0, strpos($shortFileName, '.'));

            if ($pass == 1) {
                $mapFile .= "\n$shortFileName: HTMLImageElement;";
                $imgFile .= "\n$shortFileName:HTMLImageElement = new Image()";  // declaration
            } else {
                $imgFile .= "\nthis.$shortFileName.src = '$base64';";
            }
            echo "<br>$shortFileName";
        }

        // printNice($imgFile);
    }
    $imgFile .= "\n} \n} \n";       // close it all off
    file_put_contents('planetcute.ts', $imgFile);
}
