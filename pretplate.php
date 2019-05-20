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

  // echo 'Endpoint je ' . $subscription['endpoint'] . "\n";
  // echo 'publicKey je ' . $subscription['publicKey'] . "\n";
  // echo 'Auth je ' . $subscription['authToken'] . "\n";
  $endpoint = $subscription['endpoint'];
  $token = $subscription['authToken'];
  $key = $subscription['publicKey'];
  $id = $_SESSION['id_stud'];
  try {
      $db = DB::getConnection();
      $st2 = $db->prepare("INSERT INTO pretplate(id_studenta, endpoint, p256dh, auth)
                            VALUES ('$id','$endpoint', '$key', '$token')");
      $st2->execute();
       echo "ubacio";
    }
    catch( PDOException $e ) { exit( 'PDO error ' . $e->getMessage() ); }
 ?>
