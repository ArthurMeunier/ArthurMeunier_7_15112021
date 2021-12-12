module.exports = (sequelize, Sequelize) => {
  const Users = sequelize.define("users", {
    firstname: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    lastname: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING(255),
      allowNull: false,
      unique: true
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    imageURL: {
      type: Sequelize.STRING(255),
    },
    admin: {
      type: Sequelize.BOOLEAN
    }
  });

  return Users;
};