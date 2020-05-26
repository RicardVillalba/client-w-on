import React, { Component } from "react";
import Axios from "axios";
import { withAuth } from "../lib/Auth";
class SearchPage extends Component {
  state = {
    image: null,
    labels: "",
    results: null,
    favorites: [],
  };

  componentDidMount() {
    console.log("user", this.props.user);
    Axios.get(process.env.REACT_APP_API_URL + `/user/${this.props.user._id}`, {
      withCredentials: true,
    })
      .then((user) => {
        console.log("user", user);
        let favorites = user.data.favorites.map((favoriteObj) => {
          return favoriteObj.imageUrl;
        });

        this.setState({ favorites });
      })
      .catch((error) => console.log(error));

    ////////////////////

  
  
  }

  addToFavorites = (imageUrl) => {
    Axios.post(
      process.env.REACT_APP_API_URL + `/favorites`,
      {imageUrl},
      { withCredentials: true }
    )
      .then((user) => {
       console.log(user);
      })
      .catch((error) => console.log(error));
  }


  removeFromFavorites = (imageUrl) => {
    Axios.get(process.env.REACT_APP_API_URL + `/user/${this.props.user._id}`,
    { withCredentials: true })
    .then((user)=> {
      let favorites = user.data.favorites.filter((favoriteObj) => {
        return favoriteObj.imageUrl===imageUrl;
      });
      console.log("FAVORITES",favorites)
      let favoriteId = favorites[0]._id
      Axios.delete(
        process.env.REACT_APP_API_URL + `/favorites/${favoriteId}`,
        { withCredentials: true }
      )
        .then((user) => {
          console.log(user);
        })
        .catch((error) => console.log(error));
    })

    
  }

  handleChange = (e) => {
    const file = e.target.files[0];
    const image = new FormData();
    image.append("image", file);
    Axios.post(process.env.REACT_APP_API_URL + "/cloudinary", image)
      .then((response) => {
        const imageUrl = response.data;
        console.log("imageUrl", imageUrl);
        this.setState({ image: imageUrl });
      })
      .catch((error) => console.log(error));
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const imageUrl = this.state.image;
    Axios.post(
      process.env.REACT_APP_API_URL + "/cloudvision",
      { imageUrl },
      { withCredentials: true }
    )
      .then((response) => {
        console.log(response.data);
        let labelsString = "";
        response.data.forEach((element) => {
          labelsString += element.description + " ";
        });
        this.setState({ labels: labelsString });
      })
      .then(() => {
        Axios.get(
          `https://www.googleapis.com/customsearch/v1?key=AIzaSyBj3pId_iDg4MGA2-5khVCzkEDHuUFv92s&cx=005967262815925650944:xavy6rlohqb&q=${this.state.labels}`
        )
          .then((response) => {
            console.log(response.data.items);
            this.setState({ results: response.data.items });
          })
          .catch((error) => console.log(error));
      })

      .catch((error) => console.log(error));
  };

  render() {
    console.log("favorites",this.state.favorites)
    console.log("labels", this.state.labels);
    console.log(this.props.user.favorites);
    return (
      <div className="uploadImg">
        <div className="gcse-search">
          <script async src="https://cse.google.com/cse.js?cx=123:456"></script>
        </div>

        <form
          onSubmit={this.handleSubmit}
          action="/search"
          method="POST"
          enctype="multipart/form-data"
        >
          <input
            onChange={this.handleChange}
            type="file"
            name="photo"
            id="img"
          />
          <label for="img">add</label>
          <button type="submit">search</button>
        </form>
        <div className="results">
          {this.state.results
            ? this.state.results.map((resultObj) => {
                return (
                  <div>
                    <img
                      className="result"
                      src={resultObj.pagemap.cse_image[0].src}
                      alt="img"
                    />
                    {this.state.favorites.includes(
                      resultObj.pagemap.cse_image[0].src
                    ) ? (
                      <button onClick={()=>{this.removeFromFavorites(resultObj.pagemap.cse_image[0].src)}}>remove from favorites</button>
                    ) : (
                      <button onClick={()=>{this.addToFavorites(resultObj.pagemap.cse_image[0].src)}}>add to favorites</button>
                    )}
                  </div>
                );
              })
            : null}
        </div>
      </div>
    );
  }
}
export default withAuth(SearchPage);
