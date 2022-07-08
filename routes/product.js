const express = require("express");
const router = express.Router();

const {create ,
    productById,
    read,
    remove,
    update,
    list,
    listRelated,
    listcategories,
    listBySearch,
    photo,
    listSearch           } = require("../controllers/product");


const {requireSignin,isAuth,Admin} = require("../controllers/auth");
const {userById} = require("../controllers/user");

// to create product and it to database
router.post("/product/create/:userId",
requireSignin,
isAuth,
Admin,
create

);

// to get product by id or to make middle ware
router.get('/product/:productId',read);

// to delete product
router.delete('/product/:productId/:userId' ,
requireSignin,
isAuth,
Admin,
remove //for removing product from data base
 );


// to update product
router.put('/product/:productId/:userId' ,
requireSignin,
isAuth,
Admin,
update //for update  product from database
 );


 // to get all products 
router.get('/products',list);

// get all related product like product of same category
router.get("/products/related/:productId",listRelated) 

// this one return all the category based on product 
router.get("/products/categories", listcategories)

// get product by params (whatever user typein in searchbar )
router.get("/products/search", listSearch);

/**
 * list products by search
 * we will implement product search in react frontend
 * we will show categories in checkbox and price range in radio buttons
 * as the user clicks on those checkbox and radio buttons
 * we will make api request and show the products to users based on what he wants
 */
router.post("/products/by/search", listBySearch);

// to get the photos of product
router.get("/product/photo/:productId",photo)

router.param('userId', userById);
router.param('productId', productById); // this will populate product variable in req with all content of req
module.exports = router;