module.exports = (sequelize, Sequelize) => {
  const Likes = sequelize.define("likes", {
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    post_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    islike: {
      type: Sequelize.BOOLEAN
    }
  });

  return Likes;
};