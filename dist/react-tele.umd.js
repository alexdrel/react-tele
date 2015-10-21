(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("React"));
	else if(typeof define === 'function' && define.amd)
		define(["React"], factory);
	else if(typeof exports === 'object')
		exports["react-tele"] = factory(require("React"));
	else
		root["react-tele"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!****************************!*\
  !*** ./src/react-tele.tsx ***!
  \****************************/
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(/*! react */ 1);
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


/***/ },
/* 1 */
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=react-tele.umd.js.map