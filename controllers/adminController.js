const db = require('../models')
const Agrifood = db.Agrifood
const User = db.User
const Category = db.Category
const News = db.News

require('dotenv').config()
const imgur = require('imgur-node-api')
const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID
const fs = require('fs')

const adminController = {
  getProfile: (req, res) => {
    return User.findByPk(req.user.id, { raw: true }).then(profile => {
      return res.render('admin/profile', {
        profile: profile
      })
    })
  },
  getProfileCEpage: (req, res) => {
    return User.findByPk(req.user.id, { raw: true }).then(profile => {
      return res.render('admin/creatEdit/profile', {
        profile: profile
      })
    })
  },
  putProfile: (req, res) => {
    if (!req.body.name) {
      req.flash('error_messages', 'name didn\'t exist')
      return res.redirect('back')
    } else {
      return User.findByPk(req.user.id)
        .then((profile) => {
          profile.update({
            name: req.body.name,
            phone: req.body.phone,
            address: req.body.address,
            ATM: req.body.atm ? req.body.atm : null,
            email: req.body.email
          })
            .then((profile) => {
              res.redirect('/admin/profile')
            })
        })
    }
  },

  getNewses: (req, res) => {
    let whereQuery = {}
    if (req.user.role) {
      return News.findAll({ raw: true }).then(newses => {
        return res.render('admin/dashboard', {
          newses: newses
        })
      })
    }
    whereQuery['UserId'] = req.user.id
    return News.findAll({ where: whereQuery, raw: true }).then(newses => {
      return res.render('admin/dashboard', {
        newses: newses
      })
    })
  },
  getNewsCEpage: (req, res) => {
    return res.render('admin/creatEdit/news')
  },
  postNews: (req, res) => {
    if (!req.body.name) {
      req.flash('error_messages', "name didn't exist")
      return res.redirect('back')
    }

    const { file } = req
    if (file) {
      imgur.setClientID(IMGUR_CLIENT_ID);
      imgur.upload(file.path, (err, img) => {
        return News.create({
          name: req.body.name,
          description: req.body.description,
          image: file ? img.data.link : null,
          UserId: req.user.id
        }).then((news) => {
          req.flash('success_messages', 'news was successfully created')
          return res.redirect('/admin/news')
        })
      })
    }
    else {
      return News.create({
        name: req.body.name,
        description: req.body.description,
        image: null,
        UserId: req.user.id
      }).then((news) => {
        req.flash('success_messages', 'news was successfully created')
        return res.redirect('/admin/news')
      })
    }
  },
  getNews: (req, res) => {
    return News.findByPk(req.params.id, { raw: true }).then(news => {
      if (news.UserId !== req.user.id && !req.user.role) {
        req.flash('error_messages', '404 Page not found')
        return res.redirect('/index')
      }
      return res.render('admin/news', {
        news: news
      })
    })
  },
  editNews: (req, res) => {
    return News.findByPk(req.params.id, { raw: true }).then(news => {
      if (news.UserId !== req.user.id && !req.user.role) {
        req.flash('error_messages', '404 Page not found')
        return res.redirect('/index')
      }
      return res.render('admin/creatEdit/news', { news: news })
    })
  },
  putNews: (req, res) => {
    if (!req.body.name) {
      req.flash('error_messages', "name didn't exist")
      return res.redirect('back')
    }

    const { file } = req
    if (file) {
      imgur.setClientID(IMGUR_CLIENT_ID);
      imgur.upload(file.path, (err, img) => {
        return News.findByPk(req.params.id)
          .then((news) => {
            if (news.UserId !== req.user.id && !req.user.role) {
              req.flash('error_messages', '404 Page not found')
              return res.redirect('/index')
            }
            news.update({
              name: req.body.name,
              description: req.body.description,
              image: file ? img.data.link : news.image,
              UserId: req.user.id
            })
              .then((news) => {
                req.flash('success_messages', 'news was successfully to update')
                res.redirect('/admin/news')
              })
          })
      })
    }
    else
      return news.findByPk(req.params.id)
        .then((news) => {
          if (news.UserId !== req.user.id && !req.user.role) {
            req.flash('error_messages', '404 Page not found')
            return res.redirect('/index')
          }
          News.update({
            name: req.body.name,
            description: req.body.description,
            image: news.image,
            UserId: req.user.id
          })
            .then((news) => {
              req.flash('success_messages', 'news was successfully to update')
              res.redirect('/admin/news')
            })
        })
  },
  deleteNews: (req, res) => {
    return News.findByPk(req.params.id)
      .then((news) => {
        if (news.UserId !== req.user.id && !req.user.role) {
          req.flash('error_messages', '404 Page not found')
          return res.redirect('/index')
        }
        news.destroy()
          .then((news) => {
            res.redirect('/admin/news')
          })
      })
  },

  getDashboard: (req, res) => {
    let whereQuery = {}
    let categoryId = ''
    if (req.query.categoryId) {
      categoryId = Number(req.query.categoryId)
      whereQuery['CategoryId'] = categoryId
    }

    if (req.user.role) {
      return Agrifood.findAll({
        include: Category, where: whereQuery, raw: true,
        nest: true
      }).then(agrifoods => {
        Category.findAll({ raw: true }).then(categorys => {
          return res.render('admin/dashboard', {
            agrifoods: agrifoods,
            categorys: categorys,
            categoryId: categoryId
          })
        })
      })
    }
    whereQuery['UserId'] = req.user.id
    return Agrifood.findAll({ include: Category, where: whereQuery, raw: true }).then(agrifoods => {
      Category.findAll({ raw: true }).then(categorys => {
        return res.render('admin/dashboard', {
          agrifoods: agrifoods,
          categorys: categorys,
          categoryId: categoryId
        })
      })
    })
  },
  getAgrifoodCEpage: (req, res) => {
    Category.findAll({ raw: true }).then(categorys => {
      return res.render('admin/creatEdit/agrifood', {
        categorys: categorys
      })
    })
  },
  postAgrifood: (req, res) => {
    if (!req.body.name) {
      req.flash('error_messages', "name didn't exist")
      return res.redirect('back')
    }

    const { file } = req
    if (file) {
      imgur.setClientID(IMGUR_CLIENT_ID);
      imgur.upload(file.path, (err, img) => {
        return Agrifood.create({
          name: req.body.name,
          price: req.body.price,
          freight: req.body.freight,
          norm: req.body.norm,
          description: req.body.description,
          image: file ? img.data.link : null,
          CategoryId: req.body.CategoryId,
          UserId: req.user.id
        }).then((agrifood) => {
          req.flash('success_messages', 'agrifood was successfully created')
          return res.redirect('/admin/dashboard')
        })
      })
    }
    else {
      return Agrifood.create({
        name: req.body.name,
        price: req.body.price,
        freight: req.body.freight,
        norm: req.body.norm,
        description: req.body.description,
        image: null,
        CategoryId: req.body.CategoryId,
        UserId: req.user.id
      }).then((agrifood) => {
        req.flash('success_messages', 'agrifood was successfully created')
        return res.redirect('/admin/dashboard')
      })
    }
  },
  getAgrifood: (req, res) => {
    return Agrifood.findByPk(req.params.id, { include: User, raw: true, nest: true }).then(agrifood => {
      if (agrifood.UserId !== req.user.id && !req.user.role) {
        req.flash('error_messages', '404 Page not found')
        return res.redirect('/index')
      }
      return res.render('admin/agrifood', {
        agrifood: agrifood
      })
    })
  },
  editAgrifood: (req, res) => {
    return Agrifood.findByPk(req.params.id, { include: Category, raw: true }).then(agrifood => {
      if (agrifood.UserId !== req.user.id && !req.user.role) {
        req.flash('error_messages', '404 Page not found')
        return res.redirect('/index')
      }
      return res.render('admin/creatEdit/agrifood', { agrifood: agrifood })
    })
  },
  putAgrifood: (req, res) => {
    if (!req.body.name) {
      req.flash('error_messages', "name didn't exist")
      return res.redirect('back')
    }

    const { file } = req
    if (file) {
      imgur.setClientID(IMGUR_CLIENT_ID);
      imgur.upload(file.path, (err, img) => {
        return Agrifood.findByPk(req.params.id)
          .then((agrifood) => {
            if (agrifood.UserId !== req.user.id && !req.user.role) {
              req.flash('error_messages', '404 Page not found')
              return res.redirect('/index')
            }
            agrifood.update({

              name: req.body.name,
              price: req.body.price,
              freight: req.body.freight,
              norm: req.body.norm,
              description: req.body.description,
              image: file ? img.data.link : agrifood.image,
              CategoryId: req.body.CategoryId,
              UserId: req.user.id
            })
              .then((agrifood) => {
                req.flash('success_messages', 'agrifood was successfully to update')
                res.redirect('/admin/dashboard')
              })
          })
      })
    }
    else
      return Agrifood.findByPk(req.params.id)
        .then((agrifood) => {
          if (agrifood.UserId !== req.user.id && !req.user.role) {
            req.flash('error_messages', '404 Page not found')
            return res.redirect('/index')
          }
          agrifood.update({

            name: req.body.name,
            price: req.body.price,
            freight: req.body.freight,
            norm: req.body.norm,
            description: req.body.description,
            image: agrifood.image,
            CategoryId: req.body.CategoryId,
            UserId: req.user.id
          })
            .then((agrifood) => {
              req.flash('success_messages', 'agrifood was successfully to update')
              res.redirect('/admin/dashboard')
            })
        })
  },
  deleteAgrifood: (req, res) => {
    return Agrifood.findByPk(req.params.id)
      .then((agrifood) => {
        if (agrifood.UserId !== req.user.id && !req.user.role) {
          req.flash('error_messages', '404 Page not found')
          return res.redirect('/index')
        }
        agrifood.destroy()
          .then((agrifood) => {
            res.redirect('/admin/dashboard')
          })
      })
  },

  getCategories: (req, res) => {
    return Category.findAll({ raw: true }).then(categories => {
      return res.render('admin/dashboard', { categories: categories })
    })
  },
  getCategoryCEpage: (req, res) => {
    return res.render('admin/creatEdit/category')
  },
  postCategory: (req, res) => {
    if (!req.body.name) {
      req.flash('error_messages', 'name didn\'t exist')
      return res.redirect('back')
    } else {
      return Category.create({
        name: req.body.name
      })
        .then((category) => {
          res.redirect('/admin/categories')
        })
    }
  },
  getCategory: (req, res) => {
    return Category.findByPk(req.params.id, { raw: true }).then(category => {
      return res.render('admin/creatEdit/category', {
        category: category
      })
    })
  },
  putCategory: (req, res) => {
    if (!req.body.name) {
      req.flash('error_messages', 'name didn\'t exist')
      return res.redirect('back')
    } else {
      return Category.findByPk(req.params.id)
        .then((category) => {
          category.update(req.body)
            .then((category) => {
              res.redirect('/admin/categories')
            })
        })
    }
  },
  deleteCategory: (req, res) => {
    return Category.findByPk(req.params.id)
      .then((category) => {
        category.destroy()
          .then((category) => {
            res.redirect('/admin/categories')
          })
      })
  },

  getMembers: (req, res) => {
    return User.findAll({ raw: true }).then(members => {
      return res.render('admin/dashboard', { members: members })
    })
  },
  getMember: (req, res) => {
    return User.findByPk(req.params.id, { raw: true }).then(profile => {
      return res.render('admin/profile', {
        profile: profile
      })
    })
  },
  putApproved: (req, res) => {
    return User.findByPk(req.params.id).then(user => {
      user.update({ approved: !user.approved })
        .then(user => {
          return res.redirect('/admin/members')
        })
    })
  }
}

module.exports = adminController