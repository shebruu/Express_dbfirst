const {
    models: { Authors },
} = require("../models");


const findAll = () => {
    return Authors.findAll();
};

const findById = (id) => {
    return Authors.findByPk(id);
};

const create = (author) => {
    return Authors.create(author);
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
