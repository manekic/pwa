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
if(!isset($_GET['id_kolegija'])) {
  $message = [];
  $message['rez'] = [];
  $message['kolegiji'] = [];
  $message['upisani'] = [];
  $id = $_GET['id_studenta'];
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
else if(isset($_GET['id_kolegija'])) {
  $id_studenta = $_GET['id_studenta'];
  $id_kolegija = $_GET['id_kolegija'];
	$message = [];
  $flag = false;
  try {
      $db = DB::getConnection();
      $st1 = $db->query('SELECT student_id, kolegij_id FROM rezultati');
    }
  catch( PDOException $e ) { exit( 'PDO error ' . $e->getMessage() ); }
  foreach($st1->fetchAll() as $row1) {
    if($row1['student_id'] === $id_studenta && $row1['kolegij_id'] === $id_kolegija) {
      $flag = true;
      try {
          $db = DB::getConnection();
          $st2 = $db->prepare( "DELETE FROM rezultati WHERE student_id = '$id_studenta' AND kolegij_id = '$id_kolegija'" );
          $st2->execute();
          $message['info'] ="obrisao";
      }
      catch( PDOException $e ) { exit( 'PDO error ' . $e->getMessage() ); }
      }
    }
    if($flag === false) {
      try {
          $db = DB::getConnection();
          $st3 = $db->prepare( 'INSERT INTO rezultati(student_id, kolegij_id)
                                VALUES (:student_id, :kolegij_id)' );
          $st3->execute( array('student_id' => $id_studenta, 'kolegij_id' => $id_kolegija) );
          $message['info'] ="ubacio";
        }
        catch( PDOException $e ) { exit( 'PDO error ' . $e->getMessage() ); }
    }
    sendJSONandExit($message);
}

else
  sendErrorAndExit("Nesto nije u redu -> vjerojatno nisi poslao trazenje podatke!");
 ?>
