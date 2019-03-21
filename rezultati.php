<?php
require_once 'db.class.php';
/*
INPUT:
$_GET['username'] = username korisnika
$_GET['pass'] = pass korisnika

OUTPUT: JSON
{
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
if(isset($_GET['id'])) {
  $id = $_GET['id'];
  $message = [];
  $message['rez'] = [];
  //polje za nazive kolegija
  $kolegiji = array();
  //brojač elemenata prethodnog polja
  $br = 0;
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
else
  sendErrorAndExit("Nesto nije u redu -> vjerojatno nisi poslao trazenje podatke!");
 ?>
