const express = require('express');
const morgan = require('morgan');
const app = express();
const models = require('./models');
const path = require('path')

const wikiRouter = require('./routes/wiki');
const userRouter = require('./routes/user');


app.use(express.urlencoded({ extended: false }));

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname + '/public')));
app.use('/wiki', wikiRouter);
app.use('/users', userRouter)
app.get('/', (req, res, next) => {
  res.redirect('/wiki');
});


const PORT = 3000;

models.db.authenticate().
then(() => {
  console.log('connected to the database');
})

const init = async () => {
  await models.User.sync();
  await models.Page.sync();
  //await models.db.sync();
  //{force:true}
  app.listen(PORT, () => {
    console.log(`App listening in port ${PORT}`);
  });
};
init();
