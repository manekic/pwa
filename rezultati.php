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
function sendErrorAndExit($messageText)
{
	$message = [];
	$message['error'] = $messageText;
	sendJSONandExit($message);
}
//ako ajaxom šaljemo username && pass
if(isset($_GET['id'])) {
  $id = $_GET['id'];
  $message = [];
  $message['rez'] = [];
  //polje za nazive kolegija
  $kolegiji = array();
  //brojač elemenata prethodnog polja
  $br = 0;
  $_SESSION['id_stud'] = $id;
  //spajanje na bazu, tablica kolegiji
  try {
      $db = DB::getConnection();
      $st = $db->prepare('SELECT naziv_kolegija FROM kolegiji');
      $st->execute();
    }
    catch( PDOException $e ) { exit( 'PDO error ' . $e->getMessage() ); }
  //popunjavanje polja sa nazivima kolegija
  while($row = $st->fetch()) {
    $kolegiji[$br++] = $row['naziv_kolegija'];
  }
  //spajanje na bazu, tablica rezultati
  try {
      $db = DB::getConnection();
      $st1 = $db->prepare('SELECT * FROM rezultati WHERE student_id=:student_id');
      $st1->execute(array('student_id' => $id));
    }
    catch( PDOException $e ) { exit( 'PDO error ' . $e->getMessage() ); }
  //podatke iz baze zapisujem u povratnu varijablu
  while($row1 = $st1->fetch()) {
    $message['rez'][] = array('ime' => $kolegiji[$row1['kolegij_id']-1], 'kol1' => $row1['1kolokvij'],
                              'kol2' => $row1['2kolokvij'], 'zavrsni' => $row1['zavrsni'], 'dz1' => $row1['1zadaca'],
                              'dz2' => $row1['2zadaca'], 'dz3' => $row1['3zadaca'],'dz4' => $row1['4zadaca']);
  }
  //slanje povratnih podataka
  sendJSONandExit($message);
}
else if(!isset($_GET['id'])){
  $message = [];
  $subscription = json_decode(file_get_contents('php://input'), true);
  if (!isset($subscription['endpoint'])) {
      echo 'Error: not a subscription';
      return;
  }

  $method = $_SERVER['REQUEST_METHOD'];

  switch ($method) {
      case 'POST':
        echo 'Endpoint je ' . $subscription['endpoint'] . "\n";
        echo 'publicKey je ' . $subscription['publicKey'] . "\n";
        echo 'Auth je ' . $subscription['authToken'] . "\n";
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
          // create a new subscription entry in your database (endpoint is unique)
          break;
      case 'PUT':
          // update the key and token of subscription corresponding to the endpoint
          break;
      case 'DELETE':
          // delete the subscription corresponding to the endpoint
          break;
      default:
          echo "Error: method not handled";
          return;
  }
  //slanje povratnih podataka
  sendJSONandExit($message);
}
else
  sendErrorAndExit("Nesto nije u redu -> vjerojatno nisi poslao trazenje podatke!");
 ?>
