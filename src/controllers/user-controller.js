const UserService = require("../services/User-service");

const userService = new UserService();

const create = async (req, res) => {
    try {
        const response = await userService.create({
            Name:req.body.name,
            email: req.body.email,
            password: req.body.password
        });
        return res.status(201).json({
            success: true,
            message: 'Successfully created a new user',
            data: response,
            err: {}
        });
    } catch (error) {
        // console.log(error);
        return res.status(error.statusCode).json({
            message: error.message,
            data: {},
            success: false,
            err: error.explanation
        });
    }
}
const getUser = async (req, res) => {
    try {
        // console.log(req.body);
        // console.log(req.query);
        const response = await userService.getUser(req.query.id);
        return res.status(201).json({
            message: "Successfully fetched the User!",
            data: response,
            err: {},
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Not able to fetch the User!",
            err: error,
            success: false,
            data: {}
        });
    }
}

const signIn = async(req,res) => {
    try {
        const response = await userService.signIn(req.body.email, req.body.password);
        return res.status(201).json({
            message : "Successfully Signed In",
            data : response,
            err : {},
            success:true
        });
    } catch (error) {
         console.log(error);
         return res.status(500).json({
            message : "Not able to sign-in",
            err:error,
            success:false,
            data:{}
         });
    }
}
const getByUserId = async (req,res) => {
    try {
        const response = await userService.getUserById(req.params.id);
        return res.status(201).json({
            message : "Successfully fetched the user",
            data : response,
            err : {},
            success:true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message : "Not able to fetch",
            err:error,
            success:false,
            data:{}
        });
    }
}
const isAuthenticated = async(req,res) => {
    try {

        const token = req.headers['x-access-token'];
        const response = await userService.isAuthenticated(token);
        return res.status(200).json({
            success:true,
            err:{},
            data:response,
            message:"User is authenticated and token is verified"
        
        });
       
    } catch (error) {
         console.log(error);
         return res.status(500).json({
            message : "Not able to sign-in",
            err:error,
            success:false,
            data:{}
         });
    }


}

const isAdmin = async(req,res) => {
    try {
        const admin = await userService.isAdmin(req.body.id);
        return res.status(201).json({
            success:true,
            message : admin? "YES Admin": "NO not an admin",
            data : admin,
            err : {}
        });
        
    } catch (error) {
        console.log(error);
         return res.status(500).json({
            message : "Not an admin",
            err:error,
            success:false,
            data:{}
         });
    }
}

const grantRole = async(req,res) => {
    try {

        const response = await userService.grantRole(req.body.userid,req.body.roleid);
        return res.status(201).json({
            success:true,
            message : "Role Granted",
            data : response,
            err : {}
        });
        
    } catch (error) {
        console.log(error);
         return res.status(500).json({
            message : "Not able to grant the role",
            err:error,
            success:false,
            data:{}
         });
    }
}
const verifyEmailtoken = async(req,res) => {
    try {
        const response = await userService.verifyEmailtoken(req.query.token);
        return res.status(201).json({
            success:true,
            message : "email verified",
            data : response,
            err : {}
        });
    } catch (error) {
        console.log(error);
         return res.status(500).json({
            message : "Not able to verify the email",
            err:error,
            success:false,
            data:{}
         });
    }
}
const destroy = async(req,res) => {
    try {
        const response = await userService.destroy(req.params.id)
        return res.status(201).json({
            success:true,
            message : "deleted",
            data : response,
            err : {}
        });
    } catch (error) {
        console.log(error);
         return res.status(500).json({
            message : "Not able to delete the user",
            err:error,
            success:false,
            data:{}
         });
    }
}

module.exports = {
    destroy,
    create,
    getUser,
    signIn,
    isAuthenticated,
    isAdmin,
    grantRole,
    verifyEmailtoken,
    getByUserId
}


