var fChess = fChess || {};

fChess.KingPiece = (function () {
    'use strict';

    //constructor
    var KingPiece = function (color) {
        //super()
        fChess.Piece.prototype.constructor.apply(this, arguments);
    };

    fChess.Utils.extend(fChess.Piece, KingPiece);

    //fields
    KingPiece.prototype._isThreatened = false;
    KingPiece.prototype.threateningPiece = null;

    // private functions

    // this function is used by the king primarily to calculate the moves
    // that it can make without being taken by an enemy
    KingPiece.prototype._avoidEnemies = function (boardCells) {
        var currentCell = this.findCell(boardCells);
        var threateningPiece = this.threateningPiece;
        // hypothetically remove the king and calculate all possible enemy moves
        // that might go pass the king. In other words, the king might have moves
        // that intersect with the enemy moves that are blocked by the king himself.
        currentCell.piece = null;

        var enemies = this.findAllEnemies(boardCells);
        enemies.forEach(function (enemy) {
            enemy.findMoves(boardCells);
            var dangerousMoves = this.encounter(enemy);
            this.disregardMoves(dangerousMoves);
        }.bind(this));

        this.checkedByPiece(threateningPiece);
        currentCell.piece = this;
    };

    // public functions
    KingPiece.prototype.calculateMoves = function (boardCells) {
        this.refreshMoves();
        this.findMoves(boardCells);
    };

    KingPiece.prototype.findMoves = function (boardCells) {
        this.refreshMoves();

        var currentCell = this.findCell(boardCells);
        this.findNorthernMoves(currentCell, boardCells, 1);
        this.findSouthernMoves(currentCell, boardCells, 1);
        this.findEasternMoves(currentCell, boardCells, 1);
        this.findWesternMoves(currentCell, boardCells, 1);
        this.findNorthWesternMoves(currentCell, boardCells, 1);
        this.findNorthEasternMoves(currentCell, boardCells, 1);
        this.findSouthEasternMoves(currentCell, boardCells, 1);
        this.findSouthWesternMoves(currentCell, boardCells, 1);

        this.updateEnemyKingStatus();
    };

    KingPiece.prototype.calculateMovesWithCaution = function (boardCells) {
        this.calculateMoves(boardCells);
        this._avoidEnemies(boardCells);
    };

    KingPiece.prototype.checkedByPiece = function (piece) {
        if (!piece) {
            this._isThreatened = false;
        } else {
            this._isThreatened = true;
        }

        this.threateningPiece = piece;
    };

    KingPiece.prototype.unchecked = function () {
        this._isThreatened = false;
        this.threateningPiece = null;
    };

    KingPiece.prototype.isChecked = function () {
        return this._isThreatened;
    };

    return KingPiece;
})();
