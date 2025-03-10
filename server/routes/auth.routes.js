import express from 'express';
import { registerUser, authUser } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/', registerUser);
router.post('/login', authUser);

export default router;