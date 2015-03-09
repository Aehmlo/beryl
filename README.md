#Beryl
Easy, automatic Jade server for development.
##Usage

```javascript
// Require module
var Beryl = require("beryl");

// Instantiate
var b = new Beryl(options);

// Register locals
// All of these do the same thing (excepting the first example, which only registers locals for the "index" view). Use whichever is most convenient.
b.registerLocals("index", {title : "Hello, world!"});
b.registerLocals(["index", "about"], [{title : "Hello, world!"}, {title : "It works!"}]);
b.registerLocals([{view : "index", locals : {title : "Hello, world!"}}, view : "about", locals : {title : "It works!"}}]);

// Access underlying Express app
var app = b.app;
app.listen(1337);
```
###Options
* `views` - String. Jade view directory, defaulting to "./views"
* `pretty` - Boolean. Jade's "pretty" local option, whether to use whitespace to prettify. Defaults to true.
* `defaultView` - String. Jade view name to be rendered when "/" is requested, defaulting to "index." Do not include file extension (".jade").

##License

    Copyright (c) 2015, Aehmlo Lxaitn <aehmlo@aehmlo.com>
    
    Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.
    
    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.