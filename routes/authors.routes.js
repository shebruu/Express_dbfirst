

const { Router } = require('express');
const router = Router();

//  injection author dans req.author
// router.use((req, res, next) => {
//   req.author = req.app.locals.models.author;
//   next();
// });


function getAuthorModel(req) {
  return req.app.locals.models.author;
}


router.get('/', async (req, res, next) => {
  try {
    const authors = await getAuthorModel(req).findAll();
    res.json(authors);
  } catch (err) {
    next(err);
  }
});



router.get('/:id', async (req, res, next) => {
  try {
    const foundAuthor = await getAuthorModel(req).findByPk(req.params.id);
    if (!foundAuthor) return res.status(404).json({ error: 'Author not found' });
    res.json(foundAuthor);
  } catch (err) {
    next(err);
  }
});



router.post('/', async (req, res, next) => {
  try {
    const newAuthor = await getAuthorModel(req).create(req.body);
    res.status(201).json(newAuthor);
  } catch (err) {
    next(err);
  }
});


router.get('/:id', async (req, res, next) => {
  try {
    const foundAuthor = await getAuthorModel(req).findByPk(req.params.id);
    if (!foundAuthor) return res.status(404).json({ error: 'Author not found' });
    res.json(foundAuthor);
  } catch (err) {
    next(err);
  }
});



router.put('/:id', async (req, res, next) => {
  try {
    const author=getAuthorModel(req);
    const [updated] = await author.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ error: 'Author not found' });
    const updatedAuthor = await author.findByPk(req.params.id);
    res.json(updatedAuthor);
  } catch (err) {
    next(err);
  }
});



router.delete('/:id', async (req, res, next) => {
  try {
    const deleted = await getAuthorModel(req).destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: 'Author not found' });
    res.json({ message: 'Author deleted' });
  } catch (err) {
    next(err);
  }
});




 module.exports = router
