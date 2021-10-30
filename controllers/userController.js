const ApiError = require('../error/ApiError');
const { User, Basket } = require('../models/models');
//когда дело доходит до авторизации, устанавливаем: npm i jsonwebtoken(генерация токена) bcrypt(что б хэшировать пароли и не хранить их в базе данных в открытом виде)
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

const generateJwt = (id, email, role) => {
   return jwt.sign({id, email, role},
      process.env.SECRET_KEY, //нужен секретный ключь, вынесен в .env
      {expiresIn: '1h'}) //третий параметр это опции, одна из основных отвечает сколько живет токен
};

class UserController {
   async registration(req, res, next) {

      const errors = validationResult(req);
      if(!errors.isEmpty()) {
         return res.status(400).json({
            errors: errors.array(),
            message: 'Не корректные данные при регистрации, убедитесь что длинна пароля не мение 4 символов'
         })
      }

      const {email, password, role} = req.body;

      // if(!email || !password) {
      //    return next(ApiError.badRequest('Некоректный email или password')); // вариант базовой валидации без express-validator
      // }

      const candidate = await User.findOne({where: {email}});
      if (candidate) {
         return next(ApiError.badRequest('Пользователь с таким email уже существует'));
      }
      const hashPassword = await bcrypt.hash(password, 5);
      const user = await User.create({email, role, password: hashPassword});
      const basket = await Basket.create({userId: user.id});
      const token = generateJwt(user.id, user.email, user.role);
      return res.json({token});
   }

   async login(req, res, next) {

      const errors = validationResult(req);
      if(!errors.isEmpty()) {
         return res.status(400).json({
            errors: errors.array(),
            message: 'Не корректные данные при регистрации'
         })
      }

      const {email, password} = req.body;
      const user = await User.findOne({where: {email}}); //ищем пользователя
      if(!user) {
         return next(ApiError.internal('пользователь с таким именем не найден'));
      }
      let comparePassword = bcrypt.compareSync(password, user.password); //проверяем пароль который был введен с тем что лежит в бд, но поскольку он захэширован, применяем bcrypt.compareSync
      if(!comparePassword) {
         return next(ApiError.internal('Проверте логин или пароль'));
      }
      const token = generateJwt(user.id, user.email, user.role);
      return res.json({token});
   }

   async check(req, res) {
      const token = generateJwt(req.user.id, req.user.email, req.user.role);
      return res.json({token});
   }
};

module.exports = new UserController();