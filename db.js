const low = require("lowdb");
const db = low("server/db.json");

// Populate database with data from fixtures
db
  .defaults({
    subscriptions: []
  })
  .value();

module.exports = db;
