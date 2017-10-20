let chai        = require('chai');
let chaiHttp    = require('chai-http');
let server      = require('../MiddleMan/index.js');

let should = chai.should();
chai.use(chaiHttp);

//seeded data
var session_id = -1; //TODO 
var repoList = [];  //TODO

describe('test /repos', function() {
    it('Should return repo list for existing user', (done) => {
        chai.request(server)
            .get(`/repos/${session_id}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.status(200);
                res.body.repoList.should.be.a('array');
                res.body.repoList.should.be.eql(repoList);
                done();
            });
    })
    it('Should return error for non-existing user', (done) => {
        chai.request(server)
            .get(`/repos/${-1}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.status(500);
                done();
            });
    })
});

describe('test /repo/:session_id/:repo_id', function() {
    it('Should return repo details for existing user', (done) => {
        chai.request(server)
        .get(`/repos/${session_id}`)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.status(500);
            done();
        });
    })
});