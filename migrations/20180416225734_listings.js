
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('listings', function(table) {
      table.integer('year');
      table.integer('miles');
      table.string('description', 1000);
    }),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('listings', function(table) {
      table.dropColumn('year');
      table.dropColumn('miles');
      table.dropColumn('description');
    }),
  ]);
};
