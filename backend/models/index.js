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

db.users.hasMany(db.posts, {
  foreignKey: "user_id"
})
db.posts.belongsTo(db.users, {
  foreignKey: "user_id",
  onDelete: "CASCADE"
})

db.posts.hasMany(db.comments, {
  foreignKey: "post_id"
})
db.comments.belongsTo(db.posts, {
  foreignKey: "post_id",
  onDelete: "CASCADE"
})

db.users.hasMany(db.comments, {
  foreignKey: "user_id"
})
db.comments.belongsTo(db.users, {
  foreignKey: "user_id",
  onDelete: "CASCADE"
})

// db.users.hasMany(db.posts)
// db.posts.belongsTo(db.users, { through: 'user_id' })

// db.posts.hasMany(db.comments)
// db.comments.belongsTo(db.posts, { through: 'post_id' })

// db.users.hasMany(db.comments)
// db.comments.belongsTo(db.users, { through: 'user_id' })

module.exports = db;