const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

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
    res.status(200).send({
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

const sendMail = async (req, res) => {
  const contactEmailOptions = {
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_FROM_EMAIL,
      pass: process.env.SMTP_FROM_PASSWORD,
    },
  };

  const transporter = nodemailer.createTransport(contactEmailOptions);

  transporter.verify((err, success) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Ready to Send Email");
    }
  });

  try {
    const { recipientMail, message, name, link } = req.body;
    const mailOptions = {
      from: process.env.SMTP_FROM_EMAIL,
      to: recipientMail,
      subject: "Sharing the Document made using DocShare",
      text: `
          from: 
          ${name}
          
          email:${recipientMail}
          message: ${message}
          link:${link}
      `,
    };

    await transporter.sendMail(mailOptions, (err, data) => {
      if (err) {
        console.log(err);
        res.status(400).json({ thatmessage: err });
      } else {
        console.log("Email sent successfully");
        res.status(200).json({ message: "Email sent successfully" });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ thismessage: error });
  }
};

module.exports = { register, login, findUser, getUsers, sendMail };
