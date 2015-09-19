/// <reference path="./jasmine.d.ts" />
/// <reference path="../src/reference.d.ts" />

import React = require('react/addons');
import { default as Tele, Target } from '../src/react-tele';
var ReactTestUtils = React.addons.TestUtils;

describe("react-tele", () => {

  it("teleports by id", () => {

    var container = document.createElement('div');
    var tree = React.render(
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
        <h1><Tele.target id="h1"/></h1>
        <h2><Tele.target id="h2"/></h2>
        <h3><Tele.target id="h3"/></h3>
        <h4><Tele.target id="h4"/></h4>
        <div>
          <Tele.port id="h1">Kirk</Tele.port>
          <Tele.port id="h2">Spock</Tele.port>
          <Tele.port id="h3">Sulu</Tele.port>
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
        <Tele.target id="header"/>
      </h1>,
      container
    );

    var h1 = ReactTestUtils.findRenderedDOMComponentWithTag(tree, 'h1');
    expect(h1).not.toBeNull();
    expect(React.findDOMNode(h1).textContent).toBe('');

    var container1 = document.createElement('div');
    var tree1 = React.render(
      <Tele.port id="header">
        Kirk
      </Tele.port>,
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
        <Tele.target/>
      </h1>,
      container
    );

    var target: Target = ReactTestUtils.findRenderedComponentWithType(tree, Target) as any;
    expect(target).not.toBeNull();

    var container1 = document.createElement('div');
    var tree1 = React.render(
      <Tele.port target={target}>
        Kirk
      </Tele.port>,
      container1
    );

    var h1 = ReactTestUtils.findRenderedDOMComponentWithTag(tree, 'h1');
    expect(h1).not.toBeNull();
    expect(React.findDOMNode(h1).textContent).toBe('Kirk');

    React.render(
      <Tele.port target={() => target}>
        James Kirk
      </Tele.port>,
      container1
    );
    h1 = ReactTestUtils.findRenderedDOMComponentWithTag(tree, 'h1');
    expect(h1).not.toBeNull();
    expect(React.findDOMNode(h1).textContent).toBe('James Kirk');
  });

  it("teleports by promise", (done) => {
    var target: Target = null;
    var promise = new Promise<Target>(resolve => {
      setTimeout( () => {
        var container = document.createElement('div');
        var tree = React.render(
          <h1>
            <Tele.target/>
          </h1>,
          container
        );
        target = ReactTestUtils.findRenderedComponentWithType(tree, Target) as any;
        resolve(target);
      }, 50);
    });

    var container1 = document.createElement('div');
    var tree1 = React.render(
      <Tele.port target={promise}>
        Kirk
      </Tele.port>,
      container1
    );

    expect(target).toBeNull();
    setTimeout( () => {
      expect(target).not.toBeNull();
      expect(React.findDOMNode(target).textContent).toBe('Kirk');
      done();
    }, 100);
  });

  it("teleports by promise function", (done) => {
    var target: Target = null;

    var promise = () => new Promise<Target>(resolve => {
      var container = document.createElement('div');
      var tree = React.render(
        <h1>
          <Tele.target/>
        </h1>,
        container
      );
      target = ReactTestUtils.findRenderedComponentWithType(tree, Target) as any;
      resolve(target);
    });

    var container1 = document.createElement('div');
    var tree1 = React.render(
      <Tele.port target={promise}>
        James Kirk
      </Tele.port>,
      container1
    );

    setTimeout( () => {
      expect(target).not.toBeNull();
      expect(React.findDOMNode(target).textContent).toBe('James Kirk');
      done();
    }, 50);
  });
});

