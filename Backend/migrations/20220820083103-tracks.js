'use strict';

var dbm;
var type;
var seed;

exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db, callback) {
  db.createTable(
    'tracks',
    {
      columns: {
        id:
        {
          type: 'int',
          primaryKey: true,
          autoIncrement: true,
          notnull: true
        },
        title:
        {
          type: 'string',
          unique: true,
        },
        path:
        {
          type: 'string',
          unique: true,
        },
        duration:
        {
          type: 'dec',
          unique: false,
          notNull: true
        },
        artist:
        {
          type: 'string',
          notNull: true
        },
        album:
        {
          type: 'string',
          notNull: true
        },
        trackId:
        {
          type: 'int',
          notNull: true
        },
      },
      ifNotExists: true,
    },
    callback,
  );
};

exports.down = function(db, callback) {
  db.dropTable('tracks', callback);
};

exports._meta = {
  "version": 1
};
