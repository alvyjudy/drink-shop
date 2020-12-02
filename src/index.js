import React, {useState} from "react";
import ReactDOM from "react-dom";
import axios from "axios";

const App = () => {
  const [time, setTime] = useState("unknown")
  return (
    <div>
      <p>Hello world</p>
      <button onClick={
        ()=>{
          axios.get("/api/time").then(res=>{
            setTime(res.data)
          })
        }
      }>ping</button>
      <p>{time}</p>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById("root"));