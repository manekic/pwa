console.log("/~maja/pwa/indexedDB.js");
var db;
//stvaranje baze
var request = window.indexedDB.open("Studenti", 1);
request.onerror = function(event) {
  console.log("DB Error " + event.target.error);
};
request.onsuccess = function(event) {
  db = event.target.result;
  console.log("DB: " + db);
  console.log("Object store names: " + db.objectStoreNames);
};
//stvaranje tablica u bazi
request.onupgradeneeded = function(event) {
  var db = event.target.result;
  if(!db.objectStoreNames.contains("rezultati")) {
    var objStore1 = db.createObjectStore("rezultati", { keyPath: "id"});
    objStore1.createIndex("id_studenta", "id_studenta", {unique: false});
  }
  if(!db.objectStoreNames.contains("kolegiji"))
    var objStore2 = db.createObjectStore("kolegiji", { keyPath: "id_kolegija" });
  if(!db.objectStoreNames.contains("novi_rezultati"))
    var objStore3 = db.createObjectStore("novi_rezultati", { autoIncrement: true });
  if(!db.objectStoreNames.contains("bodovi")) {
    var objStore4 = db.createObjectStore("bodovi", { keyPath: "id_studenta" });
    objStore4.createIndex("id_kolegija", "id_kolegija", {unique: false});
  }
};
//popunjavanje tablice sa imenima kolegija
request.onsuccess = function(event) {
  var db = event.target.result;
  var podaci = [
    {id_kolegija: 1, naziv: "Matematicka analiza 1"}, {id_kolegija: 2, naziv: "Matematicka analiza 2"},
    {id_kolegija: 3, naziv: "Linearna algebra 1"}, {id_kolegija: 4, naziv: "Linearna algebra 2"}
  ];
  var transakcija = db.transaction(["kolegiji"], "readwrite");
  transakcija.onerror = function(event) {
    console.log("Error: " + event.target.error);
  };
  var kolegijiStore = transakcija.objectStore("kolegiji");
  for(var i = 0; i < podaci.length; i++) {
    kolegijiStore.put(podaci[i]);
  }
};
