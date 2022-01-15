const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
   if(req.method === 'OPTIONS') {
      next();
   }
   try {
      const token = req.headers.authorization.split(' ')[1]; // изыймаем из headers токен(поскольку в headers помещаеться сначала тип токена(bearer) а потом сам токен(4mdmj3j...), разделяем по пробелу)
      if(!token) {
         return res.status(401).json({message: 'не авторизован'});
      }
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      req.user = decoded;
      next();
   } catch(err) {
      res.status(401).json({message: 'не авторизован!'});
   }
};

// потом подключаем в userRouter