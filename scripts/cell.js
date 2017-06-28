var fChess = fChess || {};

fChess.Cell = (function () {
    'use strict';

    //constructor
    var Cell = function () {
        this.snapshots = [];
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
    Cell.prototype.snapshots = null;

    // private functions

    // public functions
    Cell.prototype.isEmpty = function () {
        return !this.piece;
    };

    Cell.prototype.takeSnapshot = function () {
        var currentSnapshot = fChess.GameManager.GameVM.snapshot();
        // remove all the snapshots following the 'current' one
        // This is similar to restarting the history starting from the current snapshot
        this.snapshots.splice(currentSnapshot + 1);
        this.snapshots.push(this.piece);
    };

    Cell.prototype.clearSnapshots = function () {
        this.snapshots.length = 0;
    };

    Cell.prototype.checkout = function (snapshot) {
        this.piece = this.snapshots[snapshot];
    };

    return Cell;
})();
