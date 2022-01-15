import { useContext, useEffect } from "react";
import { Context } from "../index";
import { NavLink, useHistory } from "react-router-dom";
import { ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from "../utils/consts";
import '../App.css';
import {observer} from 'mobx-react-lite';
import { fetchBasketDevices } from "../http/deviceAPI";
import { reduceArray } from "../utils/reduceArray";


const NavBar = observer( () => {
   const {user} = useContext(Context);
   const history = useHistory();
   const isAdmin = user.user.role === "ADMIN";
   const userId = user.user.id;

   useEffect(() => {
      const getBasketDevices = async() => {
         try {
            const basketId = user.user.id; // присвоили basketId для наглядности что id корзины совпадает с userId пользователя
            const data = await fetchBasketDevices(basketId);
            const basketListId = reduceArray(data.rows);
            user.setBasketListId(basketListId);
         } catch (err) {
            console.log(err.message);
         }
      }
      if(userId) getBasketDevices();
   }, [user, userId]);

   const logOut = () => {
      user.setUser({});
      user.setIsAuth(false);
      localStorage.removeItem('token');
   };

   return(
      <div className="NavBar">
         <NavLink to={SHOP_ROUTE}>Gadgets shop</NavLink>
         {
            user.isAuth
            ?
            <div className="NavBar_navigation">
               <div className='shopIcon'>
                  <NavLink to={BASKET_ROUTE}>
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                     </svg>
                  </NavLink>
                  {user.basketListId.length > 0 && <div className='amountItems'>{user.basketListId.length}</div>}
               </div>
               <div className="user_name">{user.user.email}</div>
               <div>
                  {isAdmin && <button className="NavBar_button" onClick={() => history.push(ADMIN_ROUTE)}>Admin panel</button>}
                  <button className="NavBar_button" onClick={() => logOut()}>Sign out</button>
               </div>
            </div>
            :
            <div className="NavBar_navigation">
               <button className="NavBar_button" onClick={() => history.push(LOGIN_ROUTE)}>Sign in</button>
            </div>
         }
      </div>
   )
});

export default NavBar;