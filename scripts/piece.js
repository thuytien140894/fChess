var fChess = fChess || {};

fChess.Piece = (function () {
    'use strict';

    //constructor
    var Piece = function (color) {
        this.color = color;
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
        //super()
        fChess.Piece.prototype.constructor.apply(this, arguments);
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
        //super()
        fChess.Piece.prototype.constructor.apply(this, arguments);
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
        //super()
        fChess.Piece.prototype.constructor.apply(this, arguments);
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
        //super()
        fChess.Piece.prototype.constructor.apply(this, arguments);
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
        //super()
        fChess.Piece.prototype.constructor.apply(this, arguments);
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
        //super()
        fChess.Piece.prototype.constructor.apply(this, arguments);
    };

    fChess.Utils.extend(fChess.Piece, PawnPiece);

    //fields

    //functions
    PawnPiece.prototype.onMouseDown = function () {
        console.log('Clicked');
    };

    return PawnPiece;
})();
