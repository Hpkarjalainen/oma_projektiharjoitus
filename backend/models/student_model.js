//TÄMÄ TOIMII
const db = require('../database');
const bcrypt = require('bcryptjs');  //tämä lisättiin salasanan salausta varten

const saltRounds = 10;

const student = {           //olio nimeltä student, ja sille funktioita
  getById: function (id, callback) {
    return db.query('select * from student where id_student=?', [id], callback);
  },
  getAll: function (callback) {
    return db.query('select * from student', callback);
  },
  add: function (add_data, callback) {
    bcrypt.hash(add_data.password, saltRounds, function (err, hashedPassword) {      //add.data lisätty, hashedPassword nimetty
      return db.query(                                            //ennen kuin salasana laitetaan tietokantaan, se salataan
        'insert into student (id_student,fname,lname,password) values(?,?,?,?)',
        [add_data.id_student, add_data.fname, add_data.lname, hashedPassword],
        callback);
    });
  },
  delete: function (id, callback) {
    return db.query('delete from student where id_student=?', [id], callback);
  },
  update: function (id, update_data, callback) {
    bcrypt.hash(update_data.password, saltRounds, function (err, hashedPassword) {   //tänne update_data.password
      return db.query(
        'update student set fname=?,lname=?, password=? where id_student=?',
        [update_data.fname, update_data.lname, hashedPassword, id],   //tänne hashedPassword
        callback);
    });
  }
}; //olio student päättyy

module.exports = student;  //koko student objektin exporttaus