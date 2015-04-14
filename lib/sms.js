'use strict';

var _ = require('lodash')
var Promise = require('promise')
var http = require('http')
var errors = require('./errors')

var SMS = module.exports = function SMS (options) {
    if (_.isUndefined(options)) { options = {} }
    this.options = options
}

SMS.urlTemplate = _.template('http://smsinfo.zagruzka.com/aggrweb?' +
        'serviceId=<%=serviceId%>&' +
        'pass=<%=pass%>&' +
        'clientId=<%=clientId%>&' +
        'message=<%=message%>')

SMS.prototype.send = function (options) {
    options = _.extend(_.clone(this.options), options)
    return new Promise(function (resolve, reject) {
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
