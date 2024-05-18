const { DataTypes } = require('sequelize');
const db = require('../db');
const User = require('./User');

const UserImage = db.define('UserImage', {
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
    imgurl: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = UserImage;
