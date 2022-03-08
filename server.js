const PORT = process.env.PORT || 3001;
const path = require('path');
const fs = require('fs');
const express = require('express');
const app = express();
let notesData = require('./db/db.json');
const { v4: uuidv4 } = require('uuid');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/api/notes', (req, res) => {
    let data = notesData;
    res.json(data);
});

app.post('/api/notes', (req, res) => {
    req.body.id = uuidv4();
    notesData.push(req.body);
    fs.writeFileSync('./db/db.json', JSON.stringify(notesData, null, '/t'));
    res.json(notesData);
})

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(PORT,() => {
    console.log (`Server is now live on port ${PORT}!`);
});