const express = require('express');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const app = express();
app.use(express.json());



mongoose.connect("mongodb+srv://shahbaz898khan:123rdfeShahbaz4@cluster0.uou69iw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => {
    console.log('MongoDB connected shahbaz');
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB:', error);
  }); 

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  confirmPassword: {
    type: String
  }
});



const checkUser = mongoose.model('checkUser', userSchema);



const superKey="shahbaz123$51ert"




app.post("/admissionForm", async (req, res) => {
  const { email, password, confirmPassword } = req.body;

  try {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      confirmPassword: Joi.string().required()
    });

    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    if (password !== confirmPassword) {
      return res.status(400).send({ message: 'Passwords do not match' });
    }

    const existingUser = await checkUser.findOne({ email });

    if (existingUser) {
      const token = jwt.sign({ _id: existingUser._id }, superKey);
      return res.status(400).send({ message: 'User Already Exists', token });
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const user = await checkUser.create({
      email,
      password: hash
    });

   

    const token = jwt.sign({ _id: user._id }, superKey);
    return res.status(200).send({ message: 'User registered successfully', checkUser, token, data: user });
  } catch (err) {
    return res.status(500).send({ message: 'Error during registration', error: err.message });
  }


});



app.post("/gate", async (req, res) => {
  const { email,password} = req.body;

  try {
    const user = await checkUser.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: 'Id Card not Match' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid password' });
    }
    const token = jwt.sign({ _id: user._id }, superKey, { expiresIn: '1h' });

    res.status(200).json({
      message: 'Your Id card is match ',
      token: token,
    
    });
  } catch (error) {
    res.status(400).json({ message: 'Error during Id Checking', error: error.message });
  }
});



function CheckToken(req,res,next){
  console.log(req,"req")

  console.log("header",req.headers)

  console.log("autherization",req.headers["authorization"]?.split(" ")[1])

  const token = req.headers["authorization"]?.split(" ")[1]
  if (token){
   
      jwt.verify(token,superKey,(err,decoded)=>{
          if (err){
              res.status(400).json({
                  "message":"not autherized"
              })
          }else{
              next()
          }
      })
  }else{
      res.status(400).json({
          "message":"not autherized"
      })
  }

}



app.get("/school",CheckToken,(req,res)=>{
  console.log("inside school", req.body)
  
  res.status(200).json({
      "message":"I am inside school",
      email:req.body.email,
      "password":req.body.password,
   

  })
})


app.listen(5000, () => {
  console.log('Server running on port 5000');
});