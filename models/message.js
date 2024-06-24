module.exports = (sequelize, DataTypes) => {
    const Message = sequelize.define('Message', {
      content: {
        type: DataTypes.STRING,
        allowNull: false
      },
      senderId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      receiverId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    });
    return Message;
  };
  