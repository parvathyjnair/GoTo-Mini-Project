import express from "express";
import connectToDatabase from "../db/conn.js";
import verifyOAuthJWT from "../verifyOAuthJWT.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/", async (req, res) => {
    let oauthJWT = req.body.jwt;
    if(!oauthJWT){
      return res.status(401).json({ error: 'No token found' });
    }
    let userData = await verifyOAuthJWT(oauthJWT);
  
    if(!!!userData){
      return res.status(401).json({ error: 'Invalid token' });
    }
  
    const authToken = jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: '30d' });
  
    res.cookie('jwt_auth_token', authToken
    , {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000,  // 30 days
      path: '/api',
    }
    );
  
    res.cookie('dummy_jwt_auth_token', "iExist!"
    , {
      httpOnly: false,
      secure: true,
      sameSite: 'none',
      maxAge: 30 * 24 * 60 * 60 * 1000,
      path: '/',
    }
    );

    let db = await connectToDatabase();
    let collection = db.collection("GotoUsers");
    let email = userData.email;
    const existingUser = await collection.findOne({ email });
    console.log('user data >',userData)
    if (existingUser) {
      return res.status(208).send({msg: "User already exists.", profile: userData});
    }
    
    //Code for comparing users with college userDirectory
    let userDirectoryCollection = db.collection("userDirectory");
    const isUserPresent = await userDirectoryCollection.findOne({ "username": email })
    const isCollegeMemberFlag = isUserPresent ? true : false
    const hasUserAdminPrivelage = isUserPresent ? isUserPresent.is_admin :  false// if user is present in UserDirectory, then check if that user has admin role.
    let newUser = {
      "email": email,
      "name": userData.name || userData.given_name,
      "ph_no": "",
      "wa_no": "",
      "avatar": userData.picture,
      "isAdmin": hasUserAdminPrivelage ,
      "isCollegeMember" : isCollegeMemberFlag,
      "subObject": {}
    };
    let result = await collection.insertOne(newUser);
    res.status(200).send({msg: "New user added.", profile: userData});
  
  });

export default router;