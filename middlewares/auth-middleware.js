import jwt from 'jsonwebtoken'
import { decryptJSON } from '../utils/encryptdecrypt.js'

var checkUserAuth = async (req, res, next) => {
  let token
  const { authorization } = req.headers
  if (authorization && authorization.startsWith('Bearer')) {
    try {
      // Get Token from header
      token = authorization.split(' ')[1]
      // Verify Token
      const data = jwt.verify(token, process.env.JWT_SECRET_KEY)
      const userData = decryptJSON(
        data.data,
        process.env.JWT_SECRET_KEY
      )
      // Get Data from Token
      req.userData = userData
      next()
    } catch (error) {
      console.log(error);
      res.status(401).send({ "status": "failed", "message": "Unauthorized User" })
    }
  }
  if (!token) {
    res.status(401).send({ "status": "failed", "message": "Unauthorized User, No Token" })
  }
}

export default checkUserAuth