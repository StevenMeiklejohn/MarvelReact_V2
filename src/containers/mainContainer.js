import React from 'react'
import { BrowserRouter as Router, Route, Switch, withRouter } from "react-router-dom";
import Navbar from './../components/navbar'
import Home from './../components/home/home'
import Login from './../components/login/login'
import Account from './../components/account/account'
import New from './newContainer'
import Recommendations from './recommendationsContainer'
import SingleComicContainer from './singleComicContainer'
import SingleUserContainer from './singleUserContainer'
import UsersContainer from './usersContainer'
import LoginContainer from './loginContainer'
// const api = require('marvel-api');


class MainContainer extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      user: null
    }
  }


  render(){
    return(
      <Router>
        <React.Fragment>
        <div className="nav">
          <Navbar />
        </div>
        <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={LoginContainer} />
        <Route path="/account" component={Account} />
        <Route path="/new" component={New} />
        <Route path="/recommendations" component={Recommendations} />
        <Route exact path="/users/:id" render = {(props) =>{
            const id = props.match.params.id;
            return <SingleUserContainer id = {id} />
            }}
          />
        <Route path="/users" component={UsersContainer}/>

        <Route exact path="/comic/:id" render = {(props) =>{
            const id = props.match.params.id;
            return <SingleComicContainer id = {id} />
            }}
          />
          </Switch>
      </React.Fragment>
      </Router>
    )
  }
}



export default MainContainer;
