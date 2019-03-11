<?php
require_once 'db.class.php';
/*
INPUT:
$_GET['username'] = username korisnika
$_GET['pass'] = pass korisnika

OUTPUT: JSON
{
  info = varijabla koja kaze je li prijava uspjela
  rez = rezultati ispita dostupni u bazi
}
ili
{
  error = poruka o greški.
}
*/

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
//isset($_GET['i']) && isset($_GET['p'])
//
if(!isset($_GET['id_kolegija'])) {
  $id = $_GET['id_studenta'];
  $message = [];
  $message['rez'] = [];
  $message['kolegiji'] = [];
  $message['upisani'] = [];
  //polje za nazive kolegija
  $kolegiji = array();
  //brojač elemenata prethodnog polja
  $br = 0;
  $flag = false;

  //spajanje na bazu, tablica kolegiji
  try {
      $db = DB::getConnection();
      $st1 = $db->query('SELECT naziv_kolegija FROM kolegiji');
    }
    catch( PDOException $e ) { exit( 'PDO error ' . $e->getMessage() ); }
  //popunjavanje polja sa nazivima kolegija
  foreach($st1->fetchAll() as $row1) {
    $kolegiji[$br++] = $row1['naziv_kolegija'];
    $message['kolegiji'][] = array('ime' => $row1['naziv_kolegija']);
  }
  //spajanje na bazu, tablica rezultati
  try {
      $db = DB::getConnection();
      $st2 = $db->query('SELECT * FROM rezultati');
    }
    catch( PDOException $e ) { exit( 'PDO error ' . $e->getMessage() ); }
  //podatke iz baze zapisujem u povratnu varijablu
  foreach($st2->fetchAll() as $row2) {
    if($row2['student_id'] === $id) {
      $message['upisani'][] = array('ime' => $kolegiji[$row2['kolegij_id']-1]);
    }
  }
  //slanje povratnih podataka
  sendJSONandExit($message);
}
else if(isset($_GET['id_kolegija']) && isset($_GET['id_studenta'])) {
  $id_kolegija = $_GET['id_kolegija'];
  $id_studenta = $_GET['id_studenta'];
  $message = [];
  try {
      $db = DB::getConnection();
      $st3 = $db->query('SELECT student_id, kolegij_id FROM rezultati');
    }
  catch( PDOException $e ) { exit( 'PDO error ' . $e->getMessage() ); }
  foreach($st3->fetchAll() as $row3) {
    if($row3['student_id'] === $id_studenta && $row3['kolegij_id'] === $id_kolegija) {
      try {
          $db = DB::getConnection();
          $st4 = $db->prepare( "DELETE FROM rezultati WHERE student_id = '$id_studenta' AND kolegij_id = '$id_kolegija'" );
          $st4->execute();
          $message['info'] ="obrisao";
      }
      catch( PDOException $e ) { exit( 'PDO error ' . $e->getMessage() ); }
      }
    }
  //slanje povratnih podataka
  sendJSONandExit($message);
}

else
  sendErrorAndExit("Nesto nije u redu -> vjerojatno nisi poslao trazenje podatke!");
 ?>
