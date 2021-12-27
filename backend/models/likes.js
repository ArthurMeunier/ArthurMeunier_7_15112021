module.exports = (sequelize, Sequelize) => {
  const Likes = sequelize.define("likes", {
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    postId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    islike: {
      type: Sequelize.BOOLEAN
    }
  });

  return Likes;
};