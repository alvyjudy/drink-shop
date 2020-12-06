import React, {useState} from "react";
import ReactDOM from "react-dom";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import {Navigation} from "./components/Navigation";
import {TestButton} from "./TestButton";
import {ProductsView} from "./components/ProductsView";
import {ProductDetail} from "./components/ProductDetail";
import {NoMatch} from "./components/NoMatch";
import {Home} from "./components/Home";

const App = () => {
  return (
    <Router>
      <Navigation/>

      <Switch>
        <Route exact path="/">
          <Home/>
        </Route>

        <Route path="/products">
          <ProductsView/>
        </Route>

        <Route path="/product/:id">
          <ProductDetail /> {/*useParams to grab id value*/}
        </Route>

        <Route>
          <NoMatch/>
        </Route>

      </Switch>
      

    </Router>
    
  )
}

ReactDOM.render(<App />, document.getElementById("root"));