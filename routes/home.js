const router = require('express').Router();
const homeController = require('../controllers/homeController');
const { isAuth } = require('../middlewares/isAuth');

router.get('/home', isAuth, homeController.getHome);
router.post('/home', isAuth, homeController.postHome);
router.get("/delete:id", isAuth, homeController.deleteData);

module.exports = router;
