const frontController = require('../controllers/frontController.js')
const adminController = require('../controllers/adminController.js')
const userController = require('../controllers/userController.js')

module.exports = (app, passport) => {

  const authenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      if (req.user.approved) { return next() }
      return res.redirect('/')
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
  app.get('/agrifoods', frontController.getAgrifoods)
  app.get('/agrifoods/:id', frontController.getAgrifood)
  app.get('/newses', frontController.getNewses)
  app.get('/newses/:id', frontController.getNews)

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

  app.get('/admin/news', authenticated, adminController.getNewses)
  app.get('/admin/news/create', authenticated, adminController.getNewsCEpage)
  app.post('/admin/newses', authenticated, upload.single('image'), adminController.postNews)
  app.get('/admin/newses/:id', authenticated, adminController.getNews)
  app.get('/admin/newses/:id/edit', authenticated, adminController.editNews)
  app.put('/admin/newses/:id', authenticated, upload.single('image'), adminController.putNews)
  app.delete('/admin/newses/:id', authenticated, adminController.deleteNews)

  app.get('/admin/profile', authenticated, adminController.getProfile)
  app.get('/admin/profile/:id/edit', authenticated, adminController.getProfileCEpage)
  app.put('/admin/profile/:id', authenticated, adminController.putProfile)

  //admin only
  app.get('/admin/members', authenticatedAdmin, adminController.getMembers)
  app.get('/admin/members/:id', authenticatedAdmin, adminController.getMember)
  app.put('/admin/members/:id', authenticatedAdmin, adminController.putApproved)

  app.get('/admin/categories', authenticatedAdmin, adminController.getCategories)
  app.get('/admin/categories/create', authenticated, adminController.getCategoryCEpage)
  app.post('/admin/categories', authenticatedAdmin, adminController.postCategory)
  app.get('/admin/categories/:id', authenticatedAdmin, adminController.getCategory)
  app.put('/admin/categories/:id', authenticatedAdmin, adminController.putCategory)
  app.delete('/admin/categories/:id', authenticatedAdmin, adminController.deleteCategory)

}