var fChess = fChess || {};

fChess.Board = (function () {
    'use strict';

    //constructor
    var Board = function (parentElement) {
        if (parentElement == undefined) {
            parentElement = document.body;
        }
        this.$parent = $(parentElement);

        this.game = new Phaser.Game('100%', '100%', Phaser.AUTO, this.$parent.get(0), {
            preload: this.preload.bind(this),
            create: this.create.bind(this),
            update: this.update.bind(this)
        });
    };

    //fields
    Board.prototype.game = null;
    Board.prototype.$parent = null;

    //functions
    Board.prototype.preload = function () {
        //load all the images
        for (var image in Board.images) {
            this.game.load.image(image, Board.images[image]);
        }
    };

    Board.prototype.create = function () {
        var board = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'board');
        board.scale.setTo(0.6, 0.6);
        board.anchor.setTo(0.5, 0.5);

        var queen = this.game.add.sprite(200, 200, 'queen');
        queen.scale.setTo(0.6, 0.6);
        queen.anchor.setTo(0.5, 0.5);
    };

    Board.prototype.update = function () {

    };

    //static fields
    Board.images = {
        'board': 'assets/board.png',
        'king': 'assets/chesspieces/alpha/bK.png',
        'queen': 'assets/chesspieces/alpha/bQ.png',
        'bishop': 'assets/chesspieces/alpha/bB.png',
        'pawn': 'assets/chesspieces/alpha/bP.png',
        'rook': 'assets/chesspieces/alpha/bR.png',
        'knight': 'assets/chesspieces/alpha/bN.png'
    };

    return Board;
})();