import { useState } from "react";
import { createBrand } from "../../http/deviceAPI";

const ModalBrand = ({ visible, setVisible}) => {
   const [brand, setBrand] = useState('');

   const addBrand = (e) => {
      e.preventDefault();
      createBrand({name: brand})
      .then(data => {
         setBrand('')
         console.log(data)
      })
   };

   return(
      <div className={visible ? `${"myModal"} ${"active"}` : "myModal"} onClick={()=> setVisible(false)}>
         <div className="myModalContent" onClick={(e)=> e.stopPropagation()}>
            <div>
               <div className="modal_inner_title">Additing Brand</div>
               <form className="form">
                  <input
                        type="text"
                        placeholder="add brand..."
                        value={brand}
                        onChange={e => setBrand(e.target.value)}/>
                  <div className="modal_button_block">
                     <button
                           className="form_button_add"
                           onClick={addBrand}>Add</button>
                     <button
                           className="form_button_close"
                           onClick={()=> setVisible(false)}>Close</button>
                  </div>
               </form>
            </div>
         </div>
      </div>
   )
};

export default ModalBrand;