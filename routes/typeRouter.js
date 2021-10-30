const Router = require('express');
const router = new Router();
const TypeController = require('../controllers/type.Controller');
const checkRole = require('../middleware/checkRoleMiddleware');

router.post('/', checkRole("ADMIN"), TypeController.create); //установили checkRole 2м параметром
router.get('/', TypeController.getAll);

module.exports = router;