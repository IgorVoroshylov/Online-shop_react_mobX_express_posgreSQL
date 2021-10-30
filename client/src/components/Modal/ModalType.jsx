import { useState } from "react";
import { createType } from "../../http/deviceAPI";

const ModalType = ({ visible, setVisible}) => {
   const [type, setType] = useState('');

   const addType = (e) => {
      e.preventDefault();
      createType({name: type})
      .then(data => {
         setType('');
      })
   };

   return(
      <div className={visible ? `${"myModal"} ${"active"}` : "myModal"} onClick={()=> setVisible(false)}>
         <div className="myModalContent" onClick={(e)=> e.stopPropagation()}>
            <div>
               <div className="modal_inner_title">Additing Type</div>
               <form className="form">
                  <input
                        type="text"
                        placeholder="add type..."
                        value={type}
                        onChange={e => setType(e.target.value)}/>
                  <div className="modal_button_block">
                     <button
                           className="form_button_add"
                           onClick={addType}>Add</button>
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

export default ModalType;