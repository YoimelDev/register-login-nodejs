import { Router } from 'express'

import { authMiddleware } from '../middlewares/auth.middleware.js'

import { getUsers, getUser, updateUser, deleteUser } from '../controllers/user.controller.js'

const router = Router()

router.get('/', authMiddleware, getUsers)
router.get('/:id', authMiddleware, getUser)
router.put('/:id', authMiddleware, updateUser)
router.delete('/:id', authMiddleware, deleteUser)

export default router
