var game = new Phaser.Game("90%", "100%", Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
  game.load.image('board', 'assets/board.png');
  game.load.image('king', 'assets/chesspieces/alpha/bK.png');
  game.load.image('queen', 'assets/chesspieces/alpha/bQ.png');
  game.load.image('bishop', 'assets/chesspieces/alpha/bB.png');
  game.load.image('pawn', 'assets/chesspieces/alpha/bP.png');
  game.load.image('rook', 'assets/chesspieces/alpha/bR.png');
  game.load.image('knight', 'assets/chesspieces/alpha/bN.png');
}

function create() {
  var board = game.add.sprite(game.world.centerX, game.world.centerY, 'board');
  board.scale.setTo(0.6, 0.6)
  board.anchor.setTo(0.5, 0.5);

  var queen = game.add.sprite(200, 200, 'queen');
  queen.scale.setTo(0.6, 0.6)
  queen.anchor.setTo(0.5, 0.5)
}

function update() {
}
