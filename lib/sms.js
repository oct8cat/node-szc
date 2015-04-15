'use strict';

var _ = require('lodash')
var Promise = require('promise')
var http = require('http')
var errors = require('./errors')

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
    if (_.isUndefined(options)) { options = {} }
    this.options = options
}

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
 */
SMS.prototype.send = function (options, params) {
    options = _.extend(_.clone(this.options), options)
    if (_.isUndefined(params)) { params = {} }
    return new Promise(function (resolve, reject) {
        if (params.dryRun) { resolve(Math.random()); return }
        var url = SMS.urlTemplate(options)
        try {
            http.get(url, function (res) {
                var text = ''
                res.on('data', function (chunk) {
                    text += chunk
                }).on('end', function () {
                    if (res.statusCode === 200) { resolve(text); return }
                    reject(new errors.HttpError(res.statusCode))
                }).on('error', function (err) {
                    reject(new errors.ClientRequestError(err))
                })
            }).on('error', function (err) {
                reject(new errors.ClientRequestError(err))
            })
        } catch (err) {
            reject(new errors.ClientRequestError(err))
        }
    })
}
