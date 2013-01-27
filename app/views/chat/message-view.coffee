View = require 'views/base/view'
template = require 'views/templates/chat/message'

module.exports = class ChatMessageView extends View
  template: template
  container: '#chat-content-messages'
  id: 'chat-message'

  initialize: (options) ->
    super
    @render()
    @$el.find('time.timeago').timeago()
