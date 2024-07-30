/* eslint-disable consistent-return */
import { verify } from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
  if (['/signup', '/login', '/refresh'].includes(req.url)) {
    next()
    return
  }

  const authHeader = req.headers.authorization
  const token = authHeader?.split(' ')[1]

  if (token == null) {
    res.status(401)
    return res.send({ message: 'Unauthorized' })
  }

  verify(token, process.env.JWT_SECRET, (err) => {
    if (err) {
      res.status(401)
      return res.send({ message: 'Unauthorized' })
    }
    next()
  })
}
