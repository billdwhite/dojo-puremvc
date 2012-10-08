define(
    [
        "dojo/_base/declare",
        "org/puremvc/js/multicore/patterns/command/SimpleCommand"
    ],
    function(declare, SimpleCommand) {
        var MacroCommandTestSub1Command = declare("org.puremvc.js.multicore.patterns.command.MacroCommandTestSub1Command", SimpleCommand, {
            /**
             * @constructor
             * @extends {SimpleCommand}
             */
            constructor: function() {
            },

            /** @override */
            execute: function(note) {
                var vo = note.getBody();
                // Fabricate a result
                vo.result1 = 2 * vo.input;
            }
        });

        return MacroCommandTestSub1Command;
    }
);