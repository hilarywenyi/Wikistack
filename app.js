const express = require('express')
const morgan = require('morgan')
const views = require('./views')
const app = express()

app.use(express.urlencoded({extended:false}))
app.use(morgan('dev'))
app.use(express.static(__dirname + '/public'))
app.get('/', (req,res,next)=>{
    res.send(views.main())
});

const { db } = require('./models');
db.authenticate().
then(() => {
  console.log('connected to the database');
})

const PORT = 3000;

app.listen(PORT, ()=>{
    console.log(`App listening in port ${PORT}`)
})
