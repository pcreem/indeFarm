const adminController = {
  getDashboard: (req, res) => {
    return res.render('admin/dashboard')
  }
}

module.exports = adminController