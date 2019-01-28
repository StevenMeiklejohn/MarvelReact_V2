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
  }

  componentDidMount(){
    console.log("Single User Container triggered");
    const request = new Request();
    request.get("/api/users/" + this.props.id).then((data) => {
      this.setState({user: data})
      // console.log(data)})
  })
}


    handleDelete(){
    const url = '/api/users/' + this.props.id;
    let request = new Request();
    request.delete(url).then(()=>{
      window.location = '/users';
    })

  }



  render(){

  if(!this.state.user){
    return null;
  }



  return (
    <div className="component">
      <SingleUserView user={this.state.user}/>

      <div className="loginButtonDiv">
      <button className ="loginButton" onClick={this.handleDelete}>Delete User</button>
      </div>
    </div>
  )
}
}

export default SingleUserContainer;
