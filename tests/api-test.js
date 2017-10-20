let chai        = require('chai');
let chaiHttp    = require('chai-http');
let server      = require('../MiddleMan/index.js');

let should = chai.should();
chai.use(chaiHttp);

var status = {
    success: 200,
    failure: 500,
    notfound: 404,
}

//=====
//TODO seeded data
var session_id = -1;
var repoList = [];  
var repo_id = 1;
var repo_name = "abc";
var server_endpoints = [];
var test_logs = [];
//=====

describe('test /repos', function() {
    it('Should return repo list for existing user', (done) => {
        chai.request(server)
            .get(`/repos/${session_id}`)
            .end((err, res) => {
                res.should.have.status(status.success);
                res.body.should.be.an('object');
                res.body.should.have.status(status.success);
                res.body.repoList.should.be.an('array');
                res.body.repoList.should.be.eql(repoList);
                done();
            });
    });
    it('Should return error for non-existing user', (done) => {
        chai.request(server)
        .get(`/repos/${0}`)
        .end((err, res) => {
            res.should.have.status(status.success);
            res.body.should.be.an('object');
            res.body.should.have.status(status.failure);
            done();
        });
    });
});

describe('test /repo/:session_id/:repo_id', function() {
    it('Should return repo details for existing user', (done) => {
        chai.request(server)
        .get(`/repo/${session_id}/${repo_id}`)
        .end((err, res) => {
            res.should.have.status(status.success00);
            res.body.should.be.an('object');
            res.body.should.have.status(status.success00);
            res.body.repo_id.should.be.a('number');
            res.body.repo_id.eql(repo_id);
            res.body.repo_name.should.be.a('string');
            res.body.repo_name.eql(repo_name);
            res.body.server_endpoints.should.be.an('array');
            res.body.server_endpoints.eql(server_endpoints);
            res.body.test_logs.eql(test_logs);
            done();
        });
    });
    it('Should return error for non-existing user', (done) => {
        chai.request(server)
        .get(`/repo/${0}/${repo_id}`)
        .end((err, res) => {
            res.should.have.status(status.success);
            res.body.should.be.an('object');
            res.body.should.have.status(status.failure);
            done();
        });
    });
    it('Should return error for non-existing repo', (done) => {
        chai.request(server)
        .get(`/repo/${session_id}/${0}`)
        .end((err, res) => {
            res.should.have.status(status.success);
            res.body.should.be.an('object');
            res.body.should.have.status(status.failure);
            done();
        });
    });
});

describe('test /monitor/:session_id/:repo_id', function() {
    it('Should return success for unmonitored repo', (done) => {
        chai.request(server)
        .get(`/monitor/${session_id}/${repo_id}`)
        .end((err, res) => {
            res.should.have.status(status.success);
            res.body.should.be.an('object');
            res.body.should.have.status(status.success);
        });
    });
    it('Should return success for non existing user', (done) => {
        chai.request(server)
        .get(`/monitor/${0}/${repo_id}`)
        .end((err, res) => {
            res.should.have.status(status.success);
            res.body.should.be.an('object');
            res.body.should.have.status(status.failure);
        });
    });
    it('Should return success for non existing repo', (done) => {
        chai.request(server)
        .get(`/monitor/${session_id}/${-1}`)
        .end((err, res) => {
            res.should.have.status(status.success);
            res.body.should.be.an('object');
            res.body.should.have.status(status.failure);
        });
    });
});

describe('test /dont-monitor/:session_id/:repo_id', function() {
    it('Should return success for unmonitored repo', (done) => {
        chai.request(server)
        .get(`/dont-monitor/${session_id}/${repo_id}`)
        .end((err, res) => {
            res.should.have.status(status.success);
            res.body.should.be.an('object');
            res.body.should.have.status(status.success);
        });
    });
    it('Should return success for non existing user', (done) => {
        chai.request(server)
        .get(`/dont-monitor/${0}/${repo_id}`)
        .end((err, res) => {
            res.should.have.status(status.success);
            res.body.should.be.an('object');
            res.body.should.have.status(status.failure);
        });
    });
    it('Should return success for non existing repo', (done) => {
        chai.request(server)
        .get(`/dont-monitor/${session_id}/${-1}`)
        .end((err, res) => {
            res.should.have.status(status.success);
            res.body.should.be.an('object');
            res.body.should.have.status(status.failure);
        });
    });
});