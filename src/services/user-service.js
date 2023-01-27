const UserRepository = require("../repository/user-repository");
const { JWT_KEY } = require('../config/serverConfig');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const AppErrors = require("../utils/error-handler");


class UserService {

    constructor() {
        this.userRepository = new UserRepository();
    }
    async create(data) {
        try {
            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {
            if(error.name = "SequelizeValidationError"){
                throw error;
            }
            console.log("Something went wrong Service layer.");
            throw error;
        }
    }
    async destroy(data) {
        try {
            const user = await this.userRepository.destroy(data);
            return true;
        } catch (error) {
            console.log("Something went wrong Service layer.");
            throw (error);
        }

    }
    async verifyEmailtoken(token){
        try {
            const user = await this.userRepository.verifyEmailtoken(token);
            return user;
        } catch (error) {
            console.log("Something went wrong Service layer.");
            throw (error);
        }
    }
    async getUser(userId) {
        try {
            const user = await this.userRepository.getById(userId);
            return user;
        } catch (error) {
            console.log("Something went wrong Service layer.");
            throw (error);
        }
    }
    createToken(user) {
        try {
            const result = jwt.sign(user, JWT_KEY, { expiresIn: '1h' });
            return result;
        } catch (error) {
            console.log("Something went wrong in token creation.");
            throw (error);
        }
    }

    verifyToken(token) {
        try {
            const response = jwt.verify(token, JWT_KEY);
            return response;
        } catch (error) {
            console.log("Something went wrong during verification of the token");
            throw (error);
        }
    }

    async signIn(userEmail, plainPassword) {

        try {
            //step 1 -> fetch the user
            const user = await this.userRepository.getByEmail(userEmail);
            // step 2 -> compare the user
            const encryptedPassword = user.password;
            const passwordMatch = this.checkPassword(plainPassword, encryptedPassword);

            if (!passwordMatch) {
                console.log("Password dosen't match");
                throw { error: "Incorrect password" };
            }
            const newJWTtoken = this.createToken({ email: user.email, id: user.id });
            return newJWTtoken

        } catch (error) {
            console.log("Something went wrong in signIn process");
            throw error;
        }
    }

    async isAuthenticated(token) {
        try {
            const isTokenverified = this.verifyToken(token);
            if (!isTokenverified) {
                throw { error: 'Invalid token' };
            }
            const user = await this.userRepository.getById(isTokenverified.id);
            if(!user){
                throw {error : 'No user with the corresponding token exists!'};
            }
            console.log("->",user);
            return user.id;
        } catch (error) {
            console.log("Something went wrong in the auth process");
            throw error;
        }
    }

    checkPassword(userInputPassword, encryptedPassword) {
        try {
            return bcrypt.compareSync(userInputPassword, encryptedPassword);
        } catch (error) {
            console.log("Something went wrong in password comparison");
            throw error;
        }
    }

    async isAdmin (userId){
        try {
            return await this.userRepository.isAdmin(userId);
        } catch (error) {
           
            console.log("Something went wrong in service layer!");
            throw error;
        }
    }
    async grantRole(userId,roleId){
        try {
           console.log(userId,roleId);
           const response = await this.userRepository.grantAccess(userId,roleId);
           return response;
            
        } catch (error) {
            console.log("Something went wrong in service layer!");
            throw error;
        }
    }
    async getUserById(userId){
        try {
            console.log(userId);
            const response = await this.userRepository.getByUserId(userId);
            return response;

        } catch (error) {
            console.log("Something went wrong in service layer!");
            throw error;
        }
    }

}
module.exports = UserService;