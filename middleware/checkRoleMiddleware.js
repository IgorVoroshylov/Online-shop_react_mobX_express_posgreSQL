// создали checkRoleMiddleware для того, что б добавлять товар мог только пользователь с role ADMIN, и вызываем в TypeRouter
const jwt = require('jsonwebtoken');

module.exports = function(role) {
   return function (req, res, next) {
      if(req.method === 'OPTIONS') {
         next();
      }
      try {
         const token = req.headers.authorization.split(' ')[1]; // изыймаем из headers токен(поскольку в headers помещаеться сначала тип токена а потом сам токен, разделяем по пробелу)
         if(!token) {
            return res.status(401).json({message: 'не авторизован'});
         }
         const decoded = jwt.verify(token, process.env.SECRET_KEY);
         if(decoded.role !== role) {
            return res.status(403).json({message: 'нет доступа'});
         }
         req.user = decoded;
         next();
      } catch(err) {
         res.status(401).json({message: 'не авторизован'});
      }
   }
};

// применим в typeRouter
// этот middleware можно добавить на создание девайсов и брендов!