import React from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from './../components/navbar'
import Home from './../components/home/home'
import Login from './../components/login/login'
import Account from './../components/account/account'
import New from './newContainer'
import Recommendations from './recommendationsContainer'
const api = require('marvel-api');


class MainContainer extends React.Component{


  render(){
    return(
      <Router>
        <React.Fragment>
        <div className="nav">
          <Navbar />
        </div>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/account" component={Account} />
        <Route path="/new" component={New} />
        <Route path="/recommendations" component={Recommendations} />
      </React.Fragment>
      </Router>
    )
  }
}



export default MainContainer;
