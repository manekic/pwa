var DB_VERSION = 1;
var DB_NAME = "Studenti";

var openDatabase = function() {
  return new Promise(function(resolve, reject) {
    // Make sure IndexedDB is supported before attempting to use it
    if (!self.indexedDB) {
      reject("IndexedDB not supported");
    }
    var request = self.indexedDB.open(DB_NAME, DB_VERSION);
    request.onerror = function(event) {
      reject("Database error: " + event.target.error);
    };

    request.onupgradeneeded = function(event) {
      var db = event.target.result;
      var upgradeTransaction = event.target.transaction;
      var objStore;
      if(!db.objectStoreNames.contains("noviRezultati")) {
        objStore = db.createObjectStore("noviRezultati", { keyPath: "id" });
      }
      else {
        noviRezultatiStore = upgradeTransaction.objectStore("noviRezultati");
      }
      if (!noviRezultatiStore.indexNames.contains("idx_status")) {
        noviRezultatiStore.createIndex("idx_status", "status", { unique: false });
      }
      if(!db.objectStoreNames.contains("studenti")) {
        objStore = db.createObjectStore("studenti", { keyPath: "id_studenta" });
      }
      else {
        studentiStore = upgradeTransaction.objectStore("studenti");
      }
      if (!studentiStore.indexNames.contains("id_studenta")) {
        noviRezultatiStore.createIndex("id_studenta", "id_studenta", { unique: true });
      }
      if(!db.objectStoreNames.contains("rezultati")) {
        objStore = db.createObjectStore("rezultati", { keyPath: "id" });
      }
      else {
        rezultatiStore = upgradeTransaction.objectStore("rezultati");
      }
      if (!rezultatiStore.indexNames.contains("id_studenta")) {
        noviRezultatiStore.createIndex("id_studenta", "id_studenta", { unique: false });
      }
    };
    request.onsuccess = function(event) {
      resolve(event.target.result);
    };
  });
};
var openObjectStore = function(db, storeName, transactionMode) {
  return db
    .transaction(storeName, transactionMode)
    .objectStore(storeName);
};

var addToObjectStore = function(storeName, object) {
  return new Promise(function(resolve, reject) {
    openDatabase().then(function(db) {
      openObjectStore(db, storeName, "readwrite")
        .add(object).onsuccess = resolve;
    }).catch(function(errorMessage) {
      reject(errorMessage);
    });
  });
};

var updateInObjectStore = function(storeName, id, object) {
  return new Promise(function(resolve, reject) {
    openDatabase().then(function(db) {
      openObjectStore(db, storeName, "readwrite")
        .openCursor().onsuccess = function(event) {
          var cursor = event.target.result;
          if (!cursor) {
            reject("Reservation not found in object store");
          }
          if (cursor.value.id === id) {
            cursor.update(object).onsuccess = resolve;
            return;
          }
          cursor.continue();
        };
    }).catch(function(errorMessage) {
      reject(errorMessage);
    });
  });
};
