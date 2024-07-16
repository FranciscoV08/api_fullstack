
import {Router} from 'express'
import { inicio, login, logout, profile, register, verifyToken } from '../controllers/auth.controllers.js';
import { authRequired } from '../middlewares/validateToken.js'
import {validatorSchema} from '../middlewares/validator.midelware.js'
import {registerSchema, loginSchema} from '../schemas/auth.schema.js'

const router = Router();

router.get('/', inicio)
router.post('/register', validatorSchema(registerSchema), register)
router.post('/login', validatorSchema(loginSchema), login)
router.post('/logout', logout)
router.get('/profile', authRequired, profile)

router.get('/verify', verifyToken)

export default router;