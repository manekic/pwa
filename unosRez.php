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
if(isset($_GET['id_kolegija_Rez']) && !isset($_GET['id_studenta']) && !isset($_GET['elt']) && !isset($_GET['bodovi'])) {
  $id = $_GET['id_kolegija_Rez'];
  $message = [];
  $studenti = [];
  $message['studenti'] = [];
  $message['rez'] = [];
  //spajanje na bazu, tablica rezultati -> dohvaćanje id-eva svih studenata
  try {
      $db = DB::getConnection();
      $st1 = $db->prepare('SELECT * FROM rezultati WHERE kolegij_id=:kolegij_id');
      $st1->execute(array('kolegij_id' => $id));
    }
    catch( PDOException $e ) { exit( 'PDO error ' . $e->getMessage() ); }
  //popunjavanje polja sa id-evima studenata
  while($row1 = $st1->fetch()) {
    $studenti[] = $row1['student_id'];
    $message['rez'][] = array('id' => $row1['student_id'], 'kol1' => $row1['1kolokvij'],
                              'kol2' => $row1['2kolokvij'], 'zavrsni' => $row1['zavrsni'], 'dz1' => $row1['1zadaca'],
                              'dz2' => $row1['2zadaca'], 'dz3' => $row1['3zadaca'],'dz4' => $row1['4zadaca']);
  }
  //spajanje na bazu, tablica studenti
  try {
      $db = DB::getConnection();
      $st2 = $db->prepare('SELECT * FROM studenti');
      $st2->execute();
    }
    catch( PDOException $e ) { exit( 'PDO error ' . $e->getMessage() ); }
  //popunjavanje polja sa id-evima studenata
  while($row2 = $st2->fetch()) {
    for($i = 0; $i < count($studenti); $i++) {
      if($studenti[$i] === $row2['student_id'])
        $message['studenti'][] = array('ime' => $row2['ime'], 'prezime' => $row2['prezime'], 'id' => $row2['student_id']);
    }
  }
  //slanje povratnih podataka
  sendJSONandExit($message);
}
else if(isset($_GET['id_kolegija_Rez']) && isset($_GET['id_studenta']) && isset($_GET['elt']) && isset($_GET['bodovi'])) {
  $bodovi = $_GET['bodovi'];
  $elt = $_GET['elt'];
  $id_kolegija = $_GET['id_kolegija_Rez'];
  $id_studenta = $_GET['id_studenta'];
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
      /*$db = DB::getConnection();
      $st5 = $db->prepare("UPDATE rezultati SET $elt = '$bodovi' WHERE student_id = '$id_studenta' AND kolegij_id = '$id_kolegija'");
      $st5->execute();
      $message['info'] = "Ubacio rezultate u bazu!";*/
      //poruka.php
    }
    catch( PDOException $e ) { exit( 'PDO error ' . $e->getMessage() ); }
    //slanje povratnih podataka
    sendJSONandExit($message);
}
else {
  echo "ovdje sam sada";
  sendErrorAndExit("Nesto nije u redu -> vjerojatno nisi poslao trazene podatke!");
}

 ?>
