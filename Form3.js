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





const schema3 = Joi.object({
  Account: Joi.string()
    .regex(/^(?=.*[A-Z])(?=.*[0-9])[A-Z0-9]+$/)
    .required()
    .messages({
      "string.pattern.base": `"Account" must contain at least one uppercase letter and one number`,
    }),
  Title_of_acccount: Joi.string()
    .min(5)
    .max(100)
    .regex(/^[A-Z]+$/)
    .required()
    .messages({
      "string.pattern.base": `"Title_of_acccount" should contain only uppercase letters`,
    }),
  Address: Joi.string()
    .min(5)
    .max(100)
    .regex(/^[A-Z0-9 ]+$/)
    .required()
    .messages({
      "string.pattern.base": `"Address" should contain only uppercase letters, numbers, and spaces`,
    }),
  Register_Office_Address: Joi.string()
    .min(5)
    .max(100)
    .regex(/^[A-Z0-9 ]+$/)
    .required()
    .messages({
      "string.pattern.base": `"Register_Office_Address" should contain only uppercase letters, numbers, and spaces`,
    }),
  Industry: Joi.string()
    .min(2)
    .max(100)
    .regex(/^[A-Z]+$/)
    .required()
    .messages({
      "string.pattern.base": `"Industry" should contain only uppercase letters`,
    }),
  Contact_person: Joi.string()
    .max(15)
    .pattern(/^[0-9]{10,15}$/)
    .required()
    .messages({
      "string.pattern.base": `"Contact_person" must be a valid phone number with 10 to 15 digits`,
    }),
  Designation: Joi.string()
    .regex(/^[A-Z]+$/)
    .optional()
    .messages({
      "string.pattern.base": `"Designation" should contain only uppercase letters`,
    }),
  phone: Joi.string()
    .pattern(/^[0-9]{10,15}$/)
    .required()
    .messages({
      "string.pattern.base": `"phone" must be a valid phone number with 10 to 15 digits`,
    }),
  NTN: Joi.string()
    .regex(/^[A-Z0-9]+$/)
    .required()
    .messages({
      "string.pattern.base": `"NTN" must contain only uppercase letters and numbers`,
    }),
  GST: Joi.string()
    .regex(/^[A-Z0-9]+$/)
    .required()
    .messages({
      "string.pattern.base": `"GST" must contain only uppercase letters and numbers`,
    }),
  Telephone: Joi.string()
    .pattern(/^[0-9]{10,15}$/)
    .required()
    .messages({
      "string.pattern.base": `"Telephone" must be a valid phone number with 10 to 15 digits`,
    }),
  Fax: Joi.string()
    .regex(/^\+?\d{1,4}[-\s]?\(?\d{1,5}\)?[-\s]?\d{1,15}$/)
    .required()
    .messages({
      "string.pattern.base": `"Fax" must be a valid fax number in the format +<country code>-<area code>-<number>`,
    }),
  UAN: Joi.string().length(12).pattern(/^\d+$/).required().messages({
    "string.length": `"UAN" must be exactly 12 digits`,
    "string.pattern.base": `"UAN" must contain only numeric characters`,
  }),
  email: Joi.string()
    .email()
    .min(6)
    .max(26)
    .regex(/^[A-Z0-9]/)
    .messages({
      "string.pattern.base": `"email" must start with an alphanumeric character`,
    }),
  website: Joi.string().uri().optional().messages({
    "string.uri": `"website" must be a valid URL`,
  }),
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




app.post("/form3", async (req, res) => {
  const {email}=req.body;
  try {
    const val = await schema3.validateAsync(req.body);

    const user=await form3.findOne({email});


    if(user){
      return res.status(200).send("All ready exist")
    }


    const data = new form3(val);
    await data.save();

    res.status(200).send({ message: "Validation successful", data: val });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});



app.get("/form3-get", async (req, res) => {
  try {
    const user = await form3.findOne({
      Account: req.body.Account,
      email: req.body.email,
      phone: req.body.phone,
    });

    if (user) {
      const token = jwt.sign({ _id: user._id }, superKey);
      return res.status(200).send({ message: "User found", token });
    } else {
      return res.status(404).send({ message: "User not found" });
    }
    // console.log(user);
    // const newStudent = new form1(val);
    // await newStudent.save();

    res.status(200).send({ message: "list of data", Data: user });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});


app.put("/form3-findOneAndUpdate",CheckToken, async (req, res) => {
  const { email, Industry } = req.body;
  try {
   const filter = {  email };
      const update = { Industry};


    // console.log(user);
    // const newStudent = new form1(val);
    // await newStudent.save();

    const updatedUser = await form3.findOneAndUpdate(filter, update);

    res
      .status(200)
      .send({ message: "Validation successful", data: updatedUser });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});


app.delete("/form3-findOneAndDelete",CheckToken, async (req, res) => {
  const { email } = req.body;
  try {
    const check = {  email };
    //   const update = { city: city };
    //   const options = { new: true, upsert: false };

    // // console.log(user);
    // // const newStudent = new form1(val);
    // // await newStudent.save();

    // const updatedUser = await form1.findOneAndUpdate(filter, update, options);

    const deletedUser = await form3.findOneAndDelete(check);

    res.status(200).send({ message: "Validation successful", data: deletedUser });

  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});


app.get("/form3-findall",CheckToken, async (req, res) => {
  try {
    const documents = await form3.find();
    res.status(200).json({
      val:documents});
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});



app.get("/form3-assending", CheckToken, async (req, res) => {
  try {
    const documents = await form3.find().sort({ createdAt: 1 });
    res.status(200).json(documents);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


app.get("/form3-deseending", CheckToken, async (req, res) => {
  try {
    const documents = await form3.find().sort({ createdAt: -1});
    res.status(200).json(documents);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});



app.get("/form3-findone",CheckToken, async (req, res) => {
  // const {email}=req.body;
  try {
    const document = await form3.findOne({
      email: req.body.email,
    });

    // console.log(document)
    res.status(200).json(document);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


app.get("/form3/:id",CheckToken, async (req, res) => {
  try {
    const document = await form3.findById(req.params.id);
    res.status(200).json(document);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


app.put("/form3-update-many",CheckToken, async (req, res) => {

  const {Industry,Title_of_acccount}=req.body
  try {

    const filter = { Industry };
      const update = { Title_of_acccount };
    const updatedDocuments = await form3.updateMany(filter,update);

    const user = await form3.find(filter);
    res.status(200).json({
      CountData: updatedDocuments,
      DataUser: user,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});



app.put("/form3-find-by-id-and-update",CheckToken, async (req, res) => {
  const {_id,Industry}=req.body
  try {

    const filter = { _id };
    const update = { Industry };
    const updatedDocuments = await form3.findByIdAndUpdate(filter,update);

    const user = await form3.find(filter);
    res.status(200).json({
      CountData: updatedDocuments,
      DataUser: user,
    });

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});



app.put('/form3-update-one',CheckToken, async (req, res) => {
  const { email, Industry } = req.body;
  try {
    const filter={email};

    
    const update={Industry};


    const updatedDocument = await form3.updateOne(filter,{ $set: update });


    const user = await form3.findOne({ email});


    res.status(200).json({ updatedCount: updatedDocument.nModified, data: user });


  } catch (err) {
    res.status(400).json({ message: err.message });
  }

});


app.get('/form3-count-documents',CheckToken, async (req, res) => {
  try {

    const {Industry}=req.body

    const count = await form3.countDocuments({Industry});
    res.status(200).json({ count });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});



app.delete('/form3-delete-many',CheckToken, async (req, res) => {

  try {
    const { Industry } = req.body;

    // if (!) {
    //   return res.status(400).json({ message: "Email is required" });
    // }

    const deletedDocuments = await form3.deleteMany({ Industry });

    if (deletedDocuments.deletedCount === 0) {
      return res.status(404).json({ message: "No documents found to delete" });
    }

    res.status(200).json(deletedDocuments);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});





app.post("/form3-login",CheckToken, CheckToken, (req, res) => {
  console.log("inside form", req.body);

  res.status(200).json({
    message: "I am  form3",
  });
});




app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});


