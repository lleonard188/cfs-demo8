var imageStore = new FS.Store.GridFS("images");
 
images = new FS.Collection("images", {
    stores: [imageStore],
    filter: {
        allow: {
            contentTypes: ['image/*']
        }
    }
});
 
Meteor.subscribe('images');
 
Template.page1.images = function () {
    var user = Meteor.user()? Meteor.user(): 'none';

    return images.find({ 'metadata.owner': user._id });
};

Template.page1.events({
    'change #files': function(event, temp) {
        FS.Utility.eachFile(event, function(file) {
            var fileObj = new FS.File(file);
            fileObj.metadata = { owner: Meteor.userId() };
            images.insert(fileObj);
        });
    },
    'click .btnRemove': function(event, temp) {
        this.remove();
    }
});