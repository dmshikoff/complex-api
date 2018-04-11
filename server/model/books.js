const fs = require('fs')
const path = require('path')
const shortid = require('shortid')
const file = path.join(__dirname, 'booksdb.json')

function getAll(){
    const contents = fs.readFileSync(file, 'utf-8')
    const books = JSON.parse(contents)
    
    return { data: books }
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

function create({name, borrowed, desc, authorName}){
    const contents = fs.readFileSync(file, 'utf-8')
    const books = JSON.parse(contents)
    const book = { id: shortid.generate(), name, borrowed, authorName }
    books.push(book)
    fs.writeFileSync(file, JSON.stringify(books))
  
    return { data: book }
}

function update(id, {name, authorID, borrowed, desc}){
    const contents = fs.readFileSync(file, 'utf-8')
    let books = JSON.parse(contents)
    const book = books.find(book => book.id === id)
    console.log(id, book, books)
  
    if(name){
        book.name = name
    }
    //pick up working here!!//
    if(authorID){
        book.authorName = authorName
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




module.exports = { getAll, getOne, create, update }