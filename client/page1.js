var imageStore = new FS.Store.GridFS("images");
 
images = new FS.Collection("images", {
    stores: [imageStore],
    filter: {
        allow: {
            contentTypes: ['image/*']
        }
    },
    onInvalid: function (message) {
        throwError(message);
    }
});
 
Meteor.subscribe('images');

images.deny({
    insert: function(userId, fileObj) {

        //Get array of images belong to user
        var userImages = images.find({'metadata.owner': userId}).fetch();

        //If there's too many images then deny the insert
        if (userImages.length > 2){
            throwError("Too many images.")
            return true;
        }
    }
});
 
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