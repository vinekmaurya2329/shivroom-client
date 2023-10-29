import React, { useState } from 'react'

function Increase() {
    const [data,setData]= useState(0)
  return (
    <div>
       <button onClick={()=> setData(data+1)}> increse</button>
       <input type="text"  value={data}/>
       <button onClick={()=> setData(data-1)}>decress</button>
    </div>
  )
}

export default Increase