const express = require('express')
const handlebars = require('express-handlebars')
const app = express()
const port = 3000

app.set('view engine', 'hbs')
app.engine('.hbs', handlebars({
  extname: '.hbs',
  defaultLayout: 'main'
}));
app.use(express.static(__dirname + '/public'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
})

require('./routes')(app)