const UserRepository = require("../repository/user-repository");

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
}
module.exports = UserService;