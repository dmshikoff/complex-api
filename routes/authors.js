const express = require('express')
const router = express.Router()
const controller = require('../server/controller/authors')

router.get('/', controller.getAll)
router.get('/:id', controller.getOne)
router.post('/', controller.create)

module.exports = router