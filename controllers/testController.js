const Tests = require('../models/Tests');
const CreateTests= async (req, res) => {

const{pid,test1,test2,test3,test4,test5}=req.body;

try {
    const test=await Tests.create({
        userId: req.user.id,
        pid,test1,test2,test3,test4,test5
    });
    res.status(201).json(test);
} catch (error) {
  console.error('Error creating user info:', error);
  res.status(500).json({ error: 'Internal server error' });
}
};
const findTestsByPid = async (req, res) => {
    const { userId } = req.user;
    console.log(userId)
    

    try {
        const usertest = await Tests.findAll({
            where: { pid: userId }
        });
        if (!usertest || usertest.length === 0) {
            return res.status(404).json({ error: 'Prescriptions not found for the given pid' });
        }

        res.json(usertest);
    } catch (error) {
        console.error('Error finding prescriptions:', error);
        res.status(500).json({ error: error });
    }
};
const findtest = async (req, res) => {
    const { pid } = req.query;
    console.log(pid);

    try {
        // Find prescriptions by pid
        const usertest = await Tests.findAll({
            where: { pid: pid }
        });
        if (!usertest || usertest.length === 0) {
            return res.status(404).json({ error: 'Prescriptions not found for the given pid' });
        }

        res.json(usertest);
    } catch (error) {
        console.error('Error finding prescriptions:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports={
    CreateTests,
    findTestsByPid,
    findtest
}
