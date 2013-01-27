View = require 'views/base/view'
require 'lib/view-helper' # Just load the view helpers, no return value

module.exports = class SocketView extends View
  socket: null

  initialize: ->
    super
    
  delegateSocket: (event, method) ->
    window.socket.on event, method

  emitSocket: (event, data) ->
  	window.socket.emit event, data