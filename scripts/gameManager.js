var fChess = fChess || {};

//TODO:
//1. CHECKMATE - when the king has no more available moves - pop the game result modal
//2. castling
//4. reset the king's checked status when reverting to different snapshots
fChess.GameManager = (function() {
    'use strict';

    var GameManager = function () {
        // GameManager.players = [];
    };

    //fields

    //static fields
    GameManager.lostPiecesRecord = null;

    // private functions

    // public functions
    GameManager.prototype.startNewGame = function () {
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

            fChess.GameManager.GameVM.players().forEach(function (player) {
                player.lostPieces([]);
            }.bind(this));

            lostPieces.forEach(function (piece) {
                var pieceColor = piece.piece.color;
                for (var i = 0; i < fChess.GameManager.GameVM.players().length; i++) {
                    var player = fChess.GameManager.GameVM.players()[i];
                    if (player.color == pieceColor) {
                        player.lostPieces.push(piece);
                    }
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

        GameVM.newState = ko.observable('');
        GameVM.snapshot = ko.observable();
        GameVM.players = ko.observableArray([]);

        GameVM.reset = function () {
            GameVM.snapshot(-1);
        };

        return GameVM;
    })();

    return GameManager;
})();
