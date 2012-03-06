var util = require('util');
var path = require('path');
var _ = require('underscore');
_.str = require('underscore.string');
_.mixin(_.str.exports());

var express = require('./node_modules/nuby-express/node_modules/express');
var ejs = require('./node_modules/nuby-express/node_modules/ejs');
var ne_static = require('./node_modules/nuby-express/lib/ne_static');
var ne = require('./node_modules/nuby-express');

var session_secret = "I want to retrieve";
var port = 1234;
var static_contexts = [
    {root:__dirname + '/public', prefix:''}
];

var app = express.createServer();

//app.use(express.logger(...));
app.use(express.bodyParser());
app.use(express.cookieParser());
app.set('flash', true);

var MemoryStore = express.session.MemoryStore;
var session_store = new MemoryStore();
var session = express.session({secret:session_secret, store: session_store});
app.use(session);
app.set('session', session);
app.set('session_store', session_store);

app.set('view_engine', 'ejs');
app.register('.html', ejs);
app.set('view options', {layout:true});
app.set('views', __dirname + '/views');

app.set('static contexts', static_contexts);
app.use(ne_static({contexts:static_contexts}));

var fw_configs = {

    params:{
        session_secret:session_secret,
        flash_keys:['info', 'error'],
        layout_id:'h5'
    },

    app_root:__dirname,
    app:app,
    ejs: ejs
}

var framework = new ne.Framework(fw_configs);


var layout_path = path.resolve(__dirname,  'layouts');
console.log('layouts from %s', layout_path);
framework.add_layouts(layout_path, function () {
    var loader = new ne.Loader();

    loader.load(framework, function(){
        console.log("listening on port %s", port);
        app.listen(port);
    }, [ __dirname + '/app']);

});

