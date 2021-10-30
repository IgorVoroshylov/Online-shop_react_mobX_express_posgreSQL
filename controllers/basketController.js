const {BasketDevice} = require('../models/models');

class BasketController {
   async create(req, res) {
      const { deviceId, basketId, name, img, price } = req.body;
      const basket = await BasketDevice.create({deviceId, basketId, name, img, price});
      return res.json(basket);
   }
   async getAll(req, res) {
      let {basketId} = req.query;
      const basketItems = await BasketDevice.findAndCountAll({where: {basketId}});
      return res.json(basketItems);
   }
   async delete(req, res) {
      const { id } = req.query;
      console.log(id);
      const item = await BasketDevice.findOne({where: {id}});
      await item.destroy();
      return res.json({message: 'ok'});
   }
};

module.exports = new BasketController();