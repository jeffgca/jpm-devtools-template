exports.sampleZest = {
  "about": "About text",
  "zestVersion": "1.0",
  "title": "my zest",
  "description": "a little zest script",
  "author": "mocha",
  "generatedBy": "test client",
  "parameters": {
    "tokenStart": "{{",
    "tokenEnd": "}}",
    "tokens": {},
    "elementType": "ZestVariables"
  },
  "statements": [
    {
      "comment": "A comment",
      "elementType": "ZestComment",
      "index": 1,
      "enabled": true
    },
    {
      "comment": "another one",
      "elementType": "ZestComment",
      "index": 2,
      "enabled": true
    },
    {
      "comment": "New comment",
      "elementType": "ZestComment",
      "index": 3,
      "enabled": true
    },
    {
      "url": "http://foo.com",
      "method": "GET",
      "elementType": "ZestRequest",
      "data": "unknown",
      "headers": "unknown",
      "response": {
        "url": "http://bar.com",
        "body": "qwerty",
        "statusCode": 200,
        "responseTimeInMs": 222,
        "elementType": "ZestResponse",
        "headers": "unknown"
      },
      "assertions": [
        {
          "rootExpression": {
            "code": 200,
            "not": false,
            "elementType": "ZestExpressionStatusCode"
          },
          "elementType": "ZestAssertion"
        },
        {
          "rootExpression": {
            "length": 10,
            "approx": 1,
            "variableName": "request.url",
            "elementType": "ZestExpressionLength",
            "not": false
          },
          "elementType": "ZestAssertion"
        },
        {
          "rootExpression": {
            "regex": "/^foo/",
            "variableName": "response.body",
            "elementType": "ZestExpressionRegex",
            "caseExact": false,
            "not": false
          },
          "elementType": "ZestAssertion"
        }
      ],
      "followRedirect": false,
      "cookies": [],
      "index": 4,
      "enabled": true
    },
    {
      "rootExpression": {
        "value": "GET",
        "variableName": "request.method",
        "caseExact": false,
        "not": false,
        "elementType": "ZestExpressionEquals"
      },
      "ifStatements": [
        {
          "message": "Pass",
          "elementType": "ZestActionPrint",
          "index": 6,
          "enabled": true
        },
        {
          "milliseconds": 2,
          "elementType": "ZestActionSleep",
          "index": 7,
          "enabled": true
        },
        {
          "milliseconds": 5,
          "elementType": "ZestActionSleep",
          "index": 8,
          "enabled": true
        }
      ],
      "elseStatements": [
        {
          "message": "Fail",
          "priority": "HIGH",
          "elementType": "ZestActionFail",
          "index": 9,
          "enabled": true
        }
      ],
      "elementType": "ZestConditional",
      "index": 5,
      "enabled": true
    },
    {
      "comment": "again",
      "elementType": "ZestComment",
      "index": 10,
      "enabled": true
    },
    {
      "rootExpression": {
        "code": 200,
        "not": false,
        "elementType": "ZestExpressionStatusCode"
      },
      "elementType": "ZestConditional",
      "ifStatements": [],
      "elseStatements": [],
      "index": 11,
      "enabled": true
    },
    {
      "rootExpression": {
        "length": 10,
        "approx": 1,
        "variableName": "request.url",
        "elementType": "ZestExpressionLength",
        "not": false
      },
      "elementType": "ZestConditional",
      "ifStatements": [],
      "elseStatements": [],
      "index": 12,
      "enabled": true
    },
    {
      "rootExpression": {
        "regex": "/^foo/",
        "variableName": "response.body",
        "elementType": "ZestExpressionRegex",
        "caseExact": false,
        "not": false
      },
      "elementType": "ZestConditional",
      "ifStatements": [],
      "elseStatements": [],
      "index": 13,
      "enabled": true
    },
    {
      "rootExpression": {
        "includeRegexes": "/.com$/",
        "excludeRegexes": "/.net$/",
        "elementType": "ZestExpressionURL",
        "not": false
      },
      "elementType": "ZestConditional",
      "ifStatements": [],
      "elseStatements": [],
      "index": 14,
      "enabled": true
    },
    {
      "rootExpression": {
        "value": "GET",
        "variableName": "request.method",
        "elementType": "ZestExpressionEquals",
        "caseExact": false,
        "not": false
      },
      "elementType": "ZestConditional",
      "ifStatements": [],
      "elseStatements": [],
      "index": 15,
      "enabled": true
    },
    {
      "rootExpression": {
        "timeInMs": 5,
        "elementType": "ZestExpressionResponseTime",
        "greaterThan": true,
        "not": false
      },
      "elementType": "ZestConditional",
      "ifStatements": [],
      "elseStatements": [],
      "index": 16,
      "enabled": true
    },
    {
      "string": "Mr. Zest",
      "variableName": "name",
      "elementType": "ZestAssignString",
      "index": 17,
      "enabled": true
    },
    {
      "minInt": 5,
      "maxInt": 15,
      "variableName": "var1",
      "elementType": "ZestAssignRandomInteger",
      "index": 18,
      "enabled": true
    },
    {
      "fieldDefinition": {
        "formIndex": 0,
        "fieldName": "roll",
        "elementType": "ZestFieldDefinition"
      },
      "variableName": "rr",
      "elementType": "ZestAssignFieldValue",
      "index": 19,
      "enabled": true
    },
    {
      "replace": "name",
      "replacement": "face",
      "variableName": "name",
      "elementType": "ZestAssignReplace",
      "regex": false,
      "caseExact": false,
      "index": 20,
      "enabled": true
    },
    {
      "prefix": "tt",
      "postfix": "cc",
      "location": "HEAD",
      "variableName": "bb",
      "elementType": "ZestAssignStringDelimiters",
      "index": 21,
      "enabled": true
    },
    {
      "prefix": "gg",
      "postfix": "zz",
      "location": "HEAD",
      "variableName": "dd",
      "elementType": "ZestAssignRegexDelimiters",
      "index": 22,
      "enabled": true
    },
    {
      "set": {
        "tokens": [
          "22",
          "foo",
          "bar"
        ],
        "elementType": "ZestLoopTokenStringSet"
      },
      "statements": [
        {
          "comment": "A comment",
          "elementType": "ZestComment",
          "index": 24,
          "enabled": true
        },
        {
          "message": "Pass",
          "elementType": "ZestActionPrint",
          "index": 25,
          "enabled": true
        },
        {
          "comment": "A comment",
          "elementType": "ZestComment",
          "index": 26,
          "enabled": true
        },
        {
          "rootExpression": {
            "value": "GET",
            "variableName": "request.method",
            "elementType": "ZestExpressionEquals",
            "caseExact": false,
            "not": false
          },
          "elementType": "ZestConditional",
          "ifStatements": [],
          "elseStatements": [],
          "index": 27,
          "enabled": true
        }
      ],
      "variableName": "gg",
      "elementType": "ZestLoopString",
      "index": 23,
      "enabled": true
    },
    {
      "comment": "comment",
      "elementType": "ZestComment",
      "index": 28,
      "enabled": true
    },
    {
      "set": {
        "pathToFile": "/path/to/fuzzer",
        "elementType": "ZestLoopTokenFileSet"
      },
      "statements": [],
      "variableName": "var9",
      "elementType": "ZestLoopFile",
      "index": 29,
      "enabled": true
    },
    {
      "set": {
        "start": 10,
        "end": 30,
        "step": 5,
        "elementType": "ZestLoopTokenIntegerSet"
      },
      "statements": [],
      "variableName": "var8",
      "elementType": "ZestLoopInteger",
      "index": 30,
      "enabled": true
    },
    {
      "set": {
        "type": "cssselector",
        "element": "foobar",
        "elementType": "ZestLoopTokenClientElementsSet"
      },
      "statements": [],
      "variableName": "var7",
      "elementType": "ZestLoopClientElements",
      "index": 31,
      "enabled": true
    },
    {
      "comment": "Over",
      "elementType": "ZestComment",
      "index": 32,
      "enabled": true
    }
  ],
  "authentication": [],
  "index": 0,
  "enabled": true,
  "elementType": "ZestScript"
}
