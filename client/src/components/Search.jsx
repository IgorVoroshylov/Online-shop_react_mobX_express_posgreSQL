import React, { useContext, useEffect, useState } from 'react';
import { Context } from '..';

const Search = () => {
   const {device} = useContext(Context);
   const [filterQuery, setFilterQuery] = useState('');
   

   useEffect(() => {
      const aaa = device.devices.filter(dev => dev.name.toLowerCase().includes(filterQuery.toLowerCase()) );
      device.setDevice(aaa);
   }, [filterQuery, device]);

   return (
      <div className='searchForm'>
         <input type="text" placeholder='search...' value={filterQuery} onChange={e => setFilterQuery(e.target.value)}/>
      </div>
   );
}

export default Search;
