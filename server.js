const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.json());

const port = process.env.PORT || 3001;

// Cargar los datos de JSON
const loadData = (filePath) => {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
};

// Guardar los datos en JSON
const saveData = (filePath, data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
};

// Rutas de archivos JSON
const booksFilePath = './books.json';
const authorsFilePath = './authors.json';
const publishersFilePath = './publishers.json';

// Cargar los datos
let books = loadData(booksFilePath);
let authors = loadData(authorsFilePath);
let publishers = loadData(publishersFilePath);

// ----------------- CRUD para Books -------------------
// GET - Obtener todos los libros
app.get('/books', (req, res) => {
  res.json(books);
});

// POST - Agregar un nuevo libro
app.post('/books', (req, res) => {
  const newBook = {
    id: books.length + 1,
    title: req.body.title,
    authorId: req.body.authorId,
    publisherId: req.body.publisherId
  };
  books.push(newBook);
  saveData(booksFilePath, books);
  res.status(201).json(newBook);
});

// PUT - Modificar un libro existente
app.put('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const bookIndex = books.findIndex((book) => book.id === bookId);
  if (bookIndex !== -1) {
    books[bookIndex] = {
      id: bookId,
      title: req.body.title,
      authorId: req.body.authorId,
      publisherId: req.body.publisherId
    };
    saveData(booksFilePath, books);
    res.json(books[bookIndex]);
  } else {
    res.status(404).send('Libro no encontrado');
  }
});

// DELETE - Eliminar un libro
app.delete('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const bookIndex = books.findIndex((book) => book.id === bookId);
  if (bookIndex !== -1) {
    books.splice(bookIndex, 1);
    saveData(booksFilePath, books);
    res.status(204).send();
  } else {
    res.status(404).send('Libro no encontrado');
  }
});

// ----------------- CRUD para Authors -------------------
// GET - Obtener todos los autores
app.get('/authors', (req, res) => {
  res.json(authors);
});

// POST - Agregar un nuevo autor
app.post('/authors', (req, res) => {
  const newAuthor = {
    id: authors.length + 1,
    name: req.body.name
  };
  authors.push(newAuthor);
  saveData(authorsFilePath, authors);
  res.status(201).json(newAuthor);
});

// PUT - Modificar un autor existente
app.put('/authors/:id', (req, res) => {
  const authorId = parseInt(req.params.id);
  const authorIndex = authors.findIndex((author) => author.id === authorId);
  if (authorIndex !== -1) {
    authors[authorIndex] = {
      id: authorId,
      name: req.body.name
    };
    saveData(authorsFilePath, authors);
    res.json(authors[authorIndex]);
  } else {
    res.status(404).send('Autor no encontrado');
  }
});

// DELETE - Eliminar un autor
app.delete('/authors/:id', (req, res) => {
  const authorId = parseInt(req.params.id);
  const authorIndex = authors.findIndex((author) => author.id === authorId);
  if (authorIndex !== -1) {
    authors.splice(authorIndex, 1);
    saveData(authorsFilePath, authors);
    res.status(204).send();
  } else {
    res.status(404).send('Autor no encontrado');
  }
});

// ----------------- CRUD para Publishers -------------------
// GET - Obtener todos los publishers
app.get('/publishers', (req, res) => {
  res.json(publishers);
});

// POST - Agregar un nuevo publisher
app.post('/publishers', (req, res) => {
  const newPublisher = {
    id: publishers.length + 1,
    name: req.body.name
  };
  publishers.push(newPublisher);
  saveData(publishersFilePath, publishers);
  res.status(201).json(newPublisher);
});

// PUT - Modificar un publisher existente
app.put('/publishers/:id', (req, res) => {
  const publisherId = parseInt(req.params.id);
  const publisherIndex = publishers.findIndex((publisher) => publisher.id === publisherId);
  if (publisherIndex !== -1) {
    publishers[publisherIndex] = {
      id: publisherId,
      name: req.body.name
    };
    saveData(publishersFilePath, publishers);
    res.json(publishers[publisherIndex]);
  } else {
    res.status(404).send('Editorial no encontrada');
  }
});

// DELETE - Eliminar un publisher
app.delete('/publishers/:id', (req, res) => {
  const publisherId = parseInt(req.params.id);
  const publisherIndex = publishers.findIndex((publisher) => publisher.id === publisherId);
  if (publisherIndex !== -1) {
    publishers.splice(publisherIndex, 1);
    saveData(publishersFilePath, publishers);
    res.status(204).send();
  } else {
    res.status(404).send('Editorial no encontrada');
  }
});

// ----------------- Asociar libros a autores -------------------
// PUT - Asociar un libro a un autor
app.put('/authors/:id/books', (req, res) => {
  const authorId = parseInt(req.params.id);
  const author = authors.find((author) => author.id === authorId);
  if (!author) {
    return res.status(404).send('Autor no encontrado');
  }

  const bookId = req.body.bookId;
  const book = books.find((book) => book.id === bookId);
  if (!book) {
    return res.status(404).send('Libro no encontrado');
  }

  book.authorId = authorId;
  saveData(booksFilePath, books);
  res.json(book);
});

// ----------------- Asociar libros a editoriales -------------------
// PUT - Asociar un libro a una editorial
app.put('/publishers/:id/books', (req, res) => {
  const publisherId = parseInt(req.params.id);
  const publisher = publishers.find((publisher) => publisher.id === publisherId);
  if (!publisher) {
    return res.status(404).send('Editorial no encontrada');
  }

  const bookId = req.body.bookId;
  const book = books.find((book) => book.id === bookId);
  if (!book) {
    return res.status(404).send('Libro no encontrado');
  }

  book.publisherId = publisherId;
  saveData(booksFilePath, books);
  res.json(book);
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
