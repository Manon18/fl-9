module.exports = (function() {
  'use strict';

  let fs = require('fs');
    
  function getAll() {
    let cars = JSON.parse(fs.readFileSync('db/data.json', 'utf8')); 
    return cars;
  }

  function get(id) {       
    let cars = JSON.parse(fs.readFileSync('db/data.json', 'utf8')); 
    return cars.find(car => car.id === id);
  }

  function create(car) {
    let cars = JSON.parse(fs.readFileSync('db/data.json', 'utf8')); 

    let id = car.id;
    let findCar = cars.find(el => el.id === id);

    if (findCar) {
      return null;

    } else {
      cars.push(car);
      fs.writeFileSync('db/data.json', JSON.stringify(cars), {encoding: 'utf8'});
      return car;      
    }
  } 

  function put(id, car) {
    let cars = JSON.parse(fs.readFileSync('db/data.json', 'utf8'));

    let carToUpdate = cars.find(car => car.id === id);

    if (!carToUpdate) {
      return null;
    } else {
      carToUpdate.brand = car.brand;
      carToUpdate.model = car.model;
      carToUpdate.engineVolume = car.engineVolume;
      carToUpdate.year = car.year;

      fs.writeFileSync('db/data.json', JSON.stringify(cars), {encoding: 'utf8'});

      return car;
    }
  }

  function remove(id) {
    let cars = JSON.parse(fs.readFileSync('db/data.json', 'utf8'));

    let carToDelete = cars.find(c => c.id === id);
    let index = cars.indexOf(carToDelete);
    cars.splice(index, 1);

    if (!carToDelete) {
      return null;
    } else {
      fs.writeFileSync('db/data.json', JSON.stringify(cars), {encoding: 'utf8'});
      return carToDelete;
    }
  }

  return {
    getAll,
    get,
    create,
    put,
    remove
  };

})();
