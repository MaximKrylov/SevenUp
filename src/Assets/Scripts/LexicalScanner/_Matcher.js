'use strict';

class _Matcher {
    static IsComment(tokenValue) { return _Pattern.Comment.test(tokenValue); }
    static IsString(tokenValue) { return _Pattern.String.test(tokenValue); }
    static IsWord(tokenValue) { return _Pattern.Word.test(tokenValue); }
    static IsNumber(tokenValue) { return _Pattern.Number.test(tokenValue); }
    static IsCurlyBracket(tokenValue) { return _Pattern.CurlyBracket.test(tokenValue); }
    static IsRoundBracket(tokenValue) { return _Pattern.RoundBracket.test(tokenValue); }
    static IsSquareBracket(tokenValue) { return _Pattern.SquareBracket.test(tokenValue); }
    static IsMathematicSeparator(tokenValue) { return _Pattern.MathematicSeparator.test(tokenValue); }
    static IsComparativeSeparator(tokenValue) { return _Pattern.ComparativeSeparator.test(tokenValue); }
    static IsLogicalSeparator(tokenValue) { return _Pattern.LogicalSeparator.test(tokenValue); }
    static IsAssignmentSeparator(tokenValue) { return _Pattern.AssignmentSeparator.test(tokenValue); }
    static IsCommaSeparator(tokenValue) { return _Pattern.CommaSeparator.test(tokenValue); }
    static IsPointSeparator(tokenValue) { return _Pattern.PointSeparator.test(tokenValue); }
    static IsSemicolonSeparator(tokenValue) { return _Pattern.SemicolonSeparator.test(tokenValue); }
    static IsUnknown(tokenValue) { return _Pattern.Unknown.test(tokenValue); }
}
