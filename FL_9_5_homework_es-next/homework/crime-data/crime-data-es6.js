function victimDataSource(name) {
  let victimsByName = {
    'John': {
      name: 'John',
      surname: 'Doe',
      age: '99',
      jobTitle: 'Victim'
    },
    'Jennifer': {
      name: 'Jennifer',
      surname: 'Nicker',
      age: '21',
      jobTitle: 'Artist'
    }
  };

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (victimsByName.hasOwnProperty(name)) {
        resolve(victimsByName[name]);
      } else {
        reject('unknown victim');
      }
    }, 1000);
  });
}

function crimeDataSource(surname) {
  return new Promise((resolve, reject) => {
    let crimeBySurname = {
      'Doe': {
        title: 'dank memes',
        place: '9gag'
      },
      'Nicker': {
        title: 'robbery',
        place: 'NYC'
      }
    };

    setTimeout(() => {
      if (crimeBySurname.hasOwnProperty(surname)) {
        resolve(crimeBySurname[surname]);
      } else {
        reject('unknown surname');
      }
    }, 500);
  });
}

function loadVictimData(name) {
  return new Promise((resolve, reject) => {
    victimDataSource(name)
    .then((victim) => {
      crimeDataSource(victim.surname)
      .then((crime) => {
        resolve(`${victim.name} ${victim.surname}(${victim.jobTitle, victim.age}) \
${'suffered from'} ${crime.title} ${'in'} ${crime.place}`);
      })
    }).catch(() => {
      reject('unknown victim');
    })
  })
}
