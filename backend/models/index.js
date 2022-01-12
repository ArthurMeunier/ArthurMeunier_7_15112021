const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./users.js")(sequelize, Sequelize);
db.posts = require("./posts.js")(sequelize, Sequelize);
db.comments = require("./comments.js")(sequelize, Sequelize);
db.likes = require("./likes.js")(sequelize, Sequelize);




db.users.hasMany(db.posts, {
  foreignKey: "userId"
})
db.posts.belongsTo(db.users, {
  foreignKey: "userId",
  onDelete: "CASCADE"
})

db.posts.hasMany(db.comments, {
  foreignKey: "postId"
})
db.comments.belongsTo(db.posts, {
  foreignKey: "postId",
  onDelete: "CASCADE"
})

db.users.hasMany(db.comments, {
  foreignKey: "userId"
})
db.comments.belongsTo(db.users, {
  foreignKey: "userId",
  onDelete: "CASCADE"
})

db.users.hasMany(db.likes, {
  foreignKey: "userId"
})
db.likes.belongsTo(db.users, {
  foreignKey: "userId",
  onDelete: "CASCADE"
})

db.posts.hasMany(db.likes, {
  foreignKey: "postId"
})
db.likes.belongsTo(db.posts, {
  foreignKey: "postId",
  onDelete: "CASCADE"
})




module.exports = db;