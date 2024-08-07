// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.get("/api/:date?", (req, res) => {
  const dateParam = req.params.date;
  let date;

  // Verificar si dateParam es un número (timestamp en milisegundos)
  if (dateParam === undefined || dateParam === '') {
    date = new Date();
  } else if (!isNaN(dateParam)) {
    date = new Date(parseInt(dateParam));
  } else {
    date = new Date(dateParam)
  }

  // Validación de la fecha
  if (isNaN(date.getTime())) {
    return res.status(400).json({ error: 'Invalid Date' });
  }

  const response = {
    unix: date.getTime(),
    utc: date.toUTCString()
  };

  res.json(response);

})

// Listen on port set in environment variable or default to 3001
var listener = app.listen(process.env.PORT || 3001, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
