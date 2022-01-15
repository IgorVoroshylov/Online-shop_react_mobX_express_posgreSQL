const Router = require('express');
const router = new Router();
const TypeController = require('../controllers/type.Controller');
const checkRole = require('../middleware/checkRoleMiddleware');

router.post('/', checkRole("ADMIN"), TypeController.create); // установили checkRole, midleware для проверки статуса пользователя
router.get('/', TypeController.getAll);

module.exports = router;