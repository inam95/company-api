const bcrypt = require('bcrypt');

const User = require('../model/User');

const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd) {
    return res.status(400).json({
      message: 'Please provide user and password'
    });
  }
  const duplicateUser = await User.findOne({ username: user }).exec();
  if (duplicateUser) {
    return res.status(409).json({
      message: 'User already exists'
    });
  }
  try {
    const hashedPwd = await bcrypt.hash(pwd, 10);
    const result = await User.create({
      username: user,
      password: hashedPwd
    });
    console.log(result);
    res.status(201).json({
      message: `User created successfully: ${user}`
    });
  } catch (error) {
    res.status(500).json({
      message: `Internal server error: ${error.message}`
    });
  }
};

module.exports = { handleNewUser };
