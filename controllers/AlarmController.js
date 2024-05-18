const Alarm = require('../models/Alarm');
const { Op } = require('sequelize');

const createAlarm=async (req, res) => {

    const{medicine,date,time,frequency}=req.body;
    try {
        const timer=await Alarm.create({
            userId: req.user.id,
            medicine,date,time,frequency
        });
        res.status(201).json(timer);
    } catch (error) {
      console.error('Error creating user info:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };



  const findAlarm = async (req, res) => {
    const { userId } = req.user;
        console.log(userId);

    try {
           const alarms = await Alarm.findAll({
            where: { userId: userId }
        });
        if (!alarms || alarms.length === 0) {
            return res.status(404).json({ error: 'Alarm not found.' });
        }

        res.json(alarms);
    } catch (error) {
        console.error('Error finding prescriptions:', error);
        res.status(500).json({ error: error });
    }
};

const deleteAlarmById = async (req, res) => {
    const { id } = req.query;

    try {
        // Find the alarm by its ID and delete it
        const deletedRows = await Alarm.destroy({
            where: { id: id }
        });

        // Check if any row was deleted
        if (deletedRows === 0) {
            return res.status(404).json({ error: 'Alarm not found.' });
        }

        // If deletion was successful
        res.json({ message: 'Alarm deleted successfully' });
    } catch (error) {
        console.error('Error deleting alarm:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const notification = async (req, res) => {
    const { userId } = req.user;
    const currentDate = new Date().toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' });
    try {
        const alarms = await Alarm.findAll({
            where: {
                userId: userId,
                [Op.or]: [
                    { 
                        date: currentDate,
                        frequency: 'Once'
                    },
                    { 
                        frequency: 'Everyday'
                    }
                ]
            },
            attributes: ['time', 'medicine']
        });
        if (!alarms || alarms.length === 0) {
            return res.status(404).json({ error: 'Alarm not found.' });
        }

        res.json(alarms);
    } catch (error) {
        console.error('Error finding alarms:', error);
        res.status(500).json({ error: error });
    }
}




  module.exports={createAlarm, findAlarm,deleteAlarmById,notification}

