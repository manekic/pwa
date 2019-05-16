var CACHE_NAME = "PWA-cache";
var CACHED_URLS = [
  "index.html",
  "login.css",
  "view.css",
  "6.jpg",
  "https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css",
  "app.js",
  "https://ajax.googleapis.com/ajax/libs/jquery/2.2.2/jquery.js",
  "https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js",
  "administrator.html",
  "brisanjeLogin.html",
  "brisanjeRez.html",
  "rezultati.html",
  "unosKolegija.html",
  "unosRezultata.html",
  "unosStudenata.html",
  "upisKolegijaLogin.html",
  "upisNovihKolegija.html",
  "upisRez.html"
];

self.addEventListener("install", function(event) {
  console.log( 'sw.install' );
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(CACHED_URLS);
    })
  )
});

self.addEventListener("fetch", function (event) {
  var requestURL = new URL(event.request.url);
  //console.log("url " + requestURL.pathname);
  // Handle requests for index.html
  if (requestURL.pathname === "/~maja/pwa/index.html" ) {
    console.log("/~maja/pwa/index.html");
    event.respondWith(
      caches.open(CACHE_NAME).then(function(cache) {
        return cache.match("index.html").then(function(cachedResponse) {
          var fetchPromise = fetch("index.html").then(function(networkResponse) {
            cache.put("index.html", networkResponse.clone());
            return networkResponse;
          });
          return cachedResponse || fetchPromise;
        });
      })
    );
  } else if (requestURL.pathname === "/~maja/pwa/app.js") {
    console.log("/~maja/pwa/app.js");
    event.respondWith(
      caches.open(CACHE_NAME).then(function(cache) {
        return cache.match("app.js").then(function(cachedResponse) {
          var fetchPromise = fetch("app.js").then(function(networkResponse) {
            cache.put("app.js", networkResponse.clone());
            return networkResponse;
          });
          return cachedResponse || fetchPromise;
        });
      })
    );
  }
  else if (requestURL.pathname === "/~maja/pwa/administrator.html") {
    console.log("/~maja/pwa/administrator.html");
    event.respondWith(
      caches.open(CACHE_NAME).then(function(cache) {
        return cache.match("administrator.html").then(function(cachedResponse) {
          var fetchPromise = fetch("administrator.html").then(function(networkResponse) {
            cache.put("administrator.html", networkResponse.clone());
            return networkResponse;
          });
          return cachedResponse || fetchPromise;
        });
      })
    );
  } else if (requestURL.pathname === "/~maja/pwa/rezultati.html") {
    event.respondWith(
      caches.open(CACHE_NAME).then(function(cache) {
        return fetch(event.request).then(function(networkResponse) {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        }).catch(function() {
          return caches.match(event.request);
        });
      })
    );
  } else if (requestURL.pathname === "/~maja/pwa/unosRezultata.html") {
    event.respondWith(
      caches.open(CACHE_NAME).then(function(cache) {
        return cache.match("unosRezultata.html").then(function(cachedResponse) {
          var fetchPromise = fetch("unosRezultata.html").then(function(networkResponse) {
            cache.put("unosRezultata.html", networkResponse.clone());
            return networkResponse;
          });
          return cachedResponse || fetchPromise;
        });
      })
    );
  } else if (requestURL.pathname === "/~maja/pwa/unosStudenata.html") {
    event.respondWith(
      caches.open(CACHE_NAME).then(function(cache) {
        return cache.match("unosStudenata.html").then(function(cachedResponse) {
          var fetchPromise = fetch("unosStudenata.html").then(function(networkResponse) {
            cache.put("unosStudenata.html", networkResponse.clone());
            return networkResponse;
          });
          return cachedResponse || fetchPromise;
        });
      })
    );
  } else if (requestURL.pathname === "/~maja/pwa/brisanjeLogin.html") {
    event.respondWith(
      caches.open(CACHE_NAME).then(function(cache) {
        return cache.match("brisanjeLogin.html").then(function(cachedResponse) {
          var fetchPromise = fetch("brisanjeLogin.html").then(function(networkResponse) {
            cache.put("brisanjeLogin.html", networkResponse.clone());
            return networkResponse;
          });
          return cachedResponse || fetchPromise;
        });
      })
    );
  } else if (requestURL.pathname === "/~maja/pwa/brisanjeRez.html") {
    event.respondWith(
      caches.open(CACHE_NAME).then(function(cache) {
        return cache.match("brisanjeRez.html").then(function(cachedResponse) {
          var fetchPromise = fetch("brisanjeRez.html").then(function(networkResponse) {
            cache.put("brisanjeRez.html", networkResponse.clone());
            return networkResponse;
          });
          return cachedResponse || fetchPromise;
        });
      })
    );
  } else if (requestURL.pathname === "/~maja/pwa/unosKolegija.html") {
    event.respondWith(
      caches.open(CACHE_NAME).then(function(cache) {
        return cache.match("unosKolegija.html").then(function(cachedResponse) {
          var fetchPromise = fetch("unosKolegija.html").then(function(networkResponse) {
            cache.put("unosKolegija.html", networkResponse.clone());
            return networkResponse;
          });
          return cachedResponse || fetchPromise;
        });
      })
    );
  } else if (requestURL.pathname === "/~maja/pwa/upisRez.html") {
    event.respondWith(
      caches.open(CACHE_NAME).then(function(cache) {
        return cache.match("upisRez.html").then(function(cachedResponse) {
          var fetchPromise = fetch("upisRez.html").then(function(networkResponse) {
            cache.put("upisRez.html", networkResponse.clone());
            return networkResponse;
          });
          return cachedResponse || fetchPromise;
        });
      })
    );
  } else if (requestURL.pathname === "/~maja/pwa/upisKolegijaLogin.html") {
    event.respondWith(
      caches.open(CACHE_NAME).then(function(cache) {
        return cache.match("upisKolegijaLogin.html").then(function(cachedResponse) {
          var fetchPromise = fetch("upisKolegijaLogin.html").then(function(networkResponse) {
            cache.put("upisKolegijaLogin.html", networkResponse.clone());
            return networkResponse;
          });
          return cachedResponse || fetchPromise;
        });
      })
    );
  } else if (requestURL.pathname === "/~maja/pwa/upisNovihKolegija.html") {
    event.respondWith(
      caches.open(CACHE_NAME).then(function(cache) {
        return cache.match("upisNovihKolegija.html").then(function(cachedResponse) {
          var fetchPromise = fetch("upisNovihKolegija.html").then(function(networkResponse) {
            cache.put("upisNovihKolegija.html", networkResponse.clone());
            return networkResponse;
          });
          return cachedResponse || fetchPromise;
        });
      })
    );
  } else if (requestURL.pathname.startsWith("6")) {
      event.respondWith(
        caches.match(event.request).then(function(response) {
          return response || fetch(event.request);
        })
      );
    } else if (
    CACHED_URLS.includes(requestURL.href) ||
    CACHED_URLS.includes(requestURL.pathname)
  ) {
    event.respondWith(
      caches.open(CACHE_NAME).then(function(cache) {
        return cache.match(event.request).then(function(response) {
          return response || fetch(event.request);
        });
      })
    );
  }
});

self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if(CACHE_NAME !== cacheName && cacheName.startsWith("PWA-cache")) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

/*self.addEventListener("push", function() {
  self.registration.showNotification("push message received");
});*/
self.addEventListener('push', function (event) {
    if (!(self.Notification && self.Notification.permission === 'granted')) {
        return;
    }

    const sendNotification = body => {
        // you could refresh a notification badge here with postMessage API
        const title = "Poruka nakon unosa rezultata";

        return self.registration.showNotification(title, {
            body,
        });
    };

    if (event.data) {
        const message = event.data.text();
        event.waitUntil(sendNotification(message));
    }
});


self.addEventListener('sync', function(event) {
  self.registration.showNotification("Sync event fired!");
});
