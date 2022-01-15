const MySelect = ({options, defaultvalue, value, change}) => {
   return(
      <select className="select" value={value} onChange={e => change(e.target.value) }>
         <option disabled value="">{defaultvalue}</option>
         {options.map(option => {
            return <option key={option.id} value={option.id}>{option.name}</option>
         })}
    </select>
   )
};

export default MySelect;