/**
 * This is a starting point for an application written on Pintura
 */

var admins = require("commonjs-utils/settings").security.admins,
	copy = require("commonjs-utils/copy").copy,
	Restrictive = require("perstore/facet").Restrictive,
	FileSystem = require("perstore/store/filesystem").FileSystem, 
	File = require("pintura/media").getFileModel(),
	Model = require("perstore/model").Model,
	Notifying = require("perstore/store/notifying").Notifying,
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
// we can use the class model for RESTful creation of models
var ClassModel = Model(Notifying(require("perstore/stores").DefaultStore()),{});
var fullModel = {
	// put your models in here
	User: User,
	File: File,
	Class: ClassModel,
	Module: FileSystem({dataFolder:"../lib"})
};
// initialize the data model
require("perstore/model").initializeRoot(fullModel);

// We can generate models from schemas stored in a store/model if we want
fullModel = require("perstore/model").createModelsFromModel(ClassModel, fullModel);

// the data model for non-authenticated users
var publicModel = {
	User: User,
	File: Restrictive(File),
	Class: Restrictive(ClassModel)
};

// the data model for authenticated users 
var userModel = copy(publicModel, {});

