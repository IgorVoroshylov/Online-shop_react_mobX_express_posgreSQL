const uuid = require('uuid');
const path = require('path');
const {Device, DeviceInfo} = require('../models/models');
const ApiError = require('../error/ApiError');

class DeviceController {
   async create(req, res, next) {
      try {
         let {name, price, brandId, typeId, info} = req.body;

         const {img} = req.files; //! что б получить картинку из поля file, необходимо установить пакет npm i express-fileupload, и регестрируем в index.js

         let fileName = uuid.v4() + '.jpg';

         img.mv(path.resolve(__dirname, '..', 'static', fileName)); // mv() переместили файл с заданым именем, в нужную для нас папку

         // создаем сам девайс
         const device = await Device.create({name, price, brandId, typeId, img: fileName});

         if(info) {
            info = JSON.parse(info);

            info.forEach(i =>
               DeviceInfo.create({
                  title: i.title,
                  description: i.description,
                  deviceId: device.id
               })
            )
         };

         return res.json(device);
      } catch(err) {
         next(ApiError.badRequest(err.message));
      }
   };

   async getAll(req, res) {
      let {brandId, typeId, limit, page} = req.query;

      let offset = page * limit - limit; // чтобы пропустить первые 10 товаров, если переходим на вторую страницу, и так далее

      let devices;

      if(!brandId && !typeId) {
         devices = await Device.findAndCountAll({limit, offset}); // еще можно чтоб небыло общего колличества страниц findAll
      }
      if(brandId && !typeId) {
         devices = await Device.findAndCountAll({where: {brandId}, limit, offset});
      }
      if(!brandId && typeId) {
         devices = await Device.findAndCountAll({where: {typeId}, limit, offset});
      }
      if(brandId && typeId) {
         devices = await Device.findAndCountAll({where: {typeId, brandId}, limit, offset});
      }

      return res.json(devices);
   };

   async getOne(req, res) {
      const {id} = req.params;

      const device = await Device.findOne(
         {
            where: {id},
            include: [{model: DeviceInfo, as: 'info'}]
         }
      )

      return res.json(device);
   };
};

module.exports = new DeviceController();