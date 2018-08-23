import React from 'react'

class WelcomeBox extends React.Component {

  render(){
    return(
      <div className="welcomeDisplay">
        <p>Welcome to the MU recommendation site!</p>
        <p>Do you use Marvel Unlimited?</p>
        <p>Ever find yourself reading a great comic issue or brilliant arc and wish you could easily recommend it to your friends?</p>
        <p>Now you can! Simply create a free account and use our comic finder to locate and send recommendations to your friends!</p>
      </div>
    )
  }
}

export default WelcomeBox
