<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once 'Database.php';
include_once 'Kcal.php';
include_once 'Total.php';
include_once 'Account.php';

$KcalArray = array();


$database = new Database();
$db = $database->getConnection();

$Total = new Total($db);
$dailyKcal = new Kcal($db);
$account = new Account($db);
$stmtAllIds = $dailyKcal->getAllLoginId();
$rowsCountIds= $stmtAllIds->rowCount();
if($rowsCountIds>0){
    $ids= $stmtAllIds->fetchAll();
    foreach ($ids as $id){
        $KcalArrayTmp = array();
        $KcalArrayTmp["user"]=$account->getLoginById($id["login_id"]);
        $stmtKcTot = $Total->getTotalKcal($id["login_id"]);
        $KcalArrayTmp["total"] = $stmtKcTot->fetch()["kcalTot"];
        $stmtDkcal = $dailyKcal->getDailyKcal($id["login_id"]);
        $rowsCountDaily= $stmtDkcal->rowCount();
        if($rowsCountDaily > 0){
            $rows = $stmtDkcal->fetchAll();
            foreach ($rows as $row){
                $value = $row["number"];
                $KcalArrayTmp["todayValue"] = $value;
            }
        }
        else{
            http_response_code(404);
            echo json_encode(
                array("message" => "No record found.")
            );
        }
        if(isset($_GET["dateStart"])) {
            $stmtDate = $dailyKcal->getKcalFromDate($_GET["dateStart"],$id["login_id"]);
            $rowsCountDate = $stmtDate->rowCount();
            if ($rowsCountDate > 0) {
                $sumKcal = 0;
                $rows = $stmtDate->fetchAll();
                foreach ($rows as $row) {
                    $sumKcal += $row["number"];
                }
                $KcalArrayTmp["onDate"] = $sumKcal;
            }
        }
        array_push($KcalArray,$KcalArrayTmp);
    }
}


$json = json_encode($KcalArray);
echo $json;