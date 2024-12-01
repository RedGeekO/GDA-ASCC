const User = require('./models/User');
const Document = require('./models/Document');
const Message = require('./models/Message');
const Reminder = require('./models/Reminder');
const Role = require('./models/Role');

// User - Document
User.hasMany(Document);
Document.belongsTo(User, { as: 'createdBy' });

// User - Message
User.hasMany(Message);
Message.belongsTo(User);

// Document - Reminder
Document.hasMany(Reminder);
Reminder.belongsTo(Document);

// User - Role
User.belongsTo(Role);
Role.hasMany(User);

// Document - Reminder
Document.hasMany(Reminder);
Reminder.belongsTo(Document);

module.exports = {
  User,
  Document,
  Message,
  Reminder,
  Role
};