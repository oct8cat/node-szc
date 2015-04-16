'use strict';

var events = require('events')
var util = require('util')

var SzcModule = module.exports = function SzcModule () {
    events.EventEmitter.call(this)
}

util.inherits(SzcModule, events.EventEmitter)
