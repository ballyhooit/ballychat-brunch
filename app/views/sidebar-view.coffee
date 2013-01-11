View = require 'views/base/view'
template = require 'views/templates/sidebar'

module.exports = class SidebarView extends View
  className: 'sidebar'
  container: '#chat-settings'
  template: template

  initialize: ->
  	@subscribeEvent 'login', @renderPostLogin

  renderPostLogin:(data) ->
  	@render()