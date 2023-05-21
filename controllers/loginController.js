const { PrismaClient } = require('@prisma/client');
const { encrypt } = require('../utils/index');

const prisma = new PrismaClient();

exports.index = (req, res) => {
  res.render('login');
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return;
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return res.render('login', { errorMessage: 'Email does not exist!' });
  }

  try {
    const encryptedPassword = encrypt(password, user.shift);
    if (encryptedPassword !== user.password) {
      throw new Error();
    }
  } catch (error) {
    return res.render('login', { errorMessage: 'Incorrect Password!' });
  }

  // register user session
  req.session.user = user;

  return res.redirect('home');
};
