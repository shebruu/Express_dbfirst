
require("dotenv").config();
const express = require("express");
const {notFoundHandler,errorHandler} = require("./middelware/error")
const logger = require("./middelware/logger")

const { Sequelize } = require('sequelize');
const initModels = require('./models/init-models');
const app = express();

const authorsRoutes = require("./routes/authors.routes")
const booksRoute = require("./routes/books.routes")


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(logger)
app.use('/authors', authorsRoutes);
app.use('/books', booksRoute);



const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
  }
);

// Initialisation des modèles et injection dans app.locals
const models = initModels(sequelize);
app.locals.models = models;


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