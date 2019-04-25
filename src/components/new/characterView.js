import React from 'react';
import Gallery from './gallery'
import GallerySingle from './gallerySingle'



class CharacterView extends React.Component {


  render(){

    if(this.props.filterSelectorFetching){
      return(
        <div className="characterView">
        <p class="animated infinite lightSpeedIn delay-2s">Fetching.....</p>
        </div>
      )
    }

    if(this.props.character && this.props.characterViewStatus === "character"){
      // console.log(this.props.character);
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
        <div className="detailsBox">
        <p>Links:</p>
        <a href={this.props.character.urls[0].url}>Detailed Description</a>
        <a href={this.props.character.urls[1].url}>Wiki</a>
        <a href={this.props.character.urls[2].url}>Marvel Comics</a>
        </div>
        </div>
      )
    }

    if(this.props.characterViewStatus == "story" && this.props.storiesComics.length > 0){
      console.log("characterView props.storiesComics", this.props.storiesComics);
      let details = this.props.storiesComics[0];
      let imageUrl = this.props.storiesComics[0].thumbnail.path + ".jpg";
      console.log("CharacterView Story details", details);
      console.log("CharacterView Story imageUrl", imageUrl);
      return(
        <div className="characterView">
        <GallerySingle imageUrl={imageUrl}
        details={details}/>
        </div>
      )
    }

    if(this.props.characterViewStatus == "event" && this.props.eventComics.length > 0){
      // console.log(this.props.eventComics);
      let latestIndex = this.props.eventComics.length - 1;
      // console.log(this.props.eventComics[latestIndex])
      let incomingThumbnails = this.props.eventComics[latestIndex];
      let imageArray = [];
      incomingThumbnails.forEach(function(element){
        // element.forEach(function(item){
        imageArray.push(element.thumbnail.path + ".jpg");
        // })
      })
        return(
          <div className="characterView">
          <Gallery imageUrls={imageArray}
          detailsArray={incomingThumbnails}/>
          </div>
      )}


      if(this.props.characterViewStatus == "series" && this.props.seriesComics.length > 0){
        console.log("CharacterView series comics", this.props.seriesComics);
        let latestIndex = this.props.seriesComics.length - 1;
        // console.log(this.props.eventComics[latestIndex])
        let incomingThumbnails = this.props.seriesComics[latestIndex];
        let imageArray = [];
        incomingThumbnails.forEach(function(element){
          // element.forEach(function(item){
          imageArray.push(element.thumbnail.path + ".jpg");
          // })
        })
          return(
            <div className="characterView">
            <Gallery imageUrls={imageArray}
            detailsArray={incomingThumbnails}/>
            </div>
        )}



        else {
          return(
            <div className="characterView">
            <p class="animated infinite lightSpeedIn delay-2s">Fetching.....</p>
            </div>
          )
        }
      }
    }

    export default CharacterView;
