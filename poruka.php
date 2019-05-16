<?php
require_once 'db.class.php';
require __DIR__ . '/vendor/autoload.php';
use Minishlink\WebPush\WebPush;
use Minishlink\WebPush\Subscription;
session_start();

$message = [];
$pretplate = array();
/*try {
    $db = DB::getConnection();
    $st1 = $db->prepare('SELECT * FROM pretplate WHERE id_studenta=:id_studenta');
    $st1->execute(array('id_studenta' => $_SESSION['id_studenta']));
  }
  catch( PDOException $e ) { exit( 'PDO error ' . $e->getMessage() ); }
//popunjavanje polja sa id-evima studenata
while($row1 = $st1->fetch()) {
  $pretplate[] = $row1['endpoint'];
}*/

$subscription = Subscription::create(json_decode(file_get_contents('php://input'), true));


$auth = array(
  'VAPID' => array(
      'subject' => 'https://github.com/Minishlink/web-push-php-example/',
      'publicKey' => file_get_contents(__DIR__ . '/keys/public_key.txt'),
      'privateKey' => file_get_contents(__DIR__ . '/keys/private_key.txt'),
  ),
);

$webPush = new WebPush($auth);
//for($i = 0; $i < count($pretplate); $i++) {
  //$subscription = file_get_contents('php://input');
  $res = $webPush->sendNotification(
    $subscription,
    $_SESSION['ime_studenta']." , upisani su Vam novi bodovi iz kolegija ".$_SESSION['ime_kolegija']
  );
//}


// handle eventual errors here, and remove the subscription from your server if it is expired
foreach ($webPush->flush() as $report) {
  $endpoint = $report->getRequest()->getUri()->__toString();

  if ($report->isSuccess()) {
      echo "[v] Message sent successfully for subscription {$endpoint}.";
  } else {
      echo "[x] Message failed to sent for subscription {$endpoint}: {$report->getReason()}";
  }
}
 ?>
