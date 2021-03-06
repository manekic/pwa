<?php
class DB
{
	private static $db = null;
	private function __construct() { }
	private function __clone() { }
	public static function getConnection()
	{
		if( DB::$db === null )
	    {
	    	try
	    	{
	    		// Unesi ispravni HOSTNAME, DATABASE, USERNAME i PASSWORD
					//DB::$db = new PDO( "mysql: host=rp2.studenti.math.hr; dbname=nekic; charset=utf8", 'student', 'pass.mysql' );
		    	DB::$db = new PDO( "mysql: host=localhost; dbname=Studenti; charset=utf8", 'maja', 'AM258' );
		    	DB::$db-> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		    }
		    catch( PDOException $e ) { exit( 'PDO Error: ' . $e->getMessage() ); }
	    }
		return DB::$db;
	}
}
?>
