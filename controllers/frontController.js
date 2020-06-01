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
  },
  getAgrifoods: (req, res) => {
    let whereQuery = {}
    let categoryId = ''
    if (req.query.categoryId) {
      categoryId = Number(req.query.categoryId)
      whereQuery['CategoryId'] = categoryId
    }

    try {
      return Agrifood.findAll({ include: Category, where: whereQuery, raw: true }).then(agrifoods => {
        Category.findAll({ raw: true }).then(categorys => {
          return res.render('agrifoods', {
            agrifoods: agrifoods,
            categorys: categorys,
            categoryId: categoryId
          })
        })
      })
    } catch (err) {
      console.log(err)
    }
  },
  getAgrifood: (req, res) => {
    return Agrifood.findByPk(req.params.id, { raw: true }).then(agrifood => {
      return res.render('agrifood', {
        agrifood: agrifood
      })
    })
  },
}
module.exports = frontController