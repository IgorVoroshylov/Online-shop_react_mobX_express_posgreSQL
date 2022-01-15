import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Context } from "../index";
import { DEVICE_ROUTE } from "../utils/consts";
import star from '../assets/star.png';

const DeviceList = observer(() => {
   const {device} = useContext(Context);
   const history = useHistory();

   return(
      <div className="device_list">
         {device.devices.map(dev =>
            <div className="device_item_wrapper" key={dev.id}>
               <div
                  className="device_item"
                  onClick={() => history.push(DEVICE_ROUTE + '/' + dev.id)}>
                  <div className="device_item_image_conteiner">
                     <img src={'http://localhost:5000/' + dev.img} alt="..." />
                  </div>
                  <div className="device_info">
                     <div>{dev.name}</div>
                     <div className="reiting_info">
                        <div>{dev.raiting}</div>
                        <img src={star} alt="" />
                     </div>
                     <div>{dev.price}</div>
                  </div>
               </div>
            </div>
         )}
      </div>
   )
});

export default DeviceList;