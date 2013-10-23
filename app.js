/**
 * This is an example Wiki web application written on Pintura
 */
var admins = require("perstore/util/settings").security.admins,
	copy = require("perstore/util/copy").copy,
	Restrictive = require("perstore/facet").Restrictive,
	Model = require("perstore/model").Model,
	Notifying = require("perstore/store/notifying").Notifying,
	pinturaConfig = require("pintura/pintura").config,
	User = pinturaConfig.security.getAuthenticationFacet();

// register any media handlers here

// Defines the data model for the given user by request
pinturaConfig.getDataModel = function(request){
	var user = request.remoteUser;
	if(user){
		if(admins.indexOf(user)>-1){
			return fullModel; // admin users can directly access the data model without facets
		}
		return fullModel;
	}
	return fullModel; // you can make this publicModel
}
// we can use the class model for RESTful creation of models
var ClassModel = Model(Notifying(require("perstore/stores").DefaultStore()),{});
var fullModel = {
	// put your models in here
	User: User,
	File: File,
	Class: ClassModel
};
// initialize the data model
require("perstore/model").initializeRoot(fullModel);
