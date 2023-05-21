var express = require('express');
var router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const homeController = require('../controllers/homeController');

router.get('/home', homeController.getHome);
router.post('/home', homeController.postHome);
router.get("/delete:id", homeController.deleteData);

module.exports = router;
