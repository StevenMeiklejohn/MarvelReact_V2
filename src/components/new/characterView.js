import React from 'react';


class CharacterView extends React.Component {


  render(){
    // var creatorNodes = this.props.creators.map(function(creator) {
    // return(
    //   <Details name={creator.name} role={creator.role}>
    //   </Details>
    //   );
    // });

    if(this.props.character){
    return(
      <div className="characterView">
        <p>Character Details</p>
      </div>
    )
  } else {
    return(
      <div className="characterView">
        <p class="animated infinite lightSpeedIn delay-2s">Fetching Character Info</p>
      </div>
    )
  }
}
}

export default CharacterView;
