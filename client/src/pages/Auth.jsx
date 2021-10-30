import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import { Context } from "..";
import { registration, login } from "../http/userAPI";
import { LOGIN_ROUTE, RAGISTRATION_ROUTE, SHOP_ROUTE } from "../utils/consts";


const Auth = observer( () => {
   const location = useLocation();
   const history = useHistory();
   const isLogin = location.pathname === LOGIN_ROUTE;

   const {user} = useContext(Context);
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');

   const submit = async() => {
      try {
         let data;
         if(isLogin) {
            data = await login(email, password);
         } else {
            data = await registration(email, password);
         }
         user.setError('');
         user.setIsAuth(true);
         user.setUser(data);
         history.push(SHOP_ROUTE);
         setEmail('');
         setPassword('');
      } catch(err) {
         if(err.response) {
            user.setError(err.response.data.message);
            console.log(err.response.data.message);
         } else {
            console.log(err.message);
         }
      }
   };

   useEffect(() => {
      user.setError(''); // для очистки поля ошибки при смене логин-регистрация
   }, [isLogin, user]);

   return(
      <div className="auth">
         <div className="auth_main">
            <h1 className="auth_main_title">{isLogin ? "Авторизация" : "Регистрация"}</h1>
               <input className="myInput"
                        type="text"
                        placeholder="email..."
                        value={email}
                        onChange={e => setEmail(e.target.value)}/>
               <input className="myInput"
                        type="password"
                        placeholder="password..."
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        />
               {
                  user.error
                  ? <div className="auth_error">{user.error}</div>
                  : null
               }
               <div className="auth_info">
                  {
                     isLogin
                     ? <div>Нет аккаунта? <NavLink to={RAGISTRATION_ROUTE}>Зарегестрируйтесь!</NavLink></div>
                     : <div>Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink></div>
                  }
                  <button className="myButton"
                          onClick={submit}>
                           {isLogin ? "Войти" : "Регистрация"}
                  </button>
               </div>
         </div>
      </div>
   )
});

export default Auth;