const validateUserAuth = (req,res,next) => {
    if(!req.body.email || !req.body.password){
        return res.status(400).json({
            success : false,
            message : "Email or password fields can't be empty!",
            err:'Email or password is missing',
            data:{}
        });
    }
    next();
}


module.exports = {
    validateUserAuth
}