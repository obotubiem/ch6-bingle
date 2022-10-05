'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const PROTECTED_ATTRIBUTES = ['password', 'token']

  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Role, {
        foreignKey: { name: 'role_id', allowNull: false }
      })
      this.hasMany(models.Address, {
        foreignKey: { name: 'user_id', allowNull: false }
      })
      this.hasMany(models.Order, {
        foreignKey: { name: 'user_id', allowNull: false }
      })

    }

  }
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    avatar: DataTypes.STRING,
    role_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  })

  return User;
}