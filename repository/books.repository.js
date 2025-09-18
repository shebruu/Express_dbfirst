const {
    models: { Books },
} = require("../models");


const findAll = () => {
    return Books.findAll();
};

const findById = (id) => {
    return Books.findByPk(id);
};

const create = (data) => {
    return Books.create(data);
};

update = (currentBook, book) => {

    currentBook.title = book.title ?? currentBook.title;
    currentBook.description = book.description ?? currentBook.description;
    currentBook.release_year = book.release_year ?? currentBook.release_year;
    currentBook.author_id = book.author_id ?? currentBook.author_id;

    return currentBook.save();
};


const remove = (book) => {
    return book.destroy();
};

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove,
};
