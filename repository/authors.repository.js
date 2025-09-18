const { author } = require("../models");

const findAll = () => {
    return author.findAll();
};

const findById = (id) => {
    return author.findByPk(id);
};

const create = (author) => {
    return author.create(author);
};

update = (currentAuthor, author) => {

    currentAuthor.firstname = author.firstname ?? currentAuthor.firstname;
    currentAuthor.lastname = author.lastname ?? currentAuthor.lastname;
    currentAuthor.birthdate = author.birthdate ?? currentAuthor.birthdate;

    return currentAuthor.save();
};
const remove = (author) => {
    return author.destroy();
};

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove,
};
