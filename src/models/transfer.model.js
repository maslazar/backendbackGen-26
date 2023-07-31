const { DataTypes } = require("sequelize");
const { db } = require("../database/config");

const Transfer = db.define("transfers", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  amount: {
    type: DataTypes.FLOAT,
    defaultValue: 1000,
    allowNull: false,
  },
  senderUserAccount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  receiverUserAccount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Transfer;
