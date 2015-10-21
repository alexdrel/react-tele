declare module 'react-tele' {

import React = require('react');
export type Lazy<T> = T | (() => T);
export type PromisedSite = Site | Promise<Site>;
export type PortalSite = string | Lazy<PromisedSite>;
export interface PortalProps {
    id?: any;
    site?: PortalSite;
    onClose?: () => any;
    children?: any;
}
export class Portal extends React.Component<PortalProps, {}> {
    constructor(props?: PortalProps);
    closed: boolean;
    site: PromisedSite;
    updateTarget(children: any): void;
    close(): void;
    componentDidMount(): void;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
    render(): React.DOMElement<any>;
}
export class Site extends React.Component<{
    id?: any;
    portal?: string | number;
    ref?: any;
}, {}> {
    constructor(props?: any);
    mounted: boolean;
    portals: {
        [portalId: string]: Portal;
    };
    multiverse: {
        [portalId: string]: any;
    };
    update(children: any, portal: Portal): void;
    componentWillMount(): void;
    componentWillUnmount(): void;
    render(): any;
    static Destinations: {
        [key: string]: Site;
    };
}
}