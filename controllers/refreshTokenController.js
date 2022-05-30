const jwt = require('jsonwebtoken');

const User = require('../model/User');

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  console.log('cookies: ', JSON.stringify(cookies));
  if (!cookies?.jwt) {
    return res.status(401).send();
  }
  const refreshToken = cookies.jwt;
  const userFound = await User.findOne({ refreshToken }).exec();
  if (!userFound) return res.sendStatus(403);

  try {
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err || userFound.username !== decoded.username) {
        return res.status(403).send();
      }

      const roles = Object.values(userFound.roles);

      const accessToken = jwt.sign(
        {
          userInfo: {
            username: userFound.username,
            roles
          }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '30s' }
      );

      res.json({ accessToken });
    });
  } catch (error) {
    res.status(500).json({
      message: `Internal server error: ${error.message}`
    });
  }
};

module.exports = { handleRefreshToken };
