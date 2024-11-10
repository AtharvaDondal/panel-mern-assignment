const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const createError = require("../utils/appError");
const jwt = require("jsonwebtoken");

// Register User
exports.signup = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      return await next(new createError("User already exists!", 400));
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = User.create({
      ...req.body,
      password: hashedPassword,
    });

    //Assign JWT (json web token) to user
    const token = jwt.sign(
      {
        _id: newUser._id,
      },
      "secretkey123",
      {
        expiresIn: "90d",
      }
    );

    res.status(201).json({
      status: "success",
      message: "user registred successfully",
      token,
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    next(error);
  }
};
// Login User
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return next(new createError("User not found", 404));
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return next(new createError("Invalid email or password", 401));
    }
    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secretkey123",
      {
        expiresIn: "90d",
      }
    );

    res.status(200).json({
      status: "success",
      token,
      message: "Logged in successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Update User Info
// exports.updateUser = async (req, res, next) => {
//   try {
//     // Fields allowed to be updated
//     const allowedUpdates = ["name", "email", "password"];
//     const updates = Object.keys(req.body);
//     const isValidOperation = updates.every((update) =>
//       allowedUpdates.includes(update)
//     );

//     if (!isValidOperation) {
//       return next(new createError("Invalid updates!", 400));
//     }

//     const user = await User.findById(req.user._id); // Get user from the database using user ID from token

//     if (!user) {
//       return next(new createError("User not found", 404));
//     }

//     // If updating the password, hash it before saving
//     if (req.body.password) {
//       user.password = await bcrypt.hash(req.body.password, 10);
//     }

//     // Update user data (name, email, etc.)
//     updates.forEach((update) => (user[update] = req.body[update]));
//     await user.save();

//     res.status(200).json({
//       status: "success",
//       message: "User updated successfully",
//       user: {
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//       },
//     });
//   } catch (error) {
//     next(error);
//   }
// };
