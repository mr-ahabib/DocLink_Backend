const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const defaultSecret = 'default-secret';

class UserController {
  static async insertUser(req, res) {
    try {
      const { identity,firstname, lastname,contact, email, password } = req.body;

      if (!identity||!firstname || !lastname ||!contact|| !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
      }


      const hashedPassword = await bcrypt.hash(password, 10);


      const user = await User.create({ identity,firstname, lastname,contact, email, password: hashedPassword });

      console.log('Data inserted successfully');
      res.status(201).json({ success: true, message: 'Data inserted successfully', user });
    } catch (err) {
      console.error('Error inserting data:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }


  static async loginUser(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email: email } });
      if (!user) {
        return res.status(400).json({ error: 'Both email and password are required' });
      }
      const passwordmatch=await bcrypt.compare(password,user.password)
      
  if(!passwordmatch){
    return res.status(401).json({error:'invalid password'})
  }
     
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || defaultSecret, { expiresIn: '15m' });
  
      res.status(200).json({ success: true, message: 'Login successful', token });
    } catch (err) {
      console.error('Error logging in:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  

}

module.exports = UserController;
