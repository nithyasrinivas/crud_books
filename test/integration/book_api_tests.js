'use strict'

const request = require('supertest')
const app = require('../../app')
const Book = require('../../models/book')

function cleanUpDatabase(done){
  Book.fetchAll().then((books)=>{
    books.forEach((book) =>{
      book.destroy()
    })
    done()
  })
}

describe('Books', () => {

    beforeEach((done) => cleanUpDatabase(done))
    after((done) => cleanUpDatabase(done))

  describe('GET /books', () => {
    it('returns a list of books from database', (done) => {
      const testBook = { title: 'Test Title', author: 'Test Author' }

      Book.forge(testBook).save().then((book) =>{
        request(app).get('/books').end((req, res) => {
          expect(res.body[0].title).to.equal('Test Title')
          expect(res.body[0].author).to.equal('Test Author')
          done()
        })
      })
    })
  })

  describe('GET /books/:title', () => {
    it('returns a book of mentioned title', (done)=>{
      const testBook = { title: 'TestTitle', author: 'TestAuthor' }

      Book.forge(testBook).save().then((book) =>{
        request(app).get('/books/' + book.attributes.title).end((req, res) => {
          expect(res.body.title).to.equal('TestTitle')
          expect(res.body.author).to.equal('TestAuthor')
          done()
        })
      })
    })
  })

  describe('PUT /books', () => {
    it('updates book details', () =>{
      const testBook = { title: 'TestTitle', author: 'TestAuthor' }
      var UpdateBook = {title: 'UpdatedTitle', author: 'UpdatedAuthor'}
      Book.forge(testBook).save().then((book) =>{
        request(app).put('/books/' + book.attributes.title).send(UpdateBook).end( (req, res) => {
          expect(res.body.title).to.equal('UpdatedTitle')
          expect(res.body.author).to.equal('UpdatedAuthor')
          done()
        })
      })
    })
})

describe('DELETE /books/:title', () => {
  it('deletes book details', () =>{
    const testBook = { title: 'TestTitle', author: 'TestAuthor' }

    Book.forge(testBook).save().then((book) =>{
      request(app).delete('/books/' + book.attributes.title).send(testBook).end( (req, res) => {
        expect(res.body.title).to.be.undefined
        expect(res.body.author).to.be.undefined
        done()
      })
    })
  })
})
})
