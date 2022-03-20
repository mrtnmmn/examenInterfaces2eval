import express from 'express';
var router = express.Router();

import * as controller from '../controller/word.js';

router.get('/', controller.getAll)
router.get('/:word', controller.findByWord)
router.post('/', controller.insert)
router.delete('/:id', controller.remove)
router.get('/:id', controller.getById)

export { router };
