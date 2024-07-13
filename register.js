const express = require("express");
const app = express();
const port = 5500;
const bodyParser = require("body-parser");
// const mongoose = require("mongoose");
const multer = require("multer");
// const {form1,form2,form3,form5,form4}=require("./form")
app.use(bodyParser.json());
const upload = multer({ dest: "filestorage/" });
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const mongoose  = require("mongoose");


const url= "mongodb+srv://shahbaz898khan:123rdfeShahbaz4@cluster0.uou69iw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const connectDB = async () => {
  try {
    await mongoose.connect(url, {});
    console.log("Connected to MongoDB");
  } catch (e) {
    console.error(e.message);
  }
};

connectDB();


app.use(bodyParser.json());
// const upload = multer({ dest: "filestorage/" });

const JWT_SECRET = "your_jwt_secret_key"; // Change this to your own secret key

// Define Mongoose schema and model
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 26,
    match: /^\S+@\S+\.\S+$/,
    unique: true
  },
  password: {
    type: String,
    required: true,
  }
});

const User = mongoose.model("registerUser", userSchema);

// Define Joi schema
const schema1 = Joi.object({
  email: Joi.string().email().min(6).max(26).required(),
  password: Joi.string()
    .min(8)
    .pattern(/[A-Z]/)
    .pattern(/[a-z]/)
    .pattern(/[0-9]/)
    .pattern(/[\W_]/)
    .required()
    .messages({
      "string.min": "Password must be at least 8 characters long",
      "string.max": "Password must be at most 12 characters long",
      "string.pattern.base": "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      "any.required": "Password is required",
    }),
  confirmPassword: Joi.any()
    .equal(Joi.ref('password'))
    .required()
    .messages({
      "any.only": "Confirm password must match password",
      "any.required": "Confirm password is required",
    })
});

// Middleware to verify JWT
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).send({ message: "Access token required" });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).send({ message: "Invalid access token" });
    req.user = user;
    next();
  });
};

// Register route
app.post("/register", async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;

    // Validate data using Joi schema
    await schema1.validateAsync({ email, password, confirmPassword });

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ message: "Email is already in use" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword, confirmPassword });
    await newUser.save();

    res.status(201).send({ message: "User registered successfully" });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

const loginSchema = Joi.object({
  email: Joi.string().email().min(6).max(26).required(),
  password: Joi.string()
    .min(8)
    .pattern(/[A-Z]/)
    .pattern(/[a-z]/)
    .pattern(/[0-9]/)
    .pattern(/[\W_]/)
    .required()
    .messages({
      "string.min": "Password must be at least 8 characters long",
      "string.max": "Password must be at most 12 characters long",
      "string.pattern.base": "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      "any.required": "Password is required",
    })
});

app.post("/login-get", async (req, res) => {
  try {
    const { email, password } = req.body;

    await loginSchema.validateAsync(req.body);

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ message: "Invalid email " });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).send({ message: "Invalid password" });
    }

    const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: '1h' });

    res.status(200).send({
      message: "Login successful",
      token: token
    });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

const updateSchema = Joi.object({
  email: Joi.string().email().min(6).max(26).required(),
  new_email: Joi.string().email().min(6).max(26).required(),
  currentPassword: Joi.string()
    .min(8)
    .pattern(/[A-Z]/)
    .pattern(/[a-z]/)
    .pattern(/[0-9]/)
    .pattern(/[\W_]/)
    .required()
    .messages({
      "string.min": "Password must be at least 8 characters long",
      "string.max": "Password must be at most 12 characters long",
      "string.pattern.base": "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      "any.required": "Password is required",
    }),
  new_password: Joi.string()
    .min(8)
    .pattern(/[A-Z]/)
    .pattern(/[a-z]/)
    .pattern(/[0-9]/)
    .pattern(/[\W_]/)
    .required()
    .messages({
      "string.min": "Password must be at least 8 characters long",
      "string.max": "Password must be at most 12 characters long",
      "string.pattern.base": "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      "any.required": "Password is required",
    })
});

app.put("/update-get", authenticateToken, async (req, res) => {
  try {
    const { email, new_email, currentPassword, new_password } = req.body;

    await updateSchema.validateAsync(req.body);

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ message: "User not found" });
    }

    const validPassword = await bcrypt.compare(currentPassword, user.password);
    if (!validPassword) {
      return res.status(400).send({ message: "Current password is incorrect" });
    }

    if (email) {
      user.email = new_email;
    }

    if (new_password) {
      const hashedNewPassword = await bcrypt.hash(new_password, 10);
      user.password = hashedNewPassword;
    }

    await user.save();

    res.status(200).send({ message: "User updated successfully" });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

app.delete("/delete-get", authenticateToken, async (req, res) => {
  try {
    const { email, password } = req.body;

    await loginSchema.validateAsync(req.body);

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ message: "User not found" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).send({ message: "Password is incorrect" });
    }

    await User.deleteOne({ email });

    res.status(200).send({ message: "User deleted successfully" });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});



// Start the server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
