
require("dotenv").config();
const express = require("express");
const {notFoundHandler,errorHandler} = require("./middelware/error")
const logger = require("./middelware/logger")


const app = express();
app.use(logger)

const { Sequelize } = require('sequelize');
const initModels = require('./models/init-models');
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
  }
);

const models = initModels(sequelize);
const { author, book } = models;


app.get("/", (req, res) => {
    console.log("GET /")
    res.send("Operation Done")
})

app.get('/authors', async (req, res, next) => {
  try {
    const authors = await author.findAll();
    res.json(authors);
  } catch (err) {
    next(err);
  }
});

app.get('/authors/:id', async (req, res, next) => {
  try {
    const foundAuthor = await author.findByPk(req.params.id);
    if (!foundAuthor) return res.status(404).json({ error: 'Author not found' });
    res.json(foundAuthor);
  } catch (err) {
    next(err);
  }
});

app.post('/authors', async (req, res, next) => {
  try {
    const newAuthor = await author.create(req.body);
    res.status(201).json(newAuthor);
  } catch (err) {
    next(err);
  }
});


app.use(notFoundHandler)
app.use(errorHandler)



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