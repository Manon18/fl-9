module.exports = (function() {
  'use strict';
   return function(request, response, next) {
    let authHeader = request.header('Authorization');
    console.log(authHeader);

    if (authHeader === 'X-Password qwerty') {
      console.log('inside if');
      next();
    }else {
      console.log('inside else');
      response.send(401, 'Unauthorized');
    }
   };
   
})();
