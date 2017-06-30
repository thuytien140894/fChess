fChess = fChess || {};

fChess.NewGameModal = (function () {
    'use strict';

    var NewGameModal = function () {
        fChess.Modal.prototype.constructor.apply(this, arguments);

        this.players = [
            { label: 'Player 1', name: ko.observable(''), imageUrl: ko.observable('assets/chesspieces/alpha/bN.png'), color: 'black' },
            { label: 'Player 2', name: ko.observable(''), imageUrl: ko.observable('assets/chesspieces/alpha/wN.png'), color: 'white' }
        ]
    };

    fChess.Utils.extend(fChess.Modal, NewGameModal);

    // fields
    NewGameModal.prototype.players = null;

    // public functions
    NewGameModal.prototype.show = function () {
        this.reset();
        fChess.Modal.prototype.show.apply(this, arguments);
    };

    NewGameModal.prototype.confirm = function () {
        fChess.Modal.prototype.confirm.apply(this, arguments);

        fChess.GameManager.GameVM.players([]);
        this.players.forEach(function (player) {
            fChess.GameManager.GameVM.players.push(new fChess.Player(player.name(), player.color));
        }.bind(this));

        fChess.Page.gameManager.startNewGame();
    };

    NewGameModal.prototype.reset = function () {
        this.players.forEach(function (player) {
            player.name('');
        }.bind(this));
    };

    NewGameModal.prototype.switchColor = function () {
        var color = this.players[0].color;
        this.players[0].color = this.players[1].color;
        this.players[1].color = color;

        var imageUrl = this.players[0].imageUrl();
        this.players[0].imageUrl(this.players[1].imageUrl());
        this.players[1].imageUrl(imageUrl);
    };

    return NewGameModal;
})();
