View = require 'views/base/socket-view'
template = require 'views/templates/sidebar/content'

module.exports = class SidebarContentView extends View
	template: template
	tagName: 'div'
	className: 'tab-content'
	container: 'div.sidebar'

	initialize: (options) ->
		@socket = window.socket
		@delegate('click', 'ul#room-list li', @changeRooms)
		@delegateSocket 'chat:init', @chatInit
		@delegateSocket 'user:get', @addUser
		@delegateSocket 'user:delete', @removeUser
		@delegateSocket 'room:get', @addRoom
		super

	changeRooms: (e) ->
		room = $(e.target).data("room")
		@emitSocket "room:join",
			room: room
		$("body").data "current-room", room

	chatInit: (data) ->
		$("ul#room-list").empty()
		$("#users").empty()
		i = 0
		while i < data.rooms.length
			$("ul#room-list").append '<li class="room"><a href="#" data-room="'+data.rooms[i]+'">'+data.rooms[i]+'</a></li>'
			i++
		i = 0
		while i < data.users.length
			$("#users").append '<div id="user" data-user="'+data.users[i]+'"><p>'+data.users[i]+'</p></div>'
			i++

	addUser:(data) ->
		users = $("#users").find("[data-user='" + data.user + "']");
		if users.length == 0
			$('#users').append('<div id="user" data-user="'+data.user+'"><p>'+data.user+'</p></div>')

	removeUser: (data) ->
		users = $("#users").find("[data-user='" + data.user + "']");
		if users.length == 1
			users.remove()

	addRoom: (data) ->
		rooms = $('ul#room-list').find("[data-room='"+data.room+"']")
		if rooms.length == 0
			$("ul#room-list").append '<li class="room"><a href="#" data-room="'+data.room+'">'+data.room+'</a></li>'