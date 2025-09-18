

const { Router } = require('express');
const router = Router();
const authorController = require('../controller/author.controller');




router.get('/', authorController.findAll);
router.get('/:id', authorController.findOne);
router.post('/', authorController.create);
router.put('/:id', authorController.update);
router.delete('/:id', authorController.remove);






module.exports = router
