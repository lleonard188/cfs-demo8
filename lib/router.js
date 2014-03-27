//use layout template as default body
Router.configure({
	layoutTemplate: 'layout'
});

Router.map(function(){
	this.route('page1', {path: '/'});
	this.route('page2');
});	

