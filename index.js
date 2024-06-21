const express = require("express");

const app = express();

const port = 5000;

app.get("/", (req, res) => {
  // console.log(req.query);
  res.status(200).json({
    message:"hello world"
  });
});


app.get("/:fname/:lname", (req, res) => {
  console.log(req.params)
  res.status(200).json({
    fname:req.params.fname,
    lname:req.params.lname
  });


});

app.get("/:rollN/random/:schoolN", (req, res) => {
  console.log(req.params)

  res.status(200).json({
    rollN:req.params.rollN,
    schoolN:req.params.schoolN
  });

});


app.get("/:PRnumber/random2/:IDnumber", (req, res) => {
  console.log(req.params)

  res.status(200).json({
    PRnumber:req.params.PRnumber,
    IDnumber:req.params.IDnumber
  });

});


app.get("/:CollegeN/random3/:CourseN/:Division", (req, res) => {
  console.log(req.params)

  res.status(200).json({
    CollegeN:req.params.CollegeN,
    CourseN:req.params.CourseN,
    Division:req.params.Division
  });

});

app.get("/:BankN/:idNumber/:issuingCountry/:accountType/:accountNumber", (req, res) => {
  console.log(req.params)

  res.status(200).json({
    BankN:req.params.BankN,
    idNumber: req.params.idNumber,
    issuingCountry: req.params.issuingCountry,
    accountType: req.params.accountType,
    accountNumber: req.params.accountNumber,
  });

});


app.get("/:employerName/:employerAddress/:occupation/:annualIncome", (req, res) => {
  console.log(req.params)

  res.status(200).json({
    employerName: req.params.employerName,
    employerAddress: req.params.employerAddress,
    occupation: req.params.occupation,
    annualIncome: req.params.annualIncome,
  });

});





app.get("/:typeOfExam/:subjects/:code/:examLevel/:instructions/random6", (req, res) => {
  console.log(req.params)

  res.status(200).json({
        typeOfExam: req.params.typeOfExam,
    subjects: req.params.subjects,
    name: req.params.name,
    // address: req.params.address,
    code: req.params.code,
    examLevel: req.params.examLevel,
    instructions: req.params.instructions,
  });

});

app.get("/:random7/gift", (req, res) => {
  console.log(req.params)

  res.status(200).json({
      // message:'msksk'
      random7:req.params.random7
  });

});




app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  // console.log("shahbaz");
});




////////////////////////////// req -> query /////////////////////////////////////////

// app.get("/", (req, res) => {
//   console.log(req.query);
//   res.status(200).json({
//     type: req.query.type,
//     port: req.query.port,
//   });
// });

// app.get("/school", (req, res) => {
//   console.log(req.query);

//   res.status(200).json({
//     name: req.query.name,
//     sname: "khan",
//     age: "22",
//     BirthPlace: "Mumbai",
//   });
// });

// app.get("/college", (req, res) => {
//   console.log(req.query);
//   res.status(200).json({
//     full_name: req.query.full_name,
//     date_of_birth: req.query.date_of_birth,
//     gender: req.query.gender,
//     citizenship: req.query.citizenship,
//     social_security_number: req.query.social_security_number,

//     contact_information: {
//       address: req.query.address,
//       phone_number: req.phone_number,
//       email: req.query.email,
//     },
//   });
// });

// app.get("/bank", (req, res) => {
//   console.log(req.query);

//   res.status(200).json({
//     idNumber: req.query.idNumber,
//     issuingCountry: req.query.issuingCountry,
//     accountType: req.query.accountType,
//     accountNumber: req.query.accountNumber,
//     employerName: req.query.employerName,
//     employerAddress: req.query.employerAddress,
//     occupation: req.query.occupation,
//     annualIncome: req.query.annualIncome,
//   });
// });

// app.get("/exam", (req, res) => {
//   console.log(req.query);

//   res.status(200).json({
//     typeOfExam: req.query.typeOfExam,
//     subjects: req.query.subjects,
//     name: req.query.name,
//     address: req.query.address,
//     code: req.query.code,
//     examLevel: req.query.examLevel,
//     instructions: req.query.instructions,
//   });
// });

// app.get("/user-profile", (req, res) => {
//   console.log(req.query);
//   res.status(200).json({
//     workPhoneNumber: req.query.workPhoneNumber,
//     workAddress: req.query.workAddress,
//   });
// });

// ///////////

// app.get("/college-Id", (req, res) => {
//   console.log(req.query);
//   res.status(200).json({
//     RollNumber: req.query.RollNumber,
//     PRNumber: req.query.PRNumber,
//   });
// });

// ///////////////////////////

// app.get("/google-form", (req, res) => {
//   console.log(req.query);
//   res.status(200).json({
//     email: req.query.email,
//     password: req.query.password,
//     ConfirmedPassword: req.query.ConfirmedPassword,
//   });
// });


// /////////////////////////////////
// app.get("/Instagram", (req, res) => {
//   console.log(req.query);
//   res.status(200).json({
//     UserName: req.query.UserName,
//     PhoneNumber: req.query.PhoneNumber, 
//     OTP: req.query.OTP
//   });
// });



// /////////////////////////////////


// app.get("/X", (req, res) => {
//   console.log(req.query);
//   res.status(200).json({
//     Pay: req.query.Pay, 
//     mail: req.query.mail, 
//     Bio: req.query.Bio
//   });
// });




