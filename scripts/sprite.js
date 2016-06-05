var fChess = fChess || {};

fChess.Sprite = (function () {
    'use strict';

    // constructor
    var Sprite = function (game, xPos, yPos, piece) {
        this.game = game;
        this.xPos = xPos;
        this.yPos = yPos;
        this.piece = piece;

        this.initialize();
    };

    // fields
    Sprite.prototype.game = null;
    Sprite.prototype.name = '';
    Sprite.prototype.xPos = 0;
    Sprite.prototype.yPos = 0;
    Sprite.prototype.sprite = null;
    Sprite.prototype.piece = null;

    // functions
    Sprite.prototype.initialize = function () {
        this.name = fChess.Board.getImageNameForPiece(this.piece);
        this.sprite = new Phaser.Sprite(this.game, this.xPos, this.yPos, this.name);
        this.sprite.scale.setTo(0.6, 0.6);
        this.sprite.anchor.set(0.5);
        this.sprite.inputEnabled = true;
    };

    return Sprite;
})();
