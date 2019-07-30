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
  "upisRez.html",
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
  console.log("url " + requestURL.pathname);
<<<<<<< HEAD
  if (requestURL.pathname === "/~maja/pwa/index.html" ) {
=======
  if (requestURL.pathname === "/~manekic/pwa/index.html" ) {
>>>>>>> 72a94e26a6c03e2d4d34e86541f5b7eb335ca2d1
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
<<<<<<< HEAD
  } else if (requestURL.pathname === "/~maja/pwa/app.js") {
=======
  } else if (requestURL.pathname === "/~manekic/pwa/app.js") {
>>>>>>> 72a94e26a6c03e2d4d34e86541f5b7eb335ca2d1
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
<<<<<<< HEAD
  } else if (requestURL.pathname === "/~maja/pwa/administrator.html") {
    //console.log("/~maja/pwa/administrator.html");
=======
  } else if (requestURL.pathname === "/~manekic/pwa/administrator.html") {
    //console.log("/~manekic/pwa/administrator.html");
>>>>>>> 72a94e26a6c03e2d4d34e86541f5b7eb335ca2d1
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
  } else if (requestURL.pathname === "/~manekic/pwa/view.css") {
    event.respondWith(
      caches.open(CACHE_NAME).then(function(cache) {
        return cache.match("view.css").then(function(cachedResponse) {
          var fetchPromise = fetch("view.css").then(function(networkResponse) {
            cache.put("view.css", networkResponse.clone());
            return networkResponse;
          });
          return cachedResponse || fetchPromise;
        });
      })
    );
<<<<<<< HEAD
  } else if (requestURL.pathname === "/~maja/pwa/view1.css") {
    event.respondWith(
      caches.open(CACHE_NAME).then(function(cache) {
        return cache.match("view1.css").then(function(cachedResponse) {
          var fetchPromise = fetch("view1.css").then(function(networkResponse) {
            cache.put("view1.css", networkResponse.clone());
            return networkResponse;
          });
          return cachedResponse || fetchPromise;
        });
      })
    );
  } else if (requestURL.pathname === "/~maja/pwa/login.css") {
=======
  } else if (requestURL.pathname === "/~manekic/pwa/login.css") {
>>>>>>> 72a94e26a6c03e2d4d34e86541f5b7eb335ca2d1
    event.respondWith(
      caches.open(CACHE_NAME).then(function(cache) {
        return cache.match("login.css").then(function(cachedResponse) {
          var fetchPromise = fetch("login.css").then(function(networkResponse) {
            cache.put("login.css", networkResponse.clone());
            return networkResponse;
          });
          return cachedResponse || fetchPromise;
        });
      })
    );
  } else if (requestURL.pathname === "/~manekic/pwa/rezultati.html") {
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
  } else if (requestURL.pathname === "/~manekic/pwa/unosRezultata.html") {
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
  } else if (requestURL.pathname === "/~manekic/pwa/unosStudenata.html") {
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
  } else if (requestURL.pathname === "/~manekic/pwa/brisanjeLogin.html") {
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
  } else if (requestURL.pathname === "/~manekic/pwa/brisanjeRez.html") {
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
  } else if (requestURL.pathname === "/~manekic/pwa/unosKolegija.html") {
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
  } else if (requestURL.pathname === "/~manekic/pwa/upisRez.html") {
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
  } else if (requestURL.pathname === "/~manekic/pwa/upisKolegijaLogin.html") {
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
  } else if (requestURL.pathname === "/~manekic/pwa/upisNovihKolegija.html") {
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

self.addEventListener('push', function (event) {
  //console.log("push event");
  if (!(self.Notification && self.Notification.permission === 'granted')) {
    return;
  }

  const sendNotification = body => {
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
  console.log("Event tag je "+event.tag);
  if (event.tag === 'upis-rezultata') {
    event.waitUntil(pohranaUBazu());
  }
});

function pohranaUBazu() {
  console.log("back-sync, upisano u bazu");
  var request = indexedDB.open("Studenti", 1);
  request.onsuccess = function(event) {
    var db = event.target.result;
    var objectStore = db.transaction("novi_rezultati", "readwrite").objectStore("novi_rezultati");
    var cursor = objectStore.openCursor();
    cursor.onsuccess = function(event) {
      var cursor = event.target.result;
      if (!cursor) { return; }
      var id_studenta = cursor.value.id_studenta;
      var id_kolegija = cursor.value.id_kolegija;
      var bodovi = cursor.value.bodovi;
      var elt = cursor.value.elt;
      fetch('server.php', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
        },
        body: JSON.stringify({
          id_studenta: id_studenta,
          id_kolegija:id_kolegija,
          bodovi: bodovi,
          elt: elt
        })
      }).then(response => response.json())
      .catch(function(err) {
        console.log('It broke');
        console.log(err.message);
      });
	 if(cursor.value.id_studenta === id_studenta)
        {
            cursor.delete();
            console.log("obrisao");
        }
	cursor.continue();

    };
  };
}
