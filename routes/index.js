const frontController = require('../controllers/frontController.js')
module.exports = app => {

  //如果使用者訪問首頁，就導向 /restaurants 的頁面
  app.get('/', (req, res) => res.redirect('/index'))

  //在 /restaurants 底下則交給 restController.getRestaurants 來處理
  app.get('/index', frontController.getIndex)
}