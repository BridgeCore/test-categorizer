var express = require('express');
var hbs = require('express-handlebars');
var bodyParser = require('body-parser');
var conf = require('./config');
var request = require('request');
var categorizer = require('./services/categorizerStub');
var querystring = require('querystring');

var app = express();
app.set('view engine', 'hbs');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({
    extended: true
}));
app.engine('hbs', hbs({
    extname: 'hbs',
    defaultView: 'default',
    layoutsDir: __dirname + '/views/pages/',
    partialsDir: __dirname + '/views/partials/'
}));

// expects a request to categorize a workspace of the form:
// /categorize?workspaceid=abcdefg&actorid=421
app.get('/categorize', function (req, res, next) {
    var cleanedWorkspaceID = querystring.escape(req.query.workspaceid);
    var cleanedActorID = querystring.escape(req.query.actorid);
    res.render('categorize', {
        workspaceID: cleanedWorkspaceID,
        actorID: cleanedActorID
    });
});


app.post('/send', (req, res, next) => {
    var workspaceID = querystring.escape(req.body.workspaceID);
    var actorID = querystring.escape(req.body.actorID);
    var category = querystring.escape(req.body.category);
    var data = categorizer.getData(category);
    console.log(data);
    request({
        "method": "PUT",
        "url": conf.get('API_ENDPOINT') + '/workspaces/' + workspaceID + '/cam/data',
        "headers": {
            'Authorization': 'Bearer ' + conf.get('API_TOKEN')
        },
        "json": {
            'cam_data': data
        }
    }, (e, r, b) => {
        if (!e) {
            res.send('done')
        } else {
            res.send(e);
        }
    });
});

app.listen(conf.get('PORT'), () => {
    console.log('server running on port: ' + conf.get('PORT'));
});
