var component = require('./component');
var component2 = require('./component2');
require('./main.css');
require('react');

var Constants = {};

//@ value of test.env.FOO is set by parts.setFreeVariable( 'test.env.FOO', 'FOO_VALUE') in webpack.config.js
Constants.test_env_FOO = test.env.FOO;
console.log('Constants.FOO: ', Constants.test_env_FOO );

//@ value of test.env.NODE_ENV is set by parts.setFreeVariable( 'process.env.NODE_ENV', process.env.NODE_ENV) in webpack.config.js
Constants.process_env_NODE_ENV = process.env.NODE_ENV;
console.log('Constants.process_env_NODE_ENV: ', Constants.process_env_NODE_ENV);


document.body.appendChild(component());
document.body.appendChild(component2());
