const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let documents = [];

app.get('/', (req, res) => {
    res.send('Gestion de Documents Administratifs');
});

app.get('/documents', (req, res) => {
    res.json(documents);
});

app.post('/documents', (req, res) => {
    const document = req.body;
    documents.push(document);
    res.status(201).json(document);
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});