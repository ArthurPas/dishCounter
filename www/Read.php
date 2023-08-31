<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once 'Database.php';
include_once 'Kcal.php';
include_once 'Total.php';

$KcalArray = array();


$database = new Database();
$db = $database->getConnection();

$Total = new Total($db);
$dailyKcal = new Kcal($db);

$stmtAllIds = $dailyKcal->getAllLoginId();
$rowsCountIds= $stmtAllIds->rowCount();
if($rowsCountIds>0){
    $ids= $stmtAllIds->fetchAll();
    foreach ($ids as $id){
        $KcalArray["user".$id["login_id"]] = array();
        $KcalArray["user".$id["login_id"]]["kcal"] = array();
        $stmtKcTot = $Total->getTotalKcal($id["login_id"]);
        $KcalArray["user".$id["login_id"]]["kcal"]["total"] = $stmtKcTot->fetch()["kcalTot"];
        $stmtDkcal = $dailyKcal->getDailyKcal($id["login_id"]);
        $rowsCountDaily= $stmtDkcal->rowCount();
        if($rowsCountDaily > 0){
            $rows = $stmtDkcal->fetchAll();
            foreach ($rows as $row){
                $value = $row["number"];
                $KcalArray["user".$id["login_id"]]["kcal"]["value"] = $value;
            }
        }
        else{
            http_response_code(404);
            echo json_encode(
                array("message" => "No record found.")
            );
        }
//        if(isset($_GET["dateStart"])) {
//            $stmtDate = $dailyKcal->getKcalFromDate($_GET["dateStart"]);
//            $rowsCountDate = $stmtDate->rowCount();
//            if ($rowsCountDate > 0) {
//                $sumKcal = 0;
//                $rows = $stmtDate->fetchAll();
//                foreach ($rows as $row) {
//                    $sumKcal += $row["number"];
//                }
//                $KcalArray["user".$id["login_id"]]["kcal"]["onDate"] = $sumKcal;
//            }
//        }
    }
}


$json = json_encode($KcalArray);
echo $json;