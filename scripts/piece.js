var fChess = fChess || {};

fChess.Piece = (function () {
    'use strict';

    //constructor
    var Piece = function () {
    };

    //fields
    Piece.prototype.alive = true;
    Piece.prototype.color = '';

    //functions

    return Piece;
})();

fChess.KingPiece = (function () {
    'use strict';

    //constructor
    var KingPiece = function (color) {
        this.color = color;
    };

    fChess.Utils.extend(fChess.Piece, KingPiece);

    //fields

    //functions
    KingPiece.prototype.onMouseDown = function () {
        console.log('Clicked');
    };

    return KingPiece;
})();

fChess.QueenPiece = (function () {
    'use strict';

    //constructor
    var QueenPiece = function (color) {
        this.color = color;
    };

    fChess.Utils.extend(fChess.Piece, QueenPiece);

    //fields

    //functions
    QueenPiece.prototype.onMouseDown = function () {
        console.log('Clicked');
    };

    return QueenPiece;
})();

fChess.BishopPiece = (function () {
    'use strict';

    //constructor
    var BishopPiece = function (color) {
        this.color = color;
    };

    fChess.Utils.extend(fChess.Piece, BishopPiece);

    //fields

    //functions
    BishopPiece.prototype.onMouseDown = function () {
        console.log('Clicked');
    };

    return BishopPiece;
})();

fChess.RookPiece = (function () {
    'use strict';

    //constructor
    var RookPiece = function (color) {
        this.color = color;
    };

    fChess.Utils.extend(fChess.Piece, RookPiece);

    //fields

    //functions
    RookPiece.prototype.onMouseDown = function () {
        console.log('Clicked');
    };

    return RookPiece;
})();

fChess.KnightPiece = (function () {
    'use strict';

    //constructor
    var KnightPiece = function (color) {
        this.color = color;
    };

    fChess.Utils.extend(fChess.Piece, KnightPiece);

    //fields

    //functions
    KnightPiece.prototype.onMouseDown = function () {
        console.log('Clicked');
    };

    return KnightPiece;
})();

fChess.PawnPiece = (function () {
    'use strict';

    //constructor
    var PawnPiece = function (color) {
        this.color = color;
    };

    fChess.Utils.extend(fChess.Piece, PawnPiece);

    //fields

    //functions
    PawnPiece.prototype.onMouseDown = function () {
        console.log('Clicked');
    };

    return PawnPiece;
})();
