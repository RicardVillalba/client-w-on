# W-ON

## Description

Dress assistant

## User Stories

- **404** - As a user I want to see a nice 404 page when I go to a page that doesn't exist so that I know it was my fault
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault.

- **LOGIN PAGE** - As an user I want to be able to log in on the webpage so that I can get back to my account
- **LOGOUT** - As an user I want to be able to log out from the webpage so that I can make sure no one will access my account.

- **PROFILE PAGE** - As an user I want to be able to access the homepage so that I see what the app is about and login.

* **Favorite PAGE** - As a user I want to be able to access my favorites inside my profile.

- **SEARCH PAGE** - As an user I want to able to upload a ppicture and see a list of sugestions based on that picture and add them to my favorites
- **DETAIL PAGE** - As an user I want to able to see my pictures in full-screen and add them or delete them from my favorites

## Backlog:

List of other features outside of the MVPs scope

- edit user information
- search by categories
- Add categories to my favorites

## CLIENT/ROUTES:

## React Router Routes (React App)

| Path        | Component      | Permissions                                                                    | Behavior |     |
| ----------- | -------------- | ------------------------------------------------------------------------------ | -------- | --- |
| `/`         | SplashPage     | public `` | Home page                                                          |
| `/signup`   | SignupPage     | anon only `` | Signup form, link to login, navigate to homepage after signup   |
| `/login`    | LoginPage      | anon only `` | Login form, link to signup, navigate to homepage after login    |
| `/logout`   | n/a            | user only `` | Navigate to homepage after logout, expire session               |
| `/search`   | SearchPage     | user only `` | shows a form to search for clothes suggestions                  |
| `/profile`  | UserPage       | user only `` | shows the profile users information and favorites               |
| `/item/:id` | ItemDetailPage | user only `` | Details of an item with buttons to add or remove from favorites |

## Models

##### User model

```js
{
username:String,
pasword:String,
email:String,
tel:Number,
favorites:[ {type: ObjectId, ref: "Favorite" } ],
profilePicture:String
}
```

##### Favorites model

```js
{
	user:  {type: ObjectId, ref: "User" } ,
  season:  {type: String, enum:["autumn-fall","spring-summer"]},
  imageUrl: String,
	tags: [ String ](backlog),

}
```

## Components

- Navbar

- UserPage

  - UserInformation
  - Gallery
    - ItemCard
    - SeasonBtn

- Login

- Signup

- InitialScreen

- SearchPage
  - SearchForm
  - Gallery
    - ItemCard
- ItemDetailPage
  - DeleteBtn and AddBtn

## API Endpoints (backend routes)

| HTTP method | Url            | Request Body                                     | Success status | Error status | Description                                                                                                                     |
| ----------- | -------------- | ------------------------------------------------ | -------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| GET         | /auth/profile  | Saved session                                    | 200            | 404          | Check if user is logged in and return profile page                                                                              |
| POST        | /auth/signup   | {username, email, password, tel, profilePicture} | 201            | 404          | Checks if fields not empty (422) and user not exists (409), then create user with encrypted password, and store user in session |
| POST        | /auth/login    | {username, password}                             | 200            | 401          | Checks if fields not empty (422), if user exists (404), and if password matches (404), then stores user in session              |
| POST        | /auth/logout   | (empty)                                          | 204            | 400          | Logs out the user                                                                                                               |
| GET         | /user/:id      |                                                  |                | 400          | Show user information and user's favorites                                                                                      |
| GET         | /favorites/:id |                                                  |                |              | Show specific favorite                                                                                                          |
| DELETE      | /favorites/:id |                                                  | 201            | 400          | Delete specific favorite                                                                                                        |
| POST        | /favorites/:id | {imageUrl, season}                               | 201            | 400          | Add a specific favorite                                                                                                         |
| PUT         | /user/:id      | {username, email, password, tel, profilePicture} | 200            | 400          | edit user profile                                                                                                               |

## Links

### Trello

[Link to your trello board](https://trello.com/b/EWdYqLDi/qhops) or picture of your physical board

### Git

The url to your repository and to your deployed project
[Repository Link](http://github.com/)
[Deploy Link](http://heroku.com/)

### Slides

The url to your presentation slides
[Slides Link](http://slides.com/)

### Team Members

Ricard Villalba
