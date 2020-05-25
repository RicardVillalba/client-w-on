import React, { Component } from "react";
import Axios from "axios";

export default class SearchPage extends Component {
  state = {
    image: null,
    labels: "",
  };

  componentDidMount() {
    Axios.get(
      `https://www.googleapis.com/customsearch/v1?key=AIzaSyBj3pId_iDg4MGA2-5khVCzkEDHuUFv92s&cx=005967262815925650944:xavy6rlohqb&q=${`this.state.labels`}`
    )
      .then((response) => console.log(response.data.items))
      .catch((error) => console.log(error));
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
          labelsString += element.description + "&";
        });
        this.setState({ labels: labelsString });
      })

      .catch((error) => console.log(error));
  };

  render() {
    console.log("labels", this.state.labels);
    return (
      <div className="uploadImg">
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
      </div>
    );
  }
}
