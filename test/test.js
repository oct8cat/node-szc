'use strict';

var assert = require('assert')
var Sz
var credentials = {
    serviceId: 1,
    pass: 'pass'
}
var options = {
    clientId: '79012345678',
    message: 'message'
}

before(function () {
    Sz = require('../')
})

describe('Sz', function () {
    describe('.SMS', function () {
        describe('#send()', function () {
            it('should be rejected with "403 Forbidden" on invalid credentials', function (done) {
                ;(new Sz.SMS(credentials)).send(options).then(function () {
                }, function (err) {
                    assert.equal(err.statusCode, 403)
                    done()
                }).catch(done)
            })
            it('should emit "send:error" on invalid credentials', function (done) {
                ;(new Sz.SMS(credentials)).on('send:error', function (err) {
                    assert.equal(err.statusCode, 403)
                    done()
                }).send(options)

            })
            it('should get message ID on success', function (done) {
                ;(new Sz.SMS(credentials)).send(options, {dryRun: true}).then(function (msgId) {
                    assert.equal(typeof msgId, 'number')
                    done()
                }, done).catch(done)
            })
            it('should emit "send:success" on success', function (done) {
                ;(new Sz.SMS(credentials)).on('send:success', function (msgId) {
                    assert.equal(typeof msgId, 'number')
                    done()
                }).send(options, {dryRun: true})
            })

        })
    })
})
