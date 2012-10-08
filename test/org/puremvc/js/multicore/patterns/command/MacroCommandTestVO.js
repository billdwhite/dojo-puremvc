define(
    [
        "dojo/_base/declare"
    ],
    function(declare) {
        var MacroCommandTestVO = declare("org.puremvc.js.multicore.patterns.command.MacroCommandTestVO", null, {
            constructor: function(input) {
                this.input = input;
            },
            input: null,
            result1: null,
            result2: null
        });
        return MacroCommandTestVO;
    }
);