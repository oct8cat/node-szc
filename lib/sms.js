'use strict';

var _ = require('lodash')
var Promise = require('promise')
var http = require('http')
var errors = require('./errors')
var SzcModule = require('./szc_module')
var util = require('util')

/**
 * SMS service client.
 * @alias Szc.SMS
 * @constructor
 * @param {object} options Service connection options. Should be provided by
 * Aggregator.
 * @param {string} options.serviceId Service ID
 * @param {string} options.pass Password
 */
var SMS = module.exports = function SMS (options) {
    SzcModule.call(this)
    if (_.isUndefined(options)) { options = {} }
    this.options = options
}
util.inherits(SMS, SzcModule)

/**
 * SMS service URL template.
 * @type function
 */
SMS.urlTemplate = _.template('http://smsinfo.zagruzka.com/aggrweb?' +
        'serviceId=<%=serviceId%>&' +
        'pass=<%=pass%>&' +
        'clientId=<%=clientId%>&' +
        'message=<%=message%>')

/**
 * Sends the SMS to the Aggregator with the given options.
 * @param {object} options Message options. Phone number and content of the
 * message. If needed, `serviceId` and `pass` options used in constructor
 * may be overriden too.
 * @param {string} options.clientId Destination phone number.
 * @param {string} options.message Message content.
 * @param {object} [params] Additional parameters.
 * @param {boolean} [params.dryRun=false] Whether to emulate sending.
 * @returns {Promise}
 * @fires send:error (err)
 */
SMS.prototype.send = function (options, params) {
    var self = this

    options = _.extend(_.clone(self.options), options)
    if (_.isUndefined(params)) { params = {} }

    return new Promise(function (resolve, reject) {
        var onPromiseError = function (err) {
            self._onPromiseError('send', reject, err)
        }
        var onPromiseSuccess = function (msgId) {
            self._onPromiseSuccess('send', resolve, msgId)
        }

        if (params.dryRun) { onPromiseSuccess(Math.random()); return }
        var url = SMS.urlTemplate(options)
        try {
            http.get(url, function (res) {
                var text = ''
                res.on('data', function (chunk) {
                    text += chunk
                }).on('end', function () {
                    if (res.statusCode === 200) { onPromiseSuccess(text); return }
                    onPromiseError(new errors.HttpError(res.statusCode))
                }).on('error', function (err) {
                    onPromiseError(new errors.ClientRequestError(err))
                })
            }).on('error', function (err) {
                onPromiseError(new errors.ClientRequestError(err))
            })
        } catch (err) {
            onPromiseError(new errors.ClientRequestError(err))
        }
    })
}

/**
 * Emits `%ns%:error` passing the `err` and calls `reject` function .
 * @param {string} ns Event namespace
 * @param {function} reject
 * @param {Error} err
 * @protected
 */
SMS.prototype._onPromiseError = function (ns, reject, err) {
    this.emit(ns + ':error', err)
    reject(err)
}

/**
 * Emits `%ns%:success` passing the `value` and calls `resolve` function .
 * @param {string} ns Event namespace
 * @param {function} resolve
 * @param {mixed} value
 * @protected
 */
SMS.prototype._onPromiseSuccess = function (ns, resolve, value) {
    this.emit(ns + ':success', value)
    resolve(value)
}
