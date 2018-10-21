module.exports = (function() {
  'use strict';

  let cars = require('./handlers/car');
  let router = require('express').Router();

  router.get('/', function (request, response) {
    response.send(cars.getAll());
  });

  router.get('/:id', function(request, response) {
    let id = request.params.id;

    let car = cars.get(parseInt(id));

    if (car) {
      response.status(200).send(car);
    } else {
      response.status(404).send();
    }
    
  });

  router.put('/:id', function(request, response) {
    let id = parseInt(request.params.id);

    let updateCar = cars.put(id, request.body);
    if (updateCar) {
      response.status(200).send(updateCar);
    } else {
      response.status(404).send();
    }
  });

  router.post('/', function(request, response) {

    let newCar = cars.create(request.body);

    if (newCar) {
      response.status(201).send(newCar);
    } else {
      response.status(409).send({'message': 'Car already exists.'});
    }
  });

  router.delete('/:id', function(request, response) {
    let removeCar = cars.remove(parseInt(request.params.id));

    if (removeCar) {
      response.status(200).send({'message': 'The car has been successfully removed'});
    } else {
      response.status(404).send();
    }
  });

  return router;
})();
