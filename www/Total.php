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
    public function getTotalKcal()
    {
        $sqlQuery = "SELECT kcalTot FROM " . $this->db_table;
        $stmt = $this->conn->prepare($sqlQuery);
        $stmt->execute();
        return $stmt;
    }
}
