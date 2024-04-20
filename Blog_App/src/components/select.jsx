import React, { useId } from "react";

function Select({
    options,
    label,
    className = "",
    ...props
} , ref ){

    const id = useId()
    return(
     <div className="w-full">
        {label && <label className="" htmlFor={id}></label>}
    
     <Select {...props} className={` ${className} px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full  `} ref={ref} id={id}>
     
     {options?.map((item) => (
        <option key={item} value={item}
        >{item}</option>
     ))}
     </Select>
     </div>
    )
}

export default React.forwardRef(Select);