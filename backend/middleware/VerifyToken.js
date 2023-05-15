import jwt from "jsonwebtoken"

export const verifyToken = (req, res, next) => {

  // pengambilan nilai header "Authorization" dari objek req
  const authHeader = req.headers['authorization'];

  // untuk memperoleh nilai token dari header
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);
  
  // verifikasi token
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403);
    req.email = decoded.email;
    next();
  })

}
