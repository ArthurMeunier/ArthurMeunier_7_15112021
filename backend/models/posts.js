module.exports = (sequelize, Sequelize) => {
  const Posts = sequelize.define("posts", {
    userId: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    title: {
      type: Sequelize.STRING(75),
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING(500),
      allowNull: false
    },
    imageURL: {
      type: Sequelize.STRING(255),
      allowNull: true,  
    },
    like: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0 
    }  });

  return Posts;
};