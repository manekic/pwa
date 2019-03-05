<?php
// Manualno inicijaliziramo bazu ako vec nije.
require_once 'db.class.php';
$db = DB::getConnection();
$has_tables = false;

try {
	$st = $db->prepare(
		'SHOW TABLES LIKE :tblname'
	);

	$st->execute( array( 'tblname' => 'studenti' ) );
	if( $st->rowCount() > 0 )
		$has_tables = true;

	$st->execute( array( 'tblname' => 'kolegiji' ) );
	if( $st->rowCount() > 0 )
		$has_tables = true;

	$st->execute( array( 'tblname' => 'rezultati' ) );
	if( $st->rowCount() > 0 )
		$has_tables = true;
}
catch( PDOException $e ) { exit( "PDO error [show tables]: " . $e->getMessage() ); }

if( $has_tables ) {
	exit( 'Tablice studenti / kolegiji / rezultati vec postoje. Obrisite ih pa probajte ponovno.' );
}

try {
	$st = $db->prepare(
		'CREATE TABLE IF NOT EXISTS studenti (' .
		'student_id int NOT NULL PRIMARY KEY AUTO_INCREMENT,' .
		'username varchar(50) NOT NULL,' .
		'password varchar(255) NOT NULL,'.
		'ime varchar(50) NOT NULL,' .
		'prezime varchar(50) NOT NULL)'
	);
	$st->execute();
}
catch( PDOException $e ) { exit( "PDO error [create studenti]: " . $e->getMessage() ); }
echo "Napravio tablicu studenti.<br />";

try {
	$st = $db->prepare(
		'CREATE TABLE IF NOT EXISTS kolegiji (' .
		'kolegij_id int NOT NULL PRIMARY KEY AUTO_INCREMENT,' .
		'naziv_kolegija varchar(50) NOT NULL)'
	);
	$st->execute();
}
catch( PDOException $e ) { exit( "PDO error [create kolegiji]: " . $e->getMessage() ); }
echo "Napravio tablicu kolegiji.<br />";

try {
	$st = $db->prepare(
		'CREATE TABLE IF NOT EXISTS rezultati (' .
		'student_id INT NOT NULL,' .
		'kolegij_id INT NOT NULL,' .
		'1kolokvij INT,' .
		'2kolokvij INT,' .
    'zavrsni INT,' .
    '1zadaca INT,' .
    '2zadaca INT,' .
    '3zadaca INT,' .
    '4zadaca INT)'
	);
	$st->execute();
}
catch( PDOException $e ) { exit( "PDO error [create rezultati]: " . $e->getMessage() ); }
echo "Napravio tablicu rezultati.<br />";

// Ubaci neke korisnike unutra
try {
	$st = $db->prepare( 'INSERT INTO studenti(username, password, ime, prezime) VALUES (:username, :password, :ime, :prezime)' );
	$st->execute( array( 'username' => '112233', 'password' => 'a1b', 'ime' => 'Ana', 'prezime' => 'Anic' ) );
	$st->execute( array( 'username' => '123456', 'password' => 'a2b', 'ime' => 'Ivan', 'prezime' => 'Ivic' ) );
  $st->execute( array( 'username' => '223344', 'password' => 'a3b', 'ime' => 'Karlo', 'prezime' => 'Horvat' ) );
	$st->execute( array( 'username' => 'admin', 'password' => 'a5b', 'ime' => 'Ante', 'prezime' => 'Antic' ) );
}
catch( PDOException $e ) { exit( "PDO error [insert studenti]: " . $e->getMessage() ); }
echo "Ubacio u tablicu studenti.<br />";

// Ubaci neke followere unutra (ovo nije bas pametno ovako raditi, preko hardcodiranih id-eva usera)
try {
	$st = $db->prepare( 'INSERT INTO kolegiji(naziv_kolegija) VALUES (:naziv_kolegija)' );
	$st->execute( array( 'naziv_kolegija' => 'Matematicka analiza 1') );
	$st->execute( array( 'naziv_kolegija' => 'Matematicka analiza 2') );
  $st->execute( array( 'naziv_kolegija' => 'Linearna algebra 1') );
  $st->execute( array( 'naziv_kolegija' => 'Linearna algebra 2') );
}
catch( PDOException $e ) { exit( "PDO error [kolegiji]: " . $e->getMessage() ); }
echo "Ubacio u tablicu kolegiji.<br />";

// Ubaci neke quackove unutra (ovo nije bas pametno ovako raditi, preko hardcodiranih id-eva usera)
try {
	$st = $db->prepare( 'INSERT INTO rezultati(student_id, kolegij_id, 1kolokvij, 2kolokvij, zavrsni, 1zadaca, 2zadaca, 3zadaca, 4zadaca)
                       VALUES (:student_id, :kolegiji_id, :1kolokvij, :2kolokvij, :zavrsni, :1zadaca, :2zadaca, :3zadaca, :4zadaca)' );
	$st->execute( array( 'student_id' => 1, 'kolegiji_id' => 1, '1kolokvij' => 25, '2kolokvij' => NULL, 'zavrsni' => NULL, '1zadaca' => NULL, '2zadaca' => NULL, '3zadaca' => NULL, '4zadaca' => NULL) );
	$st->execute( array( 'student_id' => 2, 'kolegiji_id' => 3, '1kolokvij' => 15, '2kolokvij' => 13, 'zavrsni' => NULL, '1zadaca' => NULL, '2zadaca' => NULL, '3zadaca' => NULL, '4zadaca' => NULL) );
	$st->execute( array( 'student_id' => 1, 'kolegiji_id' => 2, '1kolokvij' => 25, '2kolokvij' => NULL, 'zavrsni' => NULL, '1zadaca' => NULL, '2zadaca' => NULL, '3zadaca' => NULL, '4zadaca' => NULL) );
}
catch( PDOException $e ) { exit( "PDO error [rezultati]: " . $e->getMessage() ); }
echo "Ubacio u tablicu rezultati.<br />";
?>

