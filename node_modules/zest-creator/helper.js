'use strict';

var JQL     = require('jsonquerylanguage'),
    jql     = new JQL(),
    Enum    = require('enum'),
    JefNode = require('json-easy-filter').JefNode;

function getStatement (stmts, index) {
  var result = jql.searchAndGetValues(stmts,
                                      '~[?(@.index == ' + index + ' )]');
  if (result == []) {
    return null;
  } else {
    return result[0];
  }
}
exports.getStatement = getStatement;

var ZestStatement = new Enum([
  'ZestComment', 'ZestRequest', 'ZestConditional', 'ZestActionPrint',
  'ZestActionFail', 'ZestActionSleep', 'ZestAssignString',
  'ZestAssignRandomInteger', 'ZestAssignFieldValue', 'ZestAssignReplace',
  'ZestAssignStringDelimiters', 'ZestAssignRegexDelimiters', 'ZestLoopString',
  // Experimental
  'ZestAssignCalc'
]);
exports.ZestStatement = ZestStatement;

function isSubStatement (statements, index) {
  var res = new JefNode(statements).filter(function (node) {
    if (node.value.index === index) {
      return node.parent.parent.value;
    }
  });
  if (!! res[0].index) {
    return true;
  } else {
    return false;
  }
}
exports.isSubStatement = isSubStatement;

function getParent (statements, index) {
  var res = new JefNode(statements).filter(function (node) {
    if (node.value.index === index) {
      return node.parent.parent.value;
    }
  });
  if (!! res[0].index) {
    return res[0];
  } else {
    return null;
  }
};
exports.getParent = getParent;

function getSubStmtIndex (stmts, stmt) {
  var index = stmts.map(function (obj, index) {
    if (obj.index == stmt.index) {
      return index;
    }
  }).filter(isFinite);
  return index[0];
}
exports.getSubStmtIndex = getSubStmtIndex;
