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
//!isset(&_GET['id_kolegija'])
if(isset($_GET['i']) && isset($_GET['p'])) {
  $ime = $_GET['i'];
  $prezime = $_GET['p'];
  $message = [];
  $message['rez'] = [];
  $message['kolegiji'] = [];
  $message['upisani'] = [];
  //polje za nazive kolegija
  $kolegiji = array();
  //brojač elemenata prethodnog polja
  $br = 0;
  $flag = false;
  //spajanje na bazu, tablica studenti
  try {
      $db = DB::getConnection();
      $st = $db->prepare('SELECT student_id FROM studenti WHERE ime=:ime AND prezime=:prezime');
      $st->execute(array('ime' => $ime, 'prezime' => $prezime));
    }
    catch( PDOException $e ) { exit( 'PDO error ' . $e->getMessage() ); }

    while($row = $st->fetch()) {
      $id_studenta = $row['student_id'];
      $message['id'] = $id_studenta;
      $flag = true;
      break;
    }
  if($flag) {
    $message['info'] = "Korisnik je u bazi";
    $message['potvrda'] = true;
  }

  else {
    $message['info'] = "Korisnik nije u bazi";
    $message['potvrda'] = false;
  }

  //slanje povratnih podataka
  sendJSONandExit($message);
}

else
  sendErrorAndExit("Nesto nije u redu -> vjerojatno nisi poslao trazenje podatke!");
 ?>
