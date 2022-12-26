const UserService = require("../services/User-service");

const userService = new UserService();

const create = async (req, res) => {
    try {
        //console.log(req.body);
        const response = await userService.create({
            email: req.body.email,
            password: req.body.password
        });
        return res.status(201).json({
            message: "Successfully created the User!",
            data: response,
            err: {},
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Not able to create the User!",
            err: error,
            success: false,
            data: {}
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


module.exports = {
    create,
    getUser,
    signIn,
    isAuthenticated
}


