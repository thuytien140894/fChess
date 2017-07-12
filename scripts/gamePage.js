var fChess = fChess || {};

fChess.Page = (function () {
    'use strict';

    var Page = {};

    //fields
    Page.gameManager = null;
    Page.board = null;
    Page.historyChart = null;
    Page.pawnPromotionModal = null;
    Page.newGameModal = null;

    //functions
    Page.initialize = function () {
        Page.gameManager = new fChess.GameManager();
        Page.board = new fChess.Board('#game');
        Page.historyChart = new fChess.HistoryChart();
        Page.pawnPromotionModal = new fChess.PawnPromotionModal();
        Page.newGameModal = new fChess.NewGameModal();
        Page.gameResultModal = new fChess.GameResultModal();

        // apply knockout bindings
        Page.applyBindings();
    };

    Page.VM = (function () {
        var VM = {};

        // static fields
        VM.showSettings = ko.observable(false);
        VM.boardIsLoaded = ko.observable(false);
        VM.showPieceOptions = ko.observable(false);
        VM.hasSound = true;
        VM.showFeedback = true;
        VM.soundIcon = ko.observable('assets/notifications.png');
        VM.feedbackIcon = ko.observable('assets/path.png');
        VM.pieceOptions = [
            { name: 'default', imageUrl: 'assets/chesspieces/uscf/bN.png', isSelected: ko.observable(true) },
            { name: 'alpha', imageUrl: 'assets/chesspieces/alpha/bN.png', isSelected: ko.observable(false) },
            { name: 'wikipedia', imageUrl: 'assets/chesspieces/wikipedia/bN.png', isSelected: ko.observable(false) }
        ];

        // private static functions
        VM._resetPieceOptions = function () {
            VM.pieceOptions.forEach(function (piece) {
                piece.isSelected(false);
            }.bind(this));
        };

        // public static functions
        VM.onNewGame = function () {
            Page.newGameModal.show();
        };

        VM.toggleSetting = function () {
            var isVisible = VM.showSettings();
            if (isVisible) {
                VM.showSettings(false);
            } else {
                VM.showSettings(true);
            }
        };

        VM.toggleSound = function () {
            if (VM.hasSound) {
                VM.hasSound = false;
                VM.soundIcon('assets/no-notifications.png');
            } else {
                VM.hasSound = true;
                VM.soundIcon('assets/notifications.png');
            }
        };

        VM.togglePieceOptions = function () {
            var isVisible = VM.showPieceOptions();
            if (isVisible) {
                VM.showPieceOptions(false);
            } else {
                VM.showPieceOptions(true);
            }
        };

        VM.toggleFeedback = function () {
            if (VM.showFeedback) {
                VM.showFeedback = false;
                VM.feedbackIcon('assets/x-icon.png');
            } else {
                VM.showFeedback = true;
                VM.feedbackIcon('assets/path.png');
            }

            fChess.Page.board.toggleFeedback(VM.showFeedback);
        };

        VM.choosePiece = function (piece) {
            VM._resetPieceOptions();
            piece.isSelected(true);
            fChess.Page.board.changePiece(piece.name);
        };

        return VM;
    })();

    Page.ToolbarVM = (function () {
        var ToolbarVM = {};

        ToolbarVM.concede = function () {

        };

        ToolbarVM.draw = function () {

        };

        ToolbarVM.undo = function () {

        };

        ToolbarVM.redo = function () {

        };

        return ToolbarVM;
    })();

    Page.applyBindings = function () {
        ko.applyBindings(fChess.Page.VM, $('#wrapper').get(0));
        ko.applyBindings(fChess.Page.ToolbarVM, $('#toolbar-wrapper').get(0));
        ko.applyBindings(fChess.GameManager.GameVM, $('#dashboard').get(0));
        ko.applyBindings(Page.historyChart, $('#history-chart').get(0));
        ko.applyBindings(Page.pawnPromotionModal, $('#pawn-promotion-modal').get(0));
        ko.applyBindings(Page.newGameModal, $('#new-game-modal').get(0));
        ko.applyBindings(Page.gameResultModal, $('#game-result-modal').get(0));
    };

    return Page;
})();
