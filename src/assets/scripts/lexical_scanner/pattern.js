'use strict';

class Pattern {
    // Comments
    static get Comment() { return /^[#](.*)$/ig; }

    // Terminals: numbers, strings
    static get Number() { return /[0-9]+([.][0-9]+)?/ig; }
    static get String() { return /(["][^"]*["])|(['][^']*['])/ig; }

    // Nonterminals: keywords(if, else, when and etc.), variables
    static get Word() { return /[_a-zA-Z]+[_a-zA-Z0-9]*/ig; }

    // Brackets: {}, (), []
    static get CurlyBracket() { return /[{}]/ig; }
    static get RoundBracket() { return /[()]/ig; }
    static get SquareBracket() { return /[\[\]]/ig; }

    // Separators
    // Mathematic: +, -, *, /, ^
    static get MathematicSeparator() { return /[\+\-\*\/\^]/ig; }
    // Comparative: ==, !=, >=, <=, >, <
    static get ComparativeSeparator() { return /(==)|(!=)|(>=)|(<=)|[><]/ig; }
    // Logical: !, &&, ||
    static get LogicalSeparator() { return /(!)|(&&)|(\|\|)/ig; }
    // Assignment: =
    static get AssignmentSeparator() { return /(=)/ig; }
    // Significant: ; , .
    static get CommaSeparator() { return /[,]/ig; }
    static get PointSeparator() { return /[.]/ig; }
    static get SemicolonSeparator() { return /[;]/ig; }

    // Unknown token
    static get Unknown() { return /[\S]+/ig; }
}
