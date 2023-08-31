<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
include_once 'Database.php';
include_once 'Kcal.php';
$database = new Database();
$db = $database->getConnection();
$kcal = new Kcal($db);
$account = new Account($db);

$account->login = $_GET["login"];
$loginId = $account->getIdByLogin();

$kcal->number = intval($_GET["kcal"]);
$kcal->dateRecord= date("Y-m-d");
$kcal->login_id=$loginId;

if ($kcal->postDailyKcal()) {
    echo '{';
    echo '"message": "Data sent"';
    echo '}';
}
else {
    echo '{';
    echo '"message": "Unable to sent data."';
    echo '}';
}

