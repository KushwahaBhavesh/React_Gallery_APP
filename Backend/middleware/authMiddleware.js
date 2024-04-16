import jwt from 'jsonwebtoken'


export const authenticate = (req, res, next) => {

  const accessToken = req.cookies.accessToken;

  if (!accessToken) {

    // calling refresh Token function
    if (refreshTokenValidation(req, res)) {

      next();
    } else {
      return res.status(200).json({ msg: "not validate" })
    }
  } else {
  
    jwt.verify(accessToken, process.env.USER_SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({ msg: 'Invalid Token' });
      } else {
        req.userId = decoded.userId;
        next();
      }
    })
  }
};

const refreshTokenValidation = (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  let exist = false;
  if (!refreshToken) {
    return res.status(404).json({ msg: "Refresh Token Not Found" });
  } else {
    jwt.verify(refreshToken,process.env.USER_REFRESH_SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({ msg: "Invalid Refresh Token" })
      } else {
        const accessToken = jwt.sign({ userId: decoded.userId }, process.env.USER_SECRET_KEY, { expiresIn: "1m" })
        res.cookie("accessToken", accessToken, { maxAge: 60000 });
        exist = true
      }
    })
  }
  return exist
}


export default authenticate