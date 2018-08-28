function findType(dataType) {
  return typeof dataType;
}

function forEach(arr, callback) {
  for (let y = 0; y < arr.length; y++) {
    callback(arr[y]);
  }
}

function map(arr, callback) {
  let mapArr = [];
  forEach(arr, function(inputData) {
    let transform = callback(inputData);
    mapArr.push(transform);
  });
  return mapArr;
}

function filter(arr, filterCallback) {
  let filterArr = [];
  forEach(arr, function(element) {
    if (filterCallback(element)) {
      filterArr.push(element);
    }
  });
  return filterArr;
}

function getAdultAppleLovers(arr) {
  let filteredArr = filter(arr, function(element) {
    return element.age > 18 && element.favoriteFruit === 'apple';
  });
  let namesArr = map(arr, function(input) {
    return input.name;
  });
  return namesArr;
}

function keys(objArr) {
  let keysArr = [];
  for (let key in objArr) {
    if (objArr.hasOwnProperty(key)) {
      keysArr.push(key);
    }
  }
  return keysArr;
}

function values(objectArr) {
  let valuesArr = [];
  for (let prop in objectArr) {
    if (objectArr.hasOwnProperty(prop)) {
      valuesArr.push(objectArr[prop]);
    }
  }
  return valuesArr;
}

function showFormattedDate(dateFormatted) {
  let month = ['Jan', 'Feb', 'Mar', 
  'Apr', 'May', 'Jun', 'Jul', 'Aug', 
  'Sep', 'Oct', 'Nov', 'Dec'];
  let dayOfMonth = dateFormatted.getDate();
  let monthOfYear = dateFormatted.getMonth();
  let year = dateFormatted.getFullYear();

  return 'It is ' + dayOfMonth + ' of ' + month[monthOfYear] + ', ' + year;
}
