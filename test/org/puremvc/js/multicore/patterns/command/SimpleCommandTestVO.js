define(
    [
        "dojo/_base/declare"
    ],
    function(declare) {
        var SimpleCommandTestVO = declare("org.puremvc.js.multicore.patterns.command.SimpleCommandTestVO", null, {
            constructor: function(input) {
                this.input = input;
                this.result= 0;
            },
            input: null,
            result: null
        });

        return SimpleCommandTestVO;
    }
);