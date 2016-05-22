var fChess = fChess || {};

fChess.Sprite = (function () {
    'use strict';

    // constructor
    var Sprite = function (game, xPos, yPos, name) {
        this.game = game;
        this.xPos = xPos;
        this.yPos = yPos;
        this.name = name;

        this.initialize();
    };

    // fields
    Sprite.prototype.game = null;
    Sprite.prototype.name = '';
    Sprite.prototype.xPos = 0;
    Sprite.prototype.yPos = 0;
    Sprite.prototype.row = 0;
    Sprite.prototype.column = 0;
    Sprite.prototype.sprite = null;

    // functions
    Sprite.prototype.initialize = function () {
        this.sprite = new Phaser.Sprite(this.game, this.xPos, this.yPos, this.name);
        this.sprite.scale.setTo(0.6, 0.6);
        this.sprite.anchor.set(0.5);
        this.sprite.inputEnabled = true;

        this.attachEventListeners();
    };

    Sprite.prototype.attachEventListeners = function () {
        this.sprite.events.onInputOver.add(this.onMouseOver, this);
        this.sprite.events.onInputDown.add(this.onMouseDown, this);
        this.sprite.events.onInputOut.add(this.onMouseOver, this);
    };

    Sprite.prototype.onMouseOver = function () {

    };

    Sprite.prototype.onMouseExit = function () {

    };

    Sprite.prototype.onMouseDown = function () {

    };

    return Sprite;
})();
