'use strict';
module.exports = function(sequelize, DataTypes) {
  var comment = sequelize.define('Comment', {
    content: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        this.belongsTo(models.post);
      }
    }
  });
  return comment;
};
