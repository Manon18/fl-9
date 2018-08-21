const userLogin = prompt('Login:');

if (userLogin === '' || userLogin === null) {
  alert('Canceled.');
} else if (userLogin.length < 4) {
    alert(`I don't know any users having name length less than 4 symbols`);
} else if (userLogin !== 'User') {
    alert(`I don’t know you`);
} else if (userLogin === 'User') {
    const userPassword = prompt('Password:');
    if (userPassword === '' || userPassword === null) {
      alert('Canceled.');
  } else if (userPassword !== 'SuperUser') {
      alert('Wrong password');
  } else if (userPassword === 'SuperUser') {
      if (new Date().getHours() < 20) {
        alert('Good day!');
      } else {
        alert('Good evening!');
      }
  }
}
