const UserRepository = require("../repository/user-repository");
const {JWT_KEY} = require('../config/serverConfig');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


class UserService{

    constructor(){
        this.userRepository = new UserRepository();
    }
    async create(data){
        try {
            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {
            console.log("Something went wrong Service layer.");
            throw(error);
        }
    }
    async destroy (data){
        try {
            const user = await this.userRepository.destroy(data);
            return true;
        } catch (error) {
            console.log("Something went wrong Service layer.");
            throw(error);
        }

    }
    async getUser(userId){
        try {
            const user = await this.userRepository.getById(userId);
            return user;
        } catch (error) {
            console.log("Something went wrong Service layer.");
            throw(error);
        }
    }
    createToken(user){
        try {
            const result = jwt.sign(user,JWT_KEY,{expiresIn:'1h'});
            return result;
        } catch (error) {
            console.log("Something went wrong in token creation.");
            throw(error);
        }
    }

    verifyToken(token){
        try {
            const response = jwt.verify(token,JWT_KEY);
            return response;
        } catch (error) {
            console.log("Something went wrong during verification of the token");
            throw(error);
        }
    }
    checkPassword(userInputPassword,encryptedPassword){
        try {
              return bcrypt.compareSync(userInputPassword,encryptedPassword);
        } catch (error) {
            console.log("Something went wrong in password comparison");
            throw error;
        }
    }

}
module.exports = UserService;