var express = require('express');
var router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const editController = require('../controllers/editController');

router.get('/edit/:id', editController.getEdit);
router.post('/edit/:id', editController.updatedData);

module.exports = router;
