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
    Sprite.prototype.sprite = null;
    Sprite.prototype.game = null;
    Sprite.prototype.name = '';
    Sprite.prototype.iconName = '';
    Sprite.prototype.xPos = 0;
    Sprite.prototype.yPos = 0;
    Sprite.prototype.imageUrl = null;

    // public functions
    Sprite.prototype.getName = function() {
        // subclasses should fill this in
    };

    Sprite.prototype.initialize = function () {
        this.name = this.getName();
        this.iconName = this.name + '_' + fChess.Board.pieceType;
        this.imageUrl = ko.observable(fChess.Utils.images[this.iconName]);
        this.sprite = new Phaser.Sprite(this.game, this.xPos, this.yPos, this.iconName);
        this.sprite.scale.setTo(0.6, 0.6);
        this.sprite.anchor.set(0.5);
        this.sprite.inputEnabled = true;
    };

    Sprite.prototype.destroy = function () {
        if (this.sprite) {
            this.sprite.destroy();
        }
    };

    Sprite.prototype.changeColor = function (color) {
        this.sprite.tint = color;
    };

    Sprite.prototype.kill = function () {
        this.sprite.alpha = 0;
        this.sprite.inputEnabled = false;
        this.sprite.x = 0;
        this.sprite.y = 0;
    };

    Sprite.prototype.revive = function () {
        this.sprite.alpha = 1;
        this.sprite.inputEnabled = true;
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
        this.pastPieces = new Set(); // only store unique pieces
    };

    fChess.Utils.extend(fChess.Sprite, SpritePiece);

    // fields
    SpritePiece.prototype.piece = null;
    SpritePiece.prototype.pastPieces = null;

    // private functions
    SpritePiece.prototype.getName = function () {
        return fChess.Utils.getImageNameForPiece(this.piece);
    };

    // public functions
    SpritePiece.prototype.destroy = function () {
        fChess.Sprite.prototype.destroy.apply(this, arguments);
        this.piece = null;
    };

    SpritePiece.prototype.replacePiece = function (newPiece) {
        this.pastPieces.add(this.piece);

        this.piece = newPiece;
        var pieceName = fChess.Utils.getImageNameForPiece(newPiece);
        this.name = pieceName;
        this.changeIcon();
    };

    SpritePiece.prototype.kill = function () {
        fChess.Sprite.prototype.kill.apply(this, arguments);
        this.piece.kill();
    };

    SpritePiece.prototype.revive = function () {
        fChess.Sprite.prototype.revive.apply(this, arguments);
        this.piece.revive();
    };

    SpritePiece.prototype.changeIcon = function () {
        this.iconName = this.name + '_' + fChess.Board.pieceType;
        this.sprite.loadTexture(this.iconName, 0);
        this.imageUrl(fChess.Utils.images[this.iconName]);
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

    // private functions
    SpriteCell.prototype._drawOverlayRectangle = function () {
        this.graphics = this.game.add.graphics(0, 0);
        this.graphics.beginFill(0x0000FF, 1);
        this.graphics.drawRect(this.cell.topLeftX,
                               this.cell.topLeftY,
                               fChess.Board.gameSettings.squareWidth,
                               fChess.Board.gameSettings.squareHeight);
        this.graphics.endFill();
    };

    SpriteCell.prototype._attachEvents = function () {
        this.sprite.inputEnabled = true;

        this.sprite.events.onInputDown.add(function () {
            console.log('Cell ' + String(this.cellIndex) + ' is clicked.');
        }, this)
    };

    // public functions
    SpriteCell.prototype.initialize = function () {
        this._drawOverlayRectangle();

        this.sprite = new Phaser.Sprite(this.game, 0, 0, this.name);
        this.sprite.addChild(this.graphics);
        this.sprite.alpha = 0;

        this._attachEvents();
    };

    return SpriteCell;
})();
