<?php
include_once 'Database.php';
include_once 'Kcal.php';
include_once 'Account.php';

$database = new Database();
$db = $database->getConnection();
$account = new Account($db);
$account->login = $_POST["login"];
$account->password = $_POST["password"];
if ($account->validateLogs()) {
    header('Location: https://devapascal.fr?logedAs=' . $account->login);
} else {
    header('Location: https://devapascal.fr/page-login.html?error=badCredentials');
}
