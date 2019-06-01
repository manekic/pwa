if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js").then(function(registration) {
    console.log("Service Worker registered with scope:", registration.scope);
    //push_subscribe();
  }).catch(function(err) {
    console.log("Service Worker registration failed:", err);
  });
}

  if (!("Notification" in window)) {
    console.error("This browser does not support desktop notification");
  }

  // Let's check whether notification permissions have already been granted
  else if (Notification.permission === "granted") {
    console.log("Permission to receive notifications has been granted");
  }

  // Otherwise, we need to ask the user for permission
  else if (Notification.permission !== 'denied') {
    Notification.requestPermission(function (permission) {
    //If the user accepts, let's create a notification
      if (permission === "granted") {
        console.log("Permission to receive notifications has been granted");
        push_pretplata();
      }
    });
  }

  function push_pretplata() {
    return dohvacanje_dozvole()
      .then(() => navigator.serviceWorker.ready)
      .then(serviceWorkerRegistration =>
        serviceWorkerRegistration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array("BMBlr6YznhYMX3NgcWIDRxZXs0sh7tCv7_YCsWcww0ZCv9WGg-tRCXfMEHTiBPCksSqeve1twlbmVAZFv7GSuj0"),
        })
      )
      .then(subscription => {
          return push_slanje_serveru(subscription, 'POST');
      });
  }

    function dohvacanje_dozvole() {
      return new Promise((resolve, reject) => {
        if (Notification.permission === 'denied') {
          return reject(new Error('Push messages are blocked.'));
        }

        if (Notification.permission === 'granted') {
          console.log("g");
          return resolve();
        }

        if (Notification.permission === 'default') {
          return Notification.requestPermission().then(result => {
            if (result !== 'granted') {
              reject(new Error('Bad permission result'));
            }

            resolve();
          });
        }
      });
    }

    function urlBase64ToUint8Array(base64String) {
      const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
      const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');

      const rawData = window.atob(base64);
      const outputArray = new Uint8Array(rawData.length);

      for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
      }
      return outputArray;
    }

    function push_slanje_serveru(subscription, method) {
      const key = subscription.getKey('p256dh');
      const token = subscription.getKey('auth');
      const contentEncoding = (PushManager.supportedContentEncodings || ['aesgcm'])[0];
      console.log('Received PushSubscription: ', JSON.stringify(subscription))
      var endpoint = subscription.endpoint;
      var publicKey = key ? btoa(String.fromCharCode.apply(null, new Uint8Array(key))) : null;
      var authToken = token ? btoa(String.fromCharCode.apply(null, new Uint8Array(token))) : null;
      return fetch('pretplate.php', {
        method: 'POST',
        body: JSON.stringify({
          endpoint: subscription.endpoint,
          publicKey: key ? btoa(String.fromCharCode.apply(null, new Uint8Array(key))) : null,
          authToken: token ? btoa(String.fromCharCode.apply(null, new Uint8Array(token))) : null,
          contentEncoding,
        })
      }).then(() => subscription);
    }
