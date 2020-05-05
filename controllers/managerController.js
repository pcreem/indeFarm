const bcrypt = require('bcryptjs')
const db = require('../models')
const Manager = db.Manager

const managerController = {
  signUpPage: (req, res) => {
    return res.render('signup')
  },

  signUp: (req, res) => {
    console.log(req.body.name)
    Manager.create({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10), null)
    }).then(user => {
      return res.redirect('/signin')
    })
  }
}

module.exports = managerController