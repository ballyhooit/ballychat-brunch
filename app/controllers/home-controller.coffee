Controller = require 'controllers/base/controller'
HomePageView = require 'views/home-page-view'
SidebarView = require 'views/sidebar-view'

module.exports = class HomeController extends Controller
  historyURL: 'home'
  title: 'Ballychat'

  index: ->
    @view = new HomePageView()
    @sidebarView = new SidebarView()
