'use strict';

class Token {
    constructor(value, type, tokenClass, positionInLine, lineNumber) {
        this.Value = value;
        this.Type = type;
        this.Class = tokenClass;
        this.PositionInLine = positionInLine;
        this.LineNumber = lineNumber;
    }

    static GetType(tokenValue) {
        if (Matcher.IsComment(tokenValue)) return TokenType.Comment;
        if (Matcher.IsString(tokenValue)) return TokenType.String;
        if (Matcher.IsWord(tokenValue)) return TokenType.Word;
        if (Matcher.IsNumber(tokenValue)) return TokenType.Number;
        if (Matcher.IsCurlyBracket(tokenValue)) return TokenType.CurlyBracket;
        if (Matcher.IsRoundBracket(tokenValue)) return TokenType.RoundBracket;
        if (Matcher.IsSquareBracket(tokenValue)) return TokenType.SquareBracket;
        if (Matcher.IsMathematicSeparator(tokenValue)) return TokenType.MathematicSeparator;
        if (Matcher.IsComparativeSeparator(tokenValue)) return TokenType.ComparativeSeparator;
        if (Matcher.IsLogicalSeparator(tokenValue)) return TokenType.LogicalSeparator;
        if (Matcher.IsAssignmentSeparator(tokenValue)) return TokenType.AssignmentSeparator;
        if (Matcher.IsCommaSeparator(tokenValue)) return TokenType.CommaSeparator;
        if (Matcher.IsPointSeparator(tokenValue)) return TokenType.PointSeparator;
        if (Matcher.IsSemicolonSeparator(tokenValue)) return TokenType.SemicolonSeparator;
        if (Matcher.IsUnknown(tokenValue)) return TokenType.Unknown;
    }

    static GetClass(tokenValue) {
        if (Matcher.IsComment(tokenValue)) { return TokenClass.Comments; }
        if (Matcher.IsString(tokenValue)) { return TokenClass.Strings; }
        if (Matcher.IsWord(tokenValue)) {
            if (keyWords.includes(tokenValue)) { return TokenClass.KeyWords; }
            return TokenClass.UserWords;
        }
        if (Matcher.IsNumber(tokenValue)) { return TokenClass.Numbers; }
        if (Matcher.IsCurlyBracket(tokenValue) || Matcher.IsRoundBracket(tokenValue)
            || Matcher.IsSquareBracket(tokenValue)) { return TokenClass.Brackets; }
        if (Matcher.IsMathematicSeparator(tokenValue) || Matcher.IsComparativeSeparator(tokenValue)
            || Matcher.IsLogicalSeparator(tokenValue) || Matcher.IsAssignmentSeparator(tokenValue)
            || Matcher.IsCommaSeparator(tokenValue) || Matcher.IsPointSeparator(tokenValue)
            || Matcher.IsSemicolonSeparator(tokenValue)) { return TokenClass.Separators; }
    }
}

var keyWords = ["if", "else", "while", "do", "number", "void", "string", "return", "function"];
