// EXPRESS - фреймворк для написания серверной части(фреймворк) на NODE.js
// PostgreSQL - система управления базами данных
// Sequelize - ORM для реляционных баз данных на node.js (помогает связывать програмный код с базами данных, не пишем на прямую SQL запросы, а вызываем какую-то фун-я например create, и обьект добавляеться в базу)
// CORS - что б можно было с браузера напрямую обращаться к серверу
// dotenv - что б задавать переменные окружения

require('dotenv').config();

const models = require('./models/models');
const express = require('express');
const sequelize = require('./db');
const PORT = process.env.PORT;
const cors = require('cors');
const fileUpload = require('express-fileupload'); // для того что бы получить картинку из поля files в DeviceController
const router = require('./routes/index');
const errorHandler = require('./middleware/ErrorHendlingMiddleware');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(fileUpload({}));
app.use('/api', router);

//обработка ошибок
app.use(errorHandler);

const start = async () => {
   try {
      await sequelize.authenticate();
      await sequelize.sync();
      app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
   } catch(e) {
      console.log(e);
   }
};

start();