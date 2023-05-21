var express = require('express');
var router = express.Router();

const registerController = require('../controllers/registerController');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
router.get('/register', registerController.getRegister);
router.post('/register', registerController.postRegister);

module.exports = router;
