<?php
session_start();

$obj = new stdClass();
$obj->result = true;

if (isset($_POST["username"], $_POST["password"])) {
  $username = $_POST["username"];
  $password = $_POST["password"];
  if (!empty($username) && !empty($password)) {
    // TODO database check
    if (($username == "Chuck" && $password == "Norris") || ($username == "Becky" && $password == "ph")) {
      $_SESSION["message"] = "Welcome " . $username . " !";
      $_SESSION["user_id"] = 999;
    }
    else {
      $obj->result = false;
      $obj->message = "It's Chuck Norris who doesn't want you to login";
    }
  }
  else {
    $obj->result = false;
    $obj->message = "It's Chuck Norris who doesn't want you to login";
  }
}
else {
  $obj->result = false;
  $obj->message = "It's Chuck Norris who doesn't want you to login";
}

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');

echo json_encode($obj);