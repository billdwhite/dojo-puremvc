define(
    [
        "dojo/_base/declare",
        "org/puremvc/js/multicore/patterns/command/SimpleCommand"
    ],
    function(declare, SimpleCommand) {
        var ControllerTestCommand = declare("org.puremvc.js.multicore.core.ControllerTestCommand", SimpleCommand, {
            /**
             * @extends {SimpleCommand}
             */
            constructor: function() {
            },

            /*
             * Fabricate a result by multiplying the input by 2
             *
             * @param note the note carrying the ControllerTestVO
             */
            execute: function(note) {
                var vo = note.getBody();

                // Fabricate a result
                vo.result = 2 * vo.input;
            }

        });

        return ControllerTestCommand;
    }
);