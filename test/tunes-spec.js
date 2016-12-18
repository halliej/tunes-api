const expect = require("chai").expect;
const api = require("./serverTest.js");
const timeout = 5000;

describe("Testing Songs Endpoints", function() {

	describe("Testing load all songs", function() {
		this.timeout(timeout);
		it("All songs loaded", function(done) {
			api.loadAll("songs", function(html, statusCode) {
				var myresponse = JSON.parse(html);
				expect(statusCode).to.equal(200);
				done();
			});
		});
	});

	describe("Testing load a named song", function() {
		this.timeout(timeout);
		it("Named song loaded", function(done) {
			api.loadSongNamed("Waste", function(html, statusCode) {
				var myresponse = JSON.parse(html);
				expect(statusCode).to.equal(200);
				done();
			});
		});
	});

	describe("Testing load songs by artist", function() {
		this.timeout(timeout);
		it("Songs by artists loaded", function(done) {
			api.loadArtistNamed("Metallica", function(html, statusCode) {
				var myresponse = JSON.parse(html);
				expect(statusCode).to.equal(200);
				done();
			});
		});
	});
});

describe("Testing Artist Endpoints", function() {

	describe("Testing load all artist", function() {
		this.timeout(timeout);
		it("All artists loaded", function(done) {
			api.loadAll("artists", function(html, statusCode) {
				var myresponse = JSON.parse(html);
				expect(statusCode).to.equal(200);
				done();
			});
		});
	});
});

describe("Testing Albums Endpoints", function() {

	describe("Testing load all albums", function() {
		this.timeout(timeout);
		it("All songs loaded", function(done) {
			api.loadAll("albums", function(html, statusCode) {
				var myresponse = JSON.parse(html);
				expect(statusCode).to.equal(200);
				//expect(message).to.equal('No API key found in headers or querystring');
				done();
			});
		});
	});
});


