import axios from "axios"
import React, { useEffect, useState } from 'react';

function test(){
    axios.post("http://localhost:3001/test")
}

function Test(){
  function decreaseTime(time){
    let totalTime = minutes 
    setMinutes(totalTime-1)
  }

  const [minutes, setMinutes] = useState(120);

  useEffect(()=>{
    const intervalID = setInterval(decreaseTime, 1000);
  })
  
return (
    <>
    <button onClick = {test}>Изтрий игри</button>
    <h1>{minutes}</h1>
    </>
  )    
}
export default Test;
