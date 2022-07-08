const express = require("express");
const router = express.Router();

const {userById,read,update,purchaseHistory} = require("../controllers/user");

const {requireSignin,isAuth,Admin} = require("../controllers/auth");

router.get("/secret/:userId",requireSignin,isAuth,Admin,(req,res)=>{
    res.json({user:req.profile});
});

// to get user
router.get("/user/:userId",requireSignin,isAuth,read);
// to update user
router.put("/user/:userId",requireSignin,isAuth,update);

// to update the history of purchase we need to fetch user order
router.get('/orders/by/user/:userId', requireSignin, isAuth, purchaseHistory);


router.param('userId', userById);


module.exports = router;