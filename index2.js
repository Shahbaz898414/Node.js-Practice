const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
app.use(bodyParser.json());

const users = [
    { id: 1, username: 'user1', password: 'password1', result: { math: 85, science: 90 } },
    { id: 2, username: 'user2', password: 'password2', result: { math: 75, science: 80 } },
    { id: 3, username: 'user3', password: 'password3', result: { math: 95, science: 92 } },
    { id: 4, username: 'user4', password: 'password4', result: { math: 65, science: 70 } },
    { id: 5, username: 'user5', password: 'password5', result: { math: 88, science: 89 } },
    { id: 6, username: 'user6', password: 'password6', result: { math: 78, science: 77 } },
    { id: 7, username: 'user7', password: 'password7', result: { math: 80, science: 85 } },
    { id: 8, username: 'user8', password: 'password8', result: { math: 92, science: 95 } },
];

const signKey = "random124444";

app.post("/login", (req, res) => {
    const { username, password } = req.body;
    
    if (!username || username.length === 0) {
        return res.status(400).json({ "message": "Enter valid username" });
    }
    if (!password || password.length === 0) {
        return res.status(400).json({ "message": "Enter valid password" });
    }

    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        const token = jwt.sign({ username, password }, signKey, { expiresIn: "2h" });
        return res.status(200).json({ "token": token });
    } else {
        return res.status(400).json({ "message": "User Not Found" });
    }
});

function CheckToken(req, res, next) {
    const token = req.headers["authorization"]?.split(" ")[1];
    
    if (token) {
        jwt.verify(token, signKey, (err, decoded) => {
            if (err) {
                return res.status(400).json({ "message": "Not authorized" });
            } else {
                req.user = decoded;
                next();
            }
        });
    } else {
        return res.status(400).json({ "message": "Not authorized" });
    }
}

app.get("/exam-results", CheckToken, (req, res) => {
    const username = req.user.username;
    const user = users.find(u => u.username === username);
    
    if (user) {
        return res.status(200).json({ "result": user.result });
    } else {
        return res.status(400).json({ "message": "User Not Found" });
    }
});

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  
    console.log(`Server running on port ${PORT}`);
});
