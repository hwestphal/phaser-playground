<?php

define("_KELLER", true); // this is a valid entry point

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include "config.php"; // bring in Discord secret keys
include 'utilities.php'; // won't die because keller is defined

include '../../vendor/autoload.php';

////////////////////

echo "hello $user <br>";

//////////////////////////////////////////////////
/////// document what we saw coming in ///////////
$method = "";

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        $the_request = &$_GET;
        $method = 'Get:';
        break;
    case 'POST':
        $the_request = &$_POST;
        $method = 'Post:';
        break;

    // Etc.
    default:
        $method = "Other({$_SERVER['REQUEST_METHOD']}):";
}
writeDebugLog($method . ' request received', serialize($the_request));

//////////////////////////////////////////////////
/////// call the Discord server        ///////////

use RestCord\DiscordClient;

$client = new DiscordClient(['token' => $discordBot]); // Token is required

$embed_color = 'red';
$title = "Hello, I'm a Bot";
$message = "I'm alive. Yip Yip.";
$token = $discordSecret;


// echo "about to post a message to a workspace";
// $result = postToDiscord($embed_color, $title, $message, $discordBot, $discordWebHook);
// echo "got back " . serialize($result);


echo "<br>about to create a message";
$msg = $client->channel->createMessage(
    [
        'channel.id' => $discordGuildID,
        'content'    => 'Something real',
    ]
);
var_dump($msg);


echo "<br><br>about to edit that message";
$client->channel->editMessage(
    [
        'channel.id' => $discordGuildID,
        'message.id' => intval($msg['id']),
        'content'    => 'Something edited',
    ]
);


echo "<br><br>about to ask for a list of members";
$users = $client->guild->listGuildMembers(['guild.id' => $discordGuildID, 'limit' => 25]);
var_dump ($users);   //$user[0]->user->id);


echo "<br><br>about to ask for user info";
$user = $client->user->getCurrentUser($parameters);
var_dump ($users);   //$user[0]->user->id);



function postToDiscord($embed_color, $title, $message, $token, $webHook)
{

    $hookObject = json_encode(
        ["content" => $message,
            "tts" => false,
            "embed" => [
                "title" => "Hello, Embed!",
                "description" => "This is an embedded message.",
            ],

        ], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_NUMERIC_CHECK);
    // echo "<br>", $hookObject;

    $options = [
        'http' => [
            'method' => 'POST',
            'header' => 'Content-Type: application/json',
            'content' => $hookObject
        ]
    ];

    $context = stream_context_create($options);
    $result = file_get_contents($webHook, false, $context);
}


function sendDM(){

    $hookObject = json_encode(
    [
        "name"=>"Some test channel",
        "icon"=> null,
        "recipients"=> [
            "username"=> "tom.berend",
            "discriminator"=> "5834",
            "id"=> $discordTomID,
            "avatar"=> "33ecab261d4681afa4d85a04691c4a01"
        ]
        "type": 3,
        "id": "319674150115710528",
        "owner_id": "82198810841029460"
      }
}



//var_dump($discord->guild->getGuild(['guild.id' => $discordGuildID]));

// var_dump($discord->oauth2->getCurrentApplicationInformation($parameters));

//var_dump($discord->guild->getGuild(['guild.id' => $discordGuildID]));


///////////////////////////////

// to send a DM (this is python...)

// user = await client.get_user_info(' their ID')
// and then you can do
// await client.send_message(user, " hello , i'm a bot")
