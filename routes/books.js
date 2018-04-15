const express = require('express')
const router = express.Router()
const controller = require('../server/controller/books')

router.get('/', controller.getAll)
router.get('/:id', controller.getOne)
router.get('/:id/authors', controller.getAllAuthorsOfABook)
router.get('/:id/authors/:authorId', controller.getOneAuthorOfABook)
router.post('/', controller.create)
router.post('/:id/authors', controller.createAuthorFromBook)
router.put('/:id', controller.update)
router.put('/:id/authors/:authorId', controller.updateAuthorFromBook)
router.delete('/:id', controller.remove)

module.exports = router