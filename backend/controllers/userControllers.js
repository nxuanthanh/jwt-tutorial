const User = require("../models/User");

const userController = {
  getAllUser: async (req, res, next) => {
    try {
      const user = await User.find();
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  deleteUser: async (req, res, next) => {
    try {
      // const userRemove = await User.findByIdAndDelete(User.params.id);
      const user = await User.findById(req.params.id);
      res.status(200).json("Delete successfully");
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = userController;
