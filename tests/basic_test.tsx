/// <reference path="./jasmine.d.ts" />
/// <reference path="../src/reference.d.ts" />

import React = require('react/addons');
import { Portal, Site } from '../src/react-tele';
var ReactTestUtils = React.addons.TestUtils;

describe("react-tele", () => {

  it("teleports by id", () => {

    var container = document.createElement('div');
    var tree = React.render(
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
      container
    );

    var h1 = ReactTestUtils.findRenderedDOMComponentWithTag(tree, 'h1');
    expect(h1).not.toBeNull();
    expect(React.findDOMNode(h1).textContent).toBe('Mr. Spock');

    var div = ReactTestUtils.findRenderedDOMComponentWithTag(tree, 'div');
    expect(div).not.toBeNull();
    expect(React.findDOMNode(div).textContent).toContain('USS');
  });

  it("teleports by id (several)", () => {

    var container = document.createElement('div');
    var tree = React.render(
      <section>
        <h1><Site id="h1"/></h1>
        <h2><Site id="h2"/></h2>
        <h3><Site id="h3"/></h3>
        <h4><Site id="h4"/></h4>
        <div>
          <Portal site="h1">Kirk</Portal>
          <Portal site="h2">Spock</Portal>
          <Portal site="h3">Sulu</Portal>
        </div>
      </section>,
      container
    );

    var h = ReactTestUtils.findRenderedDOMComponentWithTag(tree, 'h1');
    expect(h).not.toBeNull();
    expect(React.findDOMNode(h).textContent).toBe('Kirk');

    var h = ReactTestUtils.findRenderedDOMComponentWithTag(tree, 'h2');
    expect(h).not.toBeNull();
    expect(React.findDOMNode(h).textContent).toBe('Spock');

    var h = ReactTestUtils.findRenderedDOMComponentWithTag(tree, 'h3');
    expect(h).not.toBeNull();
    expect(React.findDOMNode(h).textContent).toBe('Sulu');

    var h = ReactTestUtils.findRenderedDOMComponentWithTag(tree, 'h4');
    expect(h).not.toBeNull();
    expect(React.findDOMNode(h).textContent).toBe('');

    var div = ReactTestUtils.findRenderedDOMComponentWithTag(tree, 'div');
    expect(div).not.toBeNull();
    expect(React.findDOMNode(div).textContent).toBe('');
  });

  it("teleports by id (separate renders)", () => {
    var container = document.createElement('div');
    var tree = React.render(
      <h1>
        <Site id="header"/>
      </h1>,
      container
    );

    var h1 = ReactTestUtils.findRenderedDOMComponentWithTag(tree, 'h1');
    expect(h1).not.toBeNull();
    expect(React.findDOMNode(h1).textContent).toBe('');

    var container1 = document.createElement('div');
    var tree1 = React.render(
      <Portal site="header">
        Kirk
      </Portal>,
      container1
    );

    h1 = ReactTestUtils.findRenderedDOMComponentWithTag(tree, 'h1');
    expect(h1).not.toBeNull();
    expect(React.findDOMNode(h1).textContent).toBe('Kirk');
  });

  it("teleports by ref", () => {
    var container = document.createElement('div');
    var tree = React.render(
      <h1>
        <Site/>
      </h1>,
      container
    );

    var site: Site = ReactTestUtils.findRenderedComponentWithType(tree, Site) as any;
    expect(site).not.toBeNull();

    var container1 = document.createElement('div');
    var tree1 = React.render(
      <Portal site={site}>
        Kirk
      </Portal>,
      container1
    );

    var h1 = ReactTestUtils.findRenderedDOMComponentWithTag(tree, 'h1');
    expect(h1).not.toBeNull();
    expect(React.findDOMNode(h1).textContent).toBe('Kirk');

    React.render(
      <Portal site={() => site}>
        James Kirk
      </Portal>,
      container1
    );
    h1 = ReactTestUtils.findRenderedDOMComponentWithTag(tree, 'h1');
    expect(h1).not.toBeNull();
    expect(React.findDOMNode(h1).textContent).toBe('James Kirk');
  });

  it("teleports by promise", (done) => {
    var site: Site = null;
    var promise = new Promise<Site>(resolve => {
      setTimeout( () => {
        var container = document.createElement('div');
        var tree = React.render(
          <h1>
            <Site/>
          </h1>,
          container
        );
        site = ReactTestUtils.findRenderedComponentWithType(tree, Site) as any;
        resolve(site);
      }, 50);
    });

    var container1 = document.createElement('div');
    var tree1 = React.render(
      <Portal site={promise}>
        Kirk
      </Portal>,
      container1
    );

    expect(site).toBeNull();
    setTimeout( () => {
      expect(Site).not.toBeNull();
      expect(React.findDOMNode(site).textContent).toBe('Kirk');
      done();
    }, 100);
  });

  it("teleports by promise function", (done) => {
    var site: Site = null;

    var promise = () => new Promise<Site>(resolve => {
      var container = document.createElement('div');
      var tree = React.render(
        <h1>
          <Site/>
        </h1>,
        container
      );
      site = ReactTestUtils.findRenderedComponentWithType(tree, Site) as any;
      resolve(site);
    });

    var container1 = document.createElement('div');
    var tree1 = React.render(
      <Portal site={promise}>
        James Kirk
      </Portal>,
      container1
    );

    setTimeout( () => {
      expect(site).not.toBeNull();
      expect(React.findDOMNode(site).textContent).toBe('James Kirk');
      done();
    }, 50);
  });
});

