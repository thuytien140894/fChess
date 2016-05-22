var fChess = fChess || {};

fChess.Utils = (function () {
    'use strict';

    var Utils = {};

    //functions
    Utils.extend = function (parent, child) {
        child.prototype = Object.create(parent.prototype);
        child.prototype.constructor = parent;
    };

    return Utils;
})();
