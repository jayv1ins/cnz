var express = require('express');
var router = express.Router();

const selectController = require('../controllers/selectController');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
router.get('/select/:id', selectController.getSelect);

module.exports = router;
