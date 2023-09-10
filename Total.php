<?php
class Total
{
    private $conn;
    private $db_table = "Total";

    public $kcalTot;
    public function __construct($db)
    {
        $this->conn = $db;
    }
    public function getTotalKcal($loginId)
    {
        $sqlQuery = "SELECT kcalTot FROM " . $this->db_table . " WHERE login_id = :login";
        $stmt = $this->conn->prepare($sqlQuery);
        $stmt->bindParam(":login", $loginId);
        $stmt->execute();
        return $stmt;
    }
}
