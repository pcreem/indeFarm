const db = require('../models')
const Agrifood = db.Agrifood
const User = db.User
require('dotenv').config()
const imgur = require('imgur-node-api')
const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID
const fs = require('fs')

const adminController = {
  getDashboard: (req, res) => {
    let whereQuery = {}
    whereQuery['UserId'] = req.user.id
    if (req.user.role) {
      return Agrifood.findAll({ raw: true }).then(agrifoods => {
        return res.render('admin/dashboard', { agrifoods: agrifoods })
      })
    }
    return Agrifood.findAll({ where: whereQuery, raw: true }).then(agrifoods => {
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
    return Agrifood.findByPk(req.params.id, { raw: true }).then(agrifood => {
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
    return Agrifood.findByPk(req.params.id, { raw: true }).then(agrifood => {
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

  getMembers: (req, res) => {
    return User.findAll({ raw: true }).then(members => {
      return res.render('admin/dashboard', { members: members })
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