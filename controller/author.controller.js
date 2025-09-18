const authorsService = require("../services/authors.services");
const apiCallResult = require("../responses/apiCallResult.response");


exports.findAll = async (req, res, next) => {
  try {
    const authors = await authorsService.findAll();
    res.json(authors);
  } catch (err) {
    next(err);
  }
};

exports.findOne = async (req, res, next) => {
  try {
    const foundAuthor = await authorsService.findOneById(req.params.id);
    if (!foundAuthor) return res.status(404).json({ error: 'Author not found' });
    res.json(foundAuthor);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const newAuthor = await authorsService.create(req.body);
    res.status(201).json(newAuthor);
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const updated = await authorsService.update(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: 'Author not found' });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res) => {

  const deleted = await authorsService.remove(req.params.id);
  return apiCallResult(res, result);
};

module.exports = {
  findAll,
  findOne,
  update,
  remove,
  create,
};
