<?php
require_once('db.class.php');
/*
INPUT:
$_GET['username'] = username korisnika
$_GET['pass'] = pass korisnika

OUTPUT: JSON
{
  uspjeh = varijabla koja kaze je li prijava uspjela
  rez = rezultati ispita dostupni u bazi
}
ili
{
  error = poruka o greski.
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
//  1.UPIT
if(isset($_GET['username']) && isset($_GET['pass'])) {
  $username = $_GET['username'];
  $pass = $_GET['pass'];
  $message = [];
  $message['rez'] = [];
  $message['nazivi'] = [];

  //spajanje na bazu
  $db = DB::getConnection();

  try {
    $st = $db->prepare('SELECT student_id, username, password, ime, prezime FROM studenti WHERE username=:username');
    $st->execute(array('username' => $username));
  }
  catch(PDOException $e) {exit('Greska u bazi: '.$e->getMessage()); }
  $row = $st->fetch();

  $id = $row['student_id'];
  $message['id'] = $id;

  try {
    $st1 = $db->prepare('SELECT * FROM kolegiji');
  }
  catch(PDOException $e) {exit('Greska u bazi: '.$e->getMessage()); }

  while($row1 = $st1->fetch()) {
      $message['nazivi'][] = array('naziv' => $row1['naziv_kolegija'], 'id' => $row1['kolegij_id']);
  }

  try {
    $st2 = $db->prepare('SELECT student_id, kolegij_id, 1kolokvij, 2kolokvij, zavrsni, 1zadaca, 2zadaca, 3zadaca, 4zadaca FROM rezultati WHERE student_id=:student_id');
    $st2->execute(array('student_id' => $id));
  }
  catch(PDOException $e) {exit('Greska u bazi: '.$e->getMessage()); }

  //ako ne postoji redak u kojemu je student_id == $username
  if($row === false) {
    $message['uspjeh'] = "Ne postoji korisnik sa unesenim korisnickim imenom.";
  }
  //ako username postoji u bazi, ali se $pass i lozinka u tablici ne podudaraju
  else if($pass !== $row['password']){
    $message['uspjeh'] = "Lozinka nije ispravna.";
  }
  //ako je sve u redu, iz baze dohvacamo rezultate svih kolegija koje je student upisao
  else {
    $message['uspjeh'] = "Sve OK.";
    $message['id'] = $id;
    $br = 0;
    $message['duljina'] = $br;
    foreach($st2->fetchAll() as $row2)
    {
      //$br++;
      $message['rez'][] = array('kolegij'=>$row2['kolegij_id']);
    }
    $message['broj'] = $br;
    //prolazak po svim retcima tablice rezultati gdje student_id === $id
    /*for($i = 0; $i < count($row2); $i++) {
      for($j = 0; $j < count($row1); $j++) {
        if($row1[$j]['kolegij_id'] === $row2[$i]['kolegij_id'])
          $message['naziv'] = $row1[$j]['naziv_kolegija'];
      }
      //za svaki kolegij_id trazimo naziv_kolegija u tablici kolegiji
      //$message['rez'][] = array('naziv_kolegija' => $message['naziv'], '1kol' => $row2[$i]['1kolokvij']);
    }*/
  }
  sendJSONandExit($message);
}
else
  sendErrorAndExit("Nesto nije u redu -> vjerojatno nisi poslao trazenje podatke!");

 ?>
