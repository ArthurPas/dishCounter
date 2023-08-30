<?php
class Kcal
{
    private $conn;
    private $db_table = "DailyKcal";

    public $number;
    public $today;
    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function getDailyKcal()
    {
        $sqlQuery = "SELECT number FROM " . $this->db_table;
        $stmt = $this->conn->prepare($sqlQuery);
        $stmt->execute();
        return $stmt;
    }
    public function postDailyKcal(){
        $sqlQuery = "INSERT INTO ". $this->db_table ."(number, date) VALUES (:number, :now)";
        $stmt = $this->conn->prepare($sqlQuery);
        $stmt->bindParam(":number", $this->number);
        $stmt->bindParam(":now",$this->today);
        if($stmt->execute()){
            return true;
        }
        return false;
    }
    public function getKcalFromDate($dateR){
        $sqlQueryFromDate =  "SELECT * FROM ".$this->db_table." WHERE dateRecord <= :paraDate";
        $stmtDate = $this->conn->prepare($sqlQueryFromDate);
        $stmtDate ->bindParam(":paraDate", $dateR);
        $stmtDate->execute();
        return $stmtDate;
    }
}
