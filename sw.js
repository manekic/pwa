var CACHE_NAME = "gih-cache";
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
  if (requestURL.pathname === "index.html" || requestURL.pathname === "/~maja/novo/") {
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
  } else if (requestURL.pathname === "/~maja/novo/administrator.html") {
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
  } else if (requestURL.pathname === "/~maja/novo/rezultati.html") {
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
  } else if (requestURL.pathname === "/~maja/novo/unosRezultata.html") {
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
  } else if (requestURL.pathname === "/~maja/novo/unosStudenata.html") {
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
  } else if (requestURL.pathname === "/~maja/novo/brisanjeLogin.html") {
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
  } else if (requestURL.pathname === "/~maja/novo/brisanjeRez.html") {
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
  } else if (requestURL.pathname === "/~maja/novo/unosKolegija.html") {
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
  } else if (requestURL.pathname === "/~maja/novo/upisRez.html") {
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
  } else if (requestURL.pathname === "/~maja/novo/upisKolegijaLogin.html") {
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
  } else if (requestURL.pathname === "/~maja/novo/upisNovihKolegija.html") {
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
          if(CACHE_NAME !== cacheName && cacheName.startsWith("gih-cache")) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener("sync", function(event) {
  console.log("Background syncing..."+event);
  if (event.tag === "sync-reservations") {
    console.log("Syncing new results");
    event.waitUntil(
      readAllData('sync-post')
      .then(function(data) {
        for (var dt of data) {
            fetch('/~maja/novo/upisNovihKolegija.php', { // fetching for sending saved data to firebase database
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              },
              body: JSON.stringify({
                id: dt.id,
                title: dt.title,
                content: dt.content
              })
            })
              .then(function(res) {
                console.log('Sent data', res);
                if (res.ok) {
                    res.json()
                        .then(function (resData) {
                            deleteItemFromData('sync-posts', resData .id); // function for deleting saved post data from indexedDB as we donot need after realtime post is saved when online.
                        });
                }
              })
              .catch(function(err) {
                console.log('Error while sending data', err);
              });
          }
        })
    );
  }
});

self.addEventListener("push", function() {
  self.registration.showNotification("push message received");
});
