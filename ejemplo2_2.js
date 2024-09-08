// ejemplo2_2.js
const fs = require('fs')
const express = require('express')
 
const app = express()
const port = process.env.PORT || 1337
let books = []

const loadBooks = () => {
  fs.readFile(__dirname + '/' + 'books.json', 'utf8', (err, data) => {
    books = JSON.parse(data)
  });
}
loadBooks()

app.get('/book', (req, res) => {
    res.json(books);
})

app.get('/book/:id', (req, res) => {
    // Reading id from the URL as string
    const id = parseInt(req.params.id)
    // Searching books for the id
    for (let book of books) {
        if (book.id === id) {
            res.json(book)
            return
        }
    }
    // Sending 404 when not found something is a good practice
    res.status(404).send('Book not found');
})

app.listen(port, () => 
  console.log(`Server listening on port ${port}`)
)