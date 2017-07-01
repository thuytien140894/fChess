var fChess = fChess || {};

fChess.Utils = (function () {
    'use strict';

    var Utils = {};

    //functions
    Utils.extend = function (parent, child) {
        child.prototype = Object.create(parent.prototype);
        child.prototype.constructor = parent;
    };

    Utils.getImageNameForPiece = function (piece) {
        var name = '';
        if (piece instanceof fChess.KingPiece) {
            name = piece.color + 'King';
        } else if (piece instanceof fChess.QueenPiece) {
            name = piece.color + 'Queen';
        } else if (piece instanceof fChess.BishopPiece) {
            name = piece.color + 'Bishop';
        } else if (piece instanceof fChess.KnightPiece) {
            name = piece.color + 'Knight';
        } else if (piece instanceof fChess.RookPiece) {
            name = piece.color + 'Rook';
        } else { //pawn
            name = piece.color + 'Pawn';
        }

        return name;
    };

    Utils.isKing = function (piece) {
        if (!piece) {
            return false;
        }

        return piece instanceof fChess.KingPiece;
    };

    Utils.isQueen = function (piece) {
        if (!piece) {
            return false;
        }

        return piece instanceof fChess.QueenPiece;
    };

    Utils.isRook = function (piece) {
        if (!piece) {
            return false;
        }

        return piece instanceof fChess.RookPiece;
    };

    Utils.isBishop = function (piece) {
        if (!piece) {
            return false;
        }

        return piece instanceof fChess.BishopPiece;
    };

    Utils.isPawn = function (piece) {
        if (!piece) {
            return false;
        }

        return piece instanceof fChess.PawnPiece;
    };

    Utils.isKnight = function (piece) {
        if (!piece) {
            return false;
        }

        return piece instanceof fChess.KnightPiece;
    };

    Utils.CustomKOBindings = (function () {
        // http://www.knockmeout.net/2012/05/quick-tip-skip-binding.html
        ko.bindingHandlers.stopBinding = {
            init: function() {
                return { controlsDescendantBindings: true };
            }
        };

        ko.virtualElements.allowedBindings.stopBinding = true;
    })();

    Utils.images = {
        'board': 'assets/board.png',
        'blackKing': 'assets/chesspieces/uscf/bK.png',
        'blackQueen': 'assets/chesspieces/uscf/bQ.png',
        'blackBishop': 'assets/chesspieces/uscf/bB.png',
        'blackRook': 'assets/chesspieces/uscf/bR.png',
        'blackKnight': 'assets/chesspieces/uscf/bN.png',
        'blackPawn': 'assets/chesspieces/uscf/bP.png',
        'whiteKing': 'assets/chesspieces/uscf/wK.png',
        'whiteQueen': 'assets/chesspieces/uscf/wQ.png',
        'whiteBishop': 'assets/chesspieces/uscf/wB.png',
        'whiteRook': 'assets/chesspieces/uscf/wR.png',
        'whiteKnight': 'assets/chesspieces/uscf/wN.png',
        'whitePawn': 'assets/chesspieces/uscf/wP.png'
    };

    return Utils;
})();
