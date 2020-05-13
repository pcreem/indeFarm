const frontController = require('../controllers/frontController.js')
const adminController = require('../controllers/adminController.js')
const userController = require('../controllers/userController.js')

module.exports = (app, passport) => {

  const authenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next()
    }
    res.redirect('/signin')
  }
  const authenticatedAdmin = (req, res, next) => {
    if (req.isAuthenticated()) {
      if (req.user.role) { return next() }
      return res.redirect('/')
    }
    res.redirect('/signin')
  }

  app.get('/', (req, res) => res.redirect('/index'))
  app.get('/index', frontController.getIndex)

  app.get('/signup', userController.signUpPage)
  app.post('/signup', userController.signUp)
  app.get('/signin', userController.signInPage)
  app.post('/signin', passport.authenticate('local', { failureRedirect: '/signin', failureFlash: true }), userController.signIn)
  app.get('/logout', userController.logout)

  app.get('/admin', authenticatedAdmin, (req, res) => res.redirect('/admin/dashboard'))
  app.get('/admin/dashboard', authenticatedAdmin, adminController.getDashboard)
  app.get('/admin/agrifoods/create', authenticatedAdmin, adminController.getAgrifoodCEpage)
  app.post('/admin/agrifoods', authenticatedAdmin, adminController.postAgrifood)


}