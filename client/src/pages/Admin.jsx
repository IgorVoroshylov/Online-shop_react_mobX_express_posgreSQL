import { useState } from "react";
import ModalBrand from "../components/Modal/ModalBrand";
import ModalDevice from "../components/Modal/ModalDevice";
import ModalType from "../components/Modal/ModalType";

const Admin = () => {
   const [visibleType, setVisibleType] = useState(false);
   const [visibleBrand, setVisibleBrand] = useState(false);
   const [visibleDevice, setVisibleDevice] = useState(false);

   return(
      <div className="admin">
         <div className="admin_button_wrapper">
            <button onClick={() => setVisibleType(true)}>Add type</button>
         </div>
         <div className="admin_button_wrapper">
            <button onClick={() => setVisibleBrand(true)}>Add brand</button>
         </div>
         <div className="admin_button_wrapper">
            <button onClick={() => setVisibleDevice(true)}>Add device</button>
         </div>
         <ModalType visible={visibleType} setVisible={setVisibleType}/>
         <ModalBrand visible={visibleBrand} setVisible={setVisibleBrand}/>
         <ModalDevice visible={visibleDevice} setVisible={setVisibleDevice}/>
      </div>
   )
};

export default Admin;