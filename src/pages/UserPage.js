import React, { Component } from 'react'
import axios from "axios"
import {withAuth} from "../lib/Auth.js"

class UserPage extends Component {
    constructor (props) {
        super(props)
        this.state = {
            user:{},
            favorites:[]
        }
        console.log(this.props)
    }

    componentDidMount() {
        axios.get(process.env.REACT_APP_API_URL+"/auth/me", { withCredentials: true })
        .then(user => {
            return user.data._id
        })
        .then(userId => {
            return axios.get(process.env.REACT_APP_API_URL+`/user/${userId}`, { withCredentials: true })
        })
        .then (user => {
            this.setState({user:user.data,favorites:user.data.favorites},)
        })
        
      
    }


    removeFromFavorites = (id,index) => {
        /*axios.get(process.env.REACT_APP_API_URL + `/user/${this.props.user._id}`,
        { withCredentials: true })
        .then((user)=> {
          let favorites = user.data.favorites.filter((favoriteObj) => {
            return favoriteObj.imageUrl===imageUrl;
          });
          console.log("FAVORITES",favorites)*/
          
          axios.delete(
            process.env.REACT_APP_API_URL + `/favorites/${id}`,
            { withCredentials: true }
          )
            .then((user) => {
              console.log(user);
              let favorites = [...this.state.favorites]
              favorites.splice(index,1)
              this.setState({favorites})
            })
            .catch((error) => console.log(error));
        }
      


    render() {
        // console.log('user from state', this.state.user);

        const { username, email, tel } = this.state.user
        const {favorites} = this.state
        return (
            <div>
                <div className="userdata">
                    <div className="userdataText">
                <h4>{username}</h4>
                    <h4>{email}</h4>
                    <h4>tel: {tel}</h4>
                    </div>
                </div>
                <h4 className="favTitle">FAVORITES</h4>
                <div className="favorites">
                    {
                        favorites
                        ? favorites.map((eachFav, index) => {
                            return (
                            <div key = {eachFav._id} >
                                <div >
                             <img className="favs" src={eachFav.imageUrl} alt="favorite img" />
                                </div>
                                <div>
                                <button onClick={()=>{this.removeFromFavorites(eachFav._id, index)}} className="addButton">remove from favorites</button>
                                </div>
                            </div>
                            )
                        })
                        : <p>loading...</p>
                    }
                </div>
            </div>
        )
    }
}



export default withAuth(UserPage)
