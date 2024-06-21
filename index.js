const express = require("express");

const app = express();

const port = 5000;

app.get("/", (req, res) => {
  console.log(req.query);
  res.status(200).json({
    type: req.query.type,
    port: req.query.port,
  });
});

app.get("/school", (req, res) => {
  console.log(req.query);

  res.status(200).json({
    name: req.query.name,
    sname: "khan",
    age: "22",
    BirthPlace: "Mumbai",
  });
});

app.get("/college", (req, res) => {
  console.log(req.query);
  res.status(200).json({
    full_name: req.query.full_name,
    date_of_birth: req.query.date_of_birth,
    gender: req.query.gender,
    citizenship: req.query.citizenship,
    social_security_number: req.query.social_security_number,

    contact_information: {
      address: req.query.address,
      phone_number: req.phone_number,
      email: req.query.email,
    },
  });
});

app.get("/bank", (req, res) => {
  console.log(req.query);

  res.status(200).json({
    idNumber: req.query.idNumber,
    issuingCountry: req.query.issuingCountry,
    accountType: req.query.accountType,
    accountNumber: req.query.accountNumber,
    employerName: req.query.employerName,
    employerAddress: req.query.employerAddress,
    occupation: req.query.occupation,
    annualIncome: req.query.annualIncome,
  });
});

app.get("/exam", (req, res) => {
  console.log(req.query);

  res.status(200).json({
    typeOfExam: req.query.typeOfExam,
    subjects: req.query.subjects,
    name: req.query.name,
    address: req.query.address,
    code: req.query.code,
    examLevel: req.query.examLevel,
    instructions: req.query.instructions,
  });
});

app.get("/user-profile", (req, res) => {
  console.log(req.query);
  res.status(200).json({
    workPhoneNumber: req.query.workPhoneNumber,
    workAddress: req.query.workAddress,
  });
});

///////////

app.get("/college-Id", (req, res) => {
  console.log(req.query);
  res.status(200).json({
    RollNumber: req.query.RollNumber,
    PRNumber: req.query.PRNumber,
  });
});

///////////////////////////

app.get("/google-form", (req, res) => {
  console.log(req.query);
  res.status(200).json({
    email: req.query.email,
    password: req.query.password,
    ConfirmedPassword: req.query.ConfirmedPassword,
  });
});


/////////////////////////////////
app.get("/Instagram", (req, res) => {
  console.log(req.query);
  res.status(200).json({
    UserName: req.query.UserName,
    PhoneNumber: req.query.PhoneNumber, 
    OTP: req.query.OTP
  });
});



/////////////////////////////////


app.get("/X", (req, res) => {
  console.log(req.query);
  res.status(200).json({
    Pay: req.query.Pay, 
    mail: req.query.mail, 
    Bio: req.query.Bio
  });
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  // console.log("shahbaz");
});


/*

Allied Universal Security - Greenville
. Handles daily operations and other duties related to the 24x7 operations center.
. Use internal and external systems (internet, news-feed, and other data sources), to monitor risks that could have
an adverse impact ti assets, facilities, and personnel.
. Respond to site emergencies as they arise, ensure timely communication with all relevant managers.
. Detected suspicious activities and watched for criminal acts and rule infractions.
. Monitored and authorized entrance and departure of employees and visitors.
. Wrote reports on property damage, theft, presence of unauthorized persons and unusual occurrences.
. Monitored and reported suspicious activities to local authorities.
. Monitored central alarm system for fire, intrusion, and duress alarms and responded when needed.
. Denied entrance to the building to unauthorized persons.
. Secured all doors in the office and main building after hours.


*/