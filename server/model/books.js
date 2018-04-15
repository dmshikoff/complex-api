const fs = require('fs')
const path = require('path')
const shortid = require('shortid')
const file = path.join(__dirname, 'booksdb.json')
const authorFile = path.join(__dirname, 'authorsdb.json')


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

//get one particular book//

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

//create an author from a particular book//

function createAuthorFromBook(id, body){
    const books = getAll()
    const book = books.data.find(book => book.id === id)
    const authorContents = fs.readFileSync(authorFile, 'utf-8')
    const authors = JSON.parse(authorContents)
    if(body.firstName){
        var firstName = body.firstName
    }
    else{
        return { error: 'Missing author first name'}
    }
    if(body.lastName){
        var lastName = body.lastName
    }
    else{
        return { error: 'Missing author last name'}
    }
    if(book){
        const newAuthorId = shortid.generate()
        const author = { firstName, lastName, id: newAuthorId }
        book.authorId.push(newAuthorId)
        fs.writeFileSync(file, JSON.stringify(books.data))
        authors.push(author)
        fs.writeFileSync(authorFile, JSON.stringify(authors))
  
    return { data: book }
    }
    
}

//create one book//

function create({name, borrowed, desc, authorId}){
    const contents = fs.readFileSync(file, 'utf-8')
    const books = JSON.parse(contents)
    const book = { id: shortid.generate(), name, borrowed, authorId: authorId.split(',') }
    books.push(book)
    fs.writeFileSync(file, JSON.stringify(books))
  
    return { data: book }
}

//update a book//

function update(id, {name, authorId, borrowed, desc}){
    const contents = fs.readFileSync(file, 'utf-8')
    let books = JSON.parse(contents)
    const book = books.find(book => book.id === id)
  
    if(name){
        book.name = name
    }
    if(authorId ){
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

// update an author from a book//

function updateAuthorFromBook(bookId, authorId, body){
    const authContents = fs.readFileSync(authorFile, 'utf-8')
    let authors = JSON.parse(authContents)
    let author = authors.find(author => author.id === authorId)
    let index = authors.indexOf(author)
    if(body.firstName){
        author.firstName = body.firstName
    }
    if(body.lastyName){
        author.lastName = body.lastName
    }
    authors.splice(index, 1, author)
    fs.writeFileSync(authorFile, JSON.stringify(authors))
    return { data: author}
}
//removes an author id from book and also from author file if no other book has that author//

function removeAuthorFromBook(bookId, authorId){
    const contents = fs.readFileSync(file, 'utf-8')
    const books = JSON.parse(contents)
    const book = books.find(book => book.id === bookId)
    if(book){
        book.authorId.splice(book.authorId.indexOf(authorId), 1)
        fs.writeFileSync(file, JSON.stringify(books))
        if(!(books.find(obj => obj.authorId.includes(authorId)))){
            var authorContents = fs.readFileSync(authorFile, 'utf-8')
            var authors = JSON.parse(authorContents)
            var author = authors.find(author => author.id === authorId)
            if(author){
                authors.splice(authors.indexOf(author), 1)
                fs.writeFileSync(authorFile, JSON.stringify(authors))
                return { data: book}
            }
            else{
                return { error: "Author Not Found"}
            }
        }
    }
    else{
        return { error: "Book Not Found"}
    }
}

// remove a book //

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



module.exports = { getAll, getOne, getAllAuthorsOfABook, getOneAuthorOfABook, createAuthorFromBook, updateAuthorFromBook, removeAuthorFromBook, create, update, remove }