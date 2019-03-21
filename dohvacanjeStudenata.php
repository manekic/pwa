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
if(isset($_GET['flag'])) {
  $message = [];
  $message['studenti'] = [];
  //spajanje na bazu, tablica studenti
  try {
      $db = DB::getConnection();
      $st = $db->query('SELECT * FROM studenti');
    }
    catch( PDOException $e ) { exit( 'PDO error ' . $e->getMessage() ); }
  foreach($st->fetchAll() as $row) {
    $message['studenti'][] = array('id_studenta' => $row['student_id'], 'ime' => $row['ime'], 'prezime' => $row['prezime']);
  }
  //slanje povratnih podataka
  sendJSONandExit($message);
}

else
  sendErrorAndExit("Nesto nije u redu -> vjerojatno nisi poslao trazenje podatke!");
 ?>
