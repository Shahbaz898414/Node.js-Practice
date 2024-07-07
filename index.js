const express = require('express');
const app = express();
const port = 5000;
const mongoose = require("mongoose")
const bodyParser = require('body-parser');
const multer = require("multer")
app.use(bodyParser.json())
const upload = multer({ dest: 'filestorage/' })
const jwt = require("jsonwebtoken")
// request
// query
// params
// body
// form
// Here is a summary of the different ways to pass data in Express.js:
// Route Parameters (params): Part of the URL path, accessed via req.params.
// Query Parameters (query): Appended to the URL after a ?, accessed via req.query.
// Request Body (body): Data sent in the body of POST, PUT, PATCH, or DELETE requests, accessed via req.body.
// Request Headers (headers): Additional information sent with the request, accessed via req.headers.
// Cookies (cookies): Data stored on the client-side, accessed via req.cookies.
// URL Fragments: Part of the URL after #, used on the client-side for navigation but not sent to the server.
// app.get("/",(req,res)=>{
//     console.log("query",req.query)
//     const name = req.query.name
//     const sname = req.query.sname
//     const degree = req.query.degree

//     console.log(name,sname,degree)
//     res.status(200).json({
//         "message":"No rice",
//         "name":name,
//         "sname":sname,
//         "degree":degree,
//     })
//     // res.redirect('/new-page');
// })

// app.get("/shahbaz",(req,res)=>{
//     res.status(200).json({
//         "message":"I am shahbaz"
//     })
//     // res.redirect('/new-page');
// })

// query -> url?query1=query1value&query2=query2value

// params -> url/:params1/shahabaz/:params2/:params3
// get -> params,query
// post -> body, form
app.get("/:fname/random/:lname",(req,res)=>{
    console.log("params",req.params)
    res.status(200).json({
        "message":"Hello params",
        "first name": req.params.fname,
        "last name": req.params.lname
    })
    // res.redirect('/new-page');
})

app.get("/:rollno/random2/:school",(req,res)=>{
    console.log("params",req.params)
    res.status(200).json({
        "message":"Hello params",
        "roll no": req.params.rollno,
        "school name": req.params.school
    })
    // res.redirect('/new-page');
})

app.get("/shahbaz",(req,res)=>{
    res.status(200).json({
        "message":"I am shahbaz"
    })
    // res.redirect('/new-page');
})

app.post("/",(req,res)=>{
    console.log("body",req.body)
    const name = req.body.name11222
    const lname = req.body.lname
    const rollno = req.body.rollno
    res.status(200).json({
        "message":"No rice",
        "name":name,
        lname,
        rollno
    })
    // res.redirect('/new-page');
})

// form
app.post("/checkform",upload.single("document"),(req,res)=>{
    console.log("body",req.body)
    const name = req.body.name
    const lname = req.body.lname
    console.log("req.file",req.file)
    res.status(200).json({
        "message":"No rice",
        "name":name,
        lname    })
    // res.redirect('/new-page');
})

app.post("/checkformMultiple",upload.fields([
    {
        name:"document",
        maxCount:4
    },
    {
        name:"document2",
        maxCount: 1
    }
]),(req,res)=>{
    console.log("body",req.body)
    const name = req.body.name
    const lname = req.body.lname
    console.log("req.file",req.file)
    console.log("req.files",req.files["document"])
    console.log("req.files2",req.files["document2"])
    res.status(200).json({
        "message":"No rice",
        "name":name,
        lname    })
    // res.redirect('/new-page');
})


// registeration forms/logins form, normal data entry,with body


app.put("/",(req,res)=>{
    res.status(200).json({
        "message":"No rice"
    })
    // res.redirect('/new-page');
})

app.delete("/",(req,res)=>{
    res.status(200).json({
        "message":"No rice"
    })
    // res.redirect('/new-page');
})



function nextNumber(req,res,next){
    console.log("number",req.body.number)
    req.body.number = req.body.number + 5;
    next()
}


app.use(nextNumber)
app.post("/nextN",(req,res)=>{
    res.json(req.body)
})
app.post("/nextN111",(req,res)=>{
    console.log("req.body",req.body)
    res.json(req.body)
})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});



// unsuccesful -> user ki wajah -> client ki wajah -> 400
// unsuccessful -> server ki wajah -> 500
// 300 -> redirection
// server -> ghar -> building -> floor
// 208
// 5500
// 208


// express import
// app = express()
// app.listen(port,()=>{console.log()})
// app.get("/",(req,res)=>{res.status(200).json({"message":"hello"})})



// import body-parser
// use middleware
// 


// middleware
// something which is between req and res
// number =1 && 2 plus && aage bhejna
// req,res,next

// authentication (account belong karta hai ki nahi)
// autherization (agar belong karta hai to wohi dikhna chaiye jo tujhe authorized hai)



const users = [
    { id: 1, username: 'user1', password: 'password1' },
    { id: 2, username: 'user2', password: 'password2' },
    { id: 3, username: 'user3', password: 'password3' },
    { id: 4, username: 'user4', password: 'password4' },
    { id: 5, username: 'user5', password: 'password5' },
    { id: 6, username: 'user6', password: 'password6' },
    { id: 7, username: 'user7', password: 'password7' },
    { id: 8, username: 'user8', password: 'password8' },
];


// sign


const signKey = "random124444";


app.post("/login",(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    console.log("username",username)
    console.log("username length",username?.length)
    if (username && username.length > 0){
    }else {
        res.status(400).json({
            "message":"Enter valid username"
        })
    }
    if (password && password.length > 0){
    }else {
        res.status(400).json({
            "message":"Enter valid password"
        })
    }
    let check = false
    for(let user of users){
        // console.log("user",user)
        if (user.username == username && user.password == password){
            check = true
        }
    }


    if (check){
        let token= jwt.sign({
            username,
            password
        },signKey,{expiresIn:"2h"})
        res.status(200).json({
            "token":token
        })
    }else{
        res.status(400).json({
            "message":"User Not Found"
        })
    }

// 

})






function CheckToken(req,res,next){
    console.log(req,"req")

    console.log("header",req.headers)

    console.log("autherization",req.headers["authorization"]?.split(" ")[1])

    const token = req.headers["authorization"]?.split(" ")[1]
    if (token){
        // signkey
        jwt.verify(token,signKey,(err,decoded)=>{
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
    console.log("inside school")
    res.status(200).json({
        "message":"I am inside school"
    })
})



// jwt

// json web token

// personal details -> id card

// jwt personal -> token

// watchmen dhiyaan signKey























































///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// const express = require("express");
// const bodyParser = require("body-parser")

// const app = express();
// const multer = require("multer")

// const port = 5000;

// app.use(bodyParser.json())

// const upload=multer({dest:'/uploads'})



// app.post("/checkform",upload.single("document1"),(req,res)=>{
//   console.log(req.body)
//   console.log(req.document1)
//   res.status(200).json({
//     name:req.body.name,
//     lname:req.body.lname

//   })
// })


// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });


////////////////////////// two files  ///////////////////////////////////





// const fileFilter = (req, file, cb) => {
//     const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
//     if (allowedTypes.includes(file.mimetype)) {
//         cb(null, true);
//     } else {
//         cb(new Error('Invalid file type. Only PDF and DOC files are allowed.'));
//     }
// };

// const upload = multer({ 
//     dest: 'uploads/',
//     fileFilter: fileFilter
// });

// const uploadFields = upload.fields([
//     { name: 'file1', maxCount: 2 }, 
//     { name: 'file2', maxCount: 1 },
//     { name: 'file3', maxCount: 1 },
//     { name: 'file4', maxCount: 1 },
//     { name: 'file5', maxCount: 1 },
// ]);

// app.post("/checkform", uploadFields, (req, res) => {

//     console.log(req.body);
//     console.log(req.files);

//     // Check required fields and files
//     const requiredFields = ['nameOrg', 'name', 'lname', 'address1', 'city', 'state', 'pincode', 'phone', 'email', 'exitingProject', 'efficiency_strategies', 'para1', 'para2', 'para3', 'para4', 'para5'];

//     const missingFields = requiredFields.filter(field => !req.body[field]);
//     const requiredFiles = ['file1', 'file2', 'file3', 'file4', 'file5'];
//     const missingFiles = requiredFiles.filter(file => !req.files[file]);

//     // Field validation regex patterns
//     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     const phonePattern = /^[0-9]{10}$/; // Assuming a 10-digit phone number
//     const pincodePattern = /^[0-9]{5,6}$/; // Assuming a 5 or 6-digit pincode

//     // Field validation checks
//     const invalidFields = [];
//     if (!emailPattern.test(req.body.email)) invalidFields.push('email');
//     if (!phonePattern.test(req.body.phone)) invalidFields.push('phone');
//     if (!pincodePattern.test(req.body.pincode)) invalidFields.push('pincode');

//     if (missingFields.length > 0 || missingFiles.length > 0 || invalidFields.length > 0) {
//         res.status(400).json({
//             error: "Missing required fields or files",
//             missingFields: missingFields,
//             missingFiles: missingFiles,
//             invalidFields: invalidFields
//         });
//     } else {
//         res.status(200).json({
//             nameOrg: req.body.nameOrg,
//             name: req.body.name,
//             lname: req.body.lname,
//             address1: req.body.address1,
//             address2: req.body.address2,
//             city: req.body.city,
//             state: req.body.state,
//             pincode: req.body.pincode,
//             phone: req.body.phone,
//             email: req.body.email,
//             exitingProject: req.body.exitingProject,
//             efficiency_strategies: req.body.efficiency_strategies,
//             para1: req.body.para1,
//             para2: req.body.para2,
//             para3: req.body.para3,
//             para4: req.body.para4,
//             para5: req.body.para5,
//             para6: req.body.para6,
//             files: req.files
//         });
//     }
// });



////////////////////////// Middleware  ///////////////////////////////////


// const express = require("express");
// const bodyParser = require("body-parser");
// const multer = require("multer");

// const app = express();
// const port = 5000;

// app.use(bodyParser.json());


// function nextPro( req,res,next){
//     if(req.body.number){
//         let number = parseInt(req.body.number, 10);
//         if (!isNaN(number)) {
//             number += 2;
//             req.body.number = number;
//         }
//     }

//     next();
// }

// app.post('/numberAdd',nextPro, (req,res)=>{

//     console.log(req.body.number)

//     res.status(200).json({
//         number:req.body.number
//     })
// })


// function Checktime(req, res, next) {
//     if (req.body.time) {
//         let time = parseInt(req.body.time, 10);
//         if (!isNaN(time) && time >= 1 && time <= 24) {
//             if (time >= 1 && time <= 12) {
//                 req.body.period = 'AM';
//             } else {
//                 req.body.period = 'PM';
//             }
//             next();
//         } else {
//             res.status(400).json({
//                 error: "Invalid time. Time should be in the range of 1 to 24."
//             });
//         }
//     } else {
//         res.status(400).json({
//             error: "Time is required."
//         });
//     }
// }



// app.post('/TimeNow',Checktime,(req,res)=>{
//     console.log(req.body.time);

//     res.status(200).json({
//         time: req.body.time,
//         period: req.body.period
//     })
// })



// function oddEvenMiddleware(req, res, next) {
//     if (req.body.number) {
//         let number = parseInt(req.body.number, 10);
//         if (!isNaN(number)) {
//             req.body.isEven = (number % 2 === 0) ? 'Even' : 'Odd';
//             next();
//         } else {
//             res.status(400).json({
//                 error: "Invalid number. Please provide a valid number."
//             });
//         }
//     } else {
//         res.status(400).json({
//             error: "Number is required."
//         });
//     }
// }




// app.post('/numberCheck', oddEvenMiddleware, (req, res) => {
//     console.log(req.body.number);

//     res.status(200).json({
//         number: req.body.number,
//         type: req.body.isEven
//     });
// });


// function sortNumbersMiddleware(req, res, next) {
//     if (req.body.numbers && Array.isArray(req.body.numbers)) {
//         let allNumbers = req.body.numbers.every(item => !isNaN(parseInt(item, 10)));
//         if (allNumbers) {
//             req.body.numbers.sort((a, b) => a - b);
//             next();
//         } else {
//             res.status(400).json({
//                 error: "Invalid array. All elements must be numbers."
//             });
//         }
//     } else {
//         res.status(400).json({
//             error: "Numbers array is required."
//         });
//     }
// }



// app.post('/sortNumbers', sortNumbersMiddleware, (req, res) => {
//     console.log(req.body.numbers);

//     res.status(200).json({
//         sortedNumbers: req.body.numbers
//     });
// });


// function sortAndSumNumbersMiddleware(req, res, next) {
//     if (req.body.numbers && Array.isArray(req.body.numbers)) {
//         let allNumbers = req.body.numbers.every(item => !isNaN(parseInt(item, 10)));
//         if (allNumbers) {
//             req.body.numbers.sort((a, b) => a - b);
//             req.body.sum = req.body.numbers.reduce((acc, num) => acc + num, 0);
//             next();
//         } else {
//             res.status(400).json({
//                 error: "Invalid array. All elements must be numbers."
//             });
//         }
//     } else {
//         res.status(400).json({
//             error: "Numbers array is required."
//         });
//     }
// }


// app.post('/sortAndSumNumbers', sortAndSumNumbersMiddleware, (req, res) => {
//     console.log(req.body.numbers);

//     res.status(200).json({
//         sortedNumbers: req.body.numbers,
//         sum: req.body.sum
//     });
// });


// function sortAndSumNumbersMiddleware(req, res, next) {
//     if (req.body.numbers && Array.isArray(req.body.numbers)) {
//         let allNumbers = req.body.numbers.every(item => typeof item === 'number' && !isNaN(item));
//         if (allNumbers) {
//             req.body.numbers.sort((a, b) => a - b);
//             req.body.sum = req.body.numbers.reduce((acc, num) => acc + num, 0);
//             next();
//         } else {
//             res.status(400).json({
//                 error: "Invalid array. All elements must be numbers."
//             });
//         }
//     } else {
//         res.status(400).json({
//             error: "Numbers array is required."
//         });
//     }
// }


// app.post('/sortAndSumNumbers', sortAndSumNumbersMiddleware, (req, res) => {
//     console.log(req.body.numbers);

//     res.status(200).json({
//         sortedNumbers: req.body.numbers,
//         sum: req.body.sum
//     });
// });



// function countOddEvenMiddleware(req, res, next) {
//     if (req.body.numbers && Array.isArray(req.body.numbers)) {
//         let oddCount = 0;
//         let evenCount = 0;
        
//         req.body.numbers.forEach(item => {
//             if (typeof item === 'number' && !isNaN(item)) {
//                 if (item % 2 === 0) {
//                     evenCount++;
//                 } else {
//                     oddCount++;
//                 }
//             }
//         });

//         req.body.oddCount = oddCount;
//         req.body.evenCount = evenCount;

//         next();
//     } else {
//         res.status(400).json({
//             error: "Numbers array is required."
//         });
//     }
// }


// app.post('/countOddEven', countOddEvenMiddleware, (req, res) => {
//     console.log(req.body.numbers);

//     res.status(200).json({
//         oddCount: req.body.oddCount,
//         evenCount: req.body.evenCount
//     });
// });

// function findTwoSumMiddleware(req, res, next) {
//     if (req.body.nums && Array.isArray(req.body.nums) && req.body.target) {
//         const nums = req.body.nums;
//         const target = req.body.target;
//         const map = new Map();

//         for (let i = 0; i < nums.length; i++) {
//             const complement = target - nums[i];
//             if (map.has(complement)) {
//                 req.body.indices = [map.get(complement), i];
//                 next();
//                 return;
//             }
//             map.set(nums[i], i);
//         }

//         res.status(404).json({
//             error: "No two sum solution found."
//         });
//     } else {
//         res.status(400).json({
//             error: "Invalid input. 'nums' array and 'target' number are required."
//         });
//     }
// }


// app.post('/findTwoSum', findTwoSumMiddleware, (req, res) => {
//     const { nums, target, indices } = req.body;

//     if (indices) {
//         res.status(200).json({
//             indices: indices
//         });
//     } else {
//         res.status(404).json({
//             error: "No two sum solution found."
//         });
//     }
// });


// function addTwoNumbersMiddleware(req, res, next) {
//     if (req.body.num1 !== undefined && req.body.num2 !== undefined) {
//         const num1 = parseFloat(req.body.num1);
//         const num2 = parseFloat(req.body.num2);

//         if (!isNaN(num1) && !isNaN(num2)) {
//             req.body.sum = num1 + num2;
//             next();
//         } else {
//             res.status(400).json({
//                 error: "Invalid numbers. Please provide valid numeric values."
//             });
//         }
//     } else {
//         res.status(400).json({
//             error: "Both num1 and num2 are required in the request body."
//         });
//     }
// }


// app.post('/addTwoNumbers', addTwoNumbersMiddleware, (req, res) => {
//     const { num1, num2, sum } = req.body;

//     if (sum !== undefined) {
//         res.status(200).json({
//             result: sum
//         });
//     } else {
//         res.status(400).json({
//             error: "Failed to add numbers. Please check your input."
//         });
//     }
// });


// function reverseIntegerMiddleware(req, res, next) {
//     if (req.body.x !== undefined) {
//         const x = parseInt(req.body.x, 10);

//         if (!isNaN(x)) {
//             const reversed = parseInt(x.toString().split('').reverse().join(''));
//             req.body.reversed = x < 0 ? -reversed : reversed;
//             next();
//         } else {
//             res.status(400).json({
//                 error: "Invalid input. Please provide a valid integer."
//             });
//         }
//     } else {
//         res.status(400).json({
//             error: "Input 'x' is required in the request body."
//         });
//     }
// }


// app.post('/reverseInteger', reverseIntegerMiddleware, (req, res) => {
//     const { x, reversed } = req.body;

//     if (reversed !== undefined) {
//         res.status(200).json({
//             reversed: reversed
//         });
//     } else {
//         res.status(400).json({
//             error: "Failed to reverse integer. Please check your input."
//         });
//     }
// });

// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });














// app.post("/",(req,res)=>{
//   console.log("body",req.body);
//   const name=req.body.name12;
//   const lname=req.body.lname;
//   const rollN=req.params.rollN;

//   res.status(200).json({
//     name:req.body.name,
//     lname:req.body.lname,
//     rollN:req.body.rollN
//   })
// })

// app.post("/Juniour-college",(req,res)=>{
//   console.log("body",req.body);
//   const name=req.body.name;
//     const lname=req.body.lname;
//     const rollN=req.body.rollN;
//     const Division=req.body.Division;
//     const stream=req.body.stream;

//   res.status(200).json({
//     name:name,
//     lname:lname,
//     rollN:rollN,
//     Divison:Division,
//     stream:stream

//   })

// })

// app.post("/Bank",(req,res)=>{

//   console.log(req.body)

//   res.status(200).json({
//     Fullname:req.body.Fullname,
//     DOB:req.body.DOB,
//     Gender:req.body.Gender,
//     Nationality:req.body.Nationality,
//     PhoneN:req.body.PhoneN,
//     Email:req.body.Email,
//     Address:req.body.Address

//   })
// })

// app.post("/Login",(req,res)=>{
//   console.log(req.body);

//   res.status(200).json({
//     Email:req.body.Email,
//     Password:req.body.Password
//   })
// })

// app.post("/Signup",(req,res)=>{
//   console.log(req.body)

//   res.status(200).json({
//     Fullname:req.body.Fullname,
//     Gender:req.body.Gender,
//     PhoneN:req.body.PhoneN,
//     Email:req.body.Email,
//     ConformationEmail:req.body.ConformationEmail,
//     Password:req.body.Password,
//     ConformedPassword:req.body.ConformedPassword
//   })
// })

// app.post("/Addmision",(req,res)=>{
//   console.log(req.body)

//   res.status(200).json({
//     FullName: req.body.FullName,
//     DateOfBirth: req.body.DateOfBirth,
//     Gender: req.body.Gender,
//     Nationality: req.body.Nationality,
//     PassportSizedPhotograph: req.body.PassportSizedPhotograph,
//     PermanentAddress: req.body.PermanentAddress,
//     CurrentAddress: req.body.CurrentAddress, // If different
//     PhoneNumber: req.body.PhoneNumber,
//     EmailAddress: req.body.EmailAddress,
//     CourseProgramAppliedFor: req.body.CourseProgramAppliedFor,
//     PreferredCampusLocation: req.body.PreferredCampusLocation, // If applicable
//     ModeOfStudy: req.body.ModeOfStudy,
//   })
// })

// app.post("/Neet",(req,res)=>{
//   console.log(req.body)

//   res.status(200).json({
//     Address: req.body.Address,
//     PhoneN: req.body.PhoneN,
//     Email: req.body.Email,
//     AadhaarNumber: req.body.AadhaarNumber,
//     IdentificationDocument: req.body.IdentificationDocument,
//     SchoolCollegeLastAttended: req.body.SchoolCollegeLastAttended,
//     YearOfPassing10th: req.body.YearOfPassing10th,
//     YearOfPassing12th: req.body.YearOfPassing12th,
//     Marks10thStandard: req.body.Marks10thStandard,
//     Marks12thStandard: req.body.Marks12thStandard,
//     PaymentMethod: req.body.PaymentMethod,
//     TransactionIDReceiptNumber: req.body.TransactionIDReceiptNumber,
//     PreviousNEETAttempts: req.body.PreviousNEETAttempts,
//     DiscrepanciesInApplication: req.body.DiscrepanciesInApplication,
//     CandidateDeclaration: req.body.CandidateDeclaration,
//     ConsentToShareInformation: req.body.ConsentToShareInformation,
//   })
// })

// app.post("/JEE-main",(req,res)=>{
//   console.log(req.body)

//   res.status(200).json({
//     Address: req.body.Address,
//     PhoneN: req.body.PhoneN,
//     Email: req.body.Email,
//     Marks12thStandard: req.body.Marks12thStandard,
//     PaymentMethod: req.body.PaymentMethod,
//     TransactionIDReceiptNumber: req.body.TransactionIDReceiptNumber,
//     PreviousNEETAttempts: req.body.PreviousNEETAttempts,
//     DiscrepanciesInApplication: req.body.DiscrepanciesInApplication,
//     CandidateDeclaration: req.body.CandidateDeclaration,
//     ConsentToShareInformation: req.body.ConsentToShareInformation,
//     AadhaarNumber: req.body.AadhaarNumber,
//     IdentificationDocument: req.body.IdentificationDocument,
//     SchoolCollegeLastAttended: req.body.SchoolCollegeLastAttended,
//     YearOfPassing10th: req.body.YearOfPassing10th,
//     YearOfPassing12th: req.body.YearOfPassing12th,
//     Marks10thStandard: req.body.Marks10thStandard,

//   })
// })

// app.post("/Railways-ticket",(req,res)=>{
//   console.log(req.body)

//   res.status(200).json({
//     IdentificationDocumentType: req.body.IdentificationDocumentType,
//     IdentificationDocumentNumber: req.body.IdentificationDocumentNumber,

//     // Journey Details
//     StartingStation: req.body.StartingStation,
//     DestinationStation: req.body.DestinationStation,
//     DateOfJourney: req.body.DateOfJourney,
//     ClassOfTravel: req.body.ClassOfTravel,
//     TrainNumberAndName: req.body.TrainNumberAndName,
//     Quota: req.body.Quota,
//     SeatPreference: req.body.SeatPreference,

//     // Contact Information
//     PhoneNumber: req.body.PhoneNumber,
//     EmailAddress: req.body.EmailAddress,
//     Address: req.body.Address,

//   })
// })

// app.post("/Aroplane",(req,res)=>{
//   console.log(req.body)

//   res.status(200).json({
//     EmergencyContactName: req.body.EmergencyContactName,
//     EmergencyContactPhoneNumber: req.body.EmergencyContactPhoneNumber,
//     EmergencyContactRelationship: req.body.EmergencyContactRelationship,

//     // Travel Details
//     DepartureCityAirport: req.body.DepartureCityAirport,
//     DestinationCityAirport: req.body.DestinationCityAirport,
//     DepartureDate: req.body.DepartureDate,
//     ReturnDate: req.body.ReturnDate, // if booking a round trip
//     PreferredDepartureTime: req.body.PreferredDepartureTime,
//     PreferredReturnTime: req.body.PreferredReturnTime, // if applicable
//     ClassOfTravel: req.body.ClassOfTravel,
//     Adults: req.body.Adults,
//     Children: req.body.Children,
//     Infants: req.body.Infants,

//     PaymentMethod: req.body.PaymentMethod, // Credit Card, Debit Card, PayPal, etc.
//     CardNumber: req.body.CardNumber,
//     CardExpiryDate: req.body.CardExpiryDate,
//     CardholderName: req.body.CardholderName,
//     CVVCVCCode: req.body.CVVCVCCode,
//     BillingAddress: req.body.BillingAddress,

//   })
// })

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




