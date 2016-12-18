
// BASE SETUP
// =============================================================================

// call the packages we need
const express    = require('express');        // call express
const cors       = require('cors');
const app        = express();                 // define our app using express
const bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 8080;        // set our port

const mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost:27017/tunes');

mongoose.connection.on('error', () => {
  console.error('MongoDB Connection Error. Please make sure MongoDB is running.');
});

const Song     = require('./models/songs');

// ROUTES FOR OUR API
// =============================================================================
const router = express.Router();              // get an instance of the express Router

app.use(cors());    //allow api request from anywhere

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log(`Processing ${req.method} for ${req.originalUrl}`);
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'Tunes api!' });   
});

// more routes for our API will happen here

// on routes that end in /songs
// ----------------------------------------------------
router.route('/songs')

    // get all the songs (accessed at GET http://localhost:8080/api/songs)
    .get(function(req, res) {
        Song.find(function(err, songs) {
            if (err)
                res.send(err);

            res.json(songs);
        });
    });

// on routes that end in /artists
// ----------------------------------------------------
router.route('/artists')

    // get all the artist (accessed at GET http://localhost:8080/api/artists)
    .get(function(req, res) {
        Song.distinct("Artist", function(err, songs) {
            if (err)
                res.send(err);

            songs.sort(sortAlpha);
            res.json(songs);
        });
    });

// on routes that end in /albums
// ----------------------------------------------------
router.route('/albums')

    // get all the artist (accessed at GET http://localhost:8080/api/albums)
    .get(function(req, res) {
        Song.distinct("Album", function(err, songs) {
            if (err)
                res.send(err);

            songs.sort(sortAlpha);
            res.json(songs);
        });
    });

 // on routes that end in /songs/name/:Name
 // ----------------------------------------------------
router.route('/songs/name/:Name')

    .get(function(req, res) {
        Song.find({Name: new RegExp(req.params.Name, "i")}, function(err, song) {
            if (err)
                res.send(err);
            res.json(song);
        });
    });


 // on routes that end in /songs/artist/:Artist
 // ----------------------------------------------------
router.route('/songs/artist/:Artist')

    .get(function(req, res) {
        Song.find({Artist: new RegExp(req.params.Artist, "i")}, function(err, song) {
            if (err)
                res.send(err);
            res.json(song);
        });
    });

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Running on port ' + port);

var sortAlpha = function(x,y){
    var a = String(x).toUpperCase();
    var b = String(y).toUpperCase();
    if (a > b)
        return 1;
    if (a < b)
        return -1;
    return 0;
};

module.exports = app;


