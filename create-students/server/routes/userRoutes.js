// user.js
const express = require("express")
const userRoutes = express.Router();
const fs = require('fs');

const dataPath = './data.json';

// util functions 
const saveUserData = (data) => {
    const stringifyData = JSON.stringify(data)
    fs.writeFileSync(dataPath, stringifyData)
}

const getUserData = () => {
    const jsonData = fs.readFileSync(dataPath)
    return JSON.parse(jsonData)
}

// Function to generate a random ID
const generateRandomId = () => {
    return Math.random().toString(36).substr(2, 10); // You can adjust the length of the ID
}

// Write - write in the json file
userRoutes.post('/user/addUser', (req, res) => {
    var existUsers = getUserData()
    
    const newUser = {
        id: generateRandomId(),
        ...req.body // Include other user data from the request body
    };

    existUsers.push(newUser)
    saveUserData(existUsers);

    res.send({ success: true, message: 'user register successfully' })
});

// Update - update a user by ID
userRoutes.put('/user/update/:id', (req, res) => {
    const existUsers = getUserData();
    const userId = req.params.id;

    const userIndex = existUsers.findIndex(user => user.id === userId);
    if (userIndex !== -1) {
        
        existUsers[userIndex] = {
            ...existUsers[userIndex],
            ...req.body
        };
        saveUserData(existUsers);
        
        res.send({ success: true, message: 'User updated successfully', data: existUsers[userIndex] });
    } else {

        res.status(404).send({ success: false, message: 'User not found' });
    }
});

// Delete - delete a user by ID
userRoutes.delete('/user/delete/:id', (req, res) => {
    const existUsers = getUserData();
    const userId = req.params.id;
    
    const userIndex = existUsers.findIndex(user => user.id === userId);
    
    if (userIndex !== -1) {
        existUsers.splice(userIndex, 1);
        saveUserData(existUsers);
        
        res.send({ success: true, message: 'User deleted successfully' });
    } else {

        res.status(404).send({ success: false, message: 'User not found' });
    }
});

// read from file and check
userRoutes.post('/user/login', (req, res) => {
    const existUsers = getUserData();
    const result = existUsers.find(obj => (obj.email === req.body.email && obj.password === req.body.password));
    if (result) {
        res.send({ success: true, message: 'Login successfully', data: result });
    }
    else {
        res.status(404).send({ success: false, message: 'Need to Register First!' });
    }
});

// Read - get all users from the json file
userRoutes.get('/user/list', (req, res) => {
    const users = getUserData()
    res.send(users)
})

module.exports = userRoutes