var imageStore = new FS.Store.S3("images", {
	region: "us-east-1",
	accessKeyId: "***********", 
	secretAccessKey: "************", 
	bucket: "cfs-demo8"
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

        //If there's too many images then deny the insert
        if (userImages.length > 1){
            return true;
        }
    }
});
 
Meteor.publish('images', function() {
    return images.find();
});