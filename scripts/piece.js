var fChess = fChess || {};

fChess.Piece = (function () {
    'use strict';

    //constructor
    var Piece = function () {
    };

    //fields
    Piece.prototype.alive = true;
    Piece.prototype.name = '';
    Piece.prototype.color = '';

    //functions

    return Piece;
})();

fChess.KingPiece = (function () {
    'use strict';

    //constructor
    var KingPiece = function (color) {
        if (color != undefined) {
            if (color == 'white') {
                this.name = 'wKing';
            } else {
                this.name = 'bKing';
            }
        }
    };

    fChess.Utils.extend(fChess.Piece, KingPiece);

    //fields

    //functions

    return KingPiece;
})();

fChess.QueenPiece = (function () {
    'use strict';

    //constructor
    var QueenPiece = function (color) {
        if (color != undefined) {
            if (color == 'white') {
                this.name = 'wQueen';
            } else {
                this.name = 'bQueen';
            }
        }
    };

    fChess.Utils.extend(fChess.Piece, QueenPiece);

    //fields

    //functions

    return QueenPiece;
})();

fChess.BishopPiece = (function () {
    'use strict';

    //constructor
    var BishopPiece = function (color) {
        if (color != undefined) {
            if (color == 'white') {
                this.name = 'wBishop';
            } else {
                this.name = 'bBishop';
            }
        }
    };

    fChess.Utils.extend(fChess.Piece, BishopPiece);

    //fields

    //functions

    return BishopPiece;
})();

fChess.RookPiece = (function () {
    'use strict';

    //constructor
    var RookPiece = function (color) {
        if (color != undefined) {
            if (color == 'white') {
                this.name = 'wRook';
            } else {
                this.name = 'bRook';
            }
        }
    };

    fChess.Utils.extend(fChess.Piece, RookPiece);

    //fields

    //functions

    return RookPiece;
})();

fChess.KnightPiece = (function () {
    'use strict';

    //constructor
    var KnightPiece = function (color) {
        if (color != undefined) {
            if (color == 'white') {
                this.name = 'wKnight';
            } else {
                this.name = 'bKnight';
            }
        }
    };

    fChess.Utils.extend(fChess.Piece, KnightPiece);

    //fields

    //functions

    return KnightPiece;
})();

fChess.PawnPiece = (function () {
    'use strict';

    //constructor
    var PawnPiece = function (color) {
        if (color != undefined) {
            if (color == 'white') {
                this.name = 'wPawn';
            } else {
                this.name = 'bPawn';
            }
        }
    };

    fChess.Utils.extend(fChess.Piece, PawnPiece);

    //fields

    //functions

    return PawnPiece;
})();
