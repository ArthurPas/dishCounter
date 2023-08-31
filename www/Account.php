<?php

class Account
{
    private $conn;
    private $db_table = "Account";
    public $id;

    public $login;

    public $password;
    public function __construct($db)
    {
        $this->conn = $db;
    }
    public function getIdByLogin(){
        $sqlQuery = "SELECT id FROM ". $this->db_table ." WHERE login= :login";
        $stmt = $this->conn->prepare($sqlQuery);
        $stmt->bindParam(":login", $this->login);
        if($stmt->execute()){
            return intval($stmt->fetch()["id"]);
        }
        return 0;
    }
    public function getLoginById($id){
        $sqlQuery = "SELECT login FROM ". $this->db_table ." WHERE id = :id";
        $stmt = $this->conn->prepare($sqlQuery);
        $stmt->bindParam(":id", $id);
        if($stmt->execute()){
            return $stmt->fetch()["login"];
        }
        return "unknown";
    }
}