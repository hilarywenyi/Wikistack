const express = require('express');
const morgan = require('morgan');
const app = express();
const views = require('./views');
const models = require('./models');

const wikiRouter = require('./routes/wiki');
const userRouter = require('./routes/user');
// ...
app.use('/wiki', wikiRouter);


app.use(express.urlencoded({ extended: false }));

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res, next) => {
  res.redirect('/wiki');
});


const PORT = 3000;

const init = async () => {
  await models.User.sync();
  await models.Page.sync();

  app.listen(PORT, () => {
    console.log(`App listening in port ${PORT}`);
  });
};


init();
