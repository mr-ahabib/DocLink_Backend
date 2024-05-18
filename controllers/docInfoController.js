const DocInfo = require('../models/DocInfo');

const createDoctor = async (req, res) => {
  const { name, degree, specialization, rank, hospital} = req.body;

  try {
    const docInfo = await DocInfo.create({
      userId: req.user.id, // Assuming you have a userId in req.user
      name,
      degree,
      specialization,
      rank,
      hospital,
      
    });

    res.status(201).json(docInfo);
  } catch (error) {
    console.error('Error creating user info:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getDocInfo = async (req, res) => {
  const { userId } = req.user;
        console.log(userId);
  try {
    const docInfo = await DocInfo.findOne({ where: { userId: userId } });

    if (!docInfo) {
      return res.status(404).json({ error: 'User info not found' });
    }

    // Extracting the specific fields you want to retrieve
    const { name, degree, specialization, rank, hospital } = docInfo;

    res.status(200).json({ name, degree, specialization, rank, hospital });
  } catch (error) {
    console.error('Error retrieving user info:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
const getAllDoctors = async (req, res) => {
  try {
    const allDoctors = await DocInfo.findAll();

    res.status(200).json(allDoctors);
  } catch (error) {
    console.error('Error retrieving all doctors:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
    createDoctor,
    getDocInfo,
    getAllDoctors,
};