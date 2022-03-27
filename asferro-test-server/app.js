const express = require('express');
const fs = require('fs');

let maxId = 0;

const app = express();

const createUpdateUserDate = () => {
    const date = new Date();
    const offset = date.getTimezoneOffset();
    return Date.now() - (offset * 60 * 1000);
}

app.use(express.json());

app.post('/user/add', (req, res) => {
    const existUsers = getUserData();
    const userData = req.body;

    userData.id = ++maxId;

    userData.createUpdateUserDate = createUpdateUserDate();
    existUsers.push(userData);

    saveUserData(existUsers);
    setTimeout(() => res.send({data: userData}), 300);
});

app.get('/user/list', (req, res) => {
    const users = getUserData();
    setTimeout(() => res.send(users), 400);
});

app.patch('/user/update/:id', (req, res) => {
    const id = +req.params.id;
    const updatedUser = req.body;
    const existUsers = getUserData();
     
    const findExist = existUsers.find( user => user.id === id );
    if (!findExist) {
        return res.status(409).send({error: true, msg: `user with id: ${id} not exist`});
    }


    updatedUser.createUpdateUserDate = createUpdateUserDate();
    const updatedList = existUsers.map(user => user.id === id ? updatedUser : user);
    saveUserData(updatedList);
    setTimeout(() => res.send({data: updatedUser}), 500);
});

app.delete('/user/delete/:id', (req, res) => {
    const id = +req.params.id;
    const existUsers = getUserData();
    const filteredUsers = existUsers.filter( user => user.id !== id );

    if ( existUsers.length === filteredUsers.length ) {
        return res.status(409).send({error: true, msg: `User with id: ${id} does not exist`});
    }

    saveUserData(filteredUsers);
    setTimeout(() => res.send({data: id}), 300);
});

const saveUserData = (data) => {
    const stringifyData = JSON.stringify(data);
    fs.writeFileSync('users.json', stringifyData);
}

const getUserData = () => {
    const jsonData = fs.readFileSync('users.json');
    return JSON.parse(jsonData).sort((a, b) => b.id - a.id);
}

app.listen(3000, () => {
    console.log('Server runs on port 3000');
});

const users = getUserData();
users.forEach((user) => {
  if (user.id > maxId) {
    maxId = user.id;
  }
});