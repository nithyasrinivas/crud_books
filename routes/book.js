'use strict'

const express = require('express')
const router = express.Router()

const Book = require('../models/book')

router.get('/', (req, res) =>{
  Book.fetchAll().then((books) =>{
    res.json(books)
  })
})

router.get('/:title', (req, res) =>{
  var title = req.params.title
  Book.forge(title).fetch().then((books) => {
    res.json(books)
  })
})

router.put('/:title', (req, res) => {
  var title = req.params.title
  console.log('Updated Details', req.body)
  Book.forge(title).save(UpdateDetails).then((books) => {
    res.json(books)
  })
})
router.delete('/:title', (req, res) => {
  var Deltitle = req.params.title
  console.log('Updated Details', req.body)
  Book.where('title:', Deltitle).destroy().then((books) => {
    res.json(books)
  })
})
module.exports = router
