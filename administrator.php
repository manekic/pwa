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
//ajaxom šaljemo upit i želimo dobiti nazive kolegija kao povratne informacije
if(!isset($_GET['username']) && !isset($_GET['pass']) && !isset($_GET['ime']) && !isset($_GET['prezime']) && !isset($_GET['duljina']) && !isset($_GET['kolegiji'])) {
  //polje za nazive kolegija
  $kolegiji = array();
  //brojač elemenata prethodnog polja
  $br = 0;
  //spajanje na bazu, tablica kolegiji
  try {
      $db = DB::getConnection();
      $st1 = $db->query('SELECT naziv_kolegija FROM kolegiji');
    }
    catch( PDOException $e ) { exit( 'PDO error ' . $e->getMessage() ); }
  //popunjavanje polja sa nazivima kolegija
  foreach($st1->fetchAll() as $row1) {
    $message['rez'][] = array('ime' => $row1['naziv_kolegija']);
  }
  //slanje povratnih podataka
  sendJSONandExit($message);
}
if(!isset($_GET['username']) && isset($_GET['pass']) && isset($_GET['ime']) && isset($_GET['prezime']) && isset($_GET['duljina']) && isset($_GET['kolegiji'])) {
  
}
else
  sendErrorAndExit("Nesto nije u redu -> vjerojatno nisi poslao trazenje podatke!");
 ?>

