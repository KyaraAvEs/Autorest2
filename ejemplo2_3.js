// ejemplo2_3.js
const fs = require('fs')
const express = require('express')

const app = express()
app.use(express.json())
const port = process.env.PORT || 1337
let books = []

const loadBooks = () => {
  fs.readFile(__dirname + '/' + 'books.json', 'utf8', (err, data) => {
    books = JSON.parse(data)
  });
}
loadBooks()

const saveBooks = () => {
  let data = JSON.stringify(books)
  fs.writeFileSync(__dirname + '/' + 'books.json', data)
}

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

app.post('/book/:id', (req, res) => {
    // Reading id from the URL
    const id = parseInt(req.params.id) 
    const newBook = req.body

    // Update item to the books array
    for (let i = 0; i < books.length; i++) {
        let book = books[i]
        if (book.id === id) {
            books[i] = newBook
        }
    }
    saveBooks()
    res.send('Book was updated');
})

app.listen(port, () => 
  console.log(`Server listening on port ${port}`)
)