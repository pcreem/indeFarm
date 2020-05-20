const db = require('../models')
const Agrifood = db.Agrifood

const adminController = {
  getDashboard: (req, res) => {
    return Agrifood.findAll({ raw: true }).then(agrifoods => {
      return res.render('admin/dashboard', { agrifoods: agrifoods })
    })
  },

  getAgrifoodCEpage: (req, res) => {
    return res.render('admin/creatEdit/agrifood')
  },

  postAgrifood: (req, res) => {
    if (!req.body.name) {
      req.flash('error_messages', "name didn't exist")
      return res.redirect('back')
    }
    return Agrifood.create({
      name: req.body.name,
      price: req.body.price,
      freight: req.body.freight,
      norm: req.body.norm,
      description: req.body.description,
      //image: file ? img.data.link : null,
      CategoryId: req.body.CategoryId,
      UserId: req.user.id
    })
      .then((agrifood) => {
        req.flash('success_messages', 'agrifood was successfully created')
        res.redirect('/admin/dashboard')
      })
  },

  getAgrifood: (req, res) => {
    return Agrifood.findByPk(req.params.id, { raw: true }).then(agrifood => {
      return res.render('admin/agrifood', {
        agrifood: agrifood
      })
    })
  },

  editAgrifood: (req, res) => {
    return Agrifood.findByPk(req.params.id, { raw: true }).then(agrifood => {
      return res.render('admin/creatEdit/agrifood', { agrifood: agrifood })
    })
  },

  putAgrifood: (req, res) => {
    if (!req.body.name) {
      req.flash('error_messages', "name didn't exist")
      return res.redirect('back')
    }
    return Agrifood.findByPk(req.params.id)
      .then((agrifood) => {
        agrifood.update({
          name: req.body.name,
          price: req.body.price,
          freight: req.body.freight,
          norm: req.body.norm,
          description: req.body.description,
          //image: file ? img.data.link : null,
          CategoryId: req.body.CategoryId,
          UserId: req.user.id
        })
          .then((agrifood) => {
            req.flash('success_messages', 'agrifood was successfully edited')
            res.redirect('/admin/dashboard')
          })
      })
  },

  deleteAgrifood: (req, res) => {
    return Agrifood.findByPk(req.params.id)
      .then((agrifood) => {
        agrifood.destroy()
          .then((agrifood) => {
            res.redirect('/admin/dashboard')
          })
      })
  }
}

module.exports = adminController