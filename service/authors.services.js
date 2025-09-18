
const serviceCallResult = require("../responses/serviceCallResult");
const authorRepository = require("../repository/authors.repository");

const findAll = async (filters = {}) => {
    const { firstname } = filters;

    if (firstname) {
        const result = await authorRepository.findFiltered(firstname);
        return serviceCallResult.ok(result);
    }

    const result = await authorRepository.findAll();
    return serviceCallResult.ok(result);
};

const findOneById = async (id) => {
    const author = await authorRepository.findById(id);

    if (!author) return serviceCallResult.notFound(`author with id #${id} not found`);

    return serviceCallResult.ok(author);
};

const create = async (author = {}) => {
    const { firstname, lastname, birthdate } = author;
    let error = "";

    if (firstname && lastname && birthdate) {
        await authorRepository.create(author);
        return serviceCallResult.created();
    } else if (!firstname && !lastname && !birthdate)
        error = "author must have a firstname, lastname and birthdate";
    else if (!firstname) error = "author must have a firstname";
    else if (!lastname) error = "author must have a lastname";
    else if (!birthdate) error = "author must have a birthdate";

    return serviceCallResult.badRequest(error);
};
const update = async (id, newauthor = {}) => {
    const author = await authorRepository.findById(id);

    if (!author) return serviceCallResult.notFound(`author with id #${id} not found`);

    await authorRepository.update(author, newauthor);

    return serviceCallResult.noContent();
};

const remove = async (id) => {
    const author = await authorRepository.findById(id);

    if (!author) return serviceCallResult.notFound(`author with id #${id} not found`);

    await authorRepository.remove(author);
    return serviceCallResult.noContent();
};

module.exports = {
    findAll,
    findOneById,
    create,
    update,
    remove,
};
