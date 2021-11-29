module.exports = (sequelize, Sequelize) => {
  const Comments = sequelize.define("comments", {
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    post_id: {
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