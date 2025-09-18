const booksService = require("../service/books.services");
const apiCallResult = require("../responses/apiCallResult");

const findAll = async (req, res) => {

  const books = await booksService.findAll(req.query);
  apiCallResult(res, books);
};

const findOne = async (req, res) => {
  const foundBook = await booksService.findOneById(req.params.id);
  if (foundBook.status === 'error') {
    return res.status(404).json({ error: foundBook.message });
  }
  res.json(foundBook);
};

const create = async (req, res) => {
  const newBook = await booksService.create(req.body);
  return apiCallResult(res, newBook);
};

const update = async (req, res) => {
  const updatedBook = await booksService.update(req.params.id, req.body);
  return apiCallResult(res, updatedBook);
};


const remove = async (req, res) => {

  const result = await booksService.remove(req.params.id);
  return apiCallResult(res, result);
};
module.exports = {
  findAll,
  findOne,
  create,
  update,
  remove,
};