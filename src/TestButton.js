import React, {useState} from "react";
import axios from "axios";

export const TestButton = () => {
  const [time, setTime] = useState("unknown");
  return (
    <React.Fragment>
      <p>Hello world</p>
      <button onClick={
        ()=>{
          axios.get("/api/time").then(res=>{
            setTime(res.data)
          })
        }
      }>ping</button>
      <p>{time}</p>
    </React.Fragment>
  )
}
