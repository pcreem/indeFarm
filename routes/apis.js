const express = require('express')
const router = express.Router()
const passport = require('../config/passport')
const userController = require('../controllers/api/userController.js')
const adminController = require('../controllers/api/adminController.js')

const authenticated = passport.authenticate('jwt', { session: false })

const authenticatedAdmin = (req, res, next) => {
  if (req.user) {
    if (req.user.isAdmin) { return next() }
    return res.json({ status: 'error', message: 'permission denied' })
  } else {
    return res.json({ status: 'error', message: 'permission denied' })
  }
}

router.get('/admin/news', authenticated, adminController.getNewses)
router.post('/signin', userController.signIn)

module.exports = router