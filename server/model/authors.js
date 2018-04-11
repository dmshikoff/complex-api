const fs = require('fs')
const path = require('path')
const shortid = require('shortid')
const file = path.join(__dirname, 'db.json')

function getAll(){
    const contents = fs.readFileSync(file, 'utf-8')
    const authors = JSON.parse(contents)
    
    return { data: authors }
}

function getOne(id){
    const contents = fs.readFileSync(file, 'utf-8')
    const authors = JSON.parse(contents)
    const author = authors.find(author => author.id === id)
  
    if(author) {
      return { data: author }
    }
    else {
      return { error: 'Author Not Found'}
    }
}

function create(firstName, lastName){
    const contents = fs.readFileSync(file, 'utf-8')
    const authors = JSON.parse(contents)
  
    const author = { id: shortid.generate(), firstName, lastName }
    authors.push(author)
    fs.writeFileSync(file, JSON.stringify(authors))
  
    return { data: author }
}
























module.exports = { getAll, getOne, create, update, remove }