var fChess = fChess || {};

fChess.KingPiece = (function () {
    'use strict';

    //constructor
    var KingPiece = function (color) {
        //super()
        fChess.Piece.prototype.constructor.apply(this, arguments);

        this.rooksForCastling = [];
    };

    fChess.Utils.extend(fChess.Piece, KingPiece);

    //fields
    KingPiece.prototype._isThreatened = false;
    KingPiece.prototype.threateningPiece = null;
    KingPiece.prototype.hasMoved = false;
    KingPiece.prototype.rooksForCastling = null;

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

    KingPiece.prototype._checkForCastling = function (boardCells) {
        var kingCell = this.findCell(boardCells);
        var kingCellIndex = boardCells.indexOf(kingCell);
        for (var i = 0; i < this.rooksForCastling.length; i++) {
            // check if there are any pieces between the king and the rook
            var rookCell = this.rooksForCastling[i].findCell(boardCells);
            var difference = Math.abs(rookCell.column - kingCell.column);
            var sign = (rookCell.column - kingCell.column) / difference;
            var isEmpty = true;
            for (var j = 1; j < difference; j++) {
                var cell = boardCells[kingCellIndex + sign * j];
                if (!cell.isEmpty()) {
                    isEmpty = false;
                    break;
                }
            }

            if (isEmpty) {
                // first we check if the king can move to the adjacent cell
                // if so, then check the next cell
                var adjacentCell = boardCells[kingCellIndex + sign];
                if (this.isAllowedToMove(adjacentCell)) {
                    var kingIsChecked = false;
                    var enemies = this.findAllEnemies(boardCells);
                    var cellToCastle = boardCells[kingCellIndex + sign * 2];
                    // assume that king occupies this cell
                    kingCell.piece = null;
                    cellToCastle.piece = this;
                    for (var k = 0; k < enemies.length; k++) {
                        var enemy = enemies[k];
                        enemy.findMoves(boardCells);
                        if (this.isChecked()) {
                            kingIsChecked = true;
                            break;
                        }
                    }

                    // reset the cell pieces
                    kingCell.piece = this;
                    cellToCastle.piece = null;
                    this.unchecked();

                    if (!kingIsChecked) {
                        this.availableMoves.push(cellToCastle);
                    }
                }
            }
        }
    };

    // public functions
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

    KingPiece.prototype.calculateMoves = function (boardCells) {
        this.refreshMoves();
        this.findMoves(boardCells);
        this._avoidEnemies(boardCells);
        this._checkForCastling(boardCells);
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

    KingPiece.prototype.isCheckmated = function () {
        return this.isChecked() && this.hasNoAvailableMoves();
    };

    KingPiece.prototype.isCastling = function (kingCell, cellToMove) {
        return Math.abs(cellToMove.column - kingCell.column) == 2;
    };

    return KingPiece;
})();
