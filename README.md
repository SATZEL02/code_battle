# CodeBattle - An Online Code Judge Platform. A MERN stack project deployed on AWS,Vercel and Render

## A fully functional MERN Stack application deployed on AWS, Vercel and Render.

The main purpose of this web application to help its users get better at their problem solving skills and get ready for their next interview. The applications has many features and shows how to do all the stuff written below:

1. User Authentication using JsonWebToken and BcryptJS
2. Add Google OAuth to your Sign In functionality 
3. File upload functionality using Google Firebase Storage Bucket
4. Allows CRUD operations on MongoDB using mongoose package
5. Use of Docker for Isolation and Security purposes
6. Make a Web Application production rady and deploy it on AWS, Vercel and Render.
7. Implement a Code Editor and a API to compile code written by the users and give the verdict of their submission. 

## Take a Look at the website

<a href="https://code-battle-five.vercel.app/" target="_blank">
<img src = "https://firebasestorage.googleapis.com/v0/b/codebattle-ce684.appspot.com/o/image.png?alt=media&token=69be9509-1ac7-45f4-9899-b29c8f0b20c1" alt="Visit website" width="240" height="180"/>
</a>

## How to use the Website:

0. Visit the website using the link provided above.
1. If you are a new user, you can still see the problems and content this application has to offer but if you want to try your problem solving skills you need to first sign up/sign in with us first.
2. You can sign up by clicking on the top right sign in button displayed on the website header.
3. You can use Google Authentication to sign in as well.
4. Now after signing in you can see your profile pic in place of sign in button, to visit your profile page click on your profile pic.
5. In the profile page, you'll see your username and registered email id, here you can update all your data including your sign in password and profile image.
6. To update your profile image click on your profile image displayed in center of profile image and a prompt will pop up asking you to upload your image, after that dont forget to click on update button to save your changes.
7. On the profile page you can also add your own new problems for others and as well as yourself to solve and practice and also see your submissions result and already created problems.
8. Now to search for a question, you can type the title or phrase in the search bar displayed at header of the website.
9. On the search page you can search for different types of questions you would like to solve.
10. The Compiler provides support for three different programming languages(C++, Java, Python);

Happy Coding..

## For Developers and Contributors:

1. Clone the github Repository to your local system.
2. Initiate your own environment variables.
3. You would need following dependencies and programs preinstalled to use:
 * Docker
 * ReactJS
 * NodeJS
4. You also want to change vite.config.js file to route the application for your locally hosted backend.
5. This application is divided into three parts: Frontend, DataBase API and Code Compilation API
6. Code Compilation API is deployed on AWS and uses Docker for security and isolation reasons.
7. Backend API is deployed on render and frontend API is deployed on Vercel, so you might want to code keeping these things in mind







 