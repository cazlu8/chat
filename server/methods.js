Meteor.methods({
  newMessage: function (message) {
  	message.timestamp = Date.now();
    message.user = Meteor.userId();
    Messages.insert(message);
  },

  newChannel: function (channel) {
  	Channels.insert({
  	  name: channel
  	});
  }
})