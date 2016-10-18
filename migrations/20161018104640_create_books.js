
exports.up = function(knex, Promise) {
  return knex.schema.createTable('books', (table) =>{
    table.increments()
    table.string('title')
    table.string('author')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('books')
};
