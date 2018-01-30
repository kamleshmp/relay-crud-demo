// 'use strict';
// module.exports = (sequelize, DataTypes) => {
//   var Page = sequelize.define('Page', {
//     title: DataTypes.STRING,
//     slug: DataTypes.STRING,
//     linkText: DataTypes.STRING,
//     userId: DataTypes.INTEGER
//   }, {
//     classMethods: {
//       associate: function(models) {
//         // associations can be defined here
//       }
//     }
//   });
//   return Page;
// };

'use strict';
module.exports = (sequelize, DataTypes) => {
  var Page = sequelize.define('Page', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },

    slug: {
      type: DataTypes.STRING,
      allowNull: false
    }, 
    
    linkText: {
      type: DataTypes.STRING,
      allowNull: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
  },{
  classMethods: {
    associate: function(models) {
        Page.belongsTo(models.User, {
          foreignKey: 'userId'
        });
      }
    },
       // Remove the password column
    instanceMethods: {
      toJSON: function () {
        return this.get();
      }
    }
  });
  return Page;
};