import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import { createAccessToken } from '../libs/jwt.js'

export const register = async (req, res) => {
  try {
    const { email, password } = req.body

    const userFound = await User.findOne({ email })

    if (userFound) {
      return res.status(400).json({
        message: 'The email is already taken'
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({ email, password: hashedPassword })

    res.status(201).json({ user })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User
      .findOne({ email })
      .select('+password')
      .exec()

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const token = await createAccessToken({ id: user._id })

    res.json({ token })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}
