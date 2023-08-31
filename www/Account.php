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
            return true;
        }
        return false;
    }

}