View = require 'views/base/socket-view'
template = require 'views/templates/chat/input'

module.exports = class ChatInputView extends View
  template: template
  tagName: 'section'
  id: 'chat-input'
  className: 'container'
  container: 'body.container'

  initialize: (options) ->
  	super
  	@render()
  	@delegate('keypress', @sendMessage)

  sendMessage: (e) ->
	  inputText = $('#chat-input textarea').val().trim()
	  currentRoom = $("body").data("current-room")
	  if e.which is 13 and inputText
	    @emitSocket "message:post",
	      room: currentRoom
	      msg: inputText

	    $('#chat-input textarea').val ""
	    false
