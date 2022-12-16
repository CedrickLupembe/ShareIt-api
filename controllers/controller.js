const User = require("../Model/user");
const jwt = require("jsonwebtoken");
const { registerValidation, LoginValidation } = require("../validation");
const bcrypt = require("bcrypt");

// Register a user
const Register = async (req, res) => {
  // Validate the user data before we create one
  const { error } = registerValidation(req.body);

  //   Check if I get an error
  if (error) return res.status(400).send(error.details[0].message);

  //   Check if the user already exist in the database
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email already exist");

  //   Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //   Create a new user
  let newUser = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    const newOne = await newUser.save();
    res.json(newOne);
  } catch (error) {
    console.log(error.message);
  }
};

// Login a user
const Login = async (req, res) => {
  // Validate the user data before we create one
  const { error } = LoginValidation(req.body);

  //   Check if I get an error
  if (error) return res.status(400).send(error.details[0].message);

  //   Check if the email already exist in the database
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email doesn't exist");

  // Check if password is correct
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid password");

  // Create and assign a token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).send(token);
};

module.exports = {
  Register,
  Login,
};
