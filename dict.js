var Dict = (function() {

    var proto = Object.create(null, {});
    Object.freeze(proto);

    var hasOwn = Function.call.bind(Function.call, Object.hasOwnProperty);

    function Handler(store) {
        this.store = store;
        var size = 0;
        for (var key in store) {
            if (hasOwn(store, key))
                size++;
        }
        this.size = size;
    }

    Handler.prototype = {
        getOwnPropertyDescriptor: function(key) {
            return Object.getOwnPropertyDescriptor(this.store, key);
        },
        getPropertyDescriptor: function(key) {
            return Object.getOwnPropertyDescriptor(this.store, key);
        },
        getOwnPropertyNames: function() {
            return Object.getOwnPropertyNames(this.store);
        },
        getPropertyNames: function() {
            return Object.getOwnPropertyNames(this.store);
        },
        defineProperty: function(key, desc) {
            if (!desc.value)
                throw new TypeError("getters and setters disallowed");
            if (!hasOwn(this.store, key))
                this.size++;
            this.store[key] = desc.value;
        },
        delete: function(key) {
            if (!hasOwn(this.store, key))
                return true;
            delete this.store[key];
            this.size--;
            return true;
        },
        fix: function() {
            return;
        },
        has: function(key) {
            return hasOwn(this.store, key);
        },
        hasOwn: function(key) {
            return hasOwn(this.store, key);
        },
        get: function(receiver, key) {
            if (hasOwn(this.store, key))
                return this.store[key];
        },
        set: function(receiver, key, val) {
            if (!hasOwn(this.store, key))
                this.size++;
            this.store[key] = val;
            return true;
        },
        enumerate: function() {
            var result = [];
            for (var key in this.store)
                result.push(key);
            return result;
        },
        keys: function() {
            return Object.keys(this.store);
        }
    };

    var handlers = new WeakMap;

    function Dict(store) {
        if (typeof store !== "object")
            return new Dict({});
        if (!(this instanceof Dict))
            return new Dict(store);
        var handler = new Handler(store);
        var self = Proxy.create(handler, proto);
        handlers.set(self, handler);
        return self;
    }

    Dict.prototype = proto;

    Dict.from = function from(src) {
        var store = {};
        for (var key in src) {
            if (hasOwn(src, key))
                store[key] = src[key];
        }
        return new Dict(store);
    };

    Dict.size = function size(dict) {
        var handler = handlers.get(dict);
        if (!handler)
            throw new TypeError("not a dict: " + dict);
        return handler.size;
    };

    Dict.keys = function keys(dict) {
        return Object.keys(dict);
    };

    Dict.vals = function vals(dict) {
        return Dict.keys(dict).map(function(key) {
            return dict[key];
        });
    };

    Dict.items = function items(dict) {
        return Dict.keys(dict).map(function(key) {
            return [key, dict[key]];
        });
    };

    return Dict;

})();
