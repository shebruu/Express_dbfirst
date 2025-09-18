
require("dotenv").config();
const express = require("express");
const { models, sequelize } = require('./models');

const { notFoundHandler, errorHandler } = require("./middelware/error")
const logger = require("./middelware/logger")

const app = express();

const authorsRoutes = require("./routes/authors.routes")
const booksRoute = require("./routes/books.routes")


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(logger)
app.use('/authors', authorsRoutes);
app.use('/books', booksRoute);


app.use(notFoundHandler);
app.use(errorHandler);



const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connexion à la base de données réussie.');
    app.listen(process.env.PORT, () =>
      console.log('App Running on port', process.env.PORT)
    );
  } catch (err) {
    console.error('Erreur de connexion à la base de données :', err);
    process.exit(1);
  }
};

startServer()