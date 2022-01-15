const ApiError = require('../error/ApiError');

module.exports = function(err, req, res, next) { // next фун-я, вызвав которую мы передадим управление следующему в цепочке middleware
   if(err instanceof ApiError) {
      return res.status(err.status).json({message: err.message});
   }
   return res.status(500).json({message: 'непредвиденная ошибка!'});
};
// поскольку этот Middleware будет обрабатывать ошибки, он будет последний в очереди, и по этой причине мы нигде не вызываем фун-ю next!