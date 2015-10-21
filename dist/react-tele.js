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
        if (!this.site)
            return;
        var site = this.site;
        if (typeof site.then === 'function') {
            site.then(function (site) { return site.update(children, _this); }).catch(function () { return void 0; });
        }
        else {
            site.update(children, this);
        }
    };
    Portal.prototype.close = function () {
        if (!this.closed) {
            this.props.onClose && this.props.onClose();
        }
        this.closed = true;
    };
    Portal.prototype.componentDidMount = function () {
        if (typeof this.props.site === 'string') {
            this.site = Site.Destinations[this.props.site];
        }
        else if (typeof this.props.site === 'function') {
            this.site = this.props.site();
        }
        else {
            this.site = this.props.site;
        }
        this.updateTarget(this.props.children);
    };
    Portal.prototype.componentDidUpdate = function () {
        if (!this.closed) {
            this.updateTarget(this.props.children);
        }
    };
    Portal.prototype.componentWillUnmount = function () {
        if (!this.closed) {
            this.closed = true;
            this.updateTarget(undefined);
        }
    };
    Portal.prototype.render = function () {
        return React.createElement("span", null, null);
    };
    return Portal;
})(React.Component);
exports.Portal = Portal;
var Site = (function (_super) {
    __extends(Site, _super);
    function Site(props) {
        _super.call(this, props);
        this.portals = {};
        this.multiverse = {};
        this.state = { children: null };
    }
    Site.prototype.update = function (children, portal) {
        var portalId = portal.props.id || 0;
        if (children === undefined) {
            delete this.multiverse[portalId];
            delete this.portals[portalId];
        }
        else {
            this.multiverse[portalId] = children;
            if (this.portals[portalId] && this.portals[portalId] != portal) {
                this.portals[portalId].close();
            }
            this.portals[portalId] = portal;
        }
        if (this.mounted && (this.props.portal || 0) == portalId) {
            this.setState({});
        }
    };
    Site.prototype.componentWillMount = function () {
        this.mounted = true;
        this.props.id && (Site.Destinations[this.props.id] = this);
    };
    Site.prototype.componentWillUnmount = function () {
        this.mounted = false;
        for (var id in this.portals) {
            if (this.portals.hasOwnProperty(id)) {
                this.portals[id].close();
            }
        }
        this.props.id && (Site.Destinations[this.props.id] = null);
    };
    Site.prototype.render = function () {
        var children = this.multiverse[this.props.portal || 0];
        if (React.Children.count(children) == 1 && typeof (children) == "object") {
            return React.Children.only(children);
        }
        else {
            return React.createElement("span", null, children);
        }
    };
    Site.Destinations = {};
    return Site;
})(React.Component);
exports.Site = Site;
