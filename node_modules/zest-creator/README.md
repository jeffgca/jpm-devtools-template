Zest-Creator
============

[![Build Status](https://travis-ci.org/darkowlzz/zest-creator.svg)](https://travis-ci.org/darkowlzz/zest-creator)

Zest Creator tool for creating valid zest script and interact with the script via the helper methods.

## To use

  1. Install it:

    ```bash
    $ npm i zest-creator
    ```

  2. Require it and use:

    ```js
    var ZestCreator = require('zest-creator');
    var opts = {
      file: 'abc.zst' // Load zest from a file
    };
    var script = new ZestCreator(opts);
    ```

## Example

To create a script from scratch:

```js
var ZestCreator = require('zest-creator');
var opts = {
  title: 'my zest script',
  description: 'desc of the script',
  author: 'anon'
};
var zc = new ZestCreator(opts);

zc.getZest();
/*
{ about: 'About text',
  zestVersion: '1.0',
  title: 'my zest script',
  description: 'desc',
  author: 'anon',
  generatedBy: 'Zest-Creator',
  parameters:
   { tokenStart: '{{',
     tokenEnd: '}}',
     tokens: {},
     elementType: 'ZestVariables' },
  statements: [],
  authentication: [],
  index: 0,
  enabled: true,
  elementType: 'ZestScript' }
*/
```
Above is a basic zest script template without any statements in it.
To add statements to the script:

```js
zc.addStatement({ comment: 'A comment', elementType: 'ZestComment' });
zc.getStatement(1);
/*
{ comment: 'A comment',
  elementType: 'ZestComment',
  index: 1,
  enabled: true }
*/
```
`addStatement()` adds a new statement to the scripts. Before adding, it verified the element type with the given attributes of the valid zest statements. A statement is added only if the given attributes satisfy the requirements of the element type.
`getStatement()` could be used to retrieve statement by its index value.

Get the number of statements with `statementCount`
```js
zc.statementCount
// 1
```

Delete added statement with `deleteStatement()`

```js
zc.addStatement({ message: 'foo', elementType: 'ZestActionPrint' });
zc.deleteStatement({ index: 1 });
/*
statements:
   [ { message: 'foo',
       elementType: 'ZestActionPrint',
       index: 1,
       enabled: true } ]
*/
```
Use `deleteAll()` to delete all the statements.
```js
zc.deleteAll();
/*
statements: []
*/
```

Save to a file with `saveToFile()`.
```js
zc.saveToFile('myzest');
```
myzest.zst is created and the zest script it written into the file.

## LICENSE

MPL
