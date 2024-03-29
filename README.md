# CodeBattle 

## MERN Stack based Online Code Judge Platform project deployed on AWS,Vercel and Render

## Take a Look at the website

<a href="https://code-battle-five.vercel.app/" target="_blank">
<img src = "https://firebasestorage.googleapis.com/v0/b/codebattle-ce684.appspot.com/o/image.png?alt=media&token=69be9509-1ac7-45f4-9899-b29c8f0b20c1" alt="Visit website" width="480" height="240"/>
</a>

#### Video Demonstration Link : [Demo Video](https://www.loom.com/share/873d5dd0e3544a9d887e2cf1b22d77da?sid=38165cb1-2849-4f10-9ab6-13796ffeedd3)

## Table of Contents

- [Technologies Used](#technologies-used)
- [Features](#features)
- [How to Use](#how-to-use-the-website)
- [For Developers](#for-developers-and-contributors)
- [Known Errors](#error-fixes-required)
- [To Do](#to-do)

## Technologies Used

- **Express.js:** A web application framework for building APIs and handling server-side logic.
- **Node.js:** A runtime environment for executing JavaScript code on the server.
- **React:** A javscript library to build user interfaces out of individual pieces called components
- **MongoDB:** A cross-platform, document-oriented database program
- **Docker:** A platform designed to help developers build, share, and run container applications
- **AWS:** A cloud computing service
- **Tailwind:** A utility-first CSS framework

## Features

The main purpose of this web application to help its users get better at their problem solving skills and get ready for their next interview. The applications has many features and shows how to do all the stuff written below:

1. User Authentication using JsonWebToken and BcryptJS
2. Add Google OAuth to your Sign In functionality 
3. File upload functionality using Google Firebase Storage Bucket
4. Allows CRUD operations on MongoDB using mongoose package
5. Use of Docker for containerising code compilation
6. Make a Web Application production ready and deploy it on AWS, Vercel and Render.
7. Implement a Code Editor and a API to compile code written by the users and give the verdict of their submission. 

## How to use the Website

1. Visit the website using the link provided above.
2. If you are a new user, you can still see the problems and content this application has to offer but if you want to try your problem solving skills you need to first sign up/sign in with us first.
3. You can sign up by clicking on the top right sign in button displayed on the website header.
4. You can use Google Authentication to sign in as well.
5. Now after signing in you can see your profile pic in place of sign in button, to visit your profile page click on your profile pic.
6. In the profile page, you'll see your username and registered email id, here you can update all your data including your sign in password and profile image.
7. To update your profile image click on your profile image displayed in center of profile image and a prompt will pop up asking you to upload your image, after that dont forget to click on update button to save your changes.
8. On the profile page you can also add your own new problems for others and as well as yourself to solve and practice and also see your submissions result and already created problems.
9. Now to search for a question, you can type the title or phrase in the search bar displayed at header of the website.
10. On the search page you can search for different types of questions you would like to solve.
11. The Compiler provides support for three different programming languages(C++, Java);

Happy Coding..

## For Developers and Contributors

### Project Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/SATZEL02/code_battle.git
   cd code_battle
2. **Install the dependencies:**
 
   ```bash
   npm install
3. **Start the server:**
  
   ```bash
   nodemon index.js
4. You might also want to change vite.config.js file to route the application for your locally hosted backend.
5. This application is divided into three parts: Frontend, DataBase API and Code Compilation API

## Deployment

1. Code Compilation API is deployed on AWS and uses Docker for security and isolation reasons.
2. Backend API is deployed on render and frontend API is deployed on Vercel

## Error Fixes Required

* After closing the window, access cookie is deleted but redux persistor is not deleted, which can lead to an error.
* Python Compilation error for taking input from a text file

## To Do

* Implement message queue for load balancing
* Show submitted Code to user





 