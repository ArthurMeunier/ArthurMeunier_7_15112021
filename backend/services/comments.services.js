const { QueryTypes } = require("sequelize");
const db = require("../models");
const sequelize = db.sequelize;

exports.countComments = async (postId) => {
  const sql = `SELECT COUNT(id) AS  CommentsCount FROM groupomania.comments c WHERE c.postId = ${postId}`;

  const count = await sequelize.query(sql, { type: QueryTypes.SELECT });

  return count[0];
}