var fChess = fChess || {};

fChess.Cell = (function () {
    'use strict';

    //constructor
    var Cell = function () {
    };

    //fields
    Cell.prototype.piece = null;
    Cell.prototype.row = 0;
    Cell.prototype.column = 0;

    //functions

    return Cell;
})();
