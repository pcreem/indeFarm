# Indigenous Farm 
A simple Indigenous project built with Node.js, Express, and PostgreSQL


## Quick Look
![Project Look1](https://imgur.com/SsHcjFC.png)
## admin
![Project Look2](https://imgur.com/N4fhBgZ.png)



## Demo
Try out our Farm on [Demo URL](https://igfarm.herokuapp.com/signin)

```
User
  account：tzou@example.com 
  password：123
Admin
  account：root@example.com
  password：123
```

## Features
| Functions              | Detail                                            | URL                         |
| :--------------------: | ------------------------------------------------- | --------------------------- |
| Sign up | User can sign up an account by inputting name, email, password | /signup |
| Log in | User can log in using registered email | /signin |
| Log out | User can log out of an account | /logout |
| Quick view all agrifoods | User can view all agrifoods | /agrifoods |
| View detail of agrifoods | User can view agrifood's detail | /agrifoods/:id |
| View all agrifoods | Admin can view all agrifoods | /admin/dashboard |
| Create a agrifoods | Admin can add a new agrifoods after login | /admin/agrifoods/create |
| View a agrifood | Admin can view detail of a agrifood after login | /admin/agrifoods/:id |
| Edit a agrifood | Admin can update detail info of a agrifood after login | /admin/agrifoods/:id/edit |
| Delete a agrifood | Admin can delete a agrifood after login | /admin/agrifoods/:id |
| View all users | Admin can view all users after log in | /admin/members |
| Edit a authority | Admin can update user's role after log in | /admin/members/:id |



## Project setup
### Clone

Clone this repository to your local machine

```
$ git clonechttps://github.com/pcreem/indeFarm.git
```

### Setup Datebase

**Create database via PostgreSQL Workbench**

Reference
```
https://bit.ly/3e3ofri

```


### Setup App

**1. Enter the project folder**

```
$ cd indeFarm
```

**2. Install packages via npm**

```
$ npm install
```

**3. Create .env file**

```
$ code .env
```

**4. Store API Key in .env file and save**

```
IMGUR_CLIENT_ID=<YOUR_imgur_ID>
JWT_SECRET=<YOUR_JWT_SECRET>
```

**5. Edit password in config.json file**

> /config/config.json
```
"development": {
    "url": "postgres://<your_user_name>:<your_database_password>@127.0.0.1:5432/<your_database_name>",
    "dialect": "postgres"
  },
```

**6. Run migration & seeder**

> run the following code in the console
```
$ npx sequelize db:migrate
$ npx sequelize db:seed:all
```

**7. Activate the server**

```
$ npm run dev
```

**8. Find the message for successful activation**

```
> Example app listening on port 3000!
```
You may visit the application on browser with the URL: http://localhost:3000

```
User
  account：tzou@example.com 
  password：123
Admin
  account：root@example.com
  password：123
```


## Authors

 - [Song](https://github.com/pcreem)
