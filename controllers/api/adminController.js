const db = require('../../models')
const News = db.News
const adminService = require('../../services/adminService.js')

require('dotenv').config()
const imgur = require('imgur-node-api')
const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID
const fs = require('fs')

const adminController = {
  getNewses: (req, res) => {

    adminService.getNewses(req, res, (data) => {
      return res.json(data)
    })
  }
}
module.exports = adminController