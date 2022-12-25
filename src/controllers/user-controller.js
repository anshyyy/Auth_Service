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
            data:response,
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

module.exports = {
    create
}


