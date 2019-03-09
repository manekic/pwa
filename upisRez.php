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
if(isset($_GET['id_kolegija']) && isset($_GET['elt']) && isset($_GET['bodovi']) && isset($_GET['id_studenta'])) {
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
}

else
  sendErrorAndExit("Nesto nije u redu -> vjerojatno nisi poslao trazenje podatke!");
 ?>
