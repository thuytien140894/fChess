var fChess = fChess || {};

fChess.Sprite = (function () {
    'use strict';

    // constructor
    var Sprite = function (game, xPos, yPos) {
        this.game = game;
        this.xPos = xPos;
        this.yPos = yPos;

        this.initialize();
    };

    // fields
    Sprite.prototype.game = null;
    Sprite.prototype.name = '';
    Sprite.prototype.xPos = 0;
    Sprite.prototype.yPos = 0;
    Sprite.prototype.sprite = null;

    // functions
    Sprite.prototype._getName = function() {
        // subclasses should fill this in
    };

    Sprite.prototype.initialize = function () {
        this.name = this._getName();
        this.sprite = new Phaser.Sprite(this.game, this.xPos, this.yPos, this.name);
        this.sprite.scale.setTo(0.6, 0.6);
        this.sprite.anchor.set(0.5);
        this.sprite.inputEnabled = true;
    };

    Sprite.prototype.destroy = function () {
        if (this.sprite) {
            this.sprite.destroy();
        }
    };

    return Sprite;
})();

fChess.SpritePiece = (function () {
    'use strict';

    //constructor
    var SpritePiece = function (game, xPos, yPos, piece) {
        this.piece = piece;

        fChess.Sprite.prototype.constructor.call(this, game, xPos, yPos);
    };

    fChess.Utils.extend(fChess.Sprite, SpritePiece);

    // fields
    SpritePiece.prototype.piece = null;

    // functions
    SpritePiece.prototype._getName = function() {
        return fChess.Board.getImageNameForPiece(this.piece);
    };

    SpritePiece.prototype.destroy = function () {
        fChess.Sprite.prototype.destroy.apply(this, arguments);
        this.piece = null;
    };

    return SpritePiece;
})();