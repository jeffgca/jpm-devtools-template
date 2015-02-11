'use strict';

module.exports = createStatement;

var _ = require('lodash');


/**
 * Create a zest statement from the given element properties.
 *
 * @param {object} ele - Object with element properties.
 *
 * @return {object} stmt - A zest statement.
 */
function createStatement (ele) {
  var stmt, properties;

  switch (ele.elementType) {
    case 'ZestComment':
      properties = _.pick(ele, 'comment', 'elementType');
      stmt = _.defaults(properties, {
        comment: 'None',
        index: ''
      });
      break;

    case 'ZestRequest':
      properties = _.pick(ele,
                          'url', 'data', 'method', 'headers',
                          'followRedirect', 'cookies', 'elementType');
      stmt = _.defaults(properties, {
        url: '',
        data: '',
        method: '',
        headers: '',
        response: {},
        assertions: [],
        followRedirect: false,
        cookies: [],
        index: ''
      });
      break;

    case 'ZestResponse':
      properties = _.pick(ele,
                          'url', 'headers', 'body', 'statusCode',
                          'responseTimeInMs', 'elementType');
      stmt = _.defaults(properties, {
        url: '',
        headers: '',
        body: '',
        statusCode: '',
        responseTimeInMs: '',
        elementType: ele.elementType
      });
      break;

    case 'ZestAssertion':
      stmt = _.pick(ele, 'rootExpression', 'elementType');
      break;

    case 'ZestExpressionStatusCode':
      properties = _.pick(ele, 'code', 'not', 'elementType');
      stmt = _.defaults(properties, {
        not: false
      });
      stmt = createExpression(stmt, ele);
      break;

    case 'ZestExpressionLength':
      properties = _.pick(ele,
                          'length', 'approx', 'variableName', 'not',
                          'elementType');
      stmt = _.defaults(properties, {
        approx: 1,
        not: false
      });
      stmt = createExpression(stmt, ele);
      break;

    case 'ZestExpressionRegex':
      properties = _.pick(ele,
                          'regex', 'variableName', 'caseExact', 'not',
                          'elementType');
      stmt = _.defaults(properties, {
        caseExact: false,
        not: false
      });
      stmt = createExpression(stmt, ele);
      break;

    case 'ZestExpressionURL':
      properties = _.pick(ele,
                          'includeRegexes', 'excludeRegexes', 'not',
                          'elementType');
      stmt = _.defaults(properties, {
        includeRegexes: [],
        excludeRegexes: [],
        not: false
      });
      stmt = createExpression(stmt, ele);
      break;

    case 'ZestExpressionEquals':
      properties = _.pick(ele,
                          'value', 'variableName', 'caseExact', 'not',
                          'elementType');
      stmt = _.defaults(properties, {
        value: '',
        caseExact: false,
        not: false
      });
      stmt = createExpression(stmt, ele);
      break;

    case 'ZestExpressionResponseTime':
      properties = _.pick(ele,
                          'greaterThan', 'timeInMs', 'not', 'elementType');
      stmt = _.defaults(properties, {
        greaterThan: true,
        not: false
      });
      stmt = createExpression(stmt, ele);
      break;

    case 'ZestExpressionIsInteger':
      properties = _.pick(ele,
                          'variableName', 'elementType');
      stmt = _.defaults(properties, {
        not: false
      });
      stmt = createExpression(stmt, ele);
      break;

    case 'ZestConditional':
      properties = _.pick(ele,
                          'rootExpression', 'ifStatements', 'elseStatements',
                          'elementType');
      stmt = _.defaults(properties, {
        ifStatements: [],
        elseStatements: [],
        index: ''
      });
      break;

    case 'ZestActionPrint':
      stmt = _.pick(ele, 'message', 'elementType');
      break;

    case 'ZestActionFail':
      stmt = _.pick(ele, 'message', 'priority', 'elementType');
      break;

    case 'ZestActionSleep':
      stmt = _.pick(ele, 'milliseconds', 'elementType');
      break;

    case 'ZestAssignString':
      stmt = _.pick(ele, 'string', 'variableName', 'elementType');
      break;

    case 'ZestAssignRandomInteger':
      properties = _.pick(ele,
                          'minInt', 'maxInt', 'variableName', 'elementType');
      stmt = _.defaults(properties, {
        minInt: 0,
        maxInt: 10000
      });
      break;

    case 'ZestFieldDefinition':
      properties = _.pick(ele, 'formIndex', 'fieldName', 'elementType');
      var field = {
        fieldDefinition: properties,
        variableName: ele.variableName,
        elementType: 'ZestAssignFieldValue'
      };
      stmt = createStatement(field);
      break;

    case 'ZestAssignFieldValue':
      stmt = _.pick(ele, 'fieldDefinition', 'variableName', 'elementType');
      break;

    case 'ZestAssignReplace':
      properties = _.pick(ele,
                          'replace', 'replacement', 'regex', 'caseExact',
                          'variableName', 'elementType');
      stmt = _.defaults(properties, {
        replace: '',
        replacement: '',
        regex: false,
        caseExact: false,
        variableName: ''
      });
      break;

    case 'ZestAssignStringDelimiters':
      stmt = _.pick(ele,
                    'prefix', 'postfix', 'location', 'variableName',
                    'elementType');
      break;

    case 'ZestAssignRegexDelimiters':
      stmt = _.pick(ele,
                    'prefix', 'postfix', 'location', 'variableName',
                    'elementType');
      break;

    case 'ZestLoopTokenStringSet':
      properties = _.pick(ele, 'tokens', 'elementType');
      var loopString = {
        set: properties,
        statements: [],
        variableName: ele.variableName,
        elementType: 'ZestLoopString'
      };
      stmt = createStatement(loopString);
      break;

    case 'ZestLoopString':
      stmt = _.pick(ele,
                    'set', 'statements', 'variableName', 'elementType');
      break;

    case 'ZestLoopTokenFileSet':
      properties = _.pick(ele, 'pathToFile', 'elementType');
      var loopFile = {
        set: properties,
        statements: [],
        variableName: ele.variableName,
        elementType: 'ZestLoopFile'
      };
      stmt = createStatement(loopFile);
      break;

    case 'ZestLoopFile':
      stmt = _.pick(ele,
                    'set', 'statements', 'variableName', 'elementType');
      break;

    case 'ZestLoopTokenIntegerSet':
      properties = _.pick(ele, 'start', 'end', 'step', 'elementType');
      var loopInteger = {
        set: properties,
        statements: [],
        variableName: ele.variableName,
        elementType: 'ZestLoopInteger'
      };
      stmt = createStatement(loopInteger);
      break;

    case 'ZestLoopInteger':
      stmt = _.pick(ele,
                    'set', 'statements', 'variableName', 'elementType');
      break;

    case 'ZestLoopTokenClientElementsSet':
      properties = _.pick(ele, 'type', 'element', 'elementType');
      var loopElements = {
        set: properties,
        statements: [],
        variableName: ele.variableName,
        elementType: 'ZestLoopClientElements'
      };
      stmt = createStatement(loopElements);
      break;

    case 'ZestLoopClientElements':
      stmt = _.pick(ele,
                    'set', 'statements', 'variableName', 'elementType');
      break;

    case 'ZestLoopTokenRegexSet':
      properties = _.pick(ele,
                          'inputVariableName', 'regex', 'groupIndex',
                          'caseExact', 'elementType');
      properties = _.defaults(properties, {
        groupIndex: 0,
        caseExact: false
      });
      var loopRegex = {
        set: properties,
        statements: [],
        variableName: ele.variableName,
        elementType: 'ZestLoopRegex'
      };
      stmt = createStatement(loopRegex);
      break;

    case 'ZestLoopRegex':
      stmt = _.pick(ele,
                    'set', 'statements', 'variableName', 'elementType');
      break;

    /* Experimental */
    case 'ZestAssignCalc':
      stmt = _.pick(ele,
                    'variableName', 'operandA', 'operandB', 'operation',
                    'elementType');
      break;

    /* -- end -- */

    default:
      stmt = null;
  }

  return stmt;
}

/**
 * Create expressions for assertions or conditionals.
 *
 * @param {object} stmt - rootExpression object.
 * @param {object} ele - raw data of the expression to be created.
 *
 * @return {object} stmt - an statement with expression within it.
 */
function createExpression (stmt, ele) {
  if (ele.subStatementOf === 'assertions') {
    var assertion = {
      rootExpression: stmt,
      elementType: 'ZestAssertion'
    };
    stmt = createStatement(assertion);
  } else {
    var condition = {
      rootExpression: stmt,
      elementType: 'ZestConditional'
    };
    stmt = createStatement(condition);
  }
  return stmt;
};
