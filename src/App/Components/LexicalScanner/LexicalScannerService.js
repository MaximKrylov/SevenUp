'use strict';

angular.module('SevenUp')
    .factory('LexicalScanner', function () {
        return {
            GetTokens: function (programCode) {
                return _LexicalScanner.GetTokens(programCode);
            }
        };
    });
