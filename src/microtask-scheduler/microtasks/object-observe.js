'use strict';

var isNative = require('lodash.isnative');

return (('function' === typeof Object.observe) && isNative(Object.observe) ? Object.observe : undefined);
