const expect = require('chai').expect;
const request = require('supertest');

const app = require('../../app');
const db = require('../../models');
const demousers = require('../../seed/demo-user.json');

// test auth and session
describe('Authentication', () => {

    before(done => {
        db.connection.sync({ force: true }).then(async() => {
            // seeding upon creation and synchronization
            await db.user.bulkCreate(demousers.data);
            console.log("All models were synchronized successfully.");
            done();
        }).catch(err => done(err));
    })

    it('Login user', done => {
        request(app).post('/api/auth')
            .send({
                username:'jdoe',
                password:'password123'
            })
            .then(res => {
                const body = res.body;
                expect(body).to.have.property("message");
                expect(body.message).to.equal("Auth successful and session started. route to GET '/logout' to destroy your session or logout.");
                done();
            })
            .catch(err => done(err))
    });

    it('Logout user', done => {
        request(app).get('/api/auth/logout')
            .then(res => {
                const body = res.body;
                expect(body).to.have.property("message");
                expect(body.message).to.equal("Session destroyed.");
                done();
            })
            .catch(err => done(err))
    });
});

/**
 * test all endpoints
 * 
 * I separate these endpoints because session don't work on testing and I don't know why, 
 * so just to show the endpoints are working here in test script.
 * 
 * these endpoints require authentication on development mode though.
 * 
 */
describe('User API endpoints', () => {

    before(done => {
        db.connection.sync({ force: true }).then(async() => {
            // seeding upon creation and synchronization
            await db.user.bulkCreate(demousers.data);
            console.log("All models were synchronized successfully.");
            done();
        }).catch(err => done(err));
    })

    it('GET /api/users - fetch all', done => {
        request(app).get('/api/users')
            .then(res => {
                const status = res.status;
                expect(status).to.equal(200);
                done();
            })
            .catch(err => done(err))
    });

    it('GET /api/users - fetch all', done => {
        request(app).get('/api/users')
            .then(res => {
                const status = res.status;
                expect(status).to.equal(200);
                done();
            })
            .catch(err => done(err))
    });

    it('GET /api/users/:id - fetch a single user', done => {
        request(app).get('/api/users/1')
            .then(res => {
                const status = res.status;
                expect(status).to.equal(200);
                done();
            })
            .catch(err => done(err))
    });

    it('PUT /api/users/:id - edit a user', done => {
        request(app).put('/api/users/1')
            .send({address:'London'})
            .then(res => {
                const status = res.status;
                const body = res.body
                expect(status).to.equal(200);
                expect(body).to.have.property('message');
                expect(body.message).to.equal('User updated successfully.');
                done();
            })
            .catch(err => done(err))
    });

    it('DELETE /api/users/:id - delete a user', done => {
        request(app).delete('/api/users/2')
            .then(res => {
                const status = res.status;
                const body = res.body
                expect(status).to.equal(200);
                expect(body).to.have.property('message');
                expect(body.message).to.equal('User deleted successfully.');
                done();
            })
            .catch(err => done(err))
    });

    it('DELETE /api/users - delete multiple user', done => {
        request(app).delete('/api/users/')
            .send({
                user_id:[2,3,4]
            })
            .then(res => {
                const status = res.status;
                const body = res.body
                expect(status).to.equal(200);
                expect(body).to.have.property('message');
                expect(body.message).to.equal('Users deleted successfully.');
                done();
            })
            .catch(err => done(err))
    });
});
