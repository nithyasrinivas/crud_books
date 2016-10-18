'use strict'

const db = require('../config/db')

const Book = db.Model.extend({
  tableName: 'books'
})

module.exports = Book
