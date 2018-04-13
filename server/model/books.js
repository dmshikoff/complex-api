const fs = require('fs')
const path = require('path')
const shortid = require('shortid')
const file = path.join(__dirname, 'booksdb.json')


//get all books//

function getAll(){
    const contents = fs.readFileSync(file, 'utf-8')
    const books = JSON.parse(contents)
    
    return { data: books }
}

//get all authors of a particular book//
function getAllAuthorsOfABook(id){
    let book = getOne(id)
    console.log(book)
    if(book){
        return { data: book.data.authorId }
    }
    else{
        return { error: 'Book Not Found'}
    }
}

//get one author of a particular book//
function getOneAuthorOfABook(bookId, authorId){
    let book = getOne(bookId)
    if(book){
        let author = book.data.authorId.filter(author => author === authorId)
        if(author){
            return { data: author }
        }
        else{
            return { error: 'Author not found'}
        }
    }
    else{
        return { error: 'Book not found'}
    }
}

function getOne(id){
    const contents = fs.readFileSync(file, 'utf-8')
    const books = JSON.parse(contents)
    const book = books.find(book => book.id === id)
  
    if(book) {
      return { data: book }
    }
    else {
      return { error: 'Book Not Found'}
    }
}

function create({name, borrowed, desc, authorId}){
    const contents = fs.readFileSync(file, 'utf-8')
    const books = JSON.parse(contents)
    const book = { id: shortid.generate(), name, borrowed, authorId: authorId.split(',') }
    books.push(book)
    fs.writeFileSync(file, JSON.stringify(books))
  
    return { data: book }
}

function update(id, {name, authorId, borrowed, desc}){
    const contents = fs.readFileSync(file, 'utf-8')
    let books = JSON.parse(contents)
    const book = books.find(book => book.id === id)
    console.log(id, book, books)
  
    if(name){
        book.name = name
    }
    if(authorID ){
        book.authorId = authorId
    }
    if(borrowed && (borrowed === 'true' || borrowed === 'false')){
        book.borrowed = borrowed
    }
    if(desc){
        book.desc = desc
    }
    if (!book) {
      return { error: 'Book Not Found'}
    }
    fs.writeFileSync(file, JSON.stringify(books))
    return { data: book}
  }

function remove(id){
    const contents = fs.readFileSync(file, 'utf-8')
    let books = JSON.parse(contents)
    const book = books.find(book => book.id === id)
    
    if(book){
      books = books.filter(book => book.id !== id)
      delete book.id
      fs.writeFileSync(file, JSON.stringify(books))
      return { data: book}
    }
    else {
      return { error: "Book Not Found"}
    }
  }  



module.exports = { getAll, getOne, getAllAuthorsOfABook, getOneAuthorOfABook, create, update, remove }