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
    Cell.prototype.centerX = 0;
    Cell.prototype.centerY = 0;
    Cell.prototype.topLeftX = 0;
    Cell.prototype.topLeftY = 0;
    Cell.prototype.containEnemy = false;

    //functions
    Cell.prototype.isEmpty = function () {
        return !this.piece;
    };

    return Cell;
})();
