const db = require('../models')
const News = db.News


const adminService = {
  getNewses: (req, res, callback) => {
    return News.findAll({ raw: true }).then(newses => {
      callback({ newses: newses })
    })
  }
}

module.exports = adminService