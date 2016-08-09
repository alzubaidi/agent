'use strict';

var parser = require('ua-parser-js');

class Agent {

    constructor() {
        this.properties = {};
        this.defaultValue = 'Unidentified';
    }

    express() {
        // Reserve a copy of "this"
        let self = this;

        // Send back express function
        return function(req, res, next) {
            // Detect device specs based on user agent
            self.bareDetect(req.get('User-Agent'));
            // Attached info to req object
            Object.keys(self.properties).forEach((key) => {
                req[key] = self.properties[key];
            });
            // Attach copy of Agent class instance as well.
            req.agent = self;
            // Add is function to request object
            req.is = self.is.bind(self);
            // Forward to next
            next();
        }
    }

    bareDetect(userAgent) {
        // Parse UA
        let uaParts = parser(userAgent);

        // Fill properties based on parsed UA
        this.properties = {
            device: (uaParts['device'] && uaParts['device']['model']) ? uaParts['device']['model'] : this.defaultValue,
            browser: (uaParts['browser'] && uaParts['browser']['name']) ? uaParts['browser']['name'] : this.defaultValue,
            os: (uaParts['os'] && uaParts['os']['name']) ? uaParts['os']['name'] : this.defaultValue,
            engine: (uaParts['engine'] && uaParts['engine']['name']) ? uaParts['engine']['name'] : this.defaultValue,
            cpu:  (uaParts['cpu'] && uaParts['cpu']['architecture']) ? uaParts['cpu']['architecture'] : this.defaultValue,
        }
        // Attach properties for detcted data
        for(let prop in this.properties) {
            if(this.properties[prop] !== this.defaultValue) {
                this[this.properties[prop].toLowerCase()] = true;
            }
        }
    }

    /**
    * Get data for detcted device (is ipad, is iphone, is mac os and so on...)
    **/
    is(device) {
        device = device.toLowerCase();
        return this[device] ? this[device] : false;
    }
}

module.exports = Agent;
