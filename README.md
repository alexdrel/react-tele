[![Build Status](https://travis-ci.org/alexdrel/react-tele.svg?branch=master)](https://travis-ci.org/alexdrel/react-tele)

react-tele
===
React (JS) telepresence - rendering outside of own DOM subtree.

###Quick example

```jsx
var React = require('react');
var Tele = require('react-tele');

React.render(
  <section>
    <h1>
      <Tele.target id="header"/>
    </h1>
    <div>
      <Tele.port id="header">
        Mr. Spock
      </Tele.port>
      USS Enterprise (NCC-1701) science officer.
    </div>
  </section>,

  document.getElementById('content')
);
```

Renders:
********
##Mr. Spock

USS Enterprise (NCC-1701) USS science officer.

********

## Development
#### Commands
* Build commonJS version:  ```$ npm start```
* Watch commonJS folder:  ```$ npm run watch```
* Build UMD version:  ```$ npm run build```
* Start dev server for examples (http://localhost:1701/webpack-dev-server/examples/): ```$ npm run examples```
* Build examples: ```$ npm run build-examples```
* Run tests once (Firefox): ```$ npm test```
* Watch tests (Chrome): ```$ npm wtest```



