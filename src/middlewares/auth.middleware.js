import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '../config.js'

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({ message: 'You are not logged in! Please log in to get access.' })
  }

  jwt.verify(token, TOKEN_SECRET, (error, user) => {
    if (error) {
      return res.status(403).json({ error: 'Forbidden' })
    }

    req.user = user

    next()
  })
}
