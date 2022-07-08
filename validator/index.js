exports.userSignupvalidator = (req,res,next)=>{
    req.check('name',"Name is require").notEmpty();
    req.check('email',"Email must be valid ").matches(/.+@.+\..+/)
    .withMessage('Email must contain @').isLength({min:4 ,max:40});
    req.check('password',"Password is required").notEmpty()
    // req.check("password").isLength({min:6}}).withMessage("password min of 6 length")
    //.matches(/\d/).withMeassage("passwors must contain number ")

    const errors =  req.validationErrors();
    if(errors){
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({error:firstError});
    }
    // this is core concept of middle ware when you done signup then go to next 
    // no matter is there any or not 
    next();
};

    
