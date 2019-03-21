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
if(isset($_GET['ime'])) {
  $ime = $_GET['ime'];
  $prezime = $_GET['prezime'];
  $username = $_GET['username'];
  $pass = $_GET['pass'];
	$message = [];
  //spajanje na bazu, tablica studenti
  try {
      $db = DB::getConnection();
      $st = $db->prepare('SELECT student_id FROM studenti');
      $st->execute();
    }
    catch( PDOException $e ) { exit( 'PDO error ' . $e->getMessage() ); }
  //dohvaćanje svih podataka korisnika koji se prijavio
  //ako proslijeđeni username ne postoji u bazi -> krivo korisničko ime!
  while($row = $st->fetch()) {
    $id = $row['student_id'];
  }
  //zadnji id + 1 je id novog studenta
  $id = $id + 1;
  $message['id'] = $id;
  try {
      $db = DB::getConnection();
      $st1 = $db->prepare( 'INSERT INTO studenti(student_id, ime, prezime, username, password)
                            VALUES (:student_id, :ime, :prezime, :username, :password)' );
      $st1->execute( array('student_id' => $id, 'ime' => $ime, 'prezime' => $prezime, 'username' => $username, 'password' => $pass ) );
      $message['info'] ="ubacio";
    }
    catch( PDOException $e ) { exit( 'PDO error ' . $e->getMessage() ); }
    sendJSONandExit($message);
/*if(!isset($_GET['ime'])) {
  //inicijaliziram varijablu koju saljem
	$message = [];
	$message['rez'] = [];
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
}*/
}

/*else if(isset($_GET['ime'])) {
  //$message['predmeti'] = json_decode($_GET['oznaceni']);
  //inicijaliziram varijablu koju saljem
  $ime = $_GET['ime'];
  $prezime = $_GET['prezime'];
  $username = $_GET['username'];
  $pass = $_GET['pass'];
  $predmeti = json_decode($_GET['oznaceni']);
	$message = [];
	$message['predmeti'] = [];
  $message['predmeti'][] = $predmeti[1];
  /*for($i = 0; $i < $predmeti.length; $i++)
    $message['predmeti'][] = array('ime' => $predmeti[$i]);*/
  //$message['us'] = $ime;
  //json_encode($message['predmeti']);
  //slanje povratnih podataka
  //sendJSONandExit($message);
//}

else
  sendErrorAndExit("Nesto nije u redu -> vjerojatno nisi poslao trazene podatke!");
 ?>
