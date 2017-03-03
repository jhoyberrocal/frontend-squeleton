const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8083;

app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index', {title: 'puto'});
});

app.listen(PORT, () => {
  console.log('Hola Node Express');
});