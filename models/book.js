const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('book', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    release_year: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    author_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'author',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'book',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "book_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
