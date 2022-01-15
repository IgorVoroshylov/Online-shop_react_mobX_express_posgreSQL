import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { Context } from "..";
import BrendBar from "../components/BrandBar";
import DeviceList from "../components/DeviseList";
import Pages from "../components/Pagination";
import TypeBar from "../components/TypeBar";
import { fetchBrand, fetchDevice, fetchTypes } from "../http/deviceAPI";

const Shop = observer(() => {
   const {device} = useContext(Context);

   useEffect(() => {
      fetchTypes()
      .then(data => device.setTypes(data));
      fetchBrand()
      .then(data => device.setBrands(data));
   }, [device]);

   useEffect(() => {
      fetchDevice(device.selectedType.id, device.selectedBrend.id, device.page, device.limit)
      .then(data => {
         device.setDevice(data.rows);
         device.setTotalCount(data.count);
      })
   }, [device.selectedType, device.selectedBrend, device.page, device]);

   return(
      <div className="shop">
            <div>
               <TypeBar/>
               <BrendBar/>
            </div>
            <div className="device_list_container">
               <DeviceList/>
               <Pages/>
            </div>
      </div>
   )
});

export default Shop;