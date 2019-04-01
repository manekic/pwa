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
if(!isset($_GET['id_studenta']) && !isset($_GET['id_kolegija'])) {
  $message = [];
  $message['studenti'] = [];
  //spajanje na bazu, tablica studenti
  try {
      $db = DB::getConnection();
      $st = $db->prepare('SELECT * FROM studenti');
      $st->execute();
    }
    catch( PDOException $e ) { exit( 'PDO error ' . $e->getMessage() ); }
  //popunjavanje polja sa nazivima kolegija
  while($row = $st->fetch()) {
    if($row['username'] != "admin")
      $message['studenti'][] = array('ime' => $row['ime'], 'prezime' => $row['prezime'], 'id' => $row['student_id']);
  }
  //slanje povratnih podataka
  sendJSONandExit($message);
}
else if(!isset($_GET['id_kolegija']) && isset($_GET['id_studenta'])) {
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
      $st1 = $db->prepare('SELECT naziv_kolegija FROM kolegiji');
      $st1->execute();
    }
    catch( PDOException $e ) { exit( 'PDO error ' . $e->getMessage() ); }
  //popunjavanje polja sa nazivima kolegija
  while($row1 = $st1->fetch()) {
    $kolegiji[$br++] = $row1['naziv_kolegija'];
    $message['kolegiji'][] = array('ime' => $row1['naziv_kolegija']);
  }
  //spajanje na bazu, tablica rezultati
  try {
      $db = DB::getConnection();
      $st2 = $db->prepare('SELECT * FROM rezultati WHERE student_id=:student_id');
      $st2->execute(array('student_id' => $id));
    }
    catch( PDOException $e ) { exit( 'PDO error ' . $e->getMessage() ); }
  //podatke iz baze zapisujem u povratnu varijablu
    while($row2 = $st2->fetch()) {
      $message['upisani'][] = array('ime' => $kolegiji[$row2['kolegij_id']-1]);
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
      $st3 = $db->prepare('SELECT student_id, kolegij_id FROM rezultati WHERE student_id=:student_id AND kolegij_id=:kolegij_id');
      $st3->execute(array('student_id' => $id_studenta, 'kolegij_id' => $id_kolegija));
    }
  catch( PDOException $e ) { exit( 'PDO error ' . $e->getMessage() ); }
  while($row3 = $st3->fetch()) {
    try {
        $db = DB::getConnection();
        $st4 = $db->prepare( "DELETE FROM rezultati WHERE student_id = '$id_studenta' AND kolegij_id = '$id_kolegija'" );
        $st4->execute();
        $message['info'] ="obrisao";
    }
    catch( PDOException $e ) { exit( 'PDO error ' . $e->getMessage() ); }
  }
  //slanje povratnih podataka
  sendJSONandExit($message);
}
else
  sendErrorAndExit("Nesto nije u redu -> vjerojatno nisi poslao trazenje podatke!");
 ?>
