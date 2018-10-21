module.exports = (function() {
  'use strict';

  return function(request, response, next) {
    let authHeader = request.header('Authorization');

    if (authHeader === 'X-Password qwerty') {
      next();
    } else {
      response.send(401, 'Unauthorized');
    }
  };
   
})();
