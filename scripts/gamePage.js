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

        // apply knockout bindings
        Page.applyBindings();
    };

    Page.VM = (function () {
        var VM = {};

        VM.showSettings = ko.observable(false);
        VM.showPieceOptions = ko.observable(false);
        VM.hasSound = true;
        VM.showFeedback = true;
        VM.soundIcon = ko.observable('assets/notifications.png');
        VM.feedbackIcon = ko.observable('assets/path.png');

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
        };

        return VM;
    })();

    Page.applyBindings = function () {
        ko.applyBindings(fChess.Page.VM, $('#left-panel').get(0));
        ko.applyBindings(fChess.GameManager.GameVM, $('#dashboard').get(0));
        ko.applyBindings(Page.historyChart, $('#history-chart').get(0));
        ko.applyBindings(Page.pawnPromotionModal, $('#pawn-promotion-modal').get(0));
        ko.applyBindings(Page.newGameModal, $('#new-game-modal').get(0));
    };

    return Page;
})();
