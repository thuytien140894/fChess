var fChess = fChess || {};

fChess.Player = (function () {
    'use strict';

    //constructor
    var Player = function (name, color) {
        this.name = name;
        this.color = color;

        this.pieces = [];
        this.lostPieces = ko.observableArray([]);
    };

    //fields
    Player.prototype.name = '';
    Player.prototype.color = '';
    Player.prototype.pieces = null;
    Player.prototype.isActive = false;
    Player.prototype.lostPieces = null;
    Player.prototype.king = null;
    Player.prototype.canCastle = false;

    // public functions
    Player.prototype.hasLegalMoves = function (boardCells) {
        for (var i = 0; i < this.pieces.length; i++) {
            var piece = this.pieces[i];
            if (piece.alive) {
                piece.calculateMoves(boardCells)
                if (piece.hasAvailableMoves()) {
                    return true;
                }
            }
        }

        return false;
    };

    Player.prototype.isChecked = function () {
        return this.king.isChecked();
    };

    Player.prototype.isCheckmated = function (boardCells) {
        return this.isChecked() && !this.hasLegalMoves(boardCells);
    };

    return Player;
})();
