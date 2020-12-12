import React, {useState} from "react";
import ReactDOM from "react-dom";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {Provider} from "react-redux";


import {store} from "./redux/reducer";
import {Navigation} from "./components/Navigation";
import {ProductsView} from "./components/ProductsView";
import {ProductDetail} from "./components/ProductDetail";
import {NoMatch} from "./components/NoMatch";
import {Home} from "./components/Home";
import {SignUp} from "./components/SignUp";
import {Login} from "./components/LogIn";
import {Cart} from "./components/Cart";
import {Orders} from "./components/Orders";



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

          <Route path="/cart">
            <Cart/>
          </Route>

          <Route path="/orders">
            <Orders/>
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