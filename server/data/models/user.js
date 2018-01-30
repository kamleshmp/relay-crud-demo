'use strict'
module.exports = (sequelize, DataTypes) => {
  let User =  sequelize.define("User", {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
          len: {
              args: 1,
              msg: "Name must be atleast 1 characters in length"
          }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
          len: {
              args: 1,
              msg: "Name must be atleast 1 characters in length"
          }
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'reader'
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
          len: {
              args: 3,
              msg: "Password must be atleast 3 characters in length"
          }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
          len: {
              args: [6, 128],
              msg: "Email address must be between 6 and 128 characters in length"
          },
          isEmail: {
              msg: "Email address must be valid"
          }
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        User.hasMany(models.Page, {foreignKey: 'userId'}) 
      }
    },
    // Remove the password column
    instanceMethods: {
      toJSON: function () {
        let values = this.get();
        delete values.password
        return values;
      }
    }
  })
  return User
};