const model = require('../model/authors')

function getAll(req, res, next){
    const authors = model.getAll()
    return res.status(200).send({ data: authors.data })
}

function getOne(req, res, next){
    const author = model.getOne(req.params.id)
    if(author.data){
      return res.status(200).send({ data: author.data })
    }
    else if(author.error){
      return next({ status: 404, message: author.error })
    }
}

function create(req, res, next){
    if(!req.body.firstName && !req.body.lastName){
      return next({ status: 400, message:'Bad Request'})
    }
    const author = model.create(req.body.firstName, req.body.lastName)
    if(author.data){
      return res.status(201).send({ data: author.data })
    }
}

module.exports = { getAll, getOne, create }























