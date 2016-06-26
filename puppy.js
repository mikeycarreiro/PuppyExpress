var express = require('express'),
    backgrounds = require('./lib/backgrounds.js'),
    jqupload = require('jquery-file-upload-middleware');

var app = express();

// set up handlebars view engine
var handlebars = require('express-handlebars').create({
    defaultLayout:'main',
    helpers: {
        section: function(name, options){
            if(!this._sections) this._sections = {};
            this._sections[name] = options.fn(this);
            return null;
        }
    }
});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));

app.use(function(req, res, next) {
    res.locals.showTests = app.get('env') !== 'production' &&
        req.query.debug === 'true';
        next();
});

app.get('/', function(req, res) {
    res.render('home', {
        bgImage: backgrounds.getBackground('home')
    });
});

app.get('/about', function(req, res) {
    res.render('about', {
        bgImage: backgrounds.getBackground('about'),
        pageTestScript: '/qa/tests-about.js'
    });
});

app.get('/puppy-upload', function(req, res) {
    res.render('puppy-upload', {
        bgImage: backgrounds.getBackground('upload')
    });
});

// jQuery file upload middleware
app.use('/upload', function(req, res, next){
    var now = Date.now();
    jqupload.fileHandler({
        uploadDir: function() {
            return __dirname + '/public/uploads/' + now;
        },
        uploadUrl: function() {
            return '/uploads/' + now;
        }
    })(req, res, next);
});

// custom 404 page
app.use(function(req, res, next) {
    res.status(404);
    res.render('404', {
        bgImage: backgrounds.getBackground('error')
    });
});

// custom 500 page
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500);
    res.render('500', {
        bgImage: backgrounds.getBackground('error')
    });
});

app.listen(app.get('port'), function() {
    console.log('Express started on http://localhost:' + app.get('port') +
                '; press Ctrl+C to terminate.');
});