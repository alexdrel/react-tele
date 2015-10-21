// <reference path="./reference.d.ts" />
import React = require('react');

export type Lazy<T> = T | (() => T);
export type PromisedSite = Site | Promise<Site>;
export type PortalSite = string | Lazy<PromisedSite>;

export interface PortalProps {
  id?: any;
  site?: PortalSite;
  onClose?: () => any;
  children?: any
};

export class Portal extends React.Component<PortalProps, {}> {
  constructor(props?: PortalProps) {
    super(props);
  }

  closed: boolean;
  site: PromisedSite;

  updateTarget(children: any) {
    if(!this.site) return;
    var site: any = this.site;
    if(typeof site.then === 'function') {
      site.then((site: Site) => site.update(children, this)).catch(():any=>void 0);
    } else {
      site.update(children, this);
    }
  }

  close() {
    if(!this.closed) {
      this.props.onClose && this.props.onClose();
    }
    this.closed = true;
  }

  componentDidMount() {
    if(typeof this.props.site === 'string') {
      this.site = Site.Destinations[this.props.site as string];
    } else if(typeof this.props.site === 'function') {
      this.site = (this.props.site as ()=>PromisedSite)();
    } else {
      this.site = (this.props.site as PromisedSite);
    }

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

export class Site extends React.Component<{id?: any, portal?: string|number, ref?: any}, { }> {
  constructor(props?: any) {
    super(props);
    this.state = { children: null};
  }

  mounted: boolean;

  portals: { [portalId: string]: Portal} = {};
  multiverse: { [portalId: string]: any} = {};

  update(children: any, portal: Portal) {
    var portalId = portal.props.id || 0;
    if(children === undefined) {
      delete this.multiverse[portalId];
      delete this.portals[portalId];
    } else {
      this.multiverse[portalId] = children;
      if(this.portals[portalId] && this.portals[portalId] != portal) {
        this.portals[portalId].close();
      }
      this.portals[portalId] = portal;
    }
    if(this.mounted && (this.props.portal || 0)==portalId) {
      this.setState({});
    }
  }

  componentWillMount() {
    this.mounted = true;
    this.props.id && (Site.Destinations[this.props.id] = this);
  }

  componentWillUnmount() {
    this.mounted = false;
    for(var id in this.portals) {
      if( this.portals.hasOwnProperty( id ) ) {
        this.portals[id].close();
      }
    }
    this.props.id && (Site.Destinations[this.props.id] = null);
  }

  render(): any {
    var children = this.multiverse[this.props.portal || 0];
    if(React.Children.count(children) == 1 && typeof(children) == "object") {
      return React.Children.only(children);
    } else {
      return React.createElement("span", null, children);
    }
  }

  static Destinations: { [key: string] : Site } = {};
}

