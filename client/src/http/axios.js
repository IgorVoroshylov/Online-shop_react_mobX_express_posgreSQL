import axios from 'axios';

const host = axios.create({ //для запросов не требующих авторизации
   baseURL: 'http://localhost:5000/'
});

const authHost = axios.create({
   baseURL: 'http://localhost:5000/' //каждому запросу будет автоматически подставляться header => authorization, и туда будет добавляться токэн
});

const authInterceptor = config => { //! интерцептор, чтоб подставлять автоматически токэн запросам для которых нужна регистрация, на сервере его будет проверять authmidleware
   config.headers.authorization = `Bearer ${localStorage.getItem('token')}`; //будем добавлять токэн в локальное хранилище при авторизации
   return config;
};

authHost.interceptors.request.use(authInterceptor); // повешали интерцептор на запрос

export {
   host,
   authHost
};


