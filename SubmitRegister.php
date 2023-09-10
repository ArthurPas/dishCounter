<?php
//header("Access-Control-Allow-Origin: *");
//header("Content-Type: application/json; charset=UTF-8");
//header("Access-Control-Allow-Methods: POST");
//header("Access-Control-Max-Age: 3600");
//header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
include_once 'Database.php';
include_once 'Kcal.php';
include_once 'Account.php';

$database = new Database();
$db = $database->getConnection();
$account = new Account($db);
$account->login=$_POST["login"];
$account->password=$_POST["password"];
if($_POST["login"]==""){
    header('Location: https://devapascal.fr/dishCounter/page-register.html?error=noLogin');
}
else if ($_POST["password"]=""){
    header('Location: https://devapascal.fr/dishCounter/page-register.html?error=noPassword');
}
else if($account->createAccount()){
    header('Location: https://devapascal.fr/dishCounter?logedAs='.$account->login);
} else{
    header('Location: https://devapascal.fr/dishCounter/page-register.html?error=loginExist');
}
