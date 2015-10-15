// <reference path="./reference.d.ts" />
import React = require('react');

export type Lazy<T> = T | (() => T);
export type PortalTarget =  Lazy<Target | Promise<Target>>;

export interface PortalProps {
  id?: any;
  target?: PortalTarget;
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
    if(!this.closed) {
      this.props.onClose && this.props.onClose();
    }
    this.closed = true;
  }

  componentDidMount() {
    var target: any = !this.props.target && this.props.id ? Target.Destinations[this.props.id] : this.props.target;
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
      this.closed = true;
      this.updateTarget(undefined);
    }
  }

  render() {
    return React.createElement("span", null, null);
  }
}

export class Target extends React.Component<{id?: any, selector?: number, ref?: any}, { children: any }> {
  constructor(props?: any) {
    super(props);
    this.state = { children: null};
  }

  mounted: boolean;
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
    if(this.mounted) {
      this.setState({ children });
    }
  }

  componentWillMount() {
    this.mounted = true;
    this.props.id && (Target.Destinations[this.props.id] = this);
  }

  componentWillUnmount() {
    this.mounted = false;
    this.portal && this.portal.close();
    this.props.id && (Target.Destinations[this.props.id] = null);
  }

  render(): any {
    if(React.Children.count(this.state.children) == 1 && typeof(this.state.children) == "object" ) {
      return React.Children.only(this.state.children);
    } else {
      return React.createElement("span", null, this.state.children);
    }
  }

  static Destinations: { [key: string] : Target } = {};
}

export class Selector extends Target {
  constructor(props?: any) {
    super(props);
  }

  multiverse: { [selector: string]: any} = {};

  update(children: any, portal: Portal) {
    var portalId = portal.props.id;
    if(children === undefined) {
      delete this.multiverse[portalId];
    } else {
      this.multiverse[portalId] = children;
    }
    if(this.props.selector==portalId) {
      this.setState({ children });
    }
  }

  componentWillMount() {
  }

  componentWillUnmount() {
    super.componentWillUnmount();
  }

  render(): any {
    var children = this.multiverse[this.props.selector];
    if(React.Children.count(children) == 1 && typeof(children) == "object") {
      return React.Children.only(children);
    } else {
      return React.createElement("span", null, children);
    }
  }
}

var _default = { port: Portal, target: Target, selector: Selector };

export default _default;
