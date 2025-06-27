const User = require('./model');

const getUsers = (req, res, next) => {
  User.find()
    .then((response) => {
      res.json({
        success: true,
        data: response
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Error fetching users",
        error: err.message
      });
    });
};

const addUser = (req, res, next) => {
  const { id, name } = req.body;
  
  // Validate input
  if (!id || !name) {
    return res.status(400).json({
      success: false,
      message: "ID and name are required"
    });
  }

  const user = new User({
    id: req.body.id,
    name: req.body.name,
  });
  
  user
    .save()
    .then((response) => {
      res.status(201).json({
        success: true,
        message: "User created successfully",
        data: response
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Error creating user",
        error: err.message
      });
    });
};

const updateUser = (req, res, next) => {
  const { id, name } = req.body;
  
  // Validate input
  if (!id || !name) {
    return res.status(400).json({
      success: false,
      message: "ID and name are required"
    });
  }

  User.updateOne({ id: id }, { $set: { name: name } })
    .then((response) => {
      if (response.matchedCount === 0) {
        return res.status(404).json({
          success: false,
          message: "User not found"
        });
      }
      res.json({
        success: true,
        message: "User updated successfully",
        data: response
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Error updating user",
        error: err.message
      });
    });
};

const deleteUser = (req, res, next) => {
  const { id } = req.body;
  
  // Validate input
  if (!id) {
    return res.status(400).json({
      success: false,
      message: "ID is required"
    });
  }

  User.deleteOne({ id: id })
    .then((response) => {
      if (response.deletedCount === 0) {
        return res.status(404).json({
          success: false,
          message: "User not found"
        });
      }
      res.json({
        success: true,
        message: "User deleted successfully",
        data: response
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Error deleting user",
        error: err.message
      });
    });
};

module.exports = {
  getUsers,
  addUser,
  updateUser,
  deleteUser
};