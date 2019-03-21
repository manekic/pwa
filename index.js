const webpush = require('web-push');

// ...

app.post('/push', function(request, response) {
  const subscription = request.param('subscription');
  const message = request.param('message');

  setTimeout(() => {
    const options = {
      TTL: 24 * 60 * 60,
      vapidDetails: {
        subject: 'mailto:sender@example.com',
        publicKey: process.env.VAPID_PUBLIC_KEY,
        privateKey: process.env.VAPID_PRIVATE_KEY
      },
    }

    webpush.sendNotification(
      subscription,
      message,
      options
    );

  }, 0);

  response.send('OK');
});
