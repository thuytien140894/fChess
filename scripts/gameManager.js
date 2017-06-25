var fChess = fChess || {};

//TODO:
//1. CHECKMATE - when the king has no more available moves
//2. castling
//3. pawn promotion
fChess.GameManager = (function() {
    'use strict';

    var GameManager = function () {

    };

    //fields
    GameManager.prototype.board = null;
    GameManager.prototype.historyChart = null;

    //static fields
    GameManager.lostPiecesRecord = null;

    GameManager.prototype.createBoard = function (element) {
        this.board = new fChess.Board(element);
    };

    GameManager.prototype.createHistoryChart = function (element) {
        this.historyChart = new fChess.HistoryChart(element);
    };

    GameManager.prototype.startNewGame = function (element) {
        GameManager.GameVM.reset();
        GameManager.lostPiecesRecord = [];

        if (this.board && this.historyChart) {
            this.board.reset();
            this.historyChart.reset();
        }
    };

    // static functions
    GameManager.resetHeadSnapshot = function () {
        var turn = GameManager.GameVM.snapshot();
        GameManager.GameVM.snapshot(turn + 1);
        GameManager.lostPiecesRecord.splice(GameManager.GameVM.snapshot() + 1);
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
