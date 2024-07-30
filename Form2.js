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

app.post("/form2", async (req, res) => {


  const {email}=req.body;
  try {
    const val = await schema2.validateAsync(req.body);


    const user=await form2.findOne({email});

    if(user){
      return res.status(200).send("All ready exist")
    }
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


app.get("/form2-lgtreft", CheckToken,async (req, res) => {
  try {
    const users = await form2.find({ teamSize: { $lte: 6 } });

    res.status(200).send({
      data: users,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});



app.put("/form2-findOneAndUpdate", CheckToken,async (req, res) => {
  const { email, companyName } = req.body;
  try {
   const filter = { email: email };
      const update = { companyName: companyName };
    const options = { new: true, upsert: false };

    // console.log(user);
    // const newStudent = new form1(val);
    // await newStudent.save();

    const updatedUser = await form2.findOneAndUpdate(filter, update, options);

    res
      .status(200)
      .send({ message: "Validation successful", data: updatedUser });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});


app.delete("/form2-findOneAndDelete",CheckToken, async (req, res) => {
  const { email } = req.body;
  try {
    const check = { email: email };
    //   const update = { city: city };
    //   const options = { new: true, upsert: false };

    // // console.log(user);
    // // const newStudent = new form1(val);
    // // await newStudent.save();

    // const updatedUser = await form1.findOneAndUpdate(filter, update, options);

    const deletedUser = await form2.findOneAndDelete(check);

    res.status(200).send({ message: "Validation successful", data: deletedUser });

  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});


app.get("/form2-findall",CheckToken, async (req, res) => {
  try {
    const documents = await form2.find();
    res.status(200).json(documents);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


app.get("/form2-assending", CheckToken, async (req, res) => {
  try {
    const documents = await form2.find().sort({ createdAt: 1 });
    res.status(200).json(documents);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


app.get("/form2-deseending", CheckToken, async (req, res) => {
  try {
    const documents = await form2.find().sort({ createdAt: -1});
    res.status(200).json(documents);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


app.get("/form2-skip-limit", async (req, res) => {
  try {
    const perPage=parseInt(req.query.perPage)
    const pageNo=req.query.pageNo;

    const documents = await form2.find().skip(2).limit(5);

    const count=await form2.countDocuments();

    res.status(200).json({doc:documents, count:count });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.get("/form2-skip-limit2", async (req, res) => {
  try {
    const perPage=parseInt(req.query.perPage)
    const pageNo=req.query.pageNo;

    const documents = await form2.find().skip((pageNo-1)*perPage).limit(perPage);

    const count=await form2.countDocuments();

    res.status(200).json({doc:documents, count:count });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


app.get("/form2-findone",CheckToken, async (req, res) => {
  // const {email}=req.body;
  try {
    const document = await form2.findOne({
      email: req.body.email,
    });

    // console.log(document)
    res.status(200).json(document);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


app.get("/form2/:id",CheckToken, async (req, res) => {
  try {
    const document = await form2.findById(req.params.id);
    res.status(200).json(document);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});




app.put("/form2-update-many",CheckToken, async (req, res) => {
  try {

    // const filter = { email: email };
    //   const update = { companyName: companyName };
    const updatedDocuments = await form2.updateMany({
      email: req.body.email,
      companyName: req.body.companyName,
    });

    const user = await form2.find({
      companyName: req.body.companyName,
    });
    res.status(200).json({
      CountData: updatedDocuments,
      DataUser: user,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});



app.put("/form2-find-by-id-and-update", CheckToken,async (req, res) => {
  try {
    const { _id, companyName } = req.body;

    if (!_id) {
      return res.status(400).json({ message: "ID is required" });
    }

   
    const update = { $set: { companyName } };


    const updatedDocument = await form2.findByIdAndUpdate(_id, update, { new: true });

    if (!updatedDocument) {
      return res.status(404).json({ message: "Document not found" });
    }

    res.status(200).json(updatedDocument);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});




app.put('/form2-update-one',CheckToken, async (req, res) => {

  const { email, companyName } = req.body;
  try {

    
    const filter={email};

    
    const update={companyName};


    const updatedDocument = await form2.updateOne(filter,{ $set: update });


    const user = await form2.findOne({ email});


    res.status(200).json({ updatedCount: updatedDocument.nModified, data: user });

  } catch (err) {
    res.status(400).json({ message: err.message });
  }


});


app.get('/form2-count-documents',CheckToken, async (req, res) => {
  try {

    const {companyName}=req.body

    const count = await form2.countDocuments({companyName});
    res.status(200).json({ count });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});



app.delete('/form2-delete-many',CheckToken, async (req, res) => {

  try {
    const { companyName } = req.body;

    // if (!email) {
    //   return res.status(400).json({ message: "Email is required" });
    // }

    const deletedDocuments = await form2.deleteMany({ companyName });

    if (deletedDocuments.deletedCount === 0) {
      return res.status(404).json({ message: "No documents found to delete" });
    }

    res.status(200).json(deletedDocuments);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});




app.post("/form2-login", CheckToken, (req, res) => {
  console.log("inside form", req.body);

  res.status(200).json({
    message: "I am  form2",
  });
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

/*

Follow me for more updates Shahbaz Khan
Please like, share, comment, and don't forget to repost if you find this valuable.

#networking #Hiring #TechJobs #SoftwareEngineer #linkedin #college
#JobOpportunities #CareerGrowth #jobs #contentcreator #community #college #connection #JobAlert #HiringNow #SoftwareEngineer #CareerOpportunities #TechJobs #JobSearch #Connection


*/