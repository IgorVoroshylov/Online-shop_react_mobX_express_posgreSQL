import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import OrderModalWindow from "../components/Modal/OrderModalWindow";
import { deleteBasketDevicesItem, fetchBasketDevices } from "../http/deviceAPI";
import { Context } from "../index";
import { DEVICE_ROUTE } from "../utils/consts";
import {reduceArray} from "../utils/reduceArray";

const Basket = observer( () => {
   const { user } = useContext(Context);
   const basketId = user.user.id;
   const [basketDevices, setBasketDevices] = useState([]);
   const [loading, setLoading] = useState(true);
   let sum = 0;

   const toggleOrder = e => {
      const mainElement = e.target.closest('body');
      mainElement.classList.toggle('active');
   };

   useEffect(() => {
      const getBasketDevice = async() => {
         try {
            const data = await fetchBasketDevices(basketId);
            setBasketDevices(data.rows);
            setLoading(false);
         } catch (err) {
            console.log(err.message);
            setLoading(false);
         }
      };
      getBasketDevice();
   }, [setBasketDevices, basketId]);

   if(basketDevices.length > 0) {
      sum = basketDevices.reduce((accum, {price}) => accum += price, 0) // фун-я подсчета суммы товаров
   }

   const deleteItem = async(id) => {
      await deleteBasketDevicesItem(id);
      const data = await fetchBasketDevices(basketId);
      const basketListId = reduceArray(data.rows);
      user.setBasketListId(basketListId);
      setBasketDevices(data.rows);
   };

   if(loading) return <div>Loading...</div>

   return(
      <div className='basket_container'>
         {
            basketDevices.map(device =>
               <div className='basket_container_item' key={device.id}>
                  <NavLink to={DEVICE_ROUTE+`/${device.deviceId}`}>
                     <div className='basket_container_item_description'>
                        <div className='basket_container_item_img'>
                           <img src={'http://localhost:5000/' + device.img} alt="#"/>
                        </div>
                        <div className='basket_container_item_name'>{device.name}</div>
                     </div>
                  </NavLink>
                  <div className='basket_container_item_info'>
                     <div className='basket_container_item_price'>{device.price} грн</div>
                     <button onClick={() => deleteItem(device.id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                     </button>
                  </div>
               </div>
            )
         }
         {
            basketDevices.length > 0
            ?
            <div className='basket_container_checkout'>
               <div className='sum'><span>Итого: {sum} грн</span>
                  <button onClick={toggleOrder}>Оформить заказ</button>
               </div>
            </div>
            :
            <div className='sum'>Корзина пуста</div>
         }
         <OrderModalWindow toggleOrder={toggleOrder}/>
      </div>
   )
});

export default Basket;