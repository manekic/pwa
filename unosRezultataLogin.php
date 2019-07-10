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
if(isset($_GET['i']) && isset($_GET['p']) && isset($_GET['k']) && isset($_GET['elt']) && isset($_GET['bodovi'])) {
  $ime = $_GET['i'];
  $prezime = $_GET['p'];
  $bodovi = $_GET['bodovi'];
  $elt = $_GET['elt'];
  $kolegij = $_GET['k'];
  $message = [];
  $message['nesto'] = "na pocetku";
  //polje za nazive kolegija
  $kolegiji = array();
  $flag = false;
  $upisan = false;
  $flag1 = false;
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
  //korisnik je u bazi -> dohvaćam potrebne podatke
  if($message['potvrda']) {

    $br = 1;
    //spajanje na bazu, tablica kolegiji
    try {
        $db = DB::getConnection();
        $st1 = $db->prepare('SELECT * FROM kolegiji WHERE naziv_kolegija=:naziv_kolegija');
        $st1->execute(array('naziv_kolegija' => $kolegij));
      }
      catch( PDOException $e ) { exit( 'PDO error ' . $e->getMessage() ); }
    //popunjavanje polja sa nazivima kolegija
    while($row1 = $st1->fetch()) {
        $message['id_k'] = $br;
        $id_kolegija = $br;
        $flag1 = true;
        break;
      }
    //ako je admin unesao točno ime kolegija -> provjeri ima li student upisan taj kolegij
    if($flag1) {
      //spajanje na bazu, tablica rezultati
      try {
          $db = DB::getConnection();
          $st2 = $db->prepare('SELECT * FROM rezultati WHERE student_id=:student_id AND kolegij_id=:kolegij_id');
          $st2->execute(array('student_id' => $id_studenta, 'kolegij_id' => $id_kolegija));
        }
        catch( PDOException $e ) { exit( 'PDO error ' . $e->getMessage() ); }
      //podatke iz baze zapisujem u povratnu varijablu
      while($row2 = $st2->fetch()) {
          $upisan = true;
          break;
      }
      $message['nesto'] = "dosao do kraja";
      //ako je student upisao taj kolegij -> upiši rezultat u bazu
      if($upisan) {
        $message['upisan'] = "upisan";

        //spajanje na bazu, tablica rezultati
        try {
            $db = DB::getConnection();
            $st2 = $db->prepare("UPDATE rezultati SET $elt = '$bodovi' WHERE student_id = '$id_studenta' AND kolegij_id = '$id_kolegija'");
            $st2->execute();
            $message['info'] = "Ubacio rezultate u bazu!";
          }
          catch( PDOException $e ) { exit( 'PDO error ' . $e->getMessage() ); }
      }
    }
  }
  //slanje povratnih podataka
  sendJSONandExit($message);
}

else
  sendErrorAndExit("Nesto nije u redu -> vjerojatno nisi poslao trazenje podatke!");
 ?>
