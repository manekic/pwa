<?php
require_once 'db.class.php';
require __DIR__ . '/vendor/autoload.php';
use Minishlink\WebPush\WebPush;
use Minishlink\WebPush\Subscription;

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
if(!isset($_GET['id'])) {
  $message = [];
  $subscription = Subscription::create(json_decode(file_get_contents('php://input'), true));
  //'{"endpoint":"https://fcm.googleapis.com/fcm/send/eUgk4H7c2zI:APA91bHZ_0xJe1C3rJ1QBqLgMuUIBHJTGIpf8m88cV4cHX2pz1r3cbSCII77Yrw-LCCnhEYL2Kewprjz82zU9usGHITHfZ8nxGA-pHJSNRypYn3h2GsVGEogun5Ev3jV8Cjbooe5hZJ-","expirationTime":null,"keys":{"p256dh":"BG6kRybEIlBYeRBEU3CuW59glhAd8w0r+xeal9C27lOpqHHAyzQU074EjirFOLdY/kCGG3Pc4F5ZluGLQFZJ0AU=","auth":"n61IYUI8SfxPzXdVSfcKbQ=="}}';


$auth = array(
    'VAPID' => array(
        'subject' => 'https://github.com/Minishlink/web-push-php-example/',
        'publicKey' => file_get_contents(__DIR__ . '/keys/public_key.txt'), // don't forget that your public key also lives in app.js
        'privateKey' => file_get_contents(__DIR__ . '/keys/private_key.txt'), // in the real world, this would be in a secret file
    ),
);

$webPush = new WebPush($auth);
echo "ola1 \n";
$res = $webPush->sendNotification(
    $subscription,
    "Helloooooo!"
);
echo "ola2\n ";

// handle eventual errors here, and remove the subscription from your server if it is expired
foreach ($webPush->flush() as $report) {
    $endpoint = $report->getRequest()->getUri()->__toString();

    if ($report->isSuccess()) {
        echo "[v] Message sent successfully for subscription {$endpoint}.";
    } else {
        echo "[x] Message failed to sent for subscription {$endpoint}: {$report->getReason()}";
    }
}

  //slanje povratnih podataka
  sendJSONandExit($message);
}
else
  sendErrorAndExit("Nesto nije u redu -> vjerojatno nisi poslao trazenje podatke!");
 ?>
