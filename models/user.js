'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcrypt')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Order)
    }
  }
  User.init({
    username: {
      typr: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Username is required'
        },
        notEmpty: {
          msg: 'Username is required'
        }
      }
    },
    email: {
      typr: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'Email already existed'
      },
      validate: {
        notNull: {
          msg: 'Email is required'
        },
        notEmpty: {
          msg: 'Email is required'
        },
        isEmail: {
          msg: 'Invalid Email format'
        }
      }
    },
    password: {
      typr: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Password is required'
        },
        notEmpty: {
          msg: 'Password is required'
        },
        len: {
          args: [6, Infinity],
          msg: "Minimum 6 characters required in password"
        }
      }
    },
    role: {
      typr: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Role is required'
        },
        notEmpty: {
          msg: 'Role is required'
        }
      }
    },
    phoneNumber: {
      typr: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Phone Number is required'
        },
        notEmpty: {
          msg: 'Phone Number is required'
        }
      }
    },
    address: {
      typr: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Address is required'
        },
        notEmpty: {
          msg: 'Address is required'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate(el => {
    el.password = bcrypt.hashSync(el.password,10)
    if (el.username.slice(0,6) === 'admin.') {
      el.role = 'admin'
    }
  })
  return User;
};