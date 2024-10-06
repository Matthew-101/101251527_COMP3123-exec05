const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const router = express.Router();


app.use(express.json());

router.get('/home', (req,res) => {
  res.sendFile(path.join(dir__dirname, 'home.html'));
});

router.get('/profile', req, res) => {
  fs.readFile(path.join(__dirname, 'user.json'), 'utf8', (err, data) => {
    if (err) {
      res.status(500).send({ status: false, message: "Server Error" });
    } else {
      res.json(JSON.parse(data));
    }
  });
};


router.post('/login', (req, res) => {
  const { username, password } = req.body;

  fs.readFile(path.join(__dirname, 'user.json'), 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ status: false, message: "Server Error" });
    }

    const users = JSON.parse(data);

    const user = users.find(u => u.username === username);
    
    if (!user) {
      return res.json({ status: false, message: "User Name is invalid" });
    }

    if (user.password !== password) {
      return res.json({ status: false, message: "Password is invalid" });
    }

    return res.json({ status: true, message: "User Is valid" });
  });
});


router.get('/logout/:username', (req,res) => {
  const username = req.params.username;
  res.send(`<b>${username} successfully logged out.<b>`);
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Server Error');
});

app.use('/', router);

app.listen(process.env.port || 8081);

console.log('Web Server is listening at port '+ (process.env.port || 8081));