const router = require('express').Router();
const editController = require('../controllers/editController');
const { isAuth } = require('../middlewares/isAuth');

router.get('/edit/:id', isAuth, editController.getEdit);
router.post('/edit/:id', isAuth, editController.updatedData);

module.exports = router;
