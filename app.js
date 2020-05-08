const express = require('express')
const handlebars = require('express-handlebars')

const db = require('./models')
const bodyParser = require('body-parser')
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('./config/passport')
const app = express()
const port = 3000

app.set('view engine', 'hbs')
app.engine('.hbs', handlebars({
  extname: '.hbs',
  defaultLayout: 'main'
}));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }))

app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }))
app.use(flash())

app.use((req, res, next) => {
  res.locals.success_messages = req.flash('success_messages')
  res.locals.error_messages = req.flash('error_messages')
  next()
})
app.use(passport.initialize())
app.use(passport.session())

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
})

require('./routes')(app, passport)