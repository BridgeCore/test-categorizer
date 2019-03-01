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
    res.end('done');
    // request({
    //     "method": "PUT", 
    //     "url": conf.get('WORKSPACE_ENDPOINT') + '/' + workspaceID,
    //     "headers": {
    //         'Authorization': 'Bearer ' + conf.get('API_TOKEN')
    //     }
    // }, (e, r, b) => {
    //     if (!e) {
    //         res.send('done')
    //     } else {
    //         res.send(e);
    //     }
    // });
});

app.get('/test/:wid', (req, res, next) => {
    // console.log(JSON.stringify(req.params));
    console.log(req.params.wid);
    const token = conf.get('API_TOKEN');
    const url = conf.get('WORKSPACE_ENDPOINT') + '/' + req.params.wid + '/all_users';
    console.log(url);
    // res.send(url);
    request({
        "method": "GET",
        "url": url,
        "headers": {
            'Authorization': `Bearer ${token}`
        }
    }, (e, r, b) => {
        if (!e && r.statusCode == 200) {
            // var info = JSON.parse(body);
            console.log(b);
            res.send(b);
        } else {
            console.log(e);
            res.send(e);
        }
    });
});

app.listen(conf.get('PORT'), () => {
    console.log('server running on port: ' + conf.get('PORT'));
});