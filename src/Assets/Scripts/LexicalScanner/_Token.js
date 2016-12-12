'use strict';

class _Token {
    constructor(value, type, tokenClass, positionInLine, lineNumber) {
        this.Value = value;
        this.Type = type;
        this.Class = tokenClass;
        this.PositionInLine = positionInLine;
        this.LineNumber = lineNumber;
    }

    static GetType(tokenValue) {
        if (_Matcher.IsComment(tokenValue)) return _TokenType.Comment;
        if (_Matcher.IsString(tokenValue)) return _TokenType.String;
        if (_Matcher.IsWord(tokenValue)) return _TokenType.Word;
        if (_Matcher.IsNumber(tokenValue)) return _TokenType.Number;
        if (_Matcher.IsCurlyBracket(tokenValue)) return _TokenType.CurlyBracket;
        if (_Matcher.IsRoundBracket(tokenValue)) return _TokenType.RoundBracket;
        if (_Matcher.IsSquareBracket(tokenValue)) return _TokenType.SquareBracket;
        if (_Matcher.IsMathematicSeparator(tokenValue)) return _TokenType.MathematicSeparator;
        if (_Matcher.IsComparativeSeparator(tokenValue)) return _TokenType.ComparativeSeparator;
        if (_Matcher.IsLogicalSeparator(tokenValue)) return _TokenType.LogicalSeparator;
        if (_Matcher.IsAssignmentSeparator(tokenValue)) return _TokenType.AssignmentSeparator;
        if (_Matcher.IsCommaSeparator(tokenValue)) return _TokenType.CommaSeparator;
        if (_Matcher.IsPointSeparator(tokenValue)) return _TokenType.PointSeparator;
        if (_Matcher.IsSemicolonSeparator(tokenValue)) return _TokenType.SemicolonSeparator;
        if (_Matcher.IsUnknown(tokenValue)) return _TokenType.Unknown;
    }

    static GetClass(tokenValue) {
        if (_Matcher.IsComment(tokenValue)) { return _TokenClass.Comments; }
        if (_Matcher.IsString(tokenValue)) { return _TokenClass.Strings; }
        if (_Matcher.IsWord(tokenValue)) {
            if (keyWords.includes(tokenValue)) { return _TokenClass.KeyWords; }
            return _TokenClass.UserWords;
        }
        if (_Matcher.IsNumber(tokenValue)) { return _TokenClass.Numbers; }
        if (_Matcher.IsCurlyBracket(tokenValue) || _Matcher.IsRoundBracket(tokenValue)
            || _Matcher.IsSquareBracket(tokenValue)) { return _TokenClass.Brackets; }
        if (_Matcher.IsMathematicSeparator(tokenValue) || _Matcher.IsComparativeSeparator(tokenValue)
            || _Matcher.IsLogicalSeparator(tokenValue) || _Matcher.IsAssignmentSeparator(tokenValue)
            || _Matcher.IsCommaSeparator(tokenValue) || _Matcher.IsPointSeparator(tokenValue)
            || _Matcher.IsSemicolonSeparator(tokenValue)) { return _TokenClass.Separators; }
    }
}

var keyWords = ["if", "else", "while", "do", "number", "void", "string", "return", "function"];
