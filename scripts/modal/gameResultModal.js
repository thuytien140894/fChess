fChess = fChess || {};

fChess.GameResultModal = (function () {
    'use strict';

    var GameResultModal = function () {
        fChess.Modal.prototype.constructor.apply(this, arguments);

        this.reason = ko.observable('');
    };

    fChess.Utils.extend(fChess.Modal, GameResultModal);

    //fields
    GameResultModal.prototype.reason = null;

    // public functions
    GameResultModal.prototype.initialize = function (reason, player) {
        var title = reason;
        if (typeof player !== 'undefined') { // check if player was passed
            title += ' - ' + player.name + ' lost!';
        }
        this.reason(title);
    };

    GameResultModal.prototype.onNewGame = function () {
        this.close();
        fChess.Page.newGameModal.show();
    };

    GameResultModal.prototype.onRestart = function () {
        this.close();
        fChess.Page.gameManager.startNewGame();
    };

    return GameResultModal;
})();
