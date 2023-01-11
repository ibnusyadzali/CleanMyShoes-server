'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.User)
      Order.belongsTo(models.Service)
    }
  }
  Order.init({
    orderIdNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'OrderIdNumber is required'
        },
        notEmpty: {
          msg: 'OrderIdNumber is required'
        }
      }
    },
    shoesBrand: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'shoesBrand is required'
        },
        notEmpty: {
          msg: 'shoesBrand is required'
        }
      }
    },
    shoesSize: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'shoesSize is required'
        },
        notEmpty: {
          msg: 'shoesSize is required'
        }
      }
    },
    shoesColor: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'shoesColor is required'
        },
        notEmpty: {
          msg: 'shoesColor is required'
        }
      }
    },
    shoesMaterial: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'shoesMaterial is required'
        },
        notEmpty: {
          msg: 'shoesMaterial is required'
        }
      }
    },
    phoneNumberPIC: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'phoneNumberPIC is required'
        },
        notEmpty: {
          msg: 'phoneNumberPIC is required'
        }
      }
    },
    photo: DataTypes.STRING,
    pickUpAddress: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'pickUpAddress is required'
        },
        notEmpty: {
          msg: 'pickUpAddress is required'
        }
      }
    },
    photoAfter: DataTypes.STRING,
    status: DataTypes.STRING,
    estimatedDate: DataTypes.DATE,
    completedDate: DataTypes.DATE,
    UserId: DataTypes.INTEGER,
    ServiceId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
  });
  
  Order.beforeCreate(el=> {
    el.orderIdNumber = `#${UserId}${ServiceId}${Math.floor(Math.random() * 100)}`
  })
  return Order;
};