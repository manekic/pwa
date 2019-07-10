
<?php
require_once 'db.class.php';
/*
INPUT:
$_GET['username'] = username korisnika
$_GET['pass'] = pass korisnika
OUTPUT: JSON
{
info = varijabla koja kaze je li prijava uspjela
greška = varijabla kojoj šaljem tip greške -> 0 === SVE OK, 1 === pogrešna lozinka, -1 === korisničko ime ne postoji
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
      $st = $db->prepare('SELECT * FROM studenti WHERE username=:username AND password=:password');
      $st->execute(array('username' => $username, 'password' => $pass));
    }
    catch( PDOException $e ) { exit( 'PDO error ' . $e->getMessage() ); }
  //dohvaćanje svih podataka korisnika koji se prijavio
  //ako proslijeđeni username ne postoji u bazi -> krivo korisničko ime!
  while($row = $st->fetch()) {
    $id = $row['student_id'];
    $message['ime_studenta'] = $row['ime'];
    $message['prezime_studenta'] = $row['prezime'];
    $pass_studenta = $row['password'];
    $message['id'] = $id;
    $flag = true;
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
  }
  //slanje povratnih podataka
  sendJSONandExit($message);
}
else
sendErrorAndExit("Nesto nije u redu -> vjerojatno nisi poslao trazenje podatke!");
?>
