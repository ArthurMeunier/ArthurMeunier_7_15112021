module.exports = (sequelize, Sequelize) => {
  const Posts = sequelize.define("posts", {
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    title: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING(300),
      allowNull: false
    },
    imageURL: {
      type: Sequelize.STRING(255),
      allowNull: true,  
    }
  });

  return Posts;
};