var imageStore = new FS.Store.GridFS("images");

var images = new FS.Collection("images", {
    stores: [imageStore],
    filter: {
        allow: {
            contentTypes: ['image/*']
        }
    }
});
 
images.allow({
    insert: function(userId, fileObj) {
        return !!userId; // we could check fileObj.metadata.owner?
    },
    update: function(userId, fileObj) {
        return !!userId;
    },
    remove: function(userId, fileObj) {
        return !!userId;
    },
    download: function(userId, fileObj) {
        return true;
    },
    fetch: []
});

images.deny({
    insert: function(userId, fileObj) {

        //Get array of images belong to user
        var userImages = images.find({'metadata.owner': userId}).fetch();

    }
});
 
Meteor.publish('images', function() {
    return images.find();
});