const model = require('../model/books')

//get all books//

function getAll(req, res, next){
    const books = model.getAll()
    return res.status(200).send({ data: books.data })
}

//get all authors of a particular book//

function getAllAuthorsOfABook( req, res, next){
    const authors = model.getAllAuthorsOfABook(req.params.id)
    console.log(authors)
    if(authors.data){
      return res.status(200).send({ data: authors.data })
    }
    else if(authors.error){
      return next({ status: 404, message: authors.error })
    }
}

//get one book//

function getOne(req, res, next){
    const book = model.getOne(req.params.id)
    if(book.data){
      return res.status(200).send({ data: book.data })
    }
    else if(book.error){
      return next({ status: 404, message: book.error })
    }
}

//get one author of a particular book//

function getOneAuthorOfABook( req, res, next){
  const author = model.getOneAuthorOfABook(req.params.id, req.params.authorId)
  if(author.data){
    return res.status(200).send({ data: author.data })
  }
  else{
    return next({ status: 404, message: author.error})
  }
}

//create an author from a book//
function createAuthorFromBook( req, res, next){
  const author = model.createAuthorFromBook(req.params.id, req.body)
  if(author.data){
    return res.status(200).send({ data: author.data })
  }
  else{
    return next({ status: 404, message: author.error})
  }
}

//create a book//

function create(req, res, next){
  let authorId = req.body.authorId
    if(authorId){
      authorId = authorId.split(',')
    }
    else{
      return next({status: 400, message:'requires author id'})
    }
    if(!req.body.name && !req.body.borrowed){
      return next({ status: 400, message:'Bad Request'})
    }
    if(authorId < 1){
        return next({status: 400, message:'requires author id'})
    }
    const book = model.create(req.body)
    if(book.data){
      return res.status(201).send({ data: book.data })
    }
}

//update a book//

function update(req, res, next){
  if(!req.body.name && !req.body.authorId && !req.body.borrowed && !req.body.desc){
    return next({ status: 400, message: "Please provide update data" })
  }
  const book = model.update(req.params.id, req.body)
  if(book.data){
    return res.status(200).send({ data: book.data })
  }
  else if(book.error) {
    return next({ status: 404, message: book.error })
  }
}

//updates an author through a book //

function updateAuthorFromBook( req, res, next) {
  if(!req.body.firstName && !req.body.lastName){
    return next({ status: 400, message: "Please provide update data" })
  }
  const author = model.updateAuthorFromBook(req.params.id, req.params.authorId, req.body)
  if(author.data){
    return res.status(200).send({ data: author.data})
  }
  else if(author.error) {
    return next({ status: 404, message: author.error })
  }
}

//removes an author id from book and also from author file if no other book has that author//

function removeAuthorFromBook(req, res, next){
  const book = model.removeAuthorFromBook(req.params.id, req.params.authorId)
  if(book.data){
    return res.status(200).send({ data: book.data })
  }
  else if(book.error){
      return next({ status: 404, message: book.error })
  }
}

//removes entire book//

function remove(req, res, next){
  const book = model.remove(req.params.id)
  if(book.data){
    return res.status(200).send({ data: book.data })
  }
  else if(book.error){
      return next({ status: 404, message: book.error })
  }
}





module.exports = { getAll, getOne, getAllAuthorsOfABook, getOneAuthorOfABook, createAuthorFromBook, updateAuthorFromBook, removeAuthorFromBook, create, update, remove }