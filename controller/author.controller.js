const authorsService = require("../service/authors.service");
const apiCallResult = require("../responses/apiCallResult");

const findAll = async (req, res) => {
  const authors = await authorsService.findAll(req.query);
  return apiCallResult(res, authors);
};

const findOne = async (req, res) => {
  const result = await authorsService.findOneById(req.params.id);
  return apiCallResult(res, result);
};

const create = async (req, res) => {
  const result = await authorsService.create(req.body);
  return apiCallResult(res, result);
};

const update = async (req, res) => {
  const result = await authorsService.update(req.params.id, req.body);
  return apiCallResult(res, result);
};

const remove = async (req, res) => {
  const result = await authorsService.remove(req.params.id);
  return apiCallResult(res, result);
};

module.exports = {
  findAll,
  findOne,
  create,
  update,
  remove,
};
