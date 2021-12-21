module.exports = (sequelize, Sequelize) => {
  const Comments = sequelize.define("comments", {
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    postId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    comment: {
      type: Sequelize.STRING(300),
      allowNull: false,
    }
  });
  
  return Comments;
};