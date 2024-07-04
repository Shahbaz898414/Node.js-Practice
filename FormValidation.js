const express = require('express');
const app = express();
const port = 5500;
const bodyParser = require('body-parser');
const multer = require("multer");
app.use(bodyParser.json());
const upload = multer({ dest: 'filestorage/' });
const jwt = require("jsonwebtoken");
const Joi = require("joi");

const schema = Joi.object({

    username: Joi.string().min(3).max(8).required(),
    password: Joi.string().min(3).max(12).required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
        'any.only': 'Passwords do not match'
    }),
    email: Joi.string().email().min(6).max(30).required(),
    dob: Joi.date().less('now').iso().required(),
    phone: Joi.string().pattern(/^[0-9]{10,15}$/).required(),
    hallTicket: Joi.string().pattern(/^(A2|A3)/).required().messages({
        'any.only': 'Hall ticket must  start  with A2 (Maharashtra) or A3 (Delhi)'
    })


});




app.put("/update-val", async (req, res) => {
    try {
        const val = await schema.validateAsync(req.body);

        // Determine the state based on hallTicket value
        let state;
        if (val.hallTicket === 'A2') {
            state = 'Maharashtra';
        } else if (val.hallTicket === 'A3') {
            state = 'Delhi';
        }

        // Include state in the response data
        const responseData = { ...val, state };

        res.status(200).send({ message: "Validation successful", data: responseData });
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
});


const schema1 = Joi.object({

    firstName: Joi.string().min(2).max(30).required(),
    lastName: Joi.string().min(2).max(30).required(),
    class: Joi.string()
        .pattern(/^Class \d{4}-\d{4}$/) 
        .required()
        .messages({
            'string.pattern.base': 'Class must be in the format "Class YYYY-YYYY", e.g., "Class 2015-2016"',
            'any.required': 'Class is required'
        }),
    dob: Joi.date().less('now').iso().required(), // Student date of birth
    parentFirstName: Joi.string().min(2).max(30).required(),
    parentLastName: Joi.string().min(2).max(30).required(),
    currentAddress: Joi.string().min(5).max(100).required(),
    streetAddress1: Joi.string().min(5).max(100).required(),
    streetAddress2: Joi.string().min(5).max(100).optional(),
    city: Joi.string().min(2).max(50).required(),
    region: Joi.string().min(2).max(50).required(),
    zipcode: Joi.string().pattern(/^[0-9]{5,10}$/).required(),
    country: Joi.string().min(2).max(50).required(),
    phone: Joi.string().pattern(/^[0-9]{10,15}$/).required(),
    email: Joi.string().email().min(6).max(30).required()


});

const schema2=Joi.object({
    firstName:Joi.string().min(3).max(16).required(),
    lastName:Joi.string().min(3).max(10).required(),
    companyName:Joi.string().min(3).max(30).required(),
    email:joi.string().email().min(6).max(26).require(),
    phone:Joi.string().pattern(/^[0-9]{10,15}$/).required(),
})




app.put("/form1", async (req,res) => {
    try {
        const val = await schema1.validateAsync(req.body);

        res.status(200).send({ message: "Validation successful", data: val });
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
})



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
