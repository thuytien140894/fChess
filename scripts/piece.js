var fChess = fChess || {};

fChess.Piece = (function () {
    'use strict';

    //constructor
    var Piece = function () {
    };

    //fields
    Piece.prototype.alive = true;
    Piece.prototype.name = '';

    //functions

    return Piece;
})();

fChess.KingPiece = (function () {
    'use strict';

    //constructor
    var KingPiece = function () {
        this.name = 'king';
    };

    fChess.Utils.extend(fChess.Piece, KingPiece);

    //fields

    //functions

    return KingPiece;
})();

fChess.QueenPiece = (function () {
    'use strict';

    //constructor
    var QueenPiece = function () {
        this.name = 'queen';
    };

    fChess.Utils.extend(fChess.Piece, QueenPiece);

    //fields

    //functions

    return QueenPiece;
})();

fChess.BishopPiece = (function () {
    'use strict';

    //constructor
    var BishopPiece = function () {
        this.name = 'bishop';
    };

    fChess.Utils.extend(fChess.Piece, BishopPiece);

    //fields

    //functions

    return BishopPiece;
})();

fChess.RookPiece = (function () {
    'use strict';

    //constructor
    var RookPiece = function () {
        this.name = 'rook';
    };

    fChess.Utils.extend(fChess.Piece, RookPiece);

    //fields

    //functions

    return RookPiece;
})();

fChess.KnightPiece = (function () {
    'use strict';

    //constructor
    var KnightPiece = function () {
        this.name = 'knight';
    };

    fChess.Utils.extend(fChess.Piece, KnightPiece);

    //fields

    //functions

    return KnightPiece;
})();

fChess.PawnPiece = (function () {
    'use strict';

    //constructor
    var PawnPiece = function () {
        this.name = 'pawn';
    };

    fChess.Utils.extend(fChess.Piece, PawnPiece);

    //fields

    //functions

    return PawnPiece;
})();
