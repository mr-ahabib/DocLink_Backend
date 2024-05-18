const { DataTypes } = require('sequelize');
const db = require('../db');
const User = require('./User');

const Tests=db.define('Test',{
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
      pid:{
           type:DataTypes.STRING,
           allowNull:false,
      },
      test1:{
        type:DataTypes.STRING,
        allowNull: true,
      },
      test2:{
        type:DataTypes.STRING,
        allowNull: true,
      },
      test3:{
        type:DataTypes.STRING,
        allowNull: true,
      },
      test4:{
        type:DataTypes.STRING,
        allowNull: true,
      },
      test5:{
        type:DataTypes.STRING,
        allowNull: true,
      },
});
module.exports=Tests;