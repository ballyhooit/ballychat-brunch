(function(/*! Brunch !*/) {
  'use strict';

  var globals = typeof window !== 'undefined' ? window : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};

  var has = function(object, name) {
    return ({}).hasOwnProperty.call(object, name);
  };

  var expand = function(root, name) {
    var results = [], parts, part;
    if (/^\.\.?(\/|$)/.test(name)) {
      parts = [root, name].join('/').split('/');
    } else {
      parts = name.split('/');
    }
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function(name) {
      var dir = dirname(path);
      var absolute = expand(dir, name);
      return globals.require(absolute);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    definition(module.exports, localRequire(name), module);
    var exports = cache[name] = module.exports;
    return exports;
  };

  var require = function(name) {
    var path = expand(name, '.');

    if (has(cache, path)) return cache[path];
    if (has(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has(cache, dirIndex)) return cache[dirIndex];
    if (has(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '"');
  };

  var define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has(bundle, key)) {
          modules[key] = bundle[key];
        }
      }
    } else {
      modules[bundle] = fn;
    }
  };

  globals.require = require;
  globals.require.define = define;
  globals.require.register = define;
  globals.require.brunch = true;
})();

window.require.register("application", function(exports, require, module) {
  var Application, Chaplin, HeaderController, Layout, SessionController, mediator, routes,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Chaplin = require('chaplin');

  mediator = require('mediator');

  routes = require('routes');

  HeaderController = require('controllers/header-controller');

  SessionController = require('controllers/session-controller');

  Layout = require('views/layout');

  module.exports = Application = (function(_super) {

    __extends(Application, _super);

    function Application() {
      return Application.__super__.constructor.apply(this, arguments);
    }

    Application.prototype.title = 'Ballychat';

    Application.prototype.initialize = function() {
      Application.__super__.initialize.apply(this, arguments);
      this.initDispatcher({
        controllerSuffix: '-controller'
      });
      this.initLayout();
      this.initMediator();
      this.initControllers();
      this.initRouter(routes);
      return typeof Object.freeze === "function" ? Object.freeze(this) : void 0;
    };

    Application.prototype.initLayout = function() {
      return this.layout = new Layout({
        title: this.title
      });
    };

    Application.prototype.initControllers = function() {
      new SessionController();
      return new HeaderController();
    };

    Application.prototype.initMediator = function() {
      return mediator.seal();
    };

    return Application;

  })(Chaplin.Application);
  
});
window.require.register("controllers/base/controller", function(exports, require, module) {
  var Chaplin, Controller,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Chaplin = require('chaplin');

  module.exports = Controller = (function(_super) {

    __extends(Controller, _super);

    function Controller() {
      return Controller.__super__.constructor.apply(this, arguments);
    }

    return Controller;

  })(Chaplin.Controller);
  
});
window.require.register("controllers/header-controller", function(exports, require, module) {
  var Controller, HeaderController, HeaderView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Controller = require('controllers/base/controller');

  HeaderView = require('views/header-view');

  module.exports = HeaderController = (function(_super) {

    __extends(HeaderController, _super);

    function HeaderController() {
      return HeaderController.__super__.constructor.apply(this, arguments);
    }

    HeaderController.prototype.initialize = function() {
      HeaderController.__super__.initialize.apply(this, arguments);
      return this.view = new HeaderView();
    };

    return HeaderController;

  })(Controller);
  
});
window.require.register("controllers/home-controller", function(exports, require, module) {
  var Controller, HomeController, HomePageView, SidebarView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Controller = require('controllers/base/controller');

  HomePageView = require('views/home-page-view');

  SidebarView = require('views/sidebar-view');

  module.exports = HomeController = (function(_super) {

    __extends(HomeController, _super);

    function HomeController() {
      return HomeController.__super__.constructor.apply(this, arguments);
    }

    HomeController.prototype.historyURL = 'home';

    HomeController.prototype.title = 'Ballychat';

    HomeController.prototype.index = function() {
      this.view = new HomePageView();
      return this.sidebarView = new SidebarView();
    };

    return HomeController;

  })(Controller);
  
});
window.require.register("controllers/session-controller", function(exports, require, module) {
  var Controller, Google, LoginView, SessionController, User, mediator,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  mediator = require('mediator');

  Controller = require('controllers/base/controller');

  User = require('models/user');

  LoginView = require('views/login_view');

  Google = require('lib/services/google');

  module.exports = SessionController = (function(_super) {

    __extends(SessionController, _super);

    function SessionController() {
      this.logout = __bind(this.logout, this);

      this.serviceProviderSession = __bind(this.serviceProviderSession, this);

      this.triggerLogin = __bind(this.triggerLogin, this);
      return SessionController.__super__.constructor.apply(this, arguments);
    }

    SessionController.serviceProviders = {
      google: new Google()
    };

    SessionController.prototype.loginStatusDetermined = false;

    SessionController.prototype.loginView = null;

    SessionController.prototype.serviceProviderName = null;

    SessionController.prototype.initialize = function() {
      this.subscribeEvent('serviceProviderSession', this.serviceProviderSession);
      this.subscribeEvent('logout', this.logout);
      this.subscribeEvent('!showLogin', this.showLoginView);
      this.subscribeEvent('!login', this.triggerLogin);
      this.subscribeEvent('!logout', this.triggerLogout);
      this.subscribeEvent('loginSuccessful', this.loginCallback);
      return this.getSession();
    };

    SessionController.prototype.loadServiceProviders = function() {
      var name, serviceProvider, _ref, _results;
      _ref = SessionController.serviceProviders;
      _results = [];
      for (name in _ref) {
        serviceProvider = _ref[name];
        _results.push(serviceProvider.load());
      }
      return _results;
    };

    SessionController.prototype.createUser = function(userData) {
      return this.user = mediator.user = new User(userData);
    };

    SessionController.prototype.getSession = function() {
      var name, serviceProvider, _ref, _results;
      this.loadServiceProviders();
      _ref = SessionController.serviceProviders;
      _results = [];
      for (name in _ref) {
        serviceProvider = _ref[name];
        _results.push(serviceProvider.done(serviceProvider.getLoginStatus(this.publishEvent('!showLogin'))));
      }
      return _results;
    };

    SessionController.prototype.showLoginView = function() {
      if (this.loginView) {
        return;
      }
      this.loadServiceProviders();
      return this.loginView = new LoginView({
        serviceProviders: SessionController.serviceProviders
      });
    };

    SessionController.prototype.triggerLogin = function(serviceProviderName) {
      var serviceProvider;
      serviceProvider = SessionController.serviceProviders[serviceProviderName];
      if (!serviceProvider.isLoaded()) {
        this.publishEvent('serviceProviderMissing', serviceProviderName);
        return;
      }
      this.publishEvent('loginAttempt', serviceProviderName);
      return serviceProvider.triggerLogin();
    };

    SessionController.prototype.serviceProviderSession = function(session) {
      this.serviceProviderName = session.provider.name;
      this.disposeLoginView();
      session.id = session.userId;
      delete session.userId;
      return this.publishLogin();
    };

    SessionController.prototype.publishLogin = function() {
      this.loginStatusDetermined = true;
      this.publishEvent('login', mediator.user);
      return this.publishEvent('loginStatus', true);
    };

    SessionController.prototype.triggerLogout = function() {
      return this.publishEvent('logout');
    };

    SessionController.prototype.logout = function() {
      this.loginStatusDetermined = true;
      this.disposeUser();
      localStorage.clear();
      this.serviceProviderName = null;
      this.showLoginView();
      return this.publishEvent('loginStatus', false);
    };

    SessionController.prototype.loginCallback = function(data) {
      this.initSocket(data.accessToken);
      return data.provider.getUserInfo(this.createUser);
    };

    SessionController.prototype.userData = function(data) {
      return mediator.user.set(data);
    };

    SessionController.prototype.initSocket = function(data) {
      var _this = this;
      window.socket = io.connect('http://bc01.jit.su/?token=' + data, {
        port: 80
      });
      window.socket.on('error', function(data) {
        return console.log('Socket.IO Error', data);
      });
      return window.socket.on('connect', function(data) {
        window.delivery = new Delivery(window.socket);
        window.socket.emit('me:chat:init');
        return document.getElementById("chat-input").ondrop = function(e) {
          var file;
          e.preventDefault();
          file = e.dataTransfer.files[0];
          console.log(file);
          return delivery.send(file);
        };
      });
    };

    SessionController.prototype.disposeLoginView = function() {
      if (!this.loginView) {
        return;
      }
      this.loginView.dispose();
      return this.loginView = null;
    };

    SessionController.prototype.disposeUser = function() {
      console.log('SessionController#disposeUser');
      if (!mediator.user) {
        return;
      }
      mediator.user.dispose();
      return mediator.user = null;
    };

    return SessionController;

  })(Controller);
  
});
window.require.register("initialize", function(exports, require, module) {
  var Application;

  Application = require('application');

  $(function() {
    var app;
    app = new Application();
    return app.initialize();
  });
  
});
window.require.register("lib/services/google", function(exports, require, module) {
  var Google, ServiceProvider, utils,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  utils = require('lib/utils');

  ServiceProvider = require('lib/services/service_provider');

  module.exports = Google = (function(_super) {
    var clientId, scopes;

    __extends(Google, _super);

    clientId = '723865775119.apps.googleusercontent.com';

    scopes = 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email';

    Google.prototype.name = 'google';

    function Google() {
      this.loadHandler = __bind(this.loadHandler, this);
      Google.__super__.constructor.apply(this, arguments);
      this.accessToken = localStorage.getItem('accessToken');
    }

    Google.prototype.load = function() {
      if (this.state() === 'resolved' || this.loading) {
        return;
      }
      this.loading = true;
      window.googleClientLoaded = this.loadHandler;
      return utils.loadLib('https://apis.google.com/js/client.js?onload=googleClientLoaded', null, this.reject);
    };

    Google.prototype.loadHandler = function() {
      try {
        delete window.googleClientLoaded;
      } catch (error) {
        window.googleClientLoaded = void 0;
      }
      return gapi.auth.init(this.resolve);
    };

    Google.prototype.isLoaded = function() {
      return Boolean(window.gapi && gapi.auth && gapi.auth.authorize);
    };

    Google.prototype.triggerLogin = function(loginContext) {
      return gapi.auth.authorize({
        client_id: clientId,
        scope: scopes,
        immediate: false
      }, _(this.loginHandler).bind(this, loginContext));
    };

    Google.prototype.loginHandler = function(loginContext, authResponse) {
      if (authResponse) {
        localStorage.setItem('accessToken', authResponse.access_token);
        this.publishEvent('loginSuccessful', {
          provider: this,
          loginContext: loginContext,
          accessToken: authResponse.access_token
        });
        return this.publishEvent('serviceProviderSession', {
          provider: this,
          accessToken: authResponse.access_token
        });
      } else {
        return this.publishEvent('loginFail', {
          provider: this,
          loginContext: loginContext
        });
      }
    };

    Google.prototype.getLoginStatus = function(callback) {
      return gapi.auth.authorize({
        client_id: clientId,
        scope: scopes,
        immediate: true
      }, callback);
    };

    Google.prototype.getUserInfo = function(callback) {
      var request;
      request = gapi.client.request({
        path: '/oauth2/v2/userinfo'
      });
      return request.execute(callback);
    };

    Google.prototype.parsePlusOneButton = function(el) {
      if (window.gapi && gapi.plusone && gapi.plusone.go) {
        return gapi.plusone.go(el);
      } else {
        window.___gcfg = {
          parsetags: 'explicit'
        };
        return utils.loadLib('https://apis.google.com/js/plusone.js', function() {
          try {
            delete window.___gcfg;
          } catch (error) {
            window.___gcfg = void 0;
          }
          return gapi.plusone.go(el);
        });
      }
    };

    return Google;

  })(ServiceProvider);
  
});
window.require.register("lib/services/service_provider", function(exports, require, module) {
  var Chaplin, ServiceProvider, utils;

  utils = require('lib/utils');

  Chaplin = require('chaplin');

  module.exports = ServiceProvider = (function() {

    _(ServiceProvider.prototype).extend(Chaplin.EventBroker);

    ServiceProvider.prototype.loading = false;

    function ServiceProvider() {
      _(this).extend($.Deferred());
      utils.deferMethods({
        deferred: this,
        methods: ['triggerLogin', 'getLoginStatus'],
        onDeferral: this.load
      });
    }

    ServiceProvider.prototype.disposed = false;

    ServiceProvider.prototype.dispose = function() {
      if (this.disposed) {
        return;
      }
      this.unsubscribeAllEvents();
      this.disposed = true;
      return typeof Object.freeze === "function" ? Object.freeze(this) : void 0;
    };

    return ServiceProvider;

  })();

  /*

    Standard methods and their signatures:

    load: ->
      # Load a script like this:
      utils.loadLib 'http://example.org/foo.js', @loadHandler, @reject

    loadHandler: =>
      # Init the library, then resolve
      ServiceProviderLibrary.init(foo: 'bar')
      @resolve()

    isLoaded: ->
      # Return a Boolean
      Boolean window.ServiceProviderLibrary and ServiceProviderLibrary.login

    # Trigger login popup
    triggerLogin: (loginContext) ->
      callback = _(@loginHandler).bind(this, loginContext)
      ServiceProviderLibrary.login callback

    # Callback for the login popup
    loginHandler: (loginContext, response) =>

      eventPayload = {provider: this, loginContext}
      if response
        # Publish successful login
        @publishEvent 'loginSuccessful', eventPayload

        # Publish the session
        @publishEvent 'serviceProviderSession',
          provider: this
          userId: response.userId
          accessToken: response.accessToken
          # etc.

      else
        @publishEvent 'loginFail', eventPayload

    getLoginStatus: (callback = @loginStatusHandler, force = false) ->
      ServiceProviderLibrary.getLoginStatus callback, force

    loginStatusHandler: (response) =>
      return unless response
      @publishEvent 'serviceProviderSession',
        provider: this
        userId: response.userId
        accessToken: response.accessToken
        # etc.
  */

  
});
window.require.register("lib/support", function(exports, require, module) {
  var Chaplin, support, utils;

  Chaplin = require('chaplin');

  utils = require('lib/utils');

  support = utils.beget(Chaplin.support);

  module.exports = support;
  
});
window.require.register("lib/utils", function(exports, require, module) {
  var Chaplin, utils,
    __hasProp = {}.hasOwnProperty;

  Chaplin = require('chaplin');

  utils = Chaplin.utils.beget(Chaplin.utils);

  _(utils).extend({
    loadLib: function(url, success, error, timeout) {
      var head, onload, script, timeoutHandle;
      if (timeout == null) {
        timeout = 7500;
      }
      head = document.head || document.getElementsByTagName('head')[0] || document.documentElement;
      script = document.createElement('script');
      script.async = 'async';
      script.src = url;
      onload = function(_, aborted) {
        if (aborted == null) {
          aborted = false;
        }
        if (!(aborted || !script.readyState || script.readyState === 'complete')) {
          return;
        }
        clearTimeout(timeoutHandle);
        script.onload = script.onreadystatechange = script.onerror = null;
        if (head && script.parentNode) {
          head.removeChild(script);
        }
        script = void 0;
        if (success && !aborted) {
          return success();
        }
      };
      script.onload = script.onreadystatechange = onload;
      script.onerror = function() {
        onload(null, true);
        if (error) {
          return error();
        }
      };
      timeoutHandle = setTimeout(script.onerror, timeout);
      return head.insertBefore(script, head.firstChild);
    },
    /*
      Wrap methods so they can be called before a deferred is resolved.
      The actual methods are called once the deferred is resolved.
    
      Parameters:
    
      Expects an options hash with the following properties:
    
      deferred
        The Deferred object to wait for.
    
      methods
        Either:
        - A string with a method name e.g. 'method'
        - An array of strings e.g. ['method1', 'method2']
        - An object with methods e.g. {method: -> alert('resolved!')}
    
      host (optional)
        If you pass an array of strings in the `methods` parameter the methods
        are fetched from this object. Defaults to `deferred`.
    
      target (optional)
        The target object the new wrapper methods are created at.
        Defaults to host if host is given, otherwise it defaults to deferred.
    
      onDeferral (optional)
        An additional callback function which is invoked when the method is called
        and the Deferred isn't resolved yet.
        After the method is registered as a done handler on the Deferred,
        this callback is invoked. This can be used to trigger the resolving
        of the Deferred.
    
      Examples:
    
      deferMethods(deferred: def, methods: 'foo')
        Wrap the method named foo of the given deferred def and
        postpone all calls until the deferred is resolved.
    
      deferMethods(deferred: def, methods: def.specialMethods)
        Read all methods from the hash def.specialMethods and
        create wrapped methods with the same names at def.
    
      deferMethods(
        deferred: def, methods: def.specialMethods, target: def.specialMethods
      )
        Read all methods from the object def.specialMethods and
        create wrapped methods at def.specialMethods,
        overwriting the existing ones.
    
      deferMethods(deferred: def, host: obj, methods: ['foo', 'bar'])
        Wrap the methods obj.foo and obj.bar so all calls to them are postponed
        until def is resolved. obj.foo and obj.bar are overwritten
        with their wrappers.
    */

    deferMethods: function(options) {
      var deferred, func, host, methods, methodsHash, name, onDeferral, target, _i, _len, _results;
      deferred = options.deferred;
      methods = options.methods;
      host = options.host || deferred;
      target = options.target || host;
      onDeferral = options.onDeferral;
      methodsHash = {};
      if (typeof methods === 'string') {
        methodsHash[methods] = host[methods];
      } else if (methods.length && methods[0]) {
        for (_i = 0, _len = methods.length; _i < _len; _i++) {
          name = methods[_i];
          func = host[name];
          if (typeof func !== 'function') {
            throw new TypeError("utils.deferMethods: method " + name + " notfound on host " + host);
          }
          methodsHash[name] = func;
        }
      } else {
        methodsHash = methods;
      }
      _results = [];
      for (name in methodsHash) {
        if (!__hasProp.call(methodsHash, name)) continue;
        func = methodsHash[name];
        if (typeof func !== 'function') {
          continue;
        }
        _results.push(target[name] = utils.createDeferredFunction(deferred, func, target, onDeferral));
      }
      return _results;
    },
    createDeferredFunction: function(deferred, func, context, onDeferral) {
      if (context == null) {
        context = deferred;
      }
      return function() {
        var args;
        args = arguments;
        if (deferred.state() === 'resolved') {
          return func.apply(context, args);
        } else {
          deferred.done(function() {
            return func.apply(context, args);
          });
          if (typeof onDeferral === 'function') {
            return onDeferral.apply(context);
          }
        }
      };
    }
  });

  module.exports = utils;
  
});
window.require.register("lib/view-helper", function(exports, require, module) {
  var mediator;

  mediator = require('mediator');

  Handlebars.registerHelper('with', function(context, options) {
    if (!context || Handlebars.Utils.isEmpty(context)) {
      return options.inverse(this);
    } else {
      return options.fn(context);
    }
  });

  Handlebars.registerHelper('without', function(context, options) {
    var inverse;
    inverse = options.inverse;
    options.inverse = options.fn;
    options.fn = inverse;
    return Handlebars.helpers["with"].call(this, context, options);
  });
  
});
window.require.register("mediator", function(exports, require, module) {
  
  module.exports = require('chaplin').mediator;
  
});
window.require.register("models/base/collection", function(exports, require, module) {
  var Chaplin, Collection, Model,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Chaplin = require('chaplin');

  Model = require('models/base/model');

  module.exports = Collection = (function(_super) {

    __extends(Collection, _super);

    function Collection() {
      return Collection.__super__.constructor.apply(this, arguments);
    }

    Collection.prototype.model = Model;

    return Collection;

  })(Chaplin.Collection);
  
});
window.require.register("models/base/model", function(exports, require, module) {
  var Chaplin, Model,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Chaplin = require('chaplin');

  module.exports = Model = (function(_super) {

    __extends(Model, _super);

    function Model() {
      return Model.__super__.constructor.apply(this, arguments);
    }

    return Model;

  })(Chaplin.Model);
  
});
window.require.register("models/message", function(exports, require, module) {
  var Message, Model,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Model = require('models/base/model');

  module.exports = Message = (function(_super) {

    __extends(Message, _super);

    function Message() {
      return Message.__super__.constructor.apply(this, arguments);
    }

    return Message;

  })(Model);
  
});
window.require.register("models/user", function(exports, require, module) {
  var Model, User,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Model = require('models/base/model');

  module.exports = User = (function(_super) {

    __extends(User, _super);

    function User() {
      return User.__super__.constructor.apply(this, arguments);
    }

    User.prototype.initialize = function() {};

    return User;

  })(Model);
  
});
window.require.register("routes", function(exports, require, module) {
  
  module.exports = function(match) {
    return match('', 'home#index');
  };
  
});
window.require.register("views/base/collection-view", function(exports, require, module) {
  var Chaplin, CollectionView, View,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Chaplin = require('chaplin');

  View = require('views/base/view');

  module.exports = CollectionView = (function(_super) {

    __extends(CollectionView, _super);

    function CollectionView() {
      return CollectionView.__super__.constructor.apply(this, arguments);
    }

    CollectionView.prototype.getTemplateFunction = View.prototype.getTemplateFunction;

    return CollectionView;

  })(Chaplin.CollectionView);
  
});
window.require.register("views/base/socket-view", function(exports, require, module) {
  var SocketView, View,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('views/base/view');

  require('lib/view-helper');

  module.exports = SocketView = (function(_super) {

    __extends(SocketView, _super);

    function SocketView() {
      return SocketView.__super__.constructor.apply(this, arguments);
    }

    SocketView.prototype.socket = null;

    SocketView.prototype.initialize = function() {
      return SocketView.__super__.initialize.apply(this, arguments);
    };

    SocketView.prototype.delegateSocket = function(event, method) {
      return window.socket.on(event, method);
    };

    SocketView.prototype.emitSocket = function(event, data) {
      return window.socket.emit(event, data);
    };

    return SocketView;

  })(View);
  
});
window.require.register("views/base/view", function(exports, require, module) {
  var Chaplin, View,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Chaplin = require('chaplin');

  require('lib/view-helper');

  module.exports = View = (function(_super) {

    __extends(View, _super);

    function View() {
      return View.__super__.constructor.apply(this, arguments);
    }

    View.prototype.getTemplateFunction = function() {
      return this.template;
    };

    return View;

  })(Chaplin.View);
  
});
window.require.register("views/chat/input-view", function(exports, require, module) {
  var ChatInputView, View, template,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('views/base/socket-view');

  template = require('views/templates/chat/input');

  module.exports = ChatInputView = (function(_super) {

    __extends(ChatInputView, _super);

    function ChatInputView() {
      return ChatInputView.__super__.constructor.apply(this, arguments);
    }

    ChatInputView.prototype.template = template;

    ChatInputView.prototype.tagName = 'section';

    ChatInputView.prototype.id = 'chat-input';

    ChatInputView.prototype.className = 'container';

    ChatInputView.prototype.container = 'body.container';

    ChatInputView.prototype.initialize = function(options) {
      ChatInputView.__super__.initialize.apply(this, arguments);
      this.render();
      return this.delegate('keypress', this.sendMessage);
    };

    ChatInputView.prototype.sendMessage = function(e) {
      var currentRoom, inputText;
      inputText = $('#chat-input textarea').val().trim();
      currentRoom = $("body").data("current-room");
      if (e.which === 13 && inputText) {
        this.emitSocket("message:post", {
          room: currentRoom,
          msg: inputText
        });
        $('#chat-input textarea').val("");
        return false;
      }
    };

    return ChatInputView;

  })(View);
  
});
window.require.register("views/chat/message-view", function(exports, require, module) {
  var ChatMessageView, View, template,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('views/base/view');

  template = require('views/templates/chat/message');

  module.exports = ChatMessageView = (function(_super) {

    __extends(ChatMessageView, _super);

    function ChatMessageView() {
      return ChatMessageView.__super__.constructor.apply(this, arguments);
    }

    ChatMessageView.prototype.template = template;

    ChatMessageView.prototype.container = '#chat-content-messages';

    ChatMessageView.prototype.id = 'chat-message';

    ChatMessageView.prototype.initialize = function(options) {
      ChatMessageView.__super__.initialize.apply(this, arguments);
      this.render();
      return this.$el.find('time.timeago').timeago();
    };

    return ChatMessageView;

  })(View);
  
});
window.require.register("views/header-view", function(exports, require, module) {
  var HeaderView, View, template,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('views/base/view');

  template = require('views/templates/header');

  module.exports = HeaderView = (function(_super) {

    __extends(HeaderView, _super);

    function HeaderView() {
      return HeaderView.__super__.constructor.apply(this, arguments);
    }

    HeaderView.prototype.autoRender = true;

    HeaderView.prototype.className = 'header';

    HeaderView.prototype.container = '.navbar';

    HeaderView.prototype.id = 'header';

    HeaderView.prototype.template = template;

    return HeaderView;

  })(View);
  
});
window.require.register("views/home-page-view", function(exports, require, module) {
  var ChatInputView, ChatMessage, ChatMessageView, HomePageView, View, template,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  template = require('views/templates/home');

  View = require('views/base/socket-view');

  ChatInputView = require('views/chat/input-view');

  ChatMessageView = require('views/chat/message-view');

  ChatMessage = require('models/message');

  module.exports = HomePageView = (function(_super) {

    __extends(HomePageView, _super);

    function HomePageView() {
      return HomePageView.__super__.constructor.apply(this, arguments);
    }

    HomePageView.prototype.className = 'content';

    HomePageView.prototype.id = 'chat-content-messages';

    HomePageView.prototype.container = '#chat-content';

    HomePageView.prototype.template = template;

    HomePageView.prototype.initialize = function(options) {
      var _this = this;
      HomePageView.__super__.initialize.apply(this, arguments);
      this.subscribeEvent('login', this.renderPostLogin);
      return $(window).resize(function() {
        return _this.resizeHandle();
      });
    };

    HomePageView.prototype.renderPostLogin = function(data) {
      this.render();
      this.subview('input-view', new ChatInputView());
      this.subview('input-view').render();
      this.delegateSocket('message:get', this.newMessage);
      this.delegateSocket('chat:init', this.setRoom);
      return this.resizeHandle();
    };

    HomePageView.prototype.resizeHandle = function() {
      var chatHeight;
      chatHeight = $(window).height() - $('header.navbar').height() - $('#chat-input').height() - 25;
      $('#chat-container').height(chatHeight);
      return $('.nano').nanoScroller().nanoScroller({
        scroll: 'bottom'
      });
    };

    HomePageView.prototype.newMessage = function(data) {
      var MessageView, message;
      message = new ChatMessage(data);
      MessageView = new ChatMessageView({
        model: message
      });
      return $('.nano').nanoScroller().nanoScroller({
        scroll: 'bottom'
      });
    };

    HomePageView.prototype.setRoom = function(data) {
      return $('body').data('current-room', 'home');
    };

    return HomePageView;

  })(View);
  
});
window.require.register("views/layout", function(exports, require, module) {
  var Chaplin, Layout,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Chaplin = require('chaplin');

  module.exports = Layout = (function(_super) {

    __extends(Layout, _super);

    function Layout() {
      return Layout.__super__.constructor.apply(this, arguments);
    }

    return Layout;

  })(Chaplin.Layout);
  
});
window.require.register("views/login_view", function(exports, require, module) {
  var LoginView, View, template, utils,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  utils = require('lib/utils');

  View = require('views/base/view');

  template = require('views/templates/login');

  module.exports = LoginView = (function(_super) {

    __extends(LoginView, _super);

    function LoginView() {
      return LoginView.__super__.constructor.apply(this, arguments);
    }

    LoginView.prototype.template = template;

    LoginView.prototype.autoRender = true;

    LoginView.prototype.container = '.nav';

    LoginView.prototype.tagName = 'li';

    LoginView.prototype.initialize = function(options) {
      LoginView.__super__.initialize.apply(this, arguments);
      return this.initButtons(options.serviceProviders);
    };

    LoginView.prototype.initButtons = function(serviceProviders) {
      var _this = this;
      return _.each(serviceProviders, function(serviceProvider, serviceProviderName) {
        var bind, buttonSelector;
        bind = function(fn) {
          return _(fn).bind(_this, serviceProviderName, serviceProvider);
        };
        buttonSelector = "." + serviceProviderName;
        _this.$(buttonSelector).addClass('service-loading');
        _this.delegate('click', buttonSelector, bind(_this.loginWith));
        serviceProvider.done(bind(_this.serviceProviderLoaded));
        return serviceProvider.fail(bind(_this.serviceProviderFailed));
      });
    };

    LoginView.prototype.loginWith = function(serviceProviderName, serviceProvider, event) {
      event.preventDefault();
      if (!serviceProvider.isLoaded()) {
        return;
      }
      this.publishEvent('login:pickService', serviceProviderName);
      return this.publishEvent('!login', serviceProviderName);
    };

    LoginView.prototype.serviceProviderLoaded = function(serviceProviderName) {
      return this.$("." + serviceProviderName).removeClass('service-loading');
    };

    LoginView.prototype.serviceProviderFailed = function(serviceProviderName) {
      return this.$("." + serviceProviderName).removeClass('service-loading').addClass('service-unavailable').attr('disabled', true).attr('title', "Error connecting. Please check whether you areblocking " + (utils.upcase(serviceProviderName)) + ".");
    };

    return LoginView;

  })(View);
  
});
window.require.register("views/sidebar-view", function(exports, require, module) {
  var SidebarContentView, SidebarHeaderView, SidebarView, View, template,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('views/base/view');

  template = require('views/templates/sidebar');

  SidebarHeaderView = require('views/sidebar/header-view');

  SidebarContentView = require('views/sidebar/content-view');

  module.exports = SidebarView = (function(_super) {

    __extends(SidebarView, _super);

    function SidebarView() {
      return SidebarView.__super__.constructor.apply(this, arguments);
    }

    SidebarView.prototype.className = 'sidebar';

    SidebarView.prototype.container = '#chat-settings';

    SidebarView.prototype.template = template;

    SidebarView.prototype.initialize = function(options) {
      SidebarView.__super__.initialize.apply(this, arguments);
      return this.subscribeEvent('login', this.renderPostLogin);
    };

    SidebarView.prototype.renderPostLogin = function(data) {
      this.render();
      this.subview('header', new SidebarHeaderView());
      this.subview('content', new SidebarContentView());
      this.subview('header').render();
      return this.subview('content').render();
    };

    return SidebarView;

  })(View);
  
});
window.require.register("views/sidebar/content-view", function(exports, require, module) {
  var SidebarContentView, View, template,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('views/base/socket-view');

  template = require('views/templates/sidebar/content');

  module.exports = SidebarContentView = (function(_super) {

    __extends(SidebarContentView, _super);

    function SidebarContentView() {
      return SidebarContentView.__super__.constructor.apply(this, arguments);
    }

    SidebarContentView.prototype.template = template;

    SidebarContentView.prototype.tagName = 'div';

    SidebarContentView.prototype.className = 'tab-content';

    SidebarContentView.prototype.container = 'div.sidebar';

    SidebarContentView.prototype.initialize = function(options) {
      this.socket = window.socket;
      this.delegate('click', 'ul#room-list li', this.changeRooms);
      this.delegateSocket('chat:init', this.chatInit);
      this.delegateSocket('user:get', this.addUser);
      this.delegateSocket('user:delete', this.removeUser);
      this.delegateSocket('room:get', this.addRoom);
      return SidebarContentView.__super__.initialize.apply(this, arguments);
    };

    SidebarContentView.prototype.changeRooms = function(e) {
      var room;
      room = $(e.target).data("room");
      this.emitSocket("room:join", {
        room: room
      });
      return $("body").data("current-room", room);
    };

    SidebarContentView.prototype.chatInit = function(data) {
      var i, _results;
      $("ul#room-list").empty();
      $("#users").empty();
      i = 0;
      while (i < data.rooms.length) {
        $("ul#room-list").append('<li class="room"><a href="#" data-room="' + data.rooms[i] + '">' + data.rooms[i] + '</a></li>');
        i++;
      }
      i = 0;
      _results = [];
      while (i < data.users.length) {
        $("#users").append('<div id="user" data-user="' + data.users[i] + '"><p>' + data.users[i] + '</p></div>');
        _results.push(i++);
      }
      return _results;
    };

    SidebarContentView.prototype.addUser = function(data) {
      var users;
      users = $("#users").find("[data-user='" + data.user + "']");
      if (users.length === 0) {
        return $('#users').append('<div id="user" data-user="' + data.user + '"><p>' + data.user + '</p></div>');
      }
    };

    SidebarContentView.prototype.removeUser = function(data) {
      var users;
      users = $("#users").find("[data-user='" + data.user + "']");
      if (users.length === 1) {
        return users.remove();
      }
    };

    SidebarContentView.prototype.addRoom = function(data) {
      var rooms;
      rooms = $('ul#room-list').find("[data-room='" + data.room + "']");
      if (rooms.length === 0) {
        return $("ul#room-list").append('<li class="room"><a href="#" data-room="' + data.room + '">' + data.room + '</a></li>');
      }
    };

    return SidebarContentView;

  })(View);
  
});
window.require.register("views/sidebar/header-view", function(exports, require, module) {
  var SidebarHeaderView, View, template,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('views/base/socket-view');

  template = require('views/templates/sidebar/header');

  module.exports = SidebarHeaderView = (function(_super) {

    __extends(SidebarHeaderView, _super);

    function SidebarHeaderView() {
      return SidebarHeaderView.__super__.constructor.apply(this, arguments);
    }

    SidebarHeaderView.prototype.template = template;

    SidebarHeaderView.prototype.tagName = 'ul';

    SidebarHeaderView.prototype.className = 'nav nav-tabs';

    SidebarHeaderView.prototype.id = 'settings-tabs';

    SidebarHeaderView.prototype.container = 'div.sidebar';

    SidebarHeaderView.prototype.initialize = function(options) {
      return SidebarHeaderView.__super__.initialize.apply(this, arguments);
    };

    return SidebarHeaderView;

  })(View);
  
});
window.require.register("views/templates/chat/input", function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    


    return "<textarea type=\"text\" placeholder=\"Enter a message....\" rows=\"2\"></textarea>";});
});
window.require.register("views/templates/chat/message", function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression;


    buffer += "<p><strong>";
    foundHelper = helpers.nickname;
    if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
    else { stack1 = depth0.nickname; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
    buffer += escapeExpression(stack1) + "</strong>: ";
    foundHelper = helpers.msg;
    if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
    else { stack1 = depth0.msg; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
    buffer += escapeExpression(stack1) + "</p><time class=\"timeago\" datetime=\"";
    foundHelper = helpers.messageTime;
    if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
    else { stack1 = depth0.messageTime; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
    buffer += escapeExpression(stack1) + "\">";
    foundHelper = helpers.messageTime;
    if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
    else { stack1 = depth0.messageTime; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
    buffer += escapeExpression(stack1) + "</time>";
    return buffer;});
});
window.require.register("views/templates/header", function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var buffer = "";


    return buffer;});
});
window.require.register("views/templates/home", function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var buffer = "";


    return buffer;});
});
window.require.register("views/templates/login", function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    


    return "<a class=\"google\" href=\"#\">Login</a>";});
});
window.require.register("views/templates/sidebar", function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var buffer = "";


    return buffer;});
});
window.require.register("views/templates/sidebar/content", function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    


    return "<div class=\"tab-pane active\" id=\"users\"></div>\n<div class=\"tab-pane\" id=\"rooms\"><ul id=\"room-list\"></ul></div>\n<div class=\"tab-pane\" id=\"settings\"><p>Settings</p></div>";});
});
window.require.register("views/templates/sidebar/header", function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    


    return "<li class=\"active\"><a data-toggle=\"tab\" href='#users'><i class=\"icon-user\"></i></a></li>\n<li><a data-toggle=\"tab\" href='#rooms'><i class=\"icon-home\"></i></a></li>\n<li><a data-toggle=\"tab\" href='#settings'><i class=\"icon-pencil\"></i></a></li>";});
});
