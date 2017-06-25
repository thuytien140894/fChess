var fChess = fChess || {};

fChess.Piece = (function () {
    'use strict';

    //constructor
    var Piece = function (color) {
        this.color = color;
        this.availableMoves = [];
        this.blockedMoves = [];
    };

    //fields
    Piece.prototype.alive = true;
    Piece.prototype.changePosition = false;
    Piece.prototype.color = '';
    Piece.prototype.availableMoves = null;
    Piece.prototype.blockedMoves = null; // used for cells blocked by the piece's friends

    //functions
    Piece.prototype.revive = function () {
        this.alive = true;
    };

    Piece.prototype.kill = function () {
        this.alive = false;
    };

    Piece.prototype.findCell = function (cells) {
        for (var i = 0; i < cells.length; i++) {
            if (cells[i].piece == this) {
                return cells[i];
            }
        }

        return null;
    };

    Piece.prototype.calculateMoves = function (boardCells) {
        this.refreshMoves();
        var myKing = fChess.Board.findKing(this);
        if (myKing) {
            this.findMoves(boardCells);
            this.findSafeMoves(boardCells, myKing);
        }
    };

    Piece.prototype.isAllowedToMove = function (move) {
        return (this.availableMoves.indexOf(move) != -1);
    };

    // This function finds the common moves that two pieces can make
    Piece.prototype.encounter = function (anotherPiece) {
        var intersection = [];
        var enemyMoves = [];

        if (anotherPiece instanceof fChess.PawnPiece) {
            // for the pawn, we only consider the moves that it can make to capture
            // an enemy, not the ones used for moving
            enemyMoves = anotherPiece.potentialMoves.concat(anotherPiece.blockedMoves);
        } else {
            // we need to consider all possible moves that a piece can make, not just
            // the ones that they can go. These possible moves include all the available
            // moves and the ones blocked by its "friends". Because if the king takes
            // one of these friends, the king will be eaten.
            enemyMoves = anotherPiece.availableMoves.concat(anotherPiece.blockedMoves);
        }

        this.availableMoves.forEach(function (move) {
            enemyMoves.forEach(function (enemyMove) {
                if (move === enemyMove) {
                    intersection.push(move);
                }
            }.bind(this));
        }.bind(this));

        return intersection;
    };

    // This function removes all the specified moves from a piece's available moves
    Piece.prototype.disregardMoves = function (moves) {
        moves.forEach(function (move) {
            if (this.availableMoves.indexOf(move) != -1) {
                this.availableMoves.splice(this.availableMoves.indexOf(move), 1);
            }
        }.bind(this));
    };

    Piece.prototype.refreshMoves = function () {
        this.availableMoves.length = 0;
        this.blockedMoves.length = 0;
    };

    // checks if a piece is an enemy
    Piece.prototype.isEnemy = function (piece) {
        return this.color != piece.color;
    };

    Piece.prototype.findAllEnemies = function (boardCells) {
        var enemies = [];
        boardCells.forEach(function (cell) {
            if (cell.piece && cell.piece.color != this.color) {
                enemies.push(cell.piece);
            }
        }.bind(this));

        return enemies;
    };

    Piece.prototype.findSafeMoves = function (boardCells, myKing) {
        var dangerousMoves = this.findDangerousMoves(boardCells, myKing);

        // filter out dangerous moves from the available moves
        this.availableMoves = this.availableMoves.filter(function (move) {
            return dangerousMoves.indexOf(move) == -1;
        }.bind(this));
    };

    Piece.prototype.findDangerousMoves = function (boardCells, myKing) {
        var currentCell = this.findCell(boardCells);
        currentCell.piece = null;
        var dangerousMoves = [];
        var threateningPiece = myKing.threateningPiece;

        for (var i = 0; i < this.availableMoves.length; i++) {
            var cellToMove = this.availableMoves[i];
            var cellPiece = cellToMove.piece;
            cellToMove.piece = this;
            var enemies = this.findAllEnemies(boardCells);

            for (var j = 0; j < enemies.length; j++) {
                var enemy = enemies[j];
                enemy.findMoves(boardCells);
                if (myKing.isChecked()) {
                    dangerousMoves.push(cellToMove);
                    cellToMove.piece = cellPiece;
                    break;
                }
            }

            cellToMove.piece = cellPiece;
        }

        myKing.checkedByPiece(threateningPiece);
        currentCell.piece = this;

        return dangerousMoves;
    };

    Piece.prototype.updateEnemyKingStatus = function () {
        var enemyKing = fChess.Board.findEnemyKing(this);
        enemyKing.unchecked();
        this.availableMoves.forEach(function (cellToMove) {
            if (!cellToMove.isEmpty() && cellToMove.piece == enemyKing) {
                enemyKing.checkedByPiece(this);
            }
        }.bind(this));
    };

    Piece.prototype.findSouthernMoves = function (currentCell, boardCells, maxStep) {
        var cellIndex = boardCells.indexOf(currentCell);
        var numberOfPossibleMoves = 7 - currentCell.row;
        var limit = Math.min(numberOfPossibleMoves, maxStep);
        for (var i = 0; i < limit; i++) {
            cellIndex += 8;
            if (boardCells[cellIndex]) {
                if (boardCells[cellIndex].isEmpty()) {
                    this.availableMoves.push(boardCells[cellIndex]);
                } else {
                    if (!(this instanceof fChess.PawnPiece)) { // a pawn cannot cannot capture its enemy on its path
                        if (this.isEnemy(boardCells[cellIndex].piece)) {
                            this.availableMoves.push(boardCells[cellIndex]);
                        } else {
                            this.blockedMoves.push(boardCells[cellIndex]);
                        }
                    }
                    break;
                }
            }
        }
    };

    Piece.prototype.findNorthernMoves = function (currentCell, boardCells, maxStep) {
        var cellIndex = boardCells.indexOf(currentCell);
        var numberOfPossibleMoves = currentCell.row;
        var limit = Math.min(numberOfPossibleMoves, maxStep);
        for (var i = 0; i < limit; i++) {
            cellIndex -= 8;
            if (boardCells[cellIndex]) {
                if (boardCells[cellIndex].isEmpty()) {
                    this.availableMoves.push(boardCells[cellIndex]);
                } else {
                    if (!(this instanceof fChess.PawnPiece)) { // a pawn cannot cannot capture its enemy on its path
                        if (this.isEnemy(boardCells[cellIndex].piece)) {
                            this.availableMoves.push(boardCells[cellIndex]);
                        } else {
                            this.blockedMoves.push(boardCells[cellIndex]);
                        }
                    }
                    break;
                }
            }
        }
    };

    Piece.prototype.findEasternMoves = function (currentCell, boardCells, maxStep) {
        var cellIndex = boardCells.indexOf(currentCell);
        var numberOfPossibleMoves = 7 - currentCell.column;
        var limit = Math.min(numberOfPossibleMoves, maxStep);
        for (var i = 0; i < limit; i++) {
            cellIndex++;
            if (boardCells[cellIndex]) {
                if (boardCells[cellIndex].isEmpty()) {
                    this.availableMoves.push(boardCells[cellIndex]);
                } else {
                    if (this.isEnemy(boardCells[cellIndex].piece)) {
                        this.availableMoves.push(boardCells[cellIndex]);
                    } else {
                        this.blockedMoves.push(boardCells[cellIndex]);
                    }
                    break;
                }
            }
        }
    };

    Piece.prototype.findWesternMoves = function (currentCell, boardCells, maxStep) {
        var cellIndex = boardCells.indexOf(currentCell);
        var numberOfPossibleMoves = currentCell.column;
        var limit = Math.min(numberOfPossibleMoves, maxStep);
        for (var i = 0; i < limit; i++) {
            cellIndex--;
            if (boardCells[cellIndex]) {
                if (boardCells[cellIndex].isEmpty()) {
                    this.availableMoves.push(boardCells[cellIndex]);
                } else {
                    if (this.isEnemy(boardCells[cellIndex].piece)) {
                        this.availableMoves.push(boardCells[cellIndex]);
                    } else {
                        this.blockedMoves.push(boardCells[cellIndex]);
                    }
                    break;
                }
            }
        }
    };

    Piece.prototype.findSouthEasternMoves = function (currentCell, boardCells, maxStep) {
        var numberOfDiagonalCells = Math.min(7 - currentCell.row, 7 - currentCell.column);
        var cellIndex = boardCells.indexOf(currentCell);
        var limit = Math.min(numberOfDiagonalCells, maxStep);
        for (var i = 0; i < limit; i++) {
            cellIndex += 9;
            if (boardCells[cellIndex]) {
                if (boardCells[cellIndex].isEmpty()) {
                    if (!(this instanceof fChess.PawnPiece)) { // a pawn only gets to move diagonally if there is an enemy
                        this.availableMoves.push(boardCells[cellIndex]);
                    } else {
                        // these moves can be used by a pawn to capture an incoming enemy
                        this.potentialMoves.push(boardCells[cellIndex]);
                        break;
                    }
                } else {
                    if (this.isEnemy(boardCells[cellIndex].piece)) {
                        this.availableMoves.push(boardCells[cellIndex]);
                    } else {
                        this.blockedMoves.push(boardCells[cellIndex]);
                    }
                    break;
                }
            }
        }
    };

    Piece.prototype.findSouthWesternMoves = function (currentCell, boardCells, maxStep) {
        var numberOfDiagonalCells = Math.min(7 - currentCell.row, currentCell.column);
        var cellIndex = boardCells.indexOf(currentCell);
        var limit = Math.min(numberOfDiagonalCells, maxStep);
        for (var i = 0; i < limit; i++) {
            cellIndex += 7;
            if (boardCells[cellIndex]) {
                if (boardCells[cellIndex].isEmpty()) {
                    if (!(this instanceof fChess.PawnPiece)) {
                        this.availableMoves.push(boardCells[cellIndex]);
                    } else {
                        this.potentialMoves.push(boardCells[cellIndex]);
                        break;
                    }
                } else {
                    if (this.isEnemy(boardCells[cellIndex].piece)) {
                        this.availableMoves.push(boardCells[cellIndex]);
                    } else {
                        this.blockedMoves.push(boardCells[cellIndex]);
                    }
                    break;
                }
            }
        }
    };

    Piece.prototype.findNorthEasternMoves = function (currentCell, boardCells, maxStep) {
        var numberOfDiagonalCells = Math.min(currentCell.row, 7 - currentCell.column);
        var cellIndex = boardCells.indexOf(currentCell);
        var limit = Math.min(numberOfDiagonalCells, maxStep);
        for (var i = 0; i < limit; i++) {
            cellIndex -= 7;
            if (boardCells[cellIndex]) {
                if (boardCells[cellIndex].isEmpty()) {
                    if (!(this instanceof fChess.PawnPiece)) {
                        this.availableMoves.push(boardCells[cellIndex]);
                    } else {
                        this.potentialMoves.push(boardCells[cellIndex]);
                        break;
                    }
                } else {
                    if (this.isEnemy(boardCells[cellIndex].piece)) {
                        this.availableMoves.push(boardCells[cellIndex]);
                    } else {
                        this.blockedMoves.push(boardCells[cellIndex]);
                    }
                    break;
                }
            }
        }
    };

    Piece.prototype.findNorthWesternMoves = function (currentCell, boardCells, maxStep) {
        var numberOfDiagonalCells = Math.min(currentCell.row, currentCell.column);
        var cellIndex = boardCells.indexOf(currentCell);
        var limit = Math.min(numberOfDiagonalCells, maxStep);
        for (var i = 0; i < limit; i++) {
            cellIndex -= 9;
            if (boardCells[cellIndex]) {
                if (boardCells[cellIndex].isEmpty()) {
                    if (!(this instanceof fChess.PawnPiece)) {
                        this.availableMoves.push(boardCells[cellIndex]);
                    } else {
                        this.potentialMoves.push(boardCells[cellIndex]);
                        break;
                    }
                } else {
                    if (this.isEnemy(boardCells[cellIndex].piece)) {
                        this.availableMoves.push(boardCells[cellIndex]);
                    } else {
                        this.blockedMoves.push(boardCells[cellIndex]);
                    }
                    break;
                }
            }
        }
    };

    return Piece;
})();
