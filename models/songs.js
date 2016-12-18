var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var SongSchema   = new Schema({
    Name: String,
    Time: String,
    Artist: String,
    Album: String
});

module.exports = mongoose.model('Song', SongSchema);