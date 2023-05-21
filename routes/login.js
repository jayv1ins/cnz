var express = require('express');
var router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const loginController = require('../controllers/loginController');

router.get('/login', loginController.getLogin);
router.post('/login', loginController.postLogin);

module.exports = router;
