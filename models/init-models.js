var DataTypes = require("sequelize").DataTypes;
var _author = require("./author");
var _book = require("./book");

function initModels(sequelize) {
  var author = _author(sequelize, DataTypes);
  var book = _book(sequelize, DataTypes);

  book.belongsTo(author, { as: "author", foreignKey: "author_id"});
  author.hasMany(book, { as: "books", foreignKey: "author_id"});

  return {
    author,
    book,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
