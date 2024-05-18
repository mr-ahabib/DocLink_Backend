const { DataTypes } = require('sequelize');
const db = require('../db');
const User = require('./User');

const Alarm=db.define('Alarm',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: User,
          key: 'id',
        },
      },
      medicine:{
        type:DataTypes.STRING,
        allowNull: true,
      },
      date:{
        type:DataTypes.STRING,
        allowNull: true,
      },
      time:{
        type:DataTypes.STRING,
        allowNull: true,
      },
      frequency:{
        type:DataTypes.STRING,
        allowNull: true,
      },

});
module.exports=Alarm;