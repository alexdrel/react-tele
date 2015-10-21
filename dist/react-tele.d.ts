import React = require('react');
export declare type Lazy<T> = T | (() => T);
export declare type PromisedSite = Site | Promise<Site>;
export declare type PortalSite = string | Lazy<PromisedSite>;
export interface PortalProps {
    id?: any;
    site?: PortalSite;
    onClose?: () => any;
    children?: any;
}
export declare class Portal extends React.Component<PortalProps, {}> {
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
export declare class Site extends React.Component<{
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
