const express = require('express'); 
const app = express();
const PORT = 8080;

app.use(express.json());

let users = [{ id: 1, password: 123 }, { id: 2, password: 456 }]; // a temp 'db'

app.get('/', (req, res) => {
  res.json(users);
});

app.post('/', (req, res) => {
  const newUser = req.body;
  users.push(newUser);
  res.send(users);
});

app.put('/', (req, res) => {

});