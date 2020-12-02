import React, {useState} from "react";
import ReactDOM from "react-dom";

import {Navigation} from "./components/Navigation";
import {TestButton} from "./TestButton";
import {ProductsView} from "./components/ProductsView";

const App = () => {
  return (
    <div>
      <Navigation/>
      <TestButton/>
      <ProductsView/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById("root"));