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
        this.sprite.bringToTop();
    };

    fChess.Utils.extend(fChess.Sprite, SpritePiece);

    // fields
    SpritePiece.prototype.piece = null;

    // functions
    SpritePiece.prototype._getName = function () {
        return fChess.Board.getImageNameForPiece(this.piece);
    };

    SpritePiece.prototype.destroy = function () {
        fChess.Sprite.prototype.destroy.apply(this, arguments);
        this.piece = null;
    };

    SpritePiece.prototype.kill = function () {
        this.sprite.alpha = 0;
        this.sprite.inputEnabled = false;
    };

    return SpritePiece;
})();

fChess.SpriteCell = (function () {
    'use strict';

    var SpriteCell = function (game, cell) {
        this.cell = cell;
        this.game = game;
        this.cellIndex = cell.row * fChess.Board.gameSettings.rows + cell.column;

        this.initialize();
    };

    fChess.Utils.extend(fChess.Sprite, SpriteCell);

    //fields
    SpriteCell.prototype.cell = null;
    SpriteCell.prototype.cellIndex = 0;
    SpriteCell.prototype.graphics = null;

    //functions
    SpriteCell.prototype.initialize = function () {
        this.drawOverlayRectangle();

        this.sprite = new Phaser.Sprite(this.game, 0, 0, this.name);
        this.sprite.addChild(this.graphics);
        this.sprite.alpha = 0;

        this.attachEvents();
    };

    SpriteCell.prototype.drawOverlayRectangle = function () {
        this.graphics = this.game.add.graphics(0, 0);
        this.graphics.beginFill(0x0000FF, 1);
        this.graphics.drawRect(this.cell.topLeftX,
                               this.cell.topLeftY,
                               fChess.Board.gameSettings.squareWidth,
                               fChess.Board.gameSettings.squareHeight);
        this.graphics.endFill();
    };

    SpriteCell.prototype.attachEvents = function () {
        this.sprite.inputEnabled = true;

        this.sprite.events.onInputDown.add(function () {
            console.log('Cell ' + String(this.cellIndex) + ' is clicked.');
        }, this)
    };

    return SpriteCell;
})();
