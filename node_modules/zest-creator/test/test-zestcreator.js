'use strict';

var ZestCreator = require('../'),
    should = require('should'),
    _      = require('lodash');

var opts = {
  title: 'my zest',
  description: 'a little zest script',
  client: 'test client',
  author: 'mocha'
};

var sampleReq = {
  url: 'http://foo.com',
  method: 'GET',
  elementType: 'ZestRequest'
};

var sampleRes = {
  url: 'http://bar.com',
  body: 'qwerty',
  statusCode: 200,
  responseTimeInMs: 222,
  elementType: 'ZestResponse',
  subStatementOf: 'response'
};

var sampleExpressionStatusCode = {
  code: 200,
  not: false,
  elementType: 'ZestExpressionStatusCode'
};

var sampleExpressionLength = {
  length: 10,
  approx: 1,
  variableName: 'request.url',
  elementType: 'ZestExpressionLength'
};

var sampleExpressionRegex = {
  regex: '/^foo/',
  variableName: 'response.body',
  elementType: 'ZestExpressionRegex'
};

var sampleExpressionIsInteger = {
  elementType: 'ZestExpressionIsInteger'
};

var sampleExpressionURL = {
  includeRegexes: '/.com$/',
  excludeRegexes: '/.net$/',
  elementType: 'ZestExpressionURL'
};

var sampleExpressionEquals = {
  value: 'GET',
  variableName: 'request.method',
  elementType: 'ZestExpressionEquals'
};

var sampleExpressionResponseTime = {
  timeInMs: 5,
  elementType: 'ZestExpressionResponseTime'
};

var sampleCondition = {
  rootExpression: {
    value: 'GET',
    variableName: 'request.method',
    caseExact: false,
    not: false,
    elementType: 'ZestExpressionEquals'
  },
  ifStatements: [],
  elseStatements: [],
  elementType: 'ZestConditional'
};

var sampleActionPrint = {
  message: 'Pass',
  elementType: 'ZestActionPrint'
};

var sampleActionFail = {
  message: 'Fail',
  priority: 'HIGH',
  elementType: 'ZestActionFail'
};

var sampleActionSleep = {
  milliseconds: 2,
  elementType: 'ZestActionSleep'
};

var sampleAssignString = {
  string: 'Mr. Zest',
  variableName: 'name',
  elementType: 'ZestAssignString'
};

var sampleAssignRandomInteger = {
  minInt: 5,
  maxInt: 15,
  variableName: 'var1',
  elementType: 'ZestAssignRandomInteger'
};

var sampleFieldDefinition = {
  formIndex: 0,
  fieldName: 'roll',
  elementType: 'ZestFieldDefinition'
};

var sampleAssignReplace = {
  replace: 'name',
  replacement: 'face',
  variableName: 'name',
  elementType: 'ZestAssignReplace'
};

var sampleAssignStringDelimiters = {
  prefix: 'tt',
  postfix: 'cc',
  location: 'HEAD',
  variableName: 'bb',
  elementType: 'ZestAssignStringDelimiters'
};

var sampleAssignRegexDelimiters = {
  prefix: 'gg',
  postfix: 'zz',
  location: 'HEAD',
  variableName: 'dd',
  elementType: 'ZestAssignRegexDelimiters'
};

var sampleLoopTokenStringSet = {
  tokens: ['22', 'foo', 'bar'],
  elementType: 'ZestLoopTokenStringSet'
};

var sampleLoopTokenFileSet = {
  pathToFile: '/path/to/fuzzer',
  elementType: 'ZestLoopTokenFileSet'
};

var sampleLoopTokenIntegerSet = {
  start: 10,
  end: 30,
  step: 5,
  elementType: 'ZestLoopTokenIntegerSet'
};

var sampleLoopTokenClientElementsSet = {
  type: 'cssselector',
  element: 'foobar',
  elementType: 'ZestLoopTokenClientElementsSet'
};

var sampleAssignCalc = {
  elementType: 'ZestAssignCalc'
};


describe('create a ZestCreator object', function () {
  it('should create an object with default config', function () {
    var zc = new ZestCreator();
    zc.config.should.have.properties('title', 'description', 'client',
                                     'author');
  });

  it('should create an object with the given config', function () {
    var zc = new ZestCreator(opts);
    zc.config.should.have.properties({
      title: 'my zest',
      description: 'a little zest script',
      client: 'test client',
      author: 'mocha'
    });
  });
});

describe('ZC basic testing', function () {
  var zc = new ZestCreator(opts);

  describe('getZest', function () {
    it('should return proper zest object', function () {
      var r = zc.getZest();
      r.should.have.properties({
        about: 'About text',
        zestVersion: '1.0',
        title: 'my zest',
        description: 'a little zest script',
        author: 'mocha',
        generatedBy: 'test client',
        index: 0,
        enabled: true,
        elementType: 'ZestScript'
      });
      zc.statementCount.should.be.exactly(0);
    });
  });

  describe('create zest statements', function () {
    it('should create 2 zest comment statements', function () {
      zc.addStatement({ comment: 'A comment', elementType: 'ZestComment' });
      zc.addStatement({ comment: 'another one', elementType: 'ZestComment'});
      var stmt1 = zc.getStatement(1);
      stmt1.should.have.properties({
        comment: 'A comment',
        index: 1,
        enabled: true,
        elementType: 'ZestComment'
      });
      var stmt2 = zc.getStatement(2);
      stmt2.should.have.properties({
        comment: 'another one',
        index: 2,
        enabled: true,
        elementType: 'ZestComment'
      });
      zc.statementCount.should.be.exactly(2);
    });

    it('should create request statement', function () {
      zc.addStatement(sampleReq);
      var resObj = _.clone(sampleRes);
      resObj.parentIndex = zc.statementCount; 
      zc.addStatement(resObj);

      var stmt = zc.getStatement(zc.statementCount);
      stmt.should.have.properties({
        url: 'http://foo.com',
        data: '',
        method: 'GET',
        headers: '',
        cookies: [],
        index: 3,
        enabled: true,
        elementType: 'ZestRequest'
      });
      stmt.response.should.have.properties({
        url: 'http://bar.com',
        body: 'qwerty',
        statusCode: 200,
        responseTimeInMs: 222,
        elementType: 'ZestResponse'
      });
      zc.statementCount.should.be.exactly(3);
    });

    it('should create ExpressionStatusCode assertion statement', function () {
      var expStatCode = _.clone(sampleExpressionStatusCode);
      expStatCode.subStatementOf = 'assertions';
      expStatCode.parentIndex = zc.statementCount;
      zc.addStatement(expStatCode);
      var stmt = zc.getStatement(zc.statementCount);
      stmt.assertions[0].rootExpression.should.have.properties({
        code: 200,
        not: false,
        elementType: 'ZestExpressionStatusCode'
      });
      stmt.assertions[0].should.have.property('elementType', 'ZestAssertion');
      zc.statementCount.should.be.exactly(3);
    });

    it('should create ExpressionLength assertion statement', function () {
      var expLength = _.clone(sampleExpressionLength);
      expLength.subStatementOf = 'assertions';
      expLength.parentIndex = zc.statementCount;
      zc.addStatement(expLength);
      var stmt = zc.getStatement(zc.statementCount);
      stmt.assertions[1].rootExpression.should.have.properties({
        length: 10,
        approx: 1,
        variableName: 'request.url',
        not: false,
        elementType: 'ZestExpressionLength'
      });
    });

    it('should create ExpressionRegex assertion statement', function () {
      var expRegex = _.clone(sampleExpressionRegex);
      expRegex.subStatementOf = 'assertions';
      expRegex.parentIndex = zc.statementCount;
      zc.addStatement(expRegex);
      var stmt = zc.getStatement(zc.statementCount);
      stmt.assertions[2].rootExpression.should.have.properties({
        regex: '/^foo/',
        variableName: 'response.body',
        caseExact: false,
        not: false,
        elementType: 'ZestExpressionRegex'
      });
    });

    it('should create ExpressionIsInteger expression', function () {
      var expIsInteger = _.clone(sampleExpressionIsInteger);
      expIsInteger.variableName = 'foo99';
      expIsInteger.subStatementOf = 'assertions';
      expIsInteger.parentIndex = zc.statementCount;
      zc.addStatement(expIsInteger);
      var stmt = zc.getStatement(zc.statementCount);
      stmt.assertions[3].rootExpression.should.have.properties({
        elementType: 'ZestExpressionIsInteger',
        not: false,
        variableName: 'foo99'
      });
    });

    it('should create conditional statement', function () {
      zc.addStatement(sampleCondition);
      var stmt = zc.getStatement(zc.statementCount);
      stmt.should.have.properties(sampleCondition);

      var actionPrint = _.clone(sampleActionPrint);
      actionPrint.subStatementOf = 'ifStatements';
      var index = zc.statementCount;
      actionPrint.parentIndex = index;
      actionPrint.message = 'Pass inside conditional';
      zc.addStatement(actionPrint);

      var actionFail = _.clone(sampleActionFail);
      actionFail.subStatementOf = 'elseStatements';
      actionFail.parentIndex = index;
      zc.addStatement(actionFail);

      var actionSleep = _.clone(sampleActionSleep);
      actionSleep.subStatementOf = 'ifStatements';
      actionSleep.parentIndex = index;
      zc.addStatement(actionSleep);

      var expectedIf = {
        message: 'Pass inside conditional',
        elementType: 'ZestActionPrint',
        index: 5,
        enabled: true
      };
      var expectedIf2 = {
        milliseconds: 2,
        elementType: 'ZestActionSleep',
        index: 6,
        enabled: true
      };
      var expectedElse = {
        message: 'Fail',
        priority: 'HIGH',
        elementType: 'ZestActionFail',
        index: 7,
        enabled: true
      };

      stmt = zc.getStatement(5);
      stmt.should.have.properties(expectedIf);
      stmt = zc.getStatement(6);
      stmt.should.have.properties(expectedIf2);
      stmt = zc.getStatement(7);
      stmt.should.have.properties(expectedElse);
      zc.statementCount.should.be.exactly(7);

      // Add a statement to the end and a sub stmt to the conditional
      zc.addStatement({ comment: 'again', elementType: 'ZestComment' });
      actionSleep = _.clone(sampleActionSleep);
      actionSleep.subStatementOf = 'ifStatements';
      actionSleep.milliseconds = 5;
      actionSleep.parentIndex = 4;
      zc.addStatement(actionSleep);

      expectedIf = {
        milliseconds: 5,
        elementType: 'ZestActionSleep',
        index: 7,
        enabled: true
      };

      stmt = zc.getStatement(7);
      stmt.should.have.properties(expectedIf);
      zc.statementCount.should.be.exactly(9);
    });

    it('should create status code conditional stmt', function () {
      zc.addStatement(sampleExpressionStatusCode);
      var stmt = zc.getStatement(10);
      stmt.rootExpression.should.have.properties({
        code: 200,
        not: false,
        elementType: 'ZestExpressionStatusCode'
      });
      stmt.should.have.properties({
        elementType: 'ZestConditional',
        index: 10,
        enabled: true
      });
      zc.statementCount.should.be.exactly(10);
    });

    it('should create expression length conditional stmt', function () {
      zc.addStatement(sampleExpressionLength);
      var stmt = zc.getStatement(11);
      stmt.rootExpression.should.have.properties({
        length: 10,
        approx: 1,
        variableName: 'request.url',
        elementType: 'ZestExpressionLength',
        not: false
      });
      stmt.should.have.properties({
        elementType: 'ZestConditional',
        index: 11,
        enabled: true
      });
      zc.statementCount.should.be.exactly(11);
    });

    it('should create regex conditional stmt', function () {
      zc.addStatement(sampleExpressionRegex);
      var stmt = zc.getStatement(12);
      stmt.rootExpression.should.have.properties({
        regex: '/^foo/',
        variableName: 'response.body',
        elementType: 'ZestExpressionRegex',
        caseExact: false,
        not: false
      });
      stmt.should.have.properties({
        elementType: 'ZestConditional',
        index: 12,
        enabled: true
      });
      zc.statementCount.should.be.exactly(12);
    });

    it('should create conditional ExpressionURL stmt', function () {
      zc.addStatement(sampleExpressionURL);
      var stmt = zc.getStatement(13);
      stmt.rootExpression.should.have.properties({
        includeRegexes: '/.com$/',
        excludeRegexes: '/.net$/',
        not: false,
        elementType: 'ZestExpressionURL'
      });
      stmt.should.have.properties({
        elementType: 'ZestConditional',
        index: 13,
        enabled: true
      });
      zc.statementCount.should.be.exactly(13);
    });

    it('should create conditional ExpressionEquals stmt', function () {
      zc.addStatement(sampleExpressionEquals);
      var stmt = zc.getStatement(14);
      stmt.rootExpression.should.have.properties({
        value: 'GET',
        variableName: 'request.method',
        elementType: 'ZestExpressionEquals',
        caseExact: false,
        not: false
      });
      stmt.should.have.properties({
        elementType: 'ZestConditional',
        index: 14,
        enabled: true
      });
      zc.statementCount.should.be.exactly(14);
    });

    it('should create conditional ExpressionResponseTime', function () {
      zc.addStatement(sampleExpressionResponseTime);
      var stmt = zc.getStatement(15);
      stmt.rootExpression.should.have.properties({
        timeInMs: 5,
        greaterThan: true,
        not: false,
        elementType: 'ZestExpressionResponseTime'
      });
      stmt.should.have.properties({
        elementType: 'ZestConditional',
        index: 15,
        enabled: true
      });
      zc.statementCount.should.be.exactly(15);
    });

    it('should create AssignString stmt', function () {
      zc.addStatement(sampleAssignString);
      var stmt = zc.getStatement(16);
      stmt.should.have.properties({
        string: 'Mr. Zest',
        variableName: 'name',
        elementType: 'ZestAssignString',
        index: 16,
        enabled: true
      });
      zc.statementCount.should.be.exactly(16);
    });

    it('should create AssignRandomInteger stmt', function () {
      zc.addStatement(sampleAssignRandomInteger);
      var stmt = zc.getStatement(17);
      stmt.should.have.properties({
        minInt: 5,
        maxInt: 15,
        variableName: 'var1',
        elementType: 'ZestAssignRandomInteger',
        index: 17,
        enabled: true
      });
      zc.statementCount.should.be.exactly(17);
    });

    it('should create AssignFieldValue stmt', function () {
      var fieldDefinition = _.clone(sampleFieldDefinition);
      fieldDefinition.variableName = 'rr';
      zc.addStatement(fieldDefinition);
      var stmt = zc.getStatement(18);
      stmt.fieldDefinition.should.have.properties({
        formIndex: 0,
        fieldName: 'roll',
        elementType: 'ZestFieldDefinition'
      });
      stmt.should.have.properties({
        variableName: 'rr',
        index: 18,
        enabled: true,
        elementType: 'ZestAssignFieldValue'
      });
      zc.statementCount.should.be.exactly(18);
    });

    it('should create AssignReplace stmt', function () {
      zc.addStatement(sampleAssignReplace);
      var stmt = zc.getStatement(19);
      stmt.should.have.properties({
        replace: 'name',
        replacement: 'face',
        variableName: 'name',
        regex: false,
        caseExact: false,
        index: 19,
        enabled: true,
        elementType: 'ZestAssignReplace'
      });
      zc.statementCount.should.be.exactly(19);
    });

    it('should create AssignStringDelimiters stmt', function () {
      zc.addStatement(sampleAssignStringDelimiters);
      var stmt = zc.getStatement(20);
      stmt.should.have.properties({
        prefix: 'tt',
        postfix: 'cc',
        location: 'HEAD',
        variableName: 'bb',
        index: 20,
        enabled: true,
        elementType: 'ZestAssignStringDelimiters'
      });
      zc.statementCount.should.be.exactly(20);
    });

    it('should create AssignRegexDelimiters stmt', function () {
      zc.addStatement(sampleAssignRegexDelimiters);
      var stmt = zc.getStatement(21);
      stmt.should.have.properties({
        prefix: 'gg',
        postfix: 'zz',
        location: 'HEAD',
        variableName: 'dd',
        index: 21,
        enabled: true,
        elementType: 'ZestAssignRegexDelimiters'
      });
      zc.statementCount.should.be.exactly(21);
    });

    it('should create ZestLoopString stmt', function () {
      var stringSet = _.clone(sampleLoopTokenStringSet);
      stringSet.variableName = 'gg';
      zc.addStatement(stringSet);
      var stmt = zc.getStatement(22);
      stmt.set.should.have.properties({
        tokens: ['22', 'foo', 'bar'],
        elementType: 'ZestLoopTokenStringSet'
      });
      stmt.should.have.properties({
        statements: [],
        variableName: 'gg',
        elementType: 'ZestLoopString'
      });
      zc.statementCount.should.be.exactly(22);
    });

    it('should add statements to ZestLoopString', function () {
      var aComment = { comment: 'A comment', elementType: 'ZestComment' };
      aComment.subStatementOf = 'statements';
      var index = zc.statementCount;
      aComment.parentIndex = index;
      zc.addStatement(aComment);
      var stmt = zc.getStatement(23);
      stmt.should.have.properties({
        comment: 'A comment',
        elementType: 'ZestComment',
        index: 23,
        enabled: true
      });
      zc.statementCount.should.be.exactly(23);

      // Add a ZestActionPrint stmt
      var actionPrint = _.clone(sampleActionPrint);
      actionPrint.subStatementOf = 'statements';
      actionPrint.parentIndex = index;
      zc.addStatement(actionPrint);
      stmt = zc.getStatement(24);
      stmt.should.have.properties({
        message: 'Pass',
        elementType: 'ZestActionPrint',
        index: 24,
        enabled: true
      });
      zc.statementCount.should.be.exactly(24);

      // Add an stmt after the Loop and then add another stmt in loop stmts
      zc.addStatement({ comment: 'comment', elementType: 'ZestComment'});
      stmt = zc.getStatement(25);
      stmt.should.have.properties({
        comment: 'comment',
        elementType: 'ZestComment',
        index: 25,
        enabled: true
      });
      zc.statementCount.should.be.exactly(25);

      zc.addStatement(aComment);
      stmt = zc.getStatement(25);
      stmt.should.have.properties({
        comment: 'A comment',
        elementType: 'ZestComment',
        index: 25,
        enabled: true
      });
      zc.statementCount.should.be.exactly(26);

      // Add a conditional stmt to loop stmts
      var expEquals = _.clone(sampleExpressionEquals);
      expEquals.subStatementOf = 'statements';
      expEquals.parentIndex = index;
      zc.addStatement(expEquals);
      stmt = zc.getStatement(26);
      stmt.rootExpression.should.have.properties({
        value: 'GET',
        variableName: 'request.method',
        elementType: 'ZestExpressionEquals',
        caseExact: false,
        not: false
      });
      stmt.should.have.properties({
        elementType: 'ZestConditional',
        index: 26,
        enabled: true
      });
      zc.statementCount.should.be.exactly(27);
    });

    it('should create ZestLoopFile stmt', function () {
      var fileSet = _.clone(sampleLoopTokenFileSet);
      fileSet.variableName = 'var9';
      zc.addStatement(fileSet);
      var stmt = zc.getStatement(28);
      stmt.set.should.have.properties({
        pathToFile: '/path/to/fuzzer',
        elementType: 'ZestLoopTokenFileSet'
      });
      stmt.should.have.properties({
        statements: [],
        variableName: 'var9',
        index: 28,
        enabled: true,
        elementType: 'ZestLoopFile'
      });
      zc.statementCount.should.be.exactly(28);
    });

    it('should create ZestLoopInteger stmt', function () {
      var integerSet = _.clone(sampleLoopTokenIntegerSet);
      integerSet.variableName = 'var8';
      zc.addStatement(integerSet);
      var stmt = zc.getStatement(29);
      stmt.set.should.have.properties({
        start: 10,
        end: 30,
        step: 5,
        elementType: 'ZestLoopTokenIntegerSet'
      });
      stmt.should.have.properties({
        statements: [],
        variableName: 'var8',
        index: 29,
        enabled: true,
        elementType: 'ZestLoopInteger'
      });
      zc.statementCount.should.be.exactly(29);
    });

    it('should create ZestLoopClientElements', function () {
      var elementsSet = _.clone(sampleLoopTokenClientElementsSet);
      elementsSet.variableName = 'var7';
      zc.addStatement(elementsSet);
      var stmt = zc.getStatement(30);
      stmt.set.should.have.properties({
        type: 'cssselector',
        element: 'foobar',
        elementType: 'ZestLoopTokenClientElementsSet'
      });
      stmt.should.have.properties({
        statements: [],
        variableName: 'var7',
        index: 30,
        enabled: true,
        elementType: 'ZestLoopClientElements'
      });
      zc.statementCount.should.be.exactly(30);
      zc.addStatement({comment: 'Over', elementType: 'ZestComment'});
    });

    it('should create ZestAssignCalc', function () {
      var elementCalc = _.clone(sampleAssignCalc);
      elementCalc.variableName = 'var10';
      elementCalc.operandA = 'a';
      elementCalc.operandB = 3;
      elementCalc.operation = 'add';
      zc.addStatement(elementCalc);
      var stmt = zc.getStatement(32);
      stmt.should.have.properties({
        variableName: 'var10',
        operandA: 'a',
        operandB: 3,
        operation: 'add',
        elementType: 'ZestAssignCalc',
        index: 32,
        enabled: true
      });
      zc.statementCount.should.be.exactly(32);
    });
  });

  describe('add in between', function () {
    it('should add stmt in between the existing stmts', function () {
      var stmt = {comment: 'New comment', elementType: 'ZestComment',
                  after: 2};
      zc.addStatement(stmt);
      stmt = zc.getStatement(3);
      stmt.should.have.properties({
        comment: 'New comment',
        elementType: 'ZestComment',
        index: 3,
        enabled: true
      });
      zc.statementCount.should.be.exactly(33);
    });
  });

  describe('get next statement', function () {
    it('should get correct next statement', function () {
      var stmt = zc.getStatement(2);
      stmt.index.should.be.exactly(2);
      stmt = zc.nextStatement(stmt);
      stmt.index.should.be.exactly(3);
    });
  });


  // NOTE: Move these tests to a separate file
  describe('get move statement', function () {
    it('shuold move first stmt to thrid stmt', function () {
      var stmtBefore = zc.getStatement(1);
      zc.move(1, 3);
      var stmtAfter = zc.getStatement(3);
      stmtBefore.should.have.properties({
        comment: stmtAfter.comment,
        elementType: stmtAfter.elementType,
        enabled: stmtAfter.enabled
      });
    });

    it('should move from if substmt block to loop block', function () {
      var stmtBefore = zc.getStatement(6);
      zc.move(6, 24);
      var stmtAfter = zc.getStatement(24);
      stmtBefore.should.have.properties({
        message: stmtAfter.message,
        elementType: stmtAfter.elementType,
        enabled: stmtAfter.enabled
      });
    });

    it('should move from if to else block', function () {
      var stmtBefore = zc.getStatement(6);
      zc.move(6, 8);
      var stmtAfter = zc.getStatement(8);
      stmtBefore.should.have.properties({
        milliseconds: stmtAfter.milliseconds,
        elementType: stmtAfter.elementType,
        enabled: stmtAfter.enabled
      });
    });

    it('should move from else subStmt block to loop block', function () {
      var stmtBefore = zc.getStatement(7);
      zc.move(7, 26);
      var stmtAfter = zc.getStatement(26);
      stmtBefore.should.have.properties({
        message: stmtAfter.message,
        priority: stmtAfter.priority,
        elementType: stmtAfter.elementType,
        enabled: stmtAfter.enabled
      });
    });

    it('should move from loop block to if block', function () {
      var stmtBefore = zc.getStatement(23);
      zc.move(23, 6);
      var stmtAfter = zc.getStatement(7);
      stmtBefore.should.have.properties({
        message: stmtAfter.message,
        elementType: stmtAfter.elementType,
        enabled: stmtAfter.enabled
      });
    });

    it('should move from loop block to else block', function () {
      var stmtBefore = zc.getStatement(26);
      zc.move(26, 8);
      var stmtAfter = zc.getStatement(9);
      stmtBefore.should.have.properties({
        message: stmtAfter.message,
        priority: stmtAfter.priority,
        elementType: stmtAfter.elementType,
        enabled: stmtAfter.enabled
      });
    });

    it('should move from else to if block', function () {
      var stmtBefore = zc.getStatement(9);
      zc.move(9, 6);
      var stmtAfter = zc.getStatement(7);
      stmtBefore.should.have.properties({
        message: stmtAfter.message,
        priority: stmtAfter.priority,
        elementType: stmtAfter.elementType,
        enabled: stmtAfter.enabled
      });
    });

    it('should move within loop block', function () {
      var stmtBefore = zc.getStatement(24);
      zc.move(24, 27);
      var stmtAfter = zc.getStatement(27);
      stmtBefore.should.have.properties({
        comment: stmtAfter.comment,
        elementType: stmtAfter.elementType,
        enabled: stmtAfter.enabled
      });

      stmtBefore = zc.getStatement(26);
      zc.move(26, 24);
      stmtAfter = zc.getStatement(25);
      stmtBefore.should.have.properties({
        elementType: stmtAfter.elementType,
        enabled: stmtAfter.enabled
      });
    });

    /*
    it('should move loop block down', function () {
      var stmtBefore = zc.getStatement(23);
      zc.move(23, 32);
      console.log(JSON.stringify(zc.getZest(), undefined, 2));
    });
    */

  });

  describe('conditional ZestExpressionIsInteger', function () {
    it('should create ZestExpressionIsInteger conditional', function () {
      zc.addStatement({variableName: 'bar99', elementType: 'ZestExpressionIsInteger'});
      var stmt = zc.getStatement(zc.statementCount);
      stmt.rootExpression.should.have.properties({
        variableName: 'bar99',
        not: false,
        elementType: 'ZestExpressionIsInteger'
      });
      stmt.should.have.properties({
        elementType: 'ZestConditional',
        index: 34,
        enabled: true
      });
      zc.statementCount.should.be.exactly(34);
    });
  });

  /*
  describe('delete zest statements', function () {
    it('should delete the last statement', function () {
      zc.deleteStatement({index: 32});
      zc.statementCount.should.be.exactly(31);
      var last = zc.getStatement(32);
      (last === undefined).should.be.true;
    });

    it('should delete conditional statement with sub stmts', function () {
      // This would delete a conditiona stmt with 4 sub stmts. In total 5
      // stmts.
      zc.deleteStatement({index: 5});
      zc.statementCount.should.be.exactly(26);
    });

    it('should delete conditional stmt without sub stmt', function () {
      zc.deleteStatement({index: 11});
      zc.statementCount.should.be.exactly(25);
    });

    it('should delete statement in a loop', function () {
      zc.deleteStatement({index: 20});
      zc.statementCount.should.be.exactly(24);
    });

    it('should delete loop stmt with sub stmts', function () {
      // This would delete a loop stmt with 4 sub stmts. In total 5 stmts.
      zc.deleteStatement({index: 17});
      zc.statementCount.should.be.exactly(20);
    });

    it('should delete substatement without zest index', function () {
      // This would delete an assertion statement.
      zc.deleteStatement({parentIndex: 4,
                          subStatementOf: 'assertions',
                          index: 2});
      var stmt = zc.getStatement(4);
      stmt.assertions.should.have.length(2);

      zc.deleteStatement({parentIndex: 4,
                          subStatementOf: 'response'});
      stmt.response.should.be.empty;
      zc.statementCount.should.be.exactly(20);
    });

    it('should delete all the statements', function () {
      zc.deleteAll();
      var z = zc.getZest();
      z.statements.should.be.empty;
    });
  });
  */
});
