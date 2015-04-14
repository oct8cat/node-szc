'use strict';

var assert = require('assert')
var Sz

before(function () {
    Sz = require('../')
})

describe('Sz', function () {
    describe('.SMS', function () {
        var sms
        var options
        describe('#send()', function () {
            it('should get "403 Forbidden" on invalid credentials', function (done) {
                sms = new Sz.SMS({serviceId: 1, pass: 'pass'})
                options = {clientId: '79012345678', message: 'message'}
                sms.send(options).then(function () {
                }, function (err) {
                    assert.equal(err.statusCode, 403)
                    done()
                }).catch(done)
            })
        })
    })
})
