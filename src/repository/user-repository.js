const ValidationError = require('../utils/validation-error');
const { User, Role } = require('../models/index.js');
const { verifyEmail } = require('../utils/sendEmail');
const { where } = require("sequelize");


class UserRepository {

  async create(data) {
    try {
      console.log(data);
      const user = await User.create(data);
      verifyEmail(user.Name, user.email, user.emailtoken);
      return user;
    } catch (error) {
      if (error.name == "SequelizeValidationError") {
        throw new ValidationError(error);
      }
      console.log("Something went wrong at repository layer");
      throw (error);
    }
  }
  async verifyEmailtoken(token) {
    try {

      const user = await User.findOne({ emailtoken: token });
      if (!user) {
        console.log('User dosent exist');
        throw error;
      }
      var data = {
        emailtoken: null,
        verified: 1
      }
      await User.update(data, {
        where: {
          emailtoken: token
        }
      });
      return 'Verification Successfull!';

    } catch (error) {
      console.log("Something went wrong in the verification of mail");
      throw error;
    }
  }
  async destroy(userId) {
    try {
      await User.destroy({
        where: {
          id: userId
        }
      });
      return true;

    } catch (error) {
      console.log("Something went wrong at repository layer");
      throw (error);
    }
  }
  async getByUserId(userId) {
    try {
      const user = await User.findAll({ where: { id: userId }, attributes: ['email', "Name", "Verified"] });
      return user;
    } catch (e) {
      console.log("Something went wrong in fetching the user");
      throw e;
    }
  }
  async getByEmail(userEmail) {
    try {
      const user = await User.findOne({
        where: {
          email: userEmail
        }
      });
      return user;
    } catch (error) {
      console.log("Something went wrong in fetching the user");
      throw error;
    }
  }

  async getById(userId) {
    console.log("here", userId)
    try {
      const user = await User.findAll({
        where: { id: userId },
        attributes: ['email', 'id', 'Name', 'Verified']
      });
      // delete user.password;
      return user;
    } catch (error) {
      console.log("Something went wrong at repository layer");
      throw (error);
    }
  }

  async isAdmin(userId) {
    try {
      const user = await User.findByPk(userId);
      const adminRole = await Role.findOne({
        where: {
          name: 'ADMIN'
        }
      });
      return user.hasRole(adminRole);
    } catch (error) {
      console.log("Something went wrong");
      throw error;
    }
  }

  async grantAccess(userId, roleId) {
    try {
      const user = await User.findByPk(userId);
      const role = await Role.findByPk(roleId);
      user.addRole(role);
      return true;

    } catch (error) {
      console.log("Something went wrong in the repository layer!");
      throw error
    }
  }


}

module.exports = UserRepository;