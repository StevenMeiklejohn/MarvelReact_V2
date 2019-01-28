import React from 'react';
import User from './user.js';


class UserList extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      users: []
    }
  }





	// console.log(props.users);
  render(){
    if(!null){
	const users = this.props.users.map((user) => {
		return(
			<li key={user.id} className="user-item">
				<User user={user} />
			</li>
		)
	})


	return (
		<ul className="user-list">
			{users}
		</ul>
	)
}
}

}
 export default UserList;
