//TÄMÄN TEIN ITSE, TARKISTA TARKKAAN!
const express = require('express');
const router = express.Router();
const grade = require('../models/grade_model');  //täällä grade otetaan vastaan

router.get('/:id?',  //get-pyyntö tässä, id-parametri
 function(request, response) {
  if (request.params.id) {
    grade.getById(request.params.id, function(err, dbResult) { //palauttaa errorin tai tuloksen
      if (err) {
        response.json(err);
      } else {
        response.json(dbResult[0]); //tähän lisättiin nolla niin ei palauta arrayta
      }
    });
  } else {
    grade.getAll(function(err, dbResult) {
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
  grade.add(request.body, function(err, dbResult) {
    if (err) {
      response.json(err);
    } else {
      response.json(request.body);
    }
  });
});


router.delete('/:id', 
function(request, response) {
  grade.delete(request.params.id, function(err, dbResult) {
    if (err) {
      response.json(err);
    } else {
      response.json(dbResult);
    }
  });
});


router.put('/:id', 
function(request, response) {
  grade.update(request.params.id, request.body, function(err, dbResult) {
    if (err) {
      response.json(err);
    } else {
      response.json(dbResult);
    }
  });
});

module.exports = router;