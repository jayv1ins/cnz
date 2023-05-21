exports.isAdmin = (req, res, next) => {
  if (req.session.user && req.session.user.usertype === 'Admin') {
    return next();
  }

  return res.redirect('/404');
}