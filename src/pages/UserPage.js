import React, { Component } from 'react'
import axios from "axios"
import {withAuth} from "../lib/Auth.js"

class UserPage extends Component {
    constructor (props) {
        super(props)
        this.state = {
            user:{}
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
            this.setState({user:user.data},)
        })
      
    }

    render() {
        // console.log('user from state', this.state.user);

        const { username, email, tel, favorites } = this.state.user
        return (
            <div>
                <div className="userdata">
                    <div className="userdataText">
                <h4>user: {username}</h4>
                    <h4>email: {email}</h4>
                    <h4>tel: {tel}</h4>
                    <h4>edit</h4>
                    </div>
                </div>
                <h4 className="favTitle">favorites</h4>
                <div className="favorites">
                    {
                        favorites
                        ? favorites.map(eachFav => {
                            return (
                            <div >
                                <div >
                             <img className="favs" src={eachFav.imageUrl} alt="favorite img" />
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
