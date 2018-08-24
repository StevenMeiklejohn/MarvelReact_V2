import React from 'react';


class CharacterView extends React.Component {


  render(){
    // var creatorNodes = this.props.creators.map(function(creator) {
    // return(
    //   <Details name={creator.name} role={creator.role}>
    //   </Details>
    //   );
    // });

    // var creatorNodes = this.props.creators.map(function(creator) {
    // return(
    //   <Details name={creator.name} role={creator.role}>
    //   </Details>
    //   );
    // });

    if(this.props.character){
      console.log(this.props.character);
      return(
        <div className="characterView">
          <p>Character Details</p>
          <p>Name: {this.props.character.name}</p>
          <div>
            <img className="characterImage" src={this.props.character.thumbnail.path + ".jpg"} alt="https://get.whotrades.com/u3/photo843E/20389222600-0/big.jpeg"/>
          </div>
          <div className="detailsBox">
            <p>Description:</p>
            <p className="detailsBox">{this.props.character.description}</p>
          </div>
          {/* <div className="issueGrid">

        </div> */}
        <div className="detailsBox">
          <p>Links:</p>
          <a href={this.props.character.urls[0].url}>Detailed Description</a>
          <a href={this.props.character.urls[1].url}>Wiki</a>
          <a href={this.props.character.urls[2].url}>Marvel Comics</a>
        </div>
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
