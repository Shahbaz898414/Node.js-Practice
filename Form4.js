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


const schema4 = Joi.object({
  firstName: Joi.string().min(1).max(30).required(),
  lastName: Joi.string().min(1).max(30).required(),
  department: Joi.string().min(1).max(50).required(),
  phone: Joi.string()
    .pattern(/^[0-9]{10,15}$/)
    .required(),
  driversLicenseNo: Joi.string()
    .pattern(/^[A-Z][0-9]*$/)
    .min(1)
    .max(10)
    .required()
    .messages({
      "string.min": "driversLicenseNo must be at least 1 character long",
      "string.max": "driversLicenseNo must be at most 10 characters long",
      "string.pattern.base":
        "driversLicenseNo must start with an uppercase letter followed by numbers",
    }),
  fromDate: Joi.date().iso().required(),
  toDate: Joi.date().iso().required(),
  policy: Joi.boolean().required(),
  companySignature: Joi.string().min(1).max(100).optional(),
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


app.post("/form4", async (req, res) => {
  try {
    const {phone}=req.body;
    const val = await schema4.validateAsync(req.body);
    const ph= await form4.findOne({phone})
    if(ph) {
      return res.status(200).send("All ready exist")
    }
    const data = new form4(val);
    await data.save();
    res.status(200).send({ message: "Validation successful", data: data });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});




app.get("/form4-get", async (req, res) => {
  try {
    const user = await form4.findOne({
      department: req.body.department,
      driversLicenseNo: req.body.driversLicenseNo,
      phone: req.body.phone,
    });

    if (user) {
      const token = jwt.sign({ _id: user._id }, superKey);
      return res.status(200).send({ message: "User found", token });
    } else {
      return res.status(404).send({ message: "User not found" });
    }

    // const val = await form4.find();

    res.status(200).send({ message: "List of all the data", data: val });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});




app.put("/form4-findOneAndUpdate",CheckToken, async (req, res) => {
  const { phone, lastName } = req.body;
  try {
   const filter = {  phone };
      const update = { lastName };


    // console.log(user);
    // const newStudent = new form1(val);
    // await newStudent.save();

    const updatedUser = await form4.findOneAndUpdate(filter, update);

    res.status(200).send({ message: "Validation successful", data: updatedUser });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});


app.delete("/form4-findOneAndDelete",CheckToken, async (req, res) => {
  const { phone } = req.body;
  try {
    const check = {  phone };
    //   const update = { city: city };
    //   const options = { new: true, upsert: false };

    // // console.log(user);
    // // const newStudent = new form1(val);
    // // await newStudent.save();

    // const updatedUser = await form1.findOneAndUpdate(filter, update, options);

    const deletedUser = await form4.findOneAndDelete(check);

    res.status(200).send({ message: "Validation successful", data: deletedUser });

  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});


app.get("/form4-findall",CheckToken, async (req, res) => {
  try {
    const documents = await form4.find();
    res.status(200).json({
      val:documents});
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});



app.get("/form4-assending", CheckToken, async (req, res) => {
  try {
    const documents = await form4.find().sort({ createdAt: 1 });
    res.status(200).json(documents);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


app.get("/form4-deseending", CheckToken, async (req, res) => {
  try {
    const documents = await form4.find().sort({ createdAt: -1});
    res.status(200).json(documents);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


app.get("/form4-findone",CheckToken, async (req, res) => {
  // const {email}=req.body;
  try {
    const document = await form4.findOne({
      phone: req.body.phone,
    });

    // console.log(document)
    res.status(200).json(document);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


app.get("/form4/:id",CheckToken, async (req, res) => {
  try {
    const document = await form4.findById(req.params.id);
    res.status(200).json(document);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


app.put("/form4-update-many",CheckToken, async (req, res) => {

  const {phone,department}=req.body
  try {

    const filter = { phone };
      const update = { department };
    const updatedDocuments = await form4.updateMany(filter,update);

    const user = await form4.find(filter);
    res.status(200).json({
      CountData: updatedDocuments,
      DataUser: user,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


app.put("/form4-find-by-id-and-update",CheckToken, async (req, res) => {
  const {_id,department}=req.body
  try {

    const filter = { _id };
    const update = { department };
    const updatedDocuments = await form4.findByIdAndUpdate(filter,update);

    const user = await form4.find(filter);
    res.status(200).json({
      CountData: updatedDocuments,
      DataUser: user,
    });

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


app.put('/form4-update-one',CheckToken, async (req, res) => {
  const { phone, department } = req.body;
  try {
    const filter={phone};

    
    const update={department};


    const updatedDocument = await form4.updateOne(filter,{ $set: update });


    const user = await form4.findOne({ phone});


    res.status(200).json({ updatedCount: updatedDocument.nModified, data: user });


  } catch (err) {
    res.status(400).json({ message: err.message });
  }

});


app.get('/form4-count-documents',CheckToken, async (req, res) => {
  try {

    const {phone}=req.body

    const count = await form4.countDocuments({phone});
    res.status(200).json({ count });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


app.delete('/form4-delete-many',CheckToken, async (req, res) => {

  try {
    const { phone } = req.body;

    // if (!) {
    //   return res.status(400).json({ message: "Email is required" });
    // }

    const deletedDocuments = await form4.deleteMany({ phone });

    if (deletedDocuments.deletedCount === 0) {
      return res.status(404).json({ message: "No documents found to delete" });
    }

    res.status(200).json(deletedDocuments);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});



app.post("/form4-login", CheckToken, (req, res) => {
  console.log("inside form", req.body);

  res.status(200).json({
    message: "I am  form4",
  });
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});