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
import EditUserContainer from './editUserContainer'

// const api = require('marvel-api');


class MainContainer extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      loggedInUserName: null,
      loggedInUser: null,
      loginFail: false
    }
    this.loginUser = this.loginUser.bind(this);
    this.setloggedInUserInfo = this.setloggedInUserInfo.bind(this);
    this.logoutUser = this.logoutUser.bind(this);
    this.loginFail = this.loginFail.bind(this);
  }

  componentDidMount(){
    if(localStorage.getItem('loggedInUserName') != null){
    var retrievedObject = localStorage.getItem('loggedInUser');
    var parsedObject = JSON.parse(retrievedObject);
    console.log('parsedObject', parsedObject);
    this.setState({loggedInUserName: parsedObject.userName}, this.setState({loggedInUser: parsedObject}))
  this.setState({loggedInUser: parsedObject})
  }
}


  loginUser(loggedInUser){
    // console.log("Main container loginUser called");
    // console.log("Logged in user being passed", loggedInUser);
    this.setState({loggedInUserName: loggedInUser})
  }

  loginFail(){
    this.setState({loginFail: true})
  }

  setloggedInUserInfo(info){
    console.log("setLogedInUserInfo function called", info);
    localStorage.setItem('loggedInUser', JSON.stringify(info));
    this.setState({loggedInUser: info})
  }

  logoutUser(){
    localStorage.removeItem('loggedInUser');
    this.setState({loggedInUserName: null}, this.setState({loggedInUser: null}))
    window.location = "/";
  }




  render(){
    const MyLoginContainer = (props) => {
      return (
        <LoginContainer
        loginUser={this.loginUser}
        loginComplete={this.state.loggedInUserName}
        setloggedInUserInfo={this.setloggedInUserInfo}
        setLoginFail={this.loginFail}
        loginFail={this.state.loginFail}
        {...props}
        />
      );
    }

    const MyAccountContainer = (props) => {
      console.log("Main container loggedInUser state", this.state.loggedInUser);
      return(
        <Account
        userInfo={this.state.loggedInUser}
        handleLogout={this.logoutUser}
        {...props}
        />
      );
    }

    // if(this.state.loggedInUser){
    //   var loginStatus = "/logout"
    // }else{
    //   loginStatus = "/login"
    // }


    return(
      <Router>
      <React.Fragment>
      <div className="nav">
      <Navbar user={this.state.loggedInUserName} test="test test test"/>
      </div>
      <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/logout" render={() => {
                      this.logoutUser();
                      return <Home />;
                    }
                  }/>
      <Route path="/login" render={MyLoginContainer}/>
      <Route path="/account" render={MyAccountContainer} />
      <Route path="/new" component={New} />


      <Route exact path="/recommendations" render = {(props) => {
        const userProp = this.state.loggedInUser;
        return <Recommendations user={userProp} />
      }}
      />

      <Route exact path="/users/:id" render = {(props) =>{
        const userProp = this.state.loggedInUser;
        const id = props.match.params.id;
        return <SingleUserContainer id = {id} />
      }}
      />
      <Route exact path="/users/edit/:id" render = {(props) => {
        const id = props.match.params.id;
        return <EditUserContainer id={id} />
      }}
      />
      <Route path="/users" component={UsersContainer}/>

      <Route exact path="/comic/:id" render = {(props) =>{
        const userProp = this.state.loggedInUser;
        const id = props.match.params.id;
        return <SingleComicContainer id = {id} user = {userProp} />
      }}
      />
      </Switch>
      </React.Fragment>
      </Router>
    )
  }
}



export default MainContainer;
