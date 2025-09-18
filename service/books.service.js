
const serviceCallResult = require("../responses/serviceCallResult.response");
const authorRepository = require("../repositoriy/books.repository");

const findAll = async (filters = {}) => {
    const { title } = filters;

    if (title) {
        const result = await authorRepository.findFiltered(title);
        return serviceCallResult.ok(result);
    }

    const result = await authorRepository.findAll();
    return serviceCallResult.ok(result);
};

const findOneById = async (id) => {
    const book = await authorRepository.findById(id);

    if (!book) return serviceCallResult.notFound(`book with id #${id} not found`);

    return serviceCallResult.ok(book);
};

const create = async (book = {}) => {
    const { title, author, release_year, author_id } = book;
    let error = "";

    if (title && author && release_year && author_id) {
        await authorRepository.create(book);
        return serviceCallResult.created();
    } else if (!title && !author && !release_year && !author_id)
        error = "book must have a title, author, release_year and author_id";
    else if (!title) error = "book must have a title";
    else if (!author) error = "book must have an author";
    else if (!release_year) error = "book must have a release_year";
    else if (!author_id) error = "book must have an author_id";

    return serviceCallResult.badRequest(error);
};
const update = async (id, newbook = {}) => {
    const book = await authorRepository.findById(id);

    if (!book) return serviceCallResult.notFound(`book with id #${id} not found`);

    await authorRepository.update(book, newbook);

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
