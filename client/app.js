Template.messages.helpers({
  messages: Messages.find({})
});

Accounts.ui.config({
    passwordSignupFields: 'USERNAME_AND_EMAIL'
});

Template.registerHelper('currentChannel', function () {
	return Session.get('channel');
});

Template.registerHelper("timestampToTime", function (timestamp) {
	var date = new Date(timestamp);
	var hours = date.getHours();
	var minutes = "0" + date.getMinutes();
	var seconds = "0" + date.getSeconds();
	return hours + ':' + minutes.substr(minutes.length-2) + ':' + seconds.substr(seconds.length-2);
});

Template.registerHelper("usernameFromId", function (userId) {
	var user = Meteor.users.findOne({_id: userId});
	if (typeof user === "undefined") {
		return "Anonymous";
	}
	if (typeof user.services.github !== "undefined") {
		return user.services.github.username;
	}
	return user.username;
});

Template.listings.helpers({
	channels: function () {
		return Channels.find();
	}
});

Template.channel.helpers({
	active: function () {
		if (Session.get('channel') === this.name) {
			return "active";
		} else {
			return "";
		}
	}
});

Template.footer.helpers({
	username: function() {
		return Meteor.user().username;
	},
	uploads: function() {
		console.log(Uploads.find());
		return Uploads.find();
	}
});

Template.footer.events({
   'change .input-file': function(event, template) {
      FS.Utility.eachFile(event, function(file) {
        Uploads.insert(file, function (err, fileObj) {
          if (err){
             // handle error
          } else {
          	fileObj.once("uploaded", function () {
                Meteor.call('newMessage', {
                	text: '<a href="' + "/cfs/files/uploads/" + fileObj._id + "/" + fileObj.name() + '?download=true" target="_parent">' + fileObj.name() + '</a>',
                	channel: Session.get('channel')
                });
	        });
          }
        });
     });
   }
});