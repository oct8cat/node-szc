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
        var sms
        describe('#send()', function () {
            it('should get "403 Forbidden" on invalid credentials', function (done) {
                sms = new Sz.SMS(credentials)
                sms.send(options).then(function () {
                }, function (err) {
                    assert.equal(err.statusCode, 403)
                    done()
                }).catch(done)
            })
            it('should get message ID on success', function (done) {
                sms = new Sz.SMS(credentials)
                sms.send(options, {dryRun: true}).then(function (msgId) {
                    assert.equal(typeof msgId, 'number')
                    done()
                }, done).catch(done)
            })
        })
    })
})
