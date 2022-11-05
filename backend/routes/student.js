const express = require('express');
const router = express.Router();
const student = require('../models/student_model');  //täällä student otetaan vastaan

router.get('/:id?',  //get-pyyntö tässä, id-parametri
 function(request, response) {
  if (request.params.id) {
    student.getById(request.params.id, function(err, dbResult) { //palauttaa errorin tai tuloksen
      if (err) {
        response.json(err);
      } else {
        response.json(dbResult[0]); //tähän lisättiin nolla niin ei palauta arrayta
      }
    });
  } else {
    student.getAll(function(err, dbResult) {
      if (err) {
        response.json(err);
      } else {
        response.json(dbResult);
      }
    });
  }
});


router.post('/', 
function(request, response) {
  student.add(request.body, function(err, dbResult) {
    if (err) {
      response.json(err);
    } else {
      response.json(request.body);
    }
  });
});


router.delete('/:id', 
function(request, response) {
  student.delete(request.params.id, function(err, dbResult) {
    if (err) {
      response.json(err);
    } else {
      response.json(dbResult);
    }
  });
});


router.put('/:id', 
function(request, response) {
  student.update(request.params.id, request.body, function(err, dbResult) {
    if (err) {
      response.json(err);
    } else {
      response.json(dbResult);
    }
  });
});

module.exports = router;