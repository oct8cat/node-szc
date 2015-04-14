'use strict';

var util = require('util')
var http = require('http')

var errors = module.exports = {}

errors.HttpError = function HttpError (statusCode, message) {
    Error.call(this)
    Error.captureStackTrace(this, this.constructor)
    this.name = 'HttpError'
    this.statusCode = statusCode
    if (!message) { message = http.STATUS_CODES[this.statusCode] }
    this.message = message
}

util.inherits(errors.HttpError, Error)

errors.ClientRequestError = function (message) {
    Error.call(this)
    Error.captureStackTrace(this, this.constructor)
    this.name = 'ClientRequestError'
    this.message = message
}

util.inherits(errors.ClientRequestError, Error)
