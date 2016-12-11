'use strict';

class Matcher {
    static IsComment(tokenValue) { return Pattern.Comment.test(tokenValue); }
    static IsString(tokenValue) { return Pattern.String.test(tokenValue); }
    static IsWord(tokenValue) { return Pattern.Word.test(tokenValue); }
    static IsNumber(tokenValue) { return Pattern.Number.test(tokenValue); }
    static IsCurlyBracket(tokenValue) { return Pattern.CurlyBracket.test(tokenValue); }
    static IsRoundBracket(tokenValue) { return Pattern.RoundBracket.test(tokenValue); }
    static IsSquareBracket(tokenValue) { return Pattern.SquareBracket.test(tokenValue); }
    static IsMathematicSeparator(tokenValue) { return Pattern.MathematicSeparator.test(tokenValue); }
    static IsComparativeSeparator(tokenValue) { return Pattern.ComparativeSeparator.test(tokenValue); }
    static IsLogicalSeparator(tokenValue) { return Pattern.LogicalSeparator.test(tokenValue); }
    static IsAssignmentSeparator(tokenValue) { return Pattern.AssignmentSeparator.test(tokenValue); }
    static IsCommaSeparator(tokenValue) { return Pattern.CommaSeparator.test(tokenValue); }
    static IsPointSeparator(tokenValue) { return Pattern.PointSeparator.test(tokenValue); }
    static IsSemicolonSeparator(tokenValue) { return Pattern.SemicolonSeparator.test(tokenValue); }
    static IsUnknown(tokenValue) { return Pattern.Unknown.test(tokenValue); }
}
