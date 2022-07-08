const express = require("express");
const router = express.Router();

const {create,categoryById,read,update,remove,list} = require("../controllers/category");
const {requireSignin,isAuth,Admin} = require("../controllers/auth");
const {userById} = require("../controllers/user");

router.post("/category/create/:userId",
requireSignin,
isAuth,
Admin,
create

);
router.put("/category/:categoryId/:userId",
requireSignin,
isAuth,
Admin,
update

);
router.delete("/category/:categoryId/:userId",
requireSignin,
isAuth,
Admin,
remove

);
router.get("/categories", list);
router.get("/category/:categoryId", read);


router.param("categoryId",categoryById);
router.param('userId', userById);


module.exports = router;