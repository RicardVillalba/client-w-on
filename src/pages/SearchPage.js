import React, { Component } from "react";
import Axios from "axios";
import {withAuth} from "../lib/Auth";
class SearchPage extends Component {
  state = {
    image: null,
    labels: "",
    results: null,
    favorites: [],
  };

  componentDidMount() {
    Axios.get(process.env.REACT_APP_API_URL+"/auth/me", { withCredentials: true })
    .then(user => {
        return user.data.favorites
    })

      .then(userId => {
            return Axios.get(process.env.REACT_APP_API_URL+`/user/${userId}`, { withCredentials: true })
        })
    
    .then (user => {
        this.setState({favorites: user.data.favorites})
    })
  }

  handleChange = (e) => {
    const file = e.target.files[0];
    const image = new FormData();
    image.append("image", file);
    Axios.post(process.env.REACT_APP_API_URL +"/cloudinary", image)
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
      process.env.REACT_APP_API_URL+"/cloudvision",
      { imageUrl },
      { withCredentials: true }
    )
      .then((response) => {
        console.log(response.data);
        let labelsString = "";
        response.data.forEach((element) => {
          labelsString += element.description+" ";
        });
        this.setState({ labels: labelsString });
      })
      .then(()=>{
        Axios.get(
          `https://www.googleapis.com/customsearch/v1?key=AIzaSyBj3pId_iDg4MGA2-5khVCzkEDHuUFv92s&cx=005967262815925650944:xavy6rlohqb&q=${this.state.labels}`
        )
          .then((response) =>{
            console.log(response.data.items)
            this.setState({ results: response.data.items })
          })
          .catch((error) => console.log(error));
      })

      .catch((error) => console.log(error));
  };

  render() {
    console.log("labels", this.state.labels);
    console.log(this.props.user.favorites)
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
          {this.state.results?
           this.state.results.map(resultObj=><img className="result" src={resultObj.pagemap.cse_image[0].src} alt="img"/>  )
           :null
          }
        </div>
      </div>
    );
  }
}
export default withAuth(SearchPage)