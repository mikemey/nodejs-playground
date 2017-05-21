var expect = require('chai').expect;
var helpers = require('./helpers');

var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);

var should = chai.should();
var server = require('../app');

describe('Index page', function () {

   it('should include welcome message', function (done) {
       chai.request(server)
            .get('/')
            .end((err, res) => {
                res.should.have.status(200);
                res.text.should.include('Welcome to bondstats');
                done();
            });
   });

   it('should include link to bonds page', function (done) {
       chai.request(server)
            .get('/')
            .end((err, res) => {
                res.text.should.match(/\/bonds\"/);
                done();
            });
   });
});