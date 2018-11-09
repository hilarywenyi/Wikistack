const express = require('express');
const morgan = require('morgan');
const app = express();
const views = require('./views');
const { db } = require('./models');

db.authenticate().
then(() => {
  console.log('connected to the database');
})

app.use(express.urlencoded({ extended: false }));

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res, next) => {
  res.send(views.main(''));
});


const PORT = 3000;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
