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
$item->today= date("Y-m-d");

// create the department
if ($item->postTestKcal()) {
    echo '{';
    echo '"message": "Department was created."';
    echo '}';
}

// if unable to create the department, tell the user
else {
    echo '{';
    echo '"message": "Unable to create department."';
    echo '}';
}

