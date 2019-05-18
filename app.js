if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js").then(function(registration) {
    console.log("Service Worker registered with scope:", registration.scope);
  }).catch(function(err) {
    console.log("Service Worker registration failed:", err);
  });
}

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.addEventListener("message", function (event) {
      console.log("message event");
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
