let http = {
  get: function(url) {
    return new Promise(function(resolve, reject) {
      let xhr = new XMLHttpRequest();
      xhr.open('GET', url);

      xhr.onload = function() {
        if(xhr.status === 200 || xhr.readyState === 4) {
          resolve(JSON.parse(this.response));
        } else {
          reject({request: xhr});
        }
      };

      xhr.onerror = function() {
        reject(new Error('Network connection problems'));
      };

      xhr.send();
    });
  }
};

let latInput = document.getElementById('lat');
let lonInput = document.getElementById('lon');
let locationBtn = document.getElementById('btn');
let water = document.getElementsByClassName('animation-center-water')[0];
let land = document.getElementsByClassName('animation-center-land')[0];
let loader = document.getElementsByClassName('spinner')[0];

water.style.display = 'none';
land.style.display = 'none';
loader.style.display = 'none';

function userLocation() {
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;

      latInput.value = lat;
      lonInput.value = lon;
    });
  }  

  locationBtn.addEventListener('click', function() {
    let lat = latInput.value;
    let lon = lonInput.value;

    loader.style.display = 'block';
    let onwaterApi = `https://api.onwater.io/api/v1/results/${lat},${lon}`;

    http.get(onwaterApi)
      .then(function(data) {
        loader.style.display = 'none';
        if(data.water) {
          water.style.display = 'block';
          land.style.display = 'none';
        } else {
          water.style.display = 'none';
          land.style.display = 'block';
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  });
}

userLocation();
