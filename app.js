const express = require('express')
const handlebars = require('express-handlebars')
const db = require('./models')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

app.set('view engine', 'hbs')
app.engine('.hbs', handlebars({
  extname: '.hbs',
  defaultLayout: 'main'
}));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
})

require('./routes')(app)