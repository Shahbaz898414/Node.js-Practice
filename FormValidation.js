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

const schema = Joi.object({
  username: Joi.string().min(3).max(8).required(),
  password: Joi.string().min(3).max(12).required(),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "any.only": "Passwords do not match",
  }),
  email: Joi.string().email().min(6).max(30).required(),
  dob: Joi.date().less("now").iso().required(),
  phone: Joi.string()
    .pattern(/^[0-9]{10,15}$/)
    .required(),
  hallTicket: Joi.string()
    .pattern(/^(A2|A3)/)
    .required()
    .messages({
      "any.only":
        "Hall ticket must  start  with A2 (Maharashtra) or A3 (Delhi)",
    }),
});

app.put("/update-val", async (req, res) => {
  try {
    const val = await schema.validateAsync(req.body);

    // Determine the state based on hallTicket value
    let state;
    if (val.hallTicket === "A2") {
      state = "Maharashtra";
    } else if (val.hallTicket === "A3") {
      state = "Delhi";
    }

    // Include state in the response data
    const responseData = { ...val, state };

    res
      .status(200)
      .send({ message: "Validation successful", data: responseData });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

app.get("/update-get", async (req, res) => {
  try {
    const user = await form1.find();
    // console.log(user);
    // const newStudent = new form1(val);
    // await newStudent.save();

    res.status(200).send({ message: "Validation successful", Data: user });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

// const schema1 = Joi.object({
//   firstName: Joi.string().min(2).max(30).required(),
//   lastName: Joi.string().min(2).max(30).required(),
//   class: Joi.string()
//     .pattern(/^Class \d{4}-\d{4}$/)
//     .required()
//     .messages({
//       "string.pattern.base":
//         'Class must be in the format "Class YYYY-YYYY", e.g., "Class 2015-2016"',
//       "any.required": "Class is required",
//     }),
//   dob: Joi.date().less("now").iso().required(), // Student date of birth
//   parentFirstName: Joi.string().min(2).max(30).required(),
//   parentLastName: Joi.string().min(2).max(30).required(),
//   currentAddress: Joi.string().min(5).max(100).required(),
//   streetAddress1: Joi.string().min(5).max(100).required(),
//   streetAddress2: Joi.string().min(5).max(100).optional(),
//   city: Joi.string().min(2).max(50).required(),
//   region: Joi.string().min(2).max(50).required(),
//   zipcode: Joi.string()
//     .pattern(/^[0-9]{5,10}$/)
//     .required(),
//   country: Joi.string().min(2).max(50).required(),
//   phone: Joi.string()
//     .pattern(/^[0-9]{10,15}$/)
//     .required(),
//   email: Joi.string().email().min(6).max(30).required(),
// });

// function CheckToken(req, res, next) {
//   console.log(req, "req");

//   console.log("header", req.headers);

//   console.log("autherization", req.headers["authorization"]?.split(" ")[1]);

//   const token = req.headers["authorization"]?.split(" ")[1];
//   if (token) {
//     jwt.verify(token, superKey, (err, decoded) => {
//       if (err) {
//         res.status(400).json({
//           message: "not autherized",
//         });
//       } else {
//         next();
//       }
//     });
//   } else {
//     res.status(400).json({
//       message: "not autherized",
//     });
//   }
// }

// app.post("/form1", async (req, res) => {
//   try {
//     const val = await schema1.validateAsync(req.body);

//     const newStudent = new form1(val);
//     await newStudent.save();

//     res.status(200).send({ message: "Validation successful", data: val });
//   } catch (err) {
//     res.status(400).send({ message: err.message });
//   }
// });


// app.put("/form1-update", async (req, res) => {
//   const { email ,city} = req.body;
//   try {


    
//     const filter = { email: email };
//       const update = { city: city };
//       const options = { new: true, upsert: false };

//     // console.log(user);
//     // const newStudent = new form1(val);
//     // await newStudent.save();

//     const updatedUser = await form1.findOneAndUpdate(filter, update, options);

//     res.status(200).send({ message: "Validation successful", data: updatedUser });
//   } catch (err) {
//     res.status(400).send({ message: err.message });
//   }
// });

// app.delete("/form1-delete", async (req, res) => {
//   const { email } = req.body;
//   try {


    
//     const check = { email: email };
//     //   const update = { city: city };
//     //   const options = { new: true, upsert: false };

//     // // console.log(user);
//     // // const newStudent = new form1(val);
//     // // await newStudent.save();

//     // const updatedUser = await form1.findOneAndUpdate(filter, update, options);

//     const deletedUser = await form1.findOneAndDelete(check);

//     res.status(200).send({ message: "Validation successful", data: deletedUser });
    
//   } catch (err) {
//     res.status(400).send({ message: err.message });
//   }
// });

// app.get("/form1-get", async (req, res) => {

//   try {
//     const user = await form1.findOne({
//       email: req.body.email,
//       dob: req.body.dob,
//     });

//     if (user) {
//       const token = jwt.sign({ _id: user._id }, superKey);
//       return res.status(200).send({ message: "User found", token });
//     } else {
//       return res.status(404).send({ message: "User not found" });
//     }




//     res.status(200).send({ message: "Validation successful", Data: user });
//   } catch (err) {
//     res.status(400).send({ message: err.message });
//   }
// });

// app.post("/form1-login", CheckToken, (req, res) => {
//   console.log("inside form", req.body);

//   res.status(200).json({
//     message: "I am  form1",
//   });
// });



const schema2 = Joi.object({
  firstName: Joi.string().min(3).max(16).required(),
  lastName: Joi.string().min(3).max(10).required(),
  companyName: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().min(6).max(26).required(),
  phone: Joi.string()
    .pattern(/^[0-9]{10,15}$/)
    .required(),
  password: Joi.string()
    .min(5)
    .max(25)
    .pattern(/[A-Z]/)
    .pattern(/[a-z]/)
    .pattern(/[0-9]/)
    .pattern(/[\W_]/)
    .required()
    .messages({
      "string.min": "Password must be at least 8 characters long",
      "string.max": "Password must be at most 12 characters long",
      "string.pattern.base":
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      "any.required": "Password is required",
    }),
  website: Joi.string().uri().required().messages({
    "string.uri": "Website must be a valid URL",
  }),
  teamSize: Joi.number().integer().min(2).max(15).required().messages({
    "number.base": "Team size must be a number",
    "number.integer": "Team size must be an integer",
    "number.min": "Team size must be at least 1",
    "number.max": "Team size can be at most 20",
    "any.required": "Team size is required",
  }),
});

app.put("/form2", async (req, res) => {
  try {
    const val = await schema2.validateAsync(req.body);

    const data = new form2(val);

    await data.save();

    res.status(200).send({ message: "Validation successful", data: val });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});



app.get("/form2-get", async (req, res) => {
  // const { email, companyName } = req.body;
  try {
    const user = await form2.findOne({
      email: req.body.email,
      phone: req.body.phone,
      password: req.body.password,
    });

    if (user) {
      const token = jwt.sign({ _id: user._id }, superKey);
      return res.status(200).send({ message: "User found", token });
    } else {
      return res.status(404).send({ message: "User not found" });
    }

    {
      // const user= await form2.find({teamSize:{$lte: 6}});
      // const user= await form2.find({teamSize:{$lte: 6}});
      // const user= await form2.find({teamSize:{$eq: 6}});
      // const user= await form2.find({teamSize:{$gt: 6}});
      // const filter = { email: email };
      // const update = { companyName: companyName };
      // const options = { new: true, upsert: false };
      // const user= await form2.find({teamSize:{$eq: 9}});
      // const user= await form2.findById("668c01c2eb33157b0b5b596a");
      // const user= await form2.FindOneAndDelete("668c01c2eb33157b0b5b596a");
      // const count = await form2.countDocuments({ teamSize: { $eq: 9 } });
      // const updatedUser = await form2.findOneAndUpdate(filter, update, options);
      // console.log(user);
      // const newStudent = new form1(val);
      // await newStudent.save();
      // res.status(200).send({ message: "list of data", Data:user });
      // res.status(200).send({ message: "list of data", Data:count });
      //  FindOneAndDelete
      // const deletedUser = await form2.findOneAndDelete({ teamSize: { $lt: 6 } });
      // if (deletedUser) {
      //   res.status(200).send({ message: "Document deleted successfully", data: deletedUser });
      // } else {
      //   res.status(404).send({ message: "No document found with the specified condition" });
      // }
      ///////////////////////////////////////////
      // DeleteMany
      // const result = await form2.deleteMany({ teamSize: { $lt: 6 } });
      // res.status(200).send({ message: "Documents deleted successfully", deletedCount: result.deletedCount });
      //////////////////////////////////////////
      // DeleteOne
      // const { id } = req.params;
      // const result = await form2.deleteOne({ _id: id });
      // if (result.deletedCount === 1) {
      //   res.status(200).send({ message: "Document deleted successfully" });
      // } else {
      //   res.status(404).send({ message: "Document not found" });
      // }
      ///////////////////////////
      // updateOne
      // const filter = { teamSize: { $lt: 6 } }; // Find the document where teamSize is less than 6
      //     const update = { $set: { teamSize: 7 } }; // Update the teamSize to 7
      //     const result = await form2.updateOne(filter, update);
      //     if (result.modifiedCount > 0) {
      //       res.status(200).send({ message: "Team size updated successfully" });
      //     } else {
      //       res.status(404).send({ message: "No matching document found to update" });
      //     }
      ///////////////////////////////
      // updateMany
      // const { filter, update } = req.body;
      //     // Ensure that filter and update are provided in the request body
      //     if (!filter || !update) {
      //       return res.status(400).send({ message: "Filter and update fields are required" });
      //     }
      //     // Update many documents that match the filter
      //     const result = await form2.updateMany(filter, update);
      //     res.status(200).send({
      //       message: "Documents updated successfully",
      //       modifiedCount: result.modifiedCount,
      //     });
      ////////////////////////////////////
      // findOneAndDelete
      // const query = req.query;
      //     // Find one document based on the query parameters and delete it
      //     const deletedUser = await form2.findOneAndDelete(query);
      //     if (deletedUser) {
      //       res.status(200).send({ message: "Document deleted", data: deletedUser });
      //     } else {
      //       res.status(404).send({ message: "No document found to delete" });
      //     }
      // if (updatedUser) {
      //   res.status(200).send({ message: "Update successful", data: updatedUser });
      // } else {
      //   res.status(404).send({ message: "User not found" });
      // }
    }
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

app.post("/form2-login", CheckToken, (req, res) => {
  console.log("inside form", req.body);

  res.status(200).json({
    message: "I am  form2",
  });
});




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

app.put("/form3", async (req, res) => {
  try {
    const val = await schema3.validateAsync(req.body);

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

app.post("/form3-login", CheckToken, (req, res) => {
  console.log("inside form", req.body);

  res.status(200).json({
    message: "I am  form3",
  });
});





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

app.put("/form5", async (req, res) => {
  try {
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
      email:req.body.email,
      phone: req.body.phone,
      EmegencyContact:req.body.EmegencyContact
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

app.post("/form5-login", CheckToken, (req, res) => {
  console.log("inside form", req.body);

  res.status(200).json({
    message: "I am  form5",
  });
});



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

app.put("/form4", async (req, res) => {
  try {
    const val = await schema4.validateAsync(req.body);

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

app.post("/form4-login", CheckToken, (req, res) => {
  console.log("inside form", req.body);

  res.status(200).json({
    message: "I am  form4",
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});






