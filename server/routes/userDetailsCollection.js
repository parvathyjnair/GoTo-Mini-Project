import express from "express";
import connectToDatabase from "../db/conn.js";

const router = express.Router();

router.patch("/addSubscription", async (req, res) => {
    let db = await connectToDatabase();
    const {email, subscription} = req.body;
    let collection = db.collection("GotoUsers");
    const filter = { "email": email };
    const update = { $set: { "subObject": subscription } };
    const options = {returnOriginal: false};

    try{
    const result = await collection.findOneAndUpdate(filter, update, options);
    if (!result.value) {
        return res.status(404).json({ error: 'User not found' });
      }
    res.json(result.value);

    }catch (error) {
      console.error('Error occurred while updating user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
});

// router.post("/addUser", async (req, res) => {
//   let oauthJWT = req.body.jwt;
//   if(!oauthJWT){
//     return res.status(401).json({ error: 'No token found' });
//   }
//   let userData = await verifyOAuthJWT(oauthJWT);

//   if(!!!userData){
//     return res.status(401).json({ error: 'Invalid token' });
//   }

//   const authToken = jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: '30d' });

//   res.cookie('jwt_auth_token', authToken
//   , {
//     httpOnly: false,
//     secure: process.env.NODE_ENV === 'production',
//     sameSite: 'strict',
//     expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
//     path: '/',
//   }
//   );

//   let db = await connectToDatabase();
//   let collection = db.collection("GotoUsers");
//   let email = userData.email;
//   const existingUser = await collection.findOne({ email });

//   if (existingUser) {
//     return res.send({msg: "User already exists.", profile: userData}).status(208);
//   }

//   let newUser = {
//     "email": email,
//     "name": req.body.name,
//     "ph_no": "",
//     "wa_no": "",
//     "avatar": req.body.avatar,
//     "subObject": {}
//   };
//   let result = await collection.insertOne(newUser);
//   res.send({msg: "New user added.", profile: userData}).status(200);

// });

router.patch("/updateContact", async (req, res) => {
  const regex = /^(?:\+91|0)?[6789]\d{9}$/;
  const {email, ph_no, wa_no} = req.body;

  if(!ph_no.match(regex) || !wa_no.match(regex)){
    return res.status(400).json({ error: 'Invalid phone/whatsapp number' });
  }

  let db = await connectToDatabase();
  let collection = db.collection("GotoUsers");
  const filter = { "email": email };
  const update = { $set: { "ph_no": ph_no, "wa_no": wa_no } };
  const options = {returnOriginal: false};

  try{
    const result = await collection.findOneAndUpdate(filter, update, options);
    if (!result.value) {
        return res.status(404).json({ error: 'User not found' });
      }
    res.json({msg: "Contact updated"});

    }catch (error) {
      console.error('Error occurred while updating user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

router.get("/getContact", async (req, res) => {
  let db = await connectToDatabase();
  const {email} = req.query;
  let collection = db.collection("GotoUsers");
  let results = await collection.findOne({"email": email});
  if(results){
    res.status(200).send({
      "ph_no": results.ph_no,
      "wa_no": results.wa_no
    });
  }else{
    res.status(404).send({
      "ph_no": "",
      "wa_no": ""
    });
  }
});

export default router;
// module.exports = router;