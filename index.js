var express = require("express"),
path = require("path");

var Beryl = function(options) {

	var self = this;

	if(options) {
		if(options.views) {
			self.options.views = options.views;
		}
		if(options.defaultView) {
			self.options.defaultView = options.defaultView;
		}
		if(options.hasOwnProperty("pretty")) {
			self.options.pretty = options.pretty;
		}
	}

	var app = express();

	app.set("views", self.options.views);
	app.set("view engine", "jade");

	app.use(function(req, res, next) {
		var view = (req.path !== "/" ? req.path : ("/" + self.options.defaultView)).substring(1).replace(".html", "");
		res.render(view, self._getLocals(view));
	});

	app.use(function(err, req, res, next){
		res.status(500).send(err.message);
	});

	self.app = app;

	return self;
};

Beryl.prototype.options = {
	views : path.join(__dirname, "../../views"),
	pretty : true,
	defaultView : "index"
};

Beryl.prototype.locals = {};

Beryl.prototype.registerLocals = function(view, locals) {
	var self = this;
	if(view instanceof Array) {
		var views = view;
		if(!locals) {
			for(var i = 0; i < views.length; i++) {
				var viewDefinition = views[i];
				if(!viewDefinition.view) {
					throw new Error("View name not specified in view definition.")
				}
				if(!viewDefinition.locals) {
					console.log("Beryl: View locals not specified in view definition for view " + viewDefinition.view + " - assuming defaults.");
					return;
				}
				self.registerLocals(viewDefinition.view, viewDefinition.locals);
			}
		}
		else if(locals instanceof Array) {
			if(views.length !== locals.length) {
				throw new Error("Length of views array does not match length of locals array.");
			}
			for(var i = 0; i < views.length; i++) {
				self.registerLocals(views[i], locals[i]);
			}
		} else {
			throw new Error("Cannot understand mixture of arrays and non-arrays given. Must be either [Array, Array], [Array], or [String, Object].");
		}
	}
	self.locals[view] = locals;
};

Beryl.prototype._getLocals = function(view) {
	return this.locals[view] || {pretty: this.options.pretty};
}

module.exports = Beryl;