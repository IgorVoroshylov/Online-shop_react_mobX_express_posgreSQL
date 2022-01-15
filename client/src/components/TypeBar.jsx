import {observer} from 'mobx-react-lite';
import { useContext, useState } from "react";
import { Context } from "..";

const TypeBar = observer(() => {
   const {device} = useContext(Context);
   const [active, setActive] = useState(false);

   return(
         <div className={active ? 'filter_list activeMarker' : 'filter_list'}>
            <div
               className='filter_list_title'
               onClick={() => setActive(!active)}>
                  <span>Тип техники</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 arrow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
            </div>
            <div className='filter_list_container'>
               <div className='filter_list_item item_main' onClick={() => device.setSelectedType({})}>Весь товар</div>
               {
                  device.types.map(type =>
                     <div key={type.id}
                        className={device.selectedType.id === type.id
                              ? "filter_list_item active_item"
                              : "filter_list_item"
                        }
                        onClick={() => device.setSelectedType(type)}
                     >{type.name}</div>
                  )
               }
            </div>
         </div>
   )
});

export default TypeBar;