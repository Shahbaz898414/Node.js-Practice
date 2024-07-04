const express = require('express');
const app = express();
const port = 5500;
const bodyParser = require('body-parser');
const multer = require("multer")
app.use(bodyParser.json())
const upload = multer({ dest: 'filestorage/' })
const jwt = require("jsonwebtoken")
const Joi = require("joi")
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
];
// sign
const signKey = "random124444"
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
        console.log("user",user)
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

})

// middleware => watchmen

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
// get
// post
// put
app.put("/update",(req,res)=>{
    const username = req.body.username;
    const check = users.find( a => a.username == username)
    if(!check){
        res.status(400).json({
            "message":"User not found"
        })
        return;
    }
    const password = req.body.password
    let users2 = []
    for(let i of users){
        if ( i.username == username ){
            users2.push({
                "id":i.id,
                "username":i.username,
                "password":password
            })
        }else{
            users2.push(i)
        }
    }
    res.status(200).json(users2)

})

app.delete("/delete",(req,res)=>{
    const username = req.body.username;
    const check = users.find( a => a.username == username)
    if(!check){
        res.status(400).json({
            "message":"User not found"
        })
        return;
    }
    let users2 = []
    for(let i of users){
        if ( i.username == username ){
            continue;
        }else{
            users2.push(i)
        }
    }
    res.status(200).json(users2)

})

const schema = Joi.object({
    username: Joi.string().min(3).max(8).required(),
    password: Joi.string()
        .min(8) 
        .max(12) 
        .pattern(/[A-Z]/) 
        .pattern(/[a-z]/) 
        .pattern(/[0-9]/) 
        .pattern(/[\W_]/) 
        .required()
        .messages({
            'string.min': 'Password must be at least 8 characters long',
            'string.max': 'Password must be at most 12 characters long',
            'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
            'any.required': 'Password is required'
      }),
    email: Joi.string().email().min(6).max(30).required(),
})

app.put("/update-val", async (req, res) => {
    try {
        const val = await schema.validateAsync(req.body);
        // const username = req.body.username;
        // const password = req.body.password;
        
        // Perform your update logic here

        res.status(200).send({ message: "Validation successful", data: val });
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
});