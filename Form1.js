const express = require("express");
const app = express();
const port = 5500;
const bodyParser = require("body-parser");
// const mongoose = require("mongoose");
const multer = require("multer");
const { form1, form2, form3, form5, form4 } = require("./form");
app.use(bodyParser.json());
const upload = multer({ dest: "filestorage/" });
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const mongoose = require("mongoose");

// const url=mongodb+srv://shahbaz898khan:123rdfeShahbaz4@cluster0.uou69iw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

const url =
  "mongodb+srv://shahbaz898khan:123rdfeShahbaz4@cluster0.uou69iw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://shahbaz898khan:123rdfeShahbaz4@cluster0.uou69iw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
      {
        // No need for deprecated options
      }
    );
    console.log("connected");
  } catch (e) {
    console.error(e.message);
  }
};

connectDB();

const superKey = "shahbaz123$51ert";



const schema1 = Joi.object({
  firstName: Joi.string().min(2).max(30).required(),
  lastName: Joi.string().min(2).max(30).required(),
  class: Joi.string()
    .pattern(/^Class \d{4}-\d{4}$/)
    .required()
    .messages({
      "string.pattern.base":
        'Class must be in the format "Class YYYY-YYYY", e.g., "Class 2015-2016"',
      "any.required": "Class is required",
    }),
  dob: Joi.date().less("now").iso().required(), // Student date of birth
  parentFirstName: Joi.string().min(2).max(30).required(),
  parentLastName: Joi.string().min(2).max(30).required(),
  currentAddress: Joi.string().min(5).max(100).required(),
  streetAddress1: Joi.string().min(5).max(100).required(),
  streetAddress2: Joi.string().min(5).max(100).optional(),
  city: Joi.string().min(2).max(50).required(),
  region: Joi.string().min(2).max(50).required(),
  zipcode: Joi.string()
    .pattern(/^[0-9]{5,10}$/)
    .required(),
  country: Joi.string().min(2).max(50).required(),
  phone: Joi.string()
    .pattern(/^[0-9]{10,15}$/)
    .required(),
  email: Joi.string().email().min(6).max(30).required(),
});

function CheckToken(req, res, next) {
  console.log(req, "req");

  console.log("header", req.headers);

  console.log("autherization", req.headers["authorization"]?.split(" ")[1]);

  const token = req.headers["authorization"]?.split(" ")[1];
  if (token) {
    jwt.verify(token, superKey, (err, decoded) => {
      if (err) {
        res.status(400).json({
          message: "not autherized",
        });
      } else {
        next();
      }
    });
  } else {
    res.status(400).json({
      message: "not autherized",
    });
  }
}

app.post("/form1", async (req, res) => {
  try {
    const val = await schema1.validateAsync(req.body);

    const newStudent = new form1(val);
    await newStudent.save();

    res.status(200).send({ message: "Validation successful", data: val });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});


app.put("/form1-update", async (req, res) => {
  const { email ,city} = req.body;
  try {


    
    const filter = { email: email };
      const update = { city: city };
      const options = { new: true, upsert: false };

    // console.log(user);
    // const newStudent = new form1(val);
    // await newStudent.save();

    const updatedUser = await form1.findOneAndUpdate(filter, update, options);

    res.status(200).send({ message: "Validation successful", data: updatedUser });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});



app.delete("/form1-delete", async (req, res) => {
  const { email } = req.body;
  try {


    
    const check = { email: email };
    //   const update = { city: city };
    //   const options = { new: true, upsert: false };

    // // console.log(user);
    // // const newStudent = new form1(val);
    // // await newStudent.save();

    // const updatedUser = await form1.findOneAndUpdate(filter, update, options);

    const deletedUser = await form1.findOneAndDelete(check);

    res.status(200).send({ message: "Validation successful", data: deletedUser });
    
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

app.get("/form1-get", async (req, res) => {

  try {
    const user = await form1.findOne({
      email: req.body.email,
      dob: req.body.dob,
    });

    if (user) {
      const token = jwt.sign({ _id: user._id }, superKey);
      return res.status(200).send({ message: "User found", token });
    } else {
      return res.status(404).send({ message: "User not found" });
    }




    res.status(200).send({ message: "Validation successful", Data: user });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

app.post("/form1-login", CheckToken, (req, res) => {
  console.log("inside form", req.body);

  res.status(200).json({
    message: "I am  form1",
  });
});


