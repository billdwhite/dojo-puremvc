define(
    [
        "dojo/_base/declare",
        "org/puremvc/js/multicore/patterns/command/SimpleCommand"
    ],
    function(declare, SimpleCommand) {
        var MacroCommandTestSub2Command = declare("org.puremvc.js.multicore.patterns.command.MacroCommandTestSub2Command", SimpleCommand, {

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
                vo.result2 = vo.input * vo.input;
            }
        });

        return MacroCommandTestSub2Command;
    }
);