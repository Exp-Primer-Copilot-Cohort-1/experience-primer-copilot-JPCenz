// create web server
// create a comment
// read a comment
// update a comment
// delete a comment

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const comments = [
    { id: 1, author: 'John', content: 'Hello World' },
    { id: 2, author: 'Bobby', content: 'Hello Universe' }
];

app.use(bodyParser.json());

// create a comment
app.post('/comments', (req, res) => {
    const comment = req.body;
    comments.push(comment);
    res.send(comment);
});

// read a comment
app.get('/comments', (req, res) => {
    res.send(comments);
});

// update a comment
app.put('/comments/:id', (req, res) => {
    const id = req.params.id;
    const comment = comments.find(comment => comment.id === parseInt(id));
    if (comment) {
        comment.author = req.body.author;
        comment.content = req.body.content;
        res.send(comment);
    } else {
        res.status(404).send('Comment not found');
    }
});

// delete a comment
app.delete('/comments/:id', (req, res) => {
    const id = req.params.id;
    const index = comments.findIndex(comment => comment.id === parseInt(id));
    if (index >= 0) {
        comments.splice(index, 1);
        res.send('Comment deleted');
    } else {
        res.status(404).send('Comment not found');
    }
});

app.listen(8080, () => {
    console.log('Server started at http://localhost:8080');
});