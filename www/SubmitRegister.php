<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
include_once 'Database.php';
include_once 'Kcal.php';
include_once 'Account.php';

$database = new Database();
$db = $database->getConnection();
$account = new Account($db);
$account->login=$_POST["login"];
$account->password=$_POST["password"];
echo '{';
if($account->createAccount()){
    echo '"message": "success"';
    echo '}';
} else{
    echo '"message": "error"';
    echo '}';
    header('Location: https://devapascal.fr/page-register?error=loginExist');
}
