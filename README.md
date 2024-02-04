
# Online Text Editor | Settyl 

This Project is based on an online text editor made using web sockets. It also contains document sharing functionality via email.


## Acknowledgements

 - [Jodit-React](https://www.npmjs.com/package/jodit-react)
 - [Nodemailer](https://nodemailer.com/)


## API Reference

#### Get all items


    /api/v1/user


| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `/register` | `POST` | **Required** username,email,password |
|`/login` | `POST` | **Required** email,password|
|`/find` | `POST` | **Required** userId |
|`/sendMail` | `POST`| **Required** recipientMail, message, name, link |


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MONGO_URI` - Mongodb connection String.

`PORT` - Server connection port.

`JWT_SECRET` - JWT secret key.

`JWT_LIFETIME` - JWT expiry duration.

`SMTP_FROM_EMAIL` - An email address to send mail to other users.

`SMTP_FROM_PASSWORD` - App password to authorize sending mails. 


## Run Locally

Clone the project


    git clone https://github.com/beastkp/Settyl.git


Go to the Socket directory

    cd socket

Go to the client directory

    cd client

Go to the server directory

    cd server

Install dependencies in each directories

    npm install

Create the required env variables in the .env file and then start the server and the socket in their respective directories using the command

    nodemon start

In the client directory run: 

    npm run dev



## Tech Stack

**Client:** React, Redux, TailwindCSS, Redux-persist

**Server:** Node, Express, Socket.io, Nodemailer


## Authors

- [@Krish Panchal](https://github.com/beastkp)
