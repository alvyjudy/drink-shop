import React, {useState} from "react";
import ReactDOM from "react-dom";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {Provider} from "react-redux";


import {store} from "./redux/reducer";
import {Navigation} from "./components/Navigation";
import {TestButton} from "./TestButton";
import {ProductsView} from "./components/ProductsView";
import {ProductDetail} from "./components/ProductDetail";
import {NoMatch} from "./components/NoMatch";
import {Home} from "./components/Home";
import {SignUp} from "./components/SignUp";
import {Login} from "./components/LogIn";

const App = () => {
  return (
    <Provider store={store}>
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

          <Route path="/auth/sign-up">
            <SignUp/>
          </Route>

          <Route path="/auth/login">
            <Login/>
          </Route>

          <Route>
            <NoMatch/>
          </Route>

        </Switch>
        

      </Router>
    </Provider>
  )
}

ReactDOM.render(<App />, document.getElementById("root"));