const db = require('../models')
const Agrifood = db.Agrifood

const adminController = {
  getDashboard: (req, res) => {
    return res.render('admin/dashboard')
  },

  getAgrifoods: (req, res) => {
    return Agrifood.findAll({ raw: true }).then(agrifoods => {
      return res.render('admin/agrifoods', { agrifoods: agrifoods })
    })
  }
}

module.exports = adminController