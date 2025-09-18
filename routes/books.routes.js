const { Router } = require('express');
const router = Router();

function getBookModel(req) {
  return req.app.locals.models.book;
}

router.get('/', async (req, res, next) => {
  try {
    const books = await getBookModel(req).findAll();
    res.json(books);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const foundBook = await getBookModel(req).findByPk(req.params.id);
    if (!foundBook) return res.status(404).json({ error: 'Book not found' });
    res.json(foundBook);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const newBook = await getBookModel(req).create(req.body);
    res.status(201).json(newBook);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const book = getBookModel(req);
    const [updated] = await book.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ error: 'Book not found' });
    const updatedBook = await book.findByPk(req.params.id);
    res.json(updatedBook);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const deleted = await getBookModel(req).destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: 'Book not found' });
    res.json({ message: 'Book deleted' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;