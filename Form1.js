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
  const {email}=req.body;
  try {
    const val = await schema1.validateAsync(req.body);


    const user= await form1.findOne({email});


    if(user){
      return res.status(200).send("All ready exist")
    }

    const newStudent = new form1(val);
    await newStudent.save();

    res.status(200).send({ message: "Validation successful", data: val });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

app.put("/form1-update", async (req, res) => {
  const { email, city } = req.body;
  try {
    const filter = { email: email };
    const update = { city: city };
    const options = { new: true, upsert: false };

    // console.log(user);
    // const newStudent = new form1(val);
    // await newStudent.save();

    const updatedUser = await form1.findOneAndUpdate(filter, update, options);

    res
      .status(200)
      .send({ message: "Validation successful", data: updatedUser });
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

    res
      .status(200)
      .send({ message: "Validation successful", data: deletedUser });
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

app.get("/form1-findall", async (req, res) => {
  try {
    const documents = await form1.find();
    res.status(200).json(documents);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.get("/form1-findone", async (req, res) => {
  // const {email}=req.body;
  try {
    const document = await form1.findOne({
      email: req.body.email,
    });

    // console.log(document)
    res.status(200).json(document);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});



app.get("/form1/:id", async (req, res) => {
  try {
    const document = await form1.findById(req.params.id);
    res.status(200).json(document);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


// Update many documents
app.put("/form1-update-many", async (req, res) => {
  try {
    const {city,country}=req.body;

    if (!city || !country) {
      return res.status(400).json({ message: "City and country are required" });
    }


    const filter={city};


    const update={$set:{country}};


    const updatedDocuments = await form1.updateMany(filter, update);


    const user = await form1.find({ city });


    res.status(200).json({
      CountData: updatedDocuments.modifiedCount,  // Use modifiedCount to get the count of updated documents
      DataUser: user,
    });


  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});




app.put("/form1-find-by-id-and-update", async (req, res) => {
  try {
    const { _id, country } = req.body;
    if (!_id) 
      return res.status(400).json({ message: "ID is required" });

    const updatedDocument = await form1.findByIdAndUpdate(
      _id,
      { $set: { country } },
      { new: true }  
    );

    if (!updatedDocument) {
      return res.status(404).json({ message: "Document not found" });
    }

    res.status(200).json(updatedDocument);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});




app.put('/form1-update-one', async (req, res) => {
  const {country, city}=req.body;
  try {
   
    const filter={country};
    const update={city};

    // const user=await form1.findOne({
    //   country:req.body.country, city:req.body.city
    // })

    const updatedDocument = await form1.updateOne(filter,update);

    
    res.status(200).json(updatedDocument);
    
  } catch (err){
    res.status(400).json({ message: err.message });
  }
});


app.delete('/form1-delete-many', async (req, res) => {

  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const deletedDocuments = await form1.deleteMany({ email });

    if (deletedDocuments.deletedCount === 0) {
      return res.status(404).json({ message: "No documents found to delete" });
    }

    res.status(200).json(deletedDocuments);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


app.get('/form1-count-documents', async (req, res) => {
  try {

    const {country}=req.body

    const count = await form1.countDocuments({country});
    res.status(200).json({ count });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.put('/form1-find-by-id-and-update/:id', async (req, res) => {
  try {
    const updatedDocument = await form1.findByIdAndUpdate(req.params.id, req.body.update, { new: true });
    res.status(200).json(updatedDocument);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


app.post("/form1-login", CheckToken, (req, res) => {
  console.log("inside form", req.body);

  res.status(200).json({
    message: "I am  form1",
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
