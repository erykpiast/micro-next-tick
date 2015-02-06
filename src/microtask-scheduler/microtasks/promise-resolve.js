'use strict';

var isNative = require('lodash.isnative');

return (('object' === typeof Promise) && ('function' === typeof Promise.resolve) && isNative(Promise.resolve) ? Promise.resolve : undefined);
