View = require 'views/base/socket-view'
template = require 'views/templates/sidebar/header'

module.exports = class SidebarHeaderView extends View
  template: template
  tagName: 'ul'
  className: 'nav nav-tabs'
  id: 'settings-tabs'
  container: 'div.sidebar'

  initialize: (options) ->
    super
