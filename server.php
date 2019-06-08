<?php
require_once 'db.class.php';
require __DIR__ . '/vendor/autoload.php';
use Minishlink\WebPush\WebPush;
use Minishlink\WebPush\Subscription;
session_start();

  function sendJSONandExit($message)
  {
      // Kao izlaz skripte pošalji $message u JSON formatu i prekini izvođenje.
      header('Content-type:application/json;charset=utf-8');
      echo json_encode($message);
      flush();
      exit(0);
  }
  $data = json_decode(file_get_contents('php://input'), true);
  $id_studenta = $data['id_studenta'];
  $id_kolegija = $data['id_kolegija'];
  $bodovi = $data['bodovi'];
  $elt = $data['elt'];
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
    $message['ime_kolegija'] = $row3['naziv_kolegija'];
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
    $message['ime'] = $_SESSION['ime_studenta'];
  }
  //spajanje na bazu, tablica rezultati
  try {
    if($elt == "1kolokvij") {
      $db = DB::getConnection();
      $st5 = $db->prepare("UPDATE rezultati SET 1kolokvij = '$bodovi' WHERE student_id =:student_id AND kolegij_id =:kolegij_id");
      $st5->execute(array('student_id' => $id_studenta, 'kolegij_id' => $id_kolegija));
      $message['info'] = "Ubacio rezultate u bazu, stupac 1kolokvij!";
    }
    if($elt == "2kolokvij") {
      $db = DB::getConnection();
      $st5 = $db->prepare("UPDATE rezultati SET 2kolokvij = '$bodovi' WHERE student_id =:student_id AND kolegij_id =:kolegij_id");
      $st5->execute(array('student_id' => $id_studenta, 'kolegij_id' => $id_kolegija));
      $message['info'] = "Ubacio rezultate u bazu, stupac 2kolokvij!";
    }
    if($elt == "zavrsni") {
      $db = DB::getConnection();
      $st5 = $db->prepare("UPDATE rezultati SET zavrsni = '$bodovi' WHERE student_id =:student_id AND kolegij_id =:kolegij_id");
      $st5->execute(array('student_id' => $id_studenta, 'kolegij_id' => $id_kolegija));
      $message['info'] = "Ubacio rezultate u bazu, stupac zavrsni!";
    }
    if($elt == "1zadaca") {
      $db = DB::getConnection();
      $st5 = $db->prepare("UPDATE rezultati SET 1zadaca = '$bodovi' WHERE student_id =:student_id AND kolegij_id =:kolegij_id");
      $st5->execute(array('student_id' => $id_studenta, 'kolegij_id' => $id_kolegija));
      $message['info'] = "Ubacio rezultate u bazu, stupac 1zadaca!";
    }
    if($elt == "2zadaca") {
      $db = DB::getConnection();
      $st5 = $db->prepare("UPDATE rezultati SET 2zadaca = '$bodovi' WHERE student_id =:student_id AND kolegij_id =:kolegij_id");
      $st5->execute(array('student_id' => $id_studenta, 'kolegij_id' => $id_kolegija));
      $message['info'] = "Ubacio rezultate u bazu, stupac 2zadaca!";
    }
    if($elt == "3zadaca") {
      $db = DB::getConnection();
      $st5 = $db->prepare("UPDATE rezultati SET 3zadaca = '$bodovi' WHERE student_id =:student_id AND kolegij_id =:kolegij_id");
      $st5->execute(array('student_id' => $id_studenta, 'kolegij_id' => $id_kolegija));
      $message['info'] = "Ubacio rezultate u bazu, stupac 3zadaca!";
    }
    if($elt == "4zadaca") {
      $db = DB::getConnection();
      $st5 = $db->prepare("UPDATE rezultati SET 4zadaca = '$bodovi' WHERE student_id =:student_id AND kolegij_id =:kolegij_id");
      $st5->execute(array('student_id' => $id_studenta, 'kolegij_id' => $id_kolegija));
      $message['info'] = "Ubacio rezultate u bazu, stupac 4zadaca!";
    }
   }
    catch( PDOException $e ) { exit( 'PDO error ' . $e->getMessage() ); }
    //poruka.php
    try {
        $db = DB::getConnection();
        $st1 = $db->prepare('SELECT * FROM pretplate WHERE id_studenta=:id_studenta');
        $st1->execute(array('id_studenta' => $id_studenta));
        $message['pretplate'] = "yas";
      }
      catch( PDOException $e ) { exit( 'PDO error ' . $e->getMessage() ); }

      while($row1 = $st1->fetch()) {
        $message['w'] = "yas1";
        $subscription = Subscription::create(
        [
          "endpoint" => $row1['endpoint'],
          "keys" => [
            'p256dh' => $row1['p256dh'],
            'auth' => $row1['auth']
          ]
        ]);

        $auth = array(
          'VAPID' => array(
              'subject' => 'https://github.com/Minishlink/web-push-php-example/',
              'publicKey' => file_get_contents(__DIR__ . '/keys/public_key.txt'),
              'privateKey' => file_get_contents(__DIR__ . '/keys/private_key.txt'),
          ),
        );

        $webPush = new WebPush($auth);
          $res = $webPush->sendNotification(
            $subscription,
            $_SESSION['ime_studenta']." , upisani su Vam novi bodovi iz kolegija ".$_SESSION['ime_kolegija']
          );

        foreach ($webPush->flush() as $report) {
          $endpoint = $report->getRequest()->getUri()->__toString();

          if ($report->isSuccess())
              echo "[v] Message sent successfully for subscription {$endpoint}.";
          else
              echo "[x] Message failed to sent for subscription {$endpoint}: {$report->getReason()}";
        }
    }

 ?>
