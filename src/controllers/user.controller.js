import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'

export const getUsers = async (req, res) => {
  try {
    let { page, count } = req.query
    page = page ? parseInt(page, 10) : 1
    count = count ? parseInt(count, 10) : 10

    const skip = (page - 1) * count

    const users = await User.find().skip(skip).limit(count)

    const totalUsers = await User.countDocuments()
    const totalPages = Math.ceil(totalUsers / count)

    res.json({
      data: users,
      meta: {
        currentPage: page,
        count,
        totalPages,
        totalUsers
      }
    })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)

    if (!user) {
      return res.status(404).json({
        message: 'No user found with that ID',
        status: 'fail'
      })
    }

    res.status(200).json({
      data: {
        user
      },
      status: 'success'
    })
  } catch (error) {
    res.status(400).json({
      message: error.message,
      status: 'fail'
    })
  }
}

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params
    const { email, password } = req.body

    const hashedPassword = await bcrypt.hash(password, 10)
    const updatedUser = await User.findByIdAndUpdate(id, { email, password: hashedPassword }, { new: true })

    res.json({
      data: {
        user: updatedUser
      },
      status: 'success'
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)

    if (!user) {
      return res.status(404).json({
        message: 'No user found with that ID',
        status: 'fail'
      })
    }

    res.status(200).json({
      message: 'User deleted successfully',
      status: 'success'
    })
  } catch (error) {
    res.status(400).json({
      message: error.message,
      status: 'fail'
    })
  }
}
