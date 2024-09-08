// ejemplo2_1.js
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
  res.json(books)
})

app.listen(port, () => 
  console.log(`Server listening on port ${port}`)
)