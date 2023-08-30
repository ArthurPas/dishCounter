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
$stmtDkcal = $dailyKcal->getDailyKcal();
$rowsCount = $stmtDkcal->rowCount();
$stmtKcTot = $Total->getTotalKcal();
$nbTotalKcal = $stmtKcTot->fetch()["kcalTot"];
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

if(isset($_GET["dateStart"])) {
    $stmtDate = $dailyKcal->getKcalFromDate($_GET["dateStart"]);
    $rowsCountDate = $stmtDate->rowCount();
    if ($rowsCountDate > 0) {
        $sumKcal = 0;
        $rows = $stmtDate->fetchAll();
        foreach ($rows as $row) {
            $sumKcal += $row["number"];
        }
        $KcalArray["kcal"]["onDate"] = $sumKcal;
    } else {
        echo("non");
    };
}

$json = json_encode($KcalArray);
echo $json;