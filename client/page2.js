Template.page2.helpers({
    matchPic: function() {
		var user = Meteor.user()? Meteor.user(): 'none';

    	return images.find({ 'metadata.owner': user._id });
	}
});