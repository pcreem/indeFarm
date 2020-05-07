const frontController = require('../controllers/frontController.js')
const adminController = require('../controllers/adminController.js')
const userController = require('../controllers/userController.js')

module.exports = app => {
  app.get('/', (req, res) => res.redirect('/index'))
  app.get('/index', frontController.getIndex)

  app.get('/signup', userController.signUpPage)
  app.post('/signup', userController.signUp)

  app.get('/admin', (req, res) => res.redirect('/admin/dashboard'))
  app.get('/admin/dashboard', adminController.getDashboard)
}