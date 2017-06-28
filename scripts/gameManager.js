var fChess = fChess || {};

//TODO:
//1. CHECKMATE - when the king has no more available moves - pop the game result modal
//2. castling
//4. reset the king's checked status when reverting to different snapshots
fChess.GameManager = (function() {
    'use strict';

    var GameManager = function () {

    };

    //fields

    //static fields
    GameManager.lostPiecesRecord = null;

    // private functions

    // public functions
    GameManager.prototype.startNewGame = function (element) {
        GameManager.GameVM.reset();
        GameManager.lostPiecesRecord = [];

        if (fChess.Page.board && fChess.Page.historyChart) {
            fChess.Page.board.reset();
            fChess.Page.historyChart.reset();
        }
    };

    // static functions
    GameManager.resetHeadSnapshot = function () {
        var turn = GameManager.GameVM.snapshot();
        GameManager.GameVM.snapshot(turn + 1);
        GameManager.updateLostPieces();
    };

    GameManager.updateLostPieces = function () {
        var snapshot = GameManager.GameVM.snapshot();
        if (snapshot >= 0) {
            var lostPieces = this.lostPiecesRecord[snapshot];

            fChess.GameManager.GameVM.lostWhitePieces([]);
            fChess.GameManager.GameVM.lostBlackPieces([]);
            lostPieces.forEach(function (piece) {
                var color = piece.piece.color;
                if (color == 'white') {
                    fChess.GameManager.GameVM.lostWhitePieces.push(piece);
                } else { // black
                    fChess.GameManager.GameVM.lostBlackPieces.push(piece);
                }
            }.bind(this));
        }
    };

    GameManager.promotePawn = async function (color) {
        fChess.Page.pawnPromotionModal.initialize(color);
        var promotedPiece = await fChess.Page.pawnPromotionModal.show();

        if (promotedPiece.name == 'Queen') {
            return new fChess.QueenPiece(color);
        } else if (promotedPiece.name == 'Knight') {
            return new fChess.KnightPiece(color);
        } else if (promotedPiece.name == 'Rook') {
            return new fChess.RookPiece(color);
        } else { // bishop
            return new fChess.BishopPiece(color);
        }
    };

    GameManager.GameVM = (function () {
        var GameVM = {};

        GameVM.lostWhitePieces = ko.observableArray([]);
        GameVM.lostBlackPieces = ko.observableArray([]);
        GameVM.newState = ko.observable('');
        GameVM.snapshot = ko.observable();

        GameVM.reset = function () {
            GameVM.lostWhitePieces([]);
            GameVM.lostBlackPieces([]);
            GameVM.snapshot(-1);
        };

        return GameVM;
    })();

    return GameManager;
})();
