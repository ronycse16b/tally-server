import express from 'express';
import { registerController, loginController, forgotController} from '../controllers/authController.js';
import { isAdmin, requireSignIn } from '../middelewares/authMiddelware.js';

// router object

const router = express.Router();

// routing
// REGISTER || METHOD POST
router.post('/register', registerController)
// routing


// REGISTER || METHOD POST
router.post('/login', loginController)



// forgot || METHOD POST
router.post('/forgot', forgotController)


// // test route
// router.get('/test', requireSignIn, isAdmin, testController)

//protected route auth user
router.get('/user-auth', requireSignIn, (req, res) => {
    res.status(201).send({
        ok: true,

    })
})
//protected route auth admin
router.get('/admin-auth', requireSignIn, isAdmin, (req, res) => {
    res.status(201).send({
        ok: true,

    })
})


export default router