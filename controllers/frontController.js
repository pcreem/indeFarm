const db = require('../models')
const Agrifood = db.Agrifood
const User = db.User
const Category = db.Category
const News = db.News

require('dotenv').config()
const imgur = require('imgur-node-api')
const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID
const fs = require('fs')

const frontController = {
  getIndex: (req, res) => {
    return Agrifood.findAll({ include: Category, limit: 6, raw: true }).then(agrifoods => {
      News.findAll({ limit: 6, raw: true }).then(news => {
        return res.render('index', {
          agrifoods: agrifoods,
          news: news
        })
      })
    })
  }
}
module.exports = frontController