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
if(!isset($_GET['id'])) {
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
      $st = $db->prepare('SELECT * FROM kolegiji');
      $st->execute();
    }
    catch( PDOException $e ) { exit( 'PDO error ' . $e->getMessage() ); }
  //popunjavanje polja sa nazivima kolegija
  while($row = $st->fetch()) {
    $message['rez'][] = array('ime' => $row['naziv_kolegija']);
  }
  //slanje povratnih podataka
  sendJSONandExit($message);
}

else if(isset($_GET['id'])) {
  $id = $_GET['id'];
  $id_kolegija = $_GET['id_kolegija'];
	$message = [];
  $flag = false;
  try {
      $db = DB::getConnection();
      $st1 = $db->prepare('SELECT * FROM rezultati WHERE student_id=:student_id AND kolegij_id=:kolegij_id');
      $st1->execute(array('student_id' => $id, 'kolegij_id' => $id_kolegija));
    }
  catch( PDOException $e ) { exit( 'PDO error ' . $e->getMessage() ); }
  while($row1 = $st1->fetch()) {
    $flag = true;
    try {
        $db = DB::getConnection();
        $st2 = $db->prepare("DELETE FROM rezultati WHERE student_id = '$id' AND kolegij_id = '$id_kolegija'");
        $st2->execute();
        $message['info'] ="obrisao";
    }
    catch( PDOException $e ) { exit( 'PDO error ' . $e->getMessage() ); }
  }
    if($flag === false) {
      try {
          $db = DB::getConnection();
          $st3 = $db->prepare( 'INSERT INTO rezultati(student_id, kolegij_id)
                                VALUES (:student_id, :kolegij_id)' );
          $st3->execute( array('student_id' => $id, 'kolegij_id' => $id_kolegija) );
          $message['info'] ="ubacio";
        }
        catch( PDOException $e ) { exit( 'PDO error ' . $e->getMessage() ); }
    }
    sendJSONandExit($message);
}
else
  sendErrorAndExit("Nesto nije u redu -> vjerojatno nisi poslao trazene podatke!");
 ?>
