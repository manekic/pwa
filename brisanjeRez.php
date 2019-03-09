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
if(!isset($_GET['bodovi'])) {
  $ime = $_GET['i'];
  $prezime = $_GET['p'];
  $message = [];
  $message['rez'] = [];
  $message['kolegiji'] = [];
  //polje za nazive kolegija
  $kolegiji = array();
  //brojač elemenata prethodnog polja
  $br = 0;
  $flag = false;
  //spajanje na bazu, tablica studenti
  try {
      $db = DB::getConnection();
      $st = $db->query('SELECT * FROM studenti');
    }
    catch( PDOException $e ) { exit( 'PDO error ' . $e->getMessage() ); }
  //popunjavanje polja sa nazivima kolegija
  foreach($st->fetchAll() as $row) {
    if($row['ime'] === $ime && $row['prezime'] === $prezime) {
      $id = $row['student_id'];
      $message['id'] = $id;
      $flag = true;
      break;
    }
  }
  if($flag) {
    $message['info'] = "Korisnik je u bazi";
    $message['potvrda'] = true;
  }

  else {
    $message['info'] = "Korisnik nije u bazi";
    $message['potvrda'] = false;
  }
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
      //$message['nazivi'][] = $kolegiji[$row2['kolegij_id']-1];
      $message['rez'][] = array('ime' => $kolegiji[$row2['kolegij_id']-1], 'kol1' => $row2['1kolokvij'],
                                'kol2' => $row2['2kolokvij'], 'zavrsni' => $row2['zavrsni'], 'dz1' => $row2['1zadaca'],
                                'dz2' => $row2['2zadaca'], 'dz3' => $row2['3zadaca'],'dz4' => $row2['4zadaca']);
    }
  }
  //slanje povratnih podataka
  sendJSONandExit($message);
}
/*else if(isset($_GET['id_kolegija']) && isset($_GET['elt']) && isset($_GET['bodovi']) && isset($_GET['id_studenta'])) {
  $id_kolegija = $_GET['id_kolegija'];
  $id_studenta = $_GET['id_studenta'];
  $elt = $_GET['elt'];
  $bodovi = $_GET['bodovi'];
  $message = [];
  try {
      $db = DB::getConnection();
      $st3 = $db->prepare("UPDATE rezultati SET $elt = '$bodovi' WHERE student_id = '$id_studenta' AND kolegij_id = '$id_kolegija'");
      $st3->execute();
      $message['info'] = "Ubacio rezultate u bazu!"
    }
    catch( PDOException $e ) { exit( 'PDO error ' . $e->getMessage() ); }
  //slanje povratnih podataka
  sendJSONandExit($message);
}*/

else
  sendErrorAndExit("Nesto nije u redu -> vjerojatno nisi poslao trazenje podatke!");
 ?>
