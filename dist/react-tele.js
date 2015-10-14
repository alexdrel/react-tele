var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
;
var Portal = (function (_super) {
    __extends(Portal, _super);
    function Portal(props) {
        _super.call(this, props);
    }
    Portal.prototype.updateTarget = function (children) {
        var _this = this;
        if (!this.target)
            return;
        var target = this.target;
        if (typeof target.then === 'function') {
            target.then(function (target) { return target.update(children, _this); }).catch(function () { return void 0; });
        }
        else {
            target.update(children, this);
        }
    };
    Portal.prototype.close = function () {
        this.closed = true;
        this.props.onClose && this.props.onClose();
    };
    Portal.prototype.componentDidMount = function () {
        var target = !this.props.target && this.props.id ? Target.Destinations[this.props.id] : this.props.target;
        if (typeof target === 'function')
            target = target();
        this.target = target;
        this.updateTarget(this.props.children);
    };
    Portal.prototype.componentDidUpdate = function () {
        if (!this.closed) {
            this.updateTarget(this.props.children);
        }
    };
    Portal.prototype.componentWillUnmount = function () {
        if (!this.closed) {
            this.updateTarget(undefined);
        }
    };
    Portal.prototype.render = function () {
        return React.createElement("span", null, null);
    };
    return Portal;
})(React.Component);
exports.Portal = Portal;
var Target = (function (_super) {
    __extends(Target, _super);
    function Target(props) {
        _super.call(this, props);
        this.state = { children: null };
    }
    Target.prototype.update = function (children, portal) {
        if (children === undefined) {
            if (this.portal == portal) {
                this.portal = null;
                children = null;
            }
        }
        else if (portal != this.portal) {
            this.portal && this.portal.close();
            this.portal = portal;
        }
        this.setState({ children: children });
    };
    Target.prototype.componentWillMount = function () {
        this.props.id && (Target.Destinations[this.props.id] = this);
    };
    Target.prototype.componentWillUnmount = function () {
        this.portal && this.portal.close();
        this.props.id && (Target.Destinations[this.props.id] = null);
    };
    Target.prototype.render = function () {
        if (React.Children.count(this.state.children) == 1 && typeof (this.state.children) == "object") {
            return React.Children.only(this.state.children);
        }
        else {
            return React.createElement("span", null, this.state.children);
        }
    };
    Target.Destinations = {};
    return Target;
})(React.Component);
exports.Target = Target;
var Selector = (function (_super) {
    __extends(Selector, _super);
    function Selector(props) {
        _super.call(this, props);
        this.multiverse = {};
    }
    Selector.prototype.update = function (children, portal) {
        var portalId = portal.props.id;
        if (children === undefined) {
            delete this.multiverse[portalId];
        }
        else {
            this.multiverse[portalId] = children;
        }
        if (this.props.selector == portalId) {
            this.setState({ children: children });
        }
    };
    Selector.prototype.componentWillMount = function () {
    };
    Selector.prototype.componentWillUnmount = function () {
        _super.prototype.componentWillUnmount.call(this);
    };
    Selector.prototype.render = function () {
        var children = this.multiverse[this.props.selector];
        if (React.Children.count(children) == 1 && typeof (children) == "object") {
            return React.Children.only(children);
        }
        else {
            return React.createElement("span", null, children);
        }
    };
    return Selector;
})(Target);
exports.Selector = Selector;
var _default = { port: Portal, target: Target, selector: Selector };
exports.__esModule = true;
exports["default"] = _default;
