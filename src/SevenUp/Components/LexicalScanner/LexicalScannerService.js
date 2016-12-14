'use strict';

angular.module('SevenUp')
    .factory('LexicalScanner', function () {
        class TokenType {
            static get Comment() { return "Comment"; }
            static get Number() { return "Number"; }
            static get String() { return "String"; }
            static get Word() { return "Word"; }
            static get CurlyBracket() { return "CurlyBracket"; }
            static get RoundBracket() { return "RoundBracket"; }
            static get SquareBracket() { return "SquareBracket"; }
            static get MathematicSeparator() { return "MathematicSeparator"; }
            static get ComparativeSeparator() { return "ComparativeSeparator"; }
            static get LogicalSeparator() { return "LogicalSeparator"; }
            static get AssignmentSeparator() { return "AssignmentSeparator"; }
            static get CommaSeparator() { return "CommaSeparator"; }
            static get PointSeparator() { return "PointSeparator"; }
            static get SemicolonSeparator() { return "SemicolonSeparator"; }
            static get Unknown() { return "Unknown"; }
        }

        class TokenClass {
            static get Comments() { return "Comments"; }
            static get Numbers() { return "Numbers"; }
            static get Strings() { return "Strings"; }
            static get UserWords() { return "UserWords"; }
            static get KeyWords() { return "KeyWords"; }
            static get Brackets() { return "Brackets"; }
            static get Separators() { return "Separators"; }
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
            static get PointSeparator() { return /[.]/ig; }
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
            static IsPointSeparator(tokenValue) { return Pattern.PointSeparator.test(tokenValue); }
            static IsSemicolonSeparator(tokenValue) { return Pattern.SemicolonSeparator.test(tokenValue); }
            static IsUnknown(tokenValue) { return Pattern.Unknown.test(tokenValue); }
        }

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
                        line = LexicalScanner.Perform(tokens, Pattern.PointSeparator, line, index);
                        line = LexicalScanner.Perform(tokens, Pattern.SemicolonSeparator, line, index);
                        LexicalScanner.Perform(unknowns, Pattern.Unknown, line, index);
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

        return {
            GetTokens: function (programCode) {
                return LexicalScanner.GetTokens(programCode);
            }
        };
    });
