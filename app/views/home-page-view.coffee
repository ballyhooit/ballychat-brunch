template = require 'views/templates/home'
View = require 'views/base/view'

module.exports = class HomePageView extends View
  className: 'content'
  id: 'chat-content-messages'
  container: '#chat-content'
  template: template

  initialize: ->
  	@subscribeEvent 'login', @renderPostLogin
  	$(window).resize =>
  		@resizeHandle()


  renderPostLogin:(data) ->
  	@render()
  	@resizeHandle()

  resizeHandle: ->
  	chatHeight = $(window).height() - $('header.navbar').height() - $('#chat-input').height() - 25

  	$('#chat-container').height(chatHeight);
  	$('.nano').nanoScroller().nanoScroller({scroll:'bottom'});
