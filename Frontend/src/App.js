import React, { Component,setState } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
} from "react-router-dom";

import Login from "./component/Login";
import Create from "./component/Create";
import Edit from "./component/Edit";

import List from "./component/List";
import PrivateRoute from "./component/auth/PrivateRoute";
// import "./App.css";
import "./css/style.css"
import 'bootstrap/dist/css/bootstrap.min.css';
 
class App extends Component {
  constructor() {
    super();
    this.state = {favoritecolor: "red"}

    
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({favoritecolor: "yellow"})
    }, 1000)
  }
    render() {
        return (
            <Router>
              
              <Routes>
                  <Route
                      exact
                      path="/"
                      element={<List />}
                  ></Route>
                 
                  <Route path="Create" element={<PrivateRoute Component={Create} />} />
                  <Route exact path="List" element={<PrivateRoute Component={List} />} />
                  
                  <Route exact  path="Edit/:id" element={<PrivateRoute Component={Edit} />} />

                  
                  

                    <Route
                      exact
                      path="/Login"
                      element={<Login />}
                  ></Route>


              </Routes>
            </Router>
        );
    }
}
 
export default App;