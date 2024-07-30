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

const schema5 = Joi.object({
  firstName: Joi.string().min(3).max(16).required(),
  lastName: Joi.string().min(3).max(10).required(),
  dob: Joi.date().less("now").iso().required(),
  Address: Joi.string().min(5).max(100).required(),
  streetAddress1: Joi.string().min(5).max(100).required(),
  streetAddress2: Joi.string().min(5).max(100).optional(),
  city: Joi.string().min(2).max(50).required(),
  region: Joi.string().min(2).max(50).required(),
  zipcode: Joi.string()
    .pattern(/^[0-9]{5,10}$/)
    .required(),
  phone: Joi.string()
    .pattern(/^[0-9]{10,15}$/)
    .required(),
  email: Joi.string().email().min(6).max(30).required(),
  EmegencyContact: Joi.string()
    .pattern(/^[0-9]{10,15}$/)
    .required(),
  citizenship: Joi.string().min(2).max(50).required(),
  Disability: Joi.string().required(),
  CompanyName: Joi.string().required(),
  Position: Joi.string().required(),
  ReportTO: Joi.string().required(),
  EmploymentType: Joi.string().required(),
  Mon: Joi.boolean().required().messages({
    "boolean.base": `"acceptTerms" must be a boolean`,
    "any.only": `"acceptTerms" must be checked (true)`,
    "any.required": `"acceptTerms" is required`,
  }),
  Tue: Joi.boolean().required().messages({
    "boolean.base": `"acceptTerms" must be a boolean`,
    "any.only": `"acceptTerms" must be checked (true)`,
    "any.required": `"acceptTerms" is required`,
  }),
  Web: Joi.boolean().required().messages({
    "boolean.base": `"acceptTerms" must be a boolean`,
    "any.only": `"acceptTerms" must be checked (true)`,
    "any.required": `"acceptTerms" is required`,
  }),
  Thu: Joi.boolean().required().messages({
    "boolean.base": `"acceptTerms" must be a boolean`,
    "any.only": `"acceptTerms" must be checked (true)`,
    "any.required": `"acceptTerms" is required`,
  }),
  Fri: Joi.boolean().required().messages({
    "boolean.base": `"acceptTerms" must be a boolean`,
    "any.only": `"acceptTerms" must be checked (true)`,
    "any.required": `"acceptTerms" is required`,
  }),
  Sat: Joi.boolean().required().messages({
    "boolean.base": `"acceptTerms" must be a boolean`,
    "any.only": `"acceptTerms" must be checked (true)`,
    "any.required": `"acceptTerms" is required`,
  }),

  startingDate: Joi.date().greater(Joi.ref("dob")).iso().messages({
    "date.base": `"startingDate" should be a valid date`,
    "date.greater": `"startingDate" must be later than the "dob"`,
    "date.isoDate": `"startingDate" must be a valid ISO 8601 date`,
    "any.required": `"startingDate" is a required field`,
  }),
  contractDate: Joi.date().greater(Joi.ref("startingDate")).iso().messages({
    "date.base": `"contractDate" should be a valid date`,
    "date.greater": `"contractDate" must be later than the "startingDate"`,
    "date.isoDate": `"contractDate" must be a valid ISO 8601 date`,
    "any.required": `"contractDate" is a required field`,
  }),
});

app.post("/form5", async (req, res) => {
  try {
    const { email } = req.body;

    const user = await form5.findOne({ email });

    if (user) {
      return res.status(200).send("all ready exist");
    }

    const val = await schema5.validateAsync(req.body);

    const data = new form5(val);

    await data.save();

    res.status(200).send({ message: "Validation successful", data: val });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

app.get("/form5-get", async (req, res) => {
  try {
    const user = await form5.findOne({
      email: req.body.email,
      phone: req.body.phone,
      EmegencyContact: req.body.EmegencyContact,
    });

    if (user) {
      const token = jwt.sign({ _id: user._id }, superKey);
      return res.status(200).send({ message: "User found", token });
    } else {
      return res.status(404).send({ message: "User not found" });
    }

    res.status(200).send({ message: "List of data", data: data });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

app.put("/form5-findOneAndUpdate",CheckToken, async (req, res) => {
  const { email, lastName } = req.body;

  if (!email || !lastName) {
    return res
      .status(400)
      .send({ message: "Email and lastName are required." });
  }

  try {
    const filter = { email };
    const update = { lastName };
    const options = { new: true }; // This option returns the updated document

    const updatedUser = await form5.findOneAndUpdate(filter, update, options);

    if (!updatedUser) {
      return res.status(404).send({ message: "User not found." });
    }

    res.status(200).send({ message: "Update successful", data: updatedUser });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

app.delete("/form5-findOneAndDelete",CheckToken, async (req, res) => {
  const { email } = req.body;
  try {
    const check = { email };
    //   const update = { city: city };
    //   const options = { new: true, upsert: false };

    // // console.log(user);
    // // const newStudent = new form1(val);
    // // await newStudent.save();

    // const updatedUser = await form1.findOneAndUpdate(filter, update, options);

    const deletedUser = await form5.findOneAndDelete(check);

    res
      .status(200)
      .send({ message: "Validation successful", data: deletedUser });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

app.get("/form5-findall",CheckToken, async (req, res) => {
  try {
    const documents = await form5.find();
    res.status(200).json({
      val: documents,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});



app.get("/form5-assending", CheckToken, async (req, res) => {
  try {
    const documents = await form5.find().sort({ createdAt: 1 });
    res.status(200).json(documents);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


app.get("/form5-deseending", CheckToken, async (req, res) => {
  try {
    const documents = await form5.find().sort({ createdAt: -1});
    res.status(200).json(documents);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


app.get("/form5-findone",CheckToken, async (req, res) => {
  // const {email}=req.body;
  try {
    const document = await form5.findOne({
      email: req.body.email,
    });

    // console.log(document)
    res.status(200).json(document);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.get("/form5/:id",CheckToken, async (req, res) => {
  try {
    const document = await form5.findById(req.params.id);
    res.status(200).json(document);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.put("/form5-update-many",CheckToken, async (req, res) => {
  const { email, CompanyName } = req.body;
  try {
    const filter = { email };
    const update = { CompanyName };
    const updatedDocuments = await form5.updateMany(filter, update);

    const user = await form5.find(filter);

    res.status(200).json({
      CountData: updatedDocuments,
      DataUser: user,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.put("/form5-find-by-id-and-update",CheckToken, async (req, res) => {
  const { _id, CompanyName } = req.body;
  try {
    const filter = { _id };
    const update = { CompanyName };
    const updatedDocuments = await form5.findByIdAndUpdate(filter, {
      $set: update,
    });

    const user = await form5.find(filter);
    res.status(200).json({
      CountData: updatedDocuments,
      DataUser: user,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.put("/form5-update-one",CheckToken, async (req, res) => {
  const { email, Position } = req.body;
  try {
    const filter = { email };

    const update = { Position };

    const updatedDocument = await form5.updateOne(filter, { $set: update });

    const user = await form5.findOne({ email });

    res
      .status(200)
      .json({ updatedCount: updatedDocument.nModified, data: user });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.get("/form5-count-documents",CheckToken, async (req, res) => {
  try {
    const { city } = req.body;

    const count = await form5.countDocuments({ city });

    res.status(200).json({ count });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete("/form5-delete-many",CheckToken, async (req, res) => {
  try {
    const { city } = req.body;

    // if (!) {
    //   return res.status(400).json({ message: "Email is required" });
    // }

    const deletedDocuments = await form5.deleteMany({ city });

    if (deletedDocuments.deletedCount === 0) {
      return res.status(404).json({ message: "No documents found to delete" });
    }

    res.status(200).json(deletedDocuments);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.post("/form5-login", CheckToken, (req, res) => {
  console.log("inside form", req.body);

  res.status(200).json({
    message: "I am  form5",
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
