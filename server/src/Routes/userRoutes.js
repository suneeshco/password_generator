import { Router } from 'express';
import { deletePasswords, getPasswords, savePassword } from '../controllers/passwordController.js';
import { userAuth } from '../middleware/authMiddleware.js';

const router = Router();

router.post("/savePassword",userAuth, savePassword)
router.get("/getPasswords",userAuth,getPasswords)
router.delete("/deletePasswords",userAuth,deletePasswords)


export default router;