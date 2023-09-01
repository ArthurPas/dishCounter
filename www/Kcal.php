<?php
class Kcal
{
    private $conn;
    private $db_table = "DailyKcal";
    public $dateRecord;

    public $login_id;

    public $number;
    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function getAllLoginId(){
        $sqlQuery = "SELECT DISTINCT (login_id) FROM " . $this->db_table;
        $stmt = $this->conn->prepare($sqlQuery);
        $stmt->execute();
        return $stmt;
    }
    public function getDailyKcal($loginId)
    {
        $sqlQuery = "SELECT number FROM " . $this->db_table ." WHERE dateRecord = :dateR AND login_id = :login";
        $stmt = $this->conn->prepare($sqlQuery);
        $stmt->bindParam(":dateR",date("Y-m-d"));
        $stmt->bindParam(":login",$loginId);
        $stmt->execute();
        return $stmt;
    }
    public function postDailyKcal(){
        $sqlQuery = "INSERT INTO ". $this->db_table ." (number, dateRecord,login_id) VALUES (:number, :now, :login)";
        $stmt = $this->conn->prepare($sqlQuery);
        $stmt->bindParam(":number", $this->number);
        $stmt->bindParam(":now",$this->dateRecord);
        $stmt->bindParam(":login",$this->login_id);
        try {
            $stmt->execute();
        }catch (Exception $e){
            return false;
        }
        return true;
    }
    public function getKcalFromDate($dateR, $loginId){
        $sqlQueryFromDate =  "SELECT * FROM ".$this->db_table." WHERE dateRecord >= :paraDate AND login_id = :login";
        $stmtDate = $this->conn->prepare($sqlQueryFromDate);
        $stmtDate ->bindParam(":paraDate", $dateR);
        $stmtDate->bindParam(":login",$loginId);
        $stmtDate->execute();
        return $stmtDate;
    }
}
