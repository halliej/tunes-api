const https = require("http");

var options = {
			host: '127.0.0.1',
			port: 8080,
			path: '/api',
			method: 'GET'
    	};

module.exports = {
    loadAll(loadWhat, callback) {
        //reset path
        options.path = '/api';
		//set path based on what they want
        if(loadWhat === 'songs')
		    options.path += "/songs";
        else if(loadWhat === 'artists')
		    options.path += "/artists";
        else if(loadWhat === 'albums')
		    options.path += "/albums";
        else
            options.path += "/error";
       
		//do the query
		https.get(options, function(res) {
			var body = "";
			res.setEncoding("UTF-8");
			res.on("data", function(chunk) {
				body += chunk;
			});
			res.on("end", function() {
				var statusCode = res.statusCode;
				callback(body, statusCode);
			});
		});
	},
    loadSongNamed(songname, callback) {
        //reset path
        options.path = '/api';
		//set path for loading a named song
		options.path += "/songs/name/" + songname;
		//do the query
		https.get(options, function(res) {
			var body = "";
			res.setEncoding("UTF-8");
			res.on("data", function(chunk) {
				body += chunk;
			});
			res.on("end", function() {
				var statusCode = res.statusCode;
				callback(body, statusCode);
			});
		});
	},
    loadArtistNamed(artistname, callback) {
        //reset path
        options.path = '/api';
		//set path for loading a named artist
		options.path += "/songs/artist/" + artistname;
		//do the query
		https.get(options, function(res) {
			var body = "";
			res.setEncoding("UTF-8");
			res.on("data", function(chunk) {
				body += chunk;
			});
			res.on("end", function() {
				var statusCode = res.statusCode;
				callback(body, statusCode);
			});
		});
	}
    
};