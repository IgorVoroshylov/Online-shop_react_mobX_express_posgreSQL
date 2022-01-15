const Router = require('express');
const router = new Router();
const UserController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const { check, validationResult } = require('express-validator')

router.post('/registration',
   [
      check('email', 'Некоректный email').isEmail(), // check Midleware
      check('password', 'Некоректный password').isLength({min: 4})
   ],
   UserController.registration);

router.post('/login',
   [
      check('email', 'Некоректный login или email').normalizeEmail().isEmail(),
      check('password', 'Некоректный login или email').exists()
   ],
   UserController.login);

router.get('/auth', authMiddleware, UserController.check); // authMiddleware проверяет наличие регистрации

module.exports = router;