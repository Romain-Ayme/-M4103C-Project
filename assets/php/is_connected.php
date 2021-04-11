<?php
session_start();

$obj = new stdClass();
$obj->result = true;

if (isset($_SESSION["user_id"])) {
  $obj->is_connected = true;
}
else {
  $obj->is_connected = false;
}

if (isset($_SESSION["message"])) {
  $obj->message = $_SESSION["message"];
  unset($_SESSION["message"]);
}

//$obj->is_connected = isset($_SESSION["user_id"]);

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');

echo json_encode($obj);