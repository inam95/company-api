const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/User');

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd) {
    return res.status(400).json({
      message: 'Please provide user and password'
    });
  }

  const userFound = await User.findOne({ username: user }).exec();
  if (!userFound) {
    return res.status(401).json({
      message: 'Unauthorized'
    });
  }

  try {
    const match = await bcrypt.compare(pwd, userFound.password);
    if (!match) {
      return res.status(401).json({
        message: 'Unauthorized'
      });
    }

    const roles = Object.values(userFound.roles).filter(Boolean);

    const accessToken = jwt.sign(
      {
        userInfo: {
          username: userFound.username,
          roles
        }
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '180s' }
    );

    const refreshToken = jwt.sign(
      {
        username: userFound.username
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '1d' }
    );

    userFound.refreshToken = refreshToken;
    const result = await userFound.save();
    console.log(result);

    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
      sameSite: 'None',
      secure: true
    });
    res.status(200).json({ accessToken, roles });
  } catch (error) {
    res.status(500).json({
      message: `Internal server error: ${error.message}`
    });
  }
};

module.exports = { handleLogin };
