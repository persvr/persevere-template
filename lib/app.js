/**
 * This is a starting point for an application written on Pintura
 */

var admins = require("commonjs-utils/settings").security.admins,
	fullModel = require("./model/index").DataModel,
	copy = require("commonjs-utils/copy").copy,
	Restrictive = require("perstore/facet").Restrictive,
	User = require("pintura/pintura").config.security.getAuthenticationFacet();

// register the representation handlers
// require("media/my-media-handler");

// Defines the data model for the given user by request
exports.getDataModel = function(request){
	var user = request.remoteUser;
	if(user){
		if(admins.indexOf(user)>-1){
			return fullModel; // admin users can directly access the data model without facets
		}
		return fullModel;
	}
	return fullModel; // you can make this publicModel
}

fullModel.User = User;

// initialize the data model
require("perstore/model").initializeRoot(fullModel);

// the data model for non-authenticated users
var publicModel = {
};
