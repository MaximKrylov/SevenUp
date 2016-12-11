'use strict';

class LexicalScanner {
    static Perform(tokens, regexp, line, lineNumber) {
        var result;

        while (result = regexp.exec(line)) {
            var temp = new Token(result[0], Token.GetType(result[0]), Token.GetClass(result[0]), result.index, lineNumber)
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
            if (Matcher.IsComment(line)) {
                Perform(tokens, Pattern.Comment, line, index);
            }
            else {
                line = Perform(tokens, Pattern.String, line, index);
                line = Perform(tokens, Pattern.Word, line, index);
                line = Perform(tokens, Pattern.Number, line, index);
                line = Perform(tokens, Pattern.CurlyBracket, line, index);
                line = Perform(tokens, Pattern.RoundBracket, line, index);
                line = Perform(tokens, Pattern.SquareBracket, line, index);
                line = Perform(tokens, Pattern.MathematicSeparator, line, index);
                line = Perform(tokens, Pattern.ComparativeSeparator, line, index);
                line = Perform(tokens, Pattern.LogicalSeparator, line, index);
                line = Perform(tokens, Pattern.AssignmentSeparator, line, index);
                line = Perform(tokens, Pattern.CommaSeparator, line, index);
                line = Perform(tokens, Pattern.PointSeparator, line, index);
                line = Perform(tokens, Pattern.SemicolonSeparator, line, index);
                Perform(unknowns, Pattern.Unknown, line, index);
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
        };
    }
}
