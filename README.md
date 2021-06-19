# Back-end API Exam
- User management API 
- Full CRUD functionality
- Authentication and restrictions

### Pre-requisites (On my machine)
- NodeJS (My version: 14.17.0)
- MySQL (My version: MySQL v15.1 Distrib 10.4.19-MariaDB || XAMPP v3.3.0)

### Instructions
Make sure you have installed NodeJS and you have mysql in your machine, then clone this repository and <br>
run `$ npm install` for installation.

#### Database:
For the database, create a database named `backend_exam`. I uploaded the .env file so you can use it for database config just change the `HOST`, `USER`, and `PASSWORD`. The `SECRET_KEY` I generate for session is already there, also uploading .env file in github is not recommended but I uploaded it for your reference. 

#### Startup:
- `$ npm run dev` - to run in your machinge (development environment)
- `$ nrpm run test` - to test api if working

#### Scripts, Packages and Libraries I used:
It's all in the [package.json](https://github.com/rodelcabs/backend_exam/blob/master/package.json) so make sure to run `$ npm install` first to install all required packages
