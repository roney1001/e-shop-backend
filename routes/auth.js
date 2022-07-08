const express = require("express");
const router = express.Router();

const {signup,signin,signout,requireSignin} = require("../controllers/auth");
const {userSignupvalidator} = require('../validator/index');

router.post('/signup',userSignupvalidator, signup);
router.post('/signin', signin);
router.get('/signout', signout);

// router.get('/nupu', requireSignin,(req,res)=>{
//     res.send("hello nupur");
// })

module.exports = router;