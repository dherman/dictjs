# dict.js

*by [Dave herman](http://blog.mozilla.com/dherman)*

Simple dictionaries with lightweight syntax, using ES6 features (proxies, weak maps).

Examples:

    js> var d = new Dict({ foo: 17, bar: "hello world", baz: 42 });
    js> Dict.size(d)
    3
    js> d.foo
    17
    js> "bar" in d
    true
    js> "hasOwnProperty" in d
    false
    js> d instanceof Dict
    true
    js> d instanceof Object
    false

