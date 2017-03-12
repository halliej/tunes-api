/* eslint-disable import/no-extraneous-dependencies */
const axios = require('axios');
const expect = require('expect');
const describe = require('mocha').describe;
const it = require('mocha').it;

const baseurl = 'http://127.0.0.1:8080/api/';

describe('Testing tunes api endpoints', () => {
  describe('Testing load all songs', function () {
    this.timeout(10000);
    it('should load all songs', (done) => {
      const url = `${baseurl}songs`;
      axios({
        method: 'get',
        url
      }).then((response) => {
        expect(response.status).toBe(200);
        done();
      }).catch((e) => { done(e); });
    });
  });

  describe('Testing load a named song', () => {
    it('should load a specific song if in database', (done) => {
      const url = `${baseurl}songs/name/waste`;
      axios({
        method: 'get',
        url
      }).then((response) => {
        expect(response.status).toBe(200);
        expect(response.data).toExist();
        expect(response.data).toBeA('array');
        expect(response.data[0]).toIncludeKey('Album');
        done();
      }).catch((e) => { done(e); });
    });

    it('should not load a song if not in databae', (done) => {
      const url = `${baseurl}songs/name/0i8ujhg`;
      axios({
        method: 'get',
        url
      }).then((response) => {
        expect(response.status).toBe(200);
        expect(response.data).toExist();
        expect(response.data).toBeA('array');
        expect(response.data).toEqual([]);
        done();
      }).catch((e) => { done(e); });
    });
  });

  describe('Testing load artist', () => {
    it('should load all artist', (done) => {
      const url = `${baseurl}artists`;
      axios({
        method: 'get',
        url
      }).then((response) => {
        expect(response.status).toBe(200);
        expect(response.data).toExist();
        expect(response.data).toBeA('array');
        done();
      }).catch((e) => { done(e); });
    });
  });

  describe('Testing load songs by artist', () => {
    it('should load songs by an artist if artist in database', (done) => {
      const url = `${baseurl}songs/artist/Metallica`;
      axios({
        method: 'get',
        url
      }).then((response) => {
        expect(response.status).toBe(200);
        expect(response.data).toExist();
        expect(response.data).toBeA('array');
        expect(response.data[0]).toIncludeKey('Artist');
        expect(response.data[0].Artist).toBe('Metallica');
        done();
      }).catch((e) => { done(e); });
    });

    it('should not load a songs if artist not in databae', (done) => {
      const url = `${baseurl}songs/artist/0i8ujhg`;
      axios({
        method: 'get',
        url
      }).then((response) => {
        expect(response.status).toBe(200);
        expect(response.data).toExist();
        expect(response.data).toBeA('array');
        expect(response.data).toEqual([]);
        done();
      }).catch((e) => { done(e); });
    });
  });

  describe('Testing load albums', () => {
    it('should load all albums', (done) => {
      const url = `${baseurl}albums`;
      axios({
        method: 'get',
        url
      }).then((response) => {
        expect(response.status).toBe(200);
        expect(response.data).toExist();
        expect(response.data).toBeA('array');
        done();
      }).catch((e) => { done(e); });
    });
  });
});
