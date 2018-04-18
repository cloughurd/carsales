exports.up = function(knex, Promise) {
  return Promise.all([
    knex.raw("alter table listings add fulltext(title)"),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.raw("alter table listings drop index title"),
  ]);
};
