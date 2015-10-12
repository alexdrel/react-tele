// <reference path="./reference.d.ts" />
import React = require('react');

export type Lazy<T> = T | (() => T);

export interface PortalProps {
  id?: any;
  target?: Lazy<Target | Promise<Target>>;
  onClose?: () => any;
  children?: any
};

export class Portal extends React.Component<PortalProps, {}> {
  constructor(props?: any) {
    super(props);
  }

  target: Target | Promise<Target>;

  updateTarget(children: any) {
    if(!this.target) return;
    var target: any = this.target;
    if(typeof target.then === 'function') {
      target.then((target: Target) => target.update(children, this)).catch(():any=>void 0);
    } else {
      target.update(children, this);
    }
  }

  closed: boolean;

  close() {
    this.closed = true;
    this.props.onClose && this.props.onClose();
  }

  componentDidMount() {
    var target: any = this.props.id ? Target.Destinations[this.props.id] : this.props.target;
    if(typeof target === 'function') target = target();
    this.target = target;

    this.updateTarget(this.props.children);
  }

  componentDidUpdate() {
    if(!this.closed) {
      this.updateTarget(this.props.children);
    }
  }

  componentWillUnmount() {
    if(!this.closed) {
      this.updateTarget(undefined);
    }
  }

  render() {
    return <noscript/>;
  }
}

export class Target extends React.Component<{id?: any, ref?: any}, { children: any }> {
  constructor(props?: any) {
    super(props);
    this.state = { children: null};
  }

  portal: Portal;

  update(children: any, portal: Portal) {
    if(children === undefined) {
      if(this.portal == portal) {
        this.portal = null;
        children = null;
      }
    } else if(portal != this.portal) {
      this.portal && this.portal.close();
      this.portal = portal;
    }

    this.setState({ children });
  }

  componentWillMount() {
    this.props.id && (Target.Destinations[this.props.id] = this);
  }

  componentWillUnmount() {
    this.portal && this.portal.close();
    this.props.id && (Target.Destinations[this.props.id] = null);
  }

  render() {
    return this.state.children;
  }

  static Destinations: { [key: string] : Target } = {};
}

var _default = { port: Portal, target: Target };

export default _default;
