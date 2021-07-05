<?php
/**
 * @package     Joomla.Site
 * @subpackage  mod_gamecode
 *
 * @copyright   Copyright (C) 2018 Tom Berend. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

defined('_JEXEC') or die;

$GLOBALS['3dDebug'] = true;

if($GLOBALS['3dDebug']){
    echo "<span style='background-color:cyan;'>In Debug Mode in 'joomla/modules/mod_gamecode.php'</span><br>";
    echo "copying '3djoomla.php'<br>";
    copy ('../3d/src/mod_gamecode/3djoomla.php', '../3d/dist/3djoomla.php');
}


// all we do is transfer to the code in /gamecode

// echo serialize(scandir("../3d/dist"));
require_once("../3d/dist/3djoomla.php");
