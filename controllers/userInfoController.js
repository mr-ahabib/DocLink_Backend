const UserInfo = require('../models/UserInfo');

const createUser = async (req, res) => {
  const { name, gender, dob, district, phone, email, profession, bloodGroup } = req.body;

  try {
    const userInfo = await UserInfo.create({
      userId: req.user.id, // Assuming you have a userId in req.user
      name,
      gender,
      dob,
      district,
      phone,
      email,
      profession,
      bloodGroup
    });

    res.status(201).json(userInfo);
  } catch (error) {
    console.error('Error creating user info:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getUserInfo = async (req, res) => {
  const { userId } = req.user;
        console.log(userId);
  try {
    const userInfo = await UserInfo.findOne({ where: { userId: userId } });

    if (!userInfo) {
      return res.status(404).json({ error: 'User info not found' });
    }

    // Extracting the specific fields you want to retrieve
    const { name, gender, dob, phone, bloodGroup } = userInfo;

    res.status(200).json({ name, gender, dob, phone, bloodGroup });
  } catch (error) {
    console.error('Error retrieving user info:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createUser,
  getUserInfo,
};