'use strict';
module.exports = function(sequelize, DataTypes) {
  var Comment = sequelize.define('Comment', {
    content: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        this.belongsTo(models.Post);
      }
    }
  });
  return Comment;
};
