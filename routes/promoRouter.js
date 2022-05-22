const express = require('express');
const bodyParser = require('body-parser');

const promoRouter = express.Router();


promoRouter.use(bodyParser.json());

/*
    By specifying / as a "mount" path, app.use() will respond to any path that starts with /, which are all of them and regardless of HTTP verb used.
*/
promoRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end("Will send all the promotions to you!");
})
.post((req,res,next) => {
    res.end('Will add the promotion: ' + req.body.name + ' with details: ' + req.body.description);
})
.put((req,res,next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on Promotions.');
})
.delete((req,res,next) => {
    res.end('Deleting all the /promotions.');
});

promoRouter.route('/' + ':promoId')
.get((req,res,next) => {
    res.end('Will send details of the promotion: ' + req.params.promoId + ' to you.');
})
.post((req,res,next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /promotions/:promoId.');
})
.put((req,res,next) => {
    res.write('Updating the promotion: ' + req.params.promoId + '\n');
    res.end('Will update the promotion: ' + req.body.name + ' with details: ' + req.body.description);
})
.delete((req,res,next) => {
    res.end('Deleting promotions: ' + req.params.promoId);
});

module.exports = promoRouter;