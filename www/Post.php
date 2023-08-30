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
$item = new Kcal($db);
$item->number = intval($_GET["kcal"]);
$item->dateRecord= date("Y-m-d");

if ($item->postDailyKcal()) {
    echo '{';
    echo '"message": "Data sent"';
    echo '}';
}
else {
    echo '{';
    echo '"message": "Unable to sent data."';
    echo '}';
}

