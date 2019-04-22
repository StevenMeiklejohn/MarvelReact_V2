import React  from 'react';
import {Link} from 'react-router-dom';
import Request from './../helpers/request'
import SingleUserView from './../components/user/singleUserView'

class SingleUserContainer extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      user: null
    }
    this.handleDelete = this.handleDelete.bind(this);
    this.directToEditForm = this.directToEditForm.bind(this);
  }

  componentDidMount(){
    const request = new Request();
    request.get("http://localhost:8080/api/users/" + this.props.id).then((data) => {
      this.setState({user: data})
    })
  }


  handleDelete(){
    const url = 'http://localhost:8080/api/users/' + this.props.id;
    let request = new Request();
    request.delete(url).then(()=>{
      window.location = '/users';
    })
  }

  directToEditForm(){
    window.location = '/users/edit/' + this.props.id;
  }


  getId(){
    return this.state.id
  }



  render(){

    if(!this.state.user){
      return null;
    }

    console.log("singleUserContainer props", this.state.user);
    console.log("singleUserContainer id", this.state.id);




    return (
      <div className="component">
      <SingleUserView user={this.state.user}/>

      <div className="loginButtonDiv">
      <button className ="loginButton" onClick={this.handleDelete}>Delete</button>
      <button className ="loginButton" onClick={this.directToEditForm}>Edit</button>

      </div>
      </div>
    )
  }
}

export default SingleUserContainer;
