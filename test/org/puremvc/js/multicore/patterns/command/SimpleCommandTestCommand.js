define(
    [
        "dojo/_base/declare",
        "org/puremvc/js/multicore/patterns/command/SimpleCommand"
    ],
    function(declare, SimpleCommand) {
        var SimpleCommandTestCommand = declare("org.puremvc.js.multicore.patterns.command.SimpleCommandTestCommand", SimpleCommand, {
            constructor: function() {
            },

            execute: function(note) {
                var vo = note.getBody();
                // fabricate a result
                vo.result = 2 * vo.input;
            }
        });

        return SimpleCommandTestCommand;
    }
);