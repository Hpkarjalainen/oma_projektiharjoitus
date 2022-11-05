const express = require('express');
const router = express.Router();
const course = require('../models/course_model');  //täällä course otetaan vastaan

router.get('/:id?',  //get-pyyntö tässä, id-parametri
 function(request, response) {
  if (request.params.id) {
    course.getById(request.params.id, function(err, dbResult) { //palauttaa errorin tai tuloksen
      if (err) {
        response.json(err);
      } else {
        response.json(dbResult[0]); //tähän lisättiin nolla niin ei palauta arrayta
      }
    });
  } else {
    course.getAll(function(err, dbResult) {
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
  course.add(request.body, function(err, dbResult) {
    if (err) {
      response.json(err);
    } else {
      response.json(request.body);
    }
  });
});


router.delete('/:id', 
function(request, response) {
  course.delete(request.params.id, function(err, dbResult) {
    if (err) {
      response.json(err);
    } else {
      response.json(dbResult);
    }
  });
});


router.put('/:id', 
function(request, response) {
  course.update(request.params.id, request.body, function(err, dbResult) {
    if (err) {
      response.json(err);
    } else {
      response.json(dbResult);
    }
  });
});

module.exports = router;