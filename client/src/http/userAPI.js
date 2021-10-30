import { host, authHost } from "./axios";
// установили модуль jwt-decode(npm i jwt-decode), для того что бы распарсить токен, и сохранить информацию из него для данных о юзере
import jwt_decode from 'jwt-decode';

export const registration = async(email, password) => {
   const response = await host.post('api/user/registration', {email, password, role: 'USER'});
   const {data} = response;
   localStorage.setItem('token', data.token); // достаеться из localStorage в axios.js, чтоб подставлять автоматически токэн определенным запросам для которых нужна регистрация
   return jwt_decode(data.token);
};

export const login = async(email, password) => {
   const response = await host.post('api/user/login', {email, password});
   const {data} = response;
   localStorage.setItem('token', data.token);
   return jwt_decode(data.token);
};

export const check = async() => {
   const {data} = await authHost.get('api/user/auth');
   localStorage.setItem('token', data.token);
   return jwt_decode(data.token);
};