Meteor.subscribe('channels');
Meteor.subscribe('allUsernames');
Meteor.subscribe('uploads');

Template.messages.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('messages', Session.get('channel'));
  });
});