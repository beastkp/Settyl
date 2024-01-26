const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const tempUser = { name, email, password: hashedPassword };

    const existingusers = await User.findOne({ email });
    if (existingusers) {
      return res
        .status(200)
        .send({ message: "user Already exits", success: false });
    }
    const user = await User.create({ ...tempUser });
    const token = user.createJwt();
    res.status(201).json({ user, token, success: true });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).send({ message: "Please register", status: false });
    }
    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) {
      res.status(401).send({ message: "You are not authorized" });
    }

    const token = user.createJwt();
    res.status(200).send({ message: "Successfull login", status: true, token });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
};

const findUser = async (req, res) => {
  const userId = req.user.userId;
  try {
    const user = await User.findById({ _id: userId });
    if (!user) {
      res.status(200).send("User not found");
    }
    res
      .status(200)
      .send({
        message: "Successfull",
        success: true,
        data: { name: user.name, email: user.email },
      });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send({ message: "Successfull", status: true, data: users });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
};

module.exports = { register, login, findUser, getUsers };
