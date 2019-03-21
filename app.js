if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js").then(function(registration) {
    console.log("Service Worker registered with scope:", registration.scope);
  }).catch(function(err) {
    console.log("Service Worker registration failed:", err);
  });
  navigator.serviceWorker.ready.then((serviceWorkerRegistration) => {
  serviceWorkerRegistration.pushManager
  .subscribe({
    userVisibleOnly: true,
    applicationServerKey: window.vapidPublicKey
  });
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
    // If the user accepts, let's create a notification
      if (permission === "granted") {
        console.log("Permission to receive notifications has been granted");
      }
    });
  }
