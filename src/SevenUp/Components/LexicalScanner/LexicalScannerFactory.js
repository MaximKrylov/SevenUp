(function () {
    'use strict';

    angular.module('SevenUp')
        .factory('LexicalScanner', LexicalScannerFactory);

    function LexicalScannerFactory() {
        return {
            GetTokens: function (programCode) {
                return LexicalScanner.GetTokens(programCode);
            }
        };
    }

    class TokenType {
        static get Comment() { return "Comment"; }
        static get Number() { return "Number"; }
        static get String() { return "String"; }
        static get Boolean() { return "Boolean"; }
        static get UserWord() { return "UserWord"; }
        static get KeyWord() { return "KeyWord"; }
        static get Bracket() { return "Bracket"; }
        static get Separator() { return "Separator"; }
    }

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
        static get SemicolonSeparator() { return /[;]/ig; }

        // Unknown token
        static get Unknown() { return /[\S]+/ig; }
    }

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
        static IsSemicolonSeparator(tokenValue) { return Pattern.SemicolonSeparator.test(tokenValue); }
        static IsUnknown(tokenValue) { return Pattern.Unknown.test(tokenValue); }
    }

    class Token {
        constructor(value, type, xPosition, yPosition) {
            this.Value = value;
            this.Type = type;
            this.XPosition = xPosition;
            this.YPosition = yPosition;
        }

        static GetType(tokenValue) {

            var keyWords = ["if", "else", "while", "do", "for", "break", "number", "void", "string", "bool", "array", "of", "return", "function", "Program"];
            if (Matcher.IsComment(tokenValue)) {
                return TokenType.Comment;
            }

            if (Matcher.IsString(tokenValue)) {
                return TokenType.String;
            }

            if (Matcher.IsWord(tokenValue)) {
                if (keyWords.includes(tokenValue)) {
                    return TokenType.KeyWord;
                }

                if (tokenValue === "true" || tokenValue === "false") {
                    return TokenType.Boolean;
                }

                return TokenType.UserWord;
            }

            if (Matcher.IsNumber(tokenValue)) {
                return TokenType.Number;
            }

            if (Matcher.IsCurlyBracket(tokenValue)
                || Matcher.IsRoundBracket(tokenValue)
                || Matcher.IsSquareBracket(tokenValue)) {
                return TokenType.Bracket;
            }

            if (Matcher.IsMathematicSeparator(tokenValue)
                || Matcher.IsComparativeSeparator(tokenValue)
                || Matcher.IsLogicalSeparator(tokenValue)
                || Matcher.IsAssignmentSeparator(tokenValue)
                || Matcher.IsCommaSeparator(tokenValue)
                || Matcher.IsSemicolonSeparator(tokenValue)) {
                return TokenType.Separator;
            }
        }
    }

    class LexicalScanner {
        static Perform(tokens, regexp, line, lineNumber) {
            var result;

            while (result = regexp.exec(line)) {
                var temp = new Token(result[0], Token.GetType(result[0]), result.index, lineNumber)
                tokens.push(temp);
            }

            return line.replace(regexp, (str) => {
                var blankLine = "";
                for (var i = 0; i < str.length; i++) blankLine += " ";
                return blankLine;
            });
        }

        static GetTokens(programCode) {
            var tokens = [];
            var unknowns = [];

            programCode.split('\n').forEach((line, index) => {
                if (Matcher.IsComment(line)) {
                    LexicalScanner.Perform(tokens, Pattern.Comment, line, index);
                }
                else {
                    line = LexicalScanner.Perform(tokens, Pattern.String, line, index);
                    line = LexicalScanner.Perform(tokens, Pattern.Word, line, index);
                    line = LexicalScanner.Perform(tokens, Pattern.Number, line, index);
                    line = LexicalScanner.Perform(tokens, Pattern.CurlyBracket, line, index);
                    line = LexicalScanner.Perform(tokens, Pattern.RoundBracket, line, index);
                    line = LexicalScanner.Perform(tokens, Pattern.SquareBracket, line, index);
                    line = LexicalScanner.Perform(tokens, Pattern.MathematicSeparator, line, index);
                    line = LexicalScanner.Perform(tokens, Pattern.ComparativeSeparator, line, index);
                    line = LexicalScanner.Perform(tokens, Pattern.LogicalSeparator, line, index);
                    line = LexicalScanner.Perform(tokens, Pattern.AssignmentSeparator, line, index);
                    line = LexicalScanner.Perform(tokens, Pattern.CommaSeparator, line, index);
                    line = LexicalScanner.Perform(tokens, Pattern.SemicolonSeparator, line, index);
                    LexicalScanner.Perform(unknowns, Pattern.Unknown, line, index);
                }
            });

            tokens.sort((a, b) => {
                if (a.YPosition == b.YPosition) { return a.XPosition - b.XPosition; }
                return a.YPosition - b.YPosition;
            });

            unknowns.sort((a, b) => {
                if (a.YPosition == b.YPosition) { return a.XPosition - b.XPosition; }
                return a.YPosition - b.YPosition;
            });

            return {
                RecognizedTokens: tokens,
                UnknownTokens: unknowns
            };
        }
    }
})();
