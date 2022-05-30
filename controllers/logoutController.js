const User = require('../model/User');

const handleLogout = async (req, res) => {
  // On client delete the access token from the cookies
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    return res.status(204).send();
  }
  const refreshToken = cookies.jwt;
  const userFound = await User.findOne({ refreshToken }).exec();
  if (!userFound) {
    res.clearCookie('jwt', {
      httpOnly: true,
      sameSite: 'None',
      secure: true
    });
    return res.sendStatus(204);
  }

  try {
    userFound.refreshToken = '';
    const result = await userFound.save();
    console.log(result);
    res
      .clearCookie('jwt', {
        httpOnly: true,
        sameSite: 'None',
        secure: true
      })
      .status(204)
      .send();
  } catch (error) {
    res.status(500).json({
      message: `Internal server error: ${error.message}`
    });
  }
};

module.exports = { handleLogout };
