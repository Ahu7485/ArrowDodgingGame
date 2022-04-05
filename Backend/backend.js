const express = require('express');
const app = express();
const bcrypt = require('bcrypt');

app.use(express.json());


// Storing users as Json
const users = [];

// Prints out all users
// (For Testing Purposes)
app.get('/users', (req, res) => {
    res.json(users)
})

//Create Username
app.post('/users', async (req, res) => {
    const user = users.find(user => user.username = req.body.username)
    if( user != null )
    return res.status(400).send('Username Already Exist');
    try {
        const hashedpassword = await bcrypt.hash(req.body.password, 10);
        console.log(hashedpassword);
        const user = { username: req.body.username, password: hashedpassword };
        users.push(user);
        res.status(201).send();
    } catch {
        res.status(500).send();
    }
})

//Signing In
app.post('/users/login', async (req, res) => {
    const user = users.find(user => user.username = req.body.username)
    if( user == null )
        return res.status(400).send('User Does not exist');
    try {
        if( await bcrypt.compare(req.body.password, user.password))
            res.send('Sucess');
        else 
            res.send('Wrong Password');
    } catch {
        res.status(500).send();
    }

})


app.listen(3000);

