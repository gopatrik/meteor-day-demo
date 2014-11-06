Gifs = new Meteor.Collection('gifs');

if(Meteor.isClient){
  Template.gif.events({
    'click .hud': function () {
      Gifs.update(this._id, {$inc:{votes:1}}); // magic
    }
  });

  Template.gifList.helpers({
    list: function () {
      return Gifs.find({}, {sort:{votes:-1}});
    }
  });

  Template.postGifForm.events({
    'submit form': function (e,t) {
      e.preventDefault();
      var title = $('form [name=title]').val();
      var url = $('form [name=url]').val();
      var nick = $('form [name=nick]').val();
      if(title && url && nick){
        Gifs.insert({title:title, url:url, nick:nick, votes:0});
      }
    }
  });
}