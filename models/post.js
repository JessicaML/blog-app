module.exports = function(sequelize, DataTypes) {
  var post = sequelize.define('post', {
    title: DataTypes.STRING,
    imageURL: DataTypes.STRING,
    author: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        this.hasMany(models.comment);
      }
    }
  });
  return post;
};
