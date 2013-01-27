View = require 'views/base/view'
template = require 'views/templates/sidebar'
SidebarHeaderView = require 'views/sidebar/header-view'
SidebarContentView = require 'views/sidebar/content-view'

module.exports = class SidebarView extends View
  className: 'sidebar'
  container: '#chat-settings'
  template: template

  initialize: (options) ->
    super
    @subscribeEvent 'login', @renderPostLogin

  renderPostLogin:(data) ->
    @render()
    @subview 'header', new SidebarHeaderView()
    @subview 'content', new SidebarContentView()
    @subview('header').render()
    @subview('content').render()