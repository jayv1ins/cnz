const router = require('express').Router();
const homeController = require('../controllers/homeController');
const { isAuth } = require('../middlewares/isAuth');
const { isAdmin } = require('../middlewares/isAdmin');

router.get('/home', isAuth, homeController.getHome);
router.post('/home', isAuth, homeController.postHome);
router.get("/delete:id", isAuth, isAdmin, homeController.deleteData);

module.exports = router;
