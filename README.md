Welcome to dagent
===================
[![Build Status](https://travis-ci.org/alzubaidi/dagent.svg?branch=master)](https://travis-ci.org/alzubaidi/dagent)

Node.js module for detecting request device, OS, browser and more
it is based on ua-parser-js module.

**Usage**

    const Agent = require('dagent');   

In express.js 

	// Attach functions to req object
	app.use(new Agent().express());

Standalone
		
	const agent = new Agent();
	agent.bareDetect();


**Functions**

 - is(device) : Get bool truth about device.
 Example:
 `agent.is('WebKit'); Or req.is('ipad');`
 
 - bareDetect(userAgent) : Parse userAgent string, extract truth about it and attach it to instance
 Example:
 `agent.bareDetect('Mozilla/5.0 (iPad; U; CPU OS 3_2_1 like Mac OS X; en-us) AppleWebKit/531.21.10 (KHTML, like Gecko) Mobile/7B405');
 //Then use agent instance to get truth
 agent.is('WebKit'); // true`
 
 - express() : Function to use with express.js which will take care of everything for you.
 `app.use(agent.express());` 
`// Now you can use`
`req.is('WebKit');`

**Versions History**

**1.0.0** 

 - Initial working copy