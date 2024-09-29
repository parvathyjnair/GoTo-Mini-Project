import jwt from 'jsonwebtoken';

const verifyJWT = (req, res, next) => {
  let jwtToken = req.cookies.jwt_auth_token;
  //console.log(jwtToken)
  if (!jwtToken) {
    return res.status(401).json({ msg: "Unauthorized. Please login." });
  }

  try {
    const user = jwt.verify(jwtToken, process.env.JWT_SECRET);
    // console.log(user);
    req.body.email = user.email;
    req.body.name = user.name;
    req.query.email = user.email;
    req.query.name = user.name;
  } catch (err) {
    return res.status(401).json({ msg: "Unauthorized. Please login." });
  }

  next();
};

export default verifyJWT;