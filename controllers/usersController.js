const User = require('../model/User');

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    if (!users)
      return res.status(204).json({
        message: 'No users found'
      });
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};

const deleteUser = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({
      message: 'ID parameter is required'
    });
  }
  try {
    const user = await User.findById(req.body.id);
    if (!user) {
      return res.status(204).json({
        message: 'No user matches the ID'
      });
    }
    const result = await user.remove();
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};

const getUser = async (req, res) => {
  if (!req?.params?.id) {
    return res.status(400).json({
      message: 'ID parameter is required'
    });
  }
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(204).json({
        message: 'No user matches the ID'
      });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};

module.exports = {
  getAllUsers,
  deleteUser,
  getUser
};
