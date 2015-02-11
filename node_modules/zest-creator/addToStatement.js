'use strict';

module.exports = addToStatement;

var helper = require('./helper'),
    _      = require('lodash');

/**
 * Add a given statement to a parent statement.
 *
 * @param {object} stmt - Statement to be added.
 * @param {object} ele -  Parent's statement index.
 * @param {array} stmts - An array of statements present in ZC.
 */
function addToStatement (stmt, ele, stmts) {
  var parent = helper.getStatement(stmts, ele.parentIndex);

  switch (stmt.elementType) {
    case 'ZestResponse':
      parent[ele.subStatementOf] = stmt;
      break;

    default:
      if (! _.has(parent, ele.subStatementOf)) {
        parent[ele.subStatementOf] = [];
      }
      parent[ele.subStatementOf].push(stmt);

  }
}
