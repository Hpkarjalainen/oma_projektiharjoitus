const mysql = require('mysql');
const connection = mysql.createPool({
  host: 'localhost',
  user: 'hannu',  //tähän luotiin uusi käyttäjä
  password: 'netpass',
  database: 'oma_projektiharj'  //tähän oma tietokanta
});
module.exports = connection;