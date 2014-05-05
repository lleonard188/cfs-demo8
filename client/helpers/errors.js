// Local (client-only) collection
Errors = new Meteor.Collection(null);

throwError = function(message) {
	if (Errors.find({}).count() > 0)
		Errors.remove({});
	
	Errors.insert({message: message})
}