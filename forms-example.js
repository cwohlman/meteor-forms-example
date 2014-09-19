People = new Meteor.Collection('people');
if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault("counter", 0);

  Template.myForm.helpers({
    item: function () {
      return new Form(new Schema({
        name: 'person'
        , schema: {
          name: _.isString
          , age: _.isNumber
        }
      }), People.findOne() || {});
    }
  });

  Template.myForm.events({
    'change input': function (e) {
      this.set(e.currentTarget.value);
    }
    , 'submit form': function (e) {
      var value = this.value;
      if (value._id) {
        var changes = _.omit(value, '_id');
        People.update(value._id, {$set: changes});
      } else {
        People.insert(value);
      }
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
