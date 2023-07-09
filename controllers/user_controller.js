const expressAsyncHandler=require("express-async-handler")
require('dotenv').config()

//JWT for token Generation
const jwt=require("jsonwebtoken");

//Import db from index.js
const db=require('../models/index')

//calling User
let User=db.User

//Login controller
const loginUser = expressAsyncHandler(async (req, res) => {
    try {
      const {email,password } = req.body;

        let userRecord = await User.findOne({ where: { email: email } });
        // If user not found
        if (!userRecord) {
          return res.send({ message: 'User not found with email' });
        }
        // Check if the password is correct
        if (password !== userRecord.dataValues.password) {
          return res.send({ message: 'Incorrect password' });
        }
        // For a successful login, generate a token with email and secret key
        const signedToken = jwt.sign(
          {
            email: userRecord.dataValues.email,
          },
          process.env.SECRET_KEY,
          {
            expiresIn: '1d',
          }
        );
        res.send({ message: 'Login success', token: signedToken, user: userRecord });

    } catch (err) {
      console.log(err);
    }
  });

//Exporting the controller to user Routes 
const userApp={
    loginUser
}
module.exports=userApp;