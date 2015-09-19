var React = require('react');
var Tele = require('react-tele').default;

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