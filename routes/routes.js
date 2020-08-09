const frontController = require('../controllers/frontController.js')
const adminController = require('../controllers/adminController.js')
const userController = require('../controllers/userController.js')
const express = require('express');
const router = express.Router();

const passport = require('../config/passport')



const authenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    if (req.user.approved) { return next() }
    return res.redirect('/')
  }
  res.redirect('/')
}
const authenticatedAdmin = (req, res, next) => {
  if (req.isAuthenticated()) {
    if (req.user.role) { return next() }
    return res.redirect('/')
  }
  res.redirect('/')
}

const multer = require('multer')
const upload = multer({ dest: 'temp/' })

router.get('/', (req, res) => res.redirect('/index'))
router.get('/index', frontController.getIndex)
router.get('/agrifoods', frontController.getAgrifoods)
router.post('/agrifoods/search', frontController.searchAgrifoods)
router.get('/agrifoods/:id', frontController.getAgrifood)
router.get('/newses', frontController.getNewses)
router.get('/newses/:id', frontController.getNews)

router.get('/signup', userController.signUpPage)
router.post('/signup', userController.signUp)
router.get('/signin', userController.signInPage)
router.post('/signin', passport.authenticate('local', { failureRedirect: '/signin', failureFlash: true }), userController.signIn)
router.get('/logout', userController.logout)

//both admin and user
router.get('/admin', authenticated, (req, res) => res.redirect('/admin/dashboard'))
router.get('/admin/dashboard', authenticated, adminController.getDashboard)
router.get('/admin/agrifoods/create', authenticated, adminController.getAgrifoodCEpage)
router.post('/admin/agrifoods', authenticated, upload.single('image'), adminController.postAgrifood)
router.get('/admin/agrifoods/:id', authenticated, adminController.getAgrifood)
router.get('/admin/agrifoods/:id/edit', authenticated, adminController.editAgrifood)
router.put('/admin/agrifoods/:id', authenticated, upload.single('image'), adminController.putAgrifood)
router.delete('/admin/agrifoods/:id', authenticated, adminController.deleteAgrifood)

router.get('/admin/news', authenticated, adminController.getNewses)
router.get('/admin/news/create', authenticated, adminController.getNewsCEpage)
router.post('/admin/newses', authenticated, upload.single('image'), adminController.postNews)
router.get('/admin/newses/:id', authenticated, adminController.getNews)
router.get('/admin/newses/:id/edit', authenticated, adminController.editNews)
router.put('/admin/newses/:id', authenticated, upload.single('image'), adminController.putNews)
router.delete('/admin/newses/:id', authenticated, adminController.deleteNews)

router.get('/admin/profile', authenticated, adminController.getProfile)
router.get('/admin/profile/:id/edit', authenticated, adminController.getProfileCEpage)
router.put('/admin/profile/:id', authenticated, adminController.putProfile)

//admin only
router.get('/admin/members', authenticatedAdmin, adminController.getMembers)
router.get('/admin/members/:id', authenticatedAdmin, adminController.getMember)
router.put('/admin/members/:id', authenticatedAdmin, adminController.putApproved)

router.get('/admin/categories', authenticatedAdmin, adminController.getCategories)
router.get('/admin/categories/create', authenticated, adminController.getCategoryCEpage)
router.post('/admin/categories', authenticatedAdmin, adminController.postCategory)
router.get('/admin/categories/:id', authenticatedAdmin, adminController.getCategory)
router.put('/admin/categories/:id', authenticatedAdmin, adminController.putCategory)
router.delete('/admin/categories/:id', authenticatedAdmin, adminController.deleteCategory)

router.get('/*', (req, res) => res.redirect('/index'))

module.exports = router

