const model = require('../model/books')

function getAll(req, res, next){
    const books = model.getAll()
    return res.status(200).send({ data: books.data })
}

function getOne(req, res, next){
    const book = model.getOne(req.params.id)
    if(book.data){
      return res.status(200).send({ data: book.data })
    }
    else if(book.error){
      return next({ status: 404, message: book.error })
    }
}

function create(req, res, next){
  let authorName = req.body.authorName
    if(authorName){
      authorName = authorName.split(',')
    }
    else{
      return next({status: 400, message:'requires author id'})
    }
    if(!req.body.name && !req.body.borrowed){
      return next({ status: 400, message:'Bad Request'})
    }
    if(authorName < 1){
        return next({status: 400, message:'requires author id'})
    }
    const book = model.create(req.body.name, req.body.borrowed, req.body.desc, req.body.authorName)
    if(book.data){
      return res.status(201).send({ data: book.data })
    }
}

module.exports = { getAll, getOne, create }