(function () {
    'use strict';

    angular.module('App')
        .controller('HomeController', ['LexicalScanner', HomeController]);

    function HomeController(lexicalScanner) {
        var self = this;

        self.ExecuteProgramCode = ExecuteProgramCode;

        function ExecuteProgramCode() {
            var temp = lexicalScanner.GetTokens(self.ProgramCode);

            self.RecognizedTokens = temp.RecognizedTokens;
            self.UnknownTokens = temp.UnknownTokens;
        }
    }
})();
