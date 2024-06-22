const express = require("express");
const bodyParser = require("body-parser")

const app = express();

const port = 5000;

app.use(bodyParser.json())



app.post("/",(req,res)=>{
  console.log("body",req.body);
  const name=req.body.name12;
  const lname=req.body.lname;
  const rollN=req.params.rollN;

  res.status(200).json({
    name:req.body.name,
    lname:req.body.lname,
    rollN:req.body.rollN
  })
})

app.post("/Juniour-college",(req,res)=>{
  console.log("body",req.body);
  const name=req.body.name;
    const lname=req.body.lname;
    const rollN=req.body.rollN;
    const Division=req.body.Division;
    const stream=req.body.stream;

  res.status(200).json({
    name:name,
    lname:lname,
    rollN:rollN,
    Divison:Division,
    stream:stream

  })
 
  
})


app.post("/Bank",(req,res)=>{

  console.log(req.body)

  res.status(200).json({
    Fullname:req.body.Fullname,
    DOB:req.body.DOB,
    Gender:req.body.Gender,
    Nationality:req.body.Nationality,
    PhoneN:req.body.PhoneN,
    Email:req.body.Email,
    Address:req.body.Address

  })
})


app.post("/Login",(req,res)=>{
  console.log(req.body);

  res.status(200).json({
    Email:req.body.Email,
    Password:req.body.Password
  })
})


app.post("/Signup",(req,res)=>{
  console.log(req.body)

  res.status(200).json({
    Fullname:req.body.Fullname,
    Gender:req.body.Gender,
    PhoneN:req.body.PhoneN,
    Email:req.body.Email,
    ConformationEmail:req.body.ConformationEmail,
    Password:req.body.Password,
    ConformedPassword:req.body.ConformedPassword
  })
})



app.post("/Addmision",(req,res)=>{
  console.log(req.body)

  res.status(200).json({
    FullName: req.body.FullName,
    DateOfBirth: req.body.DateOfBirth,
    Gender: req.body.Gender,
    Nationality: req.body.Nationality,
    PassportSizedPhotograph: req.body.PassportSizedPhotograph,
    PermanentAddress: req.body.PermanentAddress,
    CurrentAddress: req.body.CurrentAddress, // If different
    PhoneNumber: req.body.PhoneNumber,
    EmailAddress: req.body.EmailAddress,
    CourseProgramAppliedFor: req.body.CourseProgramAppliedFor,
    PreferredCampusLocation: req.body.PreferredCampusLocation, // If applicable
    ModeOfStudy: req.body.ModeOfStudy,
  })
})


app.post("/Neet",(req,res)=>{
  console.log(req.body)

  res.status(200).json({
    Address: req.body.Address,
    PhoneN: req.body.PhoneN,
    Email: req.body.Email,
    AadhaarNumber: req.body.AadhaarNumber,
    IdentificationDocument: req.body.IdentificationDocument,
    SchoolCollegeLastAttended: req.body.SchoolCollegeLastAttended,
    YearOfPassing10th: req.body.YearOfPassing10th,
    YearOfPassing12th: req.body.YearOfPassing12th,
    Marks10thStandard: req.body.Marks10thStandard,
    Marks12thStandard: req.body.Marks12thStandard,
    PaymentMethod: req.body.PaymentMethod,
    TransactionIDReceiptNumber: req.body.TransactionIDReceiptNumber,
    PreviousNEETAttempts: req.body.PreviousNEETAttempts,
    DiscrepanciesInApplication: req.body.DiscrepanciesInApplication,
    CandidateDeclaration: req.body.CandidateDeclaration,
    ConsentToShareInformation: req.body.ConsentToShareInformation,
  })
})


app.post("/JEE-main",(req,res)=>{
  console.log(req.body)

  res.status(200).json({
    Address: req.body.Address,
    PhoneN: req.body.PhoneN,
    Email: req.body.Email,
    Marks12thStandard: req.body.Marks12thStandard,
    PaymentMethod: req.body.PaymentMethod,
    TransactionIDReceiptNumber: req.body.TransactionIDReceiptNumber,
    PreviousNEETAttempts: req.body.PreviousNEETAttempts,
    DiscrepanciesInApplication: req.body.DiscrepanciesInApplication,
    CandidateDeclaration: req.body.CandidateDeclaration,
    ConsentToShareInformation: req.body.ConsentToShareInformation,
    AadhaarNumber: req.body.AadhaarNumber,
    IdentificationDocument: req.body.IdentificationDocument,
    SchoolCollegeLastAttended: req.body.SchoolCollegeLastAttended,
    YearOfPassing10th: req.body.YearOfPassing10th,
    YearOfPassing12th: req.body.YearOfPassing12th,
    Marks10thStandard: req.body.Marks10thStandard,
    
  })
})


app.post("/Railways-ticket",(req,res)=>{
  console.log(req.body)

  res.status(200).json({
    IdentificationDocumentType: req.body.IdentificationDocumentType,
    IdentificationDocumentNumber: req.body.IdentificationDocumentNumber,

    // Journey Details
    StartingStation: req.body.StartingStation,
    DestinationStation: req.body.DestinationStation,
    DateOfJourney: req.body.DateOfJourney,
    ClassOfTravel: req.body.ClassOfTravel,
    TrainNumberAndName: req.body.TrainNumberAndName,
    Quota: req.body.Quota,
    SeatPreference: req.body.SeatPreference,

    // Contact Information
    PhoneNumber: req.body.PhoneNumber,
    EmailAddress: req.body.EmailAddress,
    Address: req.body.Address,
    
  })
})



app.post("/Aroplane",(req,res)=>{
  console.log(req.body)

  res.status(200).json({
    EmergencyContactName: req.body.EmergencyContactName,
    EmergencyContactPhoneNumber: req.body.EmergencyContactPhoneNumber,
    EmergencyContactRelationship: req.body.EmergencyContactRelationship,

    // Travel Details
    DepartureCityAirport: req.body.DepartureCityAirport,
    DestinationCityAirport: req.body.DestinationCityAirport,
    DepartureDate: req.body.DepartureDate,
    ReturnDate: req.body.ReturnDate, // if booking a round trip
    PreferredDepartureTime: req.body.PreferredDepartureTime,
    PreferredReturnTime: req.body.PreferredReturnTime, // if applicable
    ClassOfTravel: req.body.ClassOfTravel, 
    Adults: req.body.Adults,
    Children: req.body.Children,
    Infants: req.body.Infants,

    PaymentMethod: req.body.PaymentMethod, // Credit Card, Debit Card, PayPal, etc.
    CardNumber: req.body.CardNumber,
    CardExpiryDate: req.body.CardExpiryDate,
    CardholderName: req.body.CardholderName,
    CVVCVCCode: req.body.CVVCVCCode,
    BillingAddress: req.body.BillingAddress,
    
  })
})






app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  // console.log("shahbaz");
});


// app.get("/", (req, res) => {
//   // console.log(req.query);
//   res.status(200).json({
//     message:"hello world"
//   });
// });


// app.get("/:fname/:lname", (req, res) => {
//   console.log(req.params)
//   res.status(200).json({
//     fname:req.params.fname,
//     lname:req.params.lname
//   });


// });

// app.get("/:rollN/random/:schoolN", (req, res) => {
//   console.log(req.params)

//   res.status(200).json({
//     rollN:req.params.rollN,
//     schoolN:req.params.schoolN
//   });

// });


// app.get("/:PRnumber/random2/:IDnumber", (req, res) => {
//   console.log(req.params)

//   res.status(200).json({
//     PRnumber:req.params.PRnumber,
//     IDnumber:req.params.IDnumber
//   });

// });


// app.get("/:CollegeN/random3/:CourseN/:Division", (req, res) => {
//   console.log(req.params)

//   res.status(200).json({
//     CollegeN:req.params.CollegeN,
//     CourseN:req.params.CourseN,
//     Division:req.params.Division
//   });

// });

// app.get("/:BankN/:idNumber/:issuingCountry/:accountType/:accountNumber", (req, res) => {
//   console.log(req.params)

//   res.status(200).json({
//     BankN:req.params.BankN,
//     idNumber: req.params.idNumber,
//     issuingCountry: req.params.issuingCountry,
//     accountType: req.params.accountType,
//     accountNumber: req.params.accountNumber,
//   });

// });


// app.get("/:employerName/:employerAddress/:occupation/:annualIncome", (req, res) => {
//   console.log(req.params)

//   res.status(200).json({
//     employerName: req.params.employerName,
//     employerAddress: req.params.employerAddress,
//     occupation: req.params.occupation,
//     annualIncome: req.params.annualIncome,
//   });

// });





// app.get("/:typeOfExam/:subjects/:code/:examLevel/:instructions/random6", (req, res) => {
//   console.log(req.params)

//   res.status(200).json({
//         typeOfExam: req.params.typeOfExam,
//     subjects: req.params.subjects,
//     name: req.params.name,
//     // address: req.params.address,
//     code: req.params.code,
//     examLevel: req.params.examLevel,
//     instructions: req.params.instructions,
//   });

// });

// app.get("/:random7/gift", (req, res) => {
//   console.log(req.params)

//   res.status(200).json({
//       // message:'msksk'
//       random7:req.params.random7
//   });

// });









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




