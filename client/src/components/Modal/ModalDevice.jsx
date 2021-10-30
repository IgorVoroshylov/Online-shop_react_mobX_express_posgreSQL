import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { createDevice, fetchBrand, fetchDevice, fetchTypes } from "../../http/deviceAPI";
import { Context } from "../../index";
import MySelect from "../Select/MySelect";

const ModalDevice = observer(({ visible, setVisible}) => {
   const {device} = useContext(Context);
   const [info, setInfo] = useState([]);
   const [deviceType, setDeviceType] = useState('');
   const [deviceBrand, setDeviceBrend] = useState('');
   const [deviceName, setDeviceName] = useState('');
   const [devicePrice, setDevicePrice] = useState('');
   const [file, setFile] = useState(null);
   const [success, setSuccess] = useState(false);

   useEffect(() => {
      fetchTypes()
      .then(data => device.setTypes(data));
      fetchBrand()
      .then(data => device.setBrands(data));
      fetchDevice()
      .then(data => device.setDevice(data.rows))
   }, [device]);

   const submitForm = (e) => {
      e.preventDefault();

      const fornData = new FormData();
      fornData.append('name', deviceName);
      fornData.append('price', devicePrice);
      fornData.append('img', file);
      fornData.append('brandId', deviceBrand);
      fornData.append('typeId', deviceType);
      fornData.append('info', JSON.stringify(info));


      createDevice(fornData)
      .then(data => {
         setSuccess(true);
         setInterval(() => setSuccess(false), 3000);
         setDeviceType('');
         setDeviceBrend('');
         setDeviceName('');
         setDevicePrice('');
         setFile(null);
         setInfo([]);
      })
      .catch((err) => {
         console.log(err);
      })
   };

   const selectFile = (e) => {
      setFile(e.target.files[0]);
   };

   // for Specifications info
   const addInfo = e => {
      e.preventDefault();
      setInfo([...info, {title: '', description: '', number: Date.now()}])
   };

   const changeInfo = (key, value, number) => {
      setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i));
   };

   const deleteInfo = (e, number) => {
      e.preventDefault();
      setInfo(info.filter(i => i.number !== number))
   };

   return(
      <div className={visible ? `${"myModal"} ${"active"}` : "myModal"} onClick={()=> setVisible(false)}>
         <div className="myModalContent" onClick={(e)=> e.stopPropagation()}>
            <div>
               <div className="modal_inner_title">Additing Device</div>
               <form className="form">
                  {/* <input type="text" placeholder="add device..."/> */}
                  <MySelect
                           value={deviceType}
                           change={value => setDeviceType(value)}
                           options={device.types}
                           defaultvalue={"choose types"}></MySelect>
                  <MySelect
                           value={deviceBrand}
                           className="select_modul"
                           change={value => setDeviceBrend(value)}
                           options={device.brands}
                           defaultvalue={"choose brands"}></MySelect>
                  <input
                        type="text"
                        value={deviceName}
                        placeholder="device name..."
                        onChange={e => setDeviceName(e.target.value)}/>
                  <input
                        type="number"
                        placeholder="device price..."
                        value={devicePrice}
                        onChange={e => setDevicePrice(e.target.value)}/>
                  <input
                        type="file"
                        onChange={selectFile}/>
                  <hr />
                  <button
                        className="add_props_button"
                        onClick={e => addInfo(e)}>Add info</button>
                        {/* Specifications info */}
                  {
                     info.map(inform =>
                        <div className="specifications_block" key={inform.number}>
                           <input
                                 type="text"
                                 placeholder="name info..."
                                 value={info.title}
                                 onChange={(e) => changeInfo('title', e.target.value, inform.number)}/>
                           <input
                                 type="text"
                                 placeholder="value info..."
                                 value={info.description}
                                 onChange={(e) => changeInfo('description', e.target.value, inform.number)}/>
                           <button
                                 onClick={e => deleteInfo(e, inform.number)}
                                 className="del_specifications_button">delete</button>
                        </div>
                        )
                  }
                  <div className="modal_button_block">
                     <button
                           className="form_button_add"
                           onClick={submitForm}>Add</button>
                     <button
                           className="form_button_close"
                           onClick={()=> setVisible(false)}>Close</button>
                  </div>
               </form>
            </div>
            {
               success
               ? <div className="send_success">Позиция успешно добавлена!</div>
               : null
            }
         </div>
      </div>
   )
});

export default ModalDevice;