import React = require('react');
export declare type Lazy<T> = T | (() => T);
export declare type PortalTarget = Lazy<Target | Promise<Target>>;
export interface PortalProps {
    id?: any;
    target?: PortalTarget;
    onClose?: () => any;
    children?: any;
}
export declare class Portal extends React.Component<PortalProps, {}> {
    constructor(props?: any);
    target: Target | Promise<Target>;
    updateTarget(children: any): void;
    closed: boolean;
    close(): void;
    componentDidMount(): void;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
    render(): React.DOMElement<any>;
}
export declare class Target extends React.Component<{
    id?: any;
    selector?: number;
    ref?: any;
}, {
    children: any;
}> {
    constructor(props?: any);
    portal: Portal;
    update(children: any, portal: Portal): void;
    componentWillMount(): void;
    componentWillUnmount(): void;
    render(): any;
    static Destinations: {
        [key: string]: Target;
    };
}
export declare class Selector extends Target {
    constructor(props?: any);
    multiverse: {
        [selector: string]: any;
    };
    update(children: any, portal: Portal): void;
    componentWillMount(): void;
    componentWillUnmount(): void;
    render(): any;
}
declare var _default: {
    port: typeof Portal;
    target: typeof Target;
    selector: typeof Selector;
};
export default _default;
