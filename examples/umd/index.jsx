var { Portal, Site } = window['react-tele'];

React.render(
  <section>
    <h1>
      <Site id="header"/>
    </h1>
    <div>
      <Portal site="header">
        Mr. Spock
      </Portal>
      USS Enterprise (NCC-1701) science officer.
    </div>
  </section>,
  document.getElementById('content')
);