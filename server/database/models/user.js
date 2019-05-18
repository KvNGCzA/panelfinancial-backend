/* eslint-disable */
import bcrypt from 'bcrypt';

export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      type: DataTypes.UUID
    },
    firstName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
      defaultValue: `${bcrypt.hashSync(process.env.DEFAULT_PASS, 10)}`
    },
    passUpdated: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    active: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
  }, {});
  User.associate = (models) => {
    const { UserRole } = models;

    User.hasMany(UserRole, {
      foreignKey: 'userId',
      as: 'role'
    });

  };
  return User;
};
