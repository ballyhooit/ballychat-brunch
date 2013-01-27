template = require 'views/templates/home'
View = require 'views/base/socket-view'
ChatInputView = require 'views/chat/input-view'
ChatMessageView = require 'views/chat/message-view'
ChatMessage = require 'models/message'

module.exports = class HomePageView extends View
    className: 'content'
    id: 'chat-content-messages'
    container: '#chat-content'
    template: template

    initialize: (options) ->
        super
        @subscribeEvent 'login', @renderPostLogin
        $(window).resize =>
            @resizeHandle()


    renderPostLogin:(data) ->
        @render()
        @subview('input-view', new ChatInputView())
        @subview('input-view').render()
        @delegateSocket 'message:get', @newMessage
        @delegateSocket 'chat:init', @setRoom
        @resizeHandle()

    resizeHandle: ->
        chatHeight = $(window).height() - $('header.navbar').height() - $('#chat-input').height() - 25

        $('#chat-container').height(chatHeight);
        $('.nano').nanoScroller().nanoScroller({scroll:'bottom'});

    newMessage: (data) ->
        message = new ChatMessage(data)
        MessageView = new ChatMessageView({model: message})
        $('.nano').nanoScroller().nanoScroller({scroll:'bottom'});

    setRoom: (data) ->
      $('body').data('current-room','home');