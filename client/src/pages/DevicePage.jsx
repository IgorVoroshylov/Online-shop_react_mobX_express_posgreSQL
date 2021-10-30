import { useContext, useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { Context } from "../index";
import { fetchOneDevice, addToBasket, fetchBasketDevices } from "../http/deviceAPI";
import { observer } from "mobx-react-lite";
import { reduceArray } from "../utils/reduceArray";
import BascketButtons from "../components/AddToBascketButtons";
import { LOGIN_ROUTE } from "../utils/consts";

const DevicePage = observer(() => {
   const {user} = useContext(Context);
   const [device, setDevice] = useState({info: []});
   const [loading, setLoading] = useState(true);
   const {id} = useParams();
   const activeButton = user.basketList.includes(+id);

   const addDeviceToBasket = async() => {
      try {
         await addToBasket(+id, user.user.id, device.name, device.img, device.price); // добавили товар в db
         const data = await fetchBasketDevices(user.user.id); // сразу же получаем все id товаров в корзине, и переобразуем в более удобный массив
         const basketListId = reduceArray(data.rows); // получаем массив только id товаров в корзине
         user.setBasketList(basketListId); // сохраняем массив id товаров в корзине в state
      } catch (err) {
         console.log(err.message);
      }
   }

   useEffect(() => {
      const getOneDevice = async() => {
         try {
            const data = await fetchOneDevice(id);
            setDevice(data);
            setLoading(false);
         } catch (err) {
            console.log(err.message);
            setLoading(false);
         }
      }
      getOneDevice();
   }, [id]);

   if(loading) return <div>Loading...</div>

   return(
      <div className="device_page">
         <div className="device_page_info">
            <div className="device_page_image">
               <img src={'http://localhost:5000/' + device.img} alt="" />
            </div>
            <div className="device_page_description">
               <div>
                  <div className="device_page_description_name">{device.name}</div>
                  <div className="device_page_description_raiting">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                     </svg>
                     <span>{device.raiting}</span>
                  </div>
               </div>
               <div>
                  <div className="device_page_description_price">{device.price + " uah"}</div>
                  {
                     user.isAuth
                     ?
                     <BascketButtons activeButton={activeButton} addDeviceToBasket={addDeviceToBasket}/>
                     :
                     <div className='insteadBasket buttonWithoutAuth'>
                        <NavLink to={LOGIN_ROUTE}>Купить</NavLink>
                     </div>
                  }
               </div>
            </div>
         </div>
         <div className="device_specifications">
            <h1>Характеристики:</h1>
            {
               device.info.map(item =>
                  <div key={item.id} className="device_specifications_item">
                     <div className="device_specifications_item_title">{item.title + ":"}</div>
                     <div className="device_specifications_item_description">{item.description}</div>
                  </div>
                  )
            }
         </div>
      </div>
   )
});

export default DevicePage;