'use strict';

var expect  = require("chai").expect;
var Agent   = require('../lib/index');

var agent;

before(function() {
    agent = new Agent();
    agent.bareDetect('Mozilla/5.0 (iPad; U; CPU OS 3_2_1 like Mac OS X; en-us) AppleWebKit/531.21.10 (KHTML, like Gecko) Mobile/7B405');
});

describe("Check user agent", function() {
    it("Should identify device as iPad", function() {
        expect(agent.ipad).to.be.true;
        expect(agent.is('ipad')).to.be.true;
    });

    it("Should not identify device as iPhone", function() {
        expect(agent.is('iphone')).to.be.false;
    });
});
