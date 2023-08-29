<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once 'Database.php';
include_once 'Kcal.php';
include_once 'Total.php';

$database = new Database();
$db = $database->getConnection();
$Total = new Total($db);
$dailyKcal = new Kcal($db);
$stmtDkcal = $dailyKcal->getTestKcal();
$rowsCount = $stmtDkcal->rowCount();
$stmtKcTot = $Total->getTotalKcal();
$nbTotalKcal = $stmtKcTot->fetcth()["kcalTot"];
$KcalArray = array();
$KcalArray["kcal"] = array();

if($rowsCount > 0){

    $rows = $stmtDkcal->fetchAll();
    foreach ($rows as $row){
        $value = $row["number"];
        $KcalArray["kcal"]["value"] = $value;
    }

}
else{
    http_response_code(404);
    echo json_encode(
        array("message" => "No record found.")
    );
}
$KcalArray["kcal"]["total"] = $nbTotalKcal;
$json = json_encode($KcalArray);
echo $json;
