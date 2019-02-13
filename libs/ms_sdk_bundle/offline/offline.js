/**
 * Created by Maxim Balyaba on 2/1/2016.
 */
(function (root, factory) {
    "use strict";

    if (typeof define === 'function' && define.amd) {
        define([], function () {
            return factory();
        });
    } else {
        root.Offline = factory();
    }

}(this, function () {
    "use strict";

    var Offline, checkXHR, extendNative, defaultOptions, handlers;

    Offline = {};

    Offline.lastEvent = undefined;

    Offline.state = 'up';

    Offline._isListening = false;

    handlers = {};

    Offline.options = Offline.options || {};

    Offline.checks = {};

    defaultOptions = {
        checks: {
            xhr: {
                url: function() {
                    return "/favicon.ico?_=" + (Math.floor(Math.random() * 1000000000));
                },
                timeout: 5000,
                type: 'HEAD'
            },
            image: {
                url: function() {
                    return "/favicon.ico?_=" + (Math.floor(Math.random() * 1000000000));
                }
            },
            active: 'xhr'
        }
    };

    Offline.grab = function(obj, key) {
        var cur, i, part, parts, _i, _len;
        cur = obj;
        parts = key.split('.');
        for (i = _i = 0, _len = parts.length; _i < _len; i = ++_i) {
            part = parts[i];
            cur = cur[part];
            if (typeof cur !== 'object') {
                break;
            }
        }
        if (i === parts.length - 1) {
            return cur;
        } else {
            return void 0;
        }
    };

    Offline.getOption = function(key) {
        var val, _ref;
        val = (_ref = Offline.grab(Offline.options, key)) != null ? _ref : Offline.grab(defaultOptions, key);
        if (typeof val === 'function') {
            return val();
        } else {
            return val;
        }
    };

    Offline.onlineEventHandler = function(){
        return setTimeout(Offline.confirmUp, 100);        
    }

    Offline.offlineEventHandler = function(){
        return Offline.confirmDown();
    }

    Offline.markUp = function() {
        if(Offline.lastEvent !== 'online') {
            Offline.lastEvent = 'online';
            Offline.trigger('confirmed-up');
            if (Offline.state === 'up') {
                return;
            }
            Offline.state = 'up';
        }

        return Offline.trigger('up');
    };

    Offline.markDown = function() {
		Offline.trigger('confirmed-down');
        if(Offline.lastEvent !== 'offline') {
            Offline.lastEvent = 'offline';            
            if (Offline.state === 'down') {
                return;
            }
            Offline.state = 'down';
			return Offline.trigger('down');
        }       
    };

    Offline.on = function(event, handler, ctx) {
        var e, events, _i, _len, _results;
        events = event.split(' ');
        if (events.length > 1) {
            _results = [];
            for (_i = 0, _len = events.length; _i < _len; _i++) {
                e = events[_i];
                _results.push(Offline.on(e, handler, ctx));
            }
            return _results;
        } else {
            if (handlers[event] == null) {
                handlers[event] = [];
            }
            return handlers[event].push([ctx, handler]);
        }
    };

    Offline.off = function(event, handler) {
        var ctx, i, _handler, _ref, _results;
        if (handlers[event] == null) {
            return;
        }
        if (!handler) {
            return handlers[event] = [];
        } else {
            i = 0;
            _results = [];
            while (i < handlers[event].length) {
                _ref = handlers[event][i], ctx = _ref[0], _handler = _ref[1];
                if (_handler === handler) {
                    _results.push(handlers[event].splice(i, 1));
                } else {
                    _results.push(i++);
                }
            }
            return _results;
        }
    };

    Offline.trigger = function(event) {
        var ctx, handler, _i, _len, _ref, _ref1, _results;
        if (handlers[event] != null) {
            _ref = handlers[event];
            _results = [];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                _ref1 = _ref[_i], ctx = _ref1[0], handler = _ref1[1];
                _results.push(handler.call(ctx));
            }
            return _results;
        }
    };

    checkXHR = function(xhr, onUp, onDown) {
        var checkStatus, _onerror, _onload, _onreadystatechange, _ontimeout;
        checkStatus = function() {
            if (xhr.status && xhr.status < 12000) {
                return onUp();
            } else {
                return onDown();
            }
        };
        if (xhr.onprogress === null) {
            _onerror = xhr.onerror;
            xhr.onerror = function() {
                onDown();
                return typeof _onerror === "function" ? _onerror.apply(null, arguments) : void 0;
            };
            _ontimeout = xhr.ontimeout;
            xhr.ontimeout = function() {
                onDown();
                return typeof _ontimeout === "function" ? _ontimeout.apply(null, arguments) : void 0;
            };
            _onload = xhr.onload;
            return xhr.onload = function() {
                checkStatus();
                return typeof _onload === "function" ? _onload.apply(null, arguments) : void 0;
            };
        } else {
            _onreadystatechange = xhr.onreadystatechange;
            return xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    checkStatus();
                } else if (xhr.readyState === 0) {
                    onDown();
                }
                return typeof _onreadystatechange === "function" ? _onreadystatechange.apply(null, arguments) : void 0;
            };
        }
    };

    Offline.checks.xhr = function() {
        var e, xhr;
        xhr = new XMLHttpRequest;
        xhr.offline = false;
        xhr.open(Offline.getOption('checks.xhr.type'), Offline.getOption('checks.xhr.url'), true);
        if (xhr.timeout != null) {
            xhr.timeout = Offline.getOption('checks.xhr.timeout');
        }
        checkXHR(xhr, Offline.markUp, Offline.markDown);
        try {
            xhr.send();
        } catch (_error) {
            e = _error;
            Offline.markDown();
        }
        return xhr;
    };

    Offline.checks.down = Offline.markDown;

    Offline.checks.up = Offline.markUp;

    Offline.check = function() {
        Offline.trigger('checking');
        return Offline.checks.xhr();
    };

    Offline.confirmUp = Offline.confirmDown = Offline.check;

    Offline.isListeningForNetworkChange = function(){
        return Offline._isListening || false;
    }

    Offline.listen = function(){
        Offline._isListening = true;
        if (window.addEventListener) {
            window.addEventListener("online", Offline.onlineEventHandler, true);
            window.addEventListener("offline", Offline.offlineEventHandler, true);
        } else {
            document.body.ononline = Offline.onlineEventHandler;
            document.body.onoffline = Offline.offlineEventHandler;
        }
    }

    /*Recconect module*/
    var down, next, nope, rc, reset, retryIntv, tick, tryNow, up;

    rc = Offline.reconnect = {};

    retryIntv = null;

    reset = function() {
        var ref;
        if ((rc.state != null) && rc.state !== 'inactive') {
            Offline.trigger('reconnect:stopped');
        }
        rc.state = 'inactive';
        return rc.remaining = rc.delay = (ref = Offline.getOption('reconnect.initialDelay')) != null ? ref : 3;
    };

    next = function() {
        var delay, ref;
        delay = (ref = Offline.getOption('reconnect.delay')) != null ? ref : Math.min(Math.ceil(rc.delay * 1.5), 3600);
        return rc.remaining = rc.delay = delay;
    };

    tick = function() {
        if (rc.state === 'connecting') {
            return;
        }
        rc.remaining -= 1;
        Offline.trigger('reconnect:tick');
        if (rc.remaining === 0) {
            return tryNow();
        }
    };

    tryNow = function() {
        if (rc.state !== 'waiting') {
            return;
        }
        Offline.trigger('reconnect:connecting');
        rc.state = 'connecting';
        return Offline.check();
    };

    down = function() {
        if (!Offline.getOption('reconnect.delay')) {
            return;
        }
        reset();
        rc.state = 'waiting';
        Offline.trigger('reconnect:started');
        return retryIntv = setInterval(tick, 1000);
    };

    up = function() {
        if (retryIntv != null) {
            clearInterval(retryIntv);
        }
        return reset();
    };

    nope = function() {
        if (!Offline.getOption('reconnect.delay')) {
            return;
        }
        if (rc.state === 'connecting') {
            Offline.trigger('reconnect:failure');
            rc.state = 'waiting';
            return next();
        }
    };

    extendNative = function(to, from) {
        var e, key, results, val;
        results = [];
        for (key in from.prototype) {
            try {
                val = from.prototype[key];
                if ((to[key] == null) && typeof val !== 'function') {
                    results.push(to[key] = val);
                } else {
                    results.push(void 0);
                }
            } catch (_error) {
                e = _error;
            }
        }
        return results;
    };

    Offline.onXHR = function(cb) {
        var _XDomainRequest, _XMLHttpRequest, monitorXHR;
        monitorXHR = function(req, flags) {
            var _open;
            _open = req.open;
            return req.open = function(type, url, async, user, password) {
                cb({
                    type: type,
                    url: url,
                    async: async,
                    flags: flags,
                    user: user,
                    password: password,
                    xhr: req
                });
                return _open.apply(req, arguments);
            };
        };
        _XMLHttpRequest = window.XMLHttpRequest;
        window.XMLHttpRequest = function(flags) {
            var _overrideMimeType, _setRequestHeader, req;
            req = new _XMLHttpRequest(flags);
            monitorXHR(req, flags);
            _setRequestHeader = req.setRequestHeader;
            req.headers = {};
            req.setRequestHeader = function(name, value) {
                req.headers[name] = value;
                return _setRequestHeader.call(req, name, value);
            };
            _overrideMimeType = req.overrideMimeType;
            req.overrideMimeType = function(type) {
                req.mimeType = type;
                return _overrideMimeType.call(req, type);
            };
            return req;
        };
        extendNative(window.XMLHttpRequest, _XMLHttpRequest);
        if (window.XDomainRequest != null) {
            _XDomainRequest = window.XDomainRequest;
            window.XDomainRequest = function() {
                var req;
                req = new _XDomainRequest;
                monitorXHR(req);
                return req;
            };
            return extendNative(window.XDomainRequest, _XDomainRequest);
        }
    };

    Offline.init = function() {
        delete Offline.lastEvent;
        if (Offline.getOption('interceptRequests')) {
            Offline.onXHR(function(arg) {
                var xhr;
                xhr = arg.xhr;
                if (xhr.offline !== false) {
                    return checkXHR(xhr, Offline.markUp, Offline.confirmDown);
                }
            });
        }
    };

    rc.tryNow = tryNow;

    reset();

    Offline.on('down', down);

    Offline.on('confirmed-down', nope);

    Offline.on('up', up);

    return Offline;
}));