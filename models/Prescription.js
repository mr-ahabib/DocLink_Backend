const { DataTypes } = require('sequelize');
const db = require('../db');
const User = require('./User');

const Prescription = db.define('Prescription', {
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
    pid: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    medicine1: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    medicine2: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    medicine3: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    medicine4: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    medicine5: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    day1:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    day2:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    day3:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    day4:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    day5:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    time1:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    time2:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    time3:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    time4:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    time5:{
        type: DataTypes.STRING,
        allowNull: true,
    },
});

module.exports = Prescription;