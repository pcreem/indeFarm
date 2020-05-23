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

  const multer = require('multer')
  const upload = multer({ dest: 'temp/' })

  app.get('/', (req, res) => res.redirect('/index'))
  app.get('/index', frontController.getIndex)

  app.get('/signup', userController.signUpPage)
  app.post('/signup', userController.signUp)
  app.get('/signin', userController.signInPage)
  app.post('/signin', passport.authenticate('local', { failureRedirect: '/signin', failureFlash: true }), userController.signIn)
  app.get('/logout', userController.logout)

  //both admin and user
  app.get('/admin', authenticated, (req, res) => res.redirect('/admin/dashboard'))
  app.get('/admin/dashboard', authenticated, adminController.getDashboard)
  app.get('/admin/agrifoods/create', authenticated, adminController.getAgrifoodCEpage)
  app.post('/admin/agrifoods', authenticated, upload.single('image'), adminController.postAgrifood)
  app.get('/admin/agrifoods/:id', authenticated, adminController.getAgrifood)
  app.get('/admin/agrifoods/:id/edit', authenticated, adminController.editAgrifood)
  app.put('/admin/agrifoods/:id', authenticated, upload.single('image'), adminController.putAgrifood)
  app.delete('/admin/agrifoods/:id', authenticated, adminController.deleteAgrifood)

  //admin only
  app.get('/admin/members', authenticatedAdmin, adminController.getMembers)
  app.put('/admin/members/:id', authenticatedAdmin, adminController.putApproved)

}