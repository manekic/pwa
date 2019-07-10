<?php
require_once 'db.class.php';
require __DIR__ . '/vendor/autoload.php';
use Minishlink\WebPush\WebPush;
use Minishlink\WebPush\Subscription;
session_start();

$subscription = json_decode(file_get_contents('php://input'), true);
if (!isset($subscription['endpoint'])) {
  echo 'Error: not a subscription';
  return;
}

$endpoint = $subscription['endpoint'];
$auth = $subscription['authToken'];
$p256dh = $subscription['publicKey'];
$id_studenta = $_SESSION['id_stud'];

    try {
        $db = DB::getConnection();
        $st2 = $db->prepare("INSERT INTO pretplate(id_studenta, endpoint, 
                                                   p256dh, auth)
                              VALUES (:id_studenta, :endpoint, :p256dh, :auth)");
        $st2->execute(array('id_studenta' => $id_studenta, 'endpoint' => $endpoint, 'p256dh'=> $p256dh, 
                      'auth' => $auth));
         echo "ubacio";
      }
      catch( PDOException $e ) { exit( 'PDO error ' . $e->getMessage() ); }
?>