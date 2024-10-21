import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "./loadEnvironment.js";

import "./cronDailyCleanup.js";
import "./cronFetchOAuthJWKs.js";

import rateLimit from "express-rate-limit";
import jwt from 'jsonwebtoken';

import travelDetailsCollection from "./routes/travelDetailsCollection.js";
import getDateTime from "./routes/getDateTime.js";
import userDetailsCollection from "./routes/userDetailsCollection.js";
import login from "./routes/login.js";
import dailyCleanup from "./routes/dailyCleanup.js";

import verifyJWT from "./verifyJWT.js";

const PORT = process.env.PORT || 3070;
const app = express();

app.use(cors({
  origin: [
     process.env.CLIENT_URL,
    "https://go-to-mini-project.vercel.app"
  ], 
  credentials: true
}));
  
app.use(express.json());
app.use(cookieParser());

const limiter = rateLimit({
  windowMs: 1*60*1000,
  max: process.env.NODE_ENV === 'production' ? 30 : 1000,
  keyGenerator: (req) => {
    const authToken = req.cookies.jwt_auth_token;
    if (authToken) {
      try {
        const user = jwt.verify(authToken, process.env.JWT_SECRET);
        return user.email;
      } catch (err) {
        return req.ip;
      }
    }
    return req.ip;
  }
});

app.use(limiter);

app.use("/api/travelDetails", verifyJWT, travelDetailsCollection);
app.use("/api/getDateTime", verifyJWT, getDateTime);
app.use("/api/userDetails", verifyJWT, userDetailsCollection);

app.use("/api/login", login);
app.use("/api/dailyCleanup", dailyCleanup);

app.get('/api*', verifyJWT, (req, res) => {
  res.status(200).json({
    message: "GoTo server is LIVE!"
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

// module.exports = app;
// export default app;
