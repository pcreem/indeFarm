const frontController = require('../controllers/frontController.js')
const adminController = require('../controllers/adminController.js')
const managerController = require('../controllers/managerController.js')

module.exports = app => {
  app.get('/', (req, res) => res.redirect('/index'))
  app.get('/index', frontController.getIndex)

  app.get('/signup', managerController.signUpPage)
  app.post('/signup', managerController.signUp)

  app.get('/admin', (req, res) => res.redirect('/admin/dashboard'))
  app.get('/admin/dashboard', adminController.getDashboard)
}