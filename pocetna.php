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
if(isset($_GET['username']) && isset($_GET['pass'])) {
  $username = $_GET['username'];
  $pass = $_GET['pass'];
  $message = [];
  $message['info'] = [];
  $message['rez'] = [];
  //kontrolna varijabla za prijavu
  $flag = false;
  //polje za nazive kolegija
  $kolegiji = array();
  //brojač elemenata prethodnog polja
  $br = 0;
  //kontrolna varijabla za prijavu admina
  $admin = false;
  if($username === "admin")
    $admin = true;
    $message['admin'] = $admin;
  //spajanje na bazu, tablica studenti
  try {
      $db = DB::getConnection();
      $st = $db->prepare('SELECT student_id, username, password, ime, prezime FROM studenti');
      $st->execute();
    }
    catch( PDOException $e ) { exit( 'PDO error ' . $e->getMessage() ); }
  //dohvaćanje svih podataka korisnika koji se prijavio
  //ako proslijeđeni username ne postoji u bazi -> krivo korisničko ime!
  while($row = $st->fetch()) {
    if($row['username'] === $username) {
      $id = $row['student_id'];
      $message['ime_studenta'] = $row['ime'];
      $message['prezime_studenta'] = $row['prezime'];
      $pass_studenta = $row['password'];
      $message['id'] = $id;
      $flag = true;
    }
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
  }
  //ako ne postoji redak u kojemu je student_id == $username
  if($flag === false) {
    $message['greska'] = -1;
    $message['info'] = "Ne postoji korisnik sa unesenim korisničkim imenom.";
  }
  //ako username postoji u bazi, ali se $pass i lozinka u tablici ne podudaraju
  else if($pass !== $pass_studenta){
    $message['greska'] = 1;
    $message['info'] = "Lozinka nije ispravna.";
  }
  //ako je sve u redu, iz baze dohvacamo rezultate svih kolegija koje je student upisao
  else {
    $message['info'] = "Sve OK.";
    $message['greska'] = 0;
    //ako nije riječ o administratoru, već o studentu
    if($admin === false) {
      //spajanje na bazu, tablica rezultati
      try {
          $db = DB::getConnection();
          $st2 = $db->query('SELECT * FROM rezultati');
        }
        catch( PDOException $e ) { exit( 'PDO error ' . $e->getMessage() ); }
      //podatke iz baze zapisujem u povratnu varijablu
      foreach($st2->fetchAll() as $row2) {
        if($row2['student_id'] === $id)
        {
          //$message['nazivi'][] = $kolegiji[$row2['kolegij_id']-1];
          $message['rez'][] = array('ime' => $kolegiji[$row2['kolegij_id']-1], 'kol1' => $row2['1kolokvij'],
                                    'kol2' => $row2['2kolokvij'], 'zavrsni' => $row2['zavrsni'], 'dz1' => $row2['1zadaca'],
                                    'dz2' => $row2['2zadaca'], 'dz3' => $row2['3zadaca'],'dz4' => $row2['4zadaca']);
        }
      }
    }
  }
  //slanje povratnih podataka
  sendJSONandExit($message);
}
else
  sendErrorAndExit("Nesto nije u redu -> vjerojatno nisi poslao trazenje podatke!");
 ?>

