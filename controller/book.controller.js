exports.getAllBooks = async (req, res, next) => {
  try {
    const books = await req.app.locals.models.book.findAll();
    res.json(books);
  } catch (err) {
    next(err);
  }
};

exports.getBookById = async (req, res, next) => {
  try {
    const foundBook = await req.app.locals.models.book.findByPk(req.params.id);
    if (!foundBook) return res.status(404).json({ error: 'Book not found' });
    res.json(foundBook);
  } catch (err) {
    next(err);
  }
};

exports.createBook = async (req, res, next) => {
  try {
    const newBook = await req.app.locals.models.book.create(req.body);
    res.status(201).json(newBook);
  } catch (err) {
    next(err);
  }
};

exports.updateBook = async (req, res, next) => {
  try {
    const book = req.app.locals.models.book;
    const [updated] = await book.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ error: 'Book not found' });
    const updatedBook = await book.findByPk(req.params.id);
    res.json(updatedBook);
  } catch (err) {
    next(err);
  }
};

exports.deleteBook = async (req, res, next) => {
  try {
    const deleted = await req.app.locals.models.book.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: 'Book not found' });
    res.json({ message: 'Book deleted' });
  } catch (err) {
    next(err);
  }
};
module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};