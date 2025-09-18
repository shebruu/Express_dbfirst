const { Router } = require('express');
const router = Router();
const bookController = require('../controller/book.controller');

router.get('/', bookController.findAll);
router.get('/:id', bookController.findOne);
router.post('/', bookController.create);
router.put('/:id', bookController.update);
router.delete('/:id', bookController.remove);

module.exports = router;