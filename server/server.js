var imageStore = new FS.Store.S3("images", {
	region: "us-east-1",
	accessKeyId: "********", 
	secretAccessKey: "***********", 
	bucket: "*********"
});

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
        return !!userId; // check fileObj.metadata.owner?
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

 
Meteor.publish('images', function() {
    return images.find();
});