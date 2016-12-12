'use strict';

class _LexicalScanner {
    static Perform(tokens, regexp, line, lineNumber) {
        var result;

        while (result = regexp.exec(line)) {
            var temp = new _Token(result[0], _Token.GetType(result[0]), _Token.GetClass(result[0]), result.index, lineNumber)
            tokens.push(temp);
        }

        return line.replace(regexp, (str) => {
            var blankLine = "";
            for (var i = 0; i < str.length; i++) blankLine += " ";
            return blankLine;
        });
    }

    static GetTokens(programCode) {
        var tokens = new Array();
        var unknowns = new Array();

        programCode.split('\n').forEach((line, index) => {
            if (_Matcher.IsComment(line)) {
                _LexicalScanner.Perform(tokens, _Pattern.Comment, line, index);
            }
            else {
                line = _LexicalScanner.Perform(tokens, _Pattern.String, line, index);
                line = _LexicalScanner.Perform(tokens, _Pattern.Word, line, index);
                line = _LexicalScanner.Perform(tokens, _Pattern.Number, line, index);
                line = _LexicalScanner.Perform(tokens, _Pattern.CurlyBracket, line, index);
                line = _LexicalScanner.Perform(tokens, _Pattern.RoundBracket, line, index);
                line = _LexicalScanner.Perform(tokens, _Pattern.SquareBracket, line, index);
                line = _LexicalScanner.Perform(tokens, _Pattern.MathematicSeparator, line, index);
                line = _LexicalScanner.Perform(tokens, _Pattern.ComparativeSeparator, line, index);
                line = _LexicalScanner.Perform(tokens, _Pattern.LogicalSeparator, line, index);
                line = _LexicalScanner.Perform(tokens, _Pattern.AssignmentSeparator, line, index);
                line = _LexicalScanner.Perform(tokens, _Pattern.CommaSeparator, line, index);
                line = _LexicalScanner.Perform(tokens, _Pattern.PointSeparator, line, index);
                line = _LexicalScanner.Perform(tokens, _Pattern.SemicolonSeparator, line, index);
                _LexicalScanner.Perform(unknowns, _Pattern.Unknown, line, index);
            }
        });

        tokens.sort((a, b) => {
            if (a.LineNumber == b.LineNumber) { return a.PositionInLine - b.PositionInLine; }
            return a.LineNumber - b.LineNumber;
        });

        unknowns.sort((a, b) => {
            if (a.LineNumber == b.LineNumber) { return a.PositionInLine - b.PositionInLine; }
            return a.LineNumber - b.LineNumber;
        });

        return {
            RecognizedTokens: tokens,
            UnknownTokens: unknowns
        }
    }
}
