let express = require('express');
let app = express();
let routes = require('./routes');
let bodyParser = require('body-parser');
let deleteAuthorization = require('./middlewares/delete-authorization');

let port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.delete('/car/:id', deleteAuthorization);

app.use('/car', routes);

app.listen(port, function () {
  console.log('Server started!');
});
