const Prescription = require('../models/Prescription');
const CreatePrescription= async (req, res) => {


    const {pid,medicine1,medicine2,medicine3,medicine4,medicine5,day1,day2,day3,day4,day5,time1,time2,time3,time4,time5}=req.body;

    try {
        const prescrip=await Prescription.create({
            userId: req.user.id,
            pid,medicine1,medicine2,medicine3,medicine4,medicine5,day1,day2,day3,day4,day5,time1,time2,time3,time4,time5
        });
        res.status(201).json(prescrip);
    } catch (error) {
      console.error('Error creating user info:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  const findPrescriptionsByPid = async (req, res) => {
    const { userId } = req.user;
        console.log(userId);

    try {
        // Find prescriptions by pid
        const prescriptions = await Prescription.findAll({
            where: { pid: userId }
        });
        if (!prescriptions || prescriptions.length === 0) {
            return res.status(404).json({ error: 'Prescriptions not found for the given pid' });
        }

        res.json(prescriptions);
    } catch (error) {
        console.error('Error finding prescriptions:', error);
        res.status(500).json({ error: error });
    }
};


const findpatient = async (req, res) => {
    const { pid } = req.query;
    console.log(pid);

    try {
        // Find prescriptions by pid
        const prescriptions = await Prescription.findAll({
            where: { pid: pid }
        });
        if (!prescriptions || prescriptions.length === 0) {
            return res.status(404).json({ error: 'Prescriptions not found for the given pid' });
        }

        res.json(prescriptions);
    } catch (error) {
        console.error('Error finding prescriptions:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    CreatePrescription,
    findPrescriptionsByPid,
    findpatient
    
};