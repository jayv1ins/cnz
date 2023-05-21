exports.isAuth = (req, res, next) => {
  if (req.session.user) {
    return next();
  }

  return res.redirect('/login');
}