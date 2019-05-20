<?php
require_once 'db.class.php';
require __DIR__ . '/vendor/autoload.php';
use Minishlink\WebPush\WebPush;
use Minishlink\WebPush\Subscription;
session_start();

  $data = file_get_contents('php://input');
  //echo $data ."<br />";
  $data_array = array();
  $data_array = explode('"', $data);
  $id_studenta = $data_array[3];
  $id_kolegija = $data_array[7];
  $bodovi = $data_array[11];
  $elt = $data_array[15];

  echo "id s ".$id_studenta."<br/>";
  echo "id k ".$id_kolegija."<br/>";
  echo "elt ".$elt."<br/>";
  echo "bodovi ".$bodovi."<br/>";

  /*echo "a0 " .$a[0] ."<br />";
  //echo "id kolegija ".preg_replace( '/[^\d]/', '', $a[0]) ."<br />";
  echo "a1 ".$a[1] ."<br />";
  echo "id studenta ".preg_replace( '/[^\d]/', '', $a[1]) ."<br />";
  echo "a2 ".$a[2] ."<br />";
  echo "id kolegija ".preg_replace( '/[^\d]/', '', $a[2]) ."<br />";
  echo "a3 ".$a[3] ."<br />";
  echo "bodovi ".preg_replace( '/[^\d]/', '', $a[3]) ."<br />";
  echo "a3 ".$a[4] ."<br />";
  echo "elt ".array_slice($a[4], 1) ."<br />";
  echo $_POST['id_kolegija'];
  $bodovi = $_GET['bodovi'];
  $elt = $_GET['elt'];
  $id_kolegija = $_GET['id_kolegija_Rez'];
  $id_studenta = $_GET['id_studenta'];*/
  $_SESSION['id_studenta'] = $id_studenta;
  $message = [];
  //spajanje na bazu kolegiji da saznamo ime kolegija
  try {
      $db = DB::getConnection();
      $st3 = $db->prepare('SELECT * FROM kolegiji WHERE kolegij_id=:kolegij_id');
      $st3->execute(array('kolegij_id' => $id_kolegija));
    }
    catch( PDOException $e ) { exit( 'PDO error ' . $e->getMessage() ); }
  //popunjavanje polja sa id-evima studenata
  while($row3 = $st3->fetch()) {
    $_SESSION['ime_kolegija'] = $row3['naziv_kolegija'];
  }
  //spajanje na bazu kolegiji da saznamo ime studenta
  try {
      $db = DB::getConnection();
      $st4 = $db->prepare('SELECT ime FROM studenti WHERE student_id=:student_id');
      $st4->execute(array('student_id' => $id_studenta));
    }
    catch( PDOException $e ) { exit( 'PDO error ' . $e->getMessage() ); }
  //popunjavanje polja sa id-evima studenata
  while($row4 = $st4->fetch()) {
    $_SESSION['ime_studenta'] = $row4['ime'];
  }
  //spajanje na bazu, tablica rezultati
  try {
      $db = DB::getConnection();
      $st5 = $db->prepare("UPDATE rezultati SET $elt = '$bodovi' WHERE student_id = '$id_studenta' AND kolegij_id = '$id_kolegija'");
      $st5->execute();
      $message['info'] = "Ubacio rezultate u bazu!";
      //poruka.php
      /*$subscription = Subscription::create(json_decode(file_get_contents('php://input'), true));

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
      }*/
    }
    catch( PDOException $e ) { exit( 'PDO error ' . $e->getMessage() ); }

 ?>
