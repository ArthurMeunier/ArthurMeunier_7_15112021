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
    isLike: {
      type: Sequelize.BOOLEAN
    }
  });

  

  return Likes;
};