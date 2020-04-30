const frontController = require('../controllers/frontController.js')
const adminController = require('../controllers/adminController.js')

module.exports = app => {
  app.get('/', (req, res) => res.redirect('/index'))
  app.get('/index', frontController.getIndex)

  app.get('/admin', (req, res) => res.redirect('/admin/dashboard'))
  app.get('/admin/dashboard', adminController.getDashboard)
}