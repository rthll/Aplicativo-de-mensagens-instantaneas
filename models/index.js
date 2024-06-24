const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('messaging_app', 'root', '2701', {
  host: 'localhost',
  dialect: 'mysql'
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.User = require('./user')(sequelize, Sequelize);
db.Message = require('./message')(sequelize, Sequelize);

db.User.hasMany(db.Message, { as: 'SentMessages', foreignKey: 'senderId' });
db.User.hasMany(db.Message, { as: 'ReceivedMessages', foreignKey: 'receiverId' });

module.exports = db;
