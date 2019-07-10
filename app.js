if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js").then(function(registration) {
    console.log("Service Worker registered with scope:", registration.scope);
    //push_subscribe();
  }).catch(function(err) {
    console.log("Service Worker registration failed:", err);
  });
}

  
